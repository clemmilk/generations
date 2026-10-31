import type { Bot } from './bot.ts';
import { avecConsigne } from './contraintes.ts';
import type { Consigne } from './contraintes.ts';
import { simulerPartie } from './simulation.ts';

// Mesure de la force des cartes par parties « jumelles » (npm run force-cartes).
// On joue chaque graine deux fois : une partie de référence, où tous les bots jouent normalement, et une partie
// où un seul joueur reçoit une consigne (carte interdite ou prioritaire). Tant que la consigne ne change rien,
// les deux parties sont identiques ; l'écart de victoires de ce joueur mesure donc l'effet de la consigne, et rien d'autre.

/** Le siège qui reçoit la consigne : il tourne d'une graine à l'autre, pour que la place à table ne fausse rien. */
export function siegeTeste(graine: number, joueurs: number): number {
  return graine % joueurs;
}

export interface PartieJumelle {
  graine: number;
  vainqueur: number | null;
  /** Les Domaines reçus au départ, par siège. */
  asymetrieDeDepart: string[][];
  achatsParSiege: string[][];
}

/** Joue une partie : tous les sièges ont le même bot, sauf le siège testé, qui respecte la consigne s'il y en a une. */
export function jouerPartieJumelle(bot: Bot, joueurs: number, graine: number, consigne: Consigne | null): PartieJumelle {
  const teste = siegeTeste(graine, joueurs);
  const bots = Array.from({ length: joueurs }, (_, siege) => (consigne && siege === teste ? avecConsigne(bot, consigne) : bot));
  const { vainqueur, asymetrieDeDepart, achatsParSiege } = simulerPartie(bots, graine);
  return { graine, vainqueur, asymetrieDeDepart, achatsParSiege };
}

export interface Ecart {
  /** Écart moyen de victoires du siège testé, en points de pourcentage (+5 : il gagne 5 parties de plus sur 100). */
  points: number;
  /** Fourchette à 95 % de cet écart. */
  basse: number;
  haute: number;
  parties: number;
}

/**
 * Compare les victoires du siège testé, graine par graine, avec et sans consigne.
 * Chaque paire vaut +1 (il gagne seulement avec la consigne), -1 (seulement sans) ou 0.
 */
export function ecartApparie(paires: { avec: boolean; sans: boolean }[]): Ecart {
  const n = paires.length;
  if (n === 0) return { points: 0, basse: 0, haute: 0, parties: 0 };
  const d = paires.map((p) => Number(p.avec) - Number(p.sans));
  const moyenne = d.reduce((a, b) => a + b, 0) / n;
  const variance = n > 1 ? d.reduce((a, x) => a + (x - moyenne) ** 2, 0) / (n - 1) : 0;
  const marge = 1.96 * Math.sqrt(variance / n);
  return { points: 100 * moyenne, basse: 100 * (moyenne - marge), haute: 100 * (moyenne + marge), parties: n };
}

/** Fourchette à 95 % d'une proportion k/n (méthode de Wilson), en pourcentage. */
export function fourchette(k: number, n: number): { taux: number; basse: number; haute: number } {
  if (n === 0) return { taux: 0, basse: 0, haute: 100 };
  const z = 1.96;
  const p = k / n;
  const d = 1 + (z * z) / n;
  const centre = (p + (z * z) / (2 * n)) / d;
  const marge = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return { taux: 100 * p, basse: 100 * (centre - marge), haute: 100 * (centre + marge) };
}
