import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { convertirMateriel } from '../../src/game/materiel/convertir.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import type { Carte, Couleur } from '../../src/game/materiel/index.ts';

const racine = new URL('../../', import.meta.url);
const lire = (chemin: string) => readFileSync(new URL(chemin, racine), 'utf8');
const csvCartes = lire('data/cartes_generations.csv');
const csvPrivileges = lire('data/privileges_generations.csv');
const csvPlateau = lire('data/plateau_generations.csv');

const { cartes, privileges, plateau } = MATERIEL;
const COULEURS: Couleur[] = ['bleu', 'jaune', 'rouge', 'vert'];

/** Tout ce qui définit une carte en jeu, sans ce qui la distingue visuellement. */
function regles(carte: Carte) {
  const { id, image, couleur, texteEffet, texteEffetRouge, ...reste } = carte;
  return reste;
}

describe('matériel importé', () => {
  it('est à jour par rapport aux fichiers csv', () => {
    expect(MATERIEL).toEqual(convertirMateriel(csvCartes, csvPrivileges, csvPlateau));
  });

  it('contient 79 cartes : 4 decks de 9, 10 Assymétrie, 33 Avancée', () => {
    expect(cartes).toHaveLength(79);
    for (const couleur of COULEURS) {
      expect(cartes.filter((c) => c.couleur === couleur)).toHaveLength(9);
    }
    expect(cartes.filter((c) => c.origine === 'depart')).toHaveLength(36);
    expect(cartes.filter((c) => c.origine === 'asymetrie')).toHaveLength(10);
    expect(cartes.filter((c) => c.origine === 'avancee')).toHaveLength(33);
  });

  it('donne des decks de départ identiques dans les 4 couleurs', () => {
    const deck = (couleur: Couleur) =>
      cartes
        .filter((c) => c.couleur === couleur)
        .map(regles)
        .sort((a, b) => a.nom.localeCompare(b.nom));
    for (const couleur of COULEURS) {
      expect(deck(couleur)).toEqual(deck('bleu'));
    }
  });

  it('ne fait payer que les cartes Avancée', () => {
    for (const carte of cartes) {
      const { or, pierre, metal, ressource } = carte.cout;
      const total = or + pierre + metal + ressource;
      if (carte.origine === 'avancee') {
        expect(total, carte.id).toBeGreaterThan(0);
      } else {
        expect(total, carte.id).toBe(0);
      }
    }
  });

  it('donne au moins une ressource et un effet à chaque carte', () => {
    for (const carte of cartes) {
      const { pierre, metal, erudit } = carte.ressources;
      expect(pierre + metal + erudit, carte.id).toBeGreaterThan(0);
      expect(carte.effet.length, carte.id).toBeGreaterThan(0);
    }
  });

  it('contient 20 Privilèges numérotés de 1 à 20', () => {
    expect(privileges.map((p) => p.numero)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it('a une image pour chaque carte et chaque Privilège', () => {
    for (const element of [...cartes, ...privileges]) {
      expect(existsSync(new URL(element.image, racine)), element.image).toBe(true);
    }
  });

  it('reprend les valeurs du plateau personnel', () => {
    expect(plateau.noblesse).toEqual([
      { erudits: 1, blasons: 0 },
      { erudits: 2, blasons: 1 },
      { erudits: 3, blasons: 2 },
      { erudits: 4, blasons: 3 },
    ]);
    expect(plateau.economie).toEqual([
      { cout: 0, or: 3, blasons: 0 },
      { cout: 2, or: 4, blasons: 1 },
      { cout: 3, or: 7, blasons: 1 },
      { cout: 4, or: 8, blasons: 2 },
      { cout: 5, or: 10, blasons: 3 },
    ]);
    expect(plateau.population).toEqual([
      { cout: 0, cartes: 3, blasons: 0 },
      { cout: 1, cartes: 3, blasons: 1 },
      { cout: 2, cartes: 4, blasons: 1 },
      { cout: 3, cartes: 4, blasons: 2 },
      { cout: 4, cartes: 5, blasons: 3 },
    ]);
  });
});

describe('convertirMateriel', () => {
  it('lit les coûts en Or et en ressources', () => {
    const cout = (nom: string) => cartes.find((c) => c.nom === nom)?.cout;
    expect(cout('Remouleur ambulant')).toEqual({ or: 2, pierre: 0, metal: 0, ressource: 0 });
    expect(cout('Banque')).toEqual({ or: 0, pierre: 0, metal: 0, ressource: 1 });
    expect(cout('Cour du roi')).toEqual({ or: 3, pierre: 0, metal: 0, ressource: 2 });
  });

  it('lit les ressources portées par les cartes', () => {
    const ressources = (nom: string) => cartes.find((c) => c.nom === nom)?.ressources;
    expect(ressources('Comptoir maritime')).toEqual({ pierre: 0, metal: 2, erudit: 1 });
    expect(ressources('Cour du roi')).toEqual({ pierre: 3, metal: 0, erudit: 0 });
  });

  it('regroupe toutes les erreurs des csv dans un seul message', () => {
    const entete = 'Dossier,Identifiant,Nom,Coût,Ressource,Effet,Effet Rouge,Départ,Code effet,Code effet rouge';
    const mauvaisesCartes = [
      entete,
      'visuels\\cartes,carte_a,A,2X,P,Gagne 1 Or,,Pioche commune,or+1,',
      'visuels\\cartes,carte_b,B,2,Z,Gagne 1 Or,,Pioche commune,or+1,',
      'visuels\\cartes,carte_c,C,2,P,Gagne 1 Or,,Pioche commune,,',
      'visuels\\cartes,carte_d,D,2,P,Gagne 1 Or,,Nulle part,or+1,',
      'visuels\\cartes,carte_e,E,2,P,Gagne 1 Or,,Pioche commune,or+un,',
      'visuels\\cartes,carte_f,F,2,P,Gagne 1 Or,,Pioche commune,or+1,',
      'visuels\\cartes,carte_f,F,2,P,Gagne 1 Or,,Pioche commune,or+1,',
    ].join('\n');
    let message = '';
    try {
      convertirMateriel(mauvaisesCartes, csvPrivileges, csvPlateau);
    } catch (erreur) {
      message = (erreur as Error).message;
    }
    expect(message).toMatch(/Carte carte_a : coût illisible/);
    expect(message).toMatch(/Carte carte_b : ressources illisibles/);
    expect(message).toMatch(/Carte carte_c : .*remplies ensemble/);
    expect(message).toMatch(/Carte carte_d : colonne Départ illisible/);
    expect(message).toMatch(/Carte carte_e : Gain inconnu/);
    expect(message).toMatch(/« carte_f » apparaît plusieurs fois/);
  });

  it('signale une ligne de plateau illisible', () => {
    const mauvaisPlateau = 'Dossier,Identifiant,Piste,Coût,Statut\nx,y,Économie,2 Or,beaucoup\nx,y,Magie,1,rien\n';
    expect(() => convertirMateriel(csvCartes, csvPrivileges, mauvaisPlateau)).toThrow(
      /Or en début de lignée[\s\S]*piste inconnue « Magie »/,
    );
  });
});
