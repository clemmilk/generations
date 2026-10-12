// Entraîne le bot à préférences en le faisant jouer contre lui-même, puis enregistre ses poids
// dans src/ai/poids-entraines.json (c'est le bot « IA entraînée » de l'interface).
//
//   npm run train
//   npm run train -- --generations 60 --depuis entraine
//
// Options :
//   --generations N    nombre de générations (40 par défaut)
//   --variantes N      variantes essayées par génération (12 par défaut)
//   --graines N        graines pour comparer les variantes (40 par défaut, 3 parties par graine)
//   --confirmation N   graines pour confirmer la meilleure variante (300 par défaut)
//   --seuil X          force à atteindre pour détrôner le champion (1.06 par défaut ; 1 = égalité)
//   --progres X        force que le champion final doit atteindre contre les poids de départ
//                      pour être enregistré (1.03 par défaut) ; sinon les poids de départ sont gardés
//   --depuis manuel|entraine   poids de départ : les réglages manuels (par défaut) ou le dernier entraînement
//   --graine N         graine de l'entraînement (1 par défaut)

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { entrainer, mesurer } from '../src/ai/entrainement.ts';
import { completer } from '../src/ai/index.ts';
import { POIDS_MANUELS } from '../src/ai/poids.ts';
import type { Poids } from '../src/ai/poids.ts';

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : (process.argv[position + 1] ?? defaut);
}

const fichier = new URL('../src/ai/poids-entraines.json', import.meta.url);
const depuis = option('depuis', 'manuel');
let depart: Poids = POIDS_MANUELS;
if (depuis === 'entraine') {
  if (!existsSync(fichier)) {
    console.error('Aucun entraînement précédent : relancer sans --depuis entraine.');
    process.exit(1);
  }
  depart = completer(JSON.parse(readFileSync(fichier, 'utf8')).poids);
}

const options = {
  depart,
  generations: Number(option('generations', '40')),
  variantes: Number(option('variantes', '12')),
  graines: Number(option('graines', '40')),
  grainesDeConfirmation: Number(option('confirmation', '300')),
  seuil: Number(option('seuil', '1.06')),
  graine: Number(option('graine', '1')),
};
if (Object.values(options).some((valeur) => typeof valeur === 'number' && !Number.isFinite(valeur))) {
  console.error('Une option numérique est mal écrite.');
  process.exit(1);
}

console.log(
  `Entraînement : ${options.generations} générations de ${options.variantes} variantes, ` +
    `à partir des poids « ${depuis} ».`,
);
const debut = Date.now();
const etapes = entrainer(options, (etape) => {
  console.log(
    `Génération ${String(etape.generation).padStart(3)} : meilleure variante ${etape.essai.toFixed(2)}, ` +
      `confirmation ${etape.confirmation.toFixed(2)} ${etape.adoptee ? '→ nouveau champion' : ''}`,
  );
});
let champion = etapes.at(-1)?.champion ?? depart;

// Garde-fou : chaque changement de champion est décidé sur un nombre limité de parties, et le hasard
// peut en faire passer de mauvais. On vérifie donc, sur beaucoup de parties neuves, que le champion
// final bat vraiment les poids de départ. Sinon, on garde les poids de départ.
const progres = mesurer(champion, depart, Array.from({ length: 600 }, (_, i) => 800_000 + i));
console.log(`\nChampion final contre les poids de départ : force ${progres.force.toFixed(2)} (1 = égalité).`);
if (progres.force < Number(option('progres', '1.03'))) {
  console.log('Progrès non confirmé : les poids de départ sont conservés.');
  champion = depart;
}

// Vérification finale, sur des parties que l'entraînement n'a jamais vues.
const graines = Array.from({ length: 400 }, (_, i) => 900_000 + i);
const bilan = mesurer(champion, POIDS_MANUELS, graines);
const pourcent = (v: number, n: number) => `${((100 * v) / Math.max(1, n)).toFixed(1)} %`;
console.log(`\nChampion contre les réglages manuels, sur ${graines.length * 3} parties neuves :`);
console.log(`  à 2 joueurs : ${pourcent(bilan.victoiresA2, bilan.partiesA2)} de victoires (égalité = 50 %)`);
console.log(`  à 4 joueurs, seul contre 3 : ${pourcent(bilan.victoiresA4, bilan.partiesA4)} (égalité = 25 %)`);

writeFileSync(
  fichier,
  JSON.stringify(
    {
      date: new Date().toISOString().slice(0, 10),
      generations: options.generations,
      championsSuccessifs: etapes.filter((etape) => etape.adoptee).length,
      contreReglagesManuels: {
        victoiresA2: pourcent(bilan.victoiresA2, bilan.partiesA2),
        victoiresA4: pourcent(bilan.victoiresA4, bilan.partiesA4),
      },
      poids: champion,
    },
    null,
    2,
  ) + '\n',
);
console.log(`\nPoids enregistrés dans src/ai/poids-entraines.json (${((Date.now() - debut) / 60000).toFixed(1)} min).`);
console.log('Poids du champion :', champion);
