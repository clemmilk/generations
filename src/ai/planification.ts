import type { Action } from '../game/actions.ts';
import { alea } from '../game/hasard.ts';
import { applyAction, getLegalActions, getPlayerView } from '../game/index.ts';
import type { Etat } from '../game/index.ts';
import type { Vue } from '../game/vue.ts';
import type { Bot } from './bot.ts';
import { imaginerEtat } from './imagination.ts';

// Bot « qui planifie » : avant de choisir, il joue la suite de la partie dans sa tête.
//
// Pour chaque action possible, il imagine une partie complète compatible avec ce qu'il voit, applique
// l'action, puis laisse tout le monde jouer comme le bot « guide » jusqu'à la fin. Il recommence
// plusieurs fois et garde l'action qui l'a fait gagner le plus souvent.
// Les actions peu prometteuses sont abandonnées en cours de route, pour concentrer l'effort sur les meilleures.

export interface OptionsDePlanification {
  /** Le bot qui joue la suite de la partie dans les simulations (pour tous les joueurs). */
  guide: Bot;
  /** Nombre total de parties simulées pour une décision. */
  simulations: number;
  /**
   * Écart de taux de victoire à partir duquel le bot préfère une action à l'avis de son guide
   * (0.1 par défaut : il faut gagner 10 points de plus dans les simulations).
   */
  marge?: number;
  /** Une simulation est abandonnée (et comptée comme une demi-victoire) au-delà de ce nombre d'actions. */
  actionsMax?: number;
}

/** Joue une partie imaginée jusqu'au bout avec le guide. Renvoie 1 si « moi » gagne, 0 sinon. */
function terminer(depart: Etat, moi: number, guide: Bot, hasard: () => number, actionsMax: number): number {
  let etat = depart;
  for (let i = 0; i < actionsMax && etat.vainqueur === null && etat.attente; i++) {
    const joueur = etat.attente.joueur;
    const actions = getLegalActions(etat, joueur);
    if (actions.length === 0) break;
    etat = applyAction(etat, guide.choisir(getPlayerView(etat, joueur), actions, hasard));
  }
  if (etat.vainqueur === null) return 0.5;
  return etat.vainqueur === moi ? 1 : 0;
}

function choisir(vue: Vue, actions: Action[], options: OptionsDePlanification, hasard: () => number): Action {
  if (actions.length === 1) return actions[0]!;
  const actionsMax = options.actionsMax ?? 1500;
  // À force égale, le bot suit l'avis de son guide.
  const avisDuGuide = options.guide.choisir(vue, actions, hasard);

  let candidats = actions.map((action) => ({ action, total: 0, parties: 0 }));
  // Chaque simulation a sa graine : toutes les actions sont jugées sur les mêmes parties imaginées.
  const graines: number[] = [];
  const graine = (i: number) => {
    while (graines.length <= i) graines.push(Math.floor(hasard() * 0x7fffffff));
    return graines[i]!;
  };

  // Élimination progressive : à chaque manche, chaque action encore en lice reçoit le même nombre
  // de simulations, puis la moitié la moins bonne est écartée.
  const manches = Math.max(1, Math.ceil(Math.log2(candidats.length)));
  const parManche = options.simulations / manches;
  for (let manche = 0; manche < manches; manche++) {
    const chacun = Math.max(1, Math.floor(parManche / candidats.length));
    for (const candidat of candidats) {
      for (let k = 0; k < chacun; k++) {
        const des = { rng: graine(candidat.parties) };
        const tirage = () => alea(des);
        const imagine = imaginerEtat(vue, tirage);
        candidat.total += terminer(applyAction(imagine, candidat.action), vue.moi, options.guide, tirage, actionsMax);
        candidat.parties++;
      }
    }
    candidats.sort((a, b) => b.total / b.parties - a.total / a.parties);
    if (candidats.length > 1) {
      const gardes = candidats.slice(0, Math.ceil(candidats.length / 2));
      // L'avis du guide n'est jamais écarté : c'est à lui que les autres actions sont comparées.
      const duGuide = candidats.find((candidat) => candidat.action === avisDuGuide);
      if (duGuide && !gardes.includes(duGuide)) gardes.push(duGuide);
      candidats = gardes;
    }
  }

  // Les simulations sont bruitées : le bot ne s'écarte de l'avis de son guide que pour une action
  // nettement meilleure, et non pour un écart qui peut venir du hasard.
  const meilleur = candidats[0]!;
  const duGuide = candidats.find((candidat) => candidat.action === avisDuGuide);
  if (!duGuide || meilleur === duGuide) return meilleur.action;
  const ecart = meilleur.total / meilleur.parties - duGuide.total / duGuide.parties;
  return ecart >= (options.marge ?? 0.1) ? meilleur.action : avisDuGuide;
}

/** Crée un bot qui planifie en simulant la suite de la partie avec le bot « guide ». */
export function creerBotPlanificateur(nom: string, options: OptionsDePlanification): Bot {
  return {
    nom,
    choisir(vue, actions, hasard) {
      return choisir(vue, actions, options, hasard);
    },
  };
}
