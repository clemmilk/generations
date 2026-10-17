import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { carte } from '../../src/game/cartes.ts';
import { lireCodeEffet } from '../../src/game/materiel/codeEffet.ts';
import { c, faire, permises, scene } from './outils.ts';

// Effet « Achète 1 carte » (code achete(1)) : un achat en plus de l'action du tour, comme l'action Acheter,
// donc avec la règle du remplacement (décisions S et BB). Le matériel des tests n'a pas de carte « achete » :
// on prête cet effet à l'Épicerie le temps de ces tests.
const hote = c('Épicerie');
const effetOriginal = carte(hote).effet;
const preter = (code: string) => {
  carte(hote).effet = lireCodeEffet(code);
};
beforeEach(() => preter('achete(1)'));
afterEach(() => {
  carte(hote).effet = effetOriginal;
});

function marche(riviere: string[], or: number) {
  const etat = scene({ main: [hote, c('Cachot')], or });
  etat.riviere = riviere.map((nom) => c(nom));
  etat.piocheCommune = etat.piocheCommune.filter((id) => !etat.riviere.includes(id));
  return etat;
}

describe('effet « Achète 1 carte »', () => {
  it('propose les achats que le joueur peut payer, ou de renoncer', () => {
    const etat = faire(marche(['Remouleur ambulant', 'Contremaître', 'Démolisseur'], 3), { type: 'jouer', carte: hote });
    expect(permises(etat)).toEqual([
      { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] },
      { type: 'acheter', carte: c('Contremaître'), paiement: [] },
      { type: 'passer' },
    ]);
  });

  it('fait payer le coût, complète la Rivière, puis fait choisir la carte remplacée', () => {
    const etat = marche(['Remouleur ambulant'], 3);
    const prochaine = etat.piocheCommune[0]!;
    let apres = faire(etat, { type: 'jouer', carte: hote }, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] });
    expect(apres.joueurs[0]!.or).toBe(1);
    expect(apres.riviere).toEqual([prochaine]);
    expect(apres.attente).toEqual({ type: 'remplacementAchat', joueur: 0, carte: c('Remouleur ambulant') });
    apres = faire(apres, { type: 'remplacer', carte: c('Cachot') });
    expect(apres.joueurs[0]!.main).toEqual([c('Remouleur ambulant')]);
    expect(apres.trash).toEqual([c('Cachot')]);
    expect(apres.joueurs[0]!.statistiques.cartesAchetees).toBe(1);
  });

  it('ne coûte rien si le joueur renonce', () => {
    const apres = faire(marche(['Remouleur ambulant'], 3), { type: 'jouer', carte: hote }, { type: 'passer' });
    expect(apres.joueurs[0]!.or).toBe(3);
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('n\'est pas proposé quand aucun achat n\'est possible', () => {
    const apres = faire(marche(['Démolisseur'], 0), { type: 'jouer', carte: hote });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('avec 2 achats, la Rivière est complétée avant le second (comme le Moulin)', () => {
    preter('or+2 ; achete(1) ; achete(1)');
    const etat = marche(['Remouleur ambulant'], 3);
    // La carte suivante de la pioche commune est le Contremaître (3 Or) : 3 + 2 - 2 = 3 Or, de quoi l'acheter.
    const prochaine = c('Contremaître');
    etat.piocheCommune = [prochaine, ...etat.piocheCommune.filter((id) => id !== prochaine)];
    let apres = faire(etat, { type: 'jouer', carte: hote });
    expect(apres.joueurs[0]!.or).toBe(5);
    apres = faire(apres, { type: 'acheter', carte: c('Remouleur ambulant'), paiement: [] }, { type: 'remplacerPioche' });
    expect(apres.riviere).toEqual([prochaine]);
    expect(permises(apres)).toContainEqual({ type: 'acheter', carte: prochaine, paiement: [] });
  });
});
