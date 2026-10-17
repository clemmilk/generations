import { expect, it } from 'vitest';
import { PARAMETRES } from '../../src/game/parametres.ts';
import { faire, scene } from './outils.ts';

// Essai du 16/10 : selon PARAMETRES.carteAcheteeVa, la carte achetée va dans la main ou dans la défausse.
it('met la carte achetée là où le réglage l\'indique', () => {
  const etat = scene({ or: 20 });
  const carte = etat.riviere[0]!;
  const apres = faire(etat, { type: 'acheter', carte, paiement: [] });
  const alice = apres.joueurs[0]!;
  if (PARAMETRES.carteAcheteeVa === 'defausse') {
    expect(alice.defausse).toContain(carte);
    expect(alice.main).not.toContain(carte);
  } else if (PARAMETRES.carteAcheteeVa === 'main') {
    expect(alice.main).toContain(carte);
  } else {
    // Remplacement : la carte attend le choix de la carte qu'elle remplace (voir achat-remplacement.test.ts).
    expect(apres.attente).toEqual({ type: 'remplacementAchat', joueur: 0, carte });
  }
});
