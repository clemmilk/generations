import type { Action, Attente, Reduction, RefEtape, Tache } from './actions.ts';
import { carte, nomsDesCartes, privilege } from './cartes.ts';
import { ordreDuTour } from './creation.ts';
import type { Etat, Joueur } from './etat.ts';
import { melanger } from './hasard.ts';
import { aUneRessource, debuterLignee, noter, piocher, revelerCartes } from './lignee.ts';
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
  if (suivant.paiement === 'or') return joueur.or >= coutEnOrDuNiveau(joueur, piste, suivant.cout);
  const r = ressourcesEnJeu(joueur);
  return r.pierre + r.metal - ressourcesUtilisees >= suivant.cout;
}

/** Privilège 7 : monter en Population coûte moins d'Or, jamais moins de 0 (décision WW). */
function reductionPopulation(joueur: Pick<Joueur, 'privileges'>): number {
  return totalPrivilege(joueur, 'reductionPopulation', (effet) => effet.or);
}

/** Le coût en Or d'un niveau de jauge, réduction du Privilège 7 déduite pour la Population. */
export function coutEnOrDuNiveau(joueur: Pick<Joueur, 'privileges'>, piste: Piste, cout: number): number {
  return piste === 'population' ? Math.max(0, cout - reductionPopulation(joueur)) : cout;
}

/** Ce que coûte une étape d'effet à ce joueur : le Privilège 7 réduit l'Or à payer pour monter en Population. */
export function coutDeLEtape(joueur: Pick<Joueur, 'privileges'>, etape: Etape): CoutEffet | null {
  const cout = etape.cout;
  if (!cout || etape.gain.type !== 'lvlup' || etape.gain.piste !== 'population') return cout;
  return { ...cout, or: Math.max(0, cout.or - reductionPopulation(joueur)) };
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
  noter(etat, joueur, `${joueur.nom} trashe ${carte(id).nom}.`, null, [id]);
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
    [],
    [id],
  );
  if (joueur.pioche.length === 0 && etat.vainqueur === null) {
    etat.vainqueur = joueur.id;
    noter(etat, joueur, `${joueur.nom} a pris la dernière carte de son deck et remporte la partie !`);
  }
}

/**
 * Le coût en Or d'une carte de la Rivière pour ce joueur, réductions des Privilèges déduites (jamais sous 0).
 * « choix » : la réduction choisie pour cet achat avec le Privilège 1 (décision GGG) ; par défaut, celle sur l'Or.
 */
export function coutEnOr(joueur: Pick<Joueur, 'privileges'>, id: string, choix: Reduction = 'or'): number {
  let reduction = totalPrivilege(joueur, 'reductionAchat', (effet) => effet.or);
  if (choix === 'or') reduction += totalPrivilege(joueur, 'reductionAchatAuChoix', (effet) => effet.or);
  return Math.max(0, carte(id).cout.or - reduction);
}

/** Le coût complet d'une carte de la Rivière pour ce joueur, réductions des Privilèges déduites (jamais sous 0). */
export function coutDAchat(joueur: Pick<Joueur, 'privileges'>, id: string, choix: Reduction = 'or'): Cout {
  const cout = carte(id).cout;
  let reduction = totalPrivilege(joueur, 'reductionRessource', (effet) => effet.ressource);
  if (choix === 'ressource') reduction += totalPrivilege(joueur, 'reductionAchatAuChoix', (effet) => effet.ressource);
  return { ...cout, or: coutEnOr(joueur, id, choix), ressource: Math.max(0, cout.ressource - reduction) };
}

/**
 * Les réductions entre lesquelles le joueur peut choisir pour acheter cette carte (Privilège 1, décision GGG).
 * Sans ce Privilège : [null], aucun choix. Avec : seulement celles qui changent quelque chose
 * (moins d'Or si la carte coûte de l'Or, moins de Ressources si elle en coûte), au moins une.
 */
function reductionsPossibles(joueur: Pick<Joueur, 'privileges'>, id: string): (Reduction | null)[] {
  if (effetsPrivilege(joueur, 'reductionAchatAuChoix').length === 0) return [null];
  const cout = carte(id).cout;
  const choix: Reduction[] = [];
  if (cout.or > 0) choix.push('or');
  if (cout.ressource > 0) choix.push('ressource');
  return choix.length > 0 ? choix : ['or'];
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
  if (
    gain.type === 'pioche' ||
    gain.type === 'trash' ||
    gain.type === 'recherche' ||
    gain.type === 'joue' ||
    gain.type === 'revele'
  ) {
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
    case 'revele':
      return joueur.pioche.length > 0;
    case 'joue':
      return joueur.main.length > 0;
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

/**
 * Les façons de payer une étape. On paye d'abord, puis on compte (décision SS) : on ne propose pas
 * un paiement après lequel il ne resterait rien à gagner (par exemple, payer en défaussant les cartes comptées).
 */
function paiementsDeLEtape(joueur: Joueur, etape: Etape): string[][] {
  const cout = coutDeLEtape(joueur, etape);
  if (!cout) return [[]];
  if (joueur.or < cout.or) return [];
  const options = optionsDePaiement(joueur, { pierre: cout.pierre, metal: cout.metal, ressource: 0 });
  if (!etape.par) return options;
  return options.filter((paiement) => {
    const copie = copieDesCartes(joueur);
    copie.or -= cout.or;
    defausserDeLAire(copie, paiement);
    return nombreDeGains(copie, etape) > 0;
  });
}

function paiementsDeLAchat(joueur: Joueur, id: string, choix: Reduction = 'or'): string[][] {
  if (joueur.or < coutEnOr(joueur, id, choix)) return [];
  return optionsDePaiement(joueur, coutDAchat(joueur, id, choix));
}

/** Tous les achats possibles dans la Rivière, avec chaque façon de payer (et chaque réduction du Privilège 1). */
function achatsPossibles(etat: Etat, joueur: Joueur): Action[] {
  const actions: Action[] = [];
  for (const id of etat.riviere) {
    for (const reduction of reductionsPossibles(joueur, id)) {
      for (const paiement of paiementsDeLAchat(joueur, id, reduction ?? 'or')) {
        actions.push(
          reduction === null
            ? { type: 'acheter', joueur: joueur.id, carte: id, paiement }
            : { type: 'acheter', joueur: joueur.id, carte: id, paiement, reduction },
        );
      }
    }
  }
  return actions;
}

/**
 * Achète une carte de la Rivière (action Acheter, ou gain « achete » d'une carte) :
 * la carte va dans la main, la Rivière est complétée aussitôt.
 */
/**
 * Ce qui suit un achat, ajouté en tête de la file : le trash à 1 Or (règles), ou le choix de la carte
 * remplacée (essai). Puis, avec le Privilège 9, jouer 1 carte de sa main (décision XX) : tout de suite
 * après l'action Acheter ou le Privilège 10, et, si l'achat vient d'une carte, une fois cette carte
 * entièrement résolue (juste avant sa « finCarte »), comme « Rejouer 1 carte ».
 */
function apresAchat(etat: Etat, joueur: Joueur, id: string): void {
  // Privilège 10 (révéler), puis Privilège 9 (jouer 1 carte) : décision BBB.
  const enPlus: Tache[] = [
    ...effetsPrivilege(joueur, 'reveleApresAchat').map(
      (effet): Tache => ({ type: 'reveleEnPlus', joueur: joueur.id, cartes: effet.cartes }),
    ),
    ...effetsPrivilege(joueur, 'joueApresAchat').map((): Tache => ({ type: 'jouerEnPlus', joueur: joueur.id, restant: 1 })),
  ];
  if (enPlus.length > 0) {
    const fin = etat.file.findIndex((suivante) => suivante.type === 'finCarte');
    etat.file.splice(fin === -1 ? 0 : fin, 0, ...enPlus);
  }
  etat.file.unshift(
    PARAMETRES.carteAcheteeVa === 'remplacement'
      ? { type: 'remplacementAchat', joueur: joueur.id, carte: id }
      : { type: 'trashAchat', joueur: joueur.id },
  );
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
    noter(etat, joueur, `${joueur.nom} pose ${carte(achetee).nom} sur sa pioche, à la place de la première carte.`, null, [achetee]);
    envoyerAuTrash(etat, joueur, dessus);
    return;
  }
  const zone = [joueur.main, joueur.aireDeJeu, joueur.defausse].find((liste) => liste.includes(remplacee));
  if (!zone) throw new Error(`${joueur.nom} ne peut pas remplacer ${remplacee}`);
  // La carte achetée arrive d'abord : le deck ne paraît jamais vide pendant le remplacement.
  zone.push(achetee);
  noter(etat, joueur, `${joueur.nom} remplace ${carte(remplacee).nom} par ${carte(achetee).nom}.`, null, [remplacee, achetee]);
  trasher(etat, joueur, remplacee);
}

function acheter(etat: Etat, joueur: Joueur, id: string, paiement: string[], reduction: Reduction = 'or'): void {
  const c = carte(id);
  joueur.or -= coutEnOr(joueur, c.id, reduction);
  defausserDeLAire(joueur, paiement);
  retirer(etat.riviere, c.id);
  // En remplacement, la carte attend que le joueur choisisse la carte qu'elle remplace (remplacementAchat).
  if (PARAMETRES.carteAcheteeVa === 'defausse') joueur.defausse.push(c.id);
  else if (PARAMETRES.carteAcheteeVa === 'main') joueur.main.push(c.id);
  joueur.statistiques.cartesAchetees++;
  noter(etat, joueur, `${joueur.nom} achète ${c.nom}.`, null, [c.id]);
  const suivante = etat.piocheCommune.shift();
  if (suivante !== undefined) etat.riviere.push(suivante);
}

/** Les façons de payer un Privilège d'action (13, 14, 15). Aucune s'il n'y a rien à piocher ou à trasher. */
function paiementsDuPrivilege(joueur: Joueur, cout: CoutEffet, possible: boolean): string[][] {
  if (!possible || joueur.or < cout.or) return [];
  return optionsDePaiement(joueur, { pierre: cout.pierre, metal: cout.metal, ressource: 0 });
}

/** Le joueur peut-il encore faire l'action de son tour ? (La fin de lignée lui est interdite s'il a utilisé un Privilège.) */
function peutFaireSonAction(etat: Etat, joueur: Joueur): boolean {
  return joueur.main.length > 0 || achatsPossibles(etat, joueur).length > 0;
}

/** Une copie pour tester un choix : l'état de la partie n'est jamais touché. */
function copieDesCartes(joueur: Joueur): Joueur {
  return {
    ...joueur,
    main: [...joueur.main],
    aireDeJeu: [...joueur.aireDeJeu],
    defausse: [...joueur.defausse],
    pioche: [...joueur.pioche],
  };
}

/**
 * Les choix d'un trash de Privilège. Avant l'action du tour, on retire ceux qui laisseraient le joueur
 * sans aucune action possible, sauf le trash qui lui fait gagner la partie.
 */
function choixDuTrashPrivilege(etat: Etat, joueur: Joueur, avantAction: boolean): Action[] {
  const passer: Action = { type: 'passer', joueur: joueur.id };
  if (!avantAction) return [...actionsDeTrash(joueur), passer];
  const orGagne = totalPrivilege(joueur, 'orParTrash', (effet) => effet.or);
  const choix = actionsDeTrash(joueur).filter((action) => {
    const copie = copieDesCartes(joueur);
    copie.or += orGagne;
    if (action.type === 'trasherPioche') copie.pioche.shift();
    if (action.type === 'trasher' && !retirer(copie.main, action.carte) && !retirer(copie.aireDeJeu, action.carte)) {
      retirer(copie.defausse, action.carte);
    }
    return copie.pioche.length + cartesTrashables(copie).length === 0 || peutFaireSonAction(etat, copie);
  });
  return peutFaireSonAction(etat, joueur) ? [...choix, passer] : choix;
}

/** Les Privilèges d'action encore utilisables pendant ce tour : chaque tuile sert 1 fois par tour. */
function actionsDePrivilege(etat: Etat, joueur: Joueur, avantAction: boolean): Action[] {
  const j = joueur.id;
  const actions: Action[] = [];
  const disponible = (numero: number) => !etat.privilegesUtilises.includes(numero);
  for (const effet of effetsPrivilege(joueur, 'actionPioche')) {
    if (!disponible(effet.numero)) continue;
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout, joueur.pioche.length > 0)) {
      actions.push({ type: 'utiliserPrivilege', joueur: j, numero: effet.numero, paiement });
    }
  }
  for (const effet of effetsPrivilege(joueur, 'actionTrash')) {
    if (!disponible(effet.numero)) continue;
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout, peutTrasher(joueur))) {
      if (avantAction) {
        // Un Privilège qui laisserait le joueur sans aucune action possible est interdit.
        const copie = copieDesCartes(joueur);
        copie.or -= effet.cout.or;
        defausserDeLAire(copie, paiement);
        if (choixDuTrashPrivilege(etat, copie, true).length === 0) continue;
      }
      actions.push({ type: 'utiliserPrivilege', joueur: j, numero: effet.numero, paiement });
    }
  }
  for (const effet of effetsPrivilege(joueur, 'actionRevele')) {
    if (!disponible(effet.numero)) continue;
    for (const paiement of paiementsDuPrivilege(joueur, effet.cout, joueur.pioche.length > 0)) {
      // Avant l'action, comme pour le trash : interdit s'il laisse le joueur sans aucune action possible,
      // sauf s'il révèle la dernière carte de sa pioche (il gagne). La carte révélée n'est pas connue
      // d'avance : on ne compte pas les ressources qu'elle apportera.
      if (avantAction && joueur.pioche.length > effet.cartes) {
        const copie = copieDesCartes(joueur);
        copie.or -= effet.cout.or;
        defausserDeLAire(copie, paiement);
        if (!peutFaireSonAction(etat, copie)) continue;
      }
      actions.push({ type: 'utiliserPrivilege', joueur: j, numero: effet.numero, paiement });
    }
  }
  return actions;
}

// ───────────────────────── Actions permises ─────────────────────────

/**
 * Renouveler la Rivière (décision FFF) : avant son action, 1 fois par tour, s'il a l'Or et s'il reste
 * assez de cartes dans la pioche commune. Une action par groupe de cartes de la Rivière (exactement « cartes »).
 */
function renouvellementsPossibles(etat: Etat, joueur: Joueur): Action[] {
  const { cout, cartes } = PARAMETRES.renouvellementRiviere;
  if (etat.riviereRenouvelee || joueur.or < cout) return [];
  if (etat.piocheCommune.length < cartes || etat.riviere.length < cartes) return [];
  const groupes: string[][] = [];
  const choisir = (debut: number, choisies: string[]) => {
    if (choisies.length === cartes) {
      groupes.push(choisies);
      return;
    }
    for (let i = debut; i < etat.riviere.length; i++) choisir(i + 1, [...choisies, etat.riviere[i]!]);
  };
  choisir(0, []);
  // Comme pour les Privilèges d'action (décision LL) : interdit s'il laisse le joueur sans aucune action.
  // On ne compte que les actions sûres : jouer, finir sa lignée, ou acheter une carte restée dans la Rivière
  // (les remplaçantes sont inconnues tant qu'elles ne sont pas piochées).
  const jouerOuFinir =
    joueur.main.length > 0 ||
    (joueur.main.length <= PARAMETRES.mainMaxPourFinDeLignee && etat.privilegesUtilises.length === 0);
  const apresPaiement = { ...copieDesCartes(joueur), or: joueur.or - cout };
  return groupes
    .filter(
      (groupe) =>
        jouerOuFinir ||
        achatsPossibles({ ...etat, riviere: etat.riviere.filter((id) => !groupe.includes(id)) }, apresPaiement).length > 0,
    )
    .map((groupe): Action => ({ type: 'renouvelerRiviere', joueur: joueur.id, cartes: groupe }));
}

/** Remplace les cartes choisies de la Rivière : les remplaçantes sont piochées d'abord, puis les cartes retirées vont sous la pioche commune. */
function renouvelerRiviere(etat: Etat, joueur: Joueur, cartes: string[]): void {
  joueur.or -= PARAMETRES.renouvellementRiviere.cout;
  etat.riviereRenouvelee = true;
  joueur.statistiques.renouvellementsRiviere++;
  const nouvelles = etat.piocheCommune.splice(0, cartes.length);
  etat.riviere = etat.riviere.map((id) => {
    const position = cartes.indexOf(id);
    return position === -1 ? id : nouvelles[position]!;
  });
  etat.piocheCommune.push(...cartes);
  noter(
    etat,
    joueur,
    `${joueur.nom} paye ${PARAMETRES.renouvellementRiviere.cout} Or et renouvelle la Rivière : ${nomsDesCartes(cartes)} remplacées par ${nomsDesCartes(nouvelles)}.`,
    null,
    [...cartes, ...nouvelles],
  );
}

function actionsDuTour(etat: Etat, joueur: Joueur): Action[] {
  const j = joueur.id;
  const actions: Action[] = joueur.main.map((id) => ({ type: 'jouer', joueur: j, carte: id }));
  actions.push(...achatsPossibles(etat, joueur));
  actions.push(...actionsDePrivilege(etat, joueur, true));
  actions.push(...renouvellementsPossibles(etat, joueur));
  // Un tour avec une fin de lignée ne comporte aucun Privilège d'action.
  if (joueur.main.length <= PARAMETRES.mainMaxPourFinDeLignee && etat.privilegesUtilises.length === 0) {
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
    case 'joue':
    case 'revele':
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
      return [...actionsDeTrash(joueur), passer];
    case 'trashPrivilege':
      return choixDuTrashPrivilege(etat, joueur, attente.avantAction);
    case 'apresAction':
      return [...actionsDePrivilege(etat, joueur, false), passer];
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
    case 'jouerEnPlus':
      return [...joueur.main.map((id): Action => ({ type: 'jouer', joueur: j, carte: id })), passer];
    case 'achatEnPlus':
      return [...achatsPossibles(etat, joueur), passer];
  }
}

/** Deux actions sont les mêmes si elles ont la même clé (l'ordre des cartes d'un paiement ne compte pas). */
function cle(action: Action): string {
  return JSON.stringify([
    action.type,
    action.joueur,
    'carte' in action ? action.carte : null,
    'paiement' in action ? [...action.paiement].sort() : null,
    'cartes' in action ? [...action.cartes].sort() : null,
    'numero' in action ? action.numero : null,
    'piste' in action ? action.piste : null,
    'reduction' in action ? (action.reduction ?? null) : null,
  ]);
}

// ───────────────────────── Exécution d'une action ─────────────────────────

/** Paie un Privilège d'action et applique son effet. « ensuite » : la tâche à résoudre après lui. */
function utiliserPrivilege(
  etat: Etat,
  joueur: Joueur,
  action: Extract<Action, { type: 'utiliserPrivilege' }>,
  avantAction: boolean,
  ensuite: Tache,
): void {
  const effet = [
    ...effetsPrivilege(joueur, 'actionPioche'),
    ...effetsPrivilege(joueur, 'actionTrash'),
    ...effetsPrivilege(joueur, 'actionRevele'),
  ].find((e) => e.numero === action.numero);
  if (!effet) return;
  joueur.or -= effet.cout.or;
  defausserDeLAire(joueur, action.paiement);
  etat.privilegesUtilises.push(effet.numero);
  noter(etat, joueur, `${joueur.nom} utilise son Privilège ${effet.numero}.`);
  if (effet.type === 'actionPioche') {
    joueur.statistiques.piochesSupplementaires += piocher(etat, joueur, effet.cartes).length;
    etat.file.unshift(ensuite);
  } else if (effet.type === 'actionRevele') {
    revelerCartes(etat, joueur, effet.cartes);
    etat.file.unshift(ensuite);
  } else {
    etat.file.unshift({ type: 'trashPrivilege', joueur: joueur.id, restant: effet.cartes, avantAction }, ensuite);
  }
}

/**
 * Pose une carte de la main en jeu et renvoie ce qu'il faut résoudre : son effet, puis l'Effet Rouge
 * du ou des adversaires concernés, puis « finCarte ». Sert à l'action Jouer et à « Rejouer 1 carte ».
 */
function jouerCarte(etat: Etat, joueur: Joueur, id: string): Tache[] {
  const j = joueur.id;
  const c = carte(id);
  retirer(joueur.main, c.id);
  // Décision III : toute carte jouée va dans l'aire de jeu, même sans ressource (paramètre carteSansRessourceVa).
  if (aUneRessource(c) || PARAMETRES.carteSansRessourceVa === 'aireDeJeu') joueur.aireDeJeu.push(c.id);
  else joueur.defausse.push(c.id);
  reveler(etat, c.id);
  joueur.statistiques.cartesJouees++;
  noter(etat, joueur, `${joueur.nom} joue ${c.nom}.`, null, [c.id]);
  if (c.origine === 'avancee') {
    const or = totalPrivilege(joueur, 'orParCarteAvanceeJouee', (effet) => effet.or);
    if (or > 0) {
      joueur.or += or;
      noter(etat, joueur, `${joueur.nom} gagne ${or} Or grâce à son Privilège.`);
    }
  }
  if (c.effetRouge.length > 0) {
    // Privilège 6 (décision AAA) : l'Or est gagné en posant la carte, même si personne n'applique l'Effet Rouge.
    const or = totalPrivilege(joueur, 'orParCarteRougeJouee', (effet) => effet.or);
    if (or > 0) {
      joueur.or += or;
      noter(etat, joueur, `${joueur.nom} gagne ${or} Or grâce à son Privilège.`);
    }
  }
  etat.effetRougeUtilisePar = [];
  // D'abord l'effet du joueur actif, puis l'Effet Rouge de chaque adversaire dans l'ordre du tour.
  const tousLesAdversaires = ordreDuTour(etat, j).slice(1);
  const adversaires =
    PARAMETRES.effetRougePour === 'suivant'
      ? tousLesAdversaires.slice(0, 1)
      : PARAMETRES.effetRougePour === 'precedent'
        ? tousLesAdversaires.slice(-1)
        : tousLesAdversaires;
  return [
    ...c.effet.map((_, index): Tache => ({ type: 'etape', joueur: j, carte: c.id, index, rouge: false })),
    ...adversaires.flatMap((adversaire) =>
      c.effetRouge.map(
        (_, index): Tache => ({ type: 'etape', joueur: adversaire.id, carte: c.id, index, rouge: true }),
      ),
    ),
    { type: 'finCarte' },
  ];
}

function executerTour(etat: Etat, joueur: Joueur, action: Action): void {
  const j = joueur.id;
  // Un Privilège d'action s'ajoute à l'action du tour : le joueur doit encore la faire.
  if (action.type === 'utiliserPrivilege') {
    utiliserPrivilege(etat, joueur, action, true, { type: 'retourAuTour', joueur: j });
    return;
  }
  // Renouveler la Rivière s'ajoute aussi à l'action du tour, qui reste à faire.
  if (action.type === 'renouvelerRiviere') {
    renouvelerRiviere(etat, joueur, action.cartes);
    etat.file.unshift({ type: 'retourAuTour', joueur: j });
    return;
  }
  joueur.statistiques.tours++;
  switch (action.type) {
    case 'jouer':
      etat.file = [...jouerCarte(etat, joueur, action.carte), { type: 'apresAction', joueur: j }, { type: 'finDeTour' }];
      return;
    case 'acheter':
      acheter(etat, joueur, action.carte, action.paiement, action.reduction);
      etat.file = [{ type: 'apresAction', joueur: j }, { type: 'finDeTour' }];
      apresAchat(etat, joueur, action.carte);
      return;
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
  // On paye d'abord, puis on compte ce qui reste (décision SS) : les cartes défaussées pour payer
  // et l'Or dépensé ne comptent plus (« Paye 5 Or pour révéler 1 carte par stock d'or »).
  joueur.or -= coutDeLEtape(joueur, etape)?.or ?? 0;
  defausserDeLAire(joueur, action.paiement);
  const gains = nombreDeGains(joueur, etape);
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
      noter(etat, joueur, `${joueur.nom} vend ${carte(action.carte).nom} pour ${or} Or.`, null, [action.carte]);
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
      acheter(etat, joueur, action.carte, action.paiement, action.reduction);
      break;
    default:
      return; // « passer » : le joueur s'arrête là.
  }
  noterUsage(etat, joueur, attente, true);
  if (encore > 0) etat.file.unshift({ type: 'gain', ...ref(attente), restant: encore });
  // Comme pour l'action Acheter : trash à 1 Or ou remplacement, avant la suite de l'effet.
  if (action.type === 'acheter') apresAchat(etat, joueur, action.carte);
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
      etat.file.unshift({
        type: 'trashPrivilege',
        joueur: joueur.id,
        restant: attente.restant - 1,
        avantAction: attente.avantAction,
      });
      return;
    case 'apresAction':
      if (action.type === 'utiliserPrivilege') {
        utiliserPrivilege(etat, joueur, action, false, { type: 'apresAction', joueur: joueur.id });
      }
      return;
    case 'finNoblesse':
      if (action.type === 'prendrePrivilege') prendrePrivilegeVisible(etat, joueur, action.numero);
      return;
    case 'finJauges': {
      if (action.type !== 'monter') return; // « passer » : le joueur ne monte plus de jauge.
      const suivant = MATERIEL.plateau[action.piste][niveau(joueur, action.piste) + 1];
      let ressourcesUtilisees = attente.ressourcesUtilisees;
      if (suivant?.paiement === 'or') joueur.or -= coutEnOrDuNiveau(joueur, action.piste, suivant.cout);
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
      noter(
        etat,
        joueur,
        `${joueur.nom} défausse 1 carte de sa main.`,
        `Carte défaussée : ${carte(action.carte).nom}.`,
        [],
        [action.carte],
      );
      etat.file.unshift({ type: 'debutDefausse', joueur: joueur.id, restant: attente.restant - 1 });
      return;
    case 'jouerEnPlus': {
      if (action.type !== 'jouer') return; // « passer » : le joueur ne joue pas de carte en plus.
      // La carte en plus est entièrement résolue (effet, Effet Rouge) avant une éventuelle suivante.
      const suite: Tache[] = jouerCarte(etat, joueur, action.carte);
      if (attente.restant > 1) suite.push({ type: 'jouerEnPlus', joueur: joueur.id, restant: attente.restant - 1 });
      etat.file.unshift(...suite);
      return;
    }
    case 'achatEnPlus':
      if (action.type !== 'acheter') return;
      acheter(etat, joueur, action.carte, action.paiement, action.reduction);
      apresAchat(etat, joueur, action.carte);
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
    case 'revele': {
      const revelees = revelerCartes(etat, joueur, tache.restant).length;
      joueur.statistiques.piochesSupplementaires += revelees;
      if (revelees > 0) noterUsage(etat, joueur, tache, false);
      return;
    }
    case 'joue': {
      // La carte en plus se joue une fois la carte en cours entièrement résolue (décision QQ) :
      // juste avant la fin de sa résolution.
      const fin = etat.file.findIndex((suivante) => suivante.type === 'finCarte');
      const enPlus: Tache = { type: 'jouerEnPlus', joueur: joueur.id, restant: tache.restant };
      if (fin === -1) etat.file.unshift(enPlus);
      else etat.file.splice(fin, 0, enPlus);
      noterUsage(etat, joueur, tache, false);
      return;
    }
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
  // Privilège 10 : une fois toute la mise en place faite, un achat comme au premier tour (décision YY).
  for (const _ of effetsPrivilege(joueur, 'achatDebutLignee')) {
    suite.push({ type: 'achatEnPlus', joueur: joueur.id });
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
        etat.attente = {
          type: 'trashPrivilege',
          joueur: joueur.id,
          restant: tache.restant,
          avantAction: tache.avantAction,
        };
      }
      return;
    }
    case 'retourAuTour':
      etat.attente = { type: 'tour', joueur: tache.joueur };
      return;
    case 'apresAction': {
      const joueur = etat.joueurs[tache.joueur]!;
      if (actionsDePrivilege(etat, joueur, false).length > 0) etat.attente = { type: 'apresAction', joueur: joueur.id };
      return;
    }
    case 'finJauges':
      if (jaugesPossibles(etat.joueurs[tache.joueur]!, tache).length > 0) etat.attente = { ...tache };
      return;
    case 'defausserOr': {
      const joueur = etat.joueurs[tache.joueur]!;
      // Le reste de l'Or est défaussé une fois les jauges réglées, sauf avec le Privilège 18,
      // qui fait garder l'Or et en ajoute (décision JJJ).
      const garde = effetsPrivilege(joueur, 'conserveOr');
      if (garde.length === 0) {
        if (joueur.or > 0) noter(etat, joueur, `${joueur.nom} défausse ses ${joueur.or} Or restants.`);
        joueur.or = 0;
      }
      for (const effet of garde) {
        if (effet.or <= 0) continue;
        joueur.or += effet.or;
        noter(etat, joueur, `${joueur.nom} garde son Or et gagne ${effet.or} Or grâce à son Privilège ${effet.numero}.`);
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
    case 'jouerEnPlus':
      if (tache.restant > 0 && etat.joueurs[tache.joueur]!.main.length > 0) etat.attente = { ...tache };
      return;
    case 'achatEnPlus':
      if (achatsPossibles(etat, etat.joueurs[tache.joueur]!).length > 0) etat.attente = { ...tache };
      return;
    case 'finCarte':
      return;
    case 'reveleEnPlus': {
      const joueur = etat.joueurs[tache.joueur]!;
      joueur.statistiques.piochesSupplementaires += revelerCartes(etat, joueur, tache.cartes).length;
      return;
    }
    case 'finDeTour': {
      etat.privilegesUtilises = [];
      etat.riviereRenouvelee = false;
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
