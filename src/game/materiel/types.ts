// Description du matériel de jeu, tel qu'il sort des fichiers csv du dossier data/.

export type Couleur = 'bleu' | 'jaune' | 'rouge' | 'vert';
export type Origine = 'depart' | 'asymetrie' | 'avancee';
export type Piste = 'economie' | 'population';

/**
 * Ce qu'un effet peut compter : des ressources dans l'aire de jeu, des blasons,
 * l'Or de sa réserve (« or:5 » = par stock d'or), les cartes de son aire de jeu, ses tuiles Privilège.
 */
export type Compteur =
  | 'pierre'
  | 'metal'
  | 'erudit'
  | 'blason_noblesse'
  | 'blason_economie'
  | 'blason_population'
  | 'or'
  | 'carte'
  | 'tuile_privilege';

/** Coût d'achat d'une carte. « ressource » = Pierre ou Métal, au choix. */
export interface Cout {
  or: number;
  pierre: number;
  metal: number;
  ressource: number;
}

/** Ressources portées par une carte. */
export interface Ressources {
  pierre: number;
  metal: number;
  erudit: number;
}

/** Ce qu'on paye pour déclencher une étape d'effet. */
export interface CoutEffet {
  or: number;
  pierre: number;
  metal: number;
}

export type Gain =
  | { type: 'or'; montant: number }
  | { type: 'pioche'; nombre: number }
  | { type: 'trash'; nombre: number }
  | { type: 'recherche'; nombre: number }
  | { type: 'lvlup'; piste: Piste }
  | { type: 'privilege'; mode: 'choix' | 'hasard' }
  | { type: 'vendre'; orParPierre: number; orParMetal: number }
  /** Acheter une carte de la Rivière, comme l'action Acheter (coût normal, trash possible pour 1 Or). */
  | { type: 'achat'; nombre: number }
  /** Jouer une carte de sa main en plus, une fois la carte en cours entièrement résolue (décision QQ). */
  | { type: 'joue'; nombre: number }
  /** Poser la première carte de sa pioche dans son aire de jeu, sans effet (décision RR). */
  | { type: 'revele'; nombre: number }
  | { type: 'rejouer' };

/**
 * Une étape d'effet : « paye [cout] pour obtenir [gain], autant de fois que [par] ».
 * Un effet de carte est une suite d'étapes indépendantes.
 */
export interface Etape {
  /** null : rien à payer. */
  cout: CoutEffet | null;
  gain: Gain;
  /** null : le gain est obtenu 1 fois. Sinon, 1 fois par tranche de « tranche » éléments comptés. */
  par: { compteur: Compteur; tranche: number } | null;
  /** true : l'étape peut être refaite autant de fois que le joueur le veut. */
  repetable: boolean;
}

export interface Carte {
  id: string;
  nom: string;
  image: string;
  origine: Origine;
  /** Couleur du deck de départ, null pour les autres cartes. */
  couleur: Couleur | null;
  cout: Cout;
  ressources: Ressources;
  effet: Etape[];
  effetRouge: Etape[];
  texteEffet: string;
  texteEffetRouge: string;
}

export interface Privilege {
  id: string;
  numero: number;
  image: string;
  texte: string;
}

/**
 * Comment se paye un niveau de jauge en fin de lignée : « or » = l'Or est dépensé ;
 * « ressources » = il faut assez de Pierre et de Métal dans son aire de jeu, sans les dépenser.
 */
export type Paiement = 'or' | 'ressources';

export interface Plateau {
  /** Le dossier des icônes du plateau (colonne Dossier du csv), par exemple « visuels/V3/plateau ». */
  icones: string;
  /** Les 4 emplacements de Privilège, dans l'ordre. */
  noblesse: { erudits: number; blasons: number }[];
  /** Un élément par niveau, le premier étant le niveau de départ. */
  economie: { cout: number; paiement: Paiement; or: number; blasons: number }[];
  /** « revele » : cartes révélées en début de lignée, après la pioche. */
  population: { cout: number; paiement: Paiement; cartes: number; revele: number; blasons: number }[];
}

export interface Materiel {
  cartes: Carte[];
  privileges: Privilege[];
  plateau: Plateau;
}
