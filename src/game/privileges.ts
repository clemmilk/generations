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
  /** À la place de l'action de son tour : payer pour piocher. */
  | { type: 'actionPioche'; cout: CoutEffet; cartes: number }
  /** À la place de l'action de son tour : payer pour trasher. */
  | { type: 'actionTrash'; cout: CoutEffet; cartes: number }
  | { type: 'orParTrash'; or: number }
  /** Or gagné chaque fois que le joueur joue une carte Avancée (même sans appliquer son effet). */
  | { type: 'orParCarteAvanceeJouee'; or: number }
  /** Fin de lignée : l'Or restant n'est pas défaussé. */
  | { type: 'conserveOr' }
  /** Or gagné chaque fois que le joueur applique l'Effet Rouge d'un adversaire. */
  | { type: 'orParEffetRouge'; or: number };

export const EFFETS_PRIVILEGES: Record<number, EffetPrivilege> = {
  1: { type: 'reductionAchat', or: 2 },
  2: { type: 'bonusRessource', si: 'avancee', donne: 'erudit' },
  3: { type: 'bonusRessource', si: 'avancee', donne: 'pierre' },
  4: { type: 'bonusRessource', si: 'avancee', donne: 'metal' },
  5: { type: 'blason', piste: 'population' },
  6: { type: 'blason', piste: 'economie' },
  7: { type: 'blason', piste: 'noblesse' },
  8: { type: 'rechercheDebutLignee', cartes: 1 },
  9: { type: 'orDebutLignee', or: 2, par: 'blason_population' },
  10: { type: 'orDebutLignee', or: 2, par: 'blason_noblesse' },
  11: { type: 'orDebutLignee', or: 2, par: 'blason_economie' },
  12: { type: 'piocheEtDefausseDebutLignee', cartes: 1 },
  13: { type: 'actionTrash', cout: { or: 0, pierre: 3, metal: 0 }, cartes: 1 },
  14: { type: 'actionPioche', cout: { or: 0, pierre: 0, metal: 2 }, cartes: 1 },
  15: { type: 'actionPioche', cout: { or: 6, pierre: 0, metal: 0 }, cartes: 1 },
  16: { type: 'erudit', nombre: 1 },
  17: { type: 'orParTrash', or: 2 },
  18: { type: 'conserveOr' },
  19: { type: 'orDebutLignee', or: 3, par: null },
  20: { type: 'orParCarteAvanceeJouee', or: 2 },
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
