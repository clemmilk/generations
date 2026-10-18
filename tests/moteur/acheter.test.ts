import { describe, expect, it } from 'vitest';
import type { Etat } from '../../src/game/index.ts';
import { optionsDePaiement } from '../../src/game/ressources.ts';
import { avecReglage, c, faire, permises, scene } from './outils.ts';
import type { Zones } from './outils.ts';

/** Une scène dont la Rivière contient exactement les cartes indiquées. */
function marche(riviere: string[], zones: Zones = {}): Etat {
  const etat = scene(zones);
  etat.riviere = riviere.map((nom) => c(nom));
  etat.piocheCommune = etat.piocheCommune.filter((id) => !etat.riviere.includes(id));
  return etat;
}

const achats = (etat: Etat) => permises(etat).filter((a) => a.type === 'acheter');

describe('acheter une carte', () => {
  it('ne propose que les cartes que le joueur peut payer', () => {
    const etat = marche(['Remouleur ambulant', 'Contremaître', 'Carrière', 'Assassin'], { or: 3 });
    expect(achats(etat)).toEqual([
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'acheter', carte: c('Contremaître'), paiement: [] },
    ]);
  });

  it('fait payer l\'Or, complète la Rivière, puis fait choisir la carte remplacée', () => {
    const etat = marche(['Remouleur ambulant', 'Contremaître', 'Carrière', 'Assassin'], { main: [c('Épicerie')], or: 2 });
    const prochaine = etat.piocheCommune[0]!;
    let apres = faire(etat, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] });
    expect(apres.joueurs[0]!.or).toBe(0);
    expect(apres.riviere).toEqual([c('Contremaître'), c('Carrière'), c('Assassin'), prochaine]);
    expect(apres.attente).toEqual({ type: 'remplacementAchat', joueur: 0, carte: c('Remouleur ambulant') });
    apres = faire(apres, { type: 'remplacer', carte: c('Épicerie') });
    expect(apres.joueurs[0]!.main).toEqual([c('Remouleur ambulant')]);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('fait payer une Ressource en défaussant une carte de l\'aire de jeu, Pierre ou Métal au choix', () => {
    const etat = marche(['Carrière'], { aire: [c('Cachot'), c('Forgeron'), c('Épicerie')] });
    expect(achats(etat)).toEqual([
      { type: 'acheter', carte: c('Carrière'), paiement: [c('Cachot')] },
      { type: 'acheter', carte: c('Carrière'), paiement: [c('Forgeron')] },
    ]);
    const apres = faire(etat, { type: 'acheter', carte: c('Carrière'), paiement: [c('Forgeron')] });
    expect(apres.joueurs[0]!.aireDeJeu).toEqual([c('Cachot'), c('Épicerie')]);
    expect(apres.joueurs[0]!.defausse).toEqual([c('Forgeron')]);
    expect(apres.attente).toMatchObject({ type: 'remplacementAchat', carte: c('Carrière') });
  });

  it('accepte une seule carte Pierre + Métal pour payer 2 Ressources', () => {
    const etat = marche(['Moulin'], { aire: [c('Ferme')] });
    expect(achats(etat)).toEqual([{ type: 'acheter', carte: c('Moulin'), paiement: [c('Ferme')] }]);
  });

  it('demande à la fois l\'Or et les Ressources (Apothicairerie : 2 Or + 1 Ressource)', () => {
    expect(achats(marche(['Apothicairerie'], { aire: [c('Cachot')], or: 1 }))).toEqual([]);
    expect(achats(marche(['Apothicairerie'], { or: 2 }))).toEqual([]);
    expect(achats(marche(['Apothicairerie'], { aire: [c('Cachot')], or: 2 }))).toHaveLength(1);
  });

  it('ne compte pas les Érudits comme des Ressources', () => {
    expect(achats(marche(['Carrière'], { aire: [c('Épicerie'), c('Imprimeur')] }))).toEqual([]);
  });

  it('perd les ressources excédentaires de la carte défaussée', () => {
    const etat = marche(['Carrière'], { aire: [c('Cour du roi')] });
    const apres = faire(etat, { type: 'acheter', carte: c('Carrière'), paiement: [c('Cour du roi')] });
    expect(apres.joueurs[0]!.aireDeJeu).toEqual([]);
    expect(apres.joueurs[0]!.defausse).toEqual([c('Cour du roi')]);
  });

  it('accepte un paiement dont les cartes sont données dans un autre ordre', () => {
    const etat = marche(['Moulin'], { aire: [c('Cachot'), c('Forgeron')] });
    const apres = faire(etat, {
      type: 'acheter',
      carte: c('Moulin'),
      paiement: [c('Forgeron'), c('Cachot')],
    });
    expect(apres.attente).toMatchObject({ type: 'remplacementAchat', carte: c('Moulin') });
  });

  it('refuse un paiement insuffisant ou avec une carte superflue', () => {
    const etat = marche(['Carrière'], { aire: [c('Cachot'), c('Forgeron')] });
    expect(() => faire(etat, { type: 'acheter', carte: c('Carrière'), paiement: [] })).toThrow(/illégale/);
    expect(() =>
      faire(etat, { type: 'acheter', carte: c('Carrière'), paiement: [c('Cachot'), c('Forgeron')] }),
    ).toThrow(/illégale/);
  });

  it('ne complète plus la Rivière quand la pioche commune est vide, mais ses cartes restent achetables', () => {
    const etat = marche(['Remouleur ambulant', 'Contremaître'], { or: 10 });
    etat.piocheCommune = [c('Carrière')];
    const apres = faire(
      etat,
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'remplacerPioche' },
    );
    expect(apres.riviere).toEqual([c('Contremaître'), c('Carrière')]);
    expect(apres.piocheCommune).toEqual([]);
    apres.attente = { type: 'tour', joueur: 0 };
    expect(achats(apres)).toEqual([
      // Carrière coûte 1 Ressource, que le joueur n'a pas.
      { type: 'acheter', carte: c('Contremaître'), paiement: [] },
    ]);
    apres.riviere = [];
    expect(achats(apres)).toEqual([]);
  });

  // Règle de la carte achetée en main (réglage carteAcheteeVa : 'main'), avec le trash à 1 Or.
  describe('trasher 1 carte pour 1 Or de plus (carte achetée en main)', () => {
    avecReglage('carteAcheteeVa', 'main');

    const depart = () =>
      faire(
        marche(['Remouleur ambulant'], { main: [c('Cachot')], aire: [c('Épicerie')], or: 3 }),
        { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      );

    it('est proposé après l\'achat s\'il reste au moins 1 Or', () => {
      const etat = depart();
      expect(etat.attente).toEqual({ type: 'trashAchat', joueur: 0 });
      expect(permises(etat)).toEqual([
        { type: 'trasher', carte: c('Cachot') },
        { type: 'trasher', carte: c('Remouleur ambulant') },
        { type: 'trasher', carte: c('Épicerie') },
        { type: 'trasherPioche' },
        { type: 'passer' },
      ]);
    });

    it('coûte 1 Or et trashe la carte choisie', () => {
      const etat = faire(depart(), { type: 'trasher', carte: c('Cachot') });
      expect(etat.joueurs[0]!.or).toBe(0);
      expect(etat.trash).toEqual([c('Cachot')]);
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('est limité à 1 carte par achat', () => {
      const etat = marche(['Remouleur ambulant'], { main: [c('Cachot'), c('Marché')], or: 10 });
      const apres = faire(
        etat,
        { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
        { type: 'trasher', carte: c('Cachot') },
      );
      expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    });

    it('ne coûte rien si le joueur refuse', () => {
      const etat = faire(depart(), { type: 'passer' });
      expect(etat.joueurs[0]!.or).toBe(1);
      expect(etat.trash).toEqual([]);
    });

    it('n\'est pas proposé sans Or restant', () => {
      const etat = faire(marche(['Remouleur ambulant'], { main: [c('Cachot')], or: 2 }), {
        type: 'acheter',
        carte: c('Remouleur ambulant'),
        paiement: [],
      });
      expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
    });
  });
});

describe('optionsDePaiement', () => {
  const joueur = (aire: string[]) => scene({ aire }).joueurs[0]!;
  const rien = { pierre: 0, metal: 0, ressource: 0 };

  it('donne une seule façon de payer un besoin nul : ne rien défausser', () => {
    expect(optionsDePaiement(joueur([c('Cachot')]), rien)).toEqual([[]]);
  });

  it('ne donne aucune façon de payer un besoin impossible', () => {
    expect(optionsDePaiement(joueur([c('Cachot')]), { ...rien, metal: 1 })).toEqual([]);
    expect(optionsDePaiement(joueur([]), { ...rien, ressource: 1 })).toEqual([]);
  });

  it('distingue la Pierre du Métal quand le besoin est précis', () => {
    const j = joueur([c('Cachot'), c('Forgeron')]);
    expect(optionsDePaiement(j, { ...rien, pierre: 1 })).toEqual([[c('Cachot')]]);
    expect(optionsDePaiement(j, { ...rien, metal: 1 })).toEqual([[c('Forgeron')]]);
  });

  it('ne propose jamais de carte superflue', () => {
    // Cour du roi (3 Pierres) suffit seule ; Cachot + Ferrailleur aussi.
    const j = joueur([c('Cachot'), c('Ferrailleur'), c('Cour du roi')]);
    expect(optionsDePaiement(j, { ...rien, pierre: 2 })).toEqual([
      [c('Cachot'), c('Ferrailleur')],
      [c('Cour du roi')],
    ]);
  });

  it('combine besoin précis et Ressource au choix', () => {
    // 1 Métal + 1 Ressource : Forgeron paye le Métal, une autre carte paye la Ressource.
    const j = joueur([c('Cachot'), c('Forgeron'), c('Contremaître')]);
    expect(optionsDePaiement(j, { pierre: 0, metal: 1, ressource: 1 })).toEqual([
      [c('Cachot'), c('Forgeron')],
      [c('Contremaître')],
    ]);
  });
});
