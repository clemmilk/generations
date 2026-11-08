import { carte, nomsDesCartes } from './cartes.ts';
import type { Etat, Joueur } from './etat.ts';
import { MATERIEL } from './materiel/index.ts';
import { effetsPrivilege, totalPrivilege } from './privileges.ts';
import { compter } from './ressources.ts';

// Ces fonctions modifient l'état qu'on leur donne : le moteur travaille toujours sur une copie.

export function noter(
  etat: Etat,
  joueur: Joueur | null,
  texte: string,
  detail: string | null = null,
): void {
  etat.journal.push({ joueur: joueur?.id ?? null, texte, detail });
}

/**
 * Fait piocher au joueur jusqu'à « nombre » cartes et renvoie leurs identifiants.
 * S'il pioche la dernière carte de sa pioche, il gagne la partie, sauf si elle est déjà gagnée.
 * La pioche s'arrête dès que la partie est gagnée ou que la pioche est vide.
 */
export function piocher(etat: Etat, joueur: Joueur, nombre: number): string[] {
  const piochees: string[] = [];
  let victoire = false;
  while (piochees.length < nombre && !victoire) {
    const id = joueur.pioche.shift();
    if (id === undefined) break;
    joueur.main.push(id);
    piochees.push(id);
    if (joueur.pioche.length === 0 && etat.vainqueur === null) {
      etat.vainqueur = joueur.id;
      victoire = true;
    }
  }

  if (piochees.length > 0) {
    noter(
      etat,
      joueur,
      `${joueur.nom} pioche ${piochees.length} carte(s).`,
      `Cartes piochées : ${nomsDesCartes(piochees)}.`,
    );
  }
  if (victoire) {
    noter(etat, joueur, `${joueur.nom} a pioché la dernière carte de son deck et remporte la partie !`);
  }
  return piochees;
}

/**
 * Révèle jusqu'à « nombre » cartes du dessus de la pioche (décision RR) : chacune est posée face visible
 * dans l'aire de jeu, sans effet ni Effet Rouge (sans ressource, elle va dans la défausse).
 * Une carte révélée compte comme une carte piochée : révéler la dernière carte du deck fait gagner.
 */
export function revelerCartes(etat: Etat, joueur: Joueur, nombre: number): string[] {
  const revelees: string[] = [];
  let victoire = false;
  while (revelees.length < nombre && !victoire) {
    const id = joueur.pioche.shift();
    if (id === undefined) break;
    const c = carte(id);
    const r = c.ressources;
    if (r.pierre + r.metal + r.erudit > 0) joueur.aireDeJeu.push(id);
    else joueur.defausse.push(id);
    // Une carte Assymétrie révélée est désormais connue de tous.
    if (c.origine === 'asymetrie' && !etat.cartesRevelees.includes(id)) etat.cartesRevelees.push(id);
    revelees.push(id);
    noter(etat, joueur, `${joueur.nom} révèle ${c.nom}.`);
    if (joueur.pioche.length === 0 && etat.vainqueur === null) {
      etat.vainqueur = joueur.id;
      victoire = true;
    }
  }
  if (victoire) {
    noter(etat, joueur, `${joueur.nom} a révélé la dernière carte de son deck et remporte la partie !`);
  }
  return revelees;
}

/** Ce qu'un joueur reçoit à chaque début de lignée, d'après ses jauges et ses Privilèges. */
export interface GainsDeLignee {
  /** Or donné par le niveau d'Économie. */
  orDeLaJauge: number;
  /** Or ajouté par les Privilèges (5 et 19). Le Privilège 6, qui dépend de l'Or reçu, s'y ajoute ensuite. */
  orDesPrivileges: number;
  /** Cartes piochées au hasard dans le deck. Le Privilège 8 en retire, remplacées par des cartes au choix. */
  cartesPiochees: number;
  /** Cartes prises au choix dans le deck (Privilège 8). */
  cartesChoisies: number;
  /** Cartes piochées en plus, puis autant défaussées de la main (ancien Privilège 12, plus utilisé en V3). */
  cartesPiocheesPuisDefaussees: number;
  /** Cartes révélées après la pioche (jauge de Population, puis Privilège 12). */
  cartesRevelees: number;
}

export function gainsDeLignee(
  joueur: Pick<Joueur, 'nom' | 'or' | 'privileges' | 'aireDeJeu' | 'niveauEconomie' | 'niveauPopulation'>,
): GainsDeLignee {
  const economie = MATERIEL.plateau.economie[joueur.niveauEconomie];
  const population = MATERIEL.plateau.population[joueur.niveauPopulation];
  if (!economie || !population) {
    throw new Error(`Niveau de jauge hors du plateau pour ${joueur.nom}`);
  }
  let orDesPrivileges = 0;
  for (const bonus of effetsPrivilege(joueur, 'orDebutLignee')) {
    orDesPrivileges += bonus.or * (bonus.par ? compter(joueur, bonus.par) : 1);
  }
  const choisies = totalPrivilege(joueur, 'rechercheDebutLignee', (effet) => effet.cartes);
  return {
    orDeLaJauge: economie.or,
    orDesPrivileges,
    cartesPiochees: Math.max(0, population.cartes - choisies),
    cartesChoisies: choisies,
    cartesPiocheesPuisDefaussees: totalPrivilege(joueur, 'piocheEtDefausseDebutLignee', (effet) => effet.cartes),
    cartesRevelees: population.revele + totalPrivilege(joueur, 'reveleDebutLignee', (effet) => effet.cartes),
  };
}

/**
 * Début de lignée (décision UU) : le joueur prend son Or (Économie, Privilèges 5 et 19), puis le Privilège 6
 * une fois tout l'Or reçu, pioche ses cartes (Population), puis révèle (Population, puis Privilège 12).
 * La suite (Privilège 8, achat du Privilège 10) demande des choix : elle est gérée par le moteur.
 */
export function debuterLignee(etat: Etat, joueur: Joueur): void {
  const gains = gainsDeLignee(joueur);
  const or = gains.orDeLaJauge + gains.orDesPrivileges;
  joueur.or += or;
  joueur.statistiques.lignees++;
  noter(etat, joueur, `${joueur.nom} débute une lignée et prend ${or} Or.`);
  for (const effet of effetsPrivilege(joueur, 'orParStockDebutLignee')) {
    const bonus = effet.or * Math.floor(joueur.or / effet.tranche);
    if (bonus === 0) continue;
    joueur.or += bonus;
    noter(etat, joueur, `${joueur.nom} gagne ${bonus} Or grâce à son Privilège ${effet.numero}.`);
  }

  // Privilège 8 : moins de cartes piochées ; la recherche qui les remplace est gérée par le moteur.
  piocher(etat, joueur, gains.cartesPiochees);
  if (etat.vainqueur === null) revelerCartes(etat, joueur, gains.cartesRevelees);
}
