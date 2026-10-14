import { describe, expect, it } from 'vitest';
import { borner, entrainer, entrainerContre, mesurer, muter } from '../../src/ai/entrainement.ts';
import { BOTS } from '../../src/ai/index.ts';
import { POIDS_MANUELS } from '../../src/ai/poids.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';
import { alea } from '../../src/game/hasard.ts';

function des(graine: number): () => number {
  const etat = { rng: graine };
  return () => alea(etat);
}

const graines = (n: number, depart = 1) => Array.from({ length: n }, (_, i) => depart + i);

describe('muter', () => {
  it('redonne la même variante avec le même tirage', () => {
    expect(muter(POIDS_MANUELS, des(4))).toEqual(muter(POIDS_MANUELS, des(4)));
  });

  it('modifie des poids sans toucher à l\'original ni à l\'unité de mesure', () => {
    const copie = structuredClone(POIDS_MANUELS);
    const variante = muter(POIDS_MANUELS, des(4));
    expect(POIDS_MANUELS).toEqual(copie);
    expect(variante).not.toEqual(POIDS_MANUELS);
    expect(variante.or).toBe(POIDS_MANUELS.or);
  });

  it('garde une marge finale entière et positive, et des préférences de Privilège positives', () => {
    let poids = POIDS_MANUELS;
    const hasard = des(9);
    for (let i = 0; i < 200; i++) {
      poids = muter(poids, hasard);
      expect(Number.isInteger(poids.margeFinale)).toBe(true);
      expect(poids.margeFinale).toBeGreaterThanOrEqual(0);
      for (const valeur of Object.values(poids.privileges)) expect(valeur).toBeGreaterThanOrEqual(0);
      for (const valeur of Object.values(poids)) {
        if (typeof valeur === 'number') expect(Number.isFinite(valeur)).toBe(true);
      }
    }
  });

  it('ne change rien avec une force nulle, sauf éventuellement la marge finale', () => {
    const variante = muter(POIDS_MANUELS, des(4), 0);
    expect({ ...variante, margeFinale: 0, privileges: {} }).toEqual({
      ...POIDS_MANUELS,
      margeFinale: 0,
      privileges: {},
    });
  });
});

describe('mesurer', () => {
  it('joue 2 parties à 2 joueurs et 1 partie à 4 joueurs par graine', () => {
    const mesure = mesurer(POIDS_MANUELS, POIDS_MANUELS, graines(10));
    expect(mesure.partiesA2).toBe(20);
    expect(mesure.partiesA4).toBe(10);
  });

  it('donne une force proche de 1 à un bot opposé à lui-même', () => {
    const mesure = mesurer(POIDS_MANUELS, POIDS_MANUELS, graines(60));
    expect(mesure.force).toBeGreaterThan(0.7);
    expect(mesure.force).toBeLessThan(1.3);
  });

  it('donne une force très faible à un bot qui ne veut jamais rien trasher ni piocher', () => {
    const mauvais = { ...POIDS_MANUELS, trash: -50, pioche: -50, seuilTrash: -50, margeFinale: 0 };
    expect(mesurer(mauvais, POIDS_MANUELS, graines(20)).force).toBeLessThan(0.5);
  });

  it('redonne le même résultat avec les mêmes graines', () => {
    expect(mesurer(POIDS_MANUELS, POIDS_MANUELS, graines(5))).toEqual(
      mesurer(POIDS_MANUELS, POIDS_MANUELS, graines(5)),
    );
  });
});

describe('entrainer', () => {
  const options = {
    depart: POIDS_MANUELS,
    generations: 2,
    variantes: 2,
    graines: 4,
    grainesDeConfirmation: 6,
    seuil: 1.06,
    graine: 3,
  };

  it('rend une étape par génération et prévient à chaque fois', () => {
    const vues: number[] = [];
    const etapes = entrainer(options, (etape) => vues.push(etape.generation));
    expect(etapes.map((e) => e.generation)).toEqual([1, 2]);
    expect(vues).toEqual([1, 2]);
  });

  it('ne change de champion que si la confirmation atteint le seuil', () => {
    let champion = POIDS_MANUELS;
    for (const etape of entrainer(options)) {
      if (etape.adoptee) {
        expect(etape.confirmation).toBeGreaterThanOrEqual(options.seuil);
        expect(etape.champion).not.toEqual(champion);
      } else {
        expect(etape.champion).toEqual(champion);
      }
      champion = etape.champion;
    }
  });

  it('garde le champion de départ quand le seuil est inatteignable', () => {
    const etapes = entrainer({ ...options, seuil: 99 });
    expect(etapes.every((etape) => !etape.adoptee)).toBe(true);
    expect(etapes.at(-1)?.champion).toEqual(POIDS_MANUELS);
  });

  it('redonne le même entraînement avec la même graine', () => {
    expect(entrainer(options)).toEqual(entrainer(options));
  });
});

describe('borner', () => {
  it('ramène les poids dans les bornes, sans toucher aux autres ni à l\'original', () => {
    const copie = structuredClone(POIDS_MANUELS);
    const borne = borner(POIDS_MANUELS, { achat: { min: 2 }, trash: { max: 5 }, pioche: { min: 1, max: 100 } });
    expect(borne.achat).toBe(2);
    expect(borne.trash).toBe(5);
    expect(borne.pioche).toBe(POIDS_MANUELS.pioche);
    expect(borne.or).toBe(POIDS_MANUELS.or);
    expect(POIDS_MANUELS).toEqual(copie);
  });
});

describe('entrainerContre', () => {
  const options = {
    depart: { ...POIDS_MANUELS, achat: -4 },
    bornes: { achat: { min: 2 } },
    adversaire: POIDS_MANUELS,
    generations: 2,
    variantes: 2,
    graines: 4,
    grainesDeConfirmation: 6,
    progres: 0.03,
    graine: 5,
  };

  it('respecte les bornes de la stratégie à chaque génération, dès le départ', () => {
    const etapes = entrainerContre(options);
    expect(etapes).toHaveLength(2);
    for (const etape of etapes) expect(etape.champion.achat).toBeGreaterThanOrEqual(2);
  });

  it('n\'adopte une variante que si elle progresse contre l\'adversaire', () => {
    const etapes = entrainerContre({ ...options, progres: 99 });
    expect(etapes.every((etape) => !etape.adoptee)).toBe(true);
    // Le champion reste le point de départ, ramené dans les bornes.
    expect(etapes.at(-1)?.champion).toEqual({ ...POIDS_MANUELS, achat: 2 });
  });

  it('redonne le même entraînement avec la même graine', () => {
    expect(entrainerContre(options)).toEqual(entrainerContre(options));
  });
});

describe('IA entraînée', () => {
  it('bat nettement l\'IA réglée à la main', () => {
    let victoires = 0;
    for (const graine of graines(40, 5000)) {
      if (simulerPartie([BOTS.entrainee, BOTS.preferences], graine).vainqueur === 0) victoires++;
      if (simulerPartie([BOTS.preferences, BOTS.entrainee], graine).vainqueur === 1) victoires++;
    }
    expect(victoires).toBeGreaterThanOrEqual(52); // 65 % de 80 parties
  });

  it('termine ses parties contre elle-même, à 2, 3 et 4 joueurs', () => {
    for (const n of [2, 3, 4]) {
      for (const graine of graines(15, 7000)) {
        expect(simulerPartie(Array(n).fill(BOTS.entrainee), graine).vainqueur, `${n} joueurs, graine ${graine}`).not.toBeNull();
      }
    }
  });
});
