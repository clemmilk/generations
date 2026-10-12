import type { Action } from '../game/actions.ts';
import { getLegalActions, getPlayerView } from '../game/index.ts';
import type { Etat } from '../game/index.ts';
import { botAleatoire } from './aleatoire.ts';
import type { Bot } from './bot.ts';
import entrainement from './poids-entraines.json' with { type: 'json' };
import { POIDS_MANUELS } from './poids.ts';
import type { Poids } from './poids.ts';
import { creerBotPreferences } from './preferences.ts';

export type { Bot } from './bot.ts';

/**
 * Des poids enregistrés avant l'ajout d'une nouvelle préférence n'ont pas de valeur pour elle :
 * on prend alors celle des réglages manuels.
 */
export function completer(poids: Partial<Poids>): Poids {
  return { ...POIDS_MANUELS, ...poids };
}

/** Les bots disponibles, par identifiant. L'interface et les simulations choisissent dans cette liste. */
export const BOTS = {
  aleatoire: botAleatoire,
  /** Le bot à préférences, avec les poids réglés à la main (src/ai/poids.ts). */
  preferences: creerBotPreferences('IA réglée à la main', POIDS_MANUELS),
  /** Le même bot, avec les poids trouvés par « npm run train » (src/ai/poids-entraines.json). */
  entrainee: creerBotPreferences('IA entraînée', completer(entrainement.poids)),
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
