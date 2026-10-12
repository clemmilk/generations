import { describe, expect, it } from 'vitest';
import { imaginerEtat } from '../../src/ai/imagination.ts';
import { BOTS, choisirAction } from '../../src/ai/index.ts';
import { applyAction, createGame, getLegalActions, getPlayerView, isGameOver } from '../../src/game/index.ts';
import type { Etat } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { inscriptions } from '../moteur/outils.ts';

function des(graine: number): () => number {
  const etat = { rng: graine };
  return () => alea(etat);
}

/** Des situations variées : une partie entre bots entraînés, photographiée toutes les 7 actions. */
function situations(nombreDeJoueurs: number, graine: number): Etat[] {
  const photos: Etat[] = [];
  let etat = createGame(inscriptions(nombreDeJoueurs), graine);
  const hasard = des(graine);
  for (let i = 0; i < 400 && !isGameOver(etat); i++) {
    if (i % 7 === 0) photos.push(etat);
    etat = applyAction(etat, choisirAction(etat, BOTS.entrainee, hasard)!);
  }
  return photos;
}

const sansJournal = (etat: Etat, moi: number) => ({ ...getPlayerView(etat, moi), journal: [] });

describe('imaginerEtat', () => {
  it('fabrique une partie dont la vue est exactement celle du joueur', () => {
    for (const n of [2, 3, 4]) {
      for (const etat of situations(n, 10 + n)) {
        for (const moi of etat.joueurs) {
          const imagine = imaginerEtat(getPlayerView(etat, moi.id), des(5));
          expect(sansJournal(imagine, moi.id)).toEqual(sansJournal(etat, moi.id));
        }
      }
    }
  });

  it('garde la main du joueur telle quelle, et le contenu de sa pioche', () => {
    const etat = situations(3, 21)[6]!;
    const imagine = imaginerEtat(getPlayerView(etat, 1), des(5));
    expect(imagine.joueurs[1]!.main).toEqual(etat.joueurs[1]!.main);
    expect([...imagine.joueurs[1]!.pioche].sort()).toEqual([...etat.joueurs[1]!.pioche].sort());
  });

  it('ne perd ni ne duplique aucune carte ni aucun Privilège', () => {
    for (const etat of situations(4, 31)) {
      const imagine = imaginerEtat(getPlayerView(etat, 2), des(8));
      const cartes = [
        ...imagine.joueurs.flatMap((j) => [...j.pioche, ...j.main, ...j.aireDeJeu, ...j.defausse]),
        ...imagine.riviere,
        ...imagine.piocheCommune,
        ...imagine.trash,
        ...imagine.asymetrieEcartees,
      ];
      expect(cartes).toHaveLength(MATERIEL.cartes.length);
      expect(new Set(cartes).size).toBe(MATERIEL.cartes.length);
      const privileges = [
        ...imagine.joueurs.flatMap((j) => j.privileges),
        ...imagine.privilegesVisibles,
        ...imagine.piochePrivileges,
      ];
      expect(new Set(privileges).size).toBe(20);
      expect(privileges).toHaveLength(20);
    }
  });

  it('imagine des répartitions différentes d\'un tirage à l\'autre', () => {
    const etat = createGame(inscriptions(2), 42);
    const vue = getPlayerView(etat, 0);
    const mains = new Set<string>();
    for (let graine = 1; graine <= 20; graine++) {
      mains.add([...imaginerEtat(vue, des(graine)).joueurs[1]!.main].sort().join());
    }
    expect(mains.size).toBeGreaterThan(10);
  });

  it('ne donne à un adversaire que des cartes qu\'il peut réellement avoir', () => {
    const etat = createGame(inscriptions(2), 42);
    const vue = getPlayerView(etat, 0);
    const miennes = [...etat.joueurs[0]!.main, ...etat.joueurs[0]!.pioche];
    for (let graine = 1; graine <= 20; graine++) {
      const bob = imaginerEtat(vue, des(graine)).joueurs[1]!;
      for (const id of [...bob.main, ...bob.pioche]) {
        const c = MATERIEL.cartes.find((carte) => carte.id === id)!;
        // Ses cartes de départ jaunes, ou une carte Assymétrie que je n'ai pas moi-même.
        expect(c.couleur === 'jaune' || c.origine === 'asymetrie').toBe(true);
        expect(miennes).not.toContain(id);
      }
    }
  });

  it('propose au joueur exactement les mêmes actions que la vraie partie', () => {
    for (const etat of situations(3, 44)) {
      const moi = etat.attente!.joueur;
      const imagine = imaginerEtat(getPlayerView(etat, moi), des(3));
      expect(getLegalActions(imagine, moi)).toEqual(getLegalActions(etat, moi));
    }
  });

  it('donne une partie qui peut être jouée jusqu\'au bout', () => {
    const etat = situations(3, 55)[10]!;
    let imagine = imaginerEtat(getPlayerView(etat, 0), des(9));
    const hasard = des(2);
    for (let i = 0; i < 2000 && !isGameOver(imagine); i++) {
      imagine = applyAction(imagine, choisirAction(imagine, BOTS.entrainee, hasard)!);
    }
    expect(isGameOver(imagine)).toBe(true);
  });
});
