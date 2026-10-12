import type { Action, Attente } from '../game/actions.ts';
import { carte } from '../game/cartes.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import type { CoutEffet, Etape, Gain } from '../game/materiel/index.ts';
import { coutEnOr, etapeDe } from '../game/moteur.ts';
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

function valeurRessources(joueur: VueJoueur, id: string, p: Poids): number {
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
  }
}

/** La valeur d'une carte hors contexte : sert à choisir quoi acheter, trasher, rechercher ou défausser. */
function valeurCarte(joueur: VueJoueur, id: string, p: Poids): number {
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
      valeur = cartes * (gain.type === 'pioche' ? p.pioche : p.recherche);
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
  }
  return Math.max(0, valeur - valeurCout(cout, p));
}

/** Combien de cartes le joueur piochera au début de sa prochaine lignée, s'il la termine maintenant. */
function piocheDeLaProchaineLignee(joueur: VueJoueur): number {
  const { population } = MATERIEL.plateau;
  const r = ressourcesEnJeu(joueur);
  const suivant = population[joueur.niveauPopulation + 1];
  const niveau = suivant && r.pierre + r.metal >= suivant.cout ? joueur.niveauPopulation + 1 : joueur.niveauPopulation;
  // Les Privilèges 8 et 12 ne changent pas le nombre de cartes prises dans la pioche au total.
  const enPlus = totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes);
  return (population[niveau]?.cartes ?? 0) + enPlus;
}

function noterActionDeTour(action: Action, moi: VueJoueur, vue: Vue, p: Poids): number {
  switch (action.type) {
    case 'jouer': {
      const c = carte(action.carte);
      // La carte jouée compte dans son propre effet : on l'imagine déjà dans l'aire de jeu.
      const apres: VueJoueur = { ...moi, aireDeJeu: [...moi.aireDeJeu, c.id], nbCartesMain: moi.nbCartesMain - 1 };
      let note = valeurRessources(moi, c.id, p);
      for (const etape of c.effet) note += valeurEtape(etape, apres, vue, p);
      if (c.effetRouge.length > 0) note -= p.effetRouge * (vue.joueurs.length - 1);
      return note;
    }
    case 'acheter': {
      const cout = coutEnOr(moi, action.carte);
      // Une carte de plus dans le deck…
      let note = valeurCarte(moi, action.carte, p) + p.achat - cout * p.or;
      for (const id of action.paiement) note -= valeurRessources(moi, id, p);
      // … sauf que, pour 1 Or de plus, l'achat permet de trasher une carte : le deck ne grossit pas.
      // Ce trash vaut autant qu'un trash obtenu par un effet de carte, pour bien moins cher.
      if (carteARemplacer(moi, p, moi.or - cout) !== null) {
        note += p.trash - PARAMETRES.surcoutTrashAchat * p.or;
      }
      return note;
    }
    case 'utiliserPrivilege': {
      const effet = effetsPrivilege(moi, 'actionPioche').find((e) => e.numero === action.numero);
      if (!effet) return -Infinity;
      if (effet.cartes >= moi.nbCartesPioche) return VICTOIRE;
      let note = effet.cartes * p.pioche - effet.cout.or * p.or;
      for (const id of action.paiement) note -= valeurRessources(moi, id, p);
      return note;
    }
    case 'finLignee': {
      // Si la pioche de la prochaine lignée vide le deck, c'est gagné.
      if (piocheDeLaProchaineLignee(moi) >= nombreDeCartes(moi)) return VICTOIRE;
      let note = p.finLignee;
      const { noblesse, economie, population } = MATERIEL.plateau;
      const r = ressourcesEnJeu(moi);
      const emplacement = noblesse[moi.privileges.length];
      if (emplacement && r.erudit >= emplacement.erudits && vue.privilegesVisibles.length > 0) note += p.privilege;
      const eco = economie[moi.niveauEconomie + 1];
      if (eco && moi.or >= eco.cout) note += p.lvlupEconomie;
      const pop = population[moi.niveauPopulation + 1];
      if (pop && r.pierre + r.metal >= pop.cout) note += p.lvlupPopulation;
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
        default:
          return actions[0]!;
      }
    }

    case 'trashAchat': {
      // La carte qu'il vient d'acheter est la dernière de sa main : il ne la trashe pas aussitôt.
      const achetee = moi.main?.at(-1);
      const autres = actions.filter((a) => !(a.type === 'trasher' && a.carte === achetee));
      return choisirTrash(autres, moi, p, PARAMETRES.surcoutTrashAchat * p.or, hasard);
    }

    case 'finNoblesse':
      return choisirPrivilege(actions, p, hasard);

    case 'finEconomie': {
      const monter = actions.find((a) => a.type === 'monter');
      // L'Or restant est perdu de toute façon, sauf avec le Privilège 18.
      const garde = effetsPrivilege(moi, 'conserveOr').length > 0;
      const cout = MATERIEL.plateau.economie[moi.niveauEconomie + 1]?.cout ?? 0;
      const vautLeCoup = garde ? p.lvlupEconomie > cout * p.or : p.lvlupEconomie > 0;
      return (vautLeCoup ? monter : passer) ?? actions[0]!;
    }

    case 'finPopulation':
      return (p.lvlupPopulation > 0 ? actions.find((a) => a.type === 'monter') : passer) ?? actions[0]!;

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
