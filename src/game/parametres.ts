import type { Piste } from './materiel/index.ts';

// Valeurs de règles qui ne viennent pas des csv. À modifier ici si les règles changent.

export const PARAMETRES = {
  joueursMin: 2,
  joueursMax: 4,
  /** Nombre de cartes Assymétrie ajoutées au deck de départ de chaque joueur. */
  cartesAsymetrieParJoueur: 2,
  /** Nombre de cartes visibles dans la Rivière. */
  tailleRiviere: 4,
  /** Nombre de tuiles Privilège visibles. */
  privilegesVisibles: 4,
  /** Or donné à la mise en place, selon la place dans l'ordre du tour (1er, 2e, 3e, 4e). */
  orDeCompensation: [0, 1, 2, 3],
  /** Nombre maximum de cartes en main pour pouvoir mettre fin à sa lignée. */
  mainMaxPourFinDeLignee: 1,
  /** Or à payer en plus du coût d'une carte pour trasher 1 carte lors d'un achat. */
  surcoutTrashAchat: 1,
  /**
   * Fin de lignée, après la Noblesse : l'ordre des jauges (version du 17/10 : Population puis Économie),
   * ou null pour laisser le joueur choisir (essai du 16/10). L'Or restant est défaussé ensuite.
   */
  ordreDesJauges: ['population', 'economie'] as readonly Piste[] | null,
  /**
   * Où va une carte achetée :
   * - « main » (règles) ;
   * - « defausse » (essai du 16/10 : il faut une nouvelle lignée pour la revoir) ;
   * - « remplacement » (essai du 16/10, décision AA) : la carte achetée remplace une carte du deck, trashée
   *   gratuitement, et prend sa place (main, aire de jeu, défausse, ou dessus de la pioche).
   */
  carteAcheteeVa: 'remplacement' as 'main' | 'defausse' | 'remplacement',
  /**
   * Règle du 18/10 (décision GG) : à chaque trash, le joueur peut trasher la carte du dessus de sa pioche,
   * sans la regarder. false : on ne trashe que dans sa main, son aire de jeu ou sa défausse.
   */
  trashDessusPioche: true as boolean,
} as const;
