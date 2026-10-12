import { BOTS, choisirAction } from '../ai/index.ts';
import type { TypeDeBot } from '../ai/index.ts';
import type { Action } from '../game/actions.ts';
import {
  applyAction,
  createGame,
  exporterPartie,
  getLegalActions,
  getPlayerView,
} from '../game/index.ts';
import type { Etat } from '../game/index.ts';
import type { Couleur } from '../game/materiel/index.ts';
import { PARAMETRES } from '../game/parametres.ts';
import type { Instantane, Phase, TypeDeSiege } from './protocole.ts';

// Un salon : des sièges, puis une partie. Toute la logique est ici, sans réseau, pour pouvoir la tester.
// Chaque joueur est reconnu par un « jeton » secret gardé dans son navigateur : il lui permet de
// retrouver son siège après un rechargement de page. Un jeton n'est jamais envoyé aux autres joueurs.

const COULEURS: Couleur[] = ['bleu', 'jaune', 'rouge', 'vert'];
const NOMS_DES_COULEURS: Record<Couleur, string> = { bleu: 'Bleu', jaune: 'Jaune', rouge: 'Rouge', vert: 'Vert' };

interface Siege {
  type: TypeDeSiege;
  nom: string;
  /** Le jeton du joueur humain assis ici, null pour un siège libre ou une IA. */
  jeton: string | null;
  connecte: boolean;
}

export interface Salon {
  code: string;
  /** Le jeton de l'hôte. */
  hote: string;
  sieges: Siege[];
  /** La partie en cours ou terminée, null tant qu'elle n'est pas lancée. */
  etat: Etat | null;
  /** Date de la dernière activité, pour supprimer les salons abandonnés. */
  activite: number;
}

function siegeLibre(): Siege {
  return { type: 'libre', nom: '', jeton: null, connecte: false };
}

function siegeIA(type: TypeDeBot, index: number): Siege {
  return { type, nom: `${NOMS_DES_COULEURS[COULEURS[index]!]} (${BOTS[type].nom})`, jeton: null, connecte: true };
}

function nettoyerPseudo(pseudo: string): string {
  const propre = pseudo.trim().replace(/\s+/g, ' ').slice(0, 20);
  if (propre === '') throw new Error('Il faut choisir un pseudo.');
  return propre;
}

function verifierNombre(nombre: number): void {
  if (!Number.isInteger(nombre) || nombre < PARAMETRES.joueursMin || nombre > PARAMETRES.joueursMax) {
    throw new Error(`Une partie se joue de ${PARAMETRES.joueursMin} à ${PARAMETRES.joueursMax} joueurs.`);
  }
}

export function phase(salon: Salon): Phase {
  if (salon.etat === null) return 'attente';
  return salon.etat.vainqueur === null ? 'jeu' : 'finie';
}

function siegeDe(salon: Salon, jeton: string): number {
  return salon.sieges.findIndex((siege) => siege.jeton === jeton);
}

function exigerHote(salon: Salon, jeton: string): void {
  if (salon.hote !== jeton) throw new Error('Seul l\'hôte du salon peut faire cela.');
}

function exigerAttente(salon: Salon): void {
  if (phase(salon) !== 'attente') throw new Error('La partie a déjà commencé.');
}

export function creerSalon(code: string, jeton: string, pseudo: string, nombre: number): Salon {
  verifierNombre(nombre);
  const sieges = Array.from({ length: nombre }, siegeLibre);
  sieges[0] = { type: 'humain', nom: nettoyerPseudo(pseudo), jeton, connecte: true };
  return { code, hote: jeton, sieges, etat: null, activite: Date.now() };
}

/**
 * Fait entrer un joueur dans le salon et renvoie son siège. S'il y avait déjà un siège (même jeton),
 * il le retrouve, même en cours de partie.
 */
export function rejoindre(salon: Salon, jeton: string, pseudo: string): number {
  const deja = siegeDe(salon, jeton);
  if (deja !== -1) {
    const siege = salon.sieges[deja]!;
    siege.connecte = true;
    if (phase(salon) === 'attente') siege.nom = nettoyerPseudo(pseudo);
    return deja;
  }
  exigerAttente(salon);
  const libre = salon.sieges.findIndex((siege) => siege.type === 'libre');
  if (libre === -1) throw new Error('Ce salon est complet.');
  salon.sieges[libre] = { type: 'humain', nom: nettoyerPseudo(pseudo), jeton, connecte: true };
  return libre;
}

/** Hôte, avant le lancement : change le nombre de sièges. On ne peut pas retirer le siège d'un joueur présent. */
export function changerNombre(salon: Salon, jeton: string, nombre: number): void {
  exigerHote(salon, jeton);
  exigerAttente(salon);
  verifierNombre(nombre);
  if (salon.sieges.slice(nombre).some((siege) => siege.type === 'humain')) {
    throw new Error('Un joueur occupe un des sièges à retirer.');
  }
  while (salon.sieges.length < nombre) salon.sieges.push(siegeLibre());
  salon.sieges.length = nombre;
}

/** Hôte, avant le lancement : met une IA sur un siège, ou le libère. */
export function reglerSiege(salon: Salon, jeton: string, index: number, type: 'libre' | TypeDeBot): void {
  exigerHote(salon, jeton);
  exigerAttente(salon);
  const siege = salon.sieges[index];
  if (!siege) throw new Error('Ce siège n\'existe pas.');
  if (siege.type === 'humain') throw new Error('Ce siège est occupé par un joueur.');
  if (type !== 'libre' && !(type in BOTS)) throw new Error('Cette IA n\'existe pas.');
  salon.sieges[index] = type === 'libre' ? siegeLibre() : siegeIA(type, index);
}

export function lancer(salon: Salon, jeton: string, graine: number): void {
  exigerHote(salon, jeton);
  exigerAttente(salon);
  if (salon.sieges.some((siege) => siege.type === 'libre')) {
    throw new Error('Il reste des sièges libres : invite un joueur ou mets-y une IA.');
  }
  salon.etat = createGame(
    salon.sieges.map((siege, i) => ({ nom: siege.nom, couleur: COULEURS[i]! })),
    graine,
  );
}

/** Applique l'action d'un joueur humain. Le siège est déduit du jeton : on ne peut pas jouer pour un autre. */
export function jouer(salon: Salon, jeton: string, action: Action): void {
  const siege = siegeDe(salon, jeton);
  if (siege === -1) throw new Error('Tu n\'as pas de siège dans cette partie.');
  if (!salon.etat) throw new Error('La partie n\'a pas commencé.');
  salon.etat = applyAction(salon.etat, { ...action, joueur: siege });
}

/** Le bot qui doit jouer maintenant, ou null si c'est à un humain (ou si la partie n'est pas en cours). */
function botEnAttente(salon: Salon): TypeDeBot | null {
  const decideur = salon.etat?.attente?.joueur;
  if (decideur === undefined || phase(salon) !== 'jeu') return null;
  const type = salon.sieges[decideur]?.type;
  return type === undefined || type === 'humain' || type === 'libre' ? null : type;
}

export function tourDUneIA(salon: Salon): boolean {
  return botEnAttente(salon) !== null;
}

/** Fait jouer une action à l'IA dont c'est le tour. Renvoie false s'il n'y avait rien à jouer. */
export function jouerIA(salon: Salon, hasard: () => number = Math.random): boolean {
  const type = botEnAttente(salon);
  if (type === null || !salon.etat) return false;
  const action = choisirAction(salon.etat, BOTS[type], hasard);
  if (!action) return false;
  salon.etat = applyAction(salon.etat, action);
  return true;
}

/** Note qu'un joueur a perdu sa connexion. Il garde son siège : il peut revenir avec le même jeton. */
export function deconnecter(salon: Salon, jeton: string): void {
  const siege = salon.sieges[siegeDe(salon, jeton)];
  if (siege) siege.connecte = false;
}

/**
 * Avant le lancement, libère le siège d'un joueur parti pour de bon.
 * En cours de partie, le siège est gardé : c'est à l'hôte de le confier à une IA s'il le souhaite.
 */
export function liberer(salon: Salon, jeton: string): void {
  const index = siegeDe(salon, jeton);
  if (index === -1) return;
  if (phase(salon) !== 'attente') {
    salon.sieges[index]!.connecte = false;
    return;
  }
  salon.sieges[index] = siegeLibre();
  // Si l'hôte s'en va, le premier joueur restant le remplace.
  if (salon.hote === jeton) {
    const suivant = salon.sieges.find((siege) => siege.type === 'humain');
    if (suivant?.jeton) salon.hote = suivant.jeton;
  }
}

/** Hôte, en cours de partie : remplace par une IA un joueur qui a perdu sa connexion. */
export function remplacerParIA(salon: Salon, jeton: string, index: number, type: TypeDeBot): void {
  exigerHote(salon, jeton);
  if (phase(salon) !== 'jeu') throw new Error('Aucune partie n\'est en cours.');
  const siege = salon.sieges[index];
  if (!siege || siege.type !== 'humain') throw new Error('Ce siège n\'est pas tenu par un joueur.');
  if (siege.connecte) throw new Error('Ce joueur est toujours connecté.');
  if (!(type in BOTS)) throw new Error('Cette IA n\'existe pas.');
  // Le nom du joueur reste affiché dans la partie ; seul le pilote change.
  salon.sieges[index] = { type, nom: siege.nom, jeton: null, connecte: true };
}

/** Hôte, partie finie : revient au salon avec les mêmes sièges, pour relancer une partie. */
export function revanche(salon: Salon, jeton: string): void {
  exigerHote(salon, jeton);
  if (phase(salon) !== 'finie') throw new Error('La partie n\'est pas terminée.');
  salon.etat = null;
  // Les joueurs partis entre-temps libèrent leur siège.
  salon.sieges = salon.sieges.map((siege) => (siege.type === 'humain' && !siege.connecte ? siegeLibre() : siege));
}

/** true s'il ne reste plus aucun humain connecté : le salon peut être supprimé. */
export function estVide(salon: Salon): boolean {
  return !salon.sieges.some((siege) => siege.type === 'humain' && siege.connecte);
}

/** Ce que le serveur envoie à ce joueur : l'état du salon et, en partie, sa vue et ses actions. */
export function instantane(salon: Salon, jeton: string): Instantane {
  const monSiege = siegeDe(salon, jeton);
  const etat = salon.etat;
  const enPartie = etat !== null && monSiege !== -1;
  return {
    code: salon.code,
    phase: phase(salon),
    sieges: salon.sieges.map((siege, i) => ({
      type: siege.type,
      nom: siege.nom,
      couleur: COULEURS[i]!,
      connecte: siege.type === 'humain' ? siege.connecte : siege.type !== 'libre',
    })),
    hote: Math.max(0, siegeDe(salon, salon.hote)),
    monSiege: monSiege === -1 ? null : monSiege,
    vue: enPartie ? getPlayerView(etat, monSiege) : null,
    actions: enPartie ? getLegalActions(etat, monSiege) : [],
    partie: etat !== null && phase(salon) === 'finie' ? exporterPartie(etat) : null,
  };
}
