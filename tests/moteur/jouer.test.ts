import { describe, expect, it } from 'vitest';
import { applyAction, getLegalActions } from '../../src/game/index.ts';
import { c, faire, permises, scene, typesPermis } from './outils.ts';

describe('le tour de jeu', () => {
  it('propose de jouer chaque carte de la main', () => {
    const etat = scene({ main: [c('Épicerie'), c('Cachot'), c('Marché')] });
    expect(permises(etat)).toEqual([
      { type: 'jouer', carte: c('Épicerie') },
      { type: 'jouer', carte: c('Cachot') },
      { type: 'jouer', carte: c('Marché') },
    ]);
  });

  it('ne propose rien au joueur dont ce n\'est pas le tour', () => {
    const etat = scene({ main: [c('Épicerie')] });
    expect(getLegalActions(etat, 1)).toEqual([]);
  });

  it('refuse une action illégale ou jouée par un autre joueur', () => {
    const etat = scene({ main: [c('Épicerie')] });
    expect(() => applyAction(etat, { type: 'jouer', joueur: 0, carte: c('Cachot') })).toThrow(/illégale/);
    expect(() => applyAction(etat, { type: 'jouer', joueur: 1, carte: c('Épicerie') })).toThrow(/illégale/);
    expect(() => applyAction(etat, { type: 'rejouer', joueur: 0 })).toThrow(/illégale/);
  });

  it('ne modifie pas l\'état d\'origine', () => {
    const etat = scene({ main: [c('Épicerie')] });
    const copie = structuredClone(etat);
    faire(etat, { type: 'jouer', carte: c('Épicerie') });
    expect(etat).toEqual(copie);
  });

  it('enregistre chaque action dans l\'historique', () => {
    const apres = faire(scene({ main: [c('Épicerie')] }), { type: 'jouer', carte: c('Épicerie') });
    expect(apres.historique).toEqual([{ type: 'jouer', joueur: 0, carte: c('Épicerie') }]);
  });
});

describe('jouer une carte', () => {
  it('place la carte dans l\'aire de jeu, applique un gain d\'Or et passe au joueur suivant', () => {
    const apres = faire(scene({ main: [c('Épicerie'), c('Cachot')], or: 1 }), {
      type: 'jouer',
      carte: c('Épicerie'),
    });
    const alice = apres.joueurs[0]!;
    expect(alice.or).toBe(5);
    expect(alice.aireDeJeu).toEqual([c('Épicerie')]);
    expect(alice.main).toEqual([c('Cachot')]);
    expect(apres.joueurActif).toBe(1);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('revient au premier joueur après le dernier', () => {
    let etat = scene({ main: [c('Épicerie')] }, 3);
    etat = faire(etat, { type: 'jouer', carte: c('Épicerie') });
    expect(etat.joueurActif).toBe(1);
    etat = faire(etat, { type: 'jouer', carte: etat.joueurs[1]!.main[0]! });
    while (etat.attente?.type !== 'tour') etat = faire(etat, { type: 'passer' });
    expect(etat.joueurActif).toBe(2);
    etat = faire(etat, { type: 'jouer', carte: etat.joueurs[2]!.main[0]! });
    while (etat.attente?.type !== 'tour') etat = faire(etat, { type: 'passer' });
    expect(etat.joueurActif).toBe(0);
  });

  describe('Rejouer', () => {
    it('est proposé après le gain d\'Or, et fait rejouer le même joueur', () => {
      let etat = faire(scene({ main: [c('Salle du trésor'), c('Épicerie')] }), {
        type: 'jouer',
        carte: c('Salle du trésor'),
      });
      expect(etat.joueurs[0]!.or).toBe(2);
      expect(etat.attente).toMatchObject({ type: 'gain', joueur: 0 });
      expect(permises(etat)).toEqual([{ type: 'rejouer' }, { type: 'passer' }]);
      etat = faire(etat, { type: 'rejouer' });
      expect(etat.attente).toEqual({ type: 'tour', joueur: 0 });
      expect(etat.toursSupplementaires).toBe(0);
    });

    it('peut être refusé : le tour passe au joueur suivant', () => {
      const etat = faire(
        scene({ main: [c('Salle du trésor')] }),
        { type: 'jouer', carte: c('Salle du trésor') },
        { type: 'passer' },
      );
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('donne un tour complet, après lequel le tour passe normalement', () => {
      const etat = faire(
        scene({ main: [c('Remouleur ambulant'), c('Épicerie')] }),
        { type: 'jouer', carte: c('Remouleur ambulant') },
        { type: 'rejouer' },
        { type: 'jouer', carte: c('Épicerie') },
      );
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('se cumule', () => {
      const etat = scene({ main: [c('Remouleur ambulant'), c('Épicerie'), c('Forgeron')] });
      etat.toursSupplementaires = 1;
      const apres = faire(
        etat,
        { type: 'jouer', carte: c('Remouleur ambulant') },
        { type: 'rejouer' },
      );
      expect(apres.toursSupplementaires).toBe(1);
      const fin = faire(
        apres,
        { type: 'jouer', carte: c('Épicerie') },
        { type: 'jouer', carte: c('Forgeron') },
      );
      expect(fin.attente).toMatchObject({ type: 'tour', joueur: 1 });
    });
  });

  describe('payer de l\'Or pour un effet', () => {
    it('propose de payer ou de renoncer', () => {
      const etat = faire(scene({ main: [c('Tour de guet')], or: 4 }), {
        type: 'jouer',
        carte: c('Tour de guet'),
      });
      expect(etat.attente).toMatchObject({ type: 'payer', joueur: 0, carte: c('Tour de guet') });
      expect(permises(etat)).toEqual([{ type: 'payer', paiement: [] }, { type: 'passer' }]);
    });

    it('ne coûte rien si le joueur renonce', () => {
      const etat = faire(
        scene({ main: [c('Tour de guet')], or: 4 }),
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'passer' },
      );
      expect(etat.joueurs[0]!.or).toBe(4);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('saute l\'effet quand le joueur n\'a pas assez d\'Or', () => {
      const etat = faire(scene({ main: [c('Tour de guet')], or: 3 }), {
        type: 'jouer',
        carte: c('Tour de guet'),
      });
      expect(etat.joueurs[0]!.or).toBe(3);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });
  });

  describe('trasher', () => {
    const depart = () =>
      faire(
        scene({
          main: [c('Tour de guet'), c('Cachot')],
          aire: [c('Épicerie')],
          defausse: [c('Marché')],
          or: 4,
        }),
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'payer', paiement: [] },
      );

    it('propose les cartes de la main, de l\'aire de jeu (carte jouée comprise) et de la défausse', () => {
      const etat = depart();
      expect(etat.joueurs[0]!.or).toBe(0);
      expect(permises(etat)).toEqual([
        { type: 'trasher', carte: c('Cachot') },
        { type: 'trasher', carte: c('Épicerie') },
        { type: 'trasher', carte: c('Tour de guet') },
        { type: 'trasher', carte: c('Marché') },
        { type: 'trasherPioche' },
        { type: 'passer' },
      ]);
    });

    it('retire définitivement la carte du deck', () => {
      const etat = faire(depart(), { type: 'trasher', carte: c('Marché') });
      expect(etat.joueurs[0]!.defausse).toEqual([]);
      expect(etat.trash).toEqual([c('Marché')]);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('permet de trasher la carte qu\'on vient de jouer', () => {
      const etat = faire(depart(), { type: 'trasher', carte: c('Tour de guet') });
      expect(etat.joueurs[0]!.aireDeJeu).toEqual([c('Épicerie')]);
      expect(etat.trash).toEqual([c('Tour de guet')]);
    });

    it('fait gagner le joueur qui trashe la dernière carte de son deck', () => {
      const etat = faire(
        scene({ main: [c('Tour de guet')], pioche: [], or: 4 }),
        { type: 'jouer', carte: c('Tour de guet') },
        { type: 'payer', paiement: [] },
        { type: 'trasher', carte: c('Tour de guet') },
      );
      expect(etat.vainqueur).toBe(0);
      expect(etat.attente).toBeNull();
      expect(getLegalActions(etat, 0)).toEqual([]);
      expect(getLegalActions(etat, 1)).toEqual([]);
    });
  });

  describe('piocher', () => {
    it('pioche 1 carte contre de l\'Or (Cachot)', () => {
      const etat = scene({ main: [c('Cachot')], or: 3 });
      const dessus = etat.joueurs[0]!.pioche[0]!;
      const apres = faire(
        etat,
        { type: 'jouer', carte: c('Cachot') },
        { type: 'payer', paiement: [] },
      );
      expect(apres.joueurs[0]!.or).toBe(0);
      expect(apres.joueurs[0]!.main).toEqual([dessus]);
    });

    it('fait gagner immédiatement si c\'est la dernière carte de la pioche', () => {
      const etat = faire(
        scene({ main: [c('Cachot')], pioche: [c('Épicerie')], or: 3 }),
        { type: 'jouer', carte: c('Cachot') },
        { type: 'payer', paiement: [] },
      );
      expect(etat.vainqueur).toBe(0);
      expect(etat.attente).toBeNull();
      expect(etat.file).toEqual([]);
    });

    it('ne propose pas de payer quand la pioche est vide', () => {
      const etat = faire(scene({ main: [c('Cachot')], pioche: [], aire: [c('Épicerie')], or: 3 }), {
        type: 'jouer',
        carte: c('Cachot'),
      });
      expect(etat.joueurs[0]!.or).toBe(3);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('pioche directement les 2 cartes pour 6 Or, sans rien demander (Moulin)', () => {
      const etat = faire(
        scene({ main: [c('Moulin')], or: 6 }),
        { type: 'jouer', carte: c('Moulin') },
        { type: 'payer', paiement: [] },
      );
      expect(etat.joueurs[0]!.main).toHaveLength(2);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('s\'arrête à la dernière carte et fait gagner si le joueur a droit à plus de cartes qu\'il n\'en reste', () => {
      const etat = faire(
        scene({ main: [c('Moulin')], pioche: [c('Épicerie')], or: 6 }),
        { type: 'jouer', carte: c('Moulin') },
        { type: 'payer', paiement: [] },
      );
      expect(etat.joueurs[0]!.main).toEqual([c('Épicerie')]);
      expect(etat.vainqueur).toBe(0);
    });
  });

  describe('gain par tranche de ressources dans l\'aire de jeu', () => {
    it('Ferrailleur ne donne rien avec 1 seule Pierre (la sienne)', () => {
      const etat = faire(scene({ main: [c('Ferrailleur')] }), { type: 'jouer', carte: c('Ferrailleur') });
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('Ferrailleur compte sa propre Pierre : 1 pioche avec 2 Pierres', () => {
      const etat = faire(scene({ main: [c('Ferrailleur')], aire: [c('Cachot')] }), {
        type: 'jouer',
        carte: c('Ferrailleur'),
      });
      expect(etat.joueurs[0]!.main).toHaveLength(1);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('Ferrailleur donne 2 pioches avec 5 Pierres, sans dépenser les ressources', () => {
      const apres = faire(
        scene({ main: [c('Ferrailleur')], aire: [c('Cachot'), c('Cour du roi')] }),
        { type: 'jouer', carte: c('Ferrailleur') },
      );
      expect(apres.joueurs[0]!.main).toHaveLength(2);
      expect(apres.joueurs[0]!.aireDeJeu).toHaveLength(3);
      expect(apres.joueurs[0]!.defausse).toEqual([]);
    });

    it('Forgeron permet 1 trash par tranche de 2 Métal', () => {
      const etat = faire(scene({ main: [c('Forgeron')], aire: [c('Forge')] }), {
        type: 'jouer',
        carte: c('Forgeron'),
      });
      expect(etat.attente).toMatchObject({ type: 'gain', restant: 1 });
      expect(typesPermis(etat)).toEqual(['trasher', 'trasherPioche', 'passer']);
    });

    it('Éducation rapporte 2 Or par Érudit, le sien compris', () => {
      const etat = faire(scene({ main: [c('Éducation')], aire: [c('Épicerie'), c('Hôpital')] }), {
        type: 'jouer',
        carte: c('Éducation'),
      });
      expect(etat.joueurs[0]!.or).toBe(8);
    });
  });

  describe('rechercher', () => {
    const depart = () =>
      faire(
        scene({
          main: [c('Imprimeur')],
          aire: [c('Épicerie'), c('Salle du trésor')],
          pioche: [c('Marché'), c('Cachot'), c('Forgeron')],
        }),
        { type: 'jouer', carte: c('Imprimeur') },
      );

    it('propose toutes les cartes de la pioche, triées pour ne pas révéler leur ordre', () => {
      expect(permises(depart())).toEqual([
        { type: 'rechercher', carte: c('Cachot') },
        { type: 'rechercher', carte: c('Forgeron') },
        { type: 'rechercher', carte: c('Marché') },
        { type: 'passer' },
      ]);
    });

    it('met la carte choisie en main et garde les autres dans la pioche', () => {
      const etat = faire(depart(), { type: 'rechercher', carte: c('Forgeron') });
      expect(etat.joueurs[0]!.main).toEqual([c('Forgeron')]);
      expect([...etat.joueurs[0]!.pioche].sort()).toEqual([c('Cachot'), c('Marché')].sort());
      expect(etat.vainqueur).toBeNull();
    });

    it('ne montre la carte choisie qu\'au joueur concerné dans le journal', () => {
      const etat = faire(depart(), { type: 'rechercher', carte: c('Forgeron') });
      const entree = etat.journal.find((e) => e.texte.includes('recherche'));
      expect(entree?.texte).not.toContain('Forgeron');
      expect(entree?.detail).toContain('Forgeron');
    });

    it('fait gagner si c\'est la dernière carte de la pioche', () => {
      const etat = faire(
        scene({
          main: [c('Imprimeur')],
          aire: [c('Épicerie'), c('Salle du trésor')],
          pioche: [c('Marché')],
        }),
        { type: 'jouer', carte: c('Imprimeur') },
        { type: 'rechercher', carte: c('Marché') },
      );
      expect(etat.vainqueur).toBe(0);
    });
  });

  describe('vendre des ressources (Marché)', () => {
    it('permet de vendre le Marché lui-même pour 3 Or', () => {
      const etat = faire(scene({ main: [c('Marché')] }), { type: 'jouer', carte: c('Marché') });
      expect(permises(etat)).toEqual([{ type: 'vendre', carte: c('Marché') }, { type: 'passer' }]);
      const apres = faire(etat, { type: 'vendre', carte: c('Marché') });
      expect(apres.joueurs[0]!.or).toBe(3);
      expect(apres.joueurs[0]!.defausse).toEqual([c('Marché')]);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('fait rapporter toutes les ressources de la carte vendue, et permet d\'en vendre plusieurs', () => {
      const etat = faire(
        scene({ main: [c('Marché')], aire: [c('Ferme'), c('Cour du roi'), c('Halle des négociants')] }),
        { type: 'jouer', carte: c('Marché') },
        { type: 'vendre', carte: c('Ferme') }, // Pierre + Métal = 5 Or
        { type: 'vendre', carte: c('Cour du roi') }, // 3 Pierres = 6 Or
        { type: 'vendre', carte: c('Halle des négociants') }, // Pierre + Érudit = 2 Or
        { type: 'passer' },
      );
      const alice = etat.joueurs[0]!;
      expect(alice.or).toBe(13);
      expect(alice.aireDeJeu).toEqual([c('Marché')]);
      expect(alice.defausse).toEqual([c('Ferme'), c('Cour du roi'), c('Halle des négociants')]);
    });

    it('ne propose pas de vendre une carte qui ne porte que des Érudits', () => {
      const etat = faire(scene({ main: [c('Marché')], aire: [c('Épicerie')] }), {
        type: 'jouer',
        carte: c('Marché'),
      });
      expect(permises(etat)).toEqual([{ type: 'vendre', carte: c('Marché') }, { type: 'passer' }]);
    });
  });

  describe('étape répétable (Colporteur)', () => {
    it('gagne 2 Or puis permet de payer 8 Or par pioche, autant de fois que voulu', () => {
      let etat = faire(scene({ main: [c('Colporteur')], or: 15 }), {
        type: 'jouer',
        carte: c('Colporteur'),
      });
      expect(etat.joueurs[0]!.or).toBe(17);
      etat = faire(etat, { type: 'payer', paiement: [] });
      expect(etat.attente).toMatchObject({ type: 'payer', joueur: 0 });
      etat = faire(etat, { type: 'payer', paiement: [] });
      expect(etat.joueurs[0]!.or).toBe(1);
      expect(etat.joueurs[0]!.main).toHaveLength(2);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('s\'arrête dès que le joueur renonce à payer', () => {
      const etat = faire(
        scene({ main: [c('Colporteur')], or: 20 }),
        { type: 'jouer', carte: c('Colporteur') },
        { type: 'passer' },
      );
      expect(etat.joueurs[0]!.or).toBe(22);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });
  });

  describe('payer des ressources pour un effet', () => {
    it('défausse la carte qui paye, et monte le niveau d\'Économie (carte Économie)', () => {
      const etat = faire(scene({ main: [c('Économie')], aire: [c('Cachot')] }), {
        type: 'jouer',
        carte: c('Économie'),
      });
      expect(permises(etat)).toEqual([{ type: 'payer', paiement: [c('Cachot')] }, { type: 'passer' }]);
      const apres = faire(etat, { type: 'payer', paiement: [c('Cachot')] });
      expect(apres.joueurs[0]!.niveauEconomie).toBe(1);
      expect(apres.joueurs[0]!.defausse).toEqual([c('Cachot')]);
      expect(apres.joueurs[0]!.aireDeJeu).toEqual([c('Économie')]);
    });

    it('perd les ressources excédentaires et les Érudits de la carte défaussée', () => {
      const etat = faire(
        scene({ main: [c('Économie')], aire: [c('Hôtel des impôts')] }),
        { type: 'jouer', carte: c('Économie') },
        { type: 'payer', paiement: [c('Hôtel des impôts')] },
      );
      expect(etat.joueurs[0]!.niveauEconomie).toBe(1);
      expect(etat.joueurs[0]!.aireDeJeu).toEqual([c('Économie')]);
    });

    it('saute l\'effet quand aucune carte ne peut payer la ressource demandée (Religion seule)', () => {
      // Religion porte 1 Pierre et demande 1 Métal : elle ne peut pas se payer elle-même.
      const etat = faire(scene({ main: [c('Religion')] }), { type: 'jouer', carte: c('Religion') });
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('ne propose pas de Lvl up au niveau maximum', () => {
      const etat = scene({ main: [c('Économie')], aire: [c('Cachot')] });
      etat.joueurs[0]!.niveauEconomie = 4;
      const apres = faire(etat, { type: 'jouer', carte: c('Économie') });
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
      expect(apres.joueurs[0]!.aireDeJeu).toHaveLength(2);
    });

    it('fait payer 1 seule fois pour 1 trash par blason (Assassin)', () => {
      const etat = scene({
        main: [c('Assassin'), c('Épicerie'), c('Cachot'), c('Marché')],
        aire: [c('Contremaître')],
      });
      etat.joueurs[0]!.niveauEconomie = 4; // 3 blasons Économie
      let apres = faire(
        etat,
        { type: 'jouer', carte: c('Assassin') },
        { type: 'payer', paiement: [c('Contremaître')] },
      );
      expect(apres.attente).toMatchObject({ type: 'gain', restant: 3 });
      apres = faire(
        apres,
        { type: 'trasher', carte: c('Épicerie') },
        { type: 'trasher', carte: c('Cachot') },
        { type: 'trasher', carte: c('Marché') },
      );
      expect(apres.trash).toEqual([c('Épicerie'), c('Cachot'), c('Marché')]);
      expect(apres.joueurs[0]!.defausse).toEqual([c('Contremaître')]);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('permet de trasher moins de cartes que le maximum', () => {
      const etat = scene({ main: [c('Assassin'), c('Épicerie')], aire: [c('Contremaître')] });
      etat.joueurs[0]!.niveauEconomie = 4;
      const apres = faire(
        etat,
        { type: 'jouer', carte: c('Assassin') },
        { type: 'payer', paiement: [c('Contremaître')] },
        { type: 'trasher', carte: c('Épicerie') },
        { type: 'passer' },
      );
      expect(apres.trash).toEqual([c('Épicerie')]);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('ne propose rien sans blason (Assassin au niveau de départ)', () => {
      const etat = faire(scene({ main: [c('Assassin')], aire: [c('Contremaître')] }), {
        type: 'jouer',
        carte: c('Assassin'),
      });
      expect(etat.joueurs[0]!.aireDeJeu).toHaveLength(2);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });
  });

  describe('prendre un Privilège par une carte', () => {
    it('propose les 4 Privilèges visibles, puis remplace celui qui est pris (Cour du roi)', () => {
      const etat = faire(scene({ main: [c('Cour du roi')] }), { type: 'jouer', carte: c('Cour du roi') });
      const visibles = etat.privilegesVisibles;
      const prochain = etat.piochePrivileges[0]!;
      expect(permises(etat)).toEqual([
        ...visibles.map((numero) => ({ type: 'prendrePrivilege', numero })),
        { type: 'passer' },
      ]);
      const apres = faire(etat, { type: 'prendrePrivilege', numero: visibles[1]! });
      expect(apres.joueurs[0]!.privileges).toEqual([visibles[1]]);
      expect(apres.privilegesVisibles).toHaveLength(4);
      expect(apres.privilegesVisibles).toContain(prochain);
      expect(apres.privilegesVisibles).not.toContain(visibles[1]);
      expect(apres.piochePrivileges).toHaveLength(15);
    });

    it('fait payer 1 Métal avant de choisir (Religion)', () => {
      const etat = faire(
        scene({ main: [c('Religion')], aire: [c('Forge')] }),
        { type: 'jouer', carte: c('Religion') },
        { type: 'payer', paiement: [c('Forge')] },
      );
      expect(etat.attente).toMatchObject({ type: 'gain', joueur: 0 });
      expect(typesPermis(etat)).toEqual(['prendrePrivilege', 'passer']);
    });

    it('ne propose rien au joueur qui a déjà 4 Privilèges', () => {
      const etat = scene({ main: [c('Cour du roi')] });
      etat.joueurs[0]!.privileges = [1, 2, 3, 4];
      const apres = faire(etat, { type: 'jouer', carte: c('Cour du roi') });
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('ne remplace plus les Privilèges visibles quand leur pioche est vide', () => {
      const etat = scene({ main: [c('Cour du roi')] });
      etat.piochePrivileges = [];
      const apres = faire(
        etat,
        { type: 'jouer', carte: c('Cour du roi') },
        { type: 'prendrePrivilege', numero: etat.privilegesVisibles[0]! },
      );
      expect(apres.privilegesVisibles).toHaveLength(3);
    });
  });

  it('applique les étapes d\'un effet indépendamment : Rejouer même sans payer (Aqueduc)', () => {
    const etat = faire(
      scene({ main: [c('Aqueduc'), c('Épicerie')], or: 1 }),
      { type: 'jouer', carte: c('Aqueduc') },
      { type: 'passer' }, // ne paye pas 1 Or pour piocher
    );
    expect(permises(etat)).toEqual([{ type: 'rejouer' }, { type: 'passer' }]);
    expect(faire(etat, { type: 'rejouer' }).attente).toEqual({ type: 'tour', joueur: 0 });
  });
});
