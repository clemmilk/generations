import { carte } from '../game/cartes.ts';
import { ordreDuTour } from '../game/creation.ts';
import { alea } from '../game/hasard.ts';
import { applyAction, createGame, isGameOver } from '../game/index.ts';
import type { Etat, Inscription } from '../game/index.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import type { Bot } from './bot.ts';
import { choisirAction } from './index.ts';

// Parties jouées entièrement par des bots, pour mesurer l'équilibrage.

const COULEURS: Inscription['couleur'][] = ['bleu', 'jaune', 'rouge', 'vert'];

/** Au-delà de ce nombre d'actions, la partie est abandonnée et comptée comme non terminée. */
export const ACTIONS_MAX = 5000;

export interface ResultatPartie {
  graine: number;
  /** Numéro de siège du vainqueur, ou null si la partie n'est pas allée au bout. */
  vainqueur: number | null;
  /** Place du vainqueur dans l'ordre du tour : 0 pour le premier joueur, 1 pour le deuxième… */
  placeVainqueur: number | null;
  /** Nombre de tours joués, tous joueurs confondus. */
  tours: number;
  /** Nombre de lignées commencées par le vainqueur. */
  ligneesVainqueur: number | null;
  /** Cartes Avancée achetées pendant la partie, tous joueurs confondus. */
  achats: string[];
  /** Cartes Avancée dans le deck du vainqueur à la fin. */
  deckVainqueur: string[];
  privilegesVainqueur: number[];
  /** Les cartes Assymétrie (Domaines) reçues au départ, par siège. */
  asymetrieDeDepart: string[][];
  /** Les cartes Avancée achetées, par siège. */
  achatsParSiege: string[][];
}

/** Fait jouer une partie complète aux bots donnés (un par siège). La même graine redonne la même partie. */
export function simulerPartie(bots: Bot[], graine: number): ResultatPartie {
  const inscriptions = bots.map((bot, i) => ({ nom: `${bot.nom} ${i + 1}`, couleur: COULEURS[i]! }));
  let etat: Etat = createGame(inscriptions, graine);
  const asymetrieDeDepart = etat.joueurs.map((joueur) =>
    [...joueur.main, ...joueur.pioche].filter((id) => carte(id).origine === 'asymetrie'),
  );
  const des = { rng: graine ^ 0x5bd1e995 };
  const hasard = () => alea(des);

  for (let i = 0; i < ACTIONS_MAX && !isGameOver(etat); i++) {
    const action = choisirAction(etat, bots[etat.attente!.joueur]!, hasard);
    if (!action) break;
    etat = applyAction(etat, action);
  }

  const vainqueur = etat.vainqueur;
  const gagnant = vainqueur === null ? null : etat.joueurs[vainqueur]!;
  const actionsDeTour = ['jouer', 'acheter', 'finLignee', 'utiliserPrivilege'];
  return {
    graine,
    vainqueur,
    placeVainqueur:
      vainqueur === null
        ? null
        : ordreDuTour(etat, etat.premierJoueur).findIndex((joueur) => joueur.id === vainqueur),
    tours: etat.historique.filter((action) => actionsDeTour.includes(action.type)).length,
    ligneesVainqueur:
      vainqueur === null
        ? null
        : 1 + etat.historique.filter((a) => a.type === 'finLignee' && a.joueur === vainqueur).length,
    achats: etat.historique.flatMap((action) => (action.type === 'acheter' ? [action.carte] : [])),
    deckVainqueur: gagnant
      ? [...gagnant.pioche, ...gagnant.main, ...gagnant.aireDeJeu, ...gagnant.defausse].filter(
          (id) => carte(id).origine === 'avancee',
        )
      : [],
    privilegesVainqueur: gagnant ? [...gagnant.privileges] : [],
    asymetrieDeDepart,
    achatsParSiege: etat.joueurs.map((joueur) =>
      etat.historique.flatMap((action) => (action.type === 'acheter' && action.joueur === joueur.id ? [action.carte] : [])),
    ),
  };
}

export interface Resume {
  parties: number;
  terminees: number;
  /** Victoires par siège (dans l'ordre des bots donnés). */
  victoiresParSiege: number[];
  /** Victoires par place dans l'ordre du tour : premier joueur, deuxième… */
  victoiresParPlace: number[];
  toursMoyens: number;
  toursMin: number;
  toursMax: number;
  ligneesMoyennesVainqueur: number;
  /** Par carte Avancée : nombre d'achats, et nombre de decks vainqueurs qui la contiennent. */
  cartes: { id: string; nom: string; achats: number; decksVainqueurs: number }[];
  /** Par Privilège : nombre de vainqueurs qui le possédaient. */
  privileges: { numero: number; vainqueurs: number }[];
}

export function resumer(resultats: ResultatPartie[], nombreDeJoueurs: number): Resume {
  const terminees = resultats.filter((r) => r.vainqueur !== null);
  const tours = terminees.map((r) => r.tours);
  const somme = (valeurs: number[]) => valeurs.reduce((total, v) => total + v, 0);
  const compter = (listes: (string | number)[][]) => {
    const compte = new Map<string | number, number>();
    for (const liste of listes) for (const x of liste) compte.set(x, (compte.get(x) ?? 0) + 1);
    return compte;
  };
  const achats = compter(resultats.map((r) => r.achats));
  // Une carte compte 1 fois par deck vainqueur, même si elle ne peut y être qu'en un exemplaire.
  const decks = compter(terminees.map((r) => [...new Set(r.deckVainqueur)]));
  const privileges = compter(terminees.map((r) => r.privilegesVainqueur));

  return {
    parties: resultats.length,
    terminees: terminees.length,
    victoiresParSiege: Array.from(
      { length: nombreDeJoueurs },
      (_, siege) => terminees.filter((r) => r.vainqueur === siege).length,
    ),
    victoiresParPlace: Array.from(
      { length: nombreDeJoueurs },
      (_, place) => terminees.filter((r) => r.placeVainqueur === place).length,
    ),
    toursMoyens: terminees.length ? somme(tours) / terminees.length : 0,
    toursMin: tours.length ? Math.min(...tours) : 0,
    toursMax: tours.length ? Math.max(...tours) : 0,
    ligneesMoyennesVainqueur: terminees.length
      ? somme(terminees.map((r) => r.ligneesVainqueur ?? 0)) / terminees.length
      : 0,
    cartes: MATERIEL.cartes
      .filter((c) => c.origine === 'avancee')
      .map((c) => ({
        id: c.id,
        nom: c.nom,
        achats: achats.get(c.id) ?? 0,
        decksVainqueurs: decks.get(c.id) ?? 0,
      }))
      .sort((a, b) => b.achats - a.achats),
    privileges: MATERIEL.privileges
      .map((p) => ({ numero: p.numero, vainqueurs: privileges.get(p.numero) ?? 0 }))
      .sort((a, b) => b.vainqueurs - a.vainqueurs),
  };
}

function pourcent(part: number, total: number): string {
  return total === 0 ? '—' : `${((100 * part) / total).toFixed(1)} %`;
}

/** Met un résumé en forme de texte lisible. */
export function formaterResume(resume: Resume, bots: Bot[]): string {
  const { terminees } = resume;
  const places = ['1er joueur', '2e joueur', '3e joueur', '4e joueur'];
  const lignes = [
    `=== ${bots.length} joueurs — ${resume.parties} parties ===`,
    `Parties terminées : ${terminees} (${pourcent(terminees, resume.parties)})`,
    `Durée : ${resume.toursMoyens.toFixed(1)} tours en moyenne (de ${resume.toursMin} à ${resume.toursMax}), ` +
      `${resume.ligneesMoyennesVainqueur.toFixed(1)} lignées pour le vainqueur`,
    '',
    'Victoires selon la place dans l\'ordre du tour :',
    ...resume.victoiresParPlace.map((v, i) => `  ${places[i]} : ${pourcent(v, terminees)}`),
    '',
    'Victoires par siège :',
    ...resume.victoiresParSiege.map((v, i) => `  Siège ${i + 1} (${bots[i]!.nom}) : ${pourcent(v, terminees)}`),
    '',
    'Cartes Avancée — achats par partie, et présence dans le deck du vainqueur :',
    ...resume.cartes.map(
      (c) =>
        `  ${c.nom.padEnd(22)} ${(c.achats / resume.parties).toFixed(2).padStart(5)}   ${pourcent(c.decksVainqueurs, terminees).padStart(7)}`,
    ),
    '',
    'Privilèges — part des vainqueurs qui les possédaient :',
    ...resume.privileges.map(
      (p) => `  Privilège ${String(p.numero).padStart(2)} : ${pourcent(p.vainqueurs, terminees).padStart(7)}`,
    ),
  ];
  return lignes.join('\n');
}
