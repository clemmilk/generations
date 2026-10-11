// Générateur de hasard maison (mulberry32). Son état est rangé dans l'état de la partie,
// pour que la même graine redonne exactement la même partie.

interface AvecRng {
  rng: number;
}

/** Renvoie un nombre entre 0 (inclus) et 1 (exclu), et fait avancer le générateur. */
export function alea(etat: AvecRng): number {
  etat.rng = (etat.rng + 0x6d2b79f5) | 0;
  let t = etat.rng;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Renvoie un entier entre 0 et max - 1. */
export function entierAleatoire(etat: AvecRng, max: number): number {
  return Math.floor(alea(etat) * max);
}

/** Mélange la liste sur place. */
export function melanger<T>(etat: AvecRng, liste: T[]): void {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = entierAleatoire(etat, i + 1);
    [liste[i], liste[j]] = [liste[j]!, liste[i]!];
  }
}
