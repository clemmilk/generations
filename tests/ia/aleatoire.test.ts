import { describe, expect, it } from 'vitest';
import { BOTS, choisirAction } from '../../src/ai/index.ts';
import { applyAction, createGame, getLegalActions, isGameOver } from '../../src/game/index.ts';
import type { Etat } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { inscriptions } from '../moteur/outils.ts';

/** Un tirage au sort rejouable, à partir d'une graine. */
function des(graine: number): () => number {
  const etat = { rng: graine };
  return () => alea(etat);
}

function partieEntreBots(graine: number): Etat {
  let etat = createGame(inscriptions(3), graine);
  const hasard = des(graine);
  for (let i = 0; i < 3000 && !isGameOver(etat); i++) {
    etat = applyAction(etat, choisirAction(etat, BOTS.aleatoire, hasard)!);
  }
  return etat;
}

describe('bot aléatoire', () => {
  it('choisit toujours une action permise', () => {
    const etat = createGame(inscriptions(2), 42);
    const permises = getLegalActions(etat, etat.attente!.joueur);
    const hasard = des(1);
    for (let i = 0; i < 50; i++) {
      expect(permises).toContainEqual(choisirAction(etat, BOTS.aleatoire, hasard));
    }
  });

  it('finit par essayer toutes les actions permises', () => {
    const etat = createGame(inscriptions(2), 42);
    const permises = getLegalActions(etat, etat.attente!.joueur);
    const hasard = des(1);
    const choisies = new Set<string>();
    for (let i = 0; i < 200; i++) {
      choisies.add(JSON.stringify(choisirAction(etat, BOTS.aleatoire, hasard)));
    }
    expect(choisies.size).toBe(permises.length);
  });

  it('rejoue la même partie avec la même graine', () => {
    expect(partieEntreBots(5)).toEqual(partieEntreBots(5));
  });

  it('mène une partie jusqu\'à un vainqueur', () => {
    expect(isGameOver(partieEntreBots(5))).toBe(true);
  });

  it('ne choisit rien quand la partie est finie', () => {
    expect(choisirAction(partieEntreBots(5), BOTS.aleatoire, des(1))).toBeNull();
  });
});
