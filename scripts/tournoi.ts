// Tournoi de stratégies : entraîne une IA forcée de jouer d'une certaine façon, puis la mesure contre
// l'IA entraînée actuelle. Sert à vérifier qu'aucune stratégie n'a été ratée par l'entraînement habituel.
//
//   npm run tournoi -- --strategie acheteuse
//   npm run tournoi -- --liste
//
// Options :
//   --strategie nom    la stratégie à entraîner (voir --liste)
//   --generations N    nombre de générations (40 par défaut)
//   --graine N         graine de l'entraînement (1 par défaut)
// Le résultat est écrit dans rapports/tournoi/<nom>.json.

import { mkdirSync, writeFileSync } from 'node:fs';
import { borner, entrainerContre, mesurer } from '../src/ai/entrainement.ts';
import type { Bornes } from '../src/ai/entrainement.ts';
import { completer } from '../src/ai/index.ts';
import entrainement from '../src/ai/poids-entraines.json' with { type: 'json' };
import type { Poids } from '../src/ai/poids.ts';

const champion = completer(entrainement.poids);

interface Strategie {
  description: string;
  /** Ce qu'on change au champion pour le point de départ. */
  depart: Partial<Poids>;
  /** Ce que la stratégie doit toujours respecter. */
  bornes: Bornes;
}

const STRATEGIES: Record<string, Strategie> = {
  libre: {
    description: 'Témoin : aucune contrainte. Montre ce que cette méthode gagne à elle seule contre le champion.',
    depart: {},
    bornes: {},
  },
  acheteuse: {
    description: 'Aime acheter : une carte de plus dans le deck est vue comme un gain, jamais comme une gêne.',
    depart: { achat: 4 },
    bornes: { achat: { min: 2 } },
  },
  pioche: {
    description: 'Mise sur la pioche plutôt que sur l\'épuration : trashe peu, valorise fortement pioches et Pierre.',
    depart: { seuilTrash: 2, trash: 3, pioche: 8, piocheCarte: 1, pierre: 4, achat: 0, margeFinale: 1 },
    bornes: { seuilTrash: { max: 4 }, trash: { max: 5 }, pioche: { min: 5 }, achat: { min: -2 }, margeFinale: { max: 1 } },
  },
  population: {
    description: 'Monte la Population en priorité absolue, et garde des ressources pour cela.',
    depart: { lvlupPopulation: 20, pierre: 4, metal: 4 },
    bornes: { lvlupPopulation: { min: 14 }, pierre: { min: 3 }, metal: { min: 3 } },
  },
  privileges: {
    description: 'Vise les Privilèges et les Érudits avant tout.',
    depart: { privilege: 20, erudit: 5 },
    bornes: { privilege: { min: 14 }, erudit: { min: 4 } },
  },
};

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : (process.argv[position + 1] ?? defaut);
}

if (process.argv.includes('--liste')) {
  for (const [nom, strategie] of Object.entries(STRATEGIES)) console.log(`${nom.padEnd(12)} ${strategie.description}`);
  process.exit(0);
}

const nom = option('strategie', '');
const strategie = STRATEGIES[nom];
if (!strategie) {
  console.error(`Stratégie inconnue « ${nom} ». Disponibles : ${Object.keys(STRATEGIES).join(', ')}.`);
  process.exit(1);
}

const debut = Date.now();
const depart = borner({ ...champion, ...strategie.depart }, strategie.bornes);
const pourcent = (v: number, n: number) => Math.round((1000 * v) / Math.max(1, n)) / 10;
const bilan = (poids: Poids) => {
  const m = mesurer(poids, champion, Array.from({ length: 500 }, (_, i) => 600_000 + i));
  return { force: Math.round(m.force * 100) / 100, victoiresA2: pourcent(m.victoiresA2, m.partiesA2), victoiresA4: pourcent(m.victoiresA4, m.partiesA4) };
};

const avant = bilan(depart);
console.log(`[${nom}] départ : force ${avant.force} (à 2 : ${avant.victoiresA2} %, à 4 : ${avant.victoiresA4} %)`);

const etapes = entrainerContre(
  {
    depart,
    bornes: strategie.bornes,
    adversaire: champion,
    generations: Number(option('generations', '40')),
    variantes: 12,
    graines: 40,
    grainesDeConfirmation: 200,
    progres: 0.03,
    graine: Number(option('graine', '1')),
  },
  (etape) => {
    if (etape.adoptee) console.log(`[${nom}] génération ${etape.generation} : force ${etape.force.toFixed(2)}`);
  },
);
const final = etapes.at(-1)?.champion ?? depart;
const apres = bilan(final);
console.log(`[${nom}] arrivée : force ${apres.force} (à 2 : ${apres.victoiresA2} %, à 4 : ${apres.victoiresA4} %) en ${((Date.now() - debut) / 60000).toFixed(1)} min`);

mkdirSync(new URL('../rapports/tournoi/', import.meta.url), { recursive: true });
writeFileSync(
  new URL(`../rapports/tournoi/${nom}.json`, import.meta.url),
  JSON.stringify(
    {
      strategie: nom,
      description: strategie.description,
      bornes: strategie.bornes,
      contreLeChampion: { avantEntrainement: avant, apresEntrainement: apres },
      adoptions: etapes.filter((etape) => etape.adoptee).length,
      poids: final,
    },
    null,
    2,
  ) + '\n',
);
