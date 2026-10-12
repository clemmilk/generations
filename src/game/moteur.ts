import type { Action, Attente, RefEtape, Tache } from './actions.ts';
import { carte, privilege } from './cartes.ts';
import { ordreDuTour } from './creation.ts';
import type { Etat, Joueur } from './etat.ts';
import { melanger } from './hasard.ts';
import { debuterLignee, noter, piocher } from './lignee.ts';
import { MATERIEL } from './materiel/index.ts';
import type { CoutEffet, Etape, Piste } from './materiel/index.ts';
import { effetsPrivilege, totalPrivilege } from './privileges.ts';
import { PARAMETRES } from './parametres.ts';
import { compter, optionsDePaiement, ressourcesDe, ressourcesEnJeu } from './ressources.ts';

// Le cœur du jeu : quelles actions sont permises, et ce qu'elles font.
//
// Principe : une action de tour (jouer, acheter, finir sa lignée) dépose dans etat.file la liste
// de ce qu'il faut résoudre. Le moteur avance dans cette liste tout seul, et s'arrête chaque fois
// qu'un joueur doit faire un choix (etat.attente). La dernière tâche d'un tour est toujours finDeTour.

const MAX_PRIVILEGES = MATERIEL.plateau.noblesse.length;

// ───────────────────────── Outils ─────────────────────────

export function etapeDe(ref: Pick<RefEtape, 'carte' | 'index' | 'rouge'>): Etape {
  const c = carte(ref.carte);
  const etape = (ref.rouge ? c.effetRouge : c.effet)[ref.index];
  if (!etape) throw new Error(`Étape ${ref.index} introuvable sur ${c.nom}`);
  return etape;
}

function ref(source: RefEtape): RefEtape {
  return { joueur: source.joueur, carte: source.carte, index: source.index, rouge: source.rouge };
}

/**
 * Note qu'une carte Assymétrie vient d'être vue par tout le monde (jouée, défaussée ou trashée) :
 * les joueurs savent désormais qu'elle fait partie de ce deck. Les autres cartes sont toujours connues.
 */
function reveler(etat: Etat, id: string): void {
  if (carte(id).origine === 'asymetrie' && !etat.cartesRevelees.includes(id)) {
    etat.cartesRevelees.push(id);
  }
}

function retirer(liste: string[], id: string): boolean {
  const position = liste.indexOf(id);
  if (position === -1) return false;
  liste.splice(position, 1);
  return true;
}

/** Les cartes qu'un joueur peut trasher : sa main, son aire de jeu et sa défausse. */
function cartesTrashables(joueur: Joueur): string[] {
  return [...joueur.main, ...joueur.aireDeJeu, ...joueur.defausse];
}

/** Les cartes de son aire de jeu qu'un joueur peut vendre (elles portent de la Pierre ou du Métal). */
function cartesVendables(joueur: Joueur): string[] {
  return joueur.aireDeJeu.filter((id) => {
    const r = ressourcesDe(joueur, id);
    return r.pierre + r.metal > 0;
  });
}

function niveauMax(piste: Piste): number {
  return MATERIEL.plateau[piste].length - 1;
}

function niveau(joueur: Joueur, piste: Piste): number {
  return piste === 'economie' ? joueur.niveauEconomie : joueur.niveauPopulation;
}

function monter(etat: Etat, joueur: Joueur, piste: Piste): void {
  if (piste === 'economie') joueur.niveauEconomie++;
  else joueur.niveauPopulation++;
  const nom = piste === 'economie' ? 'Économie' : 'Population';
  noter(etat, joueur, `${joueur.nom} passe au niveau ${niveau(joueur, piste)} en ${nom}.`);
}

/** Coût du prochain niveau d'une piste, ou null si le joueur est au maximum. */
function coutProchainNiveau(joueur: Joueur, piste: Piste): number | null {
  return MATERIEL.plateau[piste][niveau(joueur, piste) + 1]?.cout ?? null;
}

function defausserDeLAire(joueur: Joueur, ids: string[]): void {
  for (const id of ids) {
    if (retirer(joueur.aireDeJeu, id)) joueur.defausse.push(id);
  }
}

function trasher(etat: Etat, joueur: Joueur, id: string): void {
  if (!retirer(joueur.main, id) && !retirer(joueur.aireDeJeu, id) && !retirer(joueur.defausse, id)) {
    throw new Error(`${joueur.nom} ne peut pas trasher ${id}`);
  }
  etat.trash.push(id);
  reveler(etat, id);
  joueur.statistiques.cartesTrashees++;
  noter(etat, joueur, `${joueur.nom} trashe ${carte(id).nom}.`);
  const or = totalPrivilege(joueur, 'orParTrash', (effet) => effet.or);
  if (or > 0) {
    joueur.or += or;
    noter(etat, joueur, `${joueur.nom} gagne ${or} Or grâce à son Privilège.`);
  }
  const reste = joueur.pioche.length + cartesTrashables(joueur).length;
  if (reste === 0 && etat.vainqueur === null) {
    etat.vainqueur = joueur.id;
    noter(etat, joueur, `${joueur.nom} a vidé entièrement son deck et remporte la partie !`);
  }
}

/** Le joueur prend dans sa pioche la carte de son choix, puis la pioche est remélangée. */
function rechercher(etat: Etat, joueur: Joueur, id: string, supplementaire: boolean): void {
  retirer(joueur.pioche, id);
  joueur.main.push(id);
  melanger(etat, joueur.pioche);
  if (supplementaire) joueur.statistiques.piochesSupplementaires++;
  noter(
    etat,
    joueur,
    `${joueur.nom} recherche 1 carte dans son deck.`,
    `Carte choisie : ${carte(id).nom}.`,
  );
  if (joueur.pioche.length === 0 && etat.vainqueur === null) {
    etat.vainqueur = joueur.id;
    noter(etat, joueur, `${joueur.nom} a pris la dernière carte de son deck et remporte la partie !`);
  }
}

/** Le coût en Or d'une carte de la Rivière pour ce joueur (Privilège 1 : réduction, jamais sous 0). */
export function coutEnOr(joueur: Pick<Joueur, 'privileges'>, id: string): number {
  const reduction = totalPrivilege(joueur, 'reductionAchat', (effet) => effet.or);
  return Math.max(0, carte(id).cout.or - reduction);
}

/**
 * À appeler quand un joueur applique réellement une étape : si c'est l'Effet Rouge d'un adversaire,
 * le Privilège 20 lui rapporte de l'Or, 1 seule fois par carte jouée.
 */
function noterUsage(etat: Etat, joueur: Joueur, etape: RefEtape): void {
  if (!etape.rouge || etat.effetRougeUtilisePar.includes(joueur.id)) return;
  etat.effetRougeUtilisePar.push(joueur.id);
  joueur.statistiques.effetsRougesUtilises++;
  const or = totalPrivilege(joueur, 'orParEffetRouge', (effet) => effet.or);
  if (or === 0) return;
  joueur.or += or;
  noter(etat, joueur, `${joueur.nom} gagne ${or} Or grâce à son Privilège.`);
}

function prendrePrivilegeVisible(etat: Etat, joueur: Joueur, numero: number): void {
  const position = etat.privilegesVisibles.indexOf(numero);
  if (position === -1) throw new Error(`Le Privilège ${numero} n'est pas visible`);
  etat.privilegesVisibles.splice(position, 1);
  joueur.privileges.push(numero);
  noter(etat, joueur, `${joueur.nom} prend le Privilège ${numero} : ${privilege(numero).texte}.`);
  const suivant = etat.piochePrivileges.shift();
  if (suivant !== undefined) etat.privilegesVisibles.push(suivant);
}

/** Combien de fois le gain d'une étape peut être obtenu. */
function nombreDeGains(joueur: Joueur, etape: Etape): number {
  const fois = etape.par ? Math.floor(compter(joueur, etape.par.compteur) / etape.par.tranche) : 1;
  const gain = etape.gain;
  if (gain.type === 'pioche' || gain.type === 'trash' || gain.type === 'recherche') {
    return fois * gain.nombre;
  }
  return fois;
}

/** Le gain d'une étape peut-il avoir lieu ? Sinon on ne propose même pas de la payer. */
function gainPossible(etat: Etat, joueur: Joueur, etape: Etape): boolean {
  if (nombreDeGains(joueur, etape) <= 0) return false;
  const gain = etape.gain;
  switch (gain.type) {
    case 'or':
    case 'rejouer':
      return true;
    case 'pioche':
    case 'recherche':
      return joueur.pioche.length > 0;
    case 'trash':
      return cartesTrashables(joueur).length > 0;
    case 'vendre':
      return cartesVendables(joueur).length > 0;
    case 'lvlup':
      return niveau(joueur, gain.piste) < niveauMax(gain.piste);
    case 'privilege':
      if (joueur.privileges.length >= MAX_PRIVILEGES) return false;
      return gain.mode === 'choix'
        ? etat.privilegesVisibles.length > 0
        : etat.piochePrivileges.length > 0;
  }
}

function paiementsDeLEtape(joueur: Joueur, etape: Etape): string[][] {
  const cout = etape.cout;
  if (!cout) return [[]];
  if (joueur.or < cout.or) return [];
  return optionsDePaiement(joueur, { pierre: cout.pierre, metal: cout.metal, ressource: 0 });
}

function paiementsDeLAchat(joueur: Joueur, id: string): string[][] {
  if (joueur.or < coutEnOr(joueur, id)) return [];
  return optionsDePaiement(joueur, carte(id).cout);
}

/** Les façons de payer un Privilège d'action (13, 14, 15). Aucune s'il n'y a rien à piocher. */
function paiementsDuPrivilege(joueur: Joueur, cout: CoutEffet): string[][] {
  if (joueur.pioche.length === 0 || joueur.or < cout.or) return [];
  return optionsDePaiement(joueur, { pierre: cout.pierre, metal: cout.metal, ressource: 0 });
}

// ───────────────────────── Actions permises ─────────────────────────

function actionsDuTour(etat: Etat, joueur: Joueur): Action[] {
  const j = joueur.id;
  const actions: Action[] = joueur.main.map((id) => ({ type: 'jouer', joueur: j, carte: id }));
  for (const id of etat.riviere) {
    for (const paiement of paiementsDeLAchat(joueur, id)) {
      actions.push({ type: 'acheter', joueur: j, carte: id, paiement });
    }
  }
  for (const effet of effetsPrivilege(joueur, 'actionPioche')) {
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout)) {
      actions.push({ type: 'utiliserPrivilege', joueur: j, numero: effet.numero, paiement });
    }
  }
  if (joueur.main.length <= PARAMETRES.mainMaxPourFinDeLignee) {
    actions.push({ type: 'finLignee', joueur: j });
  }
  return actions;
}

function actionsDuGain(etat: Etat, joueur: Joueur, attente: RefEtape): Action[] {
  const j = joueur.id;
  const passer: Action = { type: 'passer', joueur: j };
  const gain = etapeDe(attente).gain;
  switch (gain.type) {
    case 'trash':
      return [
        ...cartesTrashables(joueur).map((id): Action => ({ type: 'trasher', joueur: j, carte: id })),
        passer,
      ];
    case 'recherche':
      // Triées : la liste des choix ne doit pas révéler l'ordre de la pioche.
      return [
        ...[...joueur.pioche]
          .sort()
          .map((id): Action => ({ type: 'rechercher', joueur: j, carte: id })),
        passer,
      ];
    case 'vendre':
      return [
        ...cartesVendables(joueur).map((id): Action => ({ type: 'vendre', joueur: j, carte: id })),
        passer,
      ];
    case 'privilege':
      return [
        ...etat.privilegesVisibles.map(
          (numero): Action => ({ type: 'prendrePrivilege', joueur: j, numero }),
        ),
        passer,
      ];
    case 'rejouer':
      return [{ type: 'rejouer', joueur: j }, passer];
    case 'or':
    case 'pioche':
    case 'lvlup':
      return [];
  }
}

/** La liste de tout ce que ce joueur a le droit de faire maintenant. Vide si ce n'est pas à lui de choisir. */
export function getLegalActions(etat: Etat, joueurId: number): Action[] {
  const attente = etat.attente;
  if (etat.vainqueur !== null || !attente || attente.joueur !== joueurId) return [];
  const joueur = etat.joueurs[joueurId];
  if (!joueur) return [];
  const j = joueur.id;
  const passer: Action = { type: 'passer', joueur: j };

  switch (attente.type) {
    case 'tour':
      return actionsDuTour(etat, joueur);
    case 'payer':
      return [
        ...paiementsDeLEtape(joueur, etapeDe(attente)).map(
          (paiement): Action => ({ type: 'payer', joueur: j, paiement }),
        ),
        passer,
      ];
    case 'gain':
      return actionsDuGain(etat, joueur, attente);
    case 'trashAchat':
      return [
        ...cartesTrashables(joueur).map((id): Action => ({ type: 'trasher', joueur: j, carte: id })),
        passer,
      ];
    case 'finNoblesse':
      return [
        ...etat.privilegesVisibles.map(
          (numero): Action => ({ type: 'prendrePrivilege', joueur: j, numero }),
        ),
        passer,
      ];
    case 'finEconomie':
      return [{ type: 'monter', joueur: j, piste: 'economie' }, passer];
    case 'finPopulation':
      return [{ type: 'monter', joueur: j, piste: 'population' }, passer];
    case 'debutRecherche':
      // Triées : la liste des choix ne doit pas révéler l'ordre de la pioche.
      return [...joueur.pioche]
        .sort()
        .map((id): Action => ({ type: 'rechercher', joueur: j, carte: id }));
    case 'debutDefausse':
      return joueur.main.map((id): Action => ({ type: 'defausser', joueur: j, carte: id }));
  }
}

/** Deux actions sont les mêmes si elles ont la même clé (l'ordre des cartes d'un paiement ne compte pas). */
function cle(action: Action): string {
  return JSON.stringify([
    action.type,
    action.joueur,
    'carte' in action ? action.carte : null,
    'paiement' in action ? [...action.paiement].sort() : null,
    'numero' in action ? action.numero : null,
    'piste' in action ? action.piste : null,
  ]);
}

// ───────────────────────── Exécution d'une action ─────────────────────────

function executerTour(etat: Etat, joueur: Joueur, action: Action): void {
  const j = joueur.id;
  joueur.statistiques.tours++;
  switch (action.type) {
    case 'jouer': {
      const c = carte(action.carte);
      retirer(joueur.main, c.id);
      const r = c.ressources;
      // Une carte sans ressource va directement dans la défausse.
      if (r.pierre + r.metal + r.erudit > 0) joueur.aireDeJeu.push(c.id);
      else joueur.defausse.push(c.id);
      reveler(etat, c.id);
      joueur.statistiques.cartesJouees++;
      noter(etat, joueur, `${joueur.nom} joue ${c.nom}.`);
      etat.effetRougeUtilisePar = [];
      // D'abord l'effet du joueur actif, puis l'Effet Rouge de chaque adversaire dans l'ordre du tour.
      const adversaires = ordreDuTour(etat, j).slice(1);
      etat.file = [
        ...c.effet.map((_, index): Tache => ({ type: 'etape', joueur: j, carte: c.id, index, rouge: false })),
        ...adversaires.flatMap((adversaire) =>
          c.effetRouge.map(
            (_, index): Tache => ({ type: 'etape', joueur: adversaire.id, carte: c.id, index, rouge: true }),
          ),
        ),
        { type: 'finDeTour' },
      ];
      return;
    }
    case 'acheter': {
      const c = carte(action.carte);
      joueur.or -= coutEnOr(joueur, c.id);
      defausserDeLAire(joueur, action.paiement);
      retirer(etat.riviere, c.id);
      joueur.main.push(c.id);
      joueur.statistiques.cartesAchetees++;
      noter(etat, joueur, `${joueur.nom} achète ${c.nom}.`);
      const suivante = etat.piocheCommune.shift();
      if (suivante !== undefined) etat.riviere.push(suivante);
      etat.file = [{ type: 'trashAchat', joueur: j }, { type: 'finDeTour' }];
      return;
    }
    case 'utiliserPrivilege': {
      const effet = effetsPrivilege(joueur, 'actionPioche').find((e) => e.numero === action.numero);
      if (!effet) return;
      joueur.or -= effet.cout.or;
      defausserDeLAire(joueur, action.paiement);
      noter(etat, joueur, `${joueur.nom} utilise son Privilège ${effet.numero}.`);
      joueur.statistiques.piochesSupplementaires += piocher(etat, joueur, effet.cartes).length;
      etat.file = [{ type: 'finDeTour' }];
      return;
    }
    case 'finLignee':
      noter(etat, joueur, `${joueur.nom} met fin à sa lignée.`);
      etat.file = [
        { type: 'finNoblesse', joueur: j },
        { type: 'finEconomie', joueur: j },
        { type: 'finPopulation', joueur: j },
        { type: 'reformerDeck', joueur: j },
        { type: 'finDeTour' },
      ];
      return;
  }
}

function executerPaiement(etat: Etat, joueur: Joueur, attente: RefEtape, action: Action): void {
  if (action.type !== 'payer') return; // « passer » : le joueur renonce à cette étape.
  const etape = etapeDe(attente);
  joueur.or -= etape.cout?.or ?? 0;
  defausserDeLAire(joueur, action.paiement);
  noterUsage(etat, joueur, attente);
  const suite: Tache[] = [
    { type: 'gain', ...ref(attente), restant: nombreDeGains(joueur, etape) },
  ];
  // Une étape répétable est reproposée une fois le gain obtenu.
  if (etape.repetable) suite.push({ type: 'etape', ...ref(attente) });
  etat.file.unshift(...suite);
}

function executerGain(
  etat: Etat,
  joueur: Joueur,
  attente: RefEtape & { restant: number },
  action: Action,
): void {
  const gain = etapeDe(attente).gain;
  let encore = attente.restant - 1;
  switch (action.type) {
    case 'trasher':
      trasher(etat, joueur, action.carte);
      break;
    case 'rechercher':
      rechercher(etat, joueur, action.carte, true);
      break;
    case 'vendre': {
      if (gain.type !== 'vendre') return;
      const r = ressourcesDe(joueur, action.carte);
      const or = r.pierre * gain.orParPierre + r.metal * gain.orParMetal;
      defausserDeLAire(joueur, [action.carte]);
      joueur.or += or;
      noter(etat, joueur, `${joueur.nom} vend ${carte(action.carte).nom} pour ${or} Or.`);
      encore = 1; // On peut vendre tant qu'il reste des cartes à vendre.
      break;
    }
    case 'prendrePrivilege':
      prendrePrivilegeVisible(etat, joueur, action.numero);
      break;
    case 'rejouer':
      etat.toursSupplementaires++;
      noter(etat, joueur, `${joueur.nom} rejouera après ce tour.`);
      break;
    default:
      return; // « passer » : le joueur s'arrête là.
  }
  noterUsage(etat, joueur, attente);
  if (encore > 0) etat.file.unshift({ type: 'gain', ...ref(attente), restant: encore });
}

function executer(etat: Etat, attente: Attente, action: Action): void {
  const joueur = etat.joueurs[attente.joueur]!;
  etat.attente = null;
  switch (attente.type) {
    case 'tour':
      executerTour(etat, joueur, action);
      return;
    case 'payer':
      executerPaiement(etat, joueur, attente, action);
      return;
    case 'gain':
      executerGain(etat, joueur, attente, action);
      return;
    case 'trashAchat':
      if (action.type === 'trasher') {
        joueur.or -= PARAMETRES.surcoutTrashAchat;
        trasher(etat, joueur, action.carte);
      }
      return;
    case 'finNoblesse':
      if (action.type === 'prendrePrivilege') prendrePrivilegeVisible(etat, joueur, action.numero);
      return;
    case 'finEconomie':
      if (action.type === 'monter') {
        joueur.or -= coutProchainNiveau(joueur, 'economie') ?? 0;
        monter(etat, joueur, 'economie');
      }
      return;
    case 'finPopulation':
      if (action.type === 'monter') monter(etat, joueur, 'population');
      return;
    case 'debutRecherche':
      if (action.type !== 'rechercher') return;
      rechercher(etat, joueur, action.carte, false);
      etat.file.unshift({ type: 'debutRecherche', joueur: joueur.id, restant: attente.restant - 1 });
      return;
    case 'debutDefausse':
      if (action.type !== 'defausser') return;
      if (retirer(joueur.main, action.carte)) joueur.defausse.push(action.carte);
      reveler(etat, action.carte);
      noter(etat, joueur, `${joueur.nom} défausse 1 carte de sa main.`, `Carte défaussée : ${carte(action.carte).nom}.`);
      etat.file.unshift({ type: 'debutDefausse', joueur: joueur.id, restant: attente.restant - 1 });
      return;
  }
}

// ───────────────────────── Résolution automatique ─────────────────────────

function traiterEtape(etat: Etat, tache: RefEtape): void {
  const joueur = etat.joueurs[tache.joueur]!;
  const etape = etapeDe(tache);
  if (!gainPossible(etat, joueur, etape)) return;
  if (etape.cout) {
    if (paiementsDeLEtape(joueur, etape).length > 0) etat.attente = { type: 'payer', ...ref(tache) };
    return;
  }
  etat.file.unshift({ type: 'gain', ...ref(tache), restant: nombreDeGains(joueur, etape) });
}

function traiterGain(etat: Etat, tache: RefEtape & { restant: number }): void {
  const joueur = etat.joueurs[tache.joueur]!;
  const etape = etapeDe(tache);
  const gain = etape.gain;
  if (tache.restant <= 0) return;
  switch (gain.type) {
    // Ces gains ne demandent aucun choix : ils sont appliqués directement.
    case 'or': {
      const or = gain.montant * tache.restant;
      joueur.or += or;
      noter(etat, joueur, `${joueur.nom} gagne ${or} Or.`);
      noterUsage(etat, joueur, tache);
      return;
    }
    case 'lvlup':
      if (niveau(joueur, gain.piste) < niveauMax(gain.piste)) {
        monter(etat, joueur, gain.piste);
        noterUsage(etat, joueur, tache);
      }
      return;
    case 'privilege':
      if (joueur.privileges.length >= MAX_PRIVILEGES) return;
      if (gain.mode === 'hasard') {
        const numero = etat.piochePrivileges.shift();
        if (numero === undefined) return;
        joueur.privileges.push(numero);
        noter(
          etat,
          joueur,
          `${joueur.nom} pioche au hasard le Privilège ${numero} : ${privilege(numero).texte}.`,
        );
        noterUsage(etat, joueur, tache);
        return;
      }
      if (etat.privilegesVisibles.length === 0) return;
      break;
    case 'pioche':
      // Le joueur pioche directement tout ce à quoi il a droit.
      const piochees = piocher(etat, joueur, tache.restant).length;
      joueur.statistiques.piochesSupplementaires += piochees;
      if (piochees > 0) noterUsage(etat, joueur, tache);
      return;
    case 'recherche':
      if (joueur.pioche.length === 0) return;
      break;
    case 'trash':
      if (cartesTrashables(joueur).length === 0) return;
      break;
    case 'vendre':
      if (cartesVendables(joueur).length === 0) return;
      break;
    case 'rejouer':
      break;
  }
  etat.attente = { type: 'gain', ...ref(tache), restant: tache.restant };
}

function reformerDeck(etat: Etat, joueur: Joueur): void {
  joueur.pioche.push(...joueur.main, ...joueur.defausse, ...joueur.aireDeJeu);
  joueur.main = [];
  joueur.defausse = [];
  joueur.aireDeJeu = [];
  melanger(etat, joueur.pioche);
  debuterLignee(etat, joueur);
  // Après l'Or et les cartes : le Privilège 8 (recherche), puis le Privilège 12 (pioche et défausse).
  const recherches = totalPrivilege(joueur, 'rechercheDebutLignee', (effet) => effet.cartes);
  const enPlus = totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes);
  const suite: Tache[] = [];
  if (recherches > 0) suite.push({ type: 'debutRecherche', joueur: joueur.id, restant: recherches });
  if (enPlus > 0) {
    suite.push(
      { type: 'debutPioche', joueur: joueur.id, cartes: enPlus },
      { type: 'debutDefausse', joueur: joueur.id, restant: enPlus },
    );
  }
  etat.file.unshift(...suite);
}

function traiter(etat: Etat, tache: Tache): void {
  switch (tache.type) {
    case 'etape':
      traiterEtape(etat, tache);
      return;
    case 'gain':
      traiterGain(etat, tache);
      return;
    case 'trashAchat': {
      const joueur = etat.joueurs[tache.joueur]!;
      if (joueur.or >= PARAMETRES.surcoutTrashAchat && cartesTrashables(joueur).length > 0) {
        etat.attente = { type: 'trashAchat', joueur: joueur.id };
      }
      return;
    }
    case 'finNoblesse': {
      const joueur = etat.joueurs[tache.joueur]!;
      const emplacement = MATERIEL.plateau.noblesse[joueur.privileges.length];
      if (
        emplacement &&
        etat.privilegesVisibles.length > 0 &&
        ressourcesEnJeu(joueur).erudit >= emplacement.erudits
      ) {
        etat.attente = { type: 'finNoblesse', joueur: joueur.id };
      }
      return;
    }
    case 'finEconomie': {
      const joueur = etat.joueurs[tache.joueur]!;
      const cout = coutProchainNiveau(joueur, 'economie');
      if (cout !== null && joueur.or >= cout) {
        etat.attente = { type: 'finEconomie', joueur: joueur.id };
      }
      return;
    }
    case 'finPopulation': {
      const joueur = etat.joueurs[tache.joueur]!;
      // Le reste de l'Or est défaussé une fois la question de l'Économie réglée (sauf Privilège 18).
      if (joueur.or > 0 && effetsPrivilege(joueur, 'conserveOr').length === 0) {
        noter(etat, joueur, `${joueur.nom} défausse ses ${joueur.or} Or restants.`);
        joueur.or = 0;
      }
      const cout = coutProchainNiveau(joueur, 'population');
      const r = ressourcesEnJeu(joueur);
      if (cout !== null && r.pierre + r.metal >= cout) {
        etat.attente = { type: 'finPopulation', joueur: joueur.id };
      }
      return;
    }
    case 'reformerDeck':
      reformerDeck(etat, etat.joueurs[tache.joueur]!);
      return;
    case 'debutRecherche':
      if (tache.restant > 0 && etat.joueurs[tache.joueur]!.pioche.length > 0) {
        etat.attente = { type: 'debutRecherche', joueur: tache.joueur, restant: tache.restant };
      }
      return;
    case 'debutPioche':
      piocher(etat, etat.joueurs[tache.joueur]!, tache.cartes);
      return;
    case 'debutDefausse':
      if (tache.restant > 0 && etat.joueurs[tache.joueur]!.main.length > 0) {
        etat.attente = { type: 'debutDefausse', joueur: tache.joueur, restant: tache.restant };
      }
      return;
    case 'finDeTour': {
      if (etat.toursSupplementaires > 0) {
        etat.toursSupplementaires--;
        noter(etat, etat.joueurs[etat.joueurActif]!, `${etat.joueurs[etat.joueurActif]!.nom} rejoue.`);
      } else {
        etat.joueurActif = (etat.joueurActif + 1) % etat.joueurs.length;
      }
      etat.attente = { type: 'tour', joueur: etat.joueurActif };
      return;
    }
  }
}

/** Résout tout ce qui peut l'être sans intervention, jusqu'au prochain choix d'un joueur ou la fin de partie. */
function avancer(etat: Etat): void {
  while (etat.attente === null && etat.vainqueur === null) {
    const tache = etat.file.shift();
    if (!tache) throw new Error('Plus rien à résoudre alors que la partie continue.');
    traiter(etat, tache);
  }
  if (etat.vainqueur !== null) {
    etat.attente = null;
    etat.file = [];
  }
}

/**
 * Applique une action et renvoie le nouvel état. L'état d'origine n'est pas modifié.
 * Lève une erreur si l'action n'est pas permise.
 */
export function applyAction(etat: Etat, action: Action): Etat {
  const cleAction = cle(action);
  if (!getLegalActions(etat, action.joueur).some((permise) => cle(permise) === cleAction)) {
    throw new Error(`Action illégale : ${JSON.stringify(action)}`);
  }
  // Le journal et l'historique ne font que s'allonger : on recopie leurs listes sans recopier
  // chaque entrée, pour que le coût d'une action ne grandisse pas avec la durée de la partie.
  const { journal, historique, ...reste } = etat;
  const suivant: Etat = {
    ...structuredClone(reste),
    journal: [...journal],
    historique: [...historique],
  };
  executer(suivant, suivant.attente!, action);
  suivant.historique.push(action);
  avancer(suivant);
  return suivant;
}
