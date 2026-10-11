import { describe, expect, it } from 'vitest';
import { createGame } from '../../src/game/index.ts';
import { debuterLignee, piocher } from '../../src/game/lignee.ts';
import { inscriptions } from './outils.ts';

/** Une partie à 2 où le joueur 0 a tout son deck dans sa pioche, sans Or. */
function partieRemiseAZero() {
  const etat = createGame(inscriptions(2), 42);
  const joueur = etat.joueurs[0]!;
  joueur.pioche.push(...joueur.main.splice(0));
  joueur.or = 0;
  etat.journal = [];
  return { etat, joueur };
}

describe('piocher', () => {
  it('prend les cartes du dessus de la pioche, dans l\'ordre', () => {
    const { etat, joueur } = partieRemiseAZero();
    const dessus = joueur.pioche.slice(0, 2);
    expect(piocher(etat, joueur, 2)).toEqual(dessus);
    expect(joueur.main).toEqual(dessus);
    expect(joueur.pioche).toHaveLength(9);
    expect(etat.vainqueur).toBeNull();
  });

  it('fait gagner le joueur qui pioche la dernière carte de sa pioche', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche.splice(1);
    piocher(etat, joueur, 1);
    expect(joueur.pioche).toEqual([]);
    expect(etat.vainqueur).toBe(joueur.id);
    expect(etat.journal.at(-1)?.texte).toMatch(/remporte la partie/);
  });

  it('s\'arrête à la dernière carte quand on demande plus de cartes qu\'il n\'en reste', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche.splice(2);
    expect(piocher(etat, joueur, 5)).toHaveLength(2);
    expect(etat.vainqueur).toBe(joueur.id);
  });

  it('ne fait rien quand la pioche est déjà vide', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche = [];
    expect(piocher(etat, joueur, 1)).toEqual([]);
    expect(etat.vainqueur).toBeNull();
    expect(etat.journal).toEqual([]);
  });

  it('ne remplace pas un vainqueur déjà désigné', () => {
    const { etat, joueur } = partieRemiseAZero();
    etat.vainqueur = 1;
    joueur.pioche.splice(1);
    piocher(etat, joueur, 1);
    expect(etat.vainqueur).toBe(1);
  });

  it('ne montre les cartes piochées qu\'en détail privé du journal', () => {
    const { etat, joueur } = partieRemiseAZero();
    piocher(etat, joueur, 2);
    expect(etat.journal).toHaveLength(1);
    expect(etat.journal[0]).toMatchObject({ joueur: 0, texte: 'Alice pioche 2 carte(s).' });
    expect(etat.journal[0]?.detail).toMatch(/^Cartes piochées : /);
  });
});

describe('debuterLignee', () => {
  it('donne 3 Or et 3 cartes au niveau de départ', () => {
    const { etat, joueur } = partieRemiseAZero();
    debuterLignee(etat, joueur);
    expect(joueur.or).toBe(3);
    expect(joueur.main).toHaveLength(3);
  });

  it('ajoute l\'Or de la lignée à l\'Or déjà possédé', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.or = 2;
    debuterLignee(etat, joueur);
    expect(joueur.or).toBe(5);
  });

  it('suit les niveaux d\'Économie et de Population du plateau', () => {
    const attendus = [
      { niveau: 1, or: 4, cartes: 3 },
      { niveau: 2, or: 7, cartes: 4 },
      { niveau: 3, or: 8, cartes: 4 },
      { niveau: 4, or: 10, cartes: 5 },
    ];
    for (const { niveau, or, cartes } of attendus) {
      const { etat, joueur } = partieRemiseAZero();
      joueur.niveauEconomie = niveau;
      joueur.niveauPopulation = niveau;
      debuterLignee(etat, joueur);
      expect(joueur.or).toBe(or);
      expect(joueur.main).toHaveLength(cartes);
    }
  });

  it('fait gagner immédiatement si la pioche de début de lignée vide le deck', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche.splice(3);
    debuterLignee(etat, joueur);
    expect(joueur.main).toHaveLength(3);
    expect(etat.vainqueur).toBe(joueur.id);
  });

  it('fait gagner avec un deck plus petit que le nombre de cartes à piocher', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche.splice(2);
    debuterLignee(etat, joueur);
    expect(joueur.main).toHaveLength(2);
    expect(etat.vainqueur).toBe(joueur.id);
  });

  it('ne fait pas gagner un joueur dont le deck est vide', () => {
    const { etat, joueur } = partieRemiseAZero();
    joueur.pioche = [];
    debuterLignee(etat, joueur);
    expect(joueur.or).toBe(3);
    expect(joueur.main).toEqual([]);
    expect(etat.vainqueur).toBeNull();
  });
});
