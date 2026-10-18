import type { Attente, Tache } from './actions.ts';
import { carte } from './cartes.ts';
import type { Etat, Statistiques } from './etat.ts';
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
  /**
   * Ce que tout le monde sait des cartes cachées de ce joueur (sa main et sa pioche réunies, triées) :
   * ses cartes de départ, ses achats, et ses cartes Assymétrie déjà vues. On ne sait pas lesquelles
   * sont en main et lesquelles sont en pioche.
   */
  cartesCacheesConnues: string[];
  /** Le nombre de ses cartes cachées dont personne ne connaît l'identité (Assymétrie jamais vues). */
  nbCartesInconnues: number;
  aireDeJeu: string[];
  defausse: string[];
  niveauEconomie: number;
  niveauPopulation: number;
  privileges: number[];
  statistiques: Statistiques;
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
  /** Le choix attendu, et de qui : tout le monde voit qui doit décider quoi. */
  attente: Attente | null;
  /** Ce qu'il reste à résoudre avant la fin du tour (effets en cours, Effets Rouges à venir). */
  file: Tache[];
  toursSupplementaires: number;
  /** Joueurs ayant déjà appliqué l'Effet Rouge de la carte jouée pendant ce tour. */
  effetRougeUtilisePar: number[];
  vainqueur: number | null;
  /**
   * Le deck complet du vainqueur (pioche, main, aire de jeu et défausse), trié, montré à tous une fois
   * la partie terminée. null tant que la partie n'est pas finie : pendant la partie, rien n'est révélé.
   */
  deckDuVainqueur: string[] | null;
  journal: { joueur: number | null; texte: string }[];
}

function deckDuVainqueur(etat: Etat): string[] | null {
  const vainqueur = etat.vainqueur === null ? undefined : etat.joueurs[etat.vainqueur];
  if (!vainqueur) return null;
  return [...vainqueur.pioche, ...vainqueur.main, ...vainqueur.aireDeJeu, ...vainqueur.defausse].sort();
}

export function getPlayerView(etat: Etat, moi: number): Vue {
  if (!etat.joueurs[moi]) throw new Error(`Joueur inconnu : ${moi}`);
  const connue = (id: string) => carte(id).origine !== 'asymetrie' || etat.cartesRevelees.includes(id);
  return {
    moi,
    joueurs: etat.joueurs.map((joueur) => {
      const cachees = [...joueur.main, ...joueur.pioche];
      const connues = cachees.filter(connue).sort();
      return {
        id: joueur.id,
        nom: joueur.nom,
        couleur: joueur.couleur,
        or: joueur.or,
        nbCartesPioche: joueur.pioche.length,
        nbCartesMain: joueur.main.length,
        main: joueur.id === moi ? [...joueur.main] : null,
        contenuPioche: joueur.id === moi ? [...joueur.pioche].sort() : null,
        cartesCacheesConnues: connues,
        nbCartesInconnues: cachees.length - connues.length,
        aireDeJeu: [...joueur.aireDeJeu],
        defausse: [...joueur.defausse],
        niveauEconomie: joueur.niveauEconomie,
        niveauPopulation: joueur.niveauPopulation,
        privileges: [...joueur.privileges],
        statistiques: { ...joueur.statistiques },
      };
    }),
    premierJoueur: etat.premierJoueur,
    joueurActif: etat.joueurActif,
    riviere: [...etat.riviere],
    nbCartesPiocheCommune: etat.piocheCommune.length,
    privilegesVisibles: [...etat.privilegesVisibles],
    nbPrivilegesPioche: etat.piochePrivileges.length,
    trash: [...etat.trash],
    attente: etat.attente === null ? null : { ...etat.attente },
    file: etat.file.map((tache) => ({ ...tache })),
    toursSupplementaires: etat.toursSupplementaires,
    effetRougeUtilisePar: [...etat.effetRougeUtilisePar],
    vainqueur: etat.vainqueur,
    deckDuVainqueur: deckDuVainqueur(etat),
    journal: etat.journal.map((entree) => ({
      joueur: entree.joueur,
      texte:
        entree.detail !== null && entree.joueur === moi
          ? `${entree.texte} ${entree.detail}`
          : entree.texte,
    })),
  };
}
