import type { Etat } from './etat.ts';

export { createGame } from './creation.ts';
export { getPlayerView } from './vue.ts';
export type { Etat, Inscription, Joueur } from './etat.ts';
export type { Vue, VueJoueur } from './vue.ts';

export function isGameOver(etat: Etat): boolean {
  return etat.vainqueur !== null;
}

/** Il n'y a qu'un vainqueur et pas de classement : 1 pour le vainqueur, 0 pour les autres. */
export function getScores(etat: Etat): number[] {
  return etat.joueurs.map((joueur) => (joueur.id === etat.vainqueur ? 1 : 0));
}
