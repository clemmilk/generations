import type { Action } from '../../src/game/actions.ts';
import { applyAction, createGame, getLegalActions } from '../../src/game/index.ts';
import type { Etat, Inscription } from '../../src/game/index.ts';
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
 */
export function scene(zones: Zones = {}, nombreDeJoueurs = 2): Etat {
  const etat = createGame(inscriptions(nombreDeJoueurs), 42);
  etat.premierJoueur = 0;
  etat.joueurActif = 0;
  etat.attente = { type: 'tour', joueur: 0 };
  etat.journal = [];
  installer(etat, 0, { or: 0, ...zones });
  return etat;
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
