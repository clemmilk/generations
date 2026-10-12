import { describe, expect, it } from 'vitest';
import { getLegalActions } from '../../src/game/index.ts';
import {
  changerNombre,
  creerSalon,
  deconnecter,
  estVide,
  instantane,
  jouer,
  jouerIA,
  lancer,
  liberer,
  phase,
  reglerSiege,
  rejoindre,
  remplacerParIA,
  revanche,
  tourDUneIA,
} from '../../src/server/salon.ts';
import type { Salon } from '../../src/server/salon.ts';
import { verifierAucuneFuite } from '../moteur/outils.ts';

const ALICE = 'jeton-alice';
const BOB = 'jeton-bob';
const CHLOE = 'jeton-chloe';

function salonADeux(): Salon {
  const salon = creerSalon('ABCDEF', ALICE, 'Alice', 2);
  rejoindre(salon, BOB, 'Bob');
  return salon;
}

function partieADeux(): Salon {
  const salon = salonADeux();
  lancer(salon, ALICE, 42);
  return salon;
}

/** Le jeton du joueur humain dont le moteur attend une décision. */
function jetonDuDecideur(salon: Salon): string {
  return [ALICE, BOB, CHLOE][salon.etat!.attente!.joueur]!;
}

describe('salon d\'attente', () => {
  it('installe l\'hôte au premier siège et laisse les autres libres', () => {
    const salon = creerSalon('ABCDEF', ALICE, '  Alice  ', 3);
    const vu = instantane(salon, ALICE);
    expect(vu.phase).toBe('attente');
    expect(vu.sieges.map((s) => s.type)).toEqual(['humain', 'libre', 'libre']);
    expect(vu.sieges.map((s) => s.couleur)).toEqual(['bleu', 'jaune', 'rouge']);
    expect(vu.sieges[0]!.nom).toBe('Alice');
    expect(vu.monSiege).toBe(0);
    expect(vu.hote).toBe(0);
    expect(vu.vue).toBeNull();
  });

  it('refuse un nombre de joueurs hors de 2 à 4 et un pseudo vide', () => {
    expect(() => creerSalon('ABCDEF', ALICE, 'Alice', 1)).toThrow(/2 à 4 joueurs/);
    expect(() => creerSalon('ABCDEF', ALICE, 'Alice', 5)).toThrow(/2 à 4 joueurs/);
    expect(() => creerSalon('ABCDEF', ALICE, '   ', 2)).toThrow(/pseudo/);
  });

  it('donne le premier siège libre à un joueur qui rejoint', () => {
    const salon = creerSalon('ABCDEF', ALICE, 'Alice', 3);
    expect(rejoindre(salon, BOB, 'Bob')).toBe(1);
    expect(rejoindre(salon, CHLOE, 'Chloé')).toBe(2);
    expect(instantane(salon, CHLOE).monSiege).toBe(2);
    expect(instantane(salon, ALICE).sieges.map((s) => s.nom)).toEqual(['Alice', 'Bob', 'Chloé']);
  });

  it('refuse un joueur de plus quand le salon est complet', () => {
    expect(() => rejoindre(salonADeux(), CHLOE, 'Chloé')).toThrow(/complet/);
  });

  it('rend son siège à un joueur qui revient avec le même jeton', () => {
    const salon = salonADeux();
    deconnecter(salon, BOB);
    expect(instantane(salon, ALICE).sieges[1]!.connecte).toBe(false);
    expect(rejoindre(salon, BOB, 'Bobby')).toBe(1);
    expect(instantane(salon, ALICE).sieges[1]).toMatchObject({ nom: 'Bobby', connecte: true });
  });

  it('libère le siège d\'un joueur parti pour de bon, et passe le rôle d\'hôte si c\'était lui', () => {
    const salon = salonADeux();
    liberer(salon, ALICE);
    const vu = instantane(salon, BOB);
    expect(vu.sieges.map((s) => s.type)).toEqual(['libre', 'humain']);
    expect(vu.hote).toBe(1);
    expect(() => reglerSiege(salon, BOB, 0, 'aleatoire')).not.toThrow();
  });

  it('se déclare vide quand plus aucun humain n\'est connecté', () => {
    const salon = salonADeux();
    expect(estVide(salon)).toBe(false);
    deconnecter(salon, ALICE);
    deconnecter(salon, BOB);
    expect(estVide(salon)).toBe(true);
  });

  it('ne laisse que l\'hôte régler le salon', () => {
    const salon = creerSalon('ABCDEF', ALICE, 'Alice', 3);
    rejoindre(salon, BOB, 'Bob');
    expect(() => changerNombre(salon, BOB, 4)).toThrow(/hôte/);
    expect(() => reglerSiege(salon, BOB, 2, 'aleatoire')).toThrow(/hôte/);
    expect(() => lancer(salon, BOB, 1)).toThrow(/hôte/);
  });

  it('change le nombre de sièges, sans pouvoir retirer celui d\'un joueur présent', () => {
    const salon = salonADeux();
    changerNombre(salon, ALICE, 4);
    expect(instantane(salon, ALICE).sieges.map((s) => s.type)).toEqual(['humain', 'humain', 'libre', 'libre']);
    rejoindre(salon, CHLOE, 'Chloé');
    expect(() => changerNombre(salon, ALICE, 2)).toThrow(/occupe/);
    changerNombre(salon, ALICE, 3);
    expect(instantane(salon, ALICE).sieges).toHaveLength(3);
  });

  it('met une IA sur un siège libre, ou le libère de nouveau', () => {
    const salon = creerSalon('ABCDEF', ALICE, 'Alice', 3);
    reglerSiege(salon, ALICE, 1, 'entrainee');
    expect(instantane(salon, ALICE).sieges[1]).toMatchObject({ type: 'entrainee', connecte: true });
    expect(instantane(salon, ALICE).sieges[1]!.nom).toContain('IA');
    reglerSiege(salon, ALICE, 1, 'libre');
    expect(instantane(salon, ALICE).sieges[1]!.type).toBe('libre');
    expect(() => reglerSiege(salon, ALICE, 0, 'aleatoire')).toThrow(/occupé/);
    expect(() => reglerSiege(salon, ALICE, 7, 'aleatoire')).toThrow(/n'existe pas/);
  });

  it('refuse de lancer la partie tant qu\'il reste un siège libre', () => {
    const salon = creerSalon('ABCDEF', ALICE, 'Alice', 2);
    expect(() => lancer(salon, ALICE, 1)).toThrow(/sièges libres/);
    reglerSiege(salon, ALICE, 1, 'aleatoire');
    lancer(salon, ALICE, 1);
    expect(phase(salon)).toBe('jeu');
  });
});

describe('partie en ligne', () => {
  it('donne à chaque joueur sa vue, ses actions, et rien de caché', () => {
    const salon = partieADeux();
    const decideur = salon.etat!.attente!.joueur;
    for (const [jeton, siege] of [[ALICE, 0], [BOB, 1]] as const) {
      const vu = instantane(salon, jeton);
      expect(vu.phase).toBe('jeu');
      expect(vu.vue!.moi).toBe(siege);
      expect(vu.vue!.joueurs[siege]!.main).not.toBeNull();
      expect(vu.vue!.joueurs[1 - siege]!.main).toBeNull();
      expect(vu.actions.length > 0).toBe(siege === decideur);
      expect(vu.partie).toBeNull();
      expect(JSON.stringify(vu)).not.toContain('jeton-');
    }
    expect(() => verifierAucuneFuite(salon.etat!)).not.toThrow();
  });

  it('utilise les pseudos comme noms des joueurs', () => {
    expect(partieADeux().etat!.joueurs.map((j) => j.nom)).toEqual(['Alice', 'Bob']);
  });

  it('applique l\'action du joueur dont c\'est le tour', () => {
    const salon = partieADeux();
    const jeton = jetonDuDecideur(salon);
    const action = instantane(salon, jeton).actions[0]!;
    jouer(salon, jeton, action);
    expect(salon.etat!.historique).toHaveLength(1);
  });

  it('refuse une action jouée à la place d\'un autre, même en trichant sur le numéro de joueur', () => {
    const salon = partieADeux();
    const decideur = salon.etat!.attente!.joueur;
    const autre = decideur === 0 ? BOB : ALICE;
    const action = getLegalActions(salon.etat!, decideur)[0]!;
    // L'autre joueur envoie l'action du décideur telle quelle : le serveur la rattache à son propre siège.
    expect(() => jouer(salon, autre, action)).toThrow(/illégale/);
    expect(salon.etat!.historique).toHaveLength(0);
  });

  it('refuse l\'action d\'un inconnu, et toute action avant le lancement', () => {
    const salon = partieADeux();
    expect(() => jouer(salon, 'jeton-inconnu', { type: 'finLignee', joueur: 0 })).toThrow(/pas de siège/);
    expect(() => jouer(salonADeux(), ALICE, { type: 'finLignee', joueur: 0 })).toThrow(/pas commencé/);
  });

  it('refuse un nouveau joueur une fois la partie lancée, mais laisse revenir un joueur déjà assis', () => {
    const salon = partieADeux();
    expect(() => rejoindre(salon, CHLOE, 'Chloé')).toThrow(/déjà commencé/);
    deconnecter(salon, BOB);
    expect(rejoindre(salon, BOB, 'Autre nom')).toBe(1);
    // En cours de partie, le pseudo ne change plus.
    expect(instantane(salon, ALICE).sieges[1]!.nom).toBe('Bob');
  });

  it('interdit de modifier le salon une fois la partie lancée', () => {
    const salon = partieADeux();
    expect(() => changerNombre(salon, ALICE, 3)).toThrow(/déjà commencé/);
    expect(() => lancer(salon, ALICE, 1)).toThrow(/déjà commencé/);
  });

  it('fait jouer les IA à leur tour, jusqu\'à la fin de la partie', () => {
    const salon = creerSalon('ABCDEF', ALICE, 'Alice', 3);
    reglerSiege(salon, ALICE, 1, 'entrainee');
    reglerSiege(salon, ALICE, 2, 'aleatoire');
    lancer(salon, ALICE, 7);
    for (let i = 0; i < 5000 && phase(salon) === 'jeu'; i++) {
      if (tourDUneIA(salon)) {
        expect(jouerIA(salon, () => 0.5)).toBe(true);
      } else {
        expect(jouerIA(salon)).toBe(false);
        jouer(salon, ALICE, instantane(salon, ALICE).actions[0]!);
      }
    }
    expect(phase(salon)).toBe('finie');
    expect(tourDUneIA(salon)).toBe(false);
  });

  it('ne donne l\'export complet de la partie qu\'une fois celle-ci terminée', () => {
    const salon = partieADeux();
    expect(instantane(salon, ALICE).partie).toBeNull();
    salon.etat!.vainqueur = 1;
    salon.etat!.attente = null;
    const vu = instantane(salon, ALICE);
    expect(vu.phase).toBe('finie');
    expect(vu.partie).toMatchObject({ graine: 42, version: 1 });
  });
});

describe('joueur déconnecté en cours de partie', () => {
  it('garde son siège, et la partie l\'attend', () => {
    const salon = partieADeux();
    liberer(salon, BOB);
    const vu = instantane(salon, ALICE);
    expect(vu.sieges[1]).toMatchObject({ type: 'humain', nom: 'Bob', connecte: false });
    expect(tourDUneIA(salon)).toBe(false);
  });

  it('peut être remplacé par une IA, par l\'hôte seulement, et seulement s\'il est déconnecté', () => {
    const salon = partieADeux();
    expect(() => remplacerParIA(salon, ALICE, 1, 'entrainee')).toThrow(/toujours connecté/);
    deconnecter(salon, BOB);
    expect(() => remplacerParIA(salon, BOB, 1, 'entrainee')).toThrow(/hôte/);
    remplacerParIA(salon, ALICE, 1, 'entrainee');
    expect(instantane(salon, ALICE).sieges[1]).toMatchObject({ type: 'entrainee', nom: 'Bob', connecte: true });
    // Bob ne retrouve plus son siège : il a été confié à l'IA.
    expect(instantane(salon, BOB).monSiege).toBeNull();
    expect(instantane(salon, BOB).vue).toBeNull();
  });

  it('laisse l\'IA remplaçante jouer à sa place', () => {
    const salon = partieADeux();
    deconnecter(salon, BOB);
    remplacerParIA(salon, ALICE, 1, 'entrainee');
    while (!tourDUneIA(salon)) jouer(salon, ALICE, instantane(salon, ALICE).actions[0]!);
    expect(jouerIA(salon)).toBe(true);
  });
});

describe('revanche', () => {
  it('ramène au salon d\'attente avec les mêmes sièges, une fois la partie finie', () => {
    const salon = partieADeux();
    expect(() => revanche(salon, ALICE)).toThrow(/pas terminée/);
    salon.etat!.vainqueur = 0;
    expect(() => revanche(salon, BOB)).toThrow(/hôte/);
    revanche(salon, ALICE);
    expect(phase(salon)).toBe('attente');
    expect(instantane(salon, ALICE).sieges.map((s) => s.nom)).toEqual(['Alice', 'Bob']);
    lancer(salon, ALICE, 3);
    expect(phase(salon)).toBe('jeu');
  });

  it('libère le siège des joueurs partis entre-temps', () => {
    const salon = partieADeux();
    salon.etat!.vainqueur = 0;
    deconnecter(salon, BOB);
    revanche(salon, ALICE);
    expect(instantane(salon, ALICE).sieges.map((s) => s.type)).toEqual(['humain', 'libre']);
  });
});
