// Les préférences chiffrées du bot « à préférences ».
// Chaque nombre dit combien le bot tient à quelque chose ; il joue l'action qui lui rapporte le plus.
// Ces valeurs de départ sont réglées à la main. L'entraînement (étape suivante) les ajustera.

export interface Poids {
  /** Valeur d'1 Or gagné (et coût d'1 Or dépensé). */
  or: number;
  /** Valeur d'1 carte piochée. */
  pioche: number;
  /** Valeur d'1 carte trashée. */
  trash: number;
  /** Valeur d'1 carte recherchée dans son deck. */
  recherche: number;
  /** Valeur d'un niveau d'Économie. */
  lvlupEconomie: number;
  /** Valeur d'un niveau de Population. */
  lvlupPopulation: number;
  /** Valeur d'un Privilège, quel qu'il soit. */
  privilege: number;
  /** Valeur d'un tour supplémentaire. */
  rejouer: number;
  /** Valeur d'1 Pierre, d'1 Métal, d'1 Érudit posés dans son aire de jeu (et coût quand on les défausse). */
  pierre: number;
  metal: number;
  erudit: number;
  /** Envie de base d'acheter une carte. Négatif : une carte de plus épaissit le deck. */
  achat: number;
  /** Envie de base de mettre fin à sa lignée. */
  finLignee: number;
  /** Gêne de jouer une carte dont l'Effet Rouge profite aux adversaires, par adversaire. */
  effetRouge: number;
  /** Une carte dont la valeur dépasse ce seuil n'est pas trashée. */
  seuilTrash: number;
  /**
   * Près du but, le bot trashe n'importe quelle carte : dès qu'il n'a plus que ce nombre de cartes
   * en trop par rapport à ce qu'il piochera au début de sa prochaine lignée.
   */
  margeFinale: number;
  /** Pour juger une carte hors contexte : combien de fois on suppose qu'un effet « par… » s'applique. */
  parTranche: number;
  /** Préférence pour chaque tuile Privilège, par numéro (1 par défaut). */
  privileges: Record<number, number>;
}

export const POIDS_MANUELS: Poids = {
  or: 1,
  pioche: 4,
  trash: 8,
  recherche: 4,
  lvlupEconomie: 6,
  lvlupPopulation: 10,
  privilege: 8,
  rejouer: 2,
  pierre: 1.5,
  metal: 1.5,
  erudit: 1.5,
  achat: -4,
  finLignee: 0,
  effetRouge: 0.5,
  seuilTrash: 6,
  margeFinale: 2,
  parTranche: 1,
  privileges: {},
};
