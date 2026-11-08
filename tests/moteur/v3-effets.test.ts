import { afterEach, describe, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import type { Etat } from '../../src/game/index.ts';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';
import { c, faire, installer, permises, scene, typesPermis } from './outils.ts';

// Les nouveaux effets de la V3 (décisions NN à SS). Le matériel des tests n'a pas encore de carte
// qui les utilise : chaque test prête un code à une carte le temps du test, puis le lui rend.

const empruntes: { id: string; effet: ReturnType<typeof lireCodeEffet>; rouge: ReturnType<typeof lireCodeEffet> }[] = [];

/** Donne à une carte un autre code d'effet (et d'Effet Rouge), le temps du test. */
function preter(id: string, code: string, codeRouge?: string): string {
  const c0 = carte(id);
  empruntes.push({ id, effet: c0.effet, rouge: c0.effetRouge });
  c0.effet = lireCodeEffet(code);
  if (codeRouge !== undefined) c0.effetRouge = lireCodeEffet(codeRouge);
  return id;
}

afterEach(() => {
  for (const { id, effet, rouge } of empruntes.splice(0).reverse()) {
    carte(id).effet = effet;
    carte(id).effetRouge = rouge;
  }
});

const alice = (etat: Etat) => etat.joueurs[0]!;
const bob = (etat: Etat) => etat.joueurs[1]!;

describe('compteurs de la V3', () => {
  it('« or:5 » : 1 fois par stock de 5 Or dans sa réserve', () => {
    const epicerie = preter(c('Épicerie'), 'or+2 / or:5');
    const apres = faire(scene({ main: [epicerie], or: 11 }), { type: 'jouer', carte: epicerie });
    expect(alice(apres).or).toBe(11 + 2 * 2);
  });

  it('« or:5 » compte l\'Or gagné par une étape précédente du même effet (décision NN)', () => {
    const epicerie = preter(c('Épicerie'), 'or+4 ; or+1 / or:5');
    const apres = faire(scene({ main: [epicerie], or: 1 }), { type: 'jouer', carte: epicerie });
    expect(alice(apres).or).toBe(1 + 4 + 1);
  });

  it('« carte » : 1 fois par carte de son aire de jeu, y compris la carte jouée (décision OO)', () => {
    const epicerie = preter(c('Épicerie'), 'or+1 / carte');
    const etat = scene({ main: [epicerie], aire: [c('Cachot'), c('Forgeron')] });
    expect(alice(faire(etat, { type: 'jouer', carte: epicerie })).or).toBe(3);
  });

  it('« carte:2 » : 1 fois par paire de cartes', () => {
    const epicerie = preter(c('Épicerie'), 'or+5 / carte:2');
    const etat = scene({ main: [epicerie], aire: [c('Cachot'), c('Forgeron')] });
    expect(alice(faire(etat, { type: 'jouer', carte: epicerie })).or).toBe(5);
  });

  it('« tuile_privilege » : 1 fois par tuile Privilège possédée', () => {
    const epicerie = preter(c('Épicerie'), 'or+2 / tuile_privilege');
    const etat = scene({ main: [epicerie] });
    alice(etat).privileges = [16, 18];
    expect(alice(faire(etat, { type: 'jouer', carte: epicerie })).or).toBe(4);
  });
});

describe('payer, puis compter (décision SS)', () => {
  // Le Métal défaussé pour payer : voir paiement-avant-comptage.test.ts.

  it('l\'Or dépensé ne compte plus (Meunière) : 10 Or, 5 payés → 1 stock', () => {
    const epicerie = preter(c('Épicerie'), 'payer(or:5) > or+3 / or:5');
    const apres = faire(scene({ main: [epicerie], or: 10 }), { type: 'jouer', carte: epicerie }, { type: 'payer', paiement: [] });
    expect(alice(apres).or).toBe(10 - 5 + 3);
  });

  it('les cartes payées ne comptent plus parmi les cartes en jeu (Négociant, Cardinal)', () => {
    const epicerie = preter(c('Épicerie'), 'payer(metal:1) > or+1 / carte');
    const etat = scene({ main: [epicerie], aire: [c('Forgeron'), c('Cachot'), c('Imprimeur')] });
    const apres = faire(etat, { type: 'jouer', carte: epicerie }, { type: 'payer', paiement: [c('Forgeron')] });
    // 4 cartes en jeu avec l'Épicerie, moins le Forgeron défaussé pour payer.
    expect(alice(apres).or).toBe(3);
  });

  it('ne propose pas de payer si, une fois payé, il ne reste rien à gagner', () => {
    const epicerie = preter(c('Épicerie'), 'payer(metal:1) > or+5 / metal:1');
    const apres = faire(scene({ main: [epicerie], aire: [c('Forgeron')] }), { type: 'jouer', carte: epicerie });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });
});

describe('révéler 1 carte (décision RR)', () => {
  it('pose la première carte de la pioche dans l\'aire de jeu, sans appliquer son effet', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)');
    const etat = scene({ main: [epicerie], pioche: [c('Cachot'), c('Forgeron')], or: 10 });
    const apres = faire(etat, { type: 'jouer', carte: epicerie });
    expect(alice(apres).aireDeJeu).toEqual([epicerie, c('Cachot')]);
    expect(alice(apres).pioche).toEqual([c('Forgeron')]);
    expect(alice(apres).or).toBe(10); // l'effet du Cachot (payer pour piocher) n'est pas proposé
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('est public : tout le monde lit quelle carte est révélée', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)');
    const apres = faire(scene({ main: [epicerie], pioche: [c('Cachot'), c('Forgeron')] }), { type: 'jouer', carte: epicerie });
    expect(apres.journal.some((e) => e.texte === 'Alice révèle Cachot.' && e.detail === null)).toBe(true);
  });

  it('compte comme une carte piochée', () => {
    const epicerie = preter(c('Épicerie'), 'revele(2)');
    const apres = faire(scene({ main: [epicerie], pioche: [c('Cachot'), c('Forgeron'), c('Marché')] }), { type: 'jouer', carte: epicerie });
    expect(alice(apres).statistiques.piochesSupplementaires).toBe(2);
    expect(alice(apres).aireDeJeu).toHaveLength(3);
  });

  it('fait gagner si la carte révélée est la dernière du deck', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)');
    const apres = faire(scene({ main: [epicerie], pioche: [c('Cachot')] }), { type: 'jouer', carte: epicerie });
    expect(apres.vainqueur).toBe(0);
  });

  it('n\'a aucun effet si la pioche est vide', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)');
    const apres = faire(scene({ main: [epicerie], pioche: [] }), { type: 'jouer', carte: epicerie });
    expect(alice(apres).aireDeJeu).toEqual([epicerie]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('envoie dans la défausse une carte sans ressource', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)');
    const cachot = carte(c('Cachot'));
    const ressources = cachot.ressources;
    cachot.ressources = { pierre: 0, metal: 0, erudit: 0 };
    try {
      const apres = faire(scene({ main: [epicerie], pioche: [c('Cachot'), c('Forgeron')] }), { type: 'jouer', carte: epicerie });
      expect(alice(apres).defausse).toEqual([c('Cachot')]);
    } finally {
      cachot.ressources = ressources;
    }
  });

  it('ne déclenche ni Effet Rouge ni Privilège 20', () => {
    const epicerie = preter(c('Épicerie'), 'revele(1)', '');
    const etat = scene({ main: [epicerie], pioche: [c('Remouleur ambulant'), c('Épicerie', 'jaune'), c('Cachot')] });
    alice(etat).privileges = [20];
    const apres = faire(etat, { type: 'jouer', carte: epicerie });
    expect(alice(apres).aireDeJeu).toContain(c('Remouleur ambulant'));
    expect(alice(apres).or).toBe(0);
    expect(bob(apres).or).toBe(0);
  });
});

describe('rejouer 1 carte (décision QQ)', () => {
  it('propose de jouer une carte de sa main une fois l\'Effet Rouge de la première résolu', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)'); // l'Effet Rouge reste « gagne 2 Or »
    const etat = scene({ main: [epicerie, c('Cachot'), c('Marché')] });
    const apres = faire(etat, { type: 'jouer', carte: epicerie });
    expect(bob(apres).or).toBe(2);
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
    expect(permises(apres)).toEqual([
      { type: 'jouer', carte: c('Cachot') },
      { type: 'jouer', carte: c('Marché') },
      { type: 'passer' },
    ]);
  });

  it('attend aussi un Effet Rouge qui demande un choix', () => {
    const tour = preter(c('Tour de guet'), 'joue(1)');
    const etat = scene({ main: [tour, c('Épicerie')] });
    installer(etat, 1, { or: 20, defausse: [c('Cachot', 'jaune')] });
    let apres = faire(etat, { type: 'jouer', carte: tour });
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 1, rouge: true });
    apres = faire(apres, { type: 'passer' });
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
  });

  it('la 2e carte est une carte jouée à part entière : son effet et son Effet Rouge', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)', '');
    let apres = faire(scene({ main: [epicerie, c('Épicerie', 'jaune')] }), { type: 'jouer', carte: epicerie });
    apres = faire(apres, { type: 'jouer', carte: c('Épicerie', 'jaune') });
    expect(alice(apres).or).toBe(4);
    expect(bob(apres).or).toBe(2);
    expect(alice(apres).statistiques.cartesJouees).toBe(2);
    expect(alice(apres).statistiques.tours).toBe(1);
  });

  it('le Privilège 20 s\'applique à la 2e carte', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)', '');
    const remouleur = preter(c('Remouleur ambulant'), 'or+1');
    const etat = scene({ main: [epicerie, remouleur] });
    alice(etat).privileges = [20];
    const apres = faire(etat, { type: 'jouer', carte: epicerie }, { type: 'jouer', carte: remouleur });
    expect(alice(apres).or).toBe(1 + 2);
  });

  it('s\'enchaîne si la 2e carte permet elle aussi de rejouer', () => {
    const premiere = preter(c('Épicerie'), 'joue(1)', '');
    const deuxieme = preter(c('Épicerie', 'jaune'), 'joue(1)', '');
    let apres = faire(scene({ main: [premiere, deuxieme, c('Cachot')] }), { type: 'jouer', carte: premiere });
    apres = faire(apres, { type: 'jouer', carte: deuxieme });
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
    apres = faire(apres, { type: 'jouer', carte: c('Cachot') });
    expect(alice(apres).aireDeJeu).toEqual([premiere, deuxieme, c('Cachot')]);
  });

  it('la 1re carte est entièrement résolue avant la carte en plus', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1) ; or+3', '');
    const apres = faire(scene({ main: [epicerie, c('Cachot')] }), { type: 'jouer', carte: epicerie });
    expect(alice(apres).or).toBe(3);
    expect(apres.attente?.type).toBe('jouerEnPlus');
  });

  it('le joueur peut refuser : son tour se termine', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)', '');
    const apres = faire(scene({ main: [epicerie, c('Cachot')] }), { type: 'jouer', carte: epicerie }, { type: 'passer' });
    expect(alice(apres).main).toEqual([c('Cachot')]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('n\'est pas proposé avec une main vide', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)', '');
    const apres = faire(scene({ main: [epicerie] }), { type: 'jouer', carte: epicerie });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('les Privilèges 13 à 15 restent utilisables après la carte en plus', () => {
    const epicerie = preter(c('Épicerie'), 'joue(1)', '');
    const etat = scene({ main: [epicerie, c('Cachot')], or: 6 });
    alice(etat).privileges = [15];
    let apres = faire(etat, { type: 'jouer', carte: epicerie }, { type: 'jouer', carte: c('Cachot') });
    if (apres.attente?.type === 'payer') apres = faire(apres, { type: 'passer' });
    expect(apres.attente).toEqual({ type: 'apresAction', joueur: 0 });
    expect(typesPermis(apres)).toEqual(['utiliserPrivilege', 'passer']);
  });
});
