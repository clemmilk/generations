import { describe, expect, it } from 'vitest';
import { BOTS } from '../../src/ai/index.ts';
import { formaterResume, resumer, simulerPartie } from '../../src/ai/simulation.ts';
import type { ResultatPartie } from '../../src/ai/simulation.ts';
import { carte } from '../../src/game/cartes.ts';

const trois = [BOTS.aleatoire, BOTS.aleatoire, BOTS.aleatoire];

describe('simulerPartie', () => {
  it('redonne le même résultat avec la même graine', () => {
    expect(simulerPartie(trois, 12)).toEqual(simulerPartie(trois, 12));
  });

  it('donne des parties différentes avec des graines différentes', () => {
    expect(simulerPartie(trois, 1)).not.toEqual(simulerPartie(trois, 2));
  });

  it('décrit la partie : vainqueur, place, durée, achats, deck du vainqueur', () => {
    const resultat = simulerPartie(trois, 12);
    expect(resultat.vainqueur).not.toBeNull();
    expect([0, 1, 2]).toContain(resultat.vainqueur);
    expect([0, 1, 2]).toContain(resultat.placeVainqueur);
    expect(resultat.tours).toBeGreaterThan(0);
    expect(resultat.ligneesVainqueur).toBeGreaterThanOrEqual(1);
    for (const id of [...resultat.achats, ...resultat.deckVainqueur]) {
      expect(carte(id).origine).toBe('avancee');
    }
    // Une carte du deck du vainqueur a forcément été achetée.
    for (const id of resultat.deckVainqueur) expect(resultat.achats).toContain(id);
    expect(resultat.privilegesVainqueur.length).toBeLessThanOrEqual(4);
  });
});

describe('resumer', () => {
  const partie = (donnees: Partial<ResultatPartie>): ResultatPartie => ({
    graine: 0,
    vainqueur: 0,
    placeVainqueur: 0,
    tours: 10,
    ligneesVainqueur: 2,
    achats: [],
    deckVainqueur: [],
    privilegesVainqueur: [],
    asymetrieDeDepart: [],
    achatsParSiege: [],
    ...donnees,
  });

  it('compte les victoires par siège et par place, sans les parties non terminées', () => {
    const resume = resumer(
      [
        partie({ vainqueur: 0, placeVainqueur: 1 }),
        partie({ vainqueur: 0, placeVainqueur: 0 }),
        partie({ vainqueur: 1, placeVainqueur: 0 }),
        partie({ vainqueur: null, placeVainqueur: null, ligneesVainqueur: null }),
      ],
      2,
    );
    expect(resume.parties).toBe(4);
    expect(resume.terminees).toBe(3);
    expect(resume.victoiresParSiege).toEqual([2, 1]);
    expect(resume.victoiresParPlace).toEqual([2, 1]);
  });

  it('calcule la durée moyenne, minimale et maximale des parties terminées', () => {
    const resume = resumer(
      [
        partie({ tours: 10, ligneesVainqueur: 2 }),
        partie({ tours: 30, ligneesVainqueur: 4 }),
        partie({ tours: 999, vainqueur: null, placeVainqueur: null, ligneesVainqueur: null }),
      ],
      2,
    );
    expect(resume.toursMoyens).toBe(20);
    expect(resume.toursMin).toBe(10);
    expect(resume.toursMax).toBe(30);
    expect(resume.ligneesMoyennesVainqueur).toBe(3);
  });

  it('compte les achats et la présence des cartes dans les decks vainqueurs', () => {
    const resume = resumer(
      [
        partie({ achats: ['carte_8', 'carte_9'], deckVainqueur: ['carte_8'] }),
        partie({ achats: ['carte_8'], deckVainqueur: ['carte_8'], privilegesVainqueur: [17] }),
      ],
      2,
    );
    expect(resume.cartes).toHaveLength(33);
    expect(resume.cartes[0]).toEqual({ id: 'carte_8', nom: 'Carrière', achats: 2, decksVainqueurs: 2 });
    expect(resume.cartes[1]).toMatchObject({ id: 'carte_9', achats: 1, decksVainqueurs: 0 });
    expect(resume.privileges[0]).toEqual({ numero: 17, vainqueurs: 1 });
    expect(resume.privileges).toHaveLength(20);
  });

  it('ne plante pas sans aucune partie terminée', () => {
    const resume = resumer([partie({ vainqueur: null, placeVainqueur: null, ligneesVainqueur: null })], 2);
    expect(resume.toursMoyens).toBe(0);
    expect(formaterResume(resume, [BOTS.aleatoire, BOTS.aleatoire])).toContain('Parties terminées : 0');
  });
});

describe('formaterResume', () => {
  it('produit un texte avec les victoires par place et toutes les cartes', () => {
    const resultats = Array.from({ length: 20 }, (_, i) => simulerPartie(trois, i + 1));
    const texte = formaterResume(resumer(resultats, 3), trois);
    expect(texte).toContain('3 joueurs — 20 parties');
    expect(texte).toContain('1er joueur');
    expect(texte).toContain('3e joueur');
    expect(texte).toContain('Remouleur ambulant');
    expect(texte).toContain('Privilège 20');
  });
});
