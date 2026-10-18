import { describe, expect, it, vi } from 'vitest';
import { BOTS } from '../../src/ai/index.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';

// L'IA entraînée est entraînée sur le vrai matériel (data/) : on la juge donc sur ce matériel,
// et non sur le matériel fixe des autres tests. À relancer après chaque nouvel entraînement.
vi.unmock('../../src/game/materiel/index.ts');

const graines = (n: number, depart = 1) => Array.from({ length: n }, (_, i) => depart + i);

describe('IA entraînée, sur le vrai matériel', () => {
  it('bat nettement l\'IA réglée à la main', () => {
    let victoires = 0;
    for (const graine of graines(40, 5000)) {
      if (simulerPartie([BOTS.entrainee, BOTS.preferences], graine).vainqueur === 0) victoires++;
      if (simulerPartie([BOTS.preferences, BOTS.entrainee], graine).vainqueur === 1) victoires++;
    }
    expect(victoires).toBeGreaterThanOrEqual(52); // 65 % de 80 parties
  });
});
