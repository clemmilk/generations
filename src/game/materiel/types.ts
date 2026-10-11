// Description du matériel de jeu, tel qu'il sort des fichiers csv du dossier data/.

export type Couleur = 'bleu' | 'jaune' | 'rouge' | 'vert';
export type Origine = 'depart' | 'asymetrie' | 'avancee';
export type Piste = 'economie' | 'population';

/** Ce qu'un effet peut compter : des ressources dans l'aire de jeu ou des blasons. */
export type Compteur =
  | 'pierre'
  | 'metal'
  | 'erudit'
  | 'blason_noblesse'
  | 'blason_economie'
  | 'blason_population';

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

export interface Plateau {
  /** Les 4 emplacements de Privilège, dans l'ordre. */
  noblesse: { erudits: number; blasons: number }[];
  /** Un élément par niveau, le premier étant le niveau de départ. */
  economie: { cout: number; or: number; blasons: number }[];
  population: { cout: number; cartes: number; blasons: number }[];
}

export interface Materiel {
  cartes: Carte[];
  privileges: Privilege[];
  plateau: Plateau;
}
