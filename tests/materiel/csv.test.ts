import { describe, expect, it } from 'vitest';
import { lireCsv } from '../../src/game/materiel/csv.ts';

describe('lireCsv', () => {
  it('lit des lignes séparées par des virgules', () => {
    expect(lireCsv('Nom,Coût\r\nForge,R\r\nFerme,3\r\n')).toEqual([
      { Nom: 'Forge', Coût: 'R' },
      { Nom: 'Ferme', Coût: '3' },
    ]);
  });

  it('garde les virgules placées entre guillemets', () => {
    expect(lireCsv('Nom,Effet\n"Colporteur","Gagne 2 Or, puis pioche"\n')).toEqual([
      { Nom: 'Colporteur', Effet: 'Gagne 2 Or, puis pioche' },
    ]);
  });

  it('lit les guillemets doublés comme un guillemet', () => {
    expect(lireCsv('Nom\n"Le ""Roi"""\n')).toEqual([{ Nom: 'Le "Roi"' }]);
  });

  it('accepte le point-virgule d\'Excel et la marque de début de fichier', () => {
    expect(lireCsv('﻿Nom;Coût\r\nForge;R\r\n')).toEqual([{ Nom: 'Forge', Coût: 'R' }]);
  });

  it('ignore les lignes vides et complète les cases manquantes', () => {
    expect(lireCsv('Nom,Coût,Effet\nForge,R\n\n,,\n')).toEqual([
      { Nom: 'Forge', Coût: 'R', Effet: '' },
    ]);
  });

  it('renvoie une liste vide pour un fichier vide', () => {
    expect(lireCsv('')).toEqual([]);
  });
});
