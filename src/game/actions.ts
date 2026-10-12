import type { Piste } from './materiel/index.ts';

/** Tout ce qu'un joueur peut demander au moteur. « joueur » est le numéro de siège de celui qui agit. */
export type Action =
  // Les actions du tour
  | { type: 'jouer'; joueur: number; carte: string }
  | { type: 'acheter'; joueur: number; carte: string; paiement: string[] }
  | { type: 'finLignee'; joueur: number }
  /** Privilèges 13, 14 et 15 : payer pour piocher, à la place de l'action du tour. */
  | { type: 'utiliserPrivilege'; joueur: number; numero: number; paiement: string[] }
  // Les réponses aux choix proposés pendant un effet ou une fin de lignée
  | { type: 'payer'; joueur: number; paiement: string[] }
  | { type: 'trasher'; joueur: number; carte: string }
  | { type: 'rechercher'; joueur: number; carte: string }
  | { type: 'defausser'; joueur: number; carte: string }
  | { type: 'vendre'; joueur: number; carte: string }
  | { type: 'prendrePrivilege'; joueur: number; numero: number }
  | { type: 'rejouer'; joueur: number }
  | { type: 'monter'; joueur: number; piste: Piste }
  /** Refuser ce qui est proposé, ou s'arrêter là. */
  | { type: 'passer'; joueur: number };

/** Désigne une étape de l'effet (ou de l'Effet Rouge) d'une carte. */
export interface RefEtape {
  joueur: number;
  carte: string;
  /** Position de l'étape dans l'effet de la carte. */
  index: number;
  /** true : il s'agit de l'Effet Rouge de la carte. */
  rouge: boolean;
}

/** Le choix que le moteur attend, et de qui. Tant qu'il n'est pas fait, la partie n'avance pas. */
export type Attente =
  | { type: 'tour'; joueur: number }
  /** Payer le coût d'une étape d'effet, ou y renoncer. */
  | ({ type: 'payer' } & RefEtape)
  /** Appliquer le gain d'une étape d'effet, encore « restant » fois au maximum. */
  | ({ type: 'gain'; restant: number } & RefEtape)
  /** Après un achat : payer 1 Or de plus pour trasher 1 carte. */
  | { type: 'trashAchat'; joueur: number }
  | { type: 'finNoblesse'; joueur: number }
  | { type: 'finEconomie'; joueur: number }
  | { type: 'finPopulation'; joueur: number }
  /** Début de lignée, Privilège 8 : prendre encore « restant » carte(s) de son choix dans son deck. */
  | { type: 'debutRecherche'; joueur: number; restant: number }
  /** Début de lignée, Privilège 12 : défausser encore « restant » carte(s) de sa main. */
  | { type: 'debutDefausse'; joueur: number; restant: number };

/** Ce que le moteur doit encore résoudre, dans l'ordre, avant la fin du tour. */
export type Tache =
  | ({ type: 'etape' } & RefEtape)
  | ({ type: 'gain'; restant: number } & RefEtape)
  | { type: 'trashAchat'; joueur: number }
  | { type: 'finNoblesse'; joueur: number }
  | { type: 'finEconomie'; joueur: number }
  | { type: 'finPopulation'; joueur: number }
  | { type: 'reformerDeck'; joueur: number }
  | { type: 'debutRecherche'; joueur: number; restant: number }
  | { type: 'debutPioche'; joueur: number; cartes: number }
  | { type: 'debutDefausse'; joueur: number; restant: number }
  | { type: 'finDeTour' };
