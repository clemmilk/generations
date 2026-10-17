import type { Action, Attente } from '../game/actions.ts';
import { carte } from '../game/cartes.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import type { CoutEffet, Etape, Gain, Piste } from '../game/materiel/index.ts';
import { coutDAchat, coutEnOr, etapeDe, peutMonterEnFinDeLignee } from '../game/moteur.ts';
import { PARAMETRES } from '../game/parametres.ts';
import { effetsPrivilege, totalPrivilege } from '../game/privileges.ts';
import { compter, ressourcesDe, ressourcesEnJeu } from '../game/ressources.ts';
import type { Vue, VueJoueur } from '../game/vue.ts';
import type { Bot } from './bot.ts';
import type { Poids } from './poids.ts';

// Bot « à préférences » : il donne une note à chaque action permise et joue la mieux notée.
// Les notes viennent des poids (src/ai/poids.ts). Il ne lit que sa vue : rien de caché.

/** Note d'une action qui fait gagner la partie tout de suite. */
const VICTOIRE = 1_000_000;

type Choix = { action: Action; note: number };

function meilleur(choix: Choix[], hasard: () => number): Action {
  let max = -Infinity;
  for (const c of choix) max = Math.max(max, c.note);
  // À égalité, le tirage au sort départage.
  const ex = choix.filter((c) => c.note >= max - 1e-9);
  return ex[Math.floor(hasard() * ex.length)]!.action;
}

function valeurRessources(joueur: Pick<VueJoueur, 'privileges'>, id: string, p: Poids): number {
  const r = ressourcesDe(joueur, id);
  return r.pierre * p.pierre + r.metal * p.metal + r.erudit * p.erudit;
}

function valeurCout(cout: CoutEffet | null, p: Poids): number {
  if (!cout) return 0;
  return cout.or * p.or + cout.pierre * p.pierre + cout.metal * p.metal;
}

/** La valeur d'un gain obtenu 1 fois. */
function valeurGain(gain: Gain, p: Poids): number {
  switch (gain.type) {
    case 'or':
      return gain.montant * p.or;
    case 'pioche':
      return gain.nombre * p.pioche;
    case 'trash':
      return gain.nombre * p.trash;
    case 'recherche':
      return gain.nombre * p.recherche;
    case 'lvlup':
      return gain.piste === 'economie' ? p.lvlupEconomie : p.lvlupPopulation;
    case 'privilege':
      return p.privilege;
    case 'rejouer':
      return p.rejouer;
    case 'vendre':
      // Jugé au cas par cas au moment de vendre.
      return 0;
    case 'achat':
      return gain.nombre * p.achatEffet;
  }
}

/** La valeur d'une carte hors contexte : sert à choisir quoi acheter, trasher, rechercher ou défausser. */
export function valeurCarte(joueur: Pick<VueJoueur, 'privileges'>, id: string, p: Poids): number {
  let valeur = valeurRessources(joueur, id, p);
  for (const etape of carte(id).effet) {
    const gain = valeurGain(etape.gain, p) * (etape.par ? p.parTranche : 1) - valeurCout(etape.cout, p);
    valeur += Math.max(0, gain);
  }
  return valeur;
}

function nombreDeCartes(joueur: VueJoueur): number {
  return joueur.nbCartesPioche + joueur.nbCartesMain + joueur.aireDeJeu.length + joueur.defausse.length;
}

/**
 * Près du but, toute carte est bonne à trasher : il ne reste que « margeFinale » cartes de trop
 * (ou moins) pour que la pioche de début de lignée vide le deck, ou bien la Population est au maximum.
 */
function presDuBut(joueur: VueJoueur, p: Poids): boolean {
  // Au niveau maximum de Population, la pioche ne grandira plus : il ne reste qu'à épurer le deck.
  if (joueur.niveauPopulation >= MATERIEL.plateau.population.length - 1) return true;
  return nombreDeCartes(joueur) - piocheDeLaProchaineLignee(joueur) <= p.margeFinale;
}

/** Les cartes que le joueur accepterait de trasher : celles sous le seuil, ou toutes s'il est près du but. */
function cartesFaibles(joueur: VueJoueur, p: Poids): string[] {
  const cartes = [...(joueur.main ?? []), ...joueur.aireDeJeu, ...joueur.defausse];
  if (presDuBut(joueur, p)) return cartes;
  return cartes.filter((id) => valeurCarte(joueur, id, p) < p.seuilTrash);
}

/** Le bot accepte-t-il de trasher cette carte lors d'un achat, pour 1 Or de plus ? */
function trashAchatAccepte(joueur: VueJoueur, id: string, p: Poids): boolean {
  if (presDuBut(joueur, p)) return true;
  return valeurCarte(joueur, id, p) + PARAMETRES.surcoutTrashAchat * p.or < p.seuilTrash;
}

/**
 * La carte que le bot trasherait après un achat, s'il lui reste « orRestant » Or une fois la carte payée.
 * null s'il n'a pas de quoi payer le trash, ou s'il ne veut se séparer d'aucune carte.
 */
function carteARemplacer(joueur: VueJoueur, p: Poids, orRestant: number): string | null {
  if (orRestant < PARAMETRES.surcoutTrashAchat) return null;
  let pire: string | null = null;
  for (const id of [...(joueur.main ?? []), ...joueur.aireDeJeu, ...joueur.defausse]) {
    if (pire === null || valeurCarte(joueur, id, p) < valeurCarte(joueur, pire, p)) pire = id;
  }
  return pire !== null && trashAchatAccepte(joueur, pire, p) ? pire : null;
}

/** Ce que vendre cette carte rapporte, une fois retirée la valeur des ressources perdues. */
function gainDeVente(joueur: VueJoueur, id: string, gain: Extract<Gain, { type: 'vendre' }>, p: Poids): number {
  const r = ressourcesDe(joueur, id);
  const or = r.pierre * gain.orParPierre + r.metal * gain.orParMetal;
  return or * p.or - valeurRessources(joueur, id, p);
}

/**
 * La valeur de « cartes » cartes prises dans sa pioche, l'une après l'autre.
 * Chaque carte vaut d'autant plus que la pioche est près d'être vide : vider sa pioche, c'est gagner.
 */
function valeurDesPioches(
  joueur: VueJoueur,
  cartes: number,
  mode: 'pioche' | 'recherche',
  p: Poids,
): number {
  // Ce qu'apporte la carte elle-même : le bot connaît le contenu de sa pioche, pas son ordre.
  // En piochant, il peut compter sur une carte moyenne ; en recherchant, sur la meilleure.
  const valeurs = (joueur.contenuPioche ?? []).map((id) => valeurCarte(joueur, id, p));
  let apport = 0;
  if (valeurs.length > 0) {
    apport =
      mode === 'recherche'
        ? Math.max(...valeurs)
        : valeurs.reduce((total, v) => total + v, 0) / valeurs.length;
  }
  const unite = (mode === 'recherche' ? p.recherche : p.pioche) + p.piocheCarte * apport;

  let valeur = 0;
  for (let i = 0; i < cartes; i++) {
    valeur += unite + p.piocheProche / Math.max(1, joueur.nbCartesPioche - i);
  }
  return valeur;
}

/**
 * Ce que rapporterait une étape d'effet à ce joueur, dans sa situation actuelle,
 * coût déduit. 0 si l'étape est impossible ou ne vaut pas son coût.
 */
function valeurEtape(etape: Etape, joueur: VueJoueur, vue: Vue, p: Poids): number {
  const cout = etape.cout;
  if (cout) {
    const r = ressourcesEnJeu(joueur);
    if (joueur.or < cout.or || r.pierre < cout.pierre || r.metal < cout.metal) return 0;
  }
  const fois = etape.par ? Math.floor(compter(joueur, etape.par.compteur) / etape.par.tranche) : 1;
  if (fois <= 0) return 0;

  const gain = etape.gain;
  let valeur = 0;
  switch (gain.type) {
    case 'or':
    case 'rejouer':
      valeur = valeurGain(gain, p) * fois;
      break;
    case 'pioche':
    case 'recherche': {
      const cartes = Math.min(fois * gain.nombre, joueur.nbCartesPioche);
      if (cartes <= 0) return 0;
      // Piocher ou rechercher la dernière carte de sa pioche fait gagner.
      if (cartes >= joueur.nbCartesPioche) return VICTOIRE;
      valeur = valeurDesPioches(joueur, cartes, gain.type, p);
      break;
    }
    case 'trash': {
      const cartes = Math.min(fois * gain.nombre, cartesFaibles(joueur, p).length);
      if (cartes >= nombreDeCartes(joueur)) return VICTOIRE;
      valeur = cartes * p.trash;
      break;
    }
    case 'lvlup': {
      const niveau = gain.piste === 'economie' ? joueur.niveauEconomie : joueur.niveauPopulation;
      if (niveau >= MATERIEL.plateau[gain.piste].length - 1) return 0;
      valeur = valeurGain(gain, p);
      break;
    }
    case 'privilege': {
      if (joueur.privileges.length >= MATERIEL.plateau.noblesse.length) return 0;
      const disponibles = gain.mode === 'choix' ? vue.privilegesVisibles.length : vue.nbPrivilegesPioche;
      if (disponibles === 0) return 0;
      valeur = p.privilege;
      break;
    }
    case 'vendre':
      for (const id of joueur.aireDeJeu) valeur += Math.max(0, gainDeVente(joueur, id, gain, p));
      break;
    case 'achat':
      valeur = meilleurAchat(joueur, vue, p);
      break;
  }
  return Math.max(0, valeur - valeurCout(cout, p));
}

/** Combien de cartes le joueur piochera au début de sa prochaine lignée, s'il la termine maintenant. */
function piocheDeLaProchaineLignee(joueur: VueJoueur): number {
  const { population } = MATERIEL.plateau;
  const niveau = peutMonterEnFinDeLignee(joueur, 'population') ? joueur.niveauPopulation + 1 : joueur.niveauPopulation;
  // Les Privilèges 8 et 12 ne changent pas le nombre de cartes prises dans la pioche au total.
  const enPlus = totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes);
  return (population[niveau]?.cartes ?? 0) + enPlus;
}

/**
 * La note d'un achat. « paiement » : les cartes défaussées pour payer les Ressources ; null si on ne
 * le sait pas encore (on compte alors chaque Ressource à la valeur de la moins chère, Pierre ou Métal).
 */
/** Valeur moyenne des cartes de sa pioche : ce que vaut, en moyenne, la première carte de la pioche. */
function valeurMoyennePioche(moi: VueJoueur, p: Poids): number | null {
  const pioche = moi.contenuPioche ?? [];
  if (pioche.length === 0) return null;
  return pioche.reduce((total, id) => total + valeurCarte(moi, id, p), 0) / pioche.length;
}

/** Achat par remplacement : la valeur de la carte qu'il sacrifierait (la moins utile de son deck). */
function valeurDuRemplacement(moi: VueJoueur, p: Poids): number {
  const valeurs = [...(moi.main ?? []), ...moi.aireDeJeu, ...moi.defausse].map((id) => valeurCarte(moi, id, p));
  const pioche = valeurMoyennePioche(moi, p);
  if (pioche !== null) valeurs.push(pioche);
  return valeurs.length > 0 ? Math.min(...valeurs) : 0;
}

function noteAchat(moi: VueJoueur, id: string, paiement: string[] | null, p: Poids): number {
  const cout = coutEnOr(moi, id);
  if (PARAMETRES.carteAcheteeVa === 'remplacement') {
    // Le deck ne grossit pas : la carte achetée remplace la moins utile, trashée gratuitement.
    let note = valeurCarte(moi, id, p) - valeurDuRemplacement(moi, p) - cout * p.or;
    note += totalPrivilege(moi, 'orParTrash', (effet) => effet.or) * p.or;
    if (paiement) for (const carteDonnee of paiement) note -= valeurRessources(moi, carteDonnee, p);
    else note -= coutDAchat(moi, id).ressource * Math.min(p.pierre, p.metal);
    return note;
  }
  // Une carte de plus dans le deck…
  let note = valeurCarte(moi, id, p) + p.achat - cout * p.or;
  if (paiement) for (const carteDonnee of paiement) note -= valeurRessources(moi, carteDonnee, p);
  else note -= coutDAchat(moi, id).ressource * Math.min(p.pierre, p.metal);
  // … sauf que, pour 1 Or de plus, l'achat permet de trasher une carte : le deck ne grossit pas.
  // Ce trash vaut autant qu'un trash obtenu par un effet de carte, pour bien moins cher.
  if (carteARemplacer(moi, p, moi.or - cout) !== null) {
    note += p.trash - PARAMETRES.surcoutTrashAchat * p.or;
  }
  return note;
}

/** Le meilleur achat que le joueur peut se payer dans la Rivière (Or et Ressources de son aire de jeu), 0 s'il n'y en a pas. */
function meilleurAchat(moi: VueJoueur, vue: Vue, p: Poids): number {
  const r = ressourcesEnJeu(moi);
  let meilleure = 0;
  for (const id of vue.riviere) {
    if (moi.or < coutEnOr(moi, id) || r.pierre + r.metal < coutDAchat(moi, id).ressource) continue;
    meilleure = Math.max(meilleure, noteAchat(moi, id, null, p));
  }
  return meilleure;
}

/** Monter cette jauge en fin de lignée vaut-il le coup ? L'Or non dépensé est perdu, sauf avec le Privilège 18. */
function monterVautLeCoup(moi: VueJoueur, piste: Piste, p: Poids): boolean {
  const valeur = piste === 'economie' ? p.lvlupEconomie : p.lvlupPopulation;
  const niveau = piste === 'economie' ? moi.niveauEconomie : moi.niveauPopulation;
  const suivant = MATERIEL.plateau[piste][niveau + 1];
  const garde = effetsPrivilege(moi, 'conserveOr').length > 0;
  if (suivant?.paiement === 'or' && garde) return valeur > suivant.cout * p.or;
  return valeur > 0;
}

function noterActionDeTour(action: Action, moi: VueJoueur, vue: Vue, p: Poids): number {
  switch (action.type) {
    case 'jouer': {
      const c = carte(action.carte);
      // La carte jouée compte dans son propre effet : on l'imagine déjà dans l'aire de jeu.
      const apres: VueJoueur = { ...moi, aireDeJeu: [...moi.aireDeJeu, c.id], nbCartesMain: moi.nbCartesMain - 1 };
      let note = valeurRessources(moi, c.id, p);
      // Privilège 20 : jouer une carte Avancée rapporte de l'Or.
      if (c.origine === 'avancee') note += totalPrivilege(moi, 'orParCarteAvanceeJouee', (effet) => effet.or) * p.or;
      for (const etape of c.effet) note += valeurEtape(etape, apres, vue, p);
      if (c.effetRouge.length > 0) note -= p.effetRouge * (vue.joueurs.length - 1);
      return note;
    }
    case 'acheter':
      return noteAchat(moi, action.carte, action.paiement, p);
    case 'utiliserPrivilege': {
      const pioche = effetsPrivilege(moi, 'actionPioche').find((e) => e.numero === action.numero);
      const trash = effetsPrivilege(moi, 'actionTrash').find((e) => e.numero === action.numero);
      let note: number;
      if (pioche) {
        if (pioche.cartes >= moi.nbCartesPioche) return VICTOIRE;
        note = valeurDesPioches(moi, pioche.cartes, 'pioche', p) - pioche.cout.or * p.or;
      } else if (trash) {
        const cartes = Math.min(trash.cartes, cartesFaibles(moi, p).length);
        if (cartes <= 0) return -Infinity;
        note = cartes * p.trash - trash.cout.or * p.or;
      } else {
        return -Infinity;
      }
      for (const id of action.paiement) note -= valeurRessources(moi, id, p);
      return note;
    }
    case 'finLignee': {
      // Si la pioche de la prochaine lignée vide le deck, c'est gagné.
      if (piocheDeLaProchaineLignee(moi) >= nombreDeCartes(moi)) return VICTOIRE;
      let note = p.finLignee;
      const r = ressourcesEnJeu(moi);
      const emplacement = MATERIEL.plateau.noblesse[moi.privileges.length];
      if (emplacement && r.erudit >= emplacement.erudits && vue.privilegesVisibles.length > 0) note += p.privilege;
      if (peutMonterEnFinDeLignee(moi, 'economie')) note += p.lvlupEconomie;
      if (peutMonterEnFinDeLignee(moi, 'population')) note += p.lvlupPopulation;
      return note;
    }
    default:
      return 0;
  }
}

/** Trasher la carte la moins utile, si elle est sous le seuil ; sinon ne rien trasher. */
function choisirTrash(actions: Action[], moi: VueJoueur, p: Poids, cout: number, hasard: () => number): Action {
  const passer = actions.find((a) => a.type === 'passer');
  const choix: Choix[] = actions.flatMap((action) =>
    action.type === 'trasher' ? [{ action, note: -valeurCarte(moi, action.carte, p) }] : [],
  );
  if (choix.length === 0) return passer ?? actions[0]!;
  const action = meilleur(choix, hasard);
  // Trasher sa dernière carte fait gagner ; près du but, on trashe quoi qu'il arrive.
  if (nombreDeCartes(moi) === 1 || presDuBut(moi, p)) return action;
  const valeur = action.type === 'trasher' ? valeurCarte(moi, action.carte, p) : Infinity;
  return passer && valeur + cout >= p.seuilTrash ? passer : action;
}

function choisirPrivilege(actions: Action[], p: Poids, hasard: () => number): Action {
  const choix: Choix[] = actions.flatMap((action) =>
    action.type === 'prendrePrivilege' ? [{ action, note: p.privileges[action.numero] ?? 1 }] : [],
  );
  return choix.length > 0 ? meilleur(choix, hasard) : actions[0]!;
}

/** Choisit la carte la plus utile (ou la moins utile) parmi des actions qui portent sur une carte. */
function choisirCarte(actions: Action[], moi: VueJoueur, p: Poids, sens: 1 | -1, hasard: () => number): Action {
  const choix: Choix[] = actions.flatMap((action) =>
    'carte' in action ? [{ action, note: sens * valeurCarte(moi, action.carte, p) }] : [],
  );
  return choix.length > 0 ? meilleur(choix, hasard) : actions[0]!;
}

function choisir(vue: Vue, actions: Action[], p: Poids, hasard: () => number): Action {
  const attente = vue.attente as Attente;
  const moi = vue.joueurs[vue.moi]!;
  const passer = actions.find((a) => a.type === 'passer');

  switch (attente.type) {
    case 'tour':
      return meilleur(
        actions.map((action) => ({ action, note: noterActionDeTour(action, moi, vue, p) })),
        hasard,
      );

    case 'payer': {
      const etape = etapeDe(attente);
      // La valeur du gain, sans son coût : chaque façon de payer est ensuite jugée séparément.
      const gain = valeurEtape({ ...etape, cout: null }, moi, vue, p);
      const choix: Choix[] = actions.flatMap((action) => {
        if (action.type !== 'payer') return [];
        let note = gain - (etape.cout?.or ?? 0) * p.or;
        for (const id of action.paiement) note -= valeurRessources(moi, id, p);
        return [{ action, note }];
      });
      if (choix.length === 0) return passer ?? actions[0]!;
      const action = meilleur(choix, hasard);
      const note = choix.find((c) => c.action === action)!.note;
      return note > 0 || !passer ? action : passer;
    }

    case 'gain': {
      const gain = etapeDe(attente).gain;
      switch (gain.type) {
        case 'trash':
          return choisirTrash(actions, moi, p, 0, hasard);
        case 'recherche':
          return choisirCarte(actions.filter((a) => a.type === 'rechercher'), moi, p, 1, hasard);
        case 'privilege':
          return choisirPrivilege(actions, p, hasard);
        case 'rejouer':
          return (p.rejouer > 0 ? actions.find((a) => a.type === 'rejouer') : passer) ?? actions[0]!;
        case 'vendre': {
          const choix: Choix[] = actions.flatMap((action) =>
            action.type === 'vendre' ? [{ action, note: gainDeVente(moi, action.carte, gain, p) }] : [],
          );
          const rentables = choix.filter((c) => c.note > 0);
          return rentables.length > 0 ? meilleur(rentables, hasard) : (passer ?? actions[0]!);
        }
        case 'achat': {
          const choix: Choix[] = actions.flatMap((action) =>
            action.type === 'acheter' ? [{ action, note: noteAchat(moi, action.carte, action.paiement, p) }] : [],
          );
          const rentables = choix.filter((c) => c.note > 0);
          return rentables.length > 0 ? meilleur(rentables, hasard) : (passer ?? actions[0]!);
        }
        default:
          return actions[0]!;
      }
    }

    case 'remplacementAchat': {
      // Il sacrifie la carte la moins utile ; la carte achetée arrive là où elle sera la plus utile.
      // En main, il peut la jouer tout de suite ; sur la pioche, il la piochera bientôt.
      const pioche = valeurMoyennePioche(moi, p);
      const choix: Choix[] = actions.flatMap((action): Choix[] => {
        if (action.type === 'remplacerPioche') return pioche === null ? [] : [{ action, note: -pioche + 0.5 * p.pioche }];
        if (action.type !== 'remplacer') return [];
        const enMain = (moi.main ?? []).includes(action.carte);
        return [{ action, note: -valeurCarte(moi, action.carte, p) + (enMain ? p.pioche : 0) }];
      });
      return meilleur(choix, hasard);
    }

    case 'trashAchat': {
      // La carte qu'il vient d'acheter est la dernière de sa main : il ne la trashe pas aussitôt.
      const achetee = PARAMETRES.carteAcheteeVa === 'defausse' ? moi.defausse.at(-1) : moi.main?.at(-1);
      const autres = actions.filter((a) => !(a.type === 'trasher' && a.carte === achetee));
      return choisirTrash(autres, moi, p, PARAMETRES.surcoutTrashAchat * p.or, hasard);
    }

    case 'trashPrivilege':
      return choisirTrash(actions, moi, p, 0, hasard);

    case 'finNoblesse':
      return choisirPrivilege(actions, p, hasard);

    case 'finJauges': {
      // La jauge qui lui tient le plus à cœur d'abord : elle prend sa part du budget de Ressources.
      const choix: Choix[] = actions.flatMap((action) =>
        action.type === 'monter' && monterVautLeCoup(moi, action.piste, p)
          ? [{ action, note: action.piste === 'economie' ? p.lvlupEconomie : p.lvlupPopulation }]
          : [],
      );
      return choix.length > 0 ? meilleur(choix, hasard) : (passer ?? actions[0]!);
    }

    case 'debutRecherche':
      return choisirCarte(actions, moi, p, 1, hasard);

    case 'debutDefausse':
      return choisirCarte(actions, moi, p, -1, hasard);
  }
}

/** Crée un bot qui joue d'après les poids donnés. */
export function creerBotPreferences(nom: string, poids: Poids): Bot {
  return {
    nom,
    choisir(vue, actions, hasard) {
      return choisir(vue, actions, poids, hasard);
    },
  };
}
