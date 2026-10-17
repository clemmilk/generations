import { describe, expect, it } from 'vitest';
import type { Etat } from '../../src/game/index.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { EFFETS_PRIVILEGES } from '../../src/game/privileges.ts';
import { blasons, detailDesRessources, ressourcesDe, ressourcesEnJeu } from '../../src/game/ressources.ts';
import { c, faire, installer, permises, scene, typesPermis } from './outils.ts';
import type { Zones } from './outils.ts';

/** Une scène où Alice (joueur 0) possède les Privilèges indiqués. */
function avec(privileges: number[], zones: Zones = {}, nombreDeJoueurs = 2): Etat {
  const etat = scene(zones, nombreDeJoueurs);
  etat.joueurs[0]!.privileges = privileges;
  return etat;
}

/** Termine la lignée en refusant tout ce qui est proposé, jusqu'au prochain vrai choix. */
function finirLignee(etat: Etat): Etat {
  let apres = faire(etat, { type: 'finLignee' });
  while (apres.attente && typesPermis(apres).includes('passer')) {
    apres = faire(apres, { type: 'passer' });
  }
  return apres;
}

it('chaque tuile Privilège du csv a un effet défini', () => {
  for (const privilege of MATERIEL.privileges) {
    expect(EFFETS_PRIVILEGES[privilege.numero], `Privilège ${privilege.numero}`).toBeDefined();
  }
  expect(Object.keys(EFFETS_PRIVILEGES)).toHaveLength(MATERIEL.privileges.length);
});

describe('Privilège 1 : les cartes coûtent 2 Or de moins', () => {
  const marche = (privileges: number[], or: number, riviere: string) => {
    const etat = avec(privileges, { or });
    etat.riviere = [c(riviere)];
    return etat;
  };

  it('rend achetable une carte à 4 Or avec 2 Or, et ne fait payer que 2 Or', () => {
    expect(permises(marche([], 2, 'Assassin')).filter((a) => a.type === 'acheter')).toEqual([]);
    const etat = marche([1], 3, 'Assassin');
    const apres = faire(etat, { type: 'acheter', carte: c('Assassin'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.joueurs[0]!.or).toBe(1);
  });

  it('ne fait jamais descendre le coût sous 0', () => {
    const etat = marche([1], 0, 'Remouleur ambulant');
    const apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.joueurs[0]!.or).toBe(0);
    expect(apres.joueurs[0]!.pioche[0]).toBe(c('Remouleur ambulant'));
  });

  it('ne réduit pas le coût en Ressources', () => {
    expect(permises(marche([1], 10, 'Carrière')).filter((a) => a.type === 'acheter')).toEqual([]);
  });
});

describe('Privilèges 2, 3 et 4 : chaque carte Avancée rapporte 1 ressource de plus (décision EE)', () => {
  const de = (privileges: number[], nom: string) => ressourcesDe({ privileges }, c(nom));

  it('Privilège 2 : 1 Érudit de plus sur une carte Avancée', () => {
    expect(de([2], 'Ferme')).toEqual({ pierre: 1, metal: 1, erudit: 1 });
    expect(de([2], 'Hôpital')).toEqual({ pierre: 0, metal: 0, erudit: 3 });
  });

  it('Privilège 3 : 1 Pierre de plus sur une carte Avancée', () => {
    expect(de([3], 'Ferme')).toEqual({ pierre: 2, metal: 1, erudit: 0 });
    expect(de([3], 'Cour du roi')).toEqual({ pierre: 4, metal: 0, erudit: 0 });
  });

  it('Privilège 4 : 1 Métal de plus sur une carte Avancée', () => {
    expect(de([4], 'Ferme')).toEqual({ pierre: 1, metal: 2, erudit: 0 });
    expect(de([4], 'Hôpital')).toEqual({ pierre: 0, metal: 1, erudit: 2 });
  });

  it('ne donnent rien aux cartes de départ ni aux cartes Assymétrie', () => {
    for (const nom of ['Cachot', 'Forgeron', 'Épicerie', 'Justice']) {
      expect(de([2, 3, 4], nom), nom).toEqual(de([], nom));
    }
  });

  it('se cumulent sur une même carte Avancée', () => {
    expect(de([2, 3, 4], 'Ferme')).toEqual({ pierre: 2, metal: 2, erudit: 1 });
  });

  it('comptent pour payer un achat', () => {
    // Hôpital (EE) n'a pas de Ressource imprimée ; avec le Privilège 3, il porte 1 Pierre.
    const etat = avec([3], { aire: [c('Hôpital')] });
    etat.riviere = [c('Carrière')];
    expect(permises(etat).filter((a) => a.type === 'acheter')).toEqual([
      { type: 'acheter', carte: c('Carrière'), paiement: [c('Hôpital')] },
    ]);
  });

  it('comptent pour les effets des cartes (Ferrailleur avec le Privilège 3)', () => {
    // Ferrailleur : 1 Pierre imprimée, + 1 Pierre de l'Hôpital grâce au Privilège 3, donc 1 pioche.
    const apres = faire(avec([3], { main: [c('Ferrailleur')], aire: [c('Hôpital')] }), {
      type: 'jouer',
      carte: c('Ferrailleur'),
    });
    expect(apres.joueurs[0]!.main).toHaveLength(1);
  });

  it('comptent pour la vente au Marché', () => {
    // Cour du roi : 3 Pierres + 1 grâce au Privilège 3, vendues 2 Or chacune.
    const apres = faire(
      avec([3], { main: [c('Marché')], aire: [c('Cour du roi')] }),
      { type: 'jouer', carte: c('Marché') },
      { type: 'vendre', carte: c('Cour du roi') },
    );
    expect(apres.joueurs[0]!.or).toBe(8);
  });

  it('comptent pour les jauges et pour obtenir un Privilège en fin de lignée', () => {
    // Population (1 Ressource) : Hôpital porte 1 Pierre grâce au Privilège 3.
    let apres = faire(avec([3], { aire: [c('Hôpital')] }), { type: 'finLignee' });
    if (apres.attente?.type === 'finNoblesse') apres = faire(apres, { type: 'passer' });
    expect(apres.attente).toMatchObject({ type: 'finJauges', seule: 'population' });

    // 2e Privilège : il faut 2 Érudits. Ferme en donne 1 grâce au Privilège 2, plus Épicerie.
    apres = faire(avec([2], { aire: [c('Ferme'), c('Épicerie')] }), { type: 'finLignee' });
    expect(apres.attente?.type).toBe('finNoblesse');
  });
});

describe('détail des ressources de l\'aire de jeu', () => {
  it('indique la carte d\'origine de chaque ressource imprimée', () => {
    const joueur = avec([], { aire: [c('Ferme'), c('Épicerie')] }).joueurs[0]!;
    expect(detailDesRessources(joueur)).toEqual([
      { type: 'pierre', carte: c('Ferme'), privilege: null },
      { type: 'metal', carte: c('Ferme'), privilege: null },
      { type: 'erudit', carte: c('Épicerie'), privilege: null },
    ]);
  });

  it('indique le Privilège qui ajoute une ressource, et la carte concernée', () => {
    const joueur = avec([3, 16], { aire: [c('Ferme')] }).joueurs[0]!;
    expect(detailDesRessources(joueur)).toEqual([
      { type: 'pierre', carte: c('Ferme'), privilege: null },
      { type: 'metal', carte: c('Ferme'), privilege: null },
      { type: 'pierre', carte: c('Ferme'), privilege: 3 },
      { type: 'erudit', carte: null, privilege: 16 },
    ]);
  });

  it('donne toujours le même total que ressourcesEnJeu', () => {
    const aire = [c('Ferme'), c('Épicerie'), c('Cour du roi'), c('Hôpital'), c('Contremaître'), c('Justice')];
    for (const privileges of [[], [2], [3], [4], [16], [2, 3, 4, 16]]) {
      const joueur = avec(privileges, { aire }).joueurs[0]!;
      const total = { pierre: 0, metal: 0, erudit: 0 };
      for (const ressource of detailDesRessources(joueur)) total[ressource.type]++;
      expect(total, `Privilèges ${privileges.join(', ')}`).toEqual(ressourcesEnJeu(joueur));
    }
  });
});

describe('Privilèges 5, 6 et 7 : 1 blason supplémentaire', () => {
  it('ajoute 1 blason de la bonne piste', () => {
    const joueur = scene().joueurs[0]!;
    joueur.privileges = [5];
    expect(blasons(joueur)).toEqual({ noblesse: 0, economie: 0, population: 1 });
    joueur.privileges = [6];
    expect(blasons(joueur)).toEqual({ noblesse: 0, economie: 1, population: 0 });
    joueur.privileges = [7];
    expect(blasons(joueur)).toEqual({ noblesse: 1, economie: 0, population: 0 });
  });

  it('s\'ajoute aux blasons du niveau actuel', () => {
    const joueur = scene().joueurs[0]!;
    joueur.niveauEconomie = 4;
    joueur.privileges = [6, 7]; // 2 Privilèges : 1 blason Noblesse par l'emplacement, +1 par le Privilège 7
    expect(blasons(joueur)).toEqual({ noblesse: 2, economie: 4, population: 0 });
  });

  it('compte dans les effets des cartes (Justice : 2 Or par blason Noblesse)', () => {
    const apres = faire(avec([7], { main: [c('Justice')] }), { type: 'jouer', carte: c('Justice') });
    expect(apres.joueurs[0]!.or).toBe(2);
  });
});

describe('Privilège 16 : 1 Érudit permanent', () => {
  it('compte comme un Érudit dans l\'aire de jeu', () => {
    const joueur = avec([16], { aire: [c('Épicerie')] }).joueurs[0]!;
    expect(ressourcesEnJeu(joueur).erudit).toBe(2);
  });

  it('compte pour les effets des cartes (Imprimeur : 1 recherche par 3 Érudits)', () => {
    const apres = faire(avec([16], { main: [c('Imprimeur')], aire: [c('Épicerie')] }), {
      type: 'jouer',
      carte: c('Imprimeur'),
    });
    expect(apres.attente).toMatchObject({ type: 'gain', joueur: 0 });
    expect(typesPermis(apres)).toEqual(['rechercher', 'passer']);
  });

  it('compte pour obtenir un Privilège en fin de lignée', () => {
    // 2e Privilège : 2 Érudits nécessaires. Épicerie (1) + Privilège 16 (1).
    const apres = faire(avec([16], { aire: [c('Épicerie')] }), { type: 'finLignee' });
    expect(apres.attente?.type).toBe('finNoblesse');
  });

  it('ne peut pas être dépensé ni vendu', () => {
    const etat = avec([16], { main: [c('Marché')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Marché') });
    expect(permises(apres)).toEqual([{ type: 'vendre', carte: c('Marché') }, { type: 'passer' }]);
  });
});

describe('Privilèges 9, 10, 11 et 19 : Or en début de lignée', () => {
  const orApresNouvelleLignee = (privileges: number[], prepare?: (etat: Etat) => void) => {
    const etat = avec(privileges);
    prepare?.(etat);
    return finirLignee(etat).joueurs[0]!.or;
  };

  it('Privilège 19 : 3 Or de plus', () => {
    expect(orApresNouvelleLignee([])).toBe(3);
    expect(orApresNouvelleLignee([19])).toBe(6);
  });

  it('Privilège 9 : 2 Or par blason Population', () => {
    expect(orApresNouvelleLignee([9])).toBe(3);
    expect(orApresNouvelleLignee([9], (e) => (e.joueurs[0]!.niveauPopulation = 4))).toBe(9);
  });

  it('Privilège 10 : 2 Or par blason Noblesse', () => {
    // 3 Privilèges : 2 blasons Noblesse.
    expect(orApresNouvelleLignee([10, 1, 16])).toBe(7);
  });

  it('Privilège 11 : 2 Or par blason Économie, en plus de l\'Or du niveau', () => {
    // Niveau 3 : 8 Or et 2 blasons Économie.
    expect(orApresNouvelleLignee([11], (e) => (e.joueurs[0]!.niveauEconomie = 3))).toBe(12);
  });

  it('compte les blasons donnés par les Privilèges 5, 6 et 7', () => {
    expect(orApresNouvelleLignee([9, 5])).toBe(5);
  });
});

describe('Privilège 8 : 1 carte de moins, puis 1 carte au choix', () => {
  const pioche = [c('Épicerie'), c('Cachot'), c('Marché'), c('Forgeron'), c('Imprimeur')];

  it('fait piocher 2 cartes au lieu de 3, puis propose toute la pioche restante, triée', () => {
    const apres = finirLignee(avec([8], { pioche: [...pioche] }));
    const alice = apres.joueurs[0]!;
    expect(alice.main).toHaveLength(2);
    expect(apres.attente).toEqual({ type: 'debutRecherche', joueur: 0, restant: 1 });
    expect(permises(apres)).toEqual(
      [...alice.pioche].sort().map((carte) => ({ type: 'rechercher', carte })),
    );
  });

  it('met la carte choisie en main, puis passe au joueur suivant', () => {
    const etat = finirLignee(avec([8], { pioche: [...pioche] }));
    const choisie = etat.joueurs[0]!.pioche[1]!;
    const apres = faire(etat, { type: 'rechercher', carte: choisie });
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.joueurs[0]!.main).toContain(choisie);
    expect(apres.joueurs[0]!.pioche).toHaveLength(2);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait gagner si la carte choisie est la dernière de la pioche', () => {
    const etat = finirLignee(avec([8], { pioche: pioche.slice(0, 3) }));
    expect(etat.joueurs[0]!.main).toHaveLength(2);
    const apres = faire(etat, { type: 'rechercher', carte: etat.joueurs[0]!.pioche[0]! });
    expect(apres.vainqueur).toBe(0);
  });
});

describe('Privilège 12 : 1 carte de plus, puis défausser 1 carte', () => {
  const pioche = [c('Épicerie'), c('Cachot'), c('Marché'), c('Forgeron'), c('Imprimeur')];

  it('fait piocher 4 cartes, puis oblige à en défausser 1 de sa main', () => {
    const apres = finirLignee(avec([12], { pioche: [...pioche] }));
    const alice = apres.joueurs[0]!;
    expect(alice.main).toHaveLength(4);
    expect(apres.attente).toEqual({ type: 'debutDefausse', joueur: 0, restant: 1 });
    expect(permises(apres)).toEqual(alice.main.map((carte) => ({ type: 'defausser', carte })));
  });

  it('place la carte dans la défausse (elle n\'est pas trashée)', () => {
    const etat = finirLignee(avec([12], { pioche: [...pioche] }));
    const jetee = etat.joueurs[0]!.main[0]!;
    const apres = faire(etat, { type: 'defausser', carte: jetee });
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.joueurs[0]!.defausse).toEqual([jetee]);
    expect(apres.trash).toEqual([]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait gagner si la carte supplémentaire est la dernière du deck', () => {
    const apres = finirLignee(avec([12], { pioche: pioche.slice(0, 4) }));
    expect(apres.vainqueur).toBe(0);
  });

  it('s\'applique après le Privilège 8 quand le joueur possède les deux', () => {
    let apres = finirLignee(avec([12, 8], { pioche: [...pioche, c('Ferrailleur'), c('Colporteur')] }));
    expect(apres.joueurs[0]!.main).toHaveLength(2);
    expect(apres.attente?.type).toBe('debutRecherche');
    apres = faire(apres, { type: 'rechercher', carte: apres.joueurs[0]!.pioche[0]! });
    expect(apres.joueurs[0]!.main).toHaveLength(4);
    expect(apres.attente?.type).toBe('debutDefausse');
    apres = faire(apres, { type: 'defausser', carte: apres.joueurs[0]!.main[0]! });
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });
});

describe('Privilèges 13, 14 et 15 : payer pour trasher ou piocher à la place de son action', () => {
  const privileges = (etat: Etat) => permises(etat).filter((a) => a.type === 'utiliserPrivilege');

  it('Privilège 15 : 7 Or pour piocher 1 carte, et le tour est terminé', () => {
    expect(privileges(avec([15], { or: 6 }))).toEqual([]);
    const etat = avec([15], { or: 7 });
    expect(privileges(etat)).toEqual([{ type: 'utiliserPrivilege', numero: 15, paiement: [] }]);
    const apres = faire(etat, { type: 'utiliserPrivilege', numero: 15, paiement: [] });
    expect(apres.joueurs[0]!.or).toBe(0);
    expect(apres.joueurs[0]!.main).toHaveLength(1);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('Privilège 13 : 3 Pierres, payées en défaussant des cartes de l\'aire de jeu, pour trasher 1 carte', () => {
    expect(privileges(avec([13], { main: [c('Épicerie')], aire: [c('Cachot'), c('Ferrailleur')] }))).toEqual([]);
    const etat = avec([13], { main: [c('Épicerie')], aire: [c('Cachot'), c('Cour du roi')] });
    expect(privileges(etat)).toEqual([
      { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] },
    ]);
    let apres = faire(etat, { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] });
    expect(apres.joueurs[0]!.defausse).toEqual([c('Cour du roi')]);
    expect(apres.attente).toEqual({ type: 'trashPrivilege', joueur: 0, restant: 1 });
    apres = faire(apres, { type: 'trasher', carte: c('Épicerie') });
    expect(apres.trash).toEqual([c('Épicerie')]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('Privilège 14 : 2 Métal', () => {
    const etat = avec([14], { aire: [c('Contremaître'), c('Cachot')] });
    expect(privileges(etat)).toEqual([
      { type: 'utiliserPrivilege', numero: 14, paiement: [c('Contremaître')] },
    ]);
  });

  it('n\'est pas proposé au joueur qui ne possède pas la tuile', () => {
    expect(privileges(avec([], { or: 20 }))).toEqual([]);
  });

  it('ne déclenche aucun Effet Rouge', () => {
    const etat = avec([15], { or: 7 });
    installer(etat, 1, { or: 20 });
    const apres = faire(etat, { type: 'utiliserPrivilege', numero: 15, paiement: [] });
    expect(apres.joueurs[1]!.or).toBe(20);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('peut être réutilisé à un tour suivant, et fait gagner sur la dernière carte', () => {
    const etat = avec([15], { or: 14, pioche: [c('Épicerie'), c('Cachot')] });
    etat.toursSupplementaires = 1;
    const apres = faire(
      etat,
      { type: 'utiliserPrivilege', numero: 15, paiement: [] },
      { type: 'utiliserPrivilege', numero: 15, paiement: [] },
    );
    expect(apres.vainqueur).toBe(0);
  });
});

describe('Privilège 17 : 2 Or par carte trashée', () => {
  it('s\'applique à un trash par effet de carte', () => {
    const apres = faire(
      avec([17], { main: [c('Tour de guet'), c('Cachot')], or: 4 }),
      { type: 'jouer', carte: c('Tour de guet') },
      { type: 'payer', paiement: [] },
      { type: 'trasher', carte: c('Cachot') },
    );
    expect(apres.joueurs[0]!.or).toBe(2);
  });

  it('s\'applique à la carte remplacée lors d\'un achat (trash gratuit, 2 Or gagnés)', () => {
    const etat = avec([17], { main: [c('Cachot')], or: 2 });
    etat.riviere = [c('Remouleur ambulant')];
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacer', carte: c('Cachot') },
    );
    expect(apres.joueurs[0]!.or).toBe(2);
  });

  it('rapporte pour chaque carte trashée', () => {
    const etat = avec([17], { main: [c('Mine'), c('Cachot'), c('Marché')], or: 9 });
    const apres = faire(
      etat,
      { type: 'jouer', carte: c('Mine') },
      { type: 'payer', paiement: [] },
      { type: 'trasher', carte: c('Cachot') },
      { type: 'trasher', carte: c('Marché') },
    );
    expect(apres.joueurs[0]!.or).toBe(4);
  });
});

describe('Privilège 18 : conserver son Or en fin de lignée', () => {
  it('garde l\'Or restant, auquel s\'ajoute l\'Or de la nouvelle lignée', () => {
    expect(finirLignee(avec([18], { or: 1 })).joueurs[0]!.or).toBe(4);
    expect(finirLignee(avec([], { or: 1 })).joueurs[0]!.or).toBe(3);
  });

  it('garde ce qui reste après avoir payé la montée en Économie', () => {
    const apres = faire(avec([18], { or: 5 }), { type: 'finLignee' }, { type: 'monter', piste: 'economie' });
    // 5 Or - 2 Or (niveau 1) = 3 Or conservés, + 4 Or de la nouvelle lignée au niveau 1.
    expect(apres.joueurs[0]!.or).toBe(7);
  });
});

describe('Privilège 20 : 1 Or chaque fois que le joueur joue une carte Avancée (décision EE)', () => {
  it('rapporte 1 Or en plus de l\'effet de la carte Avancée', () => {
    // Carrière : Gagne 3 Or.
    const apres = faire(avec([20], { main: [c('Carrière')] }), { type: 'jouer', carte: c('Carrière') });
    expect(apres.joueurs[0]!.or).toBe(3 + 1);
  });

  it('rapporte 1 Or même si le joueur n\'applique pas l\'effet de la carte', () => {
    // Mine : Paye 9 Or pour trasher 2 cartes ; le joueur renonce à payer.
    const apres = faire(avec([20], { main: [c('Mine')], or: 9 }), { type: 'jouer', carte: c('Mine') }, { type: 'passer' });
    expect(apres.joueurs[0]!.or).toBe(9 + 1);
  });

  it('ne rapporte rien pour une carte de départ ou une carte Assymétrie', () => {
    const apres = faire(avec([20], { main: [c('Épicerie')] }), { type: 'jouer', carte: c('Épicerie') });
    expect(apres.joueurs[0]!.or).toBe(4);
  });

  it('ne rapporte rien quand c\'est un adversaire qui joue la carte Avancée', () => {
    const etat = scene({ main: [c('Carrière')] });
    etat.joueurs[1]!.privileges = [20];
    const apres = faire(etat, { type: 'jouer', carte: c('Carrière') });
    // Bob ne reçoit que l'Effet Rouge de la Carrière (1 Or).
    expect(apres.joueurs[1]!.or).toBe(1);
  });
});
