import type { Inscription } from '../../src/game/index.ts';

export const QUATRE_JOUEURS: Inscription[] = [
  { nom: 'Alice', couleur: 'bleu' },
  { nom: 'Bob', couleur: 'jaune' },
  { nom: 'Chloé', couleur: 'rouge' },
  { nom: 'David', couleur: 'vert' },
];

export function inscriptions(nombre: number): Inscription[] {
  return QUATRE_JOUEURS.slice(0, nombre);
}
