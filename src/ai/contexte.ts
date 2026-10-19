import { carte } from '../game/cartes.ts';
import type { Compteur, CoutEffet, Gain } from '../game/materiel/index.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { totalPrivilege } from '../game/privileges.ts';
import { blasons, ressourcesDe } from '../game/ressources.ts';
import type { VueJoueur } from '../game/vue.ts';
import type { Poids } from './poids.ts';

// La valeur d'une carte DANS LE DECK du joueur, et non plus hors contexte.
//
// Le bot connaît tout son deck (contenu de sa pioche, main, aire de jeu, défausse). Il en tire un profil :
// combien de cartes, combien de Pierre, de Métal et d'Érudits, combien de cartes il joue par lignée.
// Un effet « 1 pioche pour 2 Pierres » vaut alors selon le nombre de Pierres qu'il aura probablement
// en jeu quand il jouera la carte. La valeur d'une carte est ce que le deck gagne avec elle, par rapport
// au même deck sans elle : une carte qui alimente les effets des autres en profite, une carte qui ne
// sert à rien dans ce deck-là vaut peu, même si elle est bonne en soi.

type Ressource = 'pierre' | 'metal' | 'erudit';

export interface ProfilDuDeck {
  cartes: string[];
  /** Total des ressources des cartes du deck, Privilèges compris (2, 3, 4). */
  ressources: Record<Ressource, number>;
  /** Nombre de cartes que le joueur joue en moyenne pendant une lignée. */
  jouees: number;
  blasons: { noblesse: number; economie: number; population: number };
}

type Joueur = Pick<
  VueJoueur,
  'privileges' | 'contenuPioche' | 'main' | 'aireDeJeu' | 'defausse' | 'niveauEconomie' | 'niveauPopulation'
>;

/** Toutes les cartes du deck du joueur, telles qu'il les connaît. */
export function cartesDuDeck(joueur: Joueur): string[] {
  return [...(joueur.contenuPioche ?? []), ...(joueur.main ?? []), ...joueur.aireDeJeu, ...joueur.defausse];
}

/** Les cartes piochées au début d'une lignée, au niveau de Population actuel (Privilège 12 compris). */
function piocheDeDebut(joueur: Joueur): number {
  const niveau = MATERIEL.plateau.population[joueur.niveauPopulation];
  return (niveau?.cartes ?? 3) + totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes);
}

export function profilDuDeck(joueur: Joueur, cartes: string[] = cartesDuDeck(joueur)): ProfilDuDeck {
  const ressources: Record<Ressource, number> = { pierre: 0, metal: 0, erudit: 0 };
  for (const id of cartes) {
    const r = ressourcesDe(joueur, id);
    ressources.pierre += r.pierre;
    ressources.metal += r.metal;
    ressources.erudit += r.erudit;
  }
  // Par lignée, on joue la pioche de début, plus quelques cartes piochées en cours de route.
  const jouees = Math.min(cartes.length, piocheDeDebut(joueur) + 1.5);
  return { cartes, ressources, jouees, blasons: blasons(joueur) };
}

/**
 * Combien de fois un effet « par tranche » s'appliquera probablement quand la carte sera jouée.
 * Au moment de la jouer, l'aire de jeu contient la carte elle-même et, en moyenne, la moitié des autres
 * cartes jouées pendant la lignée ; chacune porte la densité moyenne de ressources du deck.
 */
function foisProbables(
  joueur: Joueur,
  id: string,
  par: { compteur: Compteur; tranche: number },
  profil: ProfilDuDeck,
): number {
  switch (par.compteur) {
    case 'blason_noblesse':
      return Math.floor(profil.blasons.noblesse / par.tranche);
    case 'blason_economie':
      return Math.floor(profil.blasons.economie / par.tranche);
    case 'blason_population':
      return Math.floor(profil.blasons.population / par.tranche);
  }
  const type = par.compteur as Ressource;
  const propre = ressourcesDe(joueur, id)[type];
  const autres = profil.cartes.length - 1;
  const densite = autres > 0 ? (profil.ressources[type] - propre) / autres : 0;
  const enJeu = propre + densite * Math.max(0, profil.jouees - 1) / 2;
  return enJeu / par.tranche;
}

export function valeurCout(cout: CoutEffet | null, p: Poids): number {
  if (!cout) return 0;
  return cout.or * p.or + cout.pierre * p.pierre + cout.metal * p.metal;
}

/** La valeur d'un gain obtenu 1 fois. */
export function valeurGain(gain: Gain, p: Poids): number {
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

/** La valeur d'une carte quand elle fait partie de ce deck : ses ressources, et ses effets estimés dans ce deck. */
function valeurDansLeProfil(joueur: Joueur, id: string, profil: ProfilDuDeck, p: Poids): number {
  const r = ressourcesDe(joueur, id);
  let valeur = r.pierre * p.pierre + r.metal * p.metal + r.erudit * p.erudit;
  for (const etape of carte(id).effet) {
    const fois = etape.par ? foisProbables(joueur, id, etape.par, profil) : 1;
    valeur += Math.max(0, valeurGain(etape.gain, p) * fois - valeurCout(etape.cout, p));
  }
  return valeur;
}

/** La valeur totale d'un deck : la somme de la valeur de chaque carte, estimée dans ce deck. */
export function valeurDuDeck(joueur: Joueur, cartes: string[], p: Poids): number {
  const profil = profilDuDeck(joueur, cartes);
  let total = 0;
  for (const id of cartes) total += valeurDansLeProfil(joueur, id, profil, p);
  return total;
}

/**
 * Ce que la carte apporte au deck du joueur : la valeur du deck avec elle, moins sa valeur sans elle.
 * Pour une carte du deck, on la retire ; pour une carte d'ailleurs (la Rivière), on l'ajoute.
 */
export function valeurMarginale(joueur: Joueur, id: string, p: Poids): number {
  const deck = cartesDuDeck(joueur);
  const position = deck.indexOf(id);
  if (position === -1) return valeurDuDeck(joueur, [...deck, id], p) - valeurDuDeck(joueur, deck, p);
  const sans = deck.filter((_, i) => i !== position);
  return valeurDuDeck(joueur, deck, p) - valeurDuDeck(joueur, sans, p);
}
