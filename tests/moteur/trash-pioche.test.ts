import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { getPlayerView } from '../../src/game/index.ts';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';
import { avecReglage, c, faire, permises, scene } from './outils.ts';

// Décision GG (18/10) : à chaque trash, le joueur peut trasher la carte du dessus de sa pioche, sans la regarder.
// Cela vaut pour tous les trashs (effets, Effets Rouges, Privilège 13), autant de fois que l'effet le permet.
// Trasher la dernière carte de sa pioche fait gagner, comme la piocher.
// Pour ces tests, on prête à l'Épicerie l'effet « trash(N) ».
const hote = c('Épicerie');
const effetOriginal = carte(hote).effet;
const preter = (code: string) => {
  carte(hote).effet = lireCodeEffet(code);
};
beforeEach(() => preter('trash(1)'));
afterEach(() => {
  carte(hote).effet = effetOriginal;
});

describe('trasher la carte du dessus de sa pioche', () => {
  it('est proposé avec les cartes de la main, de l\'aire de jeu et de la défausse', () => {
    const etat = faire(scene({ main: [hote, c('Cachot')], pioche: [c('Forgeron'), c('Marché')] }), {
      type: 'jouer',
      carte: hote,
    });
    expect(permises(etat)).toEqual([
      { type: 'trasher', carte: c('Cachot') },
      { type: 'trasher', carte: hote },
      { type: 'trasherPioche' },
      { type: 'passer' },
    ]);
  });

  it('trashe la première carte de la pioche, qui devient publique', () => {
    const etat = scene({ main: [hote], pioche: [c('Forgeron'), c('Marché')] });
    const apres = faire(etat, { type: 'jouer', carte: hote }, { type: 'trasherPioche' });
    expect(apres.joueurs[0]!.pioche).toEqual([c('Marché')]);
    expect(apres.trash).toEqual([c('Forgeron')]);
    expect(apres.joueurs[0]!.statistiques.cartesTrashees).toBe(1);
    expect(getPlayerView(apres, 1).trash).toEqual([c('Forgeron')]);
    expect(apres.vainqueur).toBeNull();
  });

  it('peut être choisi plusieurs fois par le même effet', () => {
    preter('trash(2)');
    const etat = scene({ main: [hote], pioche: [c('Forgeron'), c('Marché'), c('Cachot')] });
    const apres = faire(etat, { type: 'jouer', carte: hote }, { type: 'trasherPioche' }, { type: 'trasherPioche' });
    expect(apres.trash).toEqual([c('Forgeron'), c('Marché')]);
    expect(apres.joueurs[0]!.pioche).toEqual([c('Cachot')]);
  });

  it('fait gagner quand il trashe la dernière carte de la pioche', () => {
    const etat = scene({ main: [hote, c('Cachot')], pioche: [c('Forgeron')] });
    const apres = faire(etat, { type: 'jouer', carte: hote }, { type: 'trasherPioche' });
    expect(apres.joueurs[0]!.pioche).toEqual([]);
    expect(apres.vainqueur).toBe(0);
  });

  it('n\'est pas proposé quand la pioche est vide', () => {
    const etat = faire(scene({ main: [hote, c('Cachot')], pioche: [] }), { type: 'jouer', carte: hote });
    expect(permises(etat)).toEqual([
      { type: 'trasher', carte: c('Cachot') },
      { type: 'trasher', carte: hote },
      { type: 'passer' },
    ]);
  });

  it('vaut aussi pour l\'Effet Rouge d\'un adversaire', () => {
    preter('or+1');
    const rougeOriginal = carte(hote).effetRouge;
    carte(hote).effetRouge = lireCodeEffet('trash(1)');
    try {
      const etat = scene({ main: [hote] });
      etat.joueurs[1]!.pioche = [c('Forgeron', 'jaune'), c('Marché', 'jaune')];
      const apres = faire(etat, { type: 'jouer', carte: hote });
      expect(apres.attente).toMatchObject({ joueur: 1 });
      const fin = faire(apres, { type: 'trasherPioche' });
      expect(fin.trash).toEqual([c('Forgeron', 'jaune')]);
    } finally {
      carte(hote).effetRouge = rougeOriginal;
    }
  });

  it('déclenche le Privilège 17 (2 Or par carte trashée)', () => {
    const etat = scene({ main: [hote], pioche: [c('Forgeron'), c('Marché')] });
    etat.joueurs[0]!.privileges = [17];
    const apres = faire(etat, { type: 'jouer', carte: hote }, { type: 'trasherPioche' });
    expect(apres.joueurs[0]!.or).toBe(2);
  });

  it('permet d\'utiliser le Privilège 13 même sans carte en main, en jeu ni en défausse', () => {
    // Les 3 Pierres viennent de l'aire de jeu : payées, ces cartes vont en défausse.
    const etat = scene({ aire: [c('Cour du roi')], pioche: [c('Forgeron'), c('Marché')] });
    etat.joueurs[0]!.privileges = [13];
    let apres = faire(etat, { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] });
    expect(apres.attente).toEqual({ type: 'trashPrivilege', joueur: 0, restant: 1 });
    apres = faire(apres, { type: 'trasherPioche' });
    expect(apres.trash).toEqual([c('Forgeron')]);
  });

  describe('réglage trashDessusPioche : false', () => {
    avecReglage('trashDessusPioche', false);
    it('ne propose plus le dessus de la pioche', () => {
      const etat = faire(scene({ main: [hote, c('Cachot')], pioche: [c('Forgeron')] }), { type: 'jouer', carte: hote });
      expect(permises(etat).map((a) => a.type)).not.toContain('trasherPioche');
    });
  });
});
