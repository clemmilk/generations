import type { TypeDeBot } from '../ai/index.ts';
import type { Action } from '../game/actions.ts';
import type { PartieExportee } from '../game/export.ts';
import type { Couleur } from '../game/materiel/index.ts';
import type { Vue } from '../game/vue.ts';

// Ce que le serveur et les navigateurs s'envoient. Ce fichier ne contient que des descriptions :
// il est partagé par le serveur et par l'interface.

/** Qui tient un siège : personne encore, un humain, ou l'un des bots. */
export type TypeDeSiege = 'libre' | 'humain' | TypeDeBot;

export type Phase = 'attente' | 'jeu' | 'finie';

export interface SiegePublic {
  type: TypeDeSiege;
  nom: string;
  couleur: Couleur;
  /** false si le joueur humain a perdu sa connexion. Toujours true pour une IA. */
  connecte: boolean;
}

/** Tout ce qu'un joueur reçoit du serveur, à chaque changement. Rien de caché pour lui n'y figure. */
export interface Instantane {
  code: string;
  phase: Phase;
  sieges: SiegePublic[];
  /** Le siège de l'hôte, qui règle le salon et lance la partie. */
  hote: number;
  /** Mon siège, ou null si je n'en ai pas. */
  monSiege: number | null;
  /** Ma vue de la partie, une fois lancée. */
  vue: Vue | null;
  /** Les actions que j'ai le droit de faire maintenant. */
  actions: Action[];
  /** La partie complète, pour l'exporter : seulement une fois terminée, car elle contient tout. */
  partie: PartieExportee | null;
}

/** Ce qu'un navigateur peut demander au serveur. */
export interface Demandes {
  creer: { jeton: string; pseudo: string; nombre: number };
  rejoindre: { code: string; jeton: string; pseudo: string };
  /** Hôte, avant le lancement : changer le nombre de joueurs. */
  nombre: { nombre: number };
  /** Hôte, avant le lancement : mettre une IA sur un siège, ou le libérer. */
  siege: { siege: number; type: 'libre' | TypeDeBot };
  lancer: Record<string, never>;
  action: { action: Action };
  /** Hôte, en cours de partie : remplacer par une IA un joueur déconnecté. */
  remplacer: { siege: number; type: TypeDeBot };
  /** Hôte, partie finie : revenir au salon pour en lancer une autre. */
  revanche: Record<string, never>;
  quitter: Record<string, never>;
}
