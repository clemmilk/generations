// Mesure la force de chaque carte Avancée et de chaque Domaine par des parties « jumelles » (voir src/ai/forceCartes.ts).
//
//   npm run force-cartes
//   npm run force-cartes -- --games 400 --bot planificatrice --cartes "Démolisseur,Roi"
//
// Options :
//   --games N         parties par expérience (10000 par défaut)
//   --joueurs N       2, 3 ou 4 (3 par défaut)
//   --bot nom         entrainee (par défaut) ou planificatrice
//   --simulations N   pour le bot planificatrice : parties simulées par décision (40 par défaut)
//   --cartes a,b      seulement ces cartes Avancée (par leur nom) ; sinon toutes
//   --coeurs N        nombre de cœurs du processeur utilisés (12 par défaut)
//   --graine N        graine de la première partie (1 par défaut)
// Le rapport est écrit dans rapports/force-cartes-<bot>-<joueurs>j-<date>.md.

import { mkdirSync, writeFileSync } from 'node:fs';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import type { Bot } from '../src/ai/bot.ts';
import type { Consigne, TypeDeConsigne } from '../src/ai/contraintes.ts';
import { ecartApparie, fourchette, jouerPartieJumelle, siegeTeste } from '../src/ai/forceCartes.ts';
import type { Ecart } from '../src/ai/forceCartes.ts';
import { BOTS } from '../src/ai/index.ts';
import { creerBotPlanificateur } from '../src/ai/planification.ts';
import { carte } from '../src/game/cartes.ts';
import { MATERIEL } from '../src/game/materiel/index.ts';

interface Reglages {
  bot: 'entrainee' | 'planificatrice';
  simulations: number;
  joueurs: number;
}

/** Un paquet de parties confié à un cœur : une plage de graines, avec ou sans consigne. */
interface Paquet {
  consigne: Consigne | null;
  premiere: number;
  nombre: number;
}

interface Resultat {
  consigne: Consigne | null;
  parties: { graine: number; vainqueur: number | null; asymetrie: string[][]; achats: string[][] }[];
}

// ───────────────────────── Côté chef d'orchestre ─────────────────────────

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : process.argv[position + 1]!;
}

function quitter(message: string): never {
  console.error(message);
  process.exit(1);
}

async function principal(): Promise<void> {
  const parties = Number(option('games', '10000'));
  const joueurs = Number(option('joueurs', '3'));
  const bot = option('bot', 'entrainee');
  const simulations = Number(option('simulations', '40'));
  const coeurs = Number(option('coeurs', '12'));
  const premiere = Number(option('graine', '1'));
  if (!Number.isInteger(parties) || parties < 1) quitter('--games attend un nombre entier positif.');
  if (![2, 3, 4].includes(joueurs)) quitter('--joueurs attend 2, 3 ou 4.');
  if (bot !== 'entrainee' && bot !== 'planificatrice') quitter('--bot : entrainee ou planificatrice.');
  if (!Number.isInteger(coeurs) || coeurs < 1) quitter('--coeurs attend un nombre entier positif.');

  const avancees = MATERIEL.cartes.filter((c) => c.origine === 'avancee');
  const demandees = process.argv.includes('--cartes') ? option('cartes', '').split(',').map((n) => n.trim()) : null;
  for (const nom of demandees ?? []) {
    if (!avancees.some((c) => c.nom === nom)) quitter(`Carte Avancée inconnue : « ${nom} ».`);
  }
  const testees = demandees ? avancees.filter((c) => demandees.includes(c.nom)) : avancees;

  // Les paquets : la référence, puis chaque carte avec chaque consigne. Des paquets assez petits pour bien répartir le travail.
  const consignes: (Consigne | null)[] = [null];
  for (const c of testees) for (const type of ['interdit', 'prioritaire'] as TypeDeConsigne[]) consignes.push({ type, carte: c.id });
  const taille = bot === 'planificatrice' ? 2 : 250;
  const paquets: Paquet[] = [];
  for (const consigne of consignes) {
    for (let debut = 0; debut < parties; debut += taille) {
      paquets.push({ consigne, premiere: premiere + debut, nombre: Math.min(taille, parties - debut) });
    }
  }

  const total = paquets.length;
  const resultats: Resultat[] = [];
  const debut = Date.now();
  console.log(`${consignes.length} expériences × ${parties} parties à ${joueurs} joueurs, sur ${coeurs} cœurs…`);

  await new Promise<void>((fini) => {
    let actifs = 0;
    let dernierAffichage = 0;
    for (let i = 0; i < Math.min(coeurs, paquets.length); i++) {
      const ouvrier = new Worker(new URL(import.meta.url), { workerData: { bot, simulations, joueurs } satisfies Reglages });
      actifs++;
      const suivant = () => {
        const paquet = paquets.shift();
        if (paquet) ouvrier.postMessage(paquet);
        else {
          void ouvrier.terminate();
          if (--actifs === 0) fini();
        }
      };
      ouvrier.on('message', (resultat: Resultat) => {
        resultats.push(resultat);
        if (Date.now() - dernierAffichage > 10_000 || resultats.length === total) {
          dernierAffichage = Date.now();
          console.log(`  ${resultats.length}/${total} paquets (${Math.round((Date.now() - debut) / 1000)} s)`);
        }
        suivant();
      });
      ouvrier.on('error', (erreur: Error) => quitter(`Erreur dans un cœur de calcul : ${erreur.message}`));
      suivant();
    }
  });

  const secondes = Math.round((Date.now() - debut) / 1000);
  const fichier = ecrireRapport({ resultats, joueurs, parties, bot, simulations, premiere, testees: testees.map((c) => c.id), secondes });
  console.log(`Rapport écrit dans ${fichier} (${secondes} s).`);
}

// ───────────────────────── Rapport ─────────────────────────

const cle = (consigne: Consigne | null) => (consigne ? `${consigne.type}:${consigne.carte}` : 'reference');
const signe = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(x).toFixed(1)}`;
/** « ! » quand la fourchette ne contient pas zéro : l'écart ne peut pas venir du seul hasard. */
const ecartTexte = (e: Ecart) => `${signe(e.points)} (${signe(e.basse)} à ${signe(e.haute)})${e.basse > 0 || e.haute < 0 ? ' !' : ''}`;
const pc = (k: number, n: number) => `${n === 0 ? '—' : ((100 * k) / n).toFixed(1)} %`;

function ecrireRapport(r: {
  resultats: Resultat[];
  joueurs: number;
  parties: number;
  bot: string;
  simulations: number;
  premiere: number;
  testees: string[];
  secondes: number;
}): string {
  const parExperience = new Map<string, Resultat['parties']>();
  for (const resultat of r.resultats) {
    const k = cle(resultat.consigne);
    parExperience.set(k, [...(parExperience.get(k) ?? []), ...resultat.parties]);
  }
  const reference = new Map((parExperience.get('reference') ?? []).map((p) => [p.graine, p]));
  const nonTerminees = [...parExperience.values()].flat().filter((p) => p.vainqueur === null).length;

  // Pour une carte et une consigne : écart de victoires du siège testé, et part des parties où il a acheté la carte.
  const mesurer = (type: TypeDeConsigne, id: string) => {
    const avec = parExperience.get(cle({ type, carte: id })) ?? [];
    const paires = avec.map((p) => {
      const s = siegeTeste(p.graine, r.joueurs);
      return { avec: p.vainqueur === s, sans: reference.get(p.graine)!.vainqueur === s };
    });
    const achetee = avec.filter((p) => p.achats[siegeTeste(p.graine, r.joueurs)]!.includes(id)).length;
    return { ecart: ecartApparie(paires), achetee, parties: avec.length };
  };

  const cartes = r.testees.map((id) => {
    const enTempsNormal = [...reference.values()].filter((p) => p.achats[siegeTeste(p.graine, r.joueurs)]!.includes(id)).length;
    const c = carte(id);
    return {
      nom: c.nom,
      cout: `${c.cout.or > 0 ? c.cout.or : ''}${'R'.repeat(c.cout.ressource)}`,
      enTempsNormal,
      interdite: mesurer('interdit', id),
      prioritaire: mesurer('prioritaire', id),
    };
  });
  const rangPrioritaire = new Map(
    [...cartes].sort((a, b) => b.prioritaire.ecart.points - a.prioritaire.ecart.points).map((c, i) => [c.nom, i + 1]),
  );
  cartes.sort((a, b) => a.interdite.ecart.points - b.interdite.ecart.points);

  const nomBot = r.bot === 'planificatrice' ? `IA qui planifie (${r.simulations} simulations)` : 'IA entraînée';
  const date = new Date();
  const jour = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const attendu = 100 / r.joueurs;

  const lignes: string[] = [
    `# Force des cartes — ${jour}`,
    '',
    `Bot : **${nomBot}** à tous les sièges. Parties à **${r.joueurs} joueurs**, ${r.parties} parties par expérience (graines ${r.premiere} à ${r.premiere + r.parties - 1}). Calcul : ${Math.round(r.secondes / 60)} min.`,
    '',
    '## Comment lire ce rapport',
    '',
    'Chaque graine est jouée plusieurs fois : une partie de **référence**, où tout le monde joue normalement, puis une partie par expérience, où **un seul joueur** reçoit une consigne. Ce joueur change de siège d\'une graine à l\'autre.',
    '',
    '- **Interdite** : ce joueur n\'a pas le droit d\'acheter la carte. Si l\'écart est très négatif, la carte lui manque : elle est forte.',
    '- **Prioritaire** : ce joueur achète la carte dès qu\'il le peut. Si l\'écart est positif, la viser est une bonne stratégie ; s\'il est négatif, l\'acheter à tout prix fait perdre.',
    '',
    `L'écart est en **points de victoire** : « −3.0 » veut dire que ce joueur gagne 3 parties de moins sur 100 (à ${r.joueurs} joueurs, un joueur gagne en moyenne ${attendu.toFixed(1)} parties sur 100). Entre parenthèses, la fourchette à 95 % ; un **!** signale un écart qui ne peut pas venir du seul hasard.`,
    '',
    '> Ces chiffres mesurent les cartes telles que ce bot les joue. Une carte qu\'il utilise mal paraîtra plus faible qu\'elle ne l\'est.',
    '',
  ];

  if (cartes.length > 0) {
    lignes.push(
      '## Cartes Avancée',
      '',
      'Classées de la plus regrettée quand elle est interdite (en haut) à la moins regrettée. « Achetée en temps normal » : part des parties de référence où ce joueur l\'achète. Une carte rarement achetée en temps normal ne peut pas beaucoup manquer quand on l\'interdit.',
      '',
      '| Carte | Coût | Achetée en temps normal | Interdite : écart | Prioritaire : écart | Rang en prioritaire | Achetée quand prioritaire |',
      '|---|---:|---:|---:|---:|---:|---:|',
    );
    for (const c of cartes) {
      lignes.push(
        `| ${c.nom} | ${c.cout} | ${pc(c.enTempsNormal, reference.size)} | ${ecartTexte(c.interdite.ecart)} | ${ecartTexte(c.prioritaire.ecart)} | ${rangPrioritaire.get(c.nom)} | ${pc(c.prioritaire.achetee, c.prioritaire.parties)} |`,
      );
    }
    lignes.push('');
  }

  // Les Domaines sont distribués au hasard : les parties de référence suffisent à les comparer.
  const domaines = MATERIEL.cartes
    .filter((c) => c.origine === 'asymetrie')
    .map((c) => {
      let recu = 0;
      let gagne = 0;
      for (const p of reference.values()) {
        p.asymetrie.forEach((cartesDuSiege, siege) => {
          if (!cartesDuSiege.includes(c.id)) return;
          recu++;
          if (p.vainqueur === siege) gagne++;
        });
      }
      return { nom: c.nom, recu, gagne, f: fourchette(gagne, recu) };
    })
    .sort((a, b) => b.f.taux - a.f.taux);
  lignes.push(
    '## Domaines',
    '',
    `Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de ${attendu.toFixed(1)} %. Un **!** signale un écart qui ne peut pas venir du seul hasard.`,
    '',
    '| Domaine | Joueurs l\'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |',
    '|---|---:|---:|---:|',
  );
  for (const d of domaines) {
    const net = d.f.basse > attendu || d.f.haute < attendu ? ' !' : '';
    lignes.push(
      `| ${d.nom} | ${d.recu} | ${d.f.taux.toFixed(1)} % (${d.f.basse.toFixed(1)} à ${d.f.haute.toFixed(1)})${net} | ${(d.f.taux / attendu).toFixed(2)} |`,
    );
  }
  lignes.push('');
  if (nonTerminees > 0) lignes.push(`Parties non terminées (comptées sans vainqueur) : ${nonTerminees}.`, '');

  mkdirSync(new URL('../rapports/', import.meta.url), { recursive: true });
  const nom = `rapports/force-cartes-${r.bot}-${r.joueurs}j-${jour}.md`;
  writeFileSync(new URL(`../${nom}`, import.meta.url), lignes.join('\n'), 'utf8');
  return nom;
}

// ───────────────────────── Côté cœur de calcul ─────────────────────────

if (!isMainThread) {
  const reglages = workerData as Reglages;
  const bot: Bot =
    reglages.bot === 'planificatrice'
      ? creerBotPlanificateur(`IA qui planifie (${reglages.simulations})`, { guide: BOTS.entrainee, simulations: reglages.simulations })
      : BOTS.entrainee;
  parentPort!.on('message', (paquet: Paquet) => {
    const parties = Array.from({ length: paquet.nombre }, (_, i) => {
      const p = jouerPartieJumelle(bot, reglages.joueurs, paquet.premiere + i, paquet.consigne);
      return { graine: p.graine, vainqueur: p.vainqueur, asymetrie: p.asymetrieDeDepart, achats: p.achatsParSiege };
    });
    parentPort!.postMessage({ consigne: paquet.consigne, parties } satisfies Resultat);
  });
} else {
  await principal();
}
