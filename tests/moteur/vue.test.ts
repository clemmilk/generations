import { describe, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { createGame, getPlayerView } from '../../src/game/index.ts';
import { c, faire, inscriptions, installer, scene, verifierAucuneFuite } from './outils.ts';

describe('getPlayerView', () => {
  it('montre au joueur sa propre main et le contenu de sa pioche, sans l\'ordre', () => {
    const etat = createGame(inscriptions(3), 42);
    const vue = getPlayerView(etat, 1);
    const moi = vue.joueurs[1]!;
    expect(vue.moi).toBe(1);
    expect(moi.main).toEqual(etat.joueurs[1]!.main);
    expect(moi.contenuPioche).toEqual([...etat.joueurs[1]!.pioche].sort());
    expect(moi.contenuPioche).not.toEqual(etat.joueurs[1]!.pioche);
  });

  it('ne montre des adversaires que le nombre de cartes en main et en pioche', () => {
    const etat = createGame(inscriptions(3), 42);
    const vue = getPlayerView(etat, 1);
    for (const id of [0, 2]) {
      const adversaire = vue.joueurs[id]!;
      expect(adversaire.main).toBeNull();
      expect(adversaire.contenuPioche).toBeNull();
      expect(adversaire.nbCartesMain).toBe(3);
      expect(adversaire.nbCartesPioche).toBe(8);
    }
  });

  it('ne laisse fuiter aucune information cachée, pour aucun joueur et aucune graine', () => {
    for (let graine = 0; graine < 20; graine++) {
      expect(() => verifierAucuneFuite(createGame(inscriptions(4), graine))).not.toThrow();
    }
  });

  it('donne la composition connue du deck des adversaires, sans dire ce qui est en main', () => {
    const etat = createGame(inscriptions(2), 42);
    const bob = getPlayerView(etat, 0).joueurs[1]!;
    // Les 9 cartes de départ de Bob sont connues de tous ; ses 2 cartes Assymétrie ne le sont pas encore.
    expect(bob.cartesCacheesConnues).toHaveLength(9);
    expect(bob.cartesCacheesConnues.every((id) => carte(id).couleur === 'jaune')).toBe(true);
    expect(bob.nbCartesInconnues).toBe(2);
    expect(bob.cartesCacheesConnues).toEqual([...bob.cartesCacheesConnues].sort());
    expect(bob.main).toBeNull();
  });

  it('fait connaître une carte Assymétrie à tous dès qu\'elle a été jouée', () => {
    const etat = scene({
      main: [c('Progrès')],
      pioche: [c('Justice'), c('Cachot'), c('Épicerie'), c('Marché'), c('Forgeron')],
    });
    const avant = getPlayerView(etat, 1).joueurs[0]!;
    expect(avant.cartesCacheesConnues).not.toContain(c('Progrès'));
    expect(avant.nbCartesInconnues).toBe(2);

    // Alice joue Progrès, puis remélange son deck en finissant sa lignée.
    let apres = faire(etat, { type: 'jouer', carte: c('Progrès') });
    apres.joueurActif = 0;
    apres.attente = { type: 'tour', joueur: 0 };
    installer(apres, 0, { aire: [c('Progrès')] });
    apres = faire(apres, { type: 'finLignee' });
    while (apres.attente?.joueur === 0 && apres.attente.type !== 'tour') apres = faire(apres, { type: 'passer' });

    const alice = getPlayerView(apres, 1).joueurs[0]!;
    expect(alice.aireDeJeu).toEqual([]);
    expect(alice.cartesCacheesConnues).toContain(c('Progrès'));
    expect(alice.cartesCacheesConnues).not.toContain(c('Justice'));
    expect(alice.nbCartesInconnues).toBe(1);
  });

  it('ne contient ni le générateur de hasard, ni les pioches', () => {
    const vue = getPlayerView(createGame(inscriptions(2), 42), 0);
    expect(Object.keys(vue)).not.toContain('rng');
    expect(Object.keys(vue)).not.toContain('piocheCommune');
    expect(Object.keys(vue)).not.toContain('piochePrivileges');
    expect(Object.keys(vue)).not.toContain('asymetrieEcartees');
    expect(Object.keys(vue.joueurs[0]!)).not.toContain('pioche');
    expect(vue.nbCartesPiocheCommune).toBe(29);
    expect(vue.nbPrivilegesPioche).toBe(16);
  });

  it('montre tout ce qui est public : Or, jauges, Privilèges, aires de jeu, défausses, trash', () => {
    const etat = createGame(inscriptions(2), 42);
    const adversaire = etat.joueurs[1]!;
    adversaire.aireDeJeu = ['carte_1'];
    adversaire.defausse = ['carte_2'];
    adversaire.privileges = [7];
    adversaire.niveauEconomie = 2;
    adversaire.niveauPopulation = 1;
    etat.trash = ['carte_3'];
    const vue = getPlayerView(etat, 0);
    expect(vue.joueurs[1]).toMatchObject({
      or: adversaire.or,
      aireDeJeu: ['carte_1'],
      defausse: ['carte_2'],
      privileges: [7],
      niveauEconomie: 2,
      niveauPopulation: 1,
    });
    expect(vue.trash).toEqual(['carte_3']);
    expect(vue.riviere).toEqual(etat.riviere);
    expect(vue.privilegesVisibles).toEqual(etat.privilegesVisibles);
  });

  it('ne donne le détail des cartes piochées qu\'au joueur qui les a piochées', () => {
    const etat = createGame(inscriptions(2), 42);
    const textes = (moi: number) =>
      getPlayerView(etat, moi)
        .journal.filter((e) => e.joueur === 0 && e.texte.includes('pioche'))
        .map((e) => e.texte);
    expect(textes(0)[0]).toMatch(/^Alice pioche 3 carte\(s\)\. Cartes piochées : /);
    expect(textes(1)[0]).toBe('Alice pioche 3 carte(s).');
  });

  it('ne modifie pas l\'état quand on modifie la vue', () => {
    const etat = createGame(inscriptions(2), 42);
    const copie = structuredClone(etat);
    const vue = getPlayerView(etat, 0);
    vue.riviere.pop();
    vue.joueurs[0]!.main!.pop();
    vue.joueurs[1]!.aireDeJeu.push('carte_1');
    expect(etat).toEqual(copie);
  });

  it('refuse un joueur inconnu', () => {
    expect(() => getPlayerView(createGame(inscriptions(2), 42), 5)).toThrow(/Joueur inconnu/);
  });
});
