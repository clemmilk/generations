// Fait jouer des IA entre elles et compare les choix des vainqueurs à ceux des perdants.
// Le rapport est écrit dans rapports/ (un fichier Markdown, lisible tel quel).
//
//   npm run analyse -- --games 3000
//   npm run analyse -- --games 100 --bot planificatrice --simulations 40
//
// Options :
//   --games N         parties par taille de table, à 2, 3 et 4 joueurs (2000 par défaut)
//   --bot nom         le bot qui tient tous les sièges (entrainee par défaut)
//   --simulations N   pour le bot planificatrice : parties simulées par décision (40 par défaut ici, pour aller vite)
//   --graine N        graine de la première partie (1 par défaut)

import { mkdirSync, writeFileSync } from 'node:fs';
import { BOTS } from '../src/ai/index.ts';
import type { TypeDeBot } from '../src/ai/index.ts';
import { observerPartie } from '../src/ai/observation.ts';
import type { Jauge, ObservationJoueur } from '../src/ai/observation.ts';
import { creerBotPlanificateur } from '../src/ai/planification.ts';
import { carte } from '../src/game/cartes.ts';
import { MATERIEL } from '../src/game/materiel/index.ts';
import { PARAMETRES } from '../src/game/parametres.ts';

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : (process.argv[position + 1] ?? defaut);
}

const parties = Number(option('games', '2000'));
const type = option('bot', 'entrainee') as TypeDeBot;
const simulations = Number(option('simulations', '40'));
const premiereGraine = Number(option('graine', '1'));
// Essai d'une variante de règle : --effet-rouge suivant|precedent (le nom du rapport porte la variante).
const effetRouge = option('effet-rouge', 'tous');
if (!['tous', 'suivant', 'precedent'].includes(effetRouge)) {
  console.error(`--effet-rouge : tous, suivant ou precedent.`);
  process.exit(1);
}
(PARAMETRES as Record<string, unknown>).effetRougePour = effetRouge;
const variante = effetRouge === 'tous' ? '' : `-effet-rouge-${effetRouge}`;
if (!(type in BOTS)) {
  console.error(`Bot inconnu « ${type} ». Bots disponibles : ${Object.keys(BOTS).join(', ')}.`);
  process.exit(1);
}
const bot =
  type === 'planificatrice'
    ? creerBotPlanificateur(`IA qui planifie (${simulations} simulations)`, { guide: BOTS.entrainee, simulations })
    : BOTS[type];

// ───────────────────────── Simulation ─────────────────────────

/** Un joueur d'une partie, avec la taille de sa table (2, 3 ou 4). */
type Joueur = ObservationJoueur & { table: number };

const joueurs: Joueur[] = [];
const parTable = new Map<number, { parties: number; terminees: number }>();
const debut = Date.now();
for (const table of [2, 3, 4]) {
  const compte = { parties: 0, terminees: 0 };
  parTable.set(table, compte);
  for (let i = 0; i < parties; i++) {
    const partie = observerPartie(Array(table).fill(bot), premiereGraine + i);
    compte.parties++;
    if (!partie.terminee) continue;
    compte.terminees++;
    for (const joueur of partie.joueurs) joueurs.push({ ...joueur, table });
  }
  console.log(`${table} joueurs : ${compte.terminees}/${compte.parties} parties terminées (${((Date.now() - debut) / 1000).toFixed(0)} s)`);
}

const vainqueurs = joueurs.filter((j) => j.gagne);
const perdants = joueurs.filter((j) => !j.gagne);

// ───────────────────────── Outils de calcul ─────────────────────────

const nom = (id: string) => carte(id).nom;
const moyenne = (liste: Joueur[], valeur: (j: Joueur) => number) =>
  liste.length === 0 ? 0 : liste.reduce((total, j) => total + valeur(j), 0) / liste.length;
const part = (liste: Joueur[], condition: (j: Joueur) => boolean) =>
  liste.length === 0 ? 0 : liste.filter(condition).length / liste.length;
const pc = (x: number) => `${(100 * x).toFixed(1)} %`;
const dec = (x: number, chiffres = 1) => x.toFixed(chiffres);

/**
 * Indice de victoire des joueurs qui remplissent une condition : 1 = ils gagnent autant que la moyenne,
 * 1.20 = 20 % de plus. Il tient compte de la taille de la table (1 chance sur 2, 3 ou 4 au départ),
 * ce qui permet de mélanger les trois tailles.
 */
function indice(condition: (j: Joueur) => boolean, parmi: Joueur[] = joueurs) {
  let victoires = 0;
  let attendues = 0;
  let nombre = 0;
  for (const j of parmi) {
    if (!condition(j)) continue;
    nombre++;
    attendues += 1 / j.table;
    if (j.gagne) victoires++;
  }
  return { nombre, indice: attendues === 0 ? null : victoires / attendues, attendues };
}

/** Affiche un indice, avec une marque quand l'échantillon est trop petit pour s'y fier. */
function afficherIndice(r: ReturnType<typeof indice>): string {
  if (r.indice === null) return '—';
  return `${r.indice.toFixed(2)}${r.attendues < 60 ? ' ?' : ''}`;
}

function tableau(entetes: string[], lignes: (string | number)[][]): string {
  return [
    `| ${entetes.join(' | ')} |`,
    `|${entetes.map((_, i) => (i === 0 ? '---' : '---:')).join('|')}|`,
    ...lignes.map((ligne) => `| ${ligne.join(' | ')} |`),
  ].join('\n');
}

const sections: string[] = [];
const section = (titre: string, ...contenu: string[]) => sections.push(`## ${titre}\n\n${contenu.join('\n\n')}`);

// ───────────────────────── 1. Vue d'ensemble ─────────────────────────

section(
  'Vue d\'ensemble',
  tableau(
    ['', '2 joueurs', '3 joueurs', '4 joueurs'],
    [
      ['Parties terminées', ...[2, 3, 4].map((t) => `${parTable.get(t)!.terminees} / ${parTable.get(t)!.parties}`)],
      [
        'Tours de table du vainqueur',
        ...[2, 3, 4].map((t) => dec(moyenne(vainqueurs.filter((j) => j.table === t), (j) => j.statistiques.tours - j.statistiques.toursRejoues))),
      ],
      ['Lignées du vainqueur', ...[2, 3, 4].map((t) => dec(moyenne(vainqueurs.filter((j) => j.table === t), (j) => j.statistiques.lignees)))],
      ...[0, 1, 2, 3].map((place) => [
        `Victoires du ${place + 1}${place === 0 ? 'er' : 'e'} joueur`,
        ...[2, 3, 4].map((t) => (place < t ? pc(part(vainqueurs.filter((j) => j.table === t), (j) => j.place === place)) : '—')),
      ]),
    ],
  ),
  'À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.',
);

// ───────────────────────── 2. Profil des vainqueurs ─────────────────────────

const profil: [string, (j: Joueur) => number, number?][] = [
  ['Cartes achetées', (j) => j.achats.length],
  ['Cartes trashées', (j) => j.trashs.length],
  ['Cartes dans le deck à la fin', (j) => j.deckFinal.length],
  ['Cartes jouées par lignée', (j) => j.jouees.length / j.statistiques.lignees],
  ['Tours par lignée', (j) => j.statistiques.tours / j.statistiques.lignees],
  ['Tours gagnés par Rejouer', (j) => j.statistiques.toursRejoues],
  ['Pioches supplémentaires', (j) => j.statistiques.piochesSupplementaires],
  ['Effets Rouges choisis', (j) => j.statistiques.effetsRougesChoisis],
  ['Effets Rouges automatiques', (j) => j.statistiques.effetsRougesAutomatiques],
  ['Privilèges', (j) => j.privileges.length],
  ['Niveau d\'Économie final', (j) => j.niveauEconomie],
  ['Niveau de Population final', (j) => j.niveauPopulation],
];
section(
  'Profil des vainqueurs et des perdants',
  tableau(
    ['Moyenne par joueur', 'Vainqueurs', 'Perdants'],
    profil.map(([titre, valeur]) => [titre, dec(moyenne(vainqueurs, valeur), 2), dec(moyenne(perdants, valeur), 2)]),
  ),
  'Attention : la partie s\'arrête dès qu\'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.',
);

// ───────────────────────── 3. Cartes Assymétrie ─────────────────────────

section(
  'Cartes Assymétrie reçues au départ',
  'Ces cartes sont distribuées au hasard : c\'est la mesure la plus fiable de ce rapport, car elle ne dépend d\'aucun choix du joueur.',
  tableau(
    ['Carte', 'Joueurs l\'ayant reçue', 'Indice de victoire', 'À 2', 'À 3', 'À 4', 'Encore dans le deck des vainqueurs'],
    MATERIEL.cartes
      .filter((c) => c.origine === 'asymetrie')
      .map((c) => {
        const tous = indice((j) => j.asymetrie.includes(c.id));
        const gardee = part(vainqueurs.filter((j) => j.asymetrie.includes(c.id)), (j) => j.deckFinal.includes(c.id));
        return {
          tri: tous.indice ?? 0,
          ligne: [
            c.nom,
            tous.nombre,
            afficherIndice(tous),
            ...[2, 3, 4].map((t) => afficherIndice(indice((j) => j.table === t && j.asymetrie.includes(c.id)))),
            pc(gardee),
          ],
        };
      })
      .sort((a, b) => b.tri - a.tri)
      .map((x) => x.ligne),
  ),
);

// ───────────────────────── 4. Cartes Avancée ─────────────────────────

const avancees = MATERIEL.cartes
  .filter((c) => c.origine === 'avancee')
  .map((c) => {
    const acheteurs = indice((j) => j.achats.includes(c.id));
    return {
      c,
      acheteurs,
      achatsPour100: (100 * acheteurs.nombre) / joueurs.length,
      chezVainqueurs: part(vainqueurs, (j) => j.deckFinal.includes(c.id)),
      chezPerdants: part(perdants, (j) => j.deckFinal.includes(c.id)),
      jouee: moyenne(vainqueurs, (j) => j.jouees.filter((id) => id === c.id).length),
    };
  });
section(
  'Cartes Avancée achetées',
  `En moyenne, un vainqueur achète ${dec(moyenne(vainqueurs, (j) => j.achats.length), 2)} carte(s) et un perdant ${dec(moyenne(perdants, (j) => j.achats.length), 2)}.`,
  tableau(
    ['Carte', 'Coût', 'Achats pour 100 joueurs', 'Indice de victoire des acheteurs', 'Dans le deck final des vainqueurs', 'Dans le deck final des perdants'],
    avancees
      .filter((a) => a.acheteurs.nombre > 0)
      .sort((a, b) => b.achatsPour100 - a.achatsPour100)
      .map((a) => [
        a.c.nom,
        `${a.c.cout.or > 0 ? a.c.cout.or : ''}${'R'.repeat(a.c.cout.ressource)}`,
        dec(a.achatsPour100),
        afficherIndice(a.acheteurs),
        pc(a.chezVainqueurs),
        pc(a.chezPerdants),
      ]),
  ),
  `Jamais achetées : ${avancees.filter((a) => a.acheteurs.nombre === 0).map((a) => a.c.nom).join(', ') || 'aucune'}.`,
  'Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.',
);

// ───────────────────────── 5. Cartes trashées ─────────────────────────

const nomsDepart = [...new Set(MATERIEL.cartes.filter((c) => c.origine === 'depart').map((c) => c.nom))];
/** Rang de trash d'une carte de ce nom chez un joueur (1 = trashée en premier), ou null. */
const rangDeTrash = (j: Joueur, n: string) => {
  const rang = j.trashs.findIndex((id) => nom(id) === n);
  return rang === -1 ? null : rang + 1;
};
section(
  'Cartes de départ : lesquelles sont trashées, et dans quel ordre',
  `Un vainqueur trashe en moyenne ${dec(moyenne(vainqueurs, (j) => j.trashs.length), 2)} cartes, un perdant ${dec(moyenne(perdants, (j) => j.trashs.length), 2)}.`,
  tableau(
    ['Carte de départ', 'Trashée par les vainqueurs', 'Rang moyen du trash', 'Trashée en 1er', 'Trashée en 2e', 'Gardée jusqu\'à la fin (vainqueurs)', 'Trashée par les perdants'],
    nomsDepart
      .map((n) => {
        const rangs = vainqueurs.map((j) => rangDeTrash(j, n)).filter((r): r is number => r !== null);
        return {
          tri: rangs.length === 0 ? 99 : rangs.reduce((a, b) => a + b, 0) / rangs.length,
          ligne: [
            n,
            pc(rangs.length / vainqueurs.length),
            rangs.length === 0 ? '—' : dec(rangs.reduce((a, b) => a + b, 0) / rangs.length),
            pc(part(vainqueurs, (j) => rangDeTrash(j, n) === 1)),
            pc(part(vainqueurs, (j) => rangDeTrash(j, n) === 2)),
            pc(part(vainqueurs, (j) => j.deckFinal.some((id) => nom(id) === n))),
            pc(part(perdants, (j) => rangDeTrash(j, n) !== null)),
          ],
        };
      })
      .sort((a, b) => a.tri - b.tri)
      .map((x) => x.ligne),
  ),
  'Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.',
  `Cartes Assymétrie trashées par leur propriétaire vainqueur : ${
    MATERIEL.cartes
      .filter((c) => c.origine === 'asymetrie')
      .map((c) => {
        const proprietaires = vainqueurs.filter((j) => j.asymetrie.includes(c.id));
        return { nom: c.nom, part: part(proprietaires, (j) => j.trashs.includes(c.id)) };
      })
      .sort((a, b) => b.part - a.part)
      .map((x) => `${x.nom} ${pc(x.part)}`)
      .join(', ')
  }.`,
);

// ───────────────────────── 6. Privilèges ─────────────────────────

section(
  'Privilèges',
  tableau(
    ['Privilège', 'Effet', 'Chez les vainqueurs', 'Chez les perdants', 'Indice de victoire des possesseurs', 'Pris en 1er par ses possesseurs'],
    MATERIEL.privileges
      .map((p) => {
        const possesseurs = indice((j) => j.privileges.includes(p.numero));
        const ayant = joueurs.filter((j) => j.privileges.includes(p.numero));
        return {
          tri: part(vainqueurs, (j) => j.privileges.includes(p.numero)),
          ligne: [
            p.numero,
            p.texte.length > 60 ? `${p.texte.slice(0, 57)}…` : p.texte,
            pc(part(vainqueurs, (j) => j.privileges.includes(p.numero))),
            pc(part(perdants, (j) => j.privileges.includes(p.numero))),
            afficherIndice(possesseurs),
            pc(part(ayant, (j) => j.privileges[0] === p.numero)),
          ],
        };
      })
      .sort((a, b) => b.tri - a.tri)
      .map((x) => x.ligne),
  ),
  'Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l\'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.',
);

// ───────────────────────── 7. Jauges ─────────────────────────

const JAUGES: [Jauge, string][] = [
  ['economie', 'Économie'],
  ['population', 'Population'],
  ['noblesse', 'Noblesse (Privilège)'],
];
section(
  'Jauges : lesquelles sont montées en priorité',
  tableau(
    ['', 'Première montée (vainqueurs)', 'Première montée (perdants)', 'Parmi les 3 premières montées (vainqueurs)', 'Niveau final moyen (vainqueurs)', 'Niveau final moyen (perdants)', 'Au maximum (vainqueurs)'],
    JAUGES.map(([jauge, titre]) => {
      const niveau = (j: Joueur) =>
        jauge === 'economie' ? j.niveauEconomie : jauge === 'population' ? j.niveauPopulation : j.privileges.length;
      return [
        titre,
        pc(part(vainqueurs, (j) => j.montees[0] === jauge)),
        pc(part(perdants, (j) => j.montees[0] === jauge)),
        dec(moyenne(vainqueurs, (j) => j.montees.slice(0, 3).filter((m) => m === jauge).length), 2),
        dec(moyenne(vainqueurs, niveau), 2),
        dec(moyenne(perdants, niveau), 2),
        pc(part(vainqueurs, (j) => niveau(j) >= 4)),
      ];
    }),
  ),
  tableau(
    ['Indice de victoire selon le niveau final', '0', '1', '2', '3', '4'],
    [
      ['Économie', ...[0, 1, 2, 3, 4].map((n) => afficherIndice(indice((j) => j.niveauEconomie === n)))],
      ['Population', ...[0, 1, 2, 3, 4].map((n) => afficherIndice(indice((j) => j.niveauPopulation === n)))],
      ['Privilèges', ...[0, 1, 2, 3, 4].map((n) => afficherIndice(indice((j) => j.privileges.length === n)))],
    ],
  ),
);

// ───────────────────────── 8. Cartes les plus jouées ─────────────────────────

const nomsJoues = [...new Set(joueurs.flatMap((j) => j.jouees.map(nom)))];
section(
  'Cartes les plus jouées',
  tableau(
    ['Carte', 'Fois jouée par partie (vainqueurs)', 'Fois jouée par partie (perdants)'],
    nomsJoues
      .map((n) => ({
        n,
        v: moyenne(vainqueurs, (j) => j.jouees.filter((id) => nom(id) === n).length),
        p: moyenne(perdants, (j) => j.jouees.filter((id) => nom(id) === n).length),
      }))
      .sort((a, b) => b.v - a.v)
      .slice(0, 20)
      .map((x) => [x.n, dec(x.v, 2), dec(x.p, 2)]),
  ),
);

// ───────────────────────── 9. Effets Rouges par carte ─────────────────────────

const avecEffetRouge = [...new Set(MATERIEL.cartes.filter((c) => c.effetRouge.length > 0).map((c) => c.nom))];
const fois = (liste: { carte: string }[], n: string) => liste.filter((e) => nom(e.carte) === n).length;
section(
  'Effets Rouges par carte',
  "Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. " +
    "Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). " +
    "« Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.",
  tableau(
    [
      'Carte',
      'Fois jouée (toutes parties)',
      'Effet Rouge utilisé, pour 1 carte jouée',
      'dont choisi',
      'Utilisé par partie (vainqueurs)',
      'Utilisé par partie (perdants)',
    ],
    avecEffetRouge
      .map((n) => {
        const jouee = joueurs.reduce((t, j) => t + j.jouees.filter((id) => nom(id) === n).length, 0);
        const utilisations = joueurs.flatMap((j) => j.effetsRouges.filter((e) => nom(e.carte) === n));
        return {
          n,
          jouee,
          parCarte: jouee > 0 ? utilisations.length / jouee : 0,
          choisi: utilisations.length > 0 ? utilisations.filter((e) => e.choisi).length / utilisations.length : 0,
          v: moyenne(vainqueurs, (j) => fois(j.effetsRouges, n)),
          p: moyenne(perdants, (j) => fois(j.effetsRouges, n)),
        };
      })
      .filter((x) => x.jouee > 0)
      .sort((a, b) => b.v - a.v)
      .map((x) => [x.n, String(x.jouee), dec(x.parCarte, 2), pc(x.choisi), dec(x.v, 2), dec(x.p, 2)]),
  ),
);

// ───────────────────────── Écriture du rapport ─────────────────────────

const date = new Date().toISOString().slice(0, 10);
const rapport = [
  `# Analyse des parties entre IA — ${date}${variante ? ` (essai : Effet Rouge pour le joueur ${effetRouge === 'suivant' ? 'suivant' : 'précédent'} seulement)` : ''}`,
  `Bot : **${bot.nom}** à tous les sièges. ${parties} parties par taille de table (2, 3 et 4 joueurs), graines ${premiereGraine} à ${premiereGraine + parties - 1}.`,
  `${joueurs.length} joueurs observés, dont ${vainqueurs.length} vainqueurs.`,
  '> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d\'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.',
  ...sections,
].join('\n\n');

mkdirSync(new URL('../rapports/', import.meta.url), { recursive: true });
const fichier = new URL(`../rapports/analyse-${type}-${date}${variante}.md`, import.meta.url);
writeFileSync(fichier, rapport + '\n');
console.log(`\nRapport écrit dans rapports/analyse-${type}-${date}${variante}.md (${((Date.now() - debut) / 1000).toFixed(0)} s).`);
