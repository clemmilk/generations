import { describe, expect, it } from 'vitest';
import { getLegalActions, getPlayerView } from '../../src/game/index.ts';
import type { Etat } from '../../src/game/index.ts';
import { c, faire, permises, scene, verifierAucuneFuite } from './outils.ts';

// Renouveler la Rivière (décision FFF) : à son tour, avant son action et au plus 1 fois par tour,
// le joueur paye 2 Or pour remplacer exactement 2 cartes de la Rivière de son choix.
// Les remplaçantes sont piochées d'abord ; les cartes retirées vont ensuite sous la pioche commune.

const RIVIERE = [c('Remouleur ambulant'), c('Halle des négociants'), c('Banque'), c('Prison')];
const PIOCHE = [c('Mine'), c('Roi'), c('Forge')];

function prete(or: number, pioche: string[] = PIOCHE): Etat {
  const etat = scene({ main: [c('Épicerie')], or });
  etat.riviere = [...RIVIERE];
  etat.piocheCommune = [...pioche];
  return etat;
}

const renouvellements = (etat: Etat) => permises(etat).filter((a) => a.type === 'renouvelerRiviere');

describe('Renouveler la Rivière (décision FFF)', () => {
  it('propose chaque paire de cartes de la Rivière, pour 2 Or', () => {
    // 4 cartes : 6 paires possibles.
    expect(renouvellements(prete(2))).toHaveLength(6);
    expect(renouvellements(prete(2))).toContainEqual({ type: 'renouvelerRiviere', cartes: [RIVIERE[0], RIVIERE[2]] });
  });

  it('n\'est pas proposé avec moins de 2 Or', () => {
    expect(renouvellements(prete(1))).toEqual([]);
  });

  it('n\'est pas proposé s\'il reste moins de 2 cartes dans la pioche commune', () => {
    expect(renouvellements(prete(5, [c('Mine')]))).toEqual([]);
    expect(renouvellements(prete(5, []))).toEqual([]);
    expect(renouvellements(prete(5, [c('Mine'), c('Roi')]))).toHaveLength(6);
  });

  it('remplace les 2 cartes à leur place, puis les glisse sous la pioche commune', () => {
    const apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[1]!, RIVIERE[3]!] });
    expect(apres.joueurs[0]!.or).toBe(3);
    expect(apres.riviere).toEqual([RIVIERE[0], c('Mine'), RIVIERE[2], c('Roi')]);
    expect(apres.piocheCommune).toEqual([c('Forge'), RIVIERE[1], RIVIERE[3]]);
  });

  it('avec exactement 2 cartes dans la pioche commune, ne reprend pas les cartes retirées', () => {
    const apres = faire(prete(5, [c('Mine'), c('Roi')]), { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!] });
    expect(apres.riviere).toEqual([c('Mine'), c('Roi'), RIVIERE[2], RIVIERE[3]]);
    expect(apres.piocheCommune).toEqual([RIVIERE[0], RIVIERE[1]]);
  });

  it('le joueur doit encore faire son action, mais ne peut pas renouveler une 2e fois', () => {
    const apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!] });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 0 });
    expect(renouvellements(apres)).toEqual([]);
    expect(permises(apres)).toContainEqual({ type: 'jouer', carte: c('Épicerie') });
  });

  it('n\'est plus possible après son action', () => {
    // Alice a un Privilège d'action : après son action, elle peut encore l'utiliser, mais pas renouveler.
    const etat = prete(20);
    etat.joueurs[0]!.privileges = [15];
    const apres = faire(etat, { type: 'jouer', carte: c('Épicerie') });
    expect(apres.attente).toEqual({ type: 'apresAction', joueur: 0 });
    expect(renouvellements(apres)).toEqual([]);
  });

  it('est compté dans les statistiques du joueur, sans compter comme un tour', () => {
    const apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!] });
    expect(apres.joueurs[0]!.statistiques.renouvellementsRiviere).toBe(1);
    expect(apres.joueurs[0]!.statistiques.tours).toBe(0);
    expect(apres.joueurs[1]!.statistiques.renouvellementsRiviere).toBe(0);
    expect(getPlayerView(apres, 1).joueurs[0]!.statistiques.renouvellementsRiviere).toBe(1);
  });

  it('redevient possible au tour suivant', () => {
    let apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!] }, { type: 'jouer', carte: c('Épicerie') });
    expect(apres.riviereRenouvelee).toBe(false);
    apres.joueurs[1]!.or = 2;
    expect(getLegalActions(apres, 1).some((a) => a.type === 'renouvelerRiviere')).toBe(true);
  });

  it('refuse 1 seule carte, 3 cartes ou une carte hors de la Rivière', () => {
    const etat = prete(5);
    expect(() => faire(etat, { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!] })).toThrow();
    expect(() => faire(etat, { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!, RIVIERE[2]!] })).toThrow();
    expect(() => faire(etat, { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, c('Mine')] })).toThrow();
  });

  it('est interdit s\'il laisse le joueur sans aucune action (comme les Privilèges, décision LL)', () => {
    // Main vide et Privilège 15 déjà utilisé : plus de fin de lignée possible ce tour-ci.
    // Rivière : Remouleur ambulant (2 Or), Banque (1 Ressource, qu'Alice n'a pas), Cardinal (6), Roi (5).
    const etat = prete(4);
    etat.riviere = [c('Remouleur ambulant'), c('Banque'), c('Cardinal'), c('Roi')];
    etat.joueurs[0]!.main = [];
    etat.joueurs[0]!.privileges = [15];
    etat.privilegesUtilises = [15];
    // Après avoir payé 2 Or, il en reste 2 : seul le Remouleur ambulant reste achetable, il faut le garder.
    const permis = renouvellements(etat).map((a) => (a.type === 'renouvelerRiviere' ? a.cartes : []));
    expect(permis).toHaveLength(3);
    for (const cartes of permis) expect(cartes).not.toContain(c('Remouleur ambulant'));
    // Avec 3 Or, il n'en reste qu'1 : plus rien n'est achetable, le renouvellement est interdit.
    etat.joueurs[0]!.or = 3;
    expect(renouvellements(etat)).toEqual([]);
    // Avec une carte en main, il pourra toujours la jouer : tout est permis.
    etat.joueurs[0]!.main = [c('Épicerie')];
    expect(renouvellements(etat)).toHaveLength(6);
  });

  it('accepte les 2 cartes dans n\'importe quel ordre', () => {
    const apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[3]!, RIVIERE[0]!] });
    expect(apres.joueurs[0]!.or).toBe(3);
  });

  it('écrit dans le journal les cartes retirées et leurs remplaçantes, vues de tous', () => {
    const apres = faire(prete(5), { type: 'renouvelerRiviere', cartes: [RIVIERE[0]!, RIVIERE[1]!] });
    const ligne = getPlayerView(apres, 1).journal.find((e) => e.texte.includes('renouvelle la Rivière'));
    expect(ligne?.texte).toBe(
      'Alice paye 2 Or et renouvelle la Rivière : Remouleur ambulant, Halle des négociants remplacées par Mine, Roi.',
    );
    expect(ligne?.cartes).toEqual([RIVIERE[0], RIVIERE[1], c('Mine'), c('Roi')]);
    // Les cartes glissées sous la pioche commune ont été vues de tous : ce n'est pas une fuite.
    expect(() => verifierAucuneFuite(apres)).not.toThrow();
  });
});
