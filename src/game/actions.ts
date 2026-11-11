import type { Piste } from './materiel/index.ts';

/** Tout ce qu'un joueur peut demander au moteur. « joueur » est le numéro de siège de celui qui agit. */
export type Action =
  // Les actions du tour
  | { type: 'jouer'; joueur: number; carte: string }
  | { type: 'acheter'; joueur: number; carte: string; paiement: string[] }
  | { type: 'finLignee'; joueur: number }
  /** Privilèges d'action (13, 14, 15) : payer pour piocher ou trasher, en plus de l'action du tour, 1 fois par tuile et par tour. */
  | { type: 'utiliserPrivilege'; joueur: number; numero: number; paiement: string[] }
  /** Renouveler la Rivière (décision FFF) : payer pour remplacer ces cartes de la Rivière, avant son action. */
  | { type: 'renouvelerRiviere'; joueur: number; cartes: string[] }
  // Les réponses aux choix proposés pendant un effet ou une fin de lignée
  | { type: 'payer'; joueur: number; paiement: string[] }
  | { type: 'trasher'; joueur: number; carte: string }
  /** Trasher la carte du dessus de sa pioche, sans la regarder (décision GG). */
  | { type: 'trasherPioche'; joueur: number }
  | { type: 'rechercher'; joueur: number; carte: string }
  | { type: 'defausser'; joueur: number; carte: string }
  | { type: 'vendre'; joueur: number; carte: string }
  | { type: 'prendrePrivilege'; joueur: number; numero: number }
  | { type: 'rejouer'; joueur: number }
  | { type: 'monter'; joueur: number; piste: Piste }
  /** Achat par remplacement : la carte achetée prend la place de cette carte (main, aire de jeu ou défausse). */
  | { type: 'remplacer'; joueur: number; carte: string }
  /** Achat par remplacement : la carte achetée prend la place de la première carte de la pioche. */
  | { type: 'remplacerPioche'; joueur: number }
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
  /** Privilège d'action de trash : choisir encore « restant » carte(s) à trasher. « avantAction » : l'action du tour reste à faire. */
  | { type: 'trashPrivilege'; joueur: number; restant: number; avantAction: boolean }
  /** L'action du tour est résolue : le joueur peut encore utiliser ses Privilèges d'action avant de finir son tour. */
  | { type: 'apresAction'; joueur: number }
  /** Achat par remplacement : choisir la carte que la carte achetée remplace. */
  | { type: 'remplacementAchat'; joueur: number; carte: string }
  | { type: 'finNoblesse'; joueur: number }
  /** Fin de lignée : monter l'Économie et/ou la Population, sur un budget de Ressources commun. */
  | { type: 'finJauges'; joueur: number; ressourcesUtilisees: number; montees: Piste[]; seule?: Piste }
  /** Début de lignée, Privilège 8 : prendre encore « restant » carte(s) de son choix dans son deck. */
  | { type: 'debutRecherche'; joueur: number; restant: number }
  /** Début de lignée, Privilège 12 : défausser encore « restant » carte(s) de sa main. */
  | { type: 'debutDefausse'; joueur: number; restant: number }
  /** « Rejouer 1 carte » : jouer encore « restant » carte(s) de sa main, ou s'arrêter. */
  | { type: 'jouerEnPlus'; joueur: number; restant: number }
  /** Privilège 10 : au début de la lignée, acheter 1 carte ou y renoncer. */
  | { type: 'achatEnPlus'; joueur: number };

/** Ce que le moteur doit encore résoudre, dans l'ordre, avant la fin du tour. */
export type Tache =
  | ({ type: 'etape' } & RefEtape)
  | ({ type: 'gain'; restant: number } & RefEtape)
  | { type: 'trashAchat'; joueur: number }
  | { type: 'trashPrivilege'; joueur: number; restant: number; avantAction: boolean }
  /** Le Privilège d'action a été utilisé avant l'action : le joueur doit encore faire son action. */
  | { type: 'retourAuTour'; joueur: number }
  | { type: 'apresAction'; joueur: number }
  | { type: 'remplacementAchat'; joueur: number; carte: string }
  | { type: 'finNoblesse'; joueur: number }
  | { type: 'finJauges'; joueur: number; ressourcesUtilisees: number; montees: Piste[]; seule?: Piste }
  /** Fin de lignée : l'Or restant est défaussé (sauf Privilège 18), une fois les jauges réglées. */
  | { type: 'defausserOr'; joueur: number }
  | { type: 'reformerDeck'; joueur: number }
  | { type: 'debutRecherche'; joueur: number; restant: number }
  | { type: 'debutPioche'; joueur: number; cartes: number }
  | { type: 'debutDefausse'; joueur: number; restant: number }
  | { type: 'jouerEnPlus'; joueur: number; restant: number }
  | { type: 'achatEnPlus'; joueur: number }
  /** Fin de la résolution d'une carte jouée (effet puis Effet Rouge) : « Rejouer 1 carte » se place juste avant. */
  | { type: 'finCarte' }
  /** Privilège 10 : révéler des cartes après un achat. */
  | { type: 'reveleEnPlus'; joueur: number; cartes: number }
  | { type: 'finDeTour' };
