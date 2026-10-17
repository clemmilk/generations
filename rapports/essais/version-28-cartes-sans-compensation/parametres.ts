// Valeurs de règles qui ne viennent pas des csv. À modifier ici si les règles changent.

export const PARAMETRES = {
  joueursMin: 2,
  joueursMax: 4,
  /** Nombre de cartes Assymétrie ajoutées au deck de départ de chaque joueur. */
  cartesAsymetrieParJoueur: 0, // Essai « deck simple » du 15/10 : 2 dans les règles
  /** Nombre de cartes visibles dans la Rivière. */
  tailleRiviere: 4,
  /** Nombre de tuiles Privilège visibles. */
  privilegesVisibles: 4,
  /** Or donné à la mise en place, selon la place dans l'ordre du tour (1er, 2e, 3e, 4e). */
  orDeCompensation: [0, 0, 0, 0], // Essai du 16/10 sans compensation ; [0, 1, 2, 3] dans les règles
  /** Nombre maximum de cartes en main pour pouvoir mettre fin à sa lignée. */
  mainMaxPourFinDeLignee: 1,
  /** Or à payer en plus du coût d'une carte pour trasher 1 carte lors d'un achat. */
  surcoutTrashAchat: 1,
} as const;
