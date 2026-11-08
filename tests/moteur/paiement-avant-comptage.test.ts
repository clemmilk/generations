import { afterEach, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';
import { faire, scene } from './outils.ts';

// Décision SS (V3, remplace la décision X) : pour une étape « paye … pour obtenir … par tranche »,
// on paye d'abord, puis on compte ce qui reste. Les ressources défaussées pour payer ne comptent plus.
// Le test prête ce type d'effet, le temps du test, à une carte à 1 Métal.

const aMetal = MATERIEL.cartes.filter((c) => c.ressources.metal === 1 && c.ressources.pierre === 0).map((c) => c.id);
const jouee = aMetal[0]!;
const effetOriginal = carte(jouee).effet;
afterEach(() => {
  carte(jouee).effet = effetOriginal;
});

it('paye d\'abord, puis compte le Métal restant : 4 Métal, 1 payé → 3 Métal → 1 trash', () => {
  carte(jouee).effet = lireCodeEffet('payer(metal:1) > trash(1) / metal:2');
  const aire = aMetal.slice(1, 4); // 3 cartes à 1 Métal, + la carte jouée = 4 Métal
  let etat = scene({ main: [jouee], aire, defausse: [aMetal[4]!, aMetal[5]!] });
  etat = faire(etat, { type: 'jouer', carte: jouee }, { type: 'payer', paiement: [aire[0]!] });
  expect(etat.attente).toMatchObject({ type: 'gain', restant: 1 });
  etat = faire(etat, { type: 'trasher', carte: aMetal[4]! });
  expect(etat.trash).toEqual([aMetal[4]]);
});
