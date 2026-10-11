import { MATERIEL } from './materiel/index.ts';
import type { Carte, Privilege } from './materiel/index.ts';

const cartesParId = new Map(MATERIEL.cartes.map((carte) => [carte.id, carte]));
const privilegesParNumero = new Map(MATERIEL.privileges.map((p) => [p.numero, p]));

export function carte(id: string): Carte {
  const trouvee = cartesParId.get(id);
  if (!trouvee) throw new Error(`Carte inconnue : ${id}`);
  return trouvee;
}

export function privilege(numero: number): Privilege {
  const trouve = privilegesParNumero.get(numero);
  if (!trouve) throw new Error(`Privilège inconnu : ${numero}`);
  return trouve;
}

export function nomsDesCartes(ids: string[]): string {
  return ids.map((id) => carte(id).nom).join(', ');
}
