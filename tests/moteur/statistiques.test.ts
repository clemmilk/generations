import { describe, expect, it } from 'vitest';
import { createGame, getPlayerView } from '../../src/game/index.ts';
import { c, faire, inscriptions, installer, scene } from './outils.ts';

const VIDES = {
  tours: 0,
  lignees: 1,
  cartesJouees: 0,
  cartesAchetees: 0,
  cartesTrashees: 0,
  piochesSupplementaires: 0,
  effetsRougesUtilises: 0,
};

describe('statistiques des joueurs', () => {
  it('commencent à zéro, avec une première lignée déjà commencée', () => {
    const etat = createGame(inscriptions(3), 42);
    for (const joueur of etat.joueurs) expect(joueur.statistiques).toEqual(VIDES);
  });

  it('sont visibles par tous les joueurs', () => {
    const etat = faire(scene({ main: [c('Forgeron')] }), { type: 'jouer', carte: c('Forgeron') });
    expect(getPlayerView(etat, 1).joueurs[0]!.statistiques).toEqual(etat.joueurs[0]!.statistiques);
    expect(getPlayerView(etat, 1).joueurs[0]!.statistiques.cartesJouees).toBe(1);
  });

  it('comptent un tour et une carte jouée quand on joue une carte', () => {
    const etat = faire(scene({ main: [c('Forgeron')] }), { type: 'jouer', carte: c('Forgeron') });
    expect(etat.joueurs[0]!.statistiques).toEqual({ ...VIDES, tours: 1, cartesJouees: 1 });
    expect(etat.joueurs[1]!.statistiques).toEqual(VIDES);
  });

  it('comptent un seul tour pour un achat suivi d\'un trash', () => {
    const etat = scene({ main: [c('Cachot')], or: 3 });
    etat.riviere = [c('Remouleur ambulant')];
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'trasher', carte: c('Cachot') },
    );
    expect(apres.joueurs[0]!.statistiques).toEqual({ ...VIDES, tours: 1, cartesAchetees: 1, cartesTrashees: 1 });
  });

  it('comptent un tour et une nouvelle lignée quand on met fin à sa lignée', () => {
    const etat = faire(scene({ defausse: [c('Forgeron')] }), { type: 'finLignee' });
    expect(etat.joueurs[0]!.statistiques).toEqual({ ...VIDES, tours: 1, lignees: 2 });
  });

  it('comptent les tours supplémentaires d\'un Rejouer', () => {
    const etat = faire(
      scene({ main: [c('Remouleur ambulant'), c('Forgeron')] }),
      { type: 'jouer', carte: c('Remouleur ambulant') },
      { type: 'rejouer' },
      { type: 'jouer', carte: c('Forgeron') },
    );
    expect(etat.joueurs[0]!.statistiques.tours).toBe(2);
  });

  describe('pioches supplémentaires', () => {
    it('comptent les cartes piochées par un effet', () => {
      const etat = faire(
        scene({ main: [c('Moulin')], or: 6 }),
        { type: 'jouer', carte: c('Moulin') },
        { type: 'payer', paiement: [] },
      );
      expect(etat.joueurs[0]!.statistiques.piochesSupplementaires).toBe(2);
    });

    it('comptent les cartes recherchées par un effet', () => {
      const etat = faire(
        scene({ main: [c('Imprimeur')], aire: [c('Épicerie'), c('Salle du trésor')] }),
        { type: 'jouer', carte: c('Imprimeur') },
      );
      const cible = etat.joueurs[0]!.pioche[0]!;
      const apres = faire(etat, { type: 'rechercher', carte: cible });
      expect(apres.joueurs[0]!.statistiques.piochesSupplementaires).toBe(1);
    });

    it('comptent les pioches payées avec un Privilège 13, 14 ou 15', () => {
      const etat = scene({ or: 7 });
      etat.joueurs[0]!.privileges = [15];
      const apres = faire(etat, { type: 'utiliserPrivilege', numero: 15, paiement: [] });
      expect(apres.joueurs[0]!.statistiques).toEqual({ ...VIDES, tours: 1, piochesSupplementaires: 1 });
    });

    it('ne comptent ni la pioche de début de lignée, ni celles des Privilèges 8 et 12', () => {
      const etat = scene({ defausse: [c('Forgeron')] });
      etat.joueurs[0]!.privileges = [8, 12];
      let apres = faire(etat, { type: 'finLignee' });
      apres = faire(apres, { type: 'rechercher', carte: apres.joueurs[0]!.pioche[0]! });
      apres = faire(apres, { type: 'defausser', carte: apres.joueurs[0]!.main[0]! });
      expect(apres.joueurs[0]!.statistiques.piochesSupplementaires).toBe(0);
    });
  });

  describe('Effets Rouges utilisés', () => {
    it('comptent un Effet Rouge reçu automatiquement (gain d\'Or)', () => {
      const etat = faire(scene({ main: [c('Épicerie')] }, 3), { type: 'jouer', carte: c('Épicerie') });
      expect(etat.joueurs.map((j) => j.statistiques.effetsRougesUtilises)).toEqual([0, 1, 1]);
    });

    it('comptent un Effet Rouge payé, pas un Effet Rouge refusé', () => {
      const depart = scene({ main: [c('Tour de guet')] }, 3);
      installer(depart, 1, { or: 5, main: [c('Cachot', 'jaune')] });
      installer(depart, 2, { or: 5, main: [c('Cachot', 'rouge')] });
      const apres = faire(
        depart,
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'payer', paiement: [] }, // Bob paye…
        { type: 'trasher', carte: c('Cachot', 'jaune') },
        { type: 'passer' }, // … Chloé refuse.
      );
      expect(apres.joueurs.map((j) => j.statistiques.effetsRougesUtilises)).toEqual([0, 1, 0]);
      expect(apres.joueurs[1]!.statistiques.cartesTrashees).toBe(1);
    });

    it('ne comptent qu\'1 fois une carte, même avec plusieurs ventes au Marché', () => {
      const depart = scene({ main: [c('Marché')] });
      installer(depart, 1, { aire: [c('Cachot', 'jaune'), c('Forgeron', 'jaune')] });
      const apres = faire(
        depart,
        { type: 'jouer', carte: c('Marché') },
        { type: 'passer' },
        { type: 'vendre', carte: c('Cachot', 'jaune') },
        { type: 'vendre', carte: c('Forgeron', 'jaune') },
      );
      expect(apres.joueurs[1]!.statistiques.effetsRougesUtilises).toBe(1);
    });

    it('ne comptent pas l\'effet de sa propre carte', () => {
      const etat = faire(
        scene({ main: [c('Tour de guet'), c('Cachot')], or: 4 }),
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'payer', paiement: [] },
        { type: 'trasher', carte: c('Cachot') },
      );
      expect(etat.joueurs[0]!.statistiques.effetsRougesUtilises).toBe(0);
    });

    it('ne donnent l\'Or du Privilège 20 qu\'à celui qui le possède', () => {
      const depart = scene({ main: [c('Épicerie')] }, 3);
      depart.joueurs[2]!.privileges = [20];
      const apres = faire(depart, { type: 'jouer', carte: c('Épicerie') });
      expect(apres.joueurs.map((j) => j.or)).toEqual([4, 2, 4]);
      expect(apres.joueurs.map((j) => j.statistiques.effetsRougesUtilises)).toEqual([0, 1, 1]);
    });
  });
});
