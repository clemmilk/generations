import type { Action, Attente, Tache } from './actions.ts';
import type { Couleur } from './materiel/index.ts';

// L'état complet d'une partie. Il contient TOUT, y compris les informations cachées :
// il ne doit jamais être envoyé tel quel à un joueur (voir vue.ts).

export interface Joueur {
  /** Numéro de siège, de 0 à (nombre de joueurs - 1). */
  id: number;
  nom: string;
  couleur: Couleur;
  or: number;
  /** Identifiants des cartes de la pioche. La première est celle du dessus. */
  pioche: string[];
  main: string[];
  aireDeJeu: string[];
  defausse: string[];
  /** Niveau sur la piste Économie, 0 = niveau de départ. */
  niveauEconomie: number;
  /** Niveau sur la piste Population, 0 = niveau de départ. */
  niveauPopulation: number;
  /** Numéros des Privilèges possédés, dans l'ordre des emplacements de la piste Noblesse. */
  privileges: number[];
}

export interface EntreeJournal {
  /** Le joueur concerné, ou null pour un événement général. */
  joueur: number | null;
  /** Ce que tout le monde peut lire. */
  texte: string;
  /** Précision que seul le joueur concerné peut lire (par exemple les cartes piochées). */
  detail: string | null;
}

export interface Etat {
  /** État du générateur de hasard. Le même état de départ redonne toujours la même partie. */
  rng: number;
  joueurs: Joueur[];
  premierJoueur: number;
  joueurActif: number;
  /** Pioche commune des cartes Avancée. La première est celle du dessus. */
  piocheCommune: string[];
  riviere: string[];
  /** Pioche des tuiles Privilège (numéros). La première est celle du dessus. */
  piochePrivileges: number[];
  privilegesVisibles: number[];
  /** Cartes trashées, tous joueurs confondus. */
  trash: string[];
  /** Cartes Assymétrie non distribuées, écartées de la partie. */
  asymetrieEcartees: string[];
  /** Le choix attendu d'un joueur. null uniquement quand la partie est finie. */
  attente: Attente | null;
  /** Ce qu'il reste à résoudre avant la fin du tour, dans l'ordre. */
  file: Tache[];
  /** Nombre de tours que le joueur actif rejouera après celui-ci (Rejouer). */
  toursSupplementaires: number;
  /** Joueurs ayant déjà reçu l'Or du Privilège 20 pour la carte en cours de résolution. */
  bonusEffetRouge: number[];
  vainqueur: number | null;
  journal: EntreeJournal[];
  /** Toutes les actions jouées, dans l'ordre : avec la graine, elles permettent de rejouer la partie. */
  historique: Action[];
}

/** Ce qu'il faut pour inscrire un joueur à une partie. */
export interface Inscription {
  nom: string;
  couleur: Couleur;
}
