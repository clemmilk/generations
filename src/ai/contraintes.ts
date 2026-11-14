import type { Action } from '../game/actions.ts';
import type { Bot } from './bot.ts';

// Consignes imposées à un bot pour mesurer la force d'une carte Avancée ou d'une tuile Privilège (npm run force-cartes) :
// on compare ses victoires avec et sans la consigne, sur les mêmes parties.

export type TypeDeConsigne = 'interdit' | 'prioritaire';

/**
 * « interdit » : le bot n'achète jamais la carte (ne prend jamais la tuile).
 * « prioritaire » : il l'achète (la prend) dès qu'il le peut.
 */
export type Consigne =
  | { type: TypeDeConsigne; /** Identifiant de la carte Avancée concernée. */ carte: string }
  | { type: TypeDeConsigne; /** Numéro de la tuile Privilège concernée. */ privilege: number };

/** L'action est-elle celle que vise la consigne (acheter cette carte, prendre cette tuile) ? */
function vise(action: Action, consigne: Consigne): boolean {
  if ('carte' in consigne) return action.type === 'acheter' && action.carte === consigne.carte;
  return action.type === 'prendrePrivilege' && action.numero === consigne.privilege;
}

/** Le nom court de la cible d'une consigne. */
export const cibleDeConsigne = (consigne: Consigne): string =>
  'carte' in consigne ? consigne.carte : `privilege_${consigne.privilege}`;

/** Le même bot, qui respecte la consigne. Pour tout le reste (paiement, carte remplacée…), il joue comme d'habitude. */
export function avecConsigne(bot: Bot, consigne: Consigne): Bot {
  return {
    nom: `${bot.nom} (${consigne.type} : ${cibleDeConsigne(consigne)})`,
    choisir(vue, actions, hasard) {
      if (consigne.type === 'interdit') {
        const autorisees = actions.filter((action) => !vise(action, consigne));
        return bot.choisir(vue, autorisees.length > 0 ? autorisees : actions, hasard);
      }
      // Plusieurs façons de payer la carte peuvent exister : le bot choisit laquelle.
      const visees = actions.filter((action) => vise(action, consigne));
      return bot.choisir(vue, visees.length > 0 ? visees : actions, hasard);
    },
  };
}
