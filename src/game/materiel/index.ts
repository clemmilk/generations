import donnees from './materiel.json' with { type: 'json' };
import type { Materiel } from './types.ts';

export type * from './types.ts';

/** Le matériel du jeu, généré depuis les csv de data/ par « npm run import ». */
export const MATERIEL = donnees as Materiel;
