import { describe, expect, it } from 'vitest';
import { BOTS } from '../../src/ai/index.ts';
import { observerPartie } from '../../src/ai/observation.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';
import { carte } from '../../src/game/cartes.ts';

const trois = [BOTS.entrainee, BOTS.entrainee, BOTS.entrainee];

describe('observerPartie', () => {
  it('joue exactement la même partie que simulerPartie', () => {
    for (const graine of [1, 2, 3, 4, 5]) {
      const observation = observerPartie(trois, graine);
      const resultat = simulerPartie(trois, graine);
      expect(observation.terminee).toBe(true);
      expect(observation.joueurs.findIndex((j) => j.gagne)).toBe(resultat.vainqueur);
      expect(observation.joueurs.find((j) => j.gagne)!.place).toBe(resultat.placeVainqueur);
    }
  });

  it('désigne un seul vainqueur et donne à chacun une place différente dans l\'ordre du tour', () => {
    const { joueurs } = observerPartie(trois, 8);
    expect(joueurs.filter((j) => j.gagne)).toHaveLength(1);
    expect(joueurs.map((j) => j.place).sort()).toEqual([0, 1, 2]);
  });

  it('note les 2 cartes Assymétrie reçues par chaque joueur', () => {
    for (const joueur of observerPartie(trois, 8).joueurs) {
      expect(joueur.asymetrie).toHaveLength(2);
      expect(joueur.asymetrie.every((id) => carte(id).origine === 'asymetrie')).toBe(true);
    }
  });

  it('note autant d\'achats, de cartes jouées et de trashs que les compteurs du moteur', () => {
    for (const graine of [11, 12, 13]) {
      for (const joueur of observerPartie(trois, graine).joueurs) {
        expect(joueur.achats).toHaveLength(joueur.statistiques.cartesAchetees);
        expect(joueur.jouees).toHaveLength(joueur.statistiques.cartesJouees);
        expect(joueur.trashs).toHaveLength(joueur.statistiques.cartesTrashees);
      }
    }
  });

  it('note une montée de jauge par niveau gagné et par Privilège obtenu', () => {
    for (const graine of [21, 22, 23]) {
      for (const joueur of observerPartie(trois, graine).joueurs) {
        expect(joueur.montees.filter((m) => m === 'economie')).toHaveLength(joueur.niveauEconomie);
        expect(joueur.montees.filter((m) => m === 'population')).toHaveLength(joueur.niveauPopulation);
        expect(joueur.montees.filter((m) => m === 'noblesse')).toHaveLength(joueur.privileges.length);
      }
    }
  });

  it('retrouve dans le deck final les cartes de départ et achetées qui n\'ont pas été trashées', () => {
    for (const joueur of observerPartie(trois, 31).joueurs) {
      // 9 cartes de départ + 2 Assymétrie + achats - trashs.
      expect(joueur.deckFinal).toHaveLength(11 + joueur.achats.length - joueur.trashs.length);
      for (const id of joueur.trashs) expect(joueur.deckFinal).not.toContain(id);
    }
  });
});
