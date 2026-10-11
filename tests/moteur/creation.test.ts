import { describe, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { ordreDuTour } from '../../src/game/creation.ts';
import { createGame, getScores, isGameOver } from '../../src/game/index.ts';
import { inscriptions } from './outils.ts';

const GRAINES = [1, 2, 3, 42, 2026];

describe('createGame', () => {
  it('redonne exactement la même partie avec la même graine', () => {
    expect(createGame(inscriptions(4), 42)).toEqual(createGame(inscriptions(4), 42));
  });

  it('donne des parties différentes avec des graines différentes', () => {
    expect(createGame(inscriptions(4), 1)).not.toEqual(createGame(inscriptions(4), 2));
  });

  it('refuse moins de 2 joueurs, plus de 4 joueurs et les couleurs en double', () => {
    expect(() => createGame(inscriptions(1), 1)).toThrow(/2 à 4 joueurs/);
    expect(() =>
      createGame([...inscriptions(4), { nom: 'Eve', couleur: 'bleu' }], 1),
    ).toThrow(/2 à 4 joueurs/);
    expect(() =>
      createGame(
        [
          { nom: 'Alice', couleur: 'bleu' },
          { nom: 'Bob', couleur: 'bleu' },
        ],
        1,
      ),
    ).toThrow(/même couleur/);
  });

  for (const n of [2, 3, 4]) {
    describe(`à ${n} joueurs`, () => {
      it('donne à chacun un deck de 11 cartes : 9 de sa couleur et 2 Assymétrie', () => {
        for (const graine of GRAINES) {
          const etat = createGame(inscriptions(n), graine);
          for (const joueur of etat.joueurs) {
            const deck = [...joueur.pioche, ...joueur.main].map(carte);
            expect(deck).toHaveLength(11);
            expect(deck.filter((c) => c.couleur === joueur.couleur)).toHaveLength(9);
            expect(deck.filter((c) => c.origine === 'asymetrie')).toHaveLength(2);
          }
        }
      });

      it('ne distribue jamais deux fois la même carte Assymétrie et écarte les autres', () => {
        for (const graine of GRAINES) {
          const etat = createGame(inscriptions(n), graine);
          const distribuees = etat.joueurs
            .flatMap((j) => [...j.pioche, ...j.main])
            .filter((id) => carte(id).origine === 'asymetrie');
          expect(new Set(distribuees).size).toBe(2 * n);
          expect(etat.asymetrieEcartees).toHaveLength(10 - 2 * n);
          expect(new Set([...distribuees, ...etat.asymetrieEcartees]).size).toBe(10);
        }
      });

      it('fait débuter la première lignée à tous : 3 cartes en main, 8 en pioche', () => {
        const etat = createGame(inscriptions(n), 42);
        for (const joueur of etat.joueurs) {
          expect(joueur.main).toHaveLength(3);
          expect(joueur.pioche).toHaveLength(8);
          expect(joueur.aireDeJeu).toEqual([]);
          expect(joueur.defausse).toEqual([]);
          expect(joueur.niveauEconomie).toBe(0);
          expect(joueur.niveauPopulation).toBe(0);
          expect(joueur.privileges).toEqual([]);
        }
      });

      it('donne 3 Or à chacun, plus 1, 2 ou 3 Or selon la place dans l\'ordre du tour', () => {
        for (const graine of GRAINES) {
          const etat = createGame(inscriptions(n), graine);
          const ors = ordreDuTour(etat, etat.premierJoueur).map((j) => j.or);
          expect(ors).toEqual([3, 4, 5, 6].slice(0, n));
        }
      });

      it('révèle 4 cartes Avancée et 4 Privilèges', () => {
        const etat = createGame(inscriptions(n), 42);
        expect(etat.riviere).toHaveLength(4);
        expect(etat.piocheCommune).toHaveLength(29);
        expect([...etat.riviere, ...etat.piocheCommune].every((id) => carte(id).origine === 'avancee')).toBe(true);
        expect(new Set([...etat.riviere, ...etat.piocheCommune]).size).toBe(33);
        expect(etat.privilegesVisibles).toHaveLength(4);
        expect(etat.piochePrivileges).toHaveLength(16);
        expect(new Set([...etat.privilegesVisibles, ...etat.piochePrivileges]).size).toBe(20);
      });
    });
  }

  it('désigne le premier joueur au hasard, et il est le joueur actif', () => {
    const premiers = new Set<number>();
    for (let graine = 0; graine < 60; graine++) {
      const etat = createGame(inscriptions(4), graine);
      expect(etat.joueurActif).toBe(etat.premierJoueur);
      premiers.add(etat.premierJoueur);
    }
    expect([...premiers].sort()).toEqual([0, 1, 2, 3]);
  });

  it('mélange les decks : la main de départ change d\'une graine à l\'autre', () => {
    const mains = new Set<string>();
    for (let graine = 0; graine < 30; graine++) {
      mains.add(createGame(inscriptions(2), graine).joueurs[0]!.main.join());
    }
    expect(mains.size).toBeGreaterThan(20);
  });

  it('démarre une partie sans vainqueur', () => {
    const etat = createGame(inscriptions(3), 42);
    expect(isGameOver(etat)).toBe(false);
    expect(getScores(etat)).toEqual([0, 0, 0]);
  });
});

describe('getScores', () => {
  it('donne 1 au vainqueur et 0 aux autres', () => {
    const etat = createGame(inscriptions(3), 42);
    etat.vainqueur = 1;
    expect(isGameOver(etat)).toBe(true);
    expect(getScores(etat)).toEqual([0, 1, 0]);
  });
});
