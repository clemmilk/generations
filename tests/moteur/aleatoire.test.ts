import { describe, expect, it } from 'vitest';
import {
  applyAction,
  createGame,
  exporterPartie,
  getLegalActions,
  isGameOver,
  rejouerPartie,
} from '../../src/game/index.ts';
import type { Etat } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { inscriptions, verifierAucuneFuite } from './outils.ts';

// Des parties entières jouées au hasard : aucune ne doit planter, perdre une carte ou montrer une carte cachée.

const PARTIES_PAR_TABLE = 40;
const ACTIONS_MAX = 1500;

/** Vérifie tout ce qui doit rester vrai à chaque instant d'une partie. */
function verifier(etat: Etat): void {
  // Aucune carte perdue ni dupliquée.
  const cartes = [
    ...etat.joueurs.flatMap((j) => [...j.pioche, ...j.main, ...j.aireDeJeu, ...j.defausse]),
    ...etat.riviere,
    ...etat.piocheCommune,
    ...etat.trash,
    ...etat.asymetrieEcartees,
    // Achat par remplacement : la carte achetée attend que le joueur choisisse la carte qu'elle remplace.
    ...(etat.attente?.type === 'remplacementAchat' ? [etat.attente.carte] : []),
  ];
  const attendues = MATERIEL.cartes.filter(
    (c) => c.couleur === null || etat.joueurs.some((j) => j.couleur === c.couleur),
  );
  expect(cartes.length).toBe(attendues.length);
  expect(new Set(cartes).size).toBe(attendues.length);

  // Aucun Privilège perdu ni dupliqué, 4 au maximum par joueur.
  const privileges = [
    ...etat.joueurs.flatMap((j) => j.privileges),
    ...etat.privilegesVisibles,
    ...etat.piochePrivileges,
  ];
  expect(privileges.length).toBe(MATERIEL.privileges.length);
  expect(new Set(privileges).size).toBe(MATERIEL.privileges.length);

  for (const joueur of etat.joueurs) {
    expect(joueur.or).toBeGreaterThanOrEqual(0);
    expect(joueur.privileges.length).toBeLessThanOrEqual(4);
    expect(joueur.niveauEconomie).toBeLessThanOrEqual(4);
    expect(joueur.niveauPopulation).toBeLessThanOrEqual(4);
  }
  expect(etat.riviere.length).toBeLessThanOrEqual(4);
  expect(etat.toursSupplementaires).toBeGreaterThanOrEqual(0);

  // Tant que la partie continue, un seul joueur a des actions, et il en a au moins une.
  if (isGameOver(etat)) {
    expect(etat.attente).toBeNull();
    for (const joueur of etat.joueurs) expect(getLegalActions(etat, joueur.id)).toEqual([]);
  } else {
    expect(etat.attente).not.toBeNull();
    for (const joueur of etat.joueurs) {
      const actions = getLegalActions(etat, joueur.id);
      if (joueur.id === etat.attente!.joueur) expect(actions.length).toBeGreaterThan(0);
      else expect(actions).toEqual([]);
    }
  }
}

function jouerAuHasard(nombreDeJoueurs: number, graine: number): Etat {
  let etat = createGame(inscriptions(nombreDeJoueurs), graine);
  const des = { rng: graine * 7919 + 1 };
  verifier(etat);
  for (let i = 0; i < ACTIONS_MAX && !isGameOver(etat); i++) {
    const actions = getLegalActions(etat, etat.attente!.joueur);
    etat = applyAction(etat, actions[Math.floor(alea(des) * actions.length)]!);
    verifier(etat);
    if (i % 25 === 0) verifierAucuneFuite(etat);
  }
  verifierAucuneFuite(etat);
  return etat;
}

describe('parties jouées au hasard', () => {
  for (const nombreDeJoueurs of [2, 3, 4]) {
    it(`${PARTIES_PAR_TABLE} parties à ${nombreDeJoueurs} joueurs sans erreur ni carte perdue`, () => {
      let terminees = 0;
      for (let graine = 1; graine <= PARTIES_PAR_TABLE; graine++) {
        const fin = jouerAuHasard(nombreDeJoueurs, graine);
        if (isGameOver(fin)) terminees++;
      }
      // Même en jouant n'importe comment, la plupart des parties doivent finir par avoir un vainqueur.
      expect(terminees).toBeGreaterThan(PARTIES_PAR_TABLE / 2);
    }, 60_000);
  }
});

describe('export et rejeu d\'une partie', () => {
  it('rejoue une partie exportée à l\'identique', () => {
    const fin = jouerAuHasard(3, 7);
    const partie = exporterPartie(fin);
    const etats = rejouerPartie(partie);
    expect(etats).toHaveLength(partie.actions.length + 1);
    expect(etats.at(-1)).toEqual(fin);
  });

  it('survit à un passage par du texte JSON', () => {
    const fin = jouerAuHasard(2, 11);
    const texte = JSON.stringify(exporterPartie(fin));
    expect(rejouerPartie(JSON.parse(texte)).at(-1)).toEqual(fin);
  });

  it('contient la graine, les joueurs, les actions et un journal lisible', () => {
    const etat = createGame(inscriptions(2), 42);
    const partie = exporterPartie(applyAction(etat, getLegalActions(etat, etat.attente!.joueur)[0]!));
    expect(partie.version).toBe(1);
    expect(partie.graine).toBe(42);
    expect(partie.joueurs).toEqual(inscriptions(2));
    expect(partie.actions).toHaveLength(1);
    expect(partie.journal.some((ligne) => ligne.includes('Cartes piochées'))).toBe(true);
  });

  it('signale l\'action qui ne peut pas être rejouée', () => {
    const etat = createGame(inscriptions(2), 42);
    const partie = exporterPartie(etat);
    partie.actions = [{ type: 'rejouer', joueur: 0 }];
    expect(() => rejouerPartie(partie)).toThrow(/Action n°1 impossible à rejouer/);
  });
});
