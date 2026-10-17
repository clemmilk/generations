import { vi } from 'vitest';

// Tous les tests utilisent un matériel fixe (tests/donnees/), pour que modifier les cartes de data/
// ne casse pas les tests des règles. Voir tests/donnees/LISEZMOI.md.
vi.mock('../src/game/materiel/index.ts', async () => {
  const { readFileSync } = await import('node:fs');
  const { convertirMateriel } = await import('../src/game/materiel/convertir.ts');
  const lire = (nom: string) => readFileSync(new URL(`./donnees/${nom}`, import.meta.url), 'utf8');
  return {
    MATERIEL: convertirMateriel(lire('cartes_test.csv'), lire('privileges_test.csv'), lire('plateau_test.csv')),
  };
});
