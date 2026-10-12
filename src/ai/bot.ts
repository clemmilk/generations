import type { Action } from '../game/actions.ts';
import type { Vue } from '../game/vue.ts';

/**
 * Un joueur artificiel. Il ne reçoit que ce qu'un joueur a le droit de voir (sa vue)
 * et la liste des actions permises : il ne peut donc ni tricher, ni jouer un coup illégal.
 */
export interface Bot {
  /** Le nom affiché dans l'interface. */
  nom: string;
  /**
   * Choisit une action parmi celles proposées (la liste n'est jamais vide).
   * « hasard » renvoie un nombre entre 0 et 1 : le bot doit passer par lui pour tout tirage au sort,
   * afin qu'une partie entre bots puisse être rejouée à l'identique.
   */
  choisir(vue: Vue, actions: Action[], hasard: () => number): Action;
}
