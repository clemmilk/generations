import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { convertirMateriel } from '../../src/game/materiel/convertir.ts';
import donnees from '../../src/game/materiel/materiel.json' with { type: 'json' };
import type { Carte, Couleur, Materiel } from '../../src/game/materiel/index.ts';
import { PARAMETRES } from '../../src/game/parametres.ts';

const racine = new URL('../../', import.meta.url);
const lire = (chemin: string) => readFileSync(new URL(chemin, racine), 'utf8');
const csvCartes = lire('data/cartes_generations.csv');
const csvPrivileges = lire('data/privileges_generations.csv');
const csvPlateau = lire('data/plateau_generations.csv');

// Ce fichier vérifie les VRAIS fichiers de data/ (les autres tests utilisent le matériel fixe de tests/donnees/).
const MATERIEL = donnees as Materiel;
const { cartes, privileges, plateau } = MATERIEL;
// Le matériel fixe des tests, pour vérifier la lecture des csv sur des cartes qui ne bougent pas.
const materielDeTest = convertirMateriel(
  lire('tests/donnees/cartes_test.csv'),
  lire('tests/donnees/privileges_test.csv'),
  lire('tests/donnees/plateau_test.csv'),
);
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

  it('contient un deck de départ par couleur, assez de cartes Assymétrie pour 4 joueurs, et des cartes Avancée', () => {
    const taille = cartes.filter((c) => c.couleur === 'bleu').length;
    expect(taille).toBeGreaterThan(0);
    for (const couleur of COULEURS) {
      expect(cartes.filter((c) => c.couleur === couleur)).toHaveLength(taille);
    }
    expect(cartes.filter((c) => c.origine === 'depart')).toHaveLength(4 * taille);
    expect(cartes.filter((c) => c.origine === 'asymetrie').length).toBeGreaterThanOrEqual(
      PARAMETRES.cartesAsymetrieParJoueur * PARAMETRES.joueursMax,
    );
    expect(cartes.filter((c) => c.origine === 'avancee').length).toBeGreaterThanOrEqual(PARAMETRES.tailleRiviere);
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

  it('contient des Privilèges numérotés de 1 à N, sans trou', () => {
    expect(privileges.map((p) => p.numero)).toEqual(Array.from({ length: privileges.length }, (_, i) => i + 1));
  });

  it('a une image pour chaque carte et chaque Privilège', () => {
    for (const element of [...cartes, ...privileges]) {
      expect(existsSync(new URL(element.image, racine)), element.image).toBe(true);
    }
  });

  it('a une copie allégée de chaque image pour le site (sinon, relancer « npm run images »)', () => {
    for (const element of [...cartes, ...privileges]) {
      const copie = element.image.replace(/^visuels\//, 'visuels-web/');
      expect(existsSync(new URL(copie, racine)), copie).toBe(true);
    }
    for (const icone of ['or', 'pioche', 'economie', 'population', 'noblesse', 'pierre', 'metal', 'erudit']) {
      const copie = `visuels-web/plateau/icone_${icone}.png`;
      expect(existsSync(new URL(copie, racine)), copie).toBe(true);
    }
  });

  it('version du 17/10 : Population payée en Or, Économie en Ressources, Chambellan dans la pioche commune', () => {
    expect(plateau.population[1]!.paiement).toBe('or');
    expect(plateau.economie[1]!.paiement).toBe('ressources');
    const chambellan = cartes.find((c) => c.nom === 'Chambellan');
    expect(chambellan?.origine).toBe('avancee');
    expect(chambellan?.ressources).toEqual({ pierre: 2, metal: 2, erudit: 0 });
  });

  it('a un plateau cohérent : 4 emplacements de Noblesse, des jauges qui progressent', () => {
    expect(plateau.noblesse.map((n) => n.erudits)).toEqual([1, 2, 3, 4]);
    for (const piste of ['economie', 'population'] as const) {
      const niveaux = plateau[piste];
      expect(niveaux[0]!.cout, piste).toBe(0);
      for (let i = 1; i < niveaux.length; i++) {
        // Un niveau ne coûte jamais moins que le précédent, et ne rapporte jamais moins.
        expect(niveaux[i]!.cout, `${piste} ${i}`).toBeGreaterThanOrEqual(niveaux[i - 1]!.cout);
        expect(niveaux[i]!.blasons, `${piste} ${i}`).toBeGreaterThanOrEqual(niveaux[i - 1]!.blasons);
      }
    }
    for (let i = 1; i < plateau.economie.length; i++) {
      expect(plateau.economie[i]!.or).toBeGreaterThanOrEqual(plateau.economie[i - 1]!.or);
      expect(plateau.population[i]!.cartes).toBeGreaterThanOrEqual(plateau.population[i - 1]!.cartes);
    }
  });
});

describe('convertirMateriel', () => {
  it('lit les coûts en Or et en ressources', () => {
    const cout = (nom: string) => materielDeTest.cartes.find((c) => c.nom === nom)?.cout;
    expect(cout('Remouleur ambulant')).toEqual({ or: 2, pierre: 0, metal: 0, ressource: 0 });
    expect(cout('Banque')).toEqual({ or: 0, pierre: 0, metal: 0, ressource: 1 });
    expect(cout('Cour du roi')).toEqual({ or: 3, pierre: 0, metal: 0, ressource: 2 });
  });

  it('lit les ressources portées par les cartes', () => {
    const ressources = (nom: string) => materielDeTest.cartes.find((c) => c.nom === nom)?.ressources;
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

  it('lit les valeurs et le mode de paiement des jauges', () => {
    expect(materielDeTest.plateau.economie).toEqual([
      { cout: 0, paiement: 'or', or: 3, blasons: 0 },
      { cout: 2, paiement: 'or', or: 4, blasons: 1 },
      { cout: 3, paiement: 'or', or: 7, blasons: 1 },
      { cout: 4, paiement: 'or', or: 8, blasons: 2 },
      { cout: 5, paiement: 'or', or: 10, blasons: 3 },
    ]);
    expect(materielDeTest.plateau.population[1]).toEqual({ cout: 1, paiement: 'ressources', cartes: 3, blasons: 1 });
  });

  it('signale une ligne de plateau illisible', () => {
    const mauvaisPlateau = 'Dossier,Identifiant,Piste,Coût,Statut\nx,y,Économie,2 Or,beaucoup\nx,y,Magie,1,rien\n';
    expect(() => convertirMateriel(csvCartes, csvPrivileges, mauvaisPlateau)).toThrow(
      /Or en début de lignée[\s\S]*piste inconnue « Magie »/,
    );
  });
});
