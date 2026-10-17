import { afterEach, beforeEach } from 'vitest';
import { PARAMETRES } from '../../src/game/parametres.ts';
import type { Action } from '../../src/game/actions.ts';
import { applyAction, createGame, getLegalActions, getPlayerView } from '../../src/game/index.ts';
import type { Etat, Inscription } from '../../src/game/index.ts';
import { alea } from '../../src/game/hasard.ts';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import type { Couleur } from '../../src/game/materiel/index.ts';

export const QUATRE_JOUEURS: Inscription[] = [
  { nom: 'Alice', couleur: 'bleu' },
  { nom: 'Bob', couleur: 'jaune' },
  { nom: 'Chloé', couleur: 'rouge' },
  { nom: 'David', couleur: 'vert' },
];

export function inscriptions(nombre: number): Inscription[] {
  return QUATRE_JOUEURS.slice(0, nombre);
}

/** L'identifiant d'une carte d'après son nom. Pour une carte de départ, préciser la couleur (bleu par défaut). */
export function c(nom: string, couleur: Couleur = 'bleu'): string {
  const trouvee = MATERIEL.cartes.find(
    (carte) => carte.nom === nom && (carte.couleur === null || carte.couleur === couleur),
  );
  if (!trouvee) throw new Error(`Carte de test inconnue : ${nom}`);
  return trouvee.id;
}

export interface Zones {
  main?: string[];
  aire?: string[];
  defausse?: string[];
  pioche?: string[];
  or?: number;
}

/** Remplace les cartes et l'Or d'un joueur. Les zones non précisées sont vidées, sauf la pioche. */
export function installer(etat: Etat, joueurId: number, zones: Zones): void {
  const joueur = etat.joueurs[joueurId]!;
  joueur.main = zones.main ?? [];
  joueur.aireDeJeu = zones.aire ?? [];
  joueur.defausse = zones.defausse ?? [];
  if (zones.pioche) joueur.pioche = zones.pioche;
  if (zones.or !== undefined) joueur.or = zones.or;
}

/**
 * Une partie prête pour un test : c'est au joueur 0 (Alice) de jouer, avec les cartes indiquées.
 * Sa pioche garde ses cartes d'origine si elle n'est pas précisée, et son Or vaut 0 par défaut.
 * Ses adversaires n'ont pas d'Or non plus : ils ne peuvent donc payer aucun Effet Rouge,
 * sauf si le test leur en donne avec installer().
 */
export function scene(zones: Zones = {}, nombreDeJoueurs = 2): Etat {
  const etat = createGame(inscriptions(nombreDeJoueurs), 42);
  etat.premierJoueur = 0;
  etat.joueurActif = 0;
  etat.attente = { type: 'tour', joueur: 0 };
  etat.journal = [];
  for (const joueur of etat.joueurs) joueur.or = 0;
  installer(etat, 0, { or: 0, ...zones });
  return etat;
}

function melange<T>(liste: T[], des: { rng: number }): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(alea(des) * (i + 1));
    [copie[i], copie[j]] = [copie[j]!, copie[i]!];
  }
  return copie;
}

/**
 * Renvoie la même partie où tout ce que le joueur « moi » ne peut pas savoir a été redistribué au hasard :
 * l'ordre de toutes les pioches, la répartition des cartes de chaque adversaire entre sa main et sa pioche,
 * et les cartes Assymétrie jamais vues (échangées entre adversaires et cartes écartées).
 * Si la vue de « moi » change après ce brouillage, c'est qu'elle laissait fuiter une information cachée.
 */
export function brouiller(etat: Etat, moi: number, graine = 1): Etat {
  const des = { rng: graine };
  const copie = structuredClone(etat);
  const jamaisVue = (id: string) =>
    MATERIEL.cartes.find((carte) => carte.id === id)!.origine === 'asymetrie' && !copie.cartesRevelees.includes(id);

  // Les cartes Assymétrie jamais vues des adversaires et les cartes écartées sont remises en commun.
  const libres = [...copie.asymetrieEcartees];
  for (const joueur of copie.joueurs) {
    if (joueur.id === moi) continue;
    libres.push(...[...joueur.main, ...joueur.pioche].filter(jamaisVue));
  }
  const redistribuees = melange(libres, des);

  for (const joueur of copie.joueurs) {
    if (joueur.id === moi) {
      joueur.pioche = melange(joueur.pioche, des);
      continue;
    }
    const cachees = [...joueur.main, ...joueur.pioche];
    const inconnues = cachees.filter(jamaisVue).length;
    const nouvelles = melange(
      [...cachees.filter((id) => !jamaisVue(id)), ...redistribuees.splice(0, inconnues)],
      des,
    );
    const taille = joueur.main.length;
    joueur.main = nouvelles.slice(0, taille);
    joueur.pioche = nouvelles.slice(taille);
  }
  copie.asymetrieEcartees = redistribuees;
  copie.piocheCommune = melange(copie.piocheCommune, des);
  copie.piochePrivileges = melange(copie.piochePrivileges, des);
  return copie;
}

/**
 * Vérifie qu'aucune vue ne laisse fuiter d'information cachée. Lève une erreur sinon.
 * - La vue d'un joueur ne doit pas changer quand on redistribue tout ce qu'il ignore.
 * - Elle ne doit nommer ni les cartes Assymétrie jamais vues des autres, ni les cartes de la pioche commune.
 */
export function verifierAucuneFuite(etat: Etat): void {
  for (const moi of etat.joueurs) {
    const vue = getPlayerView(etat, moi.id);
    const envoye = JSON.stringify(vue);
    for (const graine of [1, 2]) {
      if (JSON.stringify(getPlayerView(brouiller(etat, moi.id, graine), moi.id)) !== envoye) {
        throw new Error(`La vue de ${moi.nom} dépend d'une information cachée.`);
      }
    }
    const secretes = [
      ...etat.piocheCommune,
      ...etat.asymetrieEcartees,
      ...etat.joueurs
        .filter((joueur) => joueur.id !== moi.id)
        .flatMap((joueur) => [...joueur.main, ...joueur.pioche])
        .filter((id) => id.length > 0 && !vue.joueurs.some((j) => j.cartesCacheesConnues.includes(id))),
    ];
    for (const id of secretes) {
      if (envoye.includes(`"${id}"`)) throw new Error(`${id} est visible par ${moi.nom}`);
    }
  }
}

type SansJoueur<A> = A extends unknown ? Omit<A, 'joueur'> : never;

/** Applique des actions à la suite, chacune au nom du joueur dont le moteur attend un choix. */
export function faire(etat: Etat, ...actions: SansJoueur<Action>[]): Etat {
  let courant = etat;
  for (const action of actions) {
    if (!courant.attente) throw new Error('La partie est finie, plus aucune action possible.');
    courant = applyAction(courant, { ...action, joueur: courant.attente.joueur } as Action);
  }
  return courant;
}

/** Les actions permises au joueur dont le moteur attend un choix, sans le numéro de joueur. */
export function permises(etat: Etat): SansJoueur<Action>[] {
  if (!etat.attente) return [];
  return getLegalActions(etat, etat.attente.joueur).map(({ joueur, ...reste }) => reste) as SansJoueur<Action>[];
}

/** Les types d'actions permises, sans doublon. */
export function typesPermis(etat: Etat): string[] {
  return [...new Set(permises(etat).map((a) => a.type))];
}

/**
 * Change un réglage de src/game/parametres.ts le temps d'un groupe de tests (règles d'essai encore
 * disponibles), puis le remet comme avant. S'utilise dans un describe : avecReglage('carteAcheteeVa', 'main').
 */
export function avecReglage<K extends keyof typeof PARAMETRES>(cle: K, valeur: (typeof PARAMETRES)[K]): void {
  const reglages = PARAMETRES as Record<string, unknown>;
  let avant: unknown;
  beforeEach(() => {
    avant = reglages[cle];
    reglages[cle] = valeur;
  });
  afterEach(() => {
    reglages[cle] = avant;
  });
}
