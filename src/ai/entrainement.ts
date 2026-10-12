import { alea } from '../game/hasard.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import type { Poids } from './poids.ts';
import { creerBotPreferences } from './preferences.ts';
import { simulerPartie } from './simulation.ts';

// Entraînement du bot à préférences, en jouant contre lui-même.
//
// Principe : à chaque génération, on fabrique des variantes du champion en modifiant un peu ses poids.
// Chaque variante joue une série de parties contre le champion. La meilleure est rejouée sur une série
// plus longue, avec d'autres graines : si elle confirme, elle devient le nouveau champion.

/** Les poids que l'entraînement fait varier. « or » n'en fait pas partie : c'est l'unité de mesure. */
const POIDS_REGLABLES = [
  'pioche',
  'piocheCarte',
  'piocheProche',
  'trash',
  'recherche',
  'lvlupEconomie',
  'lvlupPopulation',
  'privilege',
  'rejouer',
  'pierre',
  'metal',
  'erudit',
  'achat',
  'finLignee',
  'effetRouge',
  'seuilTrash',
  'parTranche',
] as const satisfies readonly (keyof Poids)[];

/** Un tirage selon une loi normale (moyenne 0, écart-type 1). */
function normale(hasard: () => number): number {
  const u = Math.max(hasard(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * hasard());
}

function arrondi(valeur: number): number {
  return Math.round(valeur * 100) / 100;
}

/** Fabrique une variante : environ la moitié des poids sont un peu modifiés, au hasard. */
export function muter(poids: Poids, hasard: () => number, force = 1): Poids {
  const variante: Poids = { ...poids, privileges: { ...poids.privileges } };
  for (const cle of POIDS_REGLABLES) {
    if (hasard() < 0.5) {
      const pas = (0.25 * Math.abs(poids[cle]) + 0.3) * force;
      variante[cle] = arrondi(poids[cle] + normale(hasard) * pas);
    }
  }
  // Nombre de cartes de trop à partir duquel le bot trashe tout : un entier, modifié plus rarement.
  if (hasard() < 0.2) {
    variante.margeFinale = Math.min(6, Math.max(0, poids.margeFinale + (hasard() < 0.5 ? -1 : 1)));
  }
  for (const privilege of MATERIEL.privileges) {
    if (hasard() < 0.3) {
      const actuel = poids.privileges[privilege.numero] ?? 1;
      variante.privileges[privilege.numero] = arrondi(Math.max(0, actuel + normale(hasard) * 0.5 * force));
    }
  }
  return variante;
}

export interface Mesure {
  /** Force du candidat par rapport à la référence : 1 = égalité, 1.2 = il gagne 20 % de plus que sa part. */
  force: number;
  victoiresA2: number;
  partiesA2: number;
  victoiresA4: number;
  partiesA4: number;
}

/**
 * Mesure un candidat contre une référence. Pour chaque graine :
 * - 2 parties à 2 joueurs, en échangeant les sièges ;
 * - 1 partie à 4 joueurs, le candidat seul contre 3 références, à un siège qui tourne.
 */
export function mesurer(candidat: Poids, reference: Poids, graines: number[]): Mesure {
  const a = creerBotPreferences('candidat', candidat);
  const b = creerBotPreferences('référence', reference);
  const mesure: Mesure = { force: 1, victoiresA2: 0, partiesA2: 0, victoiresA4: 0, partiesA4: 0 };

  for (const graine of graines) {
    for (const siege of [0, 1]) {
      const resultat = simulerPartie(siege === 0 ? [a, b] : [b, a], graine);
      if (resultat.vainqueur === null) continue;
      mesure.partiesA2++;
      if (resultat.vainqueur === siege) mesure.victoiresA2++;
    }
    const siege = Math.abs(graine) % 4;
    const resultat = simulerPartie(
      [0, 1, 2, 3].map((i) => (i === siege ? a : b)),
      graine,
    );
    if (resultat.vainqueur !== null) {
      mesure.partiesA4++;
      if (resultat.vainqueur === siege) mesure.victoiresA4++;
    }
  }

  // À force égale, le candidat gagne 1 partie sur 2 à deux joueurs et 1 sur 4 à quatre.
  const a2 = mesure.partiesA2 ? mesure.victoiresA2 / mesure.partiesA2 / 0.5 : 1;
  const a4 = mesure.partiesA4 ? mesure.victoiresA4 / mesure.partiesA4 / 0.25 : 1;
  mesure.force = (a2 + a4) / 2;
  return mesure;
}

export interface OptionsEntrainement {
  /** Les poids de départ. */
  depart: Poids;
  generations: number;
  /** Nombre de variantes essayées à chaque génération. */
  variantes: number;
  /** Nombre de graines pour comparer les variantes entre elles (3 parties par graine). */
  graines: number;
  /** Nombre de graines pour confirmer la meilleure variante. */
  grainesDeConfirmation: number;
  /** Force à atteindre en confirmation pour détrôner le champion (1 = égalité). */
  seuil: number;
  graine: number;
}

export interface EtapeEntrainement {
  generation: number;
  /** Force de la meilleure variante lors de la comparaison, puis lors de la confirmation. */
  essai: number;
  confirmation: number;
  /** true si la variante a remplacé le champion. */
  adoptee: boolean;
  /** Le champion à la fin de cette génération. */
  champion: Poids;
}

/** Lance l'entraînement. « surProgres » est appelé à la fin de chaque génération. */
export function entrainer(
  options: OptionsEntrainement,
  surProgres: (etape: EtapeEntrainement) => void = () => {},
): EtapeEntrainement[] {
  const des = { rng: options.graine };
  const hasard = () => alea(des);
  // Chaque série de parties utilise des graines neuves, pour ne pas s'habituer à certaines parties.
  let prochaineGraine = options.graine * 1000 + 1;
  const serie = (taille: number) => Array.from({ length: taille }, () => prochaineGraine++);

  let champion = options.depart;
  const etapes: EtapeEntrainement[] = [];
  for (let generation = 1; generation <= options.generations; generation++) {
    const graines = serie(options.graines);
    let meilleure = champion;
    let essai = -Infinity;
    for (let i = 0; i < options.variantes; i++) {
      const variante = muter(champion, hasard);
      const force = mesurer(variante, champion, graines).force;
      if (force > essai) {
        essai = force;
        meilleure = variante;
      }
    }

    const confirmation = mesurer(meilleure, champion, serie(options.grainesDeConfirmation)).force;
    const adoptee = confirmation >= options.seuil;
    if (adoptee) champion = meilleure;
    const etape = { generation, essai, confirmation, adoptee, champion };
    etapes.push(etape);
    surProgres(etape);
  }
  return etapes;
}
