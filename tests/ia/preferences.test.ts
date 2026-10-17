import { describe, expect, it } from 'vitest';
import { BOTS, choisirAction } from '../../src/ai/index.ts';
import { POIDS_MANUELS } from '../../src/ai/poids.ts';
import { creerBotPreferences, valeurCarte } from '../../src/ai/preferences.ts';
import { simulerPartie } from '../../src/ai/simulation.ts';
import type { Etat } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { avecReglage, c, faire, installer, scene } from '../moteur/outils.ts';

const bot = BOTS.preferences;

function des(graine = 1): () => number {
  const etat = { rng: graine };
  return () => alea(etat);
}

/** L'action que choisit le bot dans cette situation, sans le numéro de joueur. */
function choix(etat: Etat) {
  const { joueur, ...action } = choisirAction(etat, bot, des())!;
  return action;
}

describe('bot à préférences', () => {
  it('bat presque toujours le bot aléatoire', () => {
    let victoires = 0;
    for (let graine = 1; graine <= 40; graine++) {
      if (simulerPartie([bot, BOTS.aleatoire], graine).vainqueur === 0) victoires++;
      if (simulerPartie([BOTS.aleatoire, bot], graine).vainqueur === 1) victoires++;
    }
    expect(victoires).toBeGreaterThanOrEqual(72); // 90 % de 80 parties
  });

  it('termine ses parties contre lui-même, à 2, 3 et 4 joueurs', () => {
    for (const n of [2, 3, 4]) {
      for (let graine = 1; graine <= 15; graine++) {
        expect(simulerPartie(Array(n).fill(bot), graine).vainqueur, `${n} joueurs, graine ${graine}`).not.toBeNull();
      }
    }
  });

  it('rejoue la même partie avec la même graine', () => {
    expect(simulerPartie([bot, bot], 3)).toEqual(simulerPartie([bot, bot], 3));
  });

  it('prend la même décision quand seules les informations cachées changent', () => {
    const a = scene({ main: [c('Épicerie'), c('Tour de guet'), c('Cachot')], or: 4 });
    const b = structuredClone(a);
    b.joueurs[0]!.pioche.reverse();
    b.joueurs[1]!.main.reverse();
    [b.joueurs[1]!.main[0], b.joueurs[1]!.pioche[0]] = [b.joueurs[1]!.pioche[0]!, b.joueurs[1]!.main[0]!];
    b.piocheCommune.reverse();
    expect(choix(b)).toEqual(choix(a));
  });

  describe('saisit une victoire immédiate', () => {
    it('met fin à sa lignée quand la pioche de la suivante vide son deck', () => {
      const etat = scene({ main: [c('Épicerie')], pioche: [c('Cachot'), c('Marché')] });
      expect(choix(etat)).toEqual({ type: 'finLignee' });
    });

    it('compte la montée en Population qu\'il obtiendra en finissant sa lignée', () => {
      // 4 cartes au total, 3 cartes piochées au niveau 1 ; avec 2 Ressources il passe au niveau 2 et en pioche 4.
      const etat = scene({ aire: [c('Cachot'), c('Forgeron')], pioche: [c('Épicerie'), c('Marché')] });
      etat.joueurs[0]!.niveauPopulation = 1;
      expect(choix(etat)).toEqual({ type: 'finLignee' });
    });

    it('joue la carte qui lui fait piocher sa dernière carte', () => {
      const etat = scene({
        main: [c('Épicerie'), c('Cachot')],
        aire: [c('Marché'), c('Forgeron'), c('Imprimeur'), c('Ferrailleur')],
        pioche: [c('Colporteur')],
        or: 3,
      });
      expect(choix(etat)).toEqual({ type: 'jouer', carte: c('Cachot') });
      expect(choix(faire(etat, { type: 'jouer', carte: c('Cachot') }))).toEqual({ type: 'payer', paiement: [] });
    });

    it('utilise un Privilège de pioche pour prendre sa dernière carte', () => {
      const etat = scene({
        main: [c('Épicerie'), c('Marché')],
        aire: [c('Forgeron'), c('Imprimeur'), c('Ferrailleur'), c('Colporteur')],
        pioche: [c('Cachot')],
        or: 7,
      });
      etat.joueurs[0]!.privileges = [15];
      expect(choix(etat)).toEqual({ type: 'utiliserPrivilege', numero: 15, paiement: [] });
    });

    it('trashe sa dernière carte', () => {
      const etat = faire(
        scene({ main: [c('Tour de guet')], pioche: [], or: 4 }),
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'payer', paiement: [] },
      );
      expect(choix(etat)).toEqual({ type: 'trasher', carte: c('Tour de guet') });
    });
  });

  describe('trash', () => {
    const apresPaiement = (zones: Parameters<typeof scene>[0]) =>
      faire(scene(zones), { type: 'jouer', carte: c('Tour de guet') }, { type: 'payer', paiement: [] });

    it('trashe la carte la moins utile', () => {
      // Cachot (payer 3 Or pour piocher) vaut moins que Forgeron ou Épicerie.
      const etat = apresPaiement({ main: [c('Tour de guet'), c('Forgeron'), c('Cachot'), c('Épicerie')], or: 4 });
      expect(choix(etat)).toEqual({ type: 'trasher', carte: c('Cachot') });
    });

    it('garde ses bonnes cartes tant qu\'il est loin du but', () => {
      const etat = apresPaiement({ main: [c('Tour de guet'), c('Forgeron')], defausse: [c('Cour du roi')], or: 4 });
      // Il lui reste 11 cartes pour 3 piochées : il ne sacrifie ni Forgeron ni Cour du roi.
      expect(choix(etat).type).toBe('trasher');
      expect(choix(etat)).toEqual({ type: 'trasher', carte: c('Tour de guet') });
    });

    it('renonce à trasher quand il n\'a que de bonnes cartes et qu\'il est loin du but', () => {
      const etat = faire(
        scene({ main: [c('Prison')], aire: [c('Alchimiste royale')], defausse: [c('Cour du roi'), c('Forgeron')] }),
        { type: 'jouer', carte: c('Prison') },
      );
      // Prison : 1 trash par 2 Métal. Toutes ses cartes accessibles valent plus que le seuil.
      expect(etat.attente).toMatchObject({ type: 'gain', joueur: 0 });
      expect(choix(etat)).toEqual({ type: 'passer' });
    });

    it('trashe même une bonne carte quand il est près du but', () => {
      const etat = faire(
        scene({
          main: [c('Prison')],
          aire: [c('Alchimiste royale')],
          defausse: [c('Cour du roi'), c('Forgeron')],
          pioche: [c('Mine')],
        }),
        { type: 'jouer', carte: c('Prison') },
      );
      // 5 cartes pour 3 piochées : plus que 2 cartes de trop.
      expect(choix(etat).type).toBe('trasher');
    });

    it('trashe même une bonne carte quand sa Population est au maximum', () => {
      const depart = scene({ main: [c('Prison')], aire: [c('Alchimiste royale')], defausse: [c('Cour du roi'), c('Forgeron')] });
      depart.joueurs[0]!.niveauPopulation = 4;
      expect(choix(faire(depart, { type: 'jouer', carte: c('Prison') })).type).toBe('trasher');
    });
  });

  describe('pioche payante quand la pioche se vide', () => {
    // Pour ce bot, une carte piochée vaut 3 : moins que les 4 Or de l'Effet Rouge du Cachot.
    const prudent = creerBotPreferences('prudent', { ...POIDS_MANUELS, pioche: 3, piocheCarte: 0, piocheProche: 6 });
    /** Alice joue Cachot ; Bob peut payer 4 Or pour piocher 1 carte, avec la pioche indiquée. */
    const effetRouge = (piocheDeBob: string[]) => {
      const etat = scene({ main: [c('Cachot')] });
      installer(etat, 1, { or: 4, pioche: piocheDeBob });
      return faire(etat, { type: 'jouer', carte: c('Cachot') });
    };
    const jaune = (...noms: string[]) => noms.map((nom) => c(nom, 'jaune'));

    it('refuse de payer quand sa pioche est encore épaisse', () => {
      const etat = effetRouge(jaune('Épicerie', 'Marché', 'Forgeron', 'Imprimeur', 'Ferrailleur', 'Colporteur', 'Cachot', 'Tour de guet'));
      expect(etat.attente).toMatchObject({ type: 'payer', joueur: 1, rouge: true });
      expect(choisirAction(etat, prudent, des())).toMatchObject({ type: 'passer' });
    });

    it('paye quand il ne lui reste que 2 cartes à piocher : chaque pioche le rapproche de la victoire', () => {
      const etat = effetRouge(jaune('Épicerie', 'Marché'));
      expect(choisirAction(etat, prudent, des())).toMatchObject({ type: 'payer' });
    });

    it('ne change rien quand le supplément est nul', () => {
      const sansSupplement = creerBotPreferences('sans', { ...POIDS_MANUELS, pioche: 3, piocheCarte: 0, piocheProche: 0 });
      expect(choisirAction(effetRouge(jaune('Épicerie', 'Marché')), sansSupplement, des())).toMatchObject({
        type: 'passer',
      });
    });
  });

  describe('pioche payante selon ce que contient la pioche', () => {
    // Pour ce bot, une pioche ne vaut que par les cartes qu'elle apporte.
    const curieux = creerBotPreferences('curieux', {
      ...POIDS_MANUELS,
      pioche: 0,
      piocheProche: 0,
      piocheCarte: 1,
    });
    const effetRouge = (piocheDeBob: string[]) => {
      const etat = scene({ main: [c('Cachot')] });
      installer(etat, 1, { or: 4, pioche: piocheDeBob.map((nom) => c(nom, 'jaune')) });
      return faire(etat, { type: 'jouer', carte: c('Cachot') });
    };

    it('paye 4 Or pour piocher quand sa pioche contient de bonnes cartes', () => {
      const etat = effetRouge(['Forgeron', 'Imprimeur', 'Épicerie', 'Salle du trésor']);
      expect(choisirAction(etat, curieux, des())).toMatchObject({ type: 'payer' });
    });

    it('refuse quand sa pioche ne contient que des cartes faibles', () => {
      const etat = effetRouge(['Cachot', 'Colporteur', 'Marché']);
      expect(choisirAction(etat, curieux, des())).toMatchObject({ type: 'passer' });
    });

    it('ne connaît que le contenu de sa pioche, pas son ordre', () => {
      const etat = effetRouge(['Forgeron', 'Cachot', 'Colporteur', 'Marché', 'Imprimeur']);
      const inverse = structuredClone(etat);
      inverse.joueurs[1]!.pioche.reverse();
      expect(choisirAction(inverse, curieux, des())).toEqual(choisirAction(etat, curieux, des()));
    });
  });

  describe('achat par remplacement (décision AA)', () => {
    it('remplace sa carte la moins utile par la carte achetée', () => {
      // Seules options : 2 cartes de sa défausse (pas de main, pioche vide).
      const etat = scene({ defausse: [c('Forgeron'), c('Colporteur')], pioche: [], or: 2 });
      etat.riviere = [c('Remouleur ambulant')];
      const apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] });
      expect(apres.attente?.type).toBe('remplacementAchat');
      const moins = [c('Forgeron'), c('Colporteur')].sort(
        (a, b) => valeurCarte({ privileges: [] }, a, POIDS_MANUELS) - valeurCarte({ privileges: [] }, b, POIDS_MANUELS),
      )[0]!;
      expect(choix(apres)).toEqual({ type: 'remplacer', carte: moins });
    });
  });

  // Règle de la carte achetée en main (réglage carteAcheteeVa : 'main'), avec le trash à 1 Or.
  describe('achat avec trash à 1 Or (carte achetée en main)', () => {
    avecReglage('carteAcheteeVa', 'main');

    /** Alice n'a plus de carte en main : elle peut acheter le Remouleur ambulant (2 Or) ou finir sa lignée. */
    const marche = (or: number, defausse: string[]) => {
      const etat = scene({ defausse, or });
      etat.riviere = [c('Remouleur ambulant')];
      etat.joueurs[0]!.niveauEconomie = 4; // rien à gagner en Économie en finissant sa lignée
      return etat;
    };
    const achat = { type: 'acheter' as const, carte: c('Remouleur ambulant'), paiement: [] as string[] };

    it('achète quand il lui reste 1 Or pour trasher une carte faible : son deck ne grossit pas', () => {
      const etat = marche(3, [c('Cachot')]);
      expect(choix(etat)).toEqual(achat);
      expect(choix(faire(etat, achat))).toEqual({ type: 'trasher', carte: c('Cachot') });
    });

    it('n\'achète pas la même carte s\'il n\'a pas l\'Or du trash', () => {
      expect(choix(marche(2, [c('Cachot')]))).toEqual({ type: 'finLignee' });
    });

    it('n\'achète pas s\'il n\'a aucune carte dont il veut se séparer', () => {
      expect(choix(marche(3, [c('Forgeron')]))).toEqual({ type: 'finLignee' });
    });

    it('ne trashe jamais la carte qu\'il vient d\'acheter', () => {
      // Le Remouleur ambulant est sa carte la moins utile, mais il vient de l'acheter.
      const etat = faire(marche(3, [c('Forgeron'), c('Cour du roi')]), achat);
      expect(etat.attente).toEqual({ type: 'trashAchat', joueur: 0 });
      expect(choix(etat)).toEqual({ type: 'passer' });
    });
  });

  describe('choix courants', () => {
    it('joue ses cartes avant de mettre fin à sa lignée', () => {
      const etat = scene({ main: [c('Épicerie')] });
      expect(choix(etat)).toEqual({ type: 'jouer', carte: c('Épicerie') });
    });

    it('ne paye pas un effet qui coûte plus qu\'il ne rapporte', () => {
      const cher = creerBotPreferences('avare', { ...POIDS_MANUELS, or: 10 });
      const etat = faire(scene({ main: [c('Cachot')], or: 3 }), { type: 'jouer', carte: c('Cachot') });
      expect(choisirAction(etat, cher, des())).toMatchObject({ type: 'passer' });
      expect(choix(etat)).toEqual({ type: 'payer', paiement: [] });
    });

    it('monte en Population puis en Économie quand il le peut en fin de lignée', () => {
      const etat = faire(scene({ aire: [c('Cachot')], or: 2 }), { type: 'finLignee' });
      expect(choix(etat)).toEqual({ type: 'monter', piste: 'population' });
      expect(choix(faire(etat, { type: 'monter', piste: 'population' }))).toEqual({ type: 'monter', piste: 'economie' });
    });

    it('prend un Privilège quand il y a droit, en suivant ses préférences', () => {
      const etat = faire(scene({ aire: [c('Épicerie')] }), { type: 'finLignee' });
      etat.privilegesVisibles = [1, 2, 17, 4];
      const gourmand = creerBotPreferences('gourmand', { ...POIDS_MANUELS, privileges: { 17: 5 } });
      expect(choisirAction(etat, gourmand, des())).toMatchObject({ type: 'prendrePrivilege', numero: 17 });
      expect(choix(etat).type).toBe('prendrePrivilege');
    });

    it('répond aux Effets Rouges des adversaires', () => {
      const etat = scene({ main: [c('Tour de guet')] });
      installer(etat, 1, { or: 5, main: [c('Cachot', 'jaune'), c('Forgeron', 'jaune')] });
      const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
      expect(apres.attente).toMatchObject({ type: 'payer', joueur: 1, rouge: true });
      expect(choix(apres)).toEqual({ type: 'payer', paiement: [] });
      expect(choix(faire(apres, { type: 'payer', paiement: [] }))).toEqual({
        type: 'trasher',
        carte: c('Cachot', 'jaune'),
      });
    });
  });
});
