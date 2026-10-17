import { describe, expect, it } from 'vitest';
import { blasons } from '../../src/game/ressources.ts';
import { c, faire, permises, scene, typesPermis } from './outils.ts';

describe('mettre fin à sa lignée', () => {
  it('est permis avec 0 ou 1 carte en main, interdit avec 2', () => {
    expect(typesPermis(scene({ main: [] }))).toContain('finLignee');
    expect(typesPermis(scene({ main: [c('Cachot')] }))).toContain('finLignee');
    expect(typesPermis(scene({ main: [c('Cachot'), c('Marché')] }))).not.toContain('finLignee');
  });

  it('reforme le deck avec la main, la défausse, l\'aire de jeu et le reste de la pioche', () => {
    const etat = scene({
      main: [c('Cachot')],
      aire: [c('Épicerie'), c('Marché')],
      defausse: [c('Forgeron')],
      pioche: [c('Imprimeur'), c('Ferrailleur'), c('Colporteur'), c('Tour de guet')],
    });
    let apres = faire(etat, { type: 'finLignee' });
    while (apres.attente?.type !== 'tour') apres = faire(apres, { type: 'passer' });
    const alice = apres.joueurs[0]!;
    expect(alice.aireDeJeu).toEqual([]);
    expect(alice.defausse).toEqual([]);
    expect(alice.main).toHaveLength(3);
    expect(alice.pioche).toHaveLength(5);
    expect([...alice.main, ...alice.pioche].sort()).toEqual(
      [
        c('Cachot'),
        c('Épicerie'),
        c('Marché'),
        c('Forgeron'),
        c('Imprimeur'),
        c('Ferrailleur'),
        c('Colporteur'),
        c('Tour de guet'),
      ].sort(),
    );
  });

  it('fait débuter une nouvelle lignée (Or de l\'Économie) puis passe au joueur suivant', () => {
    const apres = faire(scene({ main: [], defausse: [c('Forgeron')] }), { type: 'finLignee' });
    expect(apres.joueurs[0]!.or).toBe(3);
    expect(apres.joueurs[0]!.main).toHaveLength(3);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait gagner si la pioche de la nouvelle lignée vide le deck', () => {
    const apres = faire(
      scene({ main: [c('Cachot')], defausse: [c('Forgeron')], pioche: [c('Imprimeur')] }),
      { type: 'finLignee' },
    );
    expect(apres.vainqueur).toBe(0);
    expect(apres.attente).toBeNull();
  });

  describe('Noblesse', () => {
    it('propose un Privilège avec 1 Érudit dans l\'aire de jeu', () => {
      const etat = faire(scene({ aire: [c('Épicerie')] }), { type: 'finLignee' });
      expect(etat.attente).toEqual({ type: 'finNoblesse', joueur: 0 });
      expect(permises(etat)).toEqual([
        ...etat.privilegesVisibles.map((numero) => ({ type: 'prendrePrivilege', numero })),
        { type: 'passer' },
      ]);
    });

    it('ajoute le Privilège au plateau, le remplace, et ne dépense pas les Érudits', () => {
      const etat = faire(scene({ aire: [c('Épicerie')] }), { type: 'finLignee' });
      const choisi = etat.privilegesVisibles[2]!;
      const apres = faire(etat, { type: 'prendrePrivilege', numero: choisi });
      expect(apres.joueurs[0]!.privileges).toEqual([choisi]);
      expect(apres.privilegesVisibles).toHaveLength(4);
      expect(apres.privilegesVisibles).not.toContain(choisi);
    });

    it('n\'est pas obligatoire', () => {
      const apres = faire(scene({ aire: [c('Épicerie')] }), { type: 'finLignee' }, { type: 'passer' });
      expect(apres.joueurs[0]!.privileges).toEqual([]);
      expect(apres.privilegesVisibles).toHaveLength(4);
    });

    it('ne propose rien sans Érudit', () => {
      const etat = faire(scene({ aire: [c('Cachot')] }), { type: 'finLignee' });
      expect(etat.attente?.type).not.toBe('finNoblesse');
    });

    it('demande 2 Érudits pour le 2e Privilège, 3 pour le 3e, 4 pour le 4e', () => {
      const avec = (privileges: number[], aire: string[]) => {
        const etat = scene({ aire });
        etat.joueurs[0]!.privileges = privileges;
        etat.privilegesVisibles = [17, 18, 19, 20];
        return faire(etat, { type: 'finLignee' }).attente?.type === 'finNoblesse';
      };
      // Privilèges sans effet sur les Érudits (les 2, 3 et 4 en ajoutent aux cartes Avancée).
      expect(avec([1], [c('Épicerie')])).toBe(false);
      expect(avec([1], [c('Épicerie'), c('Imprimeur')])).toBe(true);
      expect(avec([1, 5], [c('Épicerie'), c('Imprimeur')])).toBe(false);
      expect(avec([1, 5], [c('Hôpital'), c('Imprimeur')])).toBe(true);
      expect(avec([1, 5, 6], [c('Hôpital'), c('Imprimeur')])).toBe(false);
      expect(avec([1, 5, 6], [c('Hôpital'), c('Archiviste royale')])).toBe(true);
    });

    it('ne propose plus rien au joueur qui a 4 Privilèges', () => {
      const etat = scene({ aire: [c('Hôpital'), c('Archiviste royale'), c('Épicerie')] });
      etat.joueurs[0]!.privileges = [1, 5, 6, 7];
      expect(faire(etat, { type: 'finLignee' }).attente?.type).not.toBe('finNoblesse');
    });

    it('ne donne qu\'1 Privilège par fin de lignée', () => {
      const etat = faire(scene({ aire: [c('Hôpital'), c('Archiviste royale')] }), { type: 'finLignee' });
      const apres = faire(etat, { type: 'prendrePrivilege', numero: etat.privilegesVisibles[0]! });
      expect(apres.attente?.type).not.toBe('finNoblesse');
      expect(apres.joueurs[0]!.privileges).toHaveLength(1);
    });
  });

  describe('Économie', () => {
    it('propose de monter d\'un niveau avec assez d\'Or, et fait payer le coût', () => {
      const etat = faire(scene({ or: 5 }), { type: 'finLignee' });
      expect(etat.attente).toMatchObject({ type: 'finJauges', joueur: 0, seule: 'economie' });
      expect(permises(etat)).toEqual([{ type: 'monter', piste: 'economie' }, { type: 'passer' }]);
      const apres = faire(etat, { type: 'monter', piste: 'economie' });
      expect(apres.joueurs[0]!.niveauEconomie).toBe(1);
      // Les 3 Or restants sont défaussés, puis la nouvelle lignée donne 4 Or (niveau 1).
      expect(apres.joueurs[0]!.or).toBe(4);
    });

    it('n\'est pas obligatoire, mais l\'Or restant est défaussé dans tous les cas', () => {
      const apres = faire(scene({ or: 5 }), { type: 'finLignee' }, { type: 'passer' });
      expect(apres.joueurs[0]!.niveauEconomie).toBe(0);
      expect(apres.joueurs[0]!.or).toBe(3);
    });

    it('ne propose rien sans assez d\'Or, et défausse quand même l\'Or', () => {
      const apres = faire(scene({ or: 1 }), { type: 'finLignee' });
      expect(apres.joueurs[0]!.niveauEconomie).toBe(0);
      expect(apres.joueurs[0]!.or).toBe(3);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('ne fait gagner qu\'1 niveau par fin de lignée, même avec beaucoup d\'Or', () => {
      const apres = faire(scene({ or: 50 }), { type: 'finLignee' }, { type: 'monter', piste: 'economie' });
      expect(apres.joueurs[0]!.niveauEconomie).toBe(1);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('suit les coûts du plateau (2, 3, 4, 5 Or) et s\'arrête au niveau maximum', () => {
      const propose = (niveau: number, or: number) => {
        const etat = scene({ or });
        etat.joueurs[0]!.niveauEconomie = niveau;
        const attente = faire(etat, { type: 'finLignee' }).attente;
        return attente?.type === 'finJauges' && attente.seule === 'economie';
      };
      expect(propose(0, 1)).toBe(false);
      expect(propose(0, 2)).toBe(true);
      expect(propose(1, 2)).toBe(false);
      expect(propose(1, 3)).toBe(true);
      expect(propose(2, 4)).toBe(true);
      expect(propose(3, 4)).toBe(false);
      expect(propose(3, 5)).toBe(true);
      expect(propose(4, 50)).toBe(false);
    });
  });

  describe('Population', () => {
    it('propose de monter d\'un niveau avec 1 Ressource dans l\'aire de jeu', () => {
      const etat = faire(scene({ aire: [c('Cachot')] }), { type: 'finLignee' });
      expect(etat.attente).toMatchObject({ type: 'finJauges', joueur: 0, seule: 'population' });
      const apres = faire(etat, { type: 'monter', piste: 'population' });
      expect(apres.joueurs[0]!.niveauPopulation).toBe(1);
    });

    it('n\'est pas obligatoire', () => {
      const apres = faire(scene({ aire: [c('Cachot')] }), { type: 'finLignee' }, { type: 'passer' });
      expect(apres.joueurs[0]!.niveauPopulation).toBe(0);
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('compte la Pierre et le Métal ensemble, mais pas les Érudits', () => {
      const propose = (niveau: number, aire: string[]) => {
        const etat = scene({ aire });
        etat.joueurs[0]!.niveauPopulation = niveau;
        const apres = faire(etat, { type: 'finLignee' });
        const suite = apres.attente?.type === 'finNoblesse' ? faire(apres, { type: 'passer' }) : apres;
        return suite.attente?.type === 'finJauges' && suite.attente.seule === 'population';
      };
      expect(propose(0, [c('Épicerie')])).toBe(false);
      expect(propose(1, [c('Cachot')])).toBe(false);
      expect(propose(1, [c('Cachot'), c('Forgeron')])).toBe(true);
      expect(propose(2, [c('Cachot'), c('Forgeron')])).toBe(false);
      expect(propose(2, [c('Ferme'), c('Forgeron')])).toBe(true);
      expect(propose(3, [c('Ferme'), c('Contremaître')])).toBe(true);
      expect(propose(4, [c('Ferme'), c('Contremaître'), c('Cour du roi')])).toBe(false);
    });

    it('augmente le nombre de cartes piochées à la lignée suivante', () => {
      const etat = scene({ aire: [c('Cachot'), c('Forgeron')] });
      etat.joueurs[0]!.niveauPopulation = 1;
      const apres = faire(etat, { type: 'finLignee' }, { type: 'monter', piste: 'population' });
      expect(apres.joueurs[0]!.niveauPopulation).toBe(2);
      expect(apres.joueurs[0]!.main).toHaveLength(4);
    });
  });

  it('enchaîne Noblesse, Population puis Économie (décision DD)', () => {
    let etat = faire(scene({ aire: [c('Épicerie'), c('Cachot')], or: 2 }), { type: 'finLignee' });
    expect(etat.attente?.type).toBe('finNoblesse');
    etat = faire(etat, { type: 'passer' });
    expect(etat.attente).toMatchObject({ type: 'finJauges', seule: 'population' });
    etat = faire(etat, { type: 'passer' });
    expect(etat.attente).toMatchObject({ type: 'finJauges', seule: 'economie' });
    etat = faire(etat, { type: 'passer' });
    expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
  });
});

describe('blasons', () => {
  it('donne le nombre affiché au niveau actuel de chaque piste, sans cumul', () => {
    const joueur = scene().joueurs[0]!;
    expect(blasons(joueur)).toEqual({ noblesse: 0, economie: 0, population: 0 });
    joueur.niveauEconomie = 2;
    joueur.niveauPopulation = 4;
    joueur.privileges = [1, 2, 3];
    expect(blasons(joueur)).toEqual({ noblesse: 2, economie: 1, population: 3 });
    joueur.privileges = [1];
    expect(blasons(joueur).noblesse).toBe(0);
    joueur.privileges = [1, 2, 3, 4];
    expect(blasons(joueur).noblesse).toBe(3);
  });
});
