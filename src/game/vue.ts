import type { Etat } from './etat.ts';
import type { Couleur } from './materiel/index.ts';

// Ce qu'un joueur a le droit de voir. C'est la seule forme de l'état envoyée aux joueurs.

export interface VueJoueur {
  id: number;
  nom: string;
  couleur: Couleur;
  or: number;
  nbCartesPioche: number;
  nbCartesMain: number;
  /** La main, uniquement pour le joueur qui regarde. null pour ses adversaires. */
  main: string[] | null;
  /**
   * Les cartes de sa propre pioche, triées (donc sans leur ordre réel). null pour ses adversaires.
   * Un joueur connaît toujours le contenu de son deck, mais pas l'ordre des cartes.
   */
  contenuPioche: string[] | null;
  aireDeJeu: string[];
  defausse: string[];
  niveauEconomie: number;
  niveauPopulation: number;
  privileges: number[];
}

export interface Vue {
  /** Le joueur pour qui cette vue a été préparée. */
  moi: number;
  joueurs: VueJoueur[];
  premierJoueur: number;
  joueurActif: number;
  riviere: string[];
  nbCartesPiocheCommune: number;
  privilegesVisibles: number[];
  nbPrivilegesPioche: number;
  trash: string[];
  vainqueur: number | null;
  journal: { joueur: number | null; texte: string }[];
}

export function getPlayerView(etat: Etat, moi: number): Vue {
  if (!etat.joueurs[moi]) throw new Error(`Joueur inconnu : ${moi}`);
  return {
    moi,
    joueurs: etat.joueurs.map((joueur) => ({
      id: joueur.id,
      nom: joueur.nom,
      couleur: joueur.couleur,
      or: joueur.or,
      nbCartesPioche: joueur.pioche.length,
      nbCartesMain: joueur.main.length,
      main: joueur.id === moi ? [...joueur.main] : null,
      contenuPioche: joueur.id === moi ? [...joueur.pioche].sort() : null,
      aireDeJeu: [...joueur.aireDeJeu],
      defausse: [...joueur.defausse],
      niveauEconomie: joueur.niveauEconomie,
      niveauPopulation: joueur.niveauPopulation,
      privileges: [...joueur.privileges],
    })),
    premierJoueur: etat.premierJoueur,
    joueurActif: etat.joueurActif,
    riviere: [...etat.riviere],
    nbCartesPiocheCommune: etat.piocheCommune.length,
    privilegesVisibles: [...etat.privilegesVisibles],
    nbPrivilegesPioche: etat.piochePrivileges.length,
    trash: [...etat.trash],
    vainqueur: etat.vainqueur,
    journal: etat.journal.map((entree) => ({
      joueur: entree.joueur,
      texte:
        entree.detail !== null && entree.joueur === moi
          ? `${entree.texte} ${entree.detail}`
          : entree.texte,
    })),
  };
}
