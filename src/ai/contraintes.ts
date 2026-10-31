import type { Action } from '../game/actions.ts';
import type { Bot } from './bot.ts';

// Consignes imposées à un bot pour mesurer la force d'une carte Avancée (npm run force-cartes) :
// on compare ses victoires avec et sans la consigne, sur les mêmes parties.

export type TypeDeConsigne = 'interdit' | 'prioritaire';

export interface Consigne {
  /** « interdit » : le bot n'achète jamais la carte. « prioritaire » : il l'achète dès qu'il le peut. */
  type: TypeDeConsigne;
  /** Identifiant de la carte Avancée concernée. */
  carte: string;
}

const achete = (action: Action, carte: string) => action.type === 'acheter' && action.carte === carte;

/** Le même bot, qui respecte la consigne. Pour tout le reste (paiement, carte remplacée…), il joue comme d'habitude. */
export function avecConsigne(bot: Bot, consigne: Consigne): Bot {
  return {
    nom: `${bot.nom} (${consigne.type} : ${consigne.carte})`,
    choisir(vue, actions, hasard) {
      if (consigne.type === 'interdit') {
        const autorisees = actions.filter((action) => !achete(action, consigne.carte));
        return bot.choisir(vue, autorisees.length > 0 ? autorisees : actions, hasard);
      }
      // Plusieurs façons de payer la carte peuvent exister : le bot choisit laquelle.
      const achats = actions.filter((action) => achete(action, consigne.carte));
      return bot.choisir(vue, achats.length > 0 ? achats : actions, hasard);
    },
  };
}
