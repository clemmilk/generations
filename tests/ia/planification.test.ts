import { describe, expect, it } from 'vitest';
import { BOTS, choisirAction } from '../../src/ai/index.ts';
import { creerBotPlanificateur } from '../../src/ai/planification.ts';
import { POIDS_MANUELS } from '../../src/ai/poids.ts';
import { creerBotPreferences } from '../../src/ai/preferences.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';
import { createGame, getLegalActions } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { c, faire, inscriptions, installer, scene } from '../moteur/outils.ts';

function des(graine = 1): () => number {
  const etat = { rng: graine };
  return () => alea(etat);
}

const rapide = creerBotPlanificateur('rapide', { guide: BOTS.entrainee, simulations: 16 });

describe('bot qui planifie', () => {
  it('choisit toujours une action permise', () => {
    const etat = createGame(inscriptions(2), 42);
    const permises = getLegalActions(etat, etat.attente!.joueur);
    expect(permises).toContainEqual(choisirAction(etat, rapide, des()));
  });

  it('ne simule rien quand une seule action est possible', () => {
    const sansGuide = creerBotPlanificateur('test', {
      guide: { nom: 'jamais appelé', choisir: () => { throw new Error('le guide ne devrait pas être consulté'); } },
      simulations: 16,
    });
    // Alice n'a ni carte en main, ni Or : elle ne peut que mettre fin à sa lignée.
    const etat = scene({ aire: [c('Épicerie')] });
    etat.riviere = [];
    expect(choisirAction(etat, sansGuide, des())).toEqual({ type: 'finLignee', joueur: 0 });
  });

  it('prend la même décision avec le même tirage', () => {
    const etat = createGame(inscriptions(3), 7);
    expect(choisirAction(etat, rapide, des(4))).toEqual(choisirAction(etat, rapide, des(4)));
  });

  it('suit l\'avis de son guide quand aucune action n\'est nettement meilleure', () => {
    // Avec une marge inatteignable, il ne s'écarte jamais de son guide.
    const docile = creerBotPlanificateur('docile', { guide: BOTS.entrainee, simulations: 16, marge: 2 });
    for (const graine of [1, 2, 3, 4]) {
      const etat = createGame(inscriptions(2), graine);
      expect(choisirAction(etat, docile, des(9))).toEqual(choisirAction(etat, BOTS.entrainee, des(9)));
    }
  });

  it('voit une victoire en deux temps que son guide ne voit pas', () => {
    // Un guide qui trouve que payer 4 Or pour piocher 1 carte n'en vaut pas la peine.
    const guide = creerBotPreferences('guide', {
      ...POIDS_MANUELS,
      pioche: 1,
      piocheCarte: 0,
      piocheProche: 0,
    });
    const planificatrice = creerBotPlanificateur('planificatrice', { guide, simulations: 40 });

    // Alice joue Cachot, sa dernière carte en main. Avec 3 cartes dans son deck, elle gagnera
    // à son prochain tour en finissant sa lignée.
    const etat = scene({ main: [c('Cachot')], pioche: [c('Épicerie'), c('Marché')] });
    // Bob a 2 cartes en pioche, Cachot en main et 7 Or. S'il paye 4 Or maintenant (Effet Rouge),
    // il lui reste 1 carte en pioche et 3 Or : à son tour, son propre Cachot lui fait piocher la dernière.
    installer(etat, 1, {
      or: 7,
      main: [c('Cachot', 'jaune')],
      aire: [c('Épicerie', 'jaune')],
      pioche: [c('Marché', 'jaune'), c('Forgeron', 'jaune')],
    });
    const decision = faire(etat, { type: 'jouer', carte: c('Cachot') });
    expect(decision.attente).toMatchObject({ type: 'payer', joueur: 1, rouge: true });

    expect(choisirAction(decision, guide, des())).toMatchObject({ type: 'passer' });
    expect(choisirAction(decision, planificatrice, des())).toMatchObject({ type: 'payer' });

    // Et la suite lui donne raison : Bob gagne à son tour.
    let suite = faire(decision, { type: 'payer', paiement: [] });
    expect(suite.attente).toEqual({ type: 'tour', joueur: 1 });
    while (suite.vainqueur === null && suite.attente?.joueur === 1) {
      suite = faire(suite, (({ joueur, ...action }) => action)(choisirAction(suite, planificatrice, des())!));
    }
    expect(suite.vainqueur).toBe(1);
  });

  it('mène des parties entières jusqu\'à un vainqueur', () => {
    for (const graine of [1, 2]) {
      expect(simulerPartie([rapide, BOTS.entrainee], graine).vainqueur).not.toBeNull();
    }
    expect(simulerPartie([rapide, BOTS.entrainee, rapide], 3).vainqueur).not.toBeNull();
  }, 60_000);
});
