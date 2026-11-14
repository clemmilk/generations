import type { Joueur } from './etat.ts';
import type { Compteur, CoutEffet, Piste } from './materiel/index.ts';

// Ce que fait chaque tuile Privilège, avec ses valeurs.
// Pour changer une valeur (2 Or, 7 Or…) ou échanger l'effet de deux tuiles, c'est ici.
// Le texte affiché aux joueurs reste celui de data/privileges_generations.csv.

export type EffetPrivilege =
  /** Les cartes de la Rivière coûtent moins d'Or (jamais moins de 0). */
  | { type: 'reductionAchat'; or: number }
  /** Les cartes de la Rivière coûtent moins de Ressources (R, Pierre ou Métal au choix), jamais moins de 0. */
  | { type: 'reductionRessource'; ressource: number }
  /**
   * À chaque achat dans la Rivière, au choix du joueur : la carte coûte « or » Or de moins,
   * ou « ressource » Ressource de moins (décision GGG). Jamais moins de 0.
   */
  | { type: 'reductionAchatAuChoix'; or: number; ressource: number }
  /** Chaque carte qui porte au moins 1 « si » apporte 1 « donne » de plus. */
  | {
      type: 'bonusRessource';
      /** La condition : la carte porte au moins 1 de cette ressource, ou « avancee » : c'est une carte Avancée. */
      si: 'pierre' | 'metal' | 'erudit' | 'avancee';
      donne: 'pierre' | 'metal' | 'erudit';
    }
  | { type: 'blason'; piste: Piste | 'noblesse' }
  /** Compte comme des Érudits dans l'aire de jeu. */
  | { type: 'erudit'; nombre: number }
  /** Début de lignée : Or en plus, 1 fois ou 1 fois par élément compté. */
  | { type: 'orDebutLignee'; or: number; par: Compteur | null }
  /** Début de lignée : pioche des cartes en moins, puis en prend autant de son choix dans son deck. */
  | { type: 'rechercheDebutLignee'; cartes: number }
  /** Début de lignée : pioche des cartes en plus, puis en défausse autant de sa main. */
  | { type: 'piocheEtDefausseDebutLignee'; cartes: number }
  /** Début de lignée, une fois tout l'Or reçu : « or » Or de plus par tranche de « tranche » Or en réserve. (Ancien Privilège 6.) */
  | { type: 'orParStockDebutLignee'; or: number; tranche: number }
  /** Début de lignée, après la pioche : révèle des cartes en plus, et paye « or » Or (obligatoire, décision HHH). */
  | { type: 'reveleDebutLignee'; cartes: number; or: number }
  /** Début de lignée, une fois toute la mise en place faite : le joueur peut acheter 1 carte. (Ancien Privilège 10.) */
  | { type: 'achatDebutLignee' }
  /**
   * Après chaque achat, quelle qu'en soit l'origine, le joueur peut jouer 1 carte de sa main (décision XX).
   * Si l'achat vient d'une carte, la carte en plus se joue une fois cette carte entièrement résolue.
   */
  | { type: 'joueApresAchat' }
  /** Monter d'un niveau en Population coûte moins d'Or (fin de lignée et cartes), jamais moins de 0. */
  | { type: 'reductionPopulation'; or: number }
  /** En plus de l'action de son tour, 1 fois par tour : payer pour piocher. */
  | { type: 'actionPioche'; cout: CoutEffet; cartes: number }
  /** En plus de l'action de son tour, 1 fois par tour : payer pour trasher. */
  | { type: 'actionTrash'; cout: CoutEffet; cartes: number }
  /** En plus de l'action de son tour, 1 fois par tour : payer pour révéler. */
  | { type: 'actionRevele'; cout: CoutEffet; cartes: number }
  | { type: 'orParTrash'; or: number }
  /** Or gagné chaque fois que le joueur joue une carte Avancée (même sans appliquer son effet). */
  | { type: 'orParCarteAvanceeJouee'; or: number }
  /** Or gagné chaque fois que le joueur joue une carte qui a un Effet Rouge (même si personne ne l'applique). */
  | { type: 'orParCarteRougeJouee'; or: number }
  /**
   * Après chaque achat, quelle qu'en soit l'origine, le joueur révèle des cartes (obligatoire, décision BBB).
   * Même moment que le Privilège 9, et avant lui.
   */
  | { type: 'reveleApresAchat'; cartes: number }
  /** Or gagné après chaque achat, quelle qu'en soit l'origine (décision NNN). */
  | { type: 'orApresAchat'; or: number }
  /** Or gagné pour chaque carte révélée, quelle qu'en soit l'origine (décision OOO). */
  | { type: 'orParRevele'; or: number }
  /** Fin de lignée : l'Or restant n'est pas défaussé, et le joueur gagne « or » Or de plus. */
  | { type: 'conserveOr'; or: number }
  /** Or gagné chaque fois que le joueur applique l'Effet Rouge d'un adversaire. */
  | { type: 'orParEffetRouge'; or: number };

export const EFFETS_PRIVILEGES: Record<number, EffetPrivilege> = {
  // 14/11 : 5 Or après chaque achat (décision NNN). Anciens effets : { type: 'reductionAchatAuChoix', or: 3, ressource: 1 }
  // (12/11, décision GGG) et { type: 'reductionAchat', or: 3 }.
  1: { type: 'orApresAchat', or: 5 },
  2: { type: 'bonusRessource', si: 'avancee', donne: 'erudit' },
  3: { type: 'bonusRessource', si: 'avancee', donne: 'pierre' },
  4: { type: 'bonusRessource', si: 'avancee', donne: 'metal' },
  // V3 : la tuile 5 se compte elle-même (décision VV).
  5: { type: 'orDebutLignee', or: 2, par: 'tuile_privilege' },
  // 11/11 : nouvelles tuiles 6 et 10 (décisions AAA et BBB). Les anciens effets restent disponibles :
  // 6 : { type: 'orParStockDebutLignee', or: 2, tranche: 5 } ; 10 : { type: 'achatDebutLignee' }.
  6: { type: 'orParCarteRougeJouee', or: 3 },
  7: { type: 'reductionPopulation', or: 5 },
  8: { type: 'rechercheDebutLignee', cartes: 1 },
  9: { type: 'joueApresAchat' },
  10: { type: 'reveleApresAchat', cartes: 1 },
  // 12/11 : la tuile 11 fait révéler pour 7 Or (avant : trasher pour 8 Or, type 'actionTrash').
  11: { type: 'actionRevele', cout: { or: 7, pierre: 0, metal: 0 }, cartes: 1 },
  // 12/11 : la tuile 12 fait aussi payer 3 Or (décision HHH).
  12: { type: 'reveleDebutLignee', cartes: 1, or: 3 },
  13: { type: 'actionTrash', cout: { or: 0, pierre: 3, metal: 0 }, cartes: 1 },
  14: { type: 'actionPioche', cout: { or: 0, pierre: 0, metal: 2 }, cartes: 1 },
  15: { type: 'actionPioche', cout: { or: 8, pierre: 0, metal: 0 }, cartes: 1 },
  16: { type: 'erudit', nombre: 1 },
  17: { type: 'orParTrash', or: 1 },
  // 14/11 : 4 Or par carte révélée (décision OOO). Ancien effet (12/11) : { type: 'conserveOr', or: 1 }.
  18: { type: 'orParRevele', or: 4 },
  19: { type: 'orDebutLignee', or: 3, par: null },
  20: { type: 'orParCarteAvanceeJouee', or: 3 },
};

type EffetDeType<T extends EffetPrivilege['type']> = Extract<EffetPrivilege, { type: T }>;

/** Les effets d'un type donné parmi les Privilèges du joueur, avec le numéro de la tuile. */
export function effetsPrivilege<T extends EffetPrivilege['type']>(
  joueur: Pick<Joueur, 'privileges'>,
  type: T,
): (EffetDeType<T> & { numero: number })[] {
  const trouves: (EffetDeType<T> & { numero: number })[] = [];
  for (const numero of joueur.privileges) {
    const effet = EFFETS_PRIVILEGES[numero];
    if (effet?.type === type) trouves.push({ ...(effet as EffetDeType<T>), numero });
  }
  return trouves;
}

/** La somme d'une valeur sur tous les Privilèges d'un type que possède le joueur. */
export function totalPrivilege<T extends EffetPrivilege['type']>(
  joueur: Pick<Joueur, 'privileges'>,
  type: T,
  valeur: (effet: EffetDeType<T>) => number,
): number {
  return effetsPrivilege(joueur, type).reduce((total, effet) => total + valeur(effet), 0);
}
