import type { Action } from '../../src/game/actions.ts';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Etat } from '../../src/game/index.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { EFFETS_PRIVILEGES } from '../../src/game/privileges.ts';
import type { EffetPrivilege } from '../../src/game/privileges.ts';
import { blasons, detailDesRessources, ressourcesDe, ressourcesEnJeu } from '../../src/game/ressources.ts';
import { c, faire, installer, permises, scene, typesPermis } from './outils.ts';
import type { Zones } from './outils.ts';

/** Une scène où Alice (joueur 0) possède les Privilèges indiqués. */
function avec(privileges: number[], zones: Zones = {}, nombreDeJoueurs = 2): Etat {
  const etat = scene(zones, nombreDeJoueurs);
  etat.joueurs[0]!.privileges = privileges;
  return etat;
}

/**
 * Prête à la tuile « numero » un autre effet le temps d'un test : par exemple l'ancien effet d'une tuile
 * qui a changé, gardé dans le code (anciens Privilèges 6 et 10, remplacés le 11/11).
 */
function avecEffet<T>(numero: number, effet: EffetPrivilege, test: () => T): T {
  const avant = EFFETS_PRIVILEGES[numero]!;
  EFFETS_PRIVILEGES[numero] = effet;
  try {
    return test();
  } finally {
    EFFETS_PRIVILEGES[numero] = avant;
  }
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

describe('Privilège 1 : les cartes coûtent 3 Or de moins (décision KK)', () => {
  const marche = (privileges: number[], or: number, riviere: string) => {
    const etat = avec(privileges, { or });
    etat.riviere = [c(riviere)];
    return etat;
  };

  it('rend achetable une carte à 4 Or avec 1 Or, et ne fait payer que 1 Or', () => {
    expect(permises(marche([], 3, 'Assassin')).filter((a) => a.type === 'acheter')).toEqual([]);
    const etat = marche([1], 3, 'Assassin');
    const apres = faire(etat, { type: 'acheter', carte: c('Assassin'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.joueurs[0]!.or).toBe(2);
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

describe('Privilège 7 : monter en Population coûte 5 Or de moins (décision WW)', () => {
  it('s\'applique aux cartes : Science (5 Or) devient gratuite, son Effet Rouge (6 Or) coûte 1 Or', () => {
    const etat = avec([7], { main: [c('Science')] });
    let apres = faire(etat, { type: 'jouer', carte: c('Science') });
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 0 });
    apres = faire(apres, { type: 'payer', paiement: [] });
    expect(apres.joueurs[0]!.niveauPopulation).toBe(1);
    expect(apres.joueurs[0]!.or).toBe(0);
  });

  it('ne fait jamais descendre le coût sous 0, et ne change rien au coût en Pierre ou en Métal', () => {
    const etat = avec([7], { main: [c('Science')], or: 2 });
    const apres = faire(etat, { type: 'jouer', carte: c('Science') }, { type: 'payer', paiement: [] });
    expect(apres.joueurs[0]!.or).toBe(2);
  });

  it('ne réduit pas le coût de l\'Économie', () => {
    const etat = avec([7], { main: [c('Économie')], aire: [c('Cachot')] });
    expect(permises(faire(etat, { type: 'jouer', carte: c('Économie') }))).toEqual([
      { type: 'payer', paiement: [c('Cachot')] },
      { type: 'passer' },
    ]);
  });

  it('s\'applique en fin de lignée quand le niveau de Population se paye en Or', () => {
    const niveau = MATERIEL.plateau.population[1]!;
    const avant = { ...niveau };
    Object.assign(niveau, { cout: 3, paiement: 'or' });
    try {
      expect(typesPermis(faire(avec([], { or: 0 }), { type: 'finLignee' }))).not.toContain('monter');
      const etat = faire(avec([7], { or: 0 }), { type: 'finLignee' });
      expect(permises(etat)).toContainEqual({ type: 'monter', piste: 'population' });
      expect(faire(etat, { type: 'monter', piste: 'population' }).joueurs[0]!.niveauPopulation).toBe(1);
    } finally {
      Object.assign(niveau, avant);
    }
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

describe('Privilèges 5, 6 et 19 : Or en début de lignée', () => {
  const orApresNouvelleLignee = (privileges: number[], prepare?: (etat: Etat) => void) => {
    const etat = avec(privileges);
    prepare?.(etat);
    return finirLignee(etat).joueurs[0]!.or;
  };

  it('Privilège 19 : 3 Or de plus', () => {
    expect(orApresNouvelleLignee([])).toBe(3);
    expect(orApresNouvelleLignee([19])).toBe(6);
  });

  it('Privilège 5 : 2 Or par tuile Privilège, la tuile 5 comprise (décision VV)', () => {
    expect(orApresNouvelleLignee([5])).toBe(3 + 2);
    expect(orApresNouvelleLignee([5, 19, 16])).toBe(3 + 3 + 2 * 3);
  });

  it('ancien Privilège 6 (gardé dans le code) : 2 Or par stock de 5 Or, une fois tout l\'Or reçu (décision UU)', () => {
    avecEffet(6, { type: 'orParStockDebutLignee', or: 2, tranche: 5 }, () => {
      // 3 Or du niveau : aucun stock complet.
      expect(orApresNouvelleLignee([6])).toBe(3);
      // 3 Or du niveau + 3 Or du Privilège 19 = 6 Or : 1 stock.
      expect(orApresNouvelleLignee([6, 19])).toBe(6 + 2);
      // Avec le Privilège 18, l'Or gardé compte aussi : 7 + 3 = 10 Or, 2 stocks.
      expect(orApresNouvelleLignee([6, 18], (e) => (e.joueurs[0]!.or = 7))).toBe(10 + 4);
    });
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

describe('Privilège 12 : révéler 1 carte en début de lignée', () => {
  const pioche = [c('Épicerie'), c('Cachot'), c('Marché'), c('Forgeron'), c('Imprimeur')];

  it('révèle 1 carte après la pioche : elle va dans l\'aire de jeu', () => {
    const apres = finirLignee(avec([12], { pioche: [...pioche] }));
    const alice = apres.joueurs[0]!;
    expect(alice.main).toHaveLength(3);
    expect(alice.aireDeJeu).toHaveLength(1);
    expect(alice.pioche).toHaveLength(1);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait gagner si la carte révélée est la dernière du deck', () => {
    const apres = finirLignee(avec([12], { pioche: pioche.slice(0, 4) }));
    expect(apres.vainqueur).toBe(0);
  });

  it('s\'applique avant le Privilège 8 quand le joueur possède les deux (décision UU)', () => {
    // 3 cartes - 1 (Privilège 8) = 2 cartes, puis 1 carte révélée, puis 1 carte au choix.
    let apres = finirLignee(avec([12, 8], { pioche: [...pioche, c('Ferrailleur'), c('Colporteur')] }));
    expect(apres.joueurs[0]!.main).toHaveLength(2);
    expect(apres.joueurs[0]!.aireDeJeu).toHaveLength(1);
    expect(apres.attente?.type).toBe('debutRecherche');
    apres = faire(apres, { type: 'rechercher', carte: apres.joueurs[0]!.pioche[0]! });
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('s\'ajoute aux cartes révélées par la jauge de Population', () => {
    const niveau = MATERIEL.plateau.population[0]!;
    niveau.revele = 1;
    try {
      const apres = finirLignee(avec([12], { pioche: [...pioche, c('Ferrailleur')] }));
      expect(apres.joueurs[0]!.main).toHaveLength(3);
      expect(apres.joueurs[0]!.aireDeJeu).toHaveLength(2);
    } finally {
      niveau.revele = 0;
    }
  });
});

describe('Privilège 9 : après chaque achat, jouer 1 carte de sa main (décision XX)', () => {
  const riviere = (etat: Etat) => {
    etat.riviere = [c('Remouleur ambulant'), c('Halle des négociants')];
    return etat;
  };
  /** Prête à l'Épicerie l'effet indiqué le temps du test. */
  const avecEffet = (effet: (typeof MATERIEL.cartes)[number]['effet'], test: (epicerie: string) => void) => {
    const epicerie = c('Épicerie');
    const fiche = MATERIEL.cartes.find((carte) => carte.id === epicerie)!;
    const avant = fiche.effet;
    fiche.effet = effet;
    try {
      test(epicerie);
    } finally {
      fiche.effet = avant;
    }
  };
  const achat = { cout: null, gain: { type: 'achat' as const, nombre: 1 }, par: null, repetable: false };
  const or4 = { cout: null, gain: { type: 'or' as const, montant: 4 }, par: null, repetable: false };

  it('après l\'action Acheter, une fois la carte remplacée, propose de jouer 1 carte de sa main', () => {
    const etat = riviere(avec([9], { main: [c('Épicerie')], or: 10 }));
    const apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
    expect(permises(apres)).toContainEqual({ type: 'jouer', carte: c('Épicerie') });
    expect(permises(apres)).toContainEqual({ type: 'passer' });
    expect(typesPermis(apres)).not.toContain('acheter');
  });

  it('la carte jouée est une carte jouée normale : effet et Effet Rouge', () => {
    const etat = riviere(avec([9], { main: [c('Épicerie')], or: 10 }));
    const orDeBob = etat.joueurs[1]!.or;
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacerPioche' },
      { type: 'jouer', carte: c('Épicerie') },
    );
    expect(apres.joueurs[0]!.or).toBe(8 + 4);
    expect(apres.joueurs[1]!.or).toBe(orDeBob + 2);
    expect(apres.joueurs[0]!.statistiques.cartesJouees).toBe(1);
    expect(apres.joueurs[0]!.main).toEqual([]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('le joueur peut refuser', () => {
    const etat = riviere(avec([9], { main: [c('Épicerie')], or: 10 }));
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacerPioche' },
      { type: 'passer' },
    );
    expect(apres.joueurs[0]!.main).toEqual([c('Épicerie')]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('ne propose rien sans carte en main', () => {
    const etat = riviere(avec([9], { main: [], or: 10 }));
    const apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('sans le Privilège 9, rien n\'est proposé après un achat', () => {
    const etat = riviere(avec([], { main: [c('Épicerie')], or: 10 }));
    const apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('achat fait par une carte : la carte en plus se joue une fois cette carte entièrement résolue', () => {
    avecEffet([achat, or4], (epicerie) => {
      const etat = riviere(avec([9], { main: [epicerie, c('Cachot')], or: 10 }));
      const orDeBob = etat.joueurs[1]!.or;
      let apres = faire(etat, { type: 'jouer', carte: epicerie });
      apres = faire(apres, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
      // La suite de l'effet (4 Or) et l'Effet Rouge de Bob (2 Or) sont résolus avant.
      expect(apres.joueurs[0]!.or).toBe(8 + 4);
      expect(apres.joueurs[1]!.or).toBe(orDeBob + 2);
      expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
      expect(permises(apres)).toContainEqual({ type: 'jouer', carte: c('Cachot') });
    });
  });

  it('s\'enchaîne : si la carte jouée fait acheter, le Privilège 9 se déclenche de nouveau', () => {
    avecEffet([achat], (epicerie) => {
      const etat = riviere(avec([9], { main: [epicerie, c('Cachot')], or: 10 }));
      etat.piocheCommune = [c('Banque'), ...etat.piocheCommune];
      let apres = faire(
        etat,
        { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
        { type: 'remplacerPioche' },
        { type: 'jouer', carte: epicerie },
        { type: 'acheter', carte: c('Halle des négociants'), paiement: [] },
        { type: 'remplacerPioche' },
      );
      expect(apres.joueurs[0]!.statistiques.cartesAchetees).toBe(2);
      expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
      expect(permises(apres)).toContainEqual({ type: 'jouer', carte: c('Cachot') });
      apres = faire(apres, { type: 'passer' });
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });
  });
});

describe('ancien Privilège 10 (gardé dans le code) : acheter 1 carte une fois la nouvelle lignée en place (décision YY)', () => {
  const nouveau = EFFETS_PRIVILEGES[10]!;
  beforeEach(() => {
    EFFETS_PRIVILEGES[10] = { type: 'achatDebutLignee' };
  });
  afterEach(() => {
    EFFETS_PRIVILEGES[10] = nouveau;
  });
  const pioche = [c('Épicerie'), c('Cachot'), c('Marché'), c('Forgeron'), c('Imprimeur')];
  const prete = (privileges: number[], or = 0) => {
    const etat = avec(privileges, { pioche: [...pioche], or });
    etat.riviere = [c('Remouleur ambulant'), c('Halle des négociants')];
    return etat;
  };

  it('propose un achat après la pioche, avec l\'Or de la nouvelle lignée', () => {
    const apres = faire(prete([10]), { type: 'finLignee' });
    expect(apres.attente).toEqual({ type: 'achatEnPlus', joueur: 0 });
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.joueurs[0]!.or).toBe(3);
  });

  it('la carte achetée peut remplacer une carte qu\'on vient de piocher', () => {
    let apres = faire(prete([10]), { type: 'finLignee' });
    const remplacee = apres.joueurs[0]!.main[0]!;
    apres = faire(apres, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] });
    expect(permises(apres)).toContainEqual({ type: 'remplacer', carte: remplacee });
    apres = faire(apres, { type: 'remplacer', carte: remplacee });
    expect(apres.joueurs[0]!.main).toContain(c('Remouleur ambulant'));
    expect(apres.joueurs[0]!.or).toBe(1);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('vient après le Privilège 8', () => {
    let apres = faire(prete([10, 8]), { type: 'finLignee' });
    expect(apres.attente?.type).toBe('debutRecherche');
    apres = faire(apres, { type: 'rechercher', carte: apres.joueurs[0]!.pioche[0]! });
    expect(apres.attente?.type).toBe('achatEnPlus');
  });

  it('le Privilège 9 s\'y applique : jouer 1 carte de sa main, tout de suite après l\'achat', () => {
    let apres = faire(prete([10, 9]), { type: 'finLignee' });
    apres = faire(apres, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
  });

  it('le joueur peut refuser', () => {
    const apres = faire(prete([10]), { type: 'finLignee' }, { type: 'passer' });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });
});

describe('Privilège 6 : 1 Or chaque fois que le joueur joue une carte avec un Effet Rouge (décision AAA)', () => {
  it('rapporte 1 Or en jouant une carte qui a un Effet Rouge, en plus de son effet', () => {
    // Épicerie : Gagne 4 Or ; Effet Rouge : Gagne 2 Or.
    const apres = faire(avec([6], { main: [c('Épicerie')] }), { type: 'jouer', carte: c('Épicerie') });
    expect(apres.joueurs[0]!.or).toBe(4 + 1);
  });

  it('rapporte 1 Or même si personne n\'applique l\'Effet Rouge', () => {
    // Tour de guet : Effet Rouge « Paye 5 Or pour trasher 1 carte » ; Bob n'a pas d'Or.
    const etat = avec([6], { main: [c('Tour de guet')] });
    installer(etat, 1, { or: 0 });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
    expect(apres.joueurs[0]!.or).toBe(1);
  });

  it('ne rapporte rien pour une carte sans Effet Rouge', () => {
    // Forgeron : pas d'Effet Rouge.
    const apres = faire(avec([6], { main: [c('Forgeron')] }), { type: 'jouer', carte: c('Forgeron') });
    expect(apres.joueurs[0]!.or).toBe(0);
  });

  it('ne rapporte rien quand c\'est un adversaire qui joue la carte', () => {
    const etat = scene({ main: [c('Épicerie')] });
    etat.joueurs[1]!.privileges = [6];
    const orDeBob = etat.joueurs[1]!.or;
    const apres = faire(etat, { type: 'jouer', carte: c('Épicerie') });
    // Bob ne gagne que l'Effet Rouge de l'Épicerie.
    expect(apres.joueurs[1]!.or).toBe(orDeBob + 2);
  });

  it('compte aussi une carte jouée en plus (Privilège 9)', () => {
    const etat = avec([6, 9], { main: [c('Épicerie')], or: 10 });
    etat.riviere = [c('Remouleur ambulant')];
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacerPioche' },
      { type: 'jouer', carte: c('Épicerie') },
    );
    expect(apres.joueurs[0]!.or).toBe(8 + 4 + 1);
  });
});

describe('Privilège 10 : après chaque achat, révéler 1 carte (décision BBB)', () => {
  const riviere = (etat: Etat) => {
    etat.riviere = [c('Remouleur ambulant'), c('Halle des négociants')];
    return etat;
  };
  const acheter = { type: 'acheter' as const, carte: c('Remouleur ambulant'), paiement: [] as string[] };

  it('révèle la carte du dessus de la pioche après l\'achat, sans rien demander', () => {
    const etat = riviere(avec([10], { or: 10, pioche: [c('Cachot'), c('Forgeron'), c('Marché')] }));
    const apres = faire(etat, acheter, { type: 'remplacerPioche' });
    // Le Remouleur ambulant a pris la place de Cachot sur le dessus : c'est lui qui est révélé.
    expect(apres.joueurs[0]!.aireDeJeu).toEqual([c('Remouleur ambulant')]);
    expect(apres.joueurs[0]!.pioche).toEqual([c('Forgeron'), c('Marché')]);
    expect(apres.journal.some((e) => e.texte === 'Alice révèle Remouleur ambulant.')).toBe(true);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait gagner si la carte révélée était la dernière du deck', () => {
    const etat = riviere(avec([10], { or: 10, main: [c('Épicerie')], pioche: [c('Cachot')] }));
    const apres = faire(etat, acheter, { type: 'remplacer', carte: c('Épicerie') });
    expect(apres.vainqueur).toBe(0);
  });

  it('ne fait rien si la pioche est vide', () => {
    const etat = riviere(avec([10], { or: 10, main: [c('Épicerie')], pioche: [] }));
    const apres = faire(etat, acheter, { type: 'remplacer', carte: c('Épicerie') });
    expect(apres.vainqueur).toBeNull();
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('avec le Privilège 9 : on révèle d\'abord, puis on peut jouer 1 carte', () => {
    const etat = riviere(avec([9, 10], { or: 10, main: [c('Épicerie')], pioche: [c('Cachot'), c('Forgeron')] }));
    const apres = faire(etat, acheter, { type: 'remplacer', carte: c('Épicerie') });
    expect(apres.joueurs[0]!.aireDeJeu).toEqual([c('Cachot')]);
    expect(apres.attente).toEqual({ type: 'jouerEnPlus', joueur: 0, restant: 1 });
  });

  it('achat fait par une carte : on révèle une fois cette carte entièrement résolue', () => {
    const epicerie = c('Épicerie');
    const fiche = MATERIEL.cartes.find((carte) => carte.id === epicerie)!;
    const avant = fiche.effet;
    fiche.effet = [
      { cout: null, gain: { type: 'achat', nombre: 1 }, par: null, repetable: false },
      { cout: null, gain: { type: 'or', montant: 4 }, par: null, repetable: false },
    ];
    try {
      const etat = riviere(avec([10], { main: [epicerie, c('Marché')], or: 10, pioche: [c('Cachot'), c('Forgeron')] }));
      const orDeBob = etat.joueurs[1]!.or;
      let apres = faire(etat, { type: 'jouer', carte: epicerie });
      apres = faire(apres, acheter, { type: 'remplacer', carte: c('Marché') });
      const revele = apres.journal.findIndex((e) => e.texte === 'Alice révèle Cachot.');
      const or = apres.journal.findIndex((e) => e.texte === 'Alice gagne 4 Or.');
      const rouge = apres.journal.findIndex((e) => e.texte.startsWith('Bob gagne 2 Or'));
      expect(revele).toBeGreaterThan(or);
      expect(revele).toBeGreaterThan(rouge);
      expect(apres.joueurs[1]!.or).toBe(orDeBob + 2);
    } finally {
      fiche.effet = avant;
    }
  });
});

describe('Privilège 11 : 8 Or pour trasher 1 carte, en plus de son action', () => {
  it('suit les mêmes règles que les Privilèges 13 à 15', () => {
    const etat = avec([11], { main: [c('Épicerie'), c('Marché')], or: 8 });
    expect(permises(avec([11], { main: [c('Épicerie')], or: 7 })).filter((a) => a.type === 'utiliserPrivilege')).toEqual([]);
    let apres = faire(etat, { type: 'utiliserPrivilege', numero: 11, paiement: [] });
    expect(apres.joueurs[0]!.or).toBe(0);
    expect(apres.attente).toMatchObject({ type: 'trashPrivilege', avantAction: true });
    apres = faire(apres, { type: 'trasher', carte: c('Marché') });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 0 });
    expect(permises(apres)).not.toContainEqual({ type: 'finLignee' });
  });
});

describe('Privilèges 13, 14 et 15 : payer pour trasher ou piocher en plus de son action', () => {
  const privileges = (etat: Etat) => permises(etat).filter((a) => a.type === 'utiliserPrivilege');
  const quinze: Omit<Extract<Action, { type: 'utiliserPrivilege' }>, 'joueur'> = { type: 'utiliserPrivilege', numero: 15, paiement: [] };

  it('Privilège 15 : 8 Or pour piocher 1 carte (décision CCC), et le joueur doit encore faire son action', () => {
    expect(privileges(avec([15], { or: 7 }))).toEqual([]);
    const etat = avec([15], { or: 8 });
    expect(privileges(etat)).toEqual([quinze]);
    const apres = faire(etat, quinze);
    expect(apres.joueurs[0]!.or).toBe(0);
    expect(apres.joueurs[0]!.main).toHaveLength(1);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 0 });
  });

  it('Privilège 13 : 3 Pierres, payées en défaussant des cartes de l\'aire de jeu, pour trasher 1 carte', () => {
    expect(privileges(avec([13], { main: [c('Épicerie')], aire: [c('Cachot'), c('Ferrailleur')] }))).toEqual([]);
    const etat = avec([13], { main: [c('Épicerie'), c('Marché')], aire: [c('Cachot'), c('Cour du roi')] });
    expect(privileges(etat)).toEqual([
      { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] },
    ]);
    let apres = faire(etat, { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] });
    expect(apres.joueurs[0]!.defausse).toEqual([c('Cour du roi')]);
    expect(apres.attente).toEqual({ type: 'trashPrivilege', joueur: 0, restant: 1, avantAction: true });
    apres = faire(apres, { type: 'trasher', carte: c('Épicerie') });
    expect(apres.trash).toEqual([c('Épicerie')]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 0 });
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
    const etat = avec([15], { or: 8 });
    installer(etat, 1, { or: 20 });
    const apres = faire(etat, quinze);
    expect(apres.joueurs[1]!.or).toBe(20);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 0 });
  });

  it('chaque tuile sert 1 fois par tour, et redevient disponible au tour suivant', () => {
    const etat = avec([15], { or: 30, pioche: [c('Épicerie'), c('Cachot'), c('Marché')] });
    const apres = faire(etat, quinze);
    expect(privileges(apres)).toEqual([]);
    const tourSuivant = faire(apres, { type: 'jouer', carte: c('Épicerie') });
    expect(tourSuivant.privilegesUtilises).toEqual([]);
  });

  it('deux tuiles différentes s\'utilisent chacune 1 fois dans le même tour', () => {
    const etat = avec([14, 15], { or: 8, aire: [c('Contremaître')], pioche: [c('Épicerie'), c('Cachot'), c('Marché')] });
    const apres = faire(etat, quinze);
    expect(privileges(apres).map((a) => (a as { numero: number }).numero)).toEqual([14]);
  });

  it('s\'utilise aussi après l\'action, avant de finir le tour', () => {
    const etat = avec([15], { or: 8, main: [c('Forgeron')], pioche: [c('Épicerie'), c('Cachot')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Forgeron') });
    expect(apres.attente).toEqual({ type: 'apresAction', joueur: 0 });
    expect(permises(apres)).toEqual([quinze, { type: 'passer' }]);
    const fini = faire(apres, quinze);
    expect(fini.joueurs[0]!.main).toEqual([c('Épicerie')]);
    expect(fini.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('après l\'action, le joueur peut refuser et finir son tour', () => {
    const etat = avec([15], { or: 8, main: [c('Forgeron')], pioche: [c('Épicerie'), c('Cachot')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Forgeron') }, { type: 'passer' });
    expect(apres.joueurs[0]!.or).toBe(8);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('après l\'action, il n\'y a rien à décider si aucune tuile n\'est utilisable', () => {
    const etat = avec([15], { or: 7, main: [c('Forgeron')], pioche: [c('Épicerie'), c('Cachot')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Forgeron') });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('s\'utilise après la résolution de l\'Effet Rouge de la carte jouée', () => {
    const etat = avec([15], { or: 8, main: [c('Tour de guet')], pioche: [c('Épicerie'), c('Cachot')] });
    installer(etat, etat.joueurs.length - 1, { or: 20, main: [], pioche: [c('Marché'), c('Forgeron')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') }, { type: 'passer' });
    expect(apres.attente?.joueur).toBe(etat.joueurs.length - 1);
    expect(faire(apres, { type: 'passer' }).attente).toEqual({ type: 'apresAction', joueur: 0 });
  });

  it('un tour avec une fin de lignée n\'en comporte aucun : plus de fin de lignée après un usage', () => {
    const etat = avec([15], { or: 8, main: [], pioche: [c('Épicerie'), c('Cachot')] });
    expect(permises(etat)).toContainEqual({ type: 'finLignee' });
    const apres = faire(etat, quinze);
    expect(permises(apres)).not.toContainEqual({ type: 'finLignee' });
  });

  it('un tour avec une fin de lignée n\'en comporte aucun : pas d\'usage après la fin de lignée', () => {
    const etat = avec([15], { or: 0, main: [], defausse: [c('Forgeron')], pioche: [c('Épicerie'), c('Cachot'), c('Marché'), c('Ferrailleur'), c('Imprimeur')] });
    const apres = faire(etat, { type: 'finLignee' });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('est interdit s\'il laisse le joueur sans aucune action possible', () => {
    // Main vide, rien à acheter : payer le Privilège 13 lui interdirait ensuite de finir sa lignée.
    const etat = avec([13], { main: [], aire: [c('Cour du roi')], pioche: [c('Forgeron'), c('Marché')], or: 0 });
    etat.riviere = [];
    expect(privileges(etat)).toEqual([]);
  });

  it('ne permet pas de trasher sa dernière carte en main si plus rien n\'est possible ensuite', () => {
    const etat = avec([13], { main: [c('Épicerie')], aire: [c('Cour du roi')], pioche: [c('Forgeron'), c('Marché')], or: 0 });
    etat.riviere = [];
    const apres = faire(etat, { type: 'utiliserPrivilege', numero: 13, paiement: [c('Cour du roi')] });
    expect(permises(apres)).not.toContainEqual({ type: 'trasher', carte: c('Épicerie') });
    expect(permises(apres)).toContainEqual({ type: 'passer' });
  });

  it('reste permis sans autre action possible s\'il fait gagner la partie', () => {
    const etat = avec([15], { or: 8, main: [], pioche: [c('Épicerie')] });
    etat.riviere = [];
    expect(faire(etat, quinze).vainqueur).toBe(0);
  });
});

describe('Privilège 17 : 1 Or par carte trashée (décision KK)', () => {
  it('s\'applique à un trash par effet de carte', () => {
    const apres = faire(
      avec([17], { main: [c('Tour de guet'), c('Cachot')], or: 4 }),
      { type: 'jouer', carte: c('Tour de guet') },
      { type: 'payer', paiement: [] },
      { type: 'trasher', carte: c('Cachot') },
    );
    expect(apres.joueurs[0]!.or).toBe(1);
  });

  it('s\'applique à la carte remplacée lors d\'un achat (trash gratuit, 1 Or gagné)', () => {
    const etat = avec([17], { main: [c('Cachot')], or: 2 });
    etat.riviere = [c('Remouleur ambulant')];
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacer', carte: c('Cachot') },
    );
    expect(apres.joueurs[0]!.or).toBe(1);
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
    expect(apres.joueurs[0]!.or).toBe(2);
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

describe('Privilège 20 : 2 Or chaque fois que le joueur joue une carte Avancée (décisions EE et GG)', () => {
  it('rapporte 1 Or en plus de l\'effet de la carte Avancée', () => {
    // Carrière : Gagne 3 Or.
    const apres = faire(avec([20], { main: [c('Carrière')] }), { type: 'jouer', carte: c('Carrière') });
    expect(apres.joueurs[0]!.or).toBe(3 + 2);
  });

  it('rapporte 2 Or même si le joueur n\'applique pas l\'effet de la carte', () => {
    // Mine : Paye 9 Or pour trasher 2 cartes ; le joueur renonce à payer.
    const apres = faire(avec([20], { main: [c('Mine')], or: 9 }), { type: 'jouer', carte: c('Mine') }, { type: 'passer' });
    expect(apres.joueurs[0]!.or).toBe(9 + 2);
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
