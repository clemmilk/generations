import type { Bot } from './bot.ts';

/** Joue n'importe quelle action permise, au hasard. Sert de point de comparaison pour les autres bots. */
export const botAleatoire: Bot = {
  nom: 'IA aléatoire',
  choisir(_vue, actions, hasard) {
    return actions[Math.floor(hasard() * actions.length)]!;
  },
};
