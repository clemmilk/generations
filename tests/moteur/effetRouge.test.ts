import { describe, expect, it } from 'vitest';
import { getPlayerView } from '../../src/game/index.ts';
import { c, faire, installer, permises, scene, verifierAucuneFuite } from './outils.ts';

// Dans ces tests, Alice (joueur 0) joue une carte ; Bob (1), Chloé (2) et David (3) sont ses adversaires.

describe('Effet Rouge', () => {
  it('donne automatiquement son gain d\'Or à chaque adversaire', () => {
    const etat = faire(scene({ main: [c('Épicerie')] }, 3), { type: 'jouer', carte: c('Épicerie') });
    expect(etat.joueurs.map((j) => j.or)).toEqual([4, 2, 2]);
    expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('ne fait rien pour une carte sans Effet Rouge', () => {
    const etat = scene({ main: [c('Forgeron')] });
    installer(etat, 1, { or: 20, aire: [c('Forge')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Forgeron') });
    expect(apres.joueurs[1]!.or).toBe(20);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('propose à l\'adversaire de payer, avec le coût de l\'Effet Rouge et non celui de l\'effet', () => {
    const etat = scene({ main: [c('Tour de guet')] });
    installer(etat, 1, { or: 5, main: [c('Cachot', 'jaune')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
    expect(apres.attente).toEqual({
      type: 'payer',
      joueur: 1,
      carte: c('Tour de guet'),
      index: 0,
      rouge: true,
    });
    const paye = faire(apres, { type: 'payer', paiement: [] });
    expect(paye.joueurs[1]!.or).toBe(0);
    expect(permises(paye)).toEqual([
      { type: 'trasher', carte: c('Cachot', 'jaune') },
      { type: 'passer' },
    ]);
    const fin = faire(paye, { type: 'trasher', carte: c('Cachot', 'jaune') });
    expect(fin.trash).toEqual([c('Cachot', 'jaune')]);
    expect(fin.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('ne propose rien à l\'adversaire qui ne peut pas payer', () => {
    const etat = scene({ main: [c('Tour de guet')] });
    installer(etat, 1, { or: 4, main: [c('Cachot', 'jaune')] }); // l'Effet Rouge coûte 5 Or
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('peut être refusé sans rien payer', () => {
    const etat = scene({ main: [c('Tour de guet')] });
    installer(etat, 1, { or: 5, main: [c('Cachot', 'jaune')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') }, { type: 'passer' });
    expect(apres.joueurs[1]!.or).toBe(5);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('reste disponible quand le joueur actif n\'applique pas l\'effet de sa carte', () => {
    const etat = scene({ main: [c('Tour de guet')], or: 4 });
    installer(etat, 1, { or: 5, main: [c('Cachot', 'jaune')] });
    const apres = faire(
      etat,
      { type: 'jouer', carte: c('Tour de guet') },
      { type: 'passer' }, // Alice ne paye pas
    );
    expect(apres.joueurs[0]!.or).toBe(4);
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 1, rouge: true });
  });

  it('passe après l\'effet du joueur actif', () => {
    const etat = scene({ main: [c('Tour de guet')], or: 4 });
    installer(etat, 1, { or: 5, main: [c('Cachot', 'jaune')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 0, rouge: false });
  });

  it('est résolu dans l\'ordre du tour, en commençant par le joueur qui suit le joueur actif', () => {
    const etat = scene({}, 4);
    etat.joueurActif = 2;
    etat.attente = { type: 'tour', joueur: 2 };
    installer(etat, 2, { main: [c('Tour de guet', 'rouge')] });
    for (const id of [0, 1, 3]) installer(etat, id, { or: 5, main: [c('Imprimeur')] });
    let apres = faire(etat, { type: 'jouer', carte: c('Tour de guet', 'rouge') });
    const ordre: number[] = [];
    while (apres.attente?.type === 'payer') {
      ordre.push(apres.attente.joueur);
      apres = faire(apres, { type: 'passer' });
    }
    expect(ordre).toEqual([3, 0, 1]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 3 });
  });

  it('est résolu avant le tour supplémentaire d\'un Rejouer', () => {
    const etat = faire(
      scene({ main: [c('Salle du trésor'), c('Épicerie')] }),
      { type: 'jouer', carte: c('Salle du trésor') },
      { type: 'rejouer' },
    );
    expect(etat.joueurs[1]!.or).toBe(1);
    expect(etat.attente).toEqual({ type: 'tour', joueur: 0 });
  });

  it('utilise les ressources de l\'adversaire, pas celles du joueur actif (Marché)', () => {
    const etat = scene({ main: [c('Marché')], aire: [c('Cour du roi')] });
    installer(etat, 1, { aire: [c('Ferme')] });
    const apres = faire(
      etat,
      { type: 'jouer', carte: c('Marché') },
      { type: 'passer' }, // Alice ne vend rien
    );
    expect(apres.attente).toMatchObject({ type: 'gain', joueur: 1, rouge: true });
    expect(permises(apres)).toEqual([{ type: 'vendre', carte: c('Ferme') }, { type: 'passer' }]);
    const fin = faire(apres, { type: 'vendre', carte: c('Ferme') });
    expect(fin.joueurs[1]!.or).toBe(5);
    expect(fin.joueurs[1]!.defausse).toEqual([c('Ferme')]);
    expect(fin.joueurs[0]!.aireDeJeu).toEqual([c('Cour du roi'), c('Marché')]);
  });

  it('compte les blasons et les Érudits de l\'adversaire', () => {
    const etat = scene({ main: [c('Justice'), c('Éducation')] }, 3);
    // Privilèges choisis sans effet sur les blasons ni sur les ressources.
    etat.joueurs[0]!.privileges = [1, 13, 14, 15]; // 4 Privilèges : 3 blasons Noblesse pour Alice
    etat.joueurs[1]!.privileges = [8, 12, 17]; // 3 Privilèges : 2 blasons Noblesse pour Bob
    installer(etat, 2, { aire: [c('Hôpital')] }); // 2 Érudits pour Chloé
    let apres = faire(etat, { type: 'jouer', carte: c('Justice') });
    expect(apres.joueurs.map((j) => j.or)).toEqual([6, 2, 0]);
    apres.joueurActif = 0;
    apres.attente = { type: 'tour', joueur: 0 };
    apres = faire(apres, { type: 'jouer', carte: c('Éducation') });
    // Alice : Justice (1 Érudit) + Éducation (1 Érudit) = 2 Érudits, soit 4 Or. Chloé : 2 Érudits, soit 2 Or.
    expect(apres.joueurs.map((j) => j.or)).toEqual([10, 2, 2]);
  });

  it('permet à l\'adversaire de monter d\'un niveau (carte Économie)', () => {
    const etat = scene({ main: [c('Économie')] });
    installer(etat, 1, { or: 4 });
    const apres = faire(etat, { type: 'jouer', carte: c('Économie') }, { type: 'payer', paiement: [] });
    expect(apres.joueurs[1]!.niveauEconomie).toBe(1);
    expect(apres.joueurs[1]!.or).toBe(0);
    expect(apres.joueurs[0]!.niveauEconomie).toBe(0);
  });

  it('donne un Privilège au hasard dans la pioche (Religion)', () => {
    const etat = scene({ main: [c('Religion')] });
    installer(etat, 1, { or: 5 });
    const dessus = etat.piochePrivileges[0]!;
    const apres = faire(etat, { type: 'jouer', carte: c('Religion') }, { type: 'payer', paiement: [] });
    expect(apres.joueurs[1]!.privileges).toEqual([dessus]);
    expect(apres.privilegesVisibles).toEqual(etat.privilegesVisibles);
    expect(apres.piochePrivileges).toHaveLength(15);
  });

  it('ne propose pas de Privilège au hasard quand la pioche de Privilèges est vide', () => {
    const etat = scene({ main: [c('Religion')] });
    installer(etat, 1, { or: 5 });
    etat.piochePrivileges = [];
    const apres = faire(etat, { type: 'jouer', carte: c('Religion') });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('ne montre les cartes piochées par un adversaire qu\'à cet adversaire', () => {
    const etat = scene({ main: [c('Cachot')] }, 3);
    installer(etat, 1, { or: 4 });
    const apres = faire(etat, { type: 'jouer', carte: c('Cachot') }, { type: 'payer', paiement: [] });
    const piochee = apres.joueurs[1]!.main[0]!;
    expect(getPlayerView(apres, 1).joueurs[1]!.main).toEqual([piochee]);
    for (const temoin of [0, 2]) {
      const vue = getPlayerView(apres, temoin);
      expect(vue.joueurs[1]!.main).toBeNull();
      expect(vue.joueurs[1]!.nbCartesMain).toBe(1);
      // Le journal du témoin dit que Bob a pioché, sans dire quelle carte.
      expect(vue.journal.some((ligne) => ligne.texte.includes('Cartes piochées') && ligne.joueur === 1)).toBe(false);
    }
    // Les témoins savent que cette carte est dans le deck de Bob, mais pas qu'elle est dans sa main.
    expect(() => verifierAucuneFuite(apres)).not.toThrow();
  });
});

describe('victoire pendant un Effet Rouge', () => {
  it('fait gagner l\'adversaire qui pioche sa dernière carte', () => {
    const etat = scene({ main: [c('Cachot')] });
    installer(etat, 1, { or: 4, pioche: [c('Épicerie', 'jaune')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Cachot') }, { type: 'payer', paiement: [] });
    expect(apres.vainqueur).toBe(1);
    expect(apres.attente).toBeNull();
  });

  it('donne la victoire au joueur actif quand il vide son deck avant ses adversaires', () => {
    const etat = scene({ main: [c('Cachot')], pioche: [c('Épicerie')], or: 3 });
    installer(etat, 1, { or: 4, pioche: [c('Épicerie', 'jaune')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Cachot') }, { type: 'payer', paiement: [] });
    expect(apres.vainqueur).toBe(0);
    expect(apres.joueurs[1]!.or).toBe(4);
  });

  it('donne la victoire au premier dans l\'ordre du tour quand plusieurs adversaires peuvent gagner', () => {
    const etat = scene({}, 4);
    etat.joueurActif = 2;
    etat.attente = { type: 'tour', joueur: 2 };
    installer(etat, 2, { main: [c('Cachot', 'rouge')] });
    installer(etat, 3, { or: 0 });
    installer(etat, 0, { or: 4, pioche: [c('Épicerie')] });
    installer(etat, 1, { or: 4, pioche: [c('Épicerie', 'jaune')] });
    // David (3) ne peut pas payer ; Alice (0) passe avant Bob (1) dans l'ordre du tour.
    const apres = faire(etat, { type: 'jouer', carte: c('Cachot', 'rouge') });
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 0 });
    const fin = faire(apres, { type: 'payer', paiement: [] });
    expect(fin.vainqueur).toBe(0);
    expect(fin.joueurs[1]!.or).toBe(4);
  });

  it('laisse sa chance au suivant quand le premier renonce', () => {
    const etat = scene({ main: [c('Cachot')] }, 3);
    installer(etat, 1, { or: 4, pioche: [c('Épicerie', 'jaune')] });
    installer(etat, 2, { or: 4, pioche: [c('Épicerie', 'rouge')] });
    const apres = faire(
      etat,
      { type: 'jouer', carte: c('Cachot') },
      { type: 'passer' }, // Bob renonce
      { type: 'payer', paiement: [] }, // Chloé paye et pioche
    );
    expect(apres.vainqueur).toBe(2);
  });
});
