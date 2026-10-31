// Cœur de calcul de « npm run analyse » : joue les parties qu'on lui confie et renvoie leurs observations.
// Lancé par scripts/analyse.ts quand on lui demande plusieurs cœurs (--coeurs N).

import { parentPort, workerData } from 'node:worker_threads';
import { BOTS } from '../src/ai/index.ts';
import type { TypeDeBot } from '../src/ai/index.ts';
import { observerPartie } from '../src/ai/observation.ts';
import type { ObservationPartie } from '../src/ai/observation.ts';
import { creerBotPlanificateur } from '../src/ai/planification.ts';
import { PARAMETRES } from '../src/game/parametres.ts';

export interface ReglagesOuvrier {
  type: TypeDeBot;
  simulations: number;
  effetRouge: string;
}

/** Un paquet de parties : une taille de table et une plage de graines. */
export interface PaquetAnalyse {
  table: number;
  premiere: number;
  nombre: number;
}

export interface ResultatAnalyse {
  table: number;
  parties: ObservationPartie[];
}

const { type, simulations, effetRouge } = workerData as ReglagesOuvrier;
(PARAMETRES as Record<string, unknown>).effetRougePour = effetRouge;
const bot =
  type === 'planificatrice'
    ? creerBotPlanificateur(`IA qui planifie (${simulations} simulations)`, { guide: BOTS.entrainee, simulations })
    : BOTS[type];

parentPort!.on('message', (paquet: PaquetAnalyse) => {
  const parties = Array.from({ length: paquet.nombre }, (_, i) => observerPartie(Array(paquet.table).fill(bot), paquet.premiere + i));
  parentPort!.postMessage({ table: paquet.table, parties } satisfies ResultatAnalyse);
});
