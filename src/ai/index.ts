import type { Action } from '../game/actions.ts';
import { getLegalActions, getPlayerView } from '../game/index.ts';
import type { Etat } from '../game/index.ts';
import { botAleatoire } from './aleatoire.ts';
import type { Bot } from './bot.ts';

export type { Bot } from './bot.ts';

/** Les bots disponibles, par identifiant. L'interface et les simulations choisissent dans cette liste. */
export const BOTS = {
  aleatoire: botAleatoire,
} satisfies Record<string, Bot>;

export type TypeDeBot = keyof typeof BOTS;

/**
 * Fait choisir son action au bot dont le moteur attend une décision.
 * Le bot ne voit que la vue filtrée de son joueur. Renvoie null si la partie est finie.
 */
export function choisirAction(etat: Etat, bot: Bot, hasard: () => number): Action | null {
  if (!etat.attente) return null;
  const joueur = etat.attente.joueur;
  const actions = getLegalActions(etat, joueur);
  if (actions.length === 0) return null;
  return bot.choisir(getPlayerView(etat, joueur), actions, hasard);
}
