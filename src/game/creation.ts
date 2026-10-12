import type { Etat, Inscription, Joueur } from './etat.ts';
import { entierAleatoire, melanger } from './hasard.ts';
import { debuterLignee, noter } from './lignee.ts';
import { MATERIEL } from './materiel/index.ts';
import { PARAMETRES } from './parametres.ts';

/** Les joueurs dans l'ordre du tour, en commençant par le joueur donné. */
export function ordreDuTour(etat: Etat, depuis: number): Joueur[] {
  const n = etat.joueurs.length;
  return etat.joueurs.map((_, i) => etat.joueurs[(depuis + i) % n]!);
}

/** Crée une partie et applique toute la mise en place. La même graine redonne la même partie. */
export function createGame(inscriptions: Inscription[], graine: number): Etat {
  const n = inscriptions.length;
  if (n < PARAMETRES.joueursMin || n > PARAMETRES.joueursMax) {
    throw new Error(
      `Il faut de ${PARAMETRES.joueursMin} à ${PARAMETRES.joueursMax} joueurs (${n} demandés).`,
    );
  }
  const couleurs = new Set(inscriptions.map((i) => i.couleur));
  if (couleurs.size !== n) {
    throw new Error('Deux joueurs ne peuvent pas avoir la même couleur.');
  }

  const etat: Etat = {
    graine,
    rng: graine | 0,
    joueurs: inscriptions.map((inscription, id) => ({
      id,
      nom: inscription.nom,
      couleur: inscription.couleur,
      or: 0,
      pioche: [],
      main: [],
      aireDeJeu: [],
      defausse: [],
      niveauEconomie: 0,
      niveauPopulation: 0,
      privileges: [],
    })),
    premierJoueur: 0,
    joueurActif: 0,
    piocheCommune: [],
    riviere: [],
    piochePrivileges: [],
    privilegesVisibles: [],
    trash: [],
    asymetrieEcartees: [],
    cartesRevelees: [],
    attente: null,
    file: [],
    toursSupplementaires: 0,
    bonusEffetRouge: [],
    vainqueur: null,
    journal: [],
    historique: [],
  };

  // 1. Deck de départ + 2 cartes Assymétrie au hasard, puis mélange.
  const asymetrie = MATERIEL.cartes.filter((c) => c.origine === 'asymetrie').map((c) => c.id);
  melanger(etat, asymetrie);
  for (const joueur of etat.joueurs) {
    joueur.pioche = [
      ...MATERIEL.cartes.filter((c) => c.couleur === joueur.couleur).map((c) => c.id),
      ...asymetrie.splice(0, PARAMETRES.cartesAsymetrieParJoueur),
    ];
    melanger(etat, joueur.pioche);
  }
  etat.asymetrieEcartees = asymetrie;

  // 3. Pioche commune et Rivière.
  etat.piocheCommune = MATERIEL.cartes.filter((c) => c.origine === 'avancee').map((c) => c.id);
  melanger(etat, etat.piocheCommune);
  etat.riviere = etat.piocheCommune.splice(0, PARAMETRES.tailleRiviere);

  // 4. Tuiles Privilège.
  etat.piochePrivileges = MATERIEL.privileges.map((p) => p.numero);
  melanger(etat, etat.piochePrivileges);
  etat.privilegesVisibles = etat.piochePrivileges.splice(0, PARAMETRES.privilegesVisibles);

  // 5. Premier joueur au hasard, et Or de compensation pour les suivants.
  etat.premierJoueur = entierAleatoire(etat, n);
  etat.joueurActif = etat.premierJoueur;
  const ordre = ordreDuTour(etat, etat.premierJoueur);
  noter(etat, null, `La partie commence. ${ordre[0]!.nom} est le premier joueur.`);
  ordre.forEach((joueur, place) => {
    const compensation = PARAMETRES.orDeCompensation[place] ?? 0;
    if (compensation > 0) {
      joueur.or += compensation;
      noter(etat, joueur, `${joueur.nom} reçoit ${compensation} Or de compensation.`);
    }
  });

  // 6. Tout le monde débute sa première lignée.
  for (const joueur of ordre) debuterLignee(etat, joueur);

  etat.attente = { type: 'tour', joueur: etat.premierJoueur };

  return etat;
}
