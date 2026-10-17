import { afterEach, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';
import { faire, scene } from './outils.ts';

// Décision X : pour une étape « paye … pour obtenir … par tranche », le nombre de fois est compté
// AVANT le paiement. Les ressources défaussées pour payer comptent encore pour cet effet-là.
// Aucune carte du csv n'a encore ce type d'effet : le test en prête un, le temps du test, à une carte à 1 Métal.

const aMetal = MATERIEL.cartes.filter((c) => c.ressources.metal === 1 && c.ressources.pierre === 0).map((c) => c.id);
const jouee = aMetal[0]!;
const effetOriginal = carte(jouee).effet;
afterEach(() => {
  carte(jouee).effet = effetOriginal;
});

it('compte le Métal avant de payer : 4 Métal → 2 trashs, même après avoir payé 1 Métal', () => {
  carte(jouee).effet = lireCodeEffet('payer(metal:1) > trash(1) / metal:2');
  const aire = aMetal.slice(1, 4); // 3 cartes à 1 Métal, + la carte jouée = 4 Métal
  let etat = scene({ main: [jouee], aire, defausse: [aMetal[4]!, aMetal[5]!] });
  etat = faire(etat, { type: 'jouer', carte: jouee }, { type: 'payer', paiement: [aire[0]!] });
  expect(etat.attente).toMatchObject({ type: 'gain', restant: 2 });
  etat = faire(etat, { type: 'trasher', carte: aMetal[4]! }, { type: 'trasher', carte: aMetal[5]! });
  expect(etat.trash).toEqual([aMetal[4], aMetal[5]]);
});
