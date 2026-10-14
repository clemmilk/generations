// Ce que vaut chaque élément du jeu, en Or, pour l'IA qui planifie.
//
// L'IA qui planifie n'a pas de tableau de valeurs : elle juge une situation par ses chances de gagner,
// en jouant la suite de la partie dans sa tête (avec l'IA entraînée pour guide). On mesure donc, dans des
// situations de vraies parties, combien un élément (une carte en main, un Privilège, un niveau de jauge,
// un tour de plus…) augmente ses chances de gagner, et on le traduit en Or : « vaut autant que N Or ».
//
//   npm run valorisation                 tout en une fois (long)
//   npm run valorisation -- --tranche 1 --tranches 8   une part du calcul (pour lancer 8 calculs en parallèle)
//   npm run valorisation -- --assembler --tranches 8   réunit les parts et écrit le rapport
//
// Options : --situations N (300), --simulations N par situation et par élément (60), --joueurs 2|3|4 (2).

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { BOTS, choisirAction } from '../src/ai/index.ts';
import { imaginerEtat } from '../src/ai/imagination.ts';
import { alea } from '../src/game/hasard.ts';
import { applyAction, createGame, getPlayerView, isGameOver } from '../src/game/index.ts';
import type { Etat } from '../src/game/index.ts';
import { MATERIEL } from '../src/game/materiel/index.ts';
import { carte, privilege } from '../src/game/cartes.ts';

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : (process.argv[position + 1] ?? defaut);
}

const SITUATIONS = Number(option('situations', '300'));
const SIMULATIONS = Number(option('simulations', '60'));
const JOUEURS = Number(option('joueurs', '2'));
const TRANCHE = Number(option('tranche', '1'));
const TRANCHES = Number(option('tranches', '1'));
const guide = BOTS.entrainee;
const dossier = new URL(`../rapports/valorisation-${JOUEURS}j/`, import.meta.url);
const COULEURS = ['bleu', 'jaune', 'rouge', 'vert'] as const;

// ───────────────────────── Les éléments mesurés ─────────────────────────

/** Une modification de la situation, du point de vue du joueur « moi ». Renvoie false si elle est impossible ici. */
type Modification = (etat: Etat, moi: number) => boolean;

const nomsUniques = (origine: string) => [...new Set(MATERIEL.cartes.filter((c) => c.origine === origine).map((c) => c.nom))];

function zones(etat: Etat): string[] {
  return [
    ...etat.joueurs.flatMap((j) => [...j.pioche, ...j.main, ...j.aireDeJeu, ...j.defausse]),
    ...etat.trash,
  ];
}

/** Donne au joueur, en main, un exemplaire libre de la carte (pioche commune, cartes écartées, deck d'une couleur absente). */
function donnerCarte(nom: string): Modification {
  return (etat, moi) => {
    const prises = new Set(zones(etat));
    const candidates = MATERIEL.cartes.filter((c) => c.nom === nom && !prises.has(c.id));
    for (const c of candidates) {
      for (const lieu of [etat.piocheCommune, etat.asymetrieEcartees, etat.riviere]) {
        const position = lieu.indexOf(c.id);
        if (position === -1) continue;
        lieu.splice(position, 1);
        if (lieu === etat.riviere) {
          const suivante = etat.piocheCommune.shift();
          if (suivante) etat.riviere.push(suivante);
        }
        etat.joueurs[moi]!.main.push(c.id);
        return true;
      }
      // Carte de départ d'une couleur qui ne joue pas : elle n'est nulle part.
      if (c.origine === 'depart') {
        etat.joueurs[moi]!.main.push(c.id);
        return true;
      }
    }
    return false;
  };
}

/** Retire définitivement du deck du joueur une carte de ce nom, comme s'il l'avait trashée. */
function trasherCarte(nom: string): Modification {
  return (etat, moi) => {
    const joueur = etat.joueurs[moi]!;
    for (const zone of [joueur.main, joueur.aireDeJeu, joueur.defausse, joueur.pioche]) {
      const position = zone.findIndex((id) => carte(id).nom === nom);
      if (position === -1) continue;
      etat.trash.push(...zone.splice(position, 1));
      return true;
    }
    return false;
  };
}

function donnerPrivilege(numero: number): Modification {
  return (etat, moi) => {
    const joueur = etat.joueurs[moi]!;
    if (joueur.privileges.length >= MATERIEL.plateau.noblesse.length) return false;
    for (const lieu of [etat.privilegesVisibles, etat.piochePrivileges]) {
      const position = lieu.indexOf(numero);
      if (position === -1) continue;
      lieu.splice(position, 1);
      if (lieu === etat.privilegesVisibles) {
        const suivant = etat.piochePrivileges.shift();
        if (suivant !== undefined) etat.privilegesVisibles.push(suivant);
      }
      joueur.privileges.push(numero);
      return true;
    }
    return false;
  };
}

const donnerOr = (or: number): Modification => (etat, moi) => {
  etat.joueurs[moi]!.or += or;
  return true;
};

interface Element {
  groupe: string;
  nom: string;
  modification: Modification;
}

const ELEMENTS: Element[] = [
  { groupe: 'Or', nom: '+1 Or', modification: donnerOr(1) },
  { groupe: 'Or', nom: '+3 Or', modification: donnerOr(3) },
  { groupe: 'Or', nom: '+6 Or', modification: donnerOr(6) },
  {
    groupe: 'Actions',
    nom: '1 action de plus (un tour supplémentaire)',
    modification: (etat) => {
      etat.toursSupplementaires++;
      return true;
    },
  },
  {
    groupe: 'Actions',
    nom: 'Piocher 1 carte maintenant',
    modification: (etat, moi) => {
      const joueur = etat.joueurs[moi]!;
      // On ne mesure pas la pioche de la toute dernière carte, qui fait gagner d'office.
      if (joueur.pioche.length < 2) return false;
      joueur.main.push(joueur.pioche.shift()!);
      return true;
    },
  },
  {
    groupe: 'Jauges',
    nom: '+1 niveau d\'Économie',
    modification: (etat, moi) => {
      const joueur = etat.joueurs[moi]!;
      if (joueur.niveauEconomie >= MATERIEL.plateau.economie.length - 1) return false;
      joueur.niveauEconomie++;
      return true;
    },
  },
  {
    groupe: 'Jauges',
    nom: '+1 niveau de Population',
    modification: (etat, moi) => {
      const joueur = etat.joueurs[moi]!;
      if (joueur.niveauPopulation >= MATERIEL.plateau.population.length - 1) return false;
      joueur.niveauPopulation++;
      return true;
    },
  },
  ...MATERIEL.privileges.map((p) => ({
    groupe: 'Privilèges',
    nom: `Privilège ${p.numero} : ${p.texte.length > 60 ? `${p.texte.slice(0, 57)}…` : p.texte}`,
    modification: donnerPrivilege(p.numero),
  })),
  ...nomsUniques('depart').map((nom) => ({ groupe: 'Cartes de départ (en main)', nom, modification: donnerCarte(nom) })),
  ...nomsUniques('depart').map((nom) => ({ groupe: 'Trasher une carte de départ', nom, modification: trasherCarte(nom) })),
  ...nomsUniques('asymetrie').map((nom) => ({ groupe: 'Cartes Assymétrie (en main)', nom, modification: donnerCarte(nom) })),
  ...nomsUniques('avancee').map((nom) => ({ groupe: 'Cartes Avancée (en main)', nom, modification: donnerCarte(nom) })),
];

// ───────────────────────── Situations et simulations ─────────────────────────

/** Des situations de vraies parties entre IA entraînées : le début du tour d'un joueur, à divers moments. */
function situations(): { etat: Etat; moi: number }[] {
  const liste: { etat: Etat; moi: number }[] = [];
  for (let partie = 1; liste.length < SITUATIONS; partie++) {
    let etat = createGame(
      Array.from({ length: JOUEURS }, (_, i) => ({ nom: `J${i + 1}`, couleur: COULEURS[i]! })),
      40_000 + partie,
    );
    const des = { rng: partie };
    let tour = 0;
    while (!isGameOver(etat) && liste.length < SITUATIONS) {
      // Un début de tour sur trois, pour couvrir le début, le milieu et la fin des parties.
      if (etat.attente?.type === 'tour' && tour++ % 3 === 1) liste.push({ etat, moi: etat.attente.joueur });
      etat = applyAction(etat, choisirAction(etat, guide, () => alea(des))!);
    }
  }
  return liste;
}

/** Joue la suite de la partie avec le guide. 1 si « moi » gagne, 0 sinon. */
function terminer(depart: Etat, moi: number, graine: number): number {
  let etat = depart;
  const des = { rng: graine };
  for (let i = 0; i < 3000 && !isGameOver(etat); i++) {
    etat = applyAction(etat, choisirAction(etat, guide, () => alea(des))!);
  }
  return etat.vainqueur === moi ? 1 : etat.vainqueur === null ? 0.5 : 0;
}

interface Mesure {
  /** Pour chaque élément : somme des écarts de victoire et nombre de simulations où il était possible. */
  ecarts: Record<string, { somme: number; nombre: number }>;
}

function calculer(): Mesure {
  const toutes = situations();
  const mesure: Mesure = { ecarts: {} };
  for (const element of ELEMENTS) mesure.ecarts[`${element.groupe}|${element.nom}`] = { somme: 0, nombre: 0 };

  toutes.forEach(({ etat, moi }, indice) => {
    if (indice % TRANCHES !== TRANCHE - 1) return;
    const vue = getPlayerView(etat, moi);
    for (let k = 0; k < SIMULATIONS; k++) {
      // Même partie imaginée et même suite de hasard avec et sans l'élément : seul l'élément change.
      const graine = indice * 1000 + k + 1;
      const imaginer = () => {
        const des = { rng: graine };
        return imaginerEtat(vue, () => alea(des));
      };
      const reference = terminer(imaginer(), moi, graine);
      for (const element of ELEMENTS) {
        const modifie = imaginer();
        if (!element.modification(modifie, moi)) continue;
        const ecart = mesure.ecarts[`${element.groupe}|${element.nom}`]!;
        ecart.somme += terminer(modifie, moi, graine) - reference;
        ecart.nombre++;
      }
    }
    if (indice % 20 === 0) console.log(`[tranche ${TRANCHE}] situation ${indice + 1}/${toutes.length}`);
  });
  return mesure;
}

// ───────────────────────── Rapport ─────────────────────────

function assembler(): void {
  const total: Mesure = { ecarts: {} };
  for (let t = 1; t <= TRANCHES; t++) {
    const part: Mesure = JSON.parse(readFileSync(new URL(`partie-${t}.json`, dossier), 'utf8'));
    for (const [cle, e] of Object.entries(part.ecarts)) {
      const cumul = (total.ecarts[cle] ??= { somme: 0, nombre: 0 });
      cumul.somme += e.somme;
      cumul.nombre += e.nombre;
    }
  }
  const moyenne = (cle: string) => {
    const e = total.ecarts[cle];
    return e && e.nombre > 0 ? e.somme / e.nombre : null;
  };
  // 1 Or vaut le gain de chances apporté par 3 Or, divisé par 3 : plus stable qu'avec 1 seul Or.
  const parOr = moyenne('Or|+3 Or')! / 3;
  const enOr = (cle: string) => {
    const m = moyenne(cle);
    return m === null ? null : m / parOr;
  };

  const groupes = [...new Set(ELEMENTS.map((e) => e.groupe))];
  const lignes = [
    `# Valeur des éléments du jeu pour l'IA qui planifie (parties à ${JOUEURS} joueurs)`,
    '',
    `Généré le ${new Date().toISOString().slice(0, 10)} par \`npm run valorisation\` : ${SITUATIONS} situations de vraies parties, ${SIMULATIONS} suites simulées par situation et par élément.`,
    '',
    'Chaque valeur dit **combien d\'Or ce bonus vaut pour l\'IA qui planifie**, au début de son tour, en moyenne sur toute la partie : ',
    'on mesure de combien l\'élément augmente ses chances de gagner, puis on divise par ce qu\'apporte 1 Or.',
    `Repère : 1 Or augmente ses chances de gagner de ${(100 * parOr).toFixed(2)} point(s).`,
    '',
    '> Ces valeurs dépendent de sa façon de jouer : elle imagine la suite avec l\'IA entraînée pour guide.',
    '> Une valeur négative veut dire que l\'élément la gêne. Les petites valeurs (moins de 1 Or environ) sont dans la marge de bruit.',
    '',
  ];
  for (const groupe of groupes) {
    const elements = ELEMENTS.filter((e) => e.groupe === groupe)
      .map((e) => ({ nom: e.nom, valeur: enOr(`${groupe}|${e.nom}`), nombre: total.ecarts[`${groupe}|${e.nom}`]?.nombre ?? 0 }))
      .sort((a, b) => (b.valeur ?? -Infinity) - (a.valeur ?? -Infinity));
    lignes.push(`## ${groupe}`, '', '| Élément | Valeur en Or |', '|---|---:|');
    for (const e of elements) {
      lignes.push(`| ${e.nom} | ${e.valeur === null ? 'non mesurable' : e.valeur.toFixed(1)}${e.nombre > 0 && e.nombre < SITUATIONS * SIMULATIONS * 0.2 ? ' (peu de situations)' : ''} |`);
    }
    lignes.push('');
  }
  writeFileSync(new URL(`../rapports/valorisation-${JOUEURS}-joueurs.md`, import.meta.url), lignes.join('\n'));
  console.log(`Rapport écrit dans rapports/valorisation-${JOUEURS}-joueurs.md`);
}

if (process.argv.includes('--assembler')) {
  assembler();
} else {
  const debut = Date.now();
  const mesure = calculer();
  mkdirSync(dossier, { recursive: true });
  writeFileSync(new URL(`partie-${TRANCHE}.json`, dossier), JSON.stringify(mesure));
  console.log(`[tranche ${TRANCHE}] terminé en ${((Date.now() - debut) / 60000).toFixed(1)} min`);
  if (TRANCHES === 1) assembler();
}
void privilege;
