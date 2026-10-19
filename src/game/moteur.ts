import type { Action, Attente, RefEtape, Tache } from './actions.ts';
import { carte, privilege } from './cartes.ts';
import { ordreDuTour } from './creation.ts';
import type { Etat, Joueur } from './etat.ts';
import { melanger } from './hasard.ts';
import { debuterLignee, noter, piocher } from './lignee.ts';
import { MATERIEL } from './materiel/index.ts';
import type { Cout, CoutEffet, Etape, Piste } from './materiel/index.ts';
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

/** Décision GG : le joueur peut aussi trasher la carte du dessus de sa pioche, sans la regarder. */
function peutTrasherPioche(joueur: Joueur): boolean {
  return PARAMETRES.trashDessusPioche && joueur.pioche.length > 0;
}

function peutTrasher(joueur: Joueur): boolean {
  return cartesTrashables(joueur).length > 0 || peutTrasherPioche(joueur);
}

/** Les choix d'un trash : une carte de sa main, de son aire de jeu ou de sa défausse, ou le dessus de sa pioche. */
function actionsDeTrash(joueur: Joueur): Action[] {
  const j = joueur.id;
  return [
    ...cartesTrashables(joueur).map((id): Action => ({ type: 'trasher', joueur: j, carte: id })),
    ...(peutTrasherPioche(joueur) ? [{ type: 'trasherPioche', joueur: j } satisfies Action] : []),
  ];
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

/**
 * Le joueur peut-il monter cette jauge en fin de lignée ? Selon le plateau, le niveau se paye
 * en Or, ou demande assez de Pierre et de Métal dans l'aire de jeu (sans les dépenser).
 * Les Ressources forment un budget commun aux deux jauges : « ressourcesUtilisees » est la part
 * déjà prise par l'autre jauge pendant cette fin de lignée.
 */
export function peutMonterEnFinDeLignee(
  joueur: Pick<Joueur, 'or' | 'aireDeJeu' | 'privileges' | 'niveauEconomie' | 'niveauPopulation'>,
  piste: Piste,
  ressourcesUtilisees = 0,
): boolean {
  const actuel = piste === 'economie' ? joueur.niveauEconomie : joueur.niveauPopulation;
  const suivant = MATERIEL.plateau[piste][actuel + 1];
  if (!suivant) return false;
  if (suivant.paiement === 'or') return joueur.or >= suivant.cout;
  const r = ressourcesEnJeu(joueur);
  return r.pierre + r.metal - ressourcesUtilisees >= suivant.cout;
}

/** Les jauges que le joueur peut encore monter pendant cette fin de lignée (1 niveau au plus par jauge). */
function jaugesPossibles(
  joueur: Joueur,
  attente: { ressourcesUtilisees: number; montees: Piste[]; seule?: Piste },
): Piste[] {
  return (['economie', 'population'] as const).filter(
    (piste) =>
      (attente.seule === undefined || piste === attente.seule) &&
      !attente.montees.includes(piste) &&
      peutMonterEnFinDeLignee(joueur, piste, attente.ressourcesUtilisees),
  );
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
  envoyerAuTrash(etat, joueur, id);
}

/** Trashe la carte du dessus de la pioche. Comme pour une pioche, prendre la dernière carte fait gagner. */
function trasherDessusPioche(etat: Etat, joueur: Joueur): void {
  const dessus = joueur.pioche.shift();
  if (dessus === undefined) throw new Error(`${joueur.nom} n'a pas de pioche à trasher`);
  noter(etat, joueur, `${joueur.nom} trashe la carte du dessus de sa pioche.`);
  envoyerAuTrash(etat, joueur, dessus);
  if (joueur.pioche.length === 0 && etat.vainqueur === null) {
    etat.vainqueur = joueur.id;
    noter(etat, joueur, `${joueur.nom} a trashé la dernière carte de sa pioche et remporte la partie !`);
  }
}

/** Applique un choix de trash (« trasher » ou « trasherPioche »). Renvoie false pour toute autre action. */
function executerTrash(etat: Etat, joueur: Joueur, action: Action): boolean {
  if (action.type === 'trasher') trasher(etat, joueur, action.carte);
  else if (action.type === 'trasherPioche') trasherDessusPioche(etat, joueur);
  else return false;
  return true;
}

/** Ce qui suit le retrait d'une carte trashée : trash public, Privilège 17, victoire si le deck est vide. */
function envoyerAuTrash(etat: Etat, joueur: Joueur, id: string): void {
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

/** Le coût complet d'une carte de la Rivière pour ce joueur, réductions des Privilèges déduites (jamais sous 0). */
export function coutDAchat(joueur: Pick<Joueur, 'privileges'>, id: string): Cout {
  const cout = carte(id).cout;
  const reduction = totalPrivilege(joueur, 'reductionRessource', (effet) => effet.ressource);
  return { ...cout, or: coutEnOr(joueur, id), ressource: Math.max(0, cout.ressource - reduction) };
}

/**
 * À appeler quand un joueur applique réellement une étape : si c'est l'Effet Rouge d'un adversaire,
 * le Privilège 20 lui rapporte de l'Or, 1 seule fois par carte jouée.
 */
function noterUsage(etat: Etat, joueur: Joueur, etape: RefEtape, choisi: boolean): void {
  if (!etape.rouge || etat.effetRougeUtilisePar.includes(joueur.id)) return;
  etat.effetRougeUtilisePar.push(joueur.id);
  // « choisi » : le joueur a payé ou fait un choix ; sinon l'effet s'est appliqué tout seul (gain d'Or…).
  if (choisi) joueur.statistiques.effetsRougesChoisis++;
  else joueur.statistiques.effetsRougesAutomatiques++;
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
      return peutTrasher(joueur);
    case 'vendre':
      return cartesVendables(joueur).length > 0;
    case 'achat':
      return achatsPossibles(etat, joueur).length > 0;
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
  return optionsDePaiement(joueur, coutDAchat(joueur, id));
}

/** Tous les achats possibles dans la Rivière, avec chaque façon de payer. */
function achatsPossibles(etat: Etat, joueur: Joueur): Action[] {
  const actions: Action[] = [];
  for (const id of etat.riviere) {
    for (const paiement of paiementsDeLAchat(joueur, id)) {
      actions.push({ type: 'acheter', joueur: joueur.id, carte: id, paiement });
    }
  }
  return actions;
}

/**
 * Achète une carte de la Rivière (action Acheter, ou gain « achete » d'une carte) :
 * la carte va dans la main, la Rivière est complétée aussitôt.
 */
/** Ce qui suit un achat : le trash à 1 Or (règles), ou le choix de la carte remplacée (essai). */
function apresAchat(joueur: Joueur, id: string): Tache {
  return PARAMETRES.carteAcheteeVa === 'remplacement'
    ? { type: 'remplacementAchat', joueur: joueur.id, carte: id }
    : { type: 'trashAchat', joueur: joueur.id };
}

/**
 * Achat par remplacement : la carte achetée prend la place de la carte remplacée, qui est trashée gratuitement.
 * « remplacee » null : c'est la première carte de la pioche qui est remplacée.
 */
function remplacer(etat: Etat, joueur: Joueur, achetee: string, remplacee: string | null): void {
  if (remplacee === null) {
    const dessus = joueur.pioche[0];
    if (dessus === undefined) throw new Error(`${joueur.nom} n'a pas de pioche à remplacer`);
    joueur.pioche[0] = achetee;
    noter(etat, joueur, `${joueur.nom} pose ${carte(achetee).nom} sur sa pioche, à la place de la première carte.`);
    envoyerAuTrash(etat, joueur, dessus);
    return;
  }
  const zone = [joueur.main, joueur.aireDeJeu, joueur.defausse].find((liste) => liste.includes(remplacee));
  if (!zone) throw new Error(`${joueur.nom} ne peut pas remplacer ${remplacee}`);
  // La carte achetée arrive d'abord : le deck ne paraît jamais vide pendant le remplacement.
  zone.push(achetee);
  noter(etat, joueur, `${joueur.nom} remplace ${carte(remplacee).nom} par ${carte(achetee).nom}.`);
  trasher(etat, joueur, remplacee);
}

function acheter(etat: Etat, joueur: Joueur, id: string, paiement: string[]): void {
  const c = carte(id);
  joueur.or -= coutEnOr(joueur, c.id);
  defausserDeLAire(joueur, paiement);
  retirer(etat.riviere, c.id);
  // En remplacement, la carte attend que le joueur choisisse la carte qu'elle remplace (remplacementAchat).
  if (PARAMETRES.carteAcheteeVa === 'defausse') joueur.defausse.push(c.id);
  else if (PARAMETRES.carteAcheteeVa === 'main') joueur.main.push(c.id);
  joueur.statistiques.cartesAchetees++;
  noter(etat, joueur, `${joueur.nom} achète ${c.nom}.`);
  const suivante = etat.piocheCommune.shift();
  if (suivante !== undefined) etat.riviere.push(suivante);
}

/** Les façons de payer un Privilège d'action (13, 14, 15). Aucune s'il n'y a rien à piocher ou à trasher. */
function paiementsDuPrivilege(joueur: Joueur, cout: CoutEffet, possible: boolean): string[][] {
  if (!possible || joueur.or < cout.or) return [];
  return optionsDePaiement(joueur, { pierre: cout.pierre, metal: cout.metal, ressource: 0 });
}

// ───────────────────────── Actions permises ─────────────────────────

function actionsDuTour(etat: Etat, joueur: Joueur): Action[] {
  const j = joueur.id;
  const actions: Action[] = joueur.main.map((id) => ({ type: 'jouer', joueur: j, carte: id }));
  actions.push(...achatsPossibles(etat, joueur));
  for (const effet of effetsPrivilege(joueur, 'actionPioche')) {
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout, joueur.pioche.length > 0)) {
      actions.push({ type: 'utiliserPrivilege', joueur: j, numero: effet.numero, paiement });
    }
  }
  for (const effet of effetsPrivilege(joueur, 'actionTrash')) {
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout, peutTrasher(joueur))) {
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
      return [...actionsDeTrash(joueur), passer];
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
    case 'achat':
      return [...achatsPossibles(etat, joueur), passer];
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
    case 'trashPrivilege':
      return [...actionsDeTrash(joueur), passer];
    case 'remplacementAchat':
      // Obligatoire : pas de « passer ».
      return [
        ...cartesTrashables(joueur).map((id): Action => ({ type: 'remplacer', joueur: j, carte: id })),
        ...(joueur.pioche.length > 0 ? [{ type: 'remplacerPioche', joueur: j } satisfies Action] : []),
      ];
    case 'finNoblesse':
      return [
        ...etat.privilegesVisibles.map(
          (numero): Action => ({ type: 'prendrePrivilege', joueur: j, numero }),
        ),
        passer,
      ];
    case 'finJauges':
      return [
        ...jaugesPossibles(joueur, attente).map((piste): Action => ({ type: 'monter', joueur: j, piste })),
        passer,
      ];
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
      if (c.origine === 'avancee') {
        const or = totalPrivilege(joueur, 'orParCarteAvanceeJouee', (effet) => effet.or);
        if (or > 0) {
          joueur.or += or;
          noter(etat, joueur, `${joueur.nom} gagne ${or} Or grâce à son Privilège.`);
        }
      }
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
    case 'acheter':
      acheter(etat, joueur, action.carte, action.paiement);
      etat.file = [apresAchat(joueur, action.carte), { type: 'finDeTour' }];
      return;
    case 'utiliserPrivilege': {
      const effet = [...effetsPrivilege(joueur, 'actionPioche'), ...effetsPrivilege(joueur, 'actionTrash')].find(
        (e) => e.numero === action.numero,
      );
      if (!effet) return;
      joueur.or -= effet.cout.or;
      defausserDeLAire(joueur, action.paiement);
      noter(etat, joueur, `${joueur.nom} utilise son Privilège ${effet.numero}.`);
      if (effet.type === 'actionPioche') {
        joueur.statistiques.piochesSupplementaires += piocher(etat, joueur, effet.cartes).length;
        etat.file = [{ type: 'finDeTour' }];
      } else {
        etat.file = [{ type: 'trashPrivilege', joueur: j, restant: effet.cartes }, { type: 'finDeTour' }];
      }
      return;
    }
    case 'finLignee':
      noter(etat, joueur, `${joueur.nom} met fin à sa lignée.`);
      etat.file = [
        { type: 'finNoblesse', joueur: j },
        // Les jauges, dans l'ordre fixé par les règles, ou au choix du joueur (budget de Ressources commun).
        ...(PARAMETRES.ordreDesJauges === null
          ? [{ type: 'finJauges', joueur: j, ressourcesUtilisees: 0, montees: [] } satisfies Tache]
          : PARAMETRES.ordreDesJauges.map(
              (seule): Tache => ({ type: 'finJauges', joueur: j, ressourcesUtilisees: 0, montees: [], seule }),
            )),
        { type: 'defausserOr', joueur: j },
        { type: 'reformerDeck', joueur: j },
        { type: 'finDeTour' },
      ];
      return;
  }
}

function executerPaiement(etat: Etat, joueur: Joueur, attente: RefEtape, action: Action): void {
  if (action.type !== 'payer') return; // « passer » : le joueur renonce à cette étape.
  const etape = etapeDe(attente);
  // Le nombre de gains est compté avant de payer : les ressources défaussées pour payer comptent encore
  // pour cet effet (« Paye 1 Métal pour trasher 1 carte par 2 Métal »), et ne compteront plus pour les suivants.
  const gains = nombreDeGains(joueur, etape);
  joueur.or -= etape.cout?.or ?? 0;
  defausserDeLAire(joueur, action.paiement);
  noterUsage(etat, joueur, attente, true);
  const suite: Tache[] = [{ type: 'gain', ...ref(attente), restant: gains }];
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
    case 'trasherPioche':
      executerTrash(etat, joueur, action);
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
    case 'acheter':
      acheter(etat, joueur, action.carte, action.paiement);
      break;
    default:
      return; // « passer » : le joueur s'arrête là.
  }
  noterUsage(etat, joueur, attente, true);
  if (encore > 0) etat.file.unshift({ type: 'gain', ...ref(attente), restant: encore });
  // Comme pour l'action Acheter : trash à 1 Or ou remplacement, avant la suite de l'effet.
  if (action.type === 'acheter') etat.file.unshift(apresAchat(joueur, action.carte));
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
      if (action.type === 'trasher' || action.type === 'trasherPioche') {
        joueur.or -= PARAMETRES.surcoutTrashAchat;
        executerTrash(etat, joueur, action);
      }
      return;
    case 'remplacementAchat':
      if (action.type === 'remplacer') remplacer(etat, joueur, attente.carte, action.carte);
      if (action.type === 'remplacerPioche') remplacer(etat, joueur, attente.carte, null);
      return;
    case 'trashPrivilege':
      if (!executerTrash(etat, joueur, action)) return;
      etat.file.unshift({ type: 'trashPrivilege', joueur: joueur.id, restant: attente.restant - 1 });
      return;
    case 'finNoblesse':
      if (action.type === 'prendrePrivilege') prendrePrivilegeVisible(etat, joueur, action.numero);
      return;
    case 'finJauges': {
      if (action.type !== 'monter') return; // « passer » : le joueur ne monte plus de jauge.
      const suivant = MATERIEL.plateau[action.piste][niveau(joueur, action.piste) + 1];
      let ressourcesUtilisees = attente.ressourcesUtilisees;
      if (suivant?.paiement === 'or') joueur.or -= suivant.cout;
      else ressourcesUtilisees += suivant?.cout ?? 0;
      monter(etat, joueur, action.piste);
      const montees = [...attente.montees, action.piste];
      if (attente.seule === undefined) {
        etat.file.unshift({ type: 'finJauges', joueur: joueur.id, ressourcesUtilisees, montees });
      } else {
        // Ordre fixe : la jauge suivante tient compte des Ressources déjà utilisées.
        for (const tache of etat.file) {
          if (tache.type === 'finJauges' && tache.joueur === joueur.id) Object.assign(tache, { ressourcesUtilisees, montees });
        }
      }
      return;
    }
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
      noterUsage(etat, joueur, tache, false);
      return;
    }
    case 'lvlup':
      if (niveau(joueur, gain.piste) < niveauMax(gain.piste)) {
        monter(etat, joueur, gain.piste);
        noterUsage(etat, joueur, tache, false);
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
        noterUsage(etat, joueur, tache, false);
        return;
      }
      if (etat.privilegesVisibles.length === 0) return;
      break;
    case 'pioche':
      // Le joueur pioche directement tout ce à quoi il a droit.
      const piochees = piocher(etat, joueur, tache.restant).length;
      joueur.statistiques.piochesSupplementaires += piochees;
      if (piochees > 0) noterUsage(etat, joueur, tache, false);
      return;
    case 'recherche':
      if (joueur.pioche.length === 0) return;
      break;
    case 'trash':
      if (!peutTrasher(joueur)) return;
      break;
    case 'vendre':
      if (cartesVendables(joueur).length === 0) return;
      break;
    case 'achat':
      if (achatsPossibles(etat, joueur).length === 0) return;
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
  // Après l'Or et les cartes : le Privilège 12 (pioche et défausse), puis le Privilège 8 (recherche).
  // Décision II.
  const recherches = totalPrivilege(joueur, 'rechercheDebutLignee', (effet) => effet.cartes);
  const enPlus = totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes);
  const suite: Tache[] = [];
  if (enPlus > 0) {
    suite.push(
      { type: 'debutPioche', joueur: joueur.id, cartes: enPlus },
      { type: 'debutDefausse', joueur: joueur.id, restant: enPlus },
    );
  }
  if (recherches > 0) suite.push({ type: 'debutRecherche', joueur: joueur.id, restant: recherches });
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
      if (joueur.or >= PARAMETRES.surcoutTrashAchat && peutTrasher(joueur)) {
        etat.attente = { type: 'trashAchat', joueur: joueur.id };
      }
      return;
    }
    case 'remplacementAchat': {
      const joueur = etat.joueurs[tache.joueur]!;
      // Sans aucune carte à remplacer (cas extrême), la carte achetée va dans la défausse.
      if (cartesTrashables(joueur).length === 0 && joueur.pioche.length === 0) joueur.defausse.push(tache.carte);
      else etat.attente = { ...tache };
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
    case 'trashPrivilege': {
      const joueur = etat.joueurs[tache.joueur]!;
      if (tache.restant > 0 && peutTrasher(joueur)) {
        etat.attente = { type: 'trashPrivilege', joueur: joueur.id, restant: tache.restant };
      }
      return;
    }
    case 'finJauges':
      if (jaugesPossibles(etat.joueurs[tache.joueur]!, tache).length > 0) etat.attente = { ...tache };
      return;
    case 'defausserOr': {
      const joueur = etat.joueurs[tache.joueur]!;
      // Le reste de l'Or est défaussé une fois les jauges réglées (sauf Privilège 18).
      if (joueur.or > 0 && effetsPrivilege(joueur, 'conserveOr').length === 0) {
        noter(etat, joueur, `${joueur.nom} défausse ses ${joueur.or} Or restants.`);
        joueur.or = 0;
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
        etat.joueurs[etat.joueurActif]!.statistiques.toursRejoues++;
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
