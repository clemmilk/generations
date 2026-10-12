import type { Action } from './actions.ts';
import { createGame } from './creation.ts';
import type { Etat, Inscription } from './etat.ts';
import { applyAction } from './moteur.ts';

// Export d'une partie pour reproduire un bug : la graine, les joueurs et la suite des actions
// suffisent à rejouer la partie à l'identique.
// Attention : cet export contient les informations cachées. Il ne doit pas être donné à un joueur en cours de partie.

export interface PartieExportee {
  version: 1;
  graine: number;
  joueurs: Inscription[];
  actions: Action[];
  /** Le journal complet, détails privés compris, pour lire la partie sans la rejouer. */
  journal: string[];
}

export function exporterPartie(etat: Etat): PartieExportee {
  return {
    version: 1,
    graine: etat.graine,
    joueurs: etat.joueurs.map((joueur) => ({ nom: joueur.nom, couleur: joueur.couleur })),
    actions: etat.historique,
    journal: etat.journal.map((entree) =>
      entree.detail === null ? entree.texte : `${entree.texte} ${entree.detail}`,
    ),
  };
}

/**
 * Rejoue une partie exportée et renvoie tous les états successifs, du premier au dernier.
 * Lève une erreur si une action n'est plus permise (les règles ont changé depuis l'export, par exemple).
 */
export function rejouerPartie(partie: PartieExportee): Etat[] {
  const etats = [createGame(partie.joueurs, partie.graine)];
  partie.actions.forEach((action, numero) => {
    try {
      etats.push(applyAction(etats[etats.length - 1]!, action));
    } catch (erreur) {
      throw new Error(`Action n°${numero + 1} impossible à rejouer. ${(erreur as Error).message}`);
    }
  });
  return etats;
}
