import { describe, expect, it } from 'vitest';
import type { Bot } from '../../src/ai/bot.ts';
import { avecConsigne } from '../../src/ai/contraintes.ts';
import { ecartApparie, fourchette, jouerPartieJumelle, siegeTeste } from '../../src/ai/forceCartes.ts';
import { BOTS } from '../../src/ai/index.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';
import type { Action } from '../../src/game/actions.ts';
import { getLegalActions, getPlayerView } from '../../src/game/index.ts';
import { c, scene } from '../moteur/outils.ts';

/** Un bot qui retient les actions qu'on lui propose et prend la première. */
function espion(): Bot & { proposees: Action[] } {
  const bot = {
    nom: 'espion',
    proposees: [] as Action[],
    choisir(_vue: unknown, actions: Action[]) {
      bot.proposees = actions;
      return actions[0]!;
    },
  };
  return bot as Bot & { proposees: Action[] };
}

const hasard = () => 0.5;

/** Alice peut acheter le Remouleur ambulant ou le Forgeron de la rivière. */
function situation(or: number) {
  const etat = scene({ main: [c('Cachot')], or });
  etat.riviere = [c('Remouleur ambulant'), c('Forgeron', 'jaune')];
  return { vue: getPlayerView(etat, 0), actions: getLegalActions(etat, 0) };
}
const achats = (actions: Action[]) => actions.flatMap((a) => (a.type === 'acheter' ? [a.carte] : []));

describe('consignes imposées à un bot', () => {
  it('« interdit » retire seulement les achats de la carte', () => {
    const { vue, actions } = situation(20);
    expect(achats(actions)).toContain(c('Remouleur ambulant'));
    const bot = espion();
    avecConsigne(bot, { type: 'interdit', carte: c('Remouleur ambulant') }).choisir(vue, actions, hasard);
    expect(achats(bot.proposees)).not.toContain(c('Remouleur ambulant'));
    expect(bot.proposees).toEqual(actions.filter((a) => !(a.type === 'acheter' && a.carte === c('Remouleur ambulant'))));
  });

  it('« interdit » ne laisse jamais le bot sans action', () => {
    const seule: Action = { type: 'acheter', joueur: 0, carte: c('Remouleur ambulant'), paiement: [] };
    const bot = espion();
    const choisie = avecConsigne(bot, { type: 'interdit', carte: c('Remouleur ambulant') }).choisir(situation(20).vue, [seule], hasard);
    expect(choisie).toEqual(seule);
  });

  it('« prioritaire » ne propose que l\'achat de la carte quand il est possible', () => {
    const { vue, actions } = situation(20);
    const bot = espion();
    avecConsigne(bot, { type: 'prioritaire', carte: c('Remouleur ambulant') }).choisir(vue, actions, hasard);
    expect(bot.proposees.length).toBeGreaterThan(0);
    expect(bot.proposees.every((a) => a.type === 'acheter' && a.carte === c('Remouleur ambulant'))).toBe(true);
  });

  it('« prioritaire » laisse jouer normalement quand la carte n\'est pas achetable', () => {
    const { vue, actions } = situation(0);
    expect(achats(actions)).not.toContain(c('Remouleur ambulant'));
    const bot = espion();
    avecConsigne(bot, { type: 'prioritaire', carte: c('Remouleur ambulant') }).choisir(vue, actions, hasard);
    expect(bot.proposees).toEqual(actions);
  });
});

describe('parties jumelles', () => {
  it('le siège testé tourne d\'une graine à l\'autre', () => {
    expect([1, 2, 3, 4, 5, 6].map((g) => siegeTeste(g, 3))).toEqual([1, 2, 0, 1, 2, 0]);
  });

  it('sans consigne, rejouent exactement la partie de simulerPartie', () => {
    const resultat = simulerPartie([BOTS.entrainee, BOTS.entrainee, BOTS.entrainee], 7);
    expect(jouerPartieJumelle(BOTS.entrainee, 3, 7, null)).toEqual({
      graine: 7,
      vainqueur: resultat.vainqueur,
      asymetrieDeDepart: resultat.asymetrieDeDepart,
      achatsParSiege: resultat.achatsParSiege,
    });
  });

  it('avec « interdit », le siège testé n\'achète jamais la carte, les autres si', () => {
    // Une graine où le siège testé achète une carte en temps normal.
    let graine = 1;
    let reference = jouerPartieJumelle(BOTS.entrainee, 3, graine, null);
    while (reference.achatsParSiege[siegeTeste(graine, 3)]!.length === 0) {
      graine++;
      reference = jouerPartieJumelle(BOTS.entrainee, 3, graine, null);
    }
    const teste = siegeTeste(graine, 3);
    const cible = reference.achatsParSiege[teste]![0]!;
    const avec = jouerPartieJumelle(BOTS.entrainee, 3, graine, { type: 'interdit', carte: cible });
    expect(avec.achatsParSiege[teste]).not.toContain(cible);
    expect(avec.asymetrieDeDepart).toEqual(reference.asymetrieDeDepart);
  });

  it('chaque Domaine reçu au départ est bien une carte Assymétrie, distribuée à un seul joueur', () => {
    const { asymetrieDeDepart } = jouerPartieJumelle(BOTS.entrainee, 3, 11, null);
    const toutes = asymetrieDeDepart.flat();
    expect(toutes.length).toBeGreaterThan(0);
    expect(new Set(toutes).size).toBe(toutes.length);
  });
});

describe('calculs statistiques', () => {
  it('écart apparié : moyenne des différences, en points', () => {
    const e = ecartApparie([
      { avec: true, sans: false },
      { avec: true, sans: true },
      { avec: false, sans: false },
      { avec: false, sans: true },
      { avec: true, sans: false },
    ]);
    expect(e.points).toBeCloseTo(20);
    expect(e.parties).toBe(5);
    expect(e.basse).toBeLessThan(e.points);
    expect(e.haute).toBeGreaterThan(e.points);
  });

  it('écart apparié nul quand les parties sont identiques', () => {
    const e = ecartApparie(Array.from({ length: 10 }, (_, i) => ({ avec: i % 3 === 0, sans: i % 3 === 0 })));
    expect(e).toEqual({ points: 0, basse: 0, haute: 0, parties: 10 });
  });

  it('écart apparié sans aucune partie', () => {
    expect(ecartApparie([]).parties).toBe(0);
  });

  it('fourchette de Wilson : contient le taux observé et reste entre 0 et 100', () => {
    const f = fourchette(30, 100);
    expect(f.taux).toBe(30);
    expect(f.basse).toBeGreaterThan(21);
    expect(f.haute).toBeLessThan(40);
    expect(fourchette(0, 50).basse).toBeCloseTo(0);
    expect(fourchette(50, 50).haute).toBeCloseTo(100);
    expect(fourchette(0, 0)).toEqual({ taux: 0, basse: 0, haute: 100 });
  });
});
