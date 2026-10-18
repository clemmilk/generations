import { describe, expect, it } from 'vitest';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { PARAMETRES } from '../../src/game/parametres.ts';
import { ressourcesDe } from '../../src/game/ressources.ts';
import { faire, permises, scene } from './outils.ts';

// Version du 17/10 (décisions BB à FF).
const avancee = MATERIEL.cartes.find((c) => c.origine === 'avancee')!;
const depart = MATERIEL.cartes.find((c) => c.origine === 'depart' && c.ressources.pierre === 1)!;

describe('Privilèges 2, 3 et 4 : chaque carte Avancée rapporte 1 ressource de plus', () => {
  for (const [numero, type] of [[2, 'erudit'], [3, 'pierre'], [4, 'metal']] as const) {
    it(`Privilège ${numero} : +1 ${type} sur une carte Avancée, rien sur une carte de départ`, () => {
      const avec = { privileges: [numero] };
      expect(ressourcesDe(avec, avancee.id)[type]).toBe(avancee.ressources[type] + 1);
      expect(ressourcesDe(avec, depart.id)).toEqual(depart.ressources);
    });
  }
});

describe('Privilège 20 : 2 Or chaque fois que le joueur joue une carte Avancée', () => {
  it('rapporte 2 Or en jouant une carte Avancée, même sans appliquer son effet', () => {
    const etat = scene({ main: [avancee.id], or: 0 });
    etat.joueurs[0]!.privileges = [20];
    const apres = faire(etat, { type: 'jouer', carte: avancee.id });
    // Les effets de la carte peuvent ajouter de l'Or : on regarde le journal.
    expect(apres.journal.some((e) => e.texte.includes('gagne 2 Or grâce à son Privilège'))).toBe(true);
  });

  it('ne rapporte rien pour une carte de départ', () => {
    const etat = scene({ main: [depart.id], or: 0 });
    etat.joueurs[0]!.privileges = [20];
    const apres = faire(etat, { type: 'jouer', carte: depart.id });
    expect(apres.journal.some((e) => e.texte.includes('grâce à son Privilège'))).toBe(false);
  });
});

describe('fin de lignée : Noblesse, puis Population (en Or), puis Économie (Ressources comptées)', () => {
  it('l\'ordre des jauges est fixé', () => {
    expect(PARAMETRES.ordreDesJauges).toEqual(['population', 'economie']);
  });

  it('propose la Population seule, puis l\'Économie seule, même si on refuse la Population', () => {
    // Assez d'Or et de Ressources pour les deux jauges, quel que soit leur mode de paiement.
    const aire = MATERIEL.cartes
      .filter((x) => x.couleur === 'bleu' && x.ressources.pierre + x.ressources.metal > 0)
      .map((x) => x.id);
    const etat = scene({ aire, or: 20 });
    let apres = faire(etat, { type: 'finLignee' });
    expect(permises(apres)).toEqual([{ type: 'monter', piste: 'population' }, { type: 'passer' }]);
    apres = faire(apres, { type: 'passer' });
    expect(permises(apres)).toEqual([{ type: 'monter', piste: 'economie' }, { type: 'passer' }]);
    apres = faire(apres, { type: 'monter', piste: 'economie' });
    expect(apres.joueurs[0]!.niveauEconomie).toBe(1);
    expect(apres.joueurs[0]!.niveauPopulation).toBe(0);
  });
});

