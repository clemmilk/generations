import { carte } from '../game/cartes.ts';
import { ordreDuTour } from '../game/creation.ts';
import type { Statistiques } from '../game/etat.ts';
import { alea } from '../game/hasard.ts';
import { applyAction, createGame, isGameOver } from '../game/index.ts';
import type { Etat, Inscription } from '../game/index.ts';
import type { Bot } from './bot.ts';
import { choisirAction } from './index.ts';
import { ACTIONS_MAX } from './simulation.ts';

// Joue une partie entre bots en notant, pour chaque joueur, tout ce qu'il a fait : de quoi comparer
// ensuite les choix des vainqueurs à ceux des perdants (scripts/analyse.ts).

const COULEURS: Inscription['couleur'][] = ['bleu', 'jaune', 'rouge', 'vert'];

export type Jauge = 'economie' | 'population' | 'noblesse';

export interface ObservationJoueur {
  /** Place dans l'ordre du tour : 0 pour le premier joueur. */
  place: number;
  gagne: boolean;
  /** Les cartes Assymétrie reçues à la mise en place. */
  asymetrie: string[];
  /** Les cartes achetées, jouées et trashées, dans l'ordre. */
  achats: string[];
  jouees: string[];
  trashs: string[];
  /** Les jauges montées, dans l'ordre (un Privilège obtenu compte comme une montée de Noblesse). */
  montees: Jauge[];
  deckFinal: string[];
  privileges: number[];
  niveauEconomie: number;
  niveauPopulation: number;
  statistiques: Statistiques;
}

export interface ObservationPartie {
  graine: number;
  terminee: boolean;
  joueurs: ObservationJoueur[];
}

function niveaux(etat: Etat): [number, number, number][] {
  return etat.joueurs.map((j) => [j.niveauEconomie, j.niveauPopulation, j.privileges.length]);
}

export function observerPartie(bots: Bot[], graine: number): ObservationPartie {
  const inscriptions = bots.map((bot, i) => ({ nom: `${bot.nom} ${i + 1}`, couleur: COULEURS[i]! }));
  let etat: Etat = createGame(inscriptions, graine);
  const des = { rng: graine ^ 0x5bd1e995 };
  const hasard = () => alea(des);

  const notes = etat.joueurs.map((joueur) => ({
    asymetrie: [...joueur.main, ...joueur.pioche].filter((id) => carte(id).origine === 'asymetrie'),
    achats: [] as string[],
    jouees: [] as string[],
    trashs: [] as string[],
    montees: [] as Jauge[],
  }));

  for (let i = 0; i < ACTIONS_MAX && !isGameOver(etat); i++) {
    const action = choisirAction(etat, bots[etat.attente!.joueur]!, hasard);
    if (!action) break;
    const avant = niveaux(etat);
    // Achat par remplacement sur la pioche : la carte trashée est la première de la pioche, avant l'action.
    const dessusDePioche = etat.joueurs[action.joueur]!.pioche[0];
    etat = applyAction(etat, action);

    const note = notes[action.joueur]!;
    if (action.type === 'acheter') note.achats.push(action.carte);
    if (action.type === 'jouer') note.jouees.push(action.carte);
    if (action.type === 'trasher') note.trashs.push(action.carte);
    // Achat par remplacement : la carte remplacée est trashée.
    if (action.type === 'remplacer') note.trashs.push(action.carte);
    if (action.type === 'remplacerPioche' && dessusDePioche !== undefined) note.trashs.push(dessusDePioche);
    // Une action peut faire monter une jauge chez un autre joueur (Effet Rouge) : on les regarde tous.
    niveaux(etat).forEach(([economie, population, noblesse], j) => {
      const [e, p, n] = avant[j]!;
      for (let k = e; k < economie; k++) notes[j]!.montees.push('economie');
      for (let k = p; k < population; k++) notes[j]!.montees.push('population');
      for (let k = n; k < noblesse; k++) notes[j]!.montees.push('noblesse');
    });
  }

  const ordre = ordreDuTour(etat, etat.premierJoueur).map((joueur) => joueur.id);
  return {
    graine,
    terminee: etat.vainqueur !== null,
    joueurs: etat.joueurs.map((joueur, j) => ({
      place: ordre.indexOf(joueur.id),
      gagne: etat.vainqueur === joueur.id,
      ...notes[j]!,
      deckFinal: [...joueur.pioche, ...joueur.main, ...joueur.aireDeJeu, ...joueur.defausse],
      privileges: [...joueur.privileges],
      niveauEconomie: joueur.niveauEconomie,
      niveauPopulation: joueur.niveauPopulation,
      statistiques: { ...joueur.statistiques },
    })),
  };
}
