import { describe, expect, it } from 'vitest';
import { alea, entierAleatoire, melanger } from '../../src/game/hasard.ts';

describe('hasard', () => {
  it('redonne la même suite de nombres avec la même graine', () => {
    const a = { rng: 123 };
    const b = { rng: 123 };
    expect([alea(a), alea(a), alea(a)]).toEqual([alea(b), alea(b), alea(b)]);
  });

  it('donne des nombres entre 0 inclus et 1 exclu', () => {
    const etat = { rng: 7 };
    for (let i = 0; i < 1000; i++) {
      const x = alea(etat);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });

  it('tire des entiers bien répartis entre 0 et max - 1', () => {
    const etat = { rng: 7 };
    const compte = [0, 0, 0, 0];
    for (let i = 0; i < 4000; i++) compte[entierAleatoire(etat, 4)]!++;
    for (const c of compte) {
      expect(c).toBeGreaterThan(850);
      expect(c).toBeLessThan(1150);
    }
  });

  it('mélange sans perdre ni dupliquer d\'élément', () => {
    const liste = Array.from({ length: 33 }, (_, i) => i);
    melanger({ rng: 99 }, liste);
    expect(liste).not.toEqual(Array.from({ length: 33 }, (_, i) => i));
    expect([...liste].sort((a, b) => a - b)).toEqual(Array.from({ length: 33 }, (_, i) => i));
  });

  it('laisse intactes une liste vide et une liste d\'un seul élément', () => {
    const vide: number[] = [];
    const seul = [5];
    melanger({ rng: 1 }, vide);
    melanger({ rng: 1 }, seul);
    expect(vide).toEqual([]);
    expect(seul).toEqual([5]);
  });
});
