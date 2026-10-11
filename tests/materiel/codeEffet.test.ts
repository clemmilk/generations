import { describe, expect, it } from 'vitest';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';

describe('lireCodeEffet', () => {
  it('renvoie une liste vide pour un code vide', () => {
    expect(lireCodeEffet('')).toEqual([]);
    expect(lireCodeEffet('   ')).toEqual([]);
  });

  it('lit un gain d\'Or simple', () => {
    expect(lireCodeEffet('or+4')).toEqual([
      { cout: null, gain: { type: 'or', montant: 4 }, par: null, repetable: false },
    ]);
  });

  it('lit plusieurs étapes séparées par un point-virgule', () => {
    expect(lireCodeEffet('or+2 ; rejouer').map((e) => e.gain)).toEqual([
      { type: 'or', montant: 2 },
      { type: 'rejouer' },
    ]);
  });

  it('lit un coût à payer', () => {
    expect(lireCodeEffet('payer(or:4) > trash(1)')).toEqual([
      {
        cout: { or: 4, pierre: 0, metal: 0 },
        gain: { type: 'trash', nombre: 1 },
        par: null,
        repetable: false,
      },
    ]);
    expect(lireCodeEffet('payer(pierre:1) > lvlup(economie)')[0]).toMatchObject({
      cout: { or: 0, pierre: 1, metal: 0 },
      gain: { type: 'lvlup', piste: 'economie' },
    });
  });

  it('lit un gain par tranche de ressources', () => {
    expect(lireCodeEffet('pioche(1) / pierre:2')[0]).toMatchObject({
      gain: { type: 'pioche', nombre: 1 },
      par: { compteur: 'pierre', tranche: 2 },
    });
  });

  it('compte par tranche de 1 quand la tranche n\'est pas précisée', () => {
    expect(lireCodeEffet('or+2 / blason_noblesse')[0]?.par).toEqual({
      compteur: 'blason_noblesse',
      tranche: 1,
    });
    expect(lireCodeEffet('or+1 / erudit')[0]?.par).toEqual({ compteur: 'erudit', tranche: 1 });
  });

  it('lit un coût suivi d\'un gain par blason', () => {
    expect(lireCodeEffet('payer(metal:2) > trash(1) / blason_economie')).toEqual([
      {
        cout: { or: 0, pierre: 0, metal: 2 },
        gain: { type: 'trash', nombre: 1 },
        par: { compteur: 'blason_economie', tranche: 1 },
        repetable: false,
      },
    ]);
  });

  it('lit une étape répétable', () => {
    const etapes = lireCodeEffet('or+2 ; repetable: payer(or:8) > pioche(1)');
    expect(etapes.map((e) => e.repetable)).toEqual([false, true]);
    expect(etapes[1]?.cout).toEqual({ or: 8, pierre: 0, metal: 0 });
  });

  it('lit la vente de ressources et les Privilèges', () => {
    expect(lireCodeEffet('vendre(pierre:2 metal:3)')[0]?.gain).toEqual({
      type: 'vendre',
      orParPierre: 2,
      orParMetal: 3,
    });
    expect(lireCodeEffet('privilege(choix)')[0]?.gain).toEqual({
      type: 'privilege',
      mode: 'choix',
    });
    expect(lireCodeEffet('payer(or:5) > privilege(hasard)')[0]?.gain).toEqual({
      type: 'privilege',
      mode: 'hasard',
    });
  });

  it('refuse un code mal écrit, avec un message clair', () => {
    expect(() => lireCodeEffet('or+deux')).toThrow(/Gain inconnu/);
    expect(() => lireCodeEffet('danse(1)')).toThrow(/Gain inconnu/);
    expect(() => lireCodeEffet('pioche(x)')).toThrow(/nombre entier/);
    expect(() => lireCodeEffet('payer(erudit:1) > pioche(1)')).toThrow(/payer en/);
    expect(() => lireCodeEffet('lvlup(noblesse)')).toThrow(/Piste inconnue/);
    expect(() => lireCodeEffet('or+1 / carte')).toThrow(/compter/);
    expect(() => lireCodeEffet('or+1 / pierre:0')).toThrow(/tranche/);
    expect(() => lireCodeEffet('or+1 ;')).toThrow(/illisible/);
  });
});
