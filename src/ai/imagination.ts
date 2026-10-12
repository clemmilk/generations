import { carte } from '../game/cartes.ts';
import type { Etat } from '../game/etat.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import type { Vue } from '../game/vue.ts';

// Pour réfléchir à la suite d'une partie, un bot doit la jouer « dans sa tête ». Il ne connaît que sa vue :
// il imagine donc une partie complète qui colle à tout ce qu'il sait, en tirant le reste au sort
// (ordre des pioches, répartition des cartes adverses entre main et pioche, cartes Assymétrie jamais vues).

function melanger<T>(liste: T[], hasard: () => number): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(hasard() * (i + 1));
    [copie[i], copie[j]] = [copie[j]!, copie[i]!];
  }
  return copie;
}

/**
 * Fabrique un état de partie complet, compatible avec la vue donnée.
 * La vue de cet état imaginé, pour le même joueur, est identique à la vue de départ (journal mis à part).
 */
export function imaginerEtat(vue: Vue, hasard: () => number): Etat {
  const moi = vue.joueurs[vue.moi]!;

  // Toutes les cartes dont le joueur connaît l'emplacement, au moins approximatif.
  const situees = new Set<string>([...vue.riviere, ...vue.trash, ...(moi.main ?? []), ...(moi.contenuPioche ?? [])]);
  for (const joueur of vue.joueurs) {
    for (const id of [...joueur.aireDeJeu, ...joueur.defausse, ...joueur.cartesCacheesConnues]) situees.add(id);
  }

  // Les cartes Assymétrie jamais vues : chez un adversaire, ou écartées en début de partie.
  const asymetrieLibre = melanger(
    MATERIEL.cartes.filter((c) => c.origine === 'asymetrie' && !situees.has(c.id)).map((c) => c.id),
    hasard,
  );

  const joueurs = vue.joueurs.map((joueur) => {
    let main: string[];
    let pioche: string[];
    if (joueur.id === vue.moi) {
      main = [...(joueur.main ?? [])];
      pioche = melanger(joueur.contenuPioche ?? [], hasard);
    } else {
      const inconnues = asymetrieLibre.splice(0, joueur.nbCartesInconnues);
      const cachees = melanger([...joueur.cartesCacheesConnues, ...inconnues], hasard);
      main = cachees.slice(0, joueur.nbCartesMain);
      pioche = cachees.slice(joueur.nbCartesMain);
    }
    return {
      id: joueur.id,
      nom: joueur.nom,
      couleur: joueur.couleur,
      or: joueur.or,
      pioche,
      main,
      aireDeJeu: [...joueur.aireDeJeu],
      defausse: [...joueur.defausse],
      niveauEconomie: joueur.niveauEconomie,
      niveauPopulation: joueur.niveauPopulation,
      privileges: [...joueur.privileges],
      statistiques: { ...joueur.statistiques },
    };
  });

  const piocheCommune = melanger(
    MATERIEL.cartes.filter((c) => c.origine === 'avancee' && !situees.has(c.id)).map((c) => c.id),
    hasard,
  );
  const privilegesPris = new Set([...vue.privilegesVisibles, ...vue.joueurs.flatMap((j) => j.privileges)]);
  const piochePrivileges = melanger(
    MATERIEL.privileges.map((p) => p.numero).filter((numero) => !privilegesPris.has(numero)),
    hasard,
  );

  return {
    graine: 0,
    rng: Math.floor(hasard() * 0x7fffffff),
    joueurs,
    premierJoueur: vue.premierJoueur,
    joueurActif: vue.joueurActif,
    piocheCommune,
    riviere: [...vue.riviere],
    piochePrivileges,
    privilegesVisibles: [...vue.privilegesVisibles],
    trash: [...vue.trash],
    asymetrieEcartees: asymetrieLibre,
    // Une carte Assymétrie est « vue » si elle est dans une zone publique ou connue dans un deck.
    cartesRevelees: [...situees].filter((id) => {
      if (carte(id).origine !== 'asymetrie') return false;
      const cachee = (moi.main ?? []).includes(id) || (moi.contenuPioche ?? []).includes(id);
      return !cachee || moi.cartesCacheesConnues.includes(id);
    }),
    attente: vue.attente === null ? null : { ...vue.attente },
    file: vue.file.map((tache) => ({ ...tache })),
    toursSupplementaires: vue.toursSupplementaires,
    effetRougeUtilisePar: [...vue.effetRougeUtilisePar],
    vainqueur: vue.vainqueur,
    journal: [],
    historique: [],
  };
}
