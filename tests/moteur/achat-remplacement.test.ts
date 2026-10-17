import { describe, expect, it } from 'vitest';
import { PARAMETRES } from '../../src/game/parametres.ts';
import { faire, permises, scene } from './outils.ts';

// Décision AA (essai du 16/10) : la carte achetée remplace obligatoirement une carte du deck, trashée
// gratuitement, et prend sa place : main, aire de jeu, défausse, ou dessus de la pioche.
describe.runIf(PARAMETRES.carteAcheteeVa === 'remplacement')('achat par remplacement', () => {
  /** Une scène où Alice achète la première carte de la Rivière (assez d'Or, aucune Ressource demandée). */
  function apresAchat(privileges: number[] = []) {
    const etat = scene({ or: 20 });
    const alice = etat.joueurs[0]!;
    alice.privileges = privileges;
    // Une carte de chaque zone, prise dans son deck de départ.
    const [main, aire, defausse, ...pioche] = alice.pioche;
    alice.main = [main!];
    alice.aireDeJeu = [aire!];
    alice.defausse = [defausse!];
    alice.pioche = pioche;
    const achetee = etat.riviere.find((id) => permises(etat).some((a) => a.type === 'acheter' && a.carte === id && a.paiement.length === 0))!;
    return { etat: faire(etat, { type: 'acheter', carte: achetee, paiement: [] }), achetee, main: main!, aire: aire!, defausse: defausse!, dessus: pioche[0]! };
  }

  it('oblige à choisir la carte remplacée, dans toutes les zones, sans pouvoir renoncer', () => {
    const { etat, main, aire, defausse } = apresAchat();
    expect(etat.attente?.type).toBe('remplacementAchat');
    expect(permises(etat)).toEqual([
      { type: 'remplacer', carte: main },
      { type: 'remplacer', carte: aire },
      { type: 'remplacer', carte: defausse },
      { type: 'remplacerPioche' },
    ]);
  });

  it('en main : la carte achetée prend sa place, la carte remplacée est trashée sans payer', () => {
    const { etat, achetee, main } = apresAchat();
    const or = etat.joueurs[0]!.or;
    const apres = faire(etat, { type: 'remplacer', carte: main });
    expect(apres.joueurs[0]!.main).toEqual([achetee]);
    expect(apres.trash).toEqual([main]);
    expect(apres.joueurs[0]!.or).toBe(or);
  });

  it('dans l\'aire de jeu ou la défausse : la carte achetée y va', () => {
    const a = apresAchat();
    expect(faire(a.etat, { type: 'remplacer', carte: a.aire }).joueurs[0]!.aireDeJeu).toEqual([a.achetee]);
    const d = apresAchat();
    expect(faire(d.etat, { type: 'remplacer', carte: d.defausse }).joueurs[0]!.defausse).toEqual([d.achetee]);
  });

  it('sur la pioche : la première carte est trashée et la carte achetée prend sa place', () => {
    const { etat, achetee, dessus } = apresAchat();
    const apres = faire(etat, { type: 'remplacerPioche' });
    expect(apres.joueurs[0]!.pioche[0]).toBe(achetee);
    expect(apres.trash).toEqual([dessus]);
  });

  it('le Privilège 17 rapporte 2 Or pour la carte remplacée', () => {
    const { etat, main } = apresAchat([17]);
    const or = etat.joueurs[0]!.or;
    expect(faire(etat, { type: 'remplacer', carte: main }).joueurs[0]!.or).toBe(or + 2);
  });
});
