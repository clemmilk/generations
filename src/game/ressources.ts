import { carte } from './cartes.ts';
import type { Joueur } from './etat.ts';
import { MATERIEL } from './materiel/index.ts';
import type { Compteur, Ressources } from './materiel/index.ts';
import { effetsPrivilege, totalPrivilege } from './privileges.ts';

/**
 * Les ressources qu'une carte apporte à ce joueur quand elle est dans son aire de jeu.
 * Les Privilèges 2, 3 et 4 ajoutent des ressources d'après ce qui est imprimé sur la carte :
 * la ressource ajoutée par l'un ne déclenche pas les autres.
 */
export function ressourcesDe(joueur: Pick<Joueur, 'privileges'>, id: string): Ressources {
  const imprimees = carte(id).ressources;
  const total = { ...imprimees };
  for (const bonus of effetsPrivilege(joueur, 'bonusRessource')) {
    if (imprimees[bonus.si] > 0) total[bonus.donne]++;
  }
  return total;
}

/** Le total des ressources de l'aire de jeu du joueur, Érudits des Privilèges compris (Privilège 16). */
export function ressourcesEnJeu(joueur: Pick<Joueur, 'privileges' | 'aireDeJeu'>): Ressources {
  const total: Ressources = {
    pierre: 0,
    metal: 0,
    erudit: totalPrivilege(joueur, 'erudit', (effet) => effet.nombre),
  };
  for (const id of joueur.aireDeJeu) {
    const r = ressourcesDe(joueur, id);
    total.pierre += r.pierre;
    total.metal += r.metal;
    total.erudit += r.erudit;
  }
  return total;
}

/** Une ressource disponible dans l'aire de jeu, et d'où elle vient. */
export interface OrigineRessource {
  type: 'pierre' | 'metal' | 'erudit';
  /** La carte qui apporte la ressource, ou null si elle vient directement d'un Privilège (Privilège 16). */
  carte: string | null;
  /** Le Privilège qui ajoute cette ressource, ou null si elle est imprimée sur la carte. */
  privilege: number | null;
}

/**
 * Le détail, ressource par ressource, de ce que le joueur a dans son aire de jeu.
 * Sert à l'affichage ; le total est toujours égal à ressourcesEnJeu().
 */
export function detailDesRessources(joueur: Pick<Joueur, 'privileges' | 'aireDeJeu'>): OrigineRessource[] {
  const detail: OrigineRessource[] = [];
  for (const id of joueur.aireDeJeu) {
    const imprimees = carte(id).ressources;
    for (const type of ['pierre', 'metal', 'erudit'] as const) {
      for (let i = 0; i < imprimees[type]; i++) detail.push({ type, carte: id, privilege: null });
    }
    for (const bonus of effetsPrivilege(joueur, 'bonusRessource')) {
      if (imprimees[bonus.si] > 0) detail.push({ type: bonus.donne, carte: id, privilege: bonus.numero });
    }
  }
  for (const bonus of effetsPrivilege(joueur, 'erudit')) {
    for (let i = 0; i < bonus.nombre; i++) {
      detail.push({ type: 'erudit', carte: null, privilege: bonus.numero });
    }
  }
  return detail;
}

/**
 * Les blasons du joueur : ceux affichés à son niveau actuel sur chaque piste (pas de cumul),
 * plus ceux de ses Privilèges (5, 6 et 7).
 */
export function blasons(
  joueur: Pick<Joueur, 'privileges' | 'niveauEconomie' | 'niveauPopulation'>,
): { noblesse: number; economie: number; population: number } {
  const { noblesse, economie, population } = MATERIEL.plateau;
  const total = {
    noblesse: noblesse[joueur.privileges.length - 1]?.blasons ?? 0,
    economie: economie[joueur.niveauEconomie]?.blasons ?? 0,
    population: population[joueur.niveauPopulation]?.blasons ?? 0,
  };
  for (const bonus of effetsPrivilege(joueur, 'blason')) total[bonus.piste]++;
  return total;
}

/** Ce que possède le joueur, pour les effets « par Pierre », « par blason », etc. */
export function compter(
  joueur: Pick<Joueur, 'privileges' | 'aireDeJeu' | 'niveauEconomie' | 'niveauPopulation'>,
  compteur: Compteur,
): number {
  switch (compteur) {
    case 'pierre':
    case 'metal':
    case 'erudit':
      return ressourcesEnJeu(joueur)[compteur];
    case 'blason_noblesse':
      return blasons(joueur).noblesse;
    case 'blason_economie':
      return blasons(joueur).economie;
    case 'blason_population':
      return blasons(joueur).population;
  }
}

/** Ressources à payer. « ressource » = Pierre ou Métal, au choix. */
export interface Besoin {
  pierre: number;
  metal: number;
  ressource: number;
}

function suffit(joueur: Joueur, ids: string[], besoin: Besoin): boolean {
  let pierre = 0;
  let metal = 0;
  for (const id of ids) {
    const r = ressourcesDe(joueur, id);
    pierre += r.pierre;
    metal += r.metal;
  }
  return (
    pierre >= besoin.pierre &&
    metal >= besoin.metal &&
    pierre - besoin.pierre + (metal - besoin.metal) >= besoin.ressource
  );
}

/**
 * Toutes les façons de payer un besoin en défaussant des cartes de son aire de jeu.
 * Chaque façon est une liste de cartes dont aucune n'est superflue.
 * Un besoin nul donne une seule façon : ne rien défausser. Un besoin impayable ne donne aucune façon.
 */
export function optionsDePaiement(joueur: Joueur, besoin: Besoin): string[][] {
  const utiles = joueur.aireDeJeu.filter((id) => {
    const r = ressourcesDe(joueur, id);
    return r.pierre + r.metal > 0;
  });
  const options: string[][] = [];

  const chercher = (depuis: number, choisies: string[]): void => {
    if (suffit(joueur, choisies, besoin)) {
      const sansSuperflu = choisies.every(
        (id) => !suffit(joueur, choisies.filter((autre) => autre !== id), besoin),
      );
      if (sansSuperflu) options.push(choisies);
      return;
    }
    for (let i = depuis; i < utiles.length; i++) {
      chercher(i + 1, [...choisies, utiles[i]!]);
    }
  };
  chercher(0, []);
  return options;
}
