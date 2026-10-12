// Fait jouer des bots entre eux et affiche des statistiques d'équilibrage.
//
//   npm run simulate -- --games 1000
//   npm run simulate -- --games 500 --joueurs 4 --bots aleatoire,aleatoire,aleatoire,aleatoire
//
// Options :
//   --games N      nombre de parties par taille de table (1000 par défaut)
//   --joueurs N    2, 3 ou 4 ; sans cette option, les trois tailles de table sont simulées
//   --bots a,b,c   le bot de chaque siège (par défaut, le premier bot de la liste partout)
//   --graine N     graine de la première partie (1 par défaut)

import { BOTS } from '../src/ai/index.ts';
import type { TypeDeBot } from '../src/ai/index.ts';
import { formaterResume, resumer, simulerPartie } from '../src/ai/simulation.ts';

function option(nom: string): string | undefined {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? undefined : process.argv[position + 1];
}

function quitter(message: string): never {
  console.error(message);
  process.exit(1);
}

const parties = Number(option('games') ?? 1000);
const graineDeDepart = Number(option('graine') ?? 1);
if (!Number.isInteger(parties) || parties < 1) quitter('--games attend un nombre entier positif.');
if (!Number.isInteger(graineDeDepart)) quitter('--graine attend un nombre entier.');

const types = Object.keys(BOTS) as TypeDeBot[];
const demandes = option('bots')?.split(',').map((nom) => nom.trim());
for (const nom of demandes ?? []) {
  if (!types.includes(nom as TypeDeBot)) quitter(`Bot inconnu « ${nom} ». Bots disponibles : ${types.join(', ')}.`);
}

const joueursDemandes = option('joueurs');
const tables = joueursDemandes ? [Number(joueursDemandes)] : demandes ? [demandes.length] : [2, 3, 4];
for (const n of tables) {
  if (![2, 3, 4].includes(n)) quitter('--joueurs attend 2, 3 ou 4.');
  if (demandes && demandes.length !== n) quitter(`--bots doit donner ${n} bots pour ${n} joueurs.`);
}

for (const n of tables) {
  const bots = Array.from({ length: n }, (_, i) => BOTS[(demandes?.[i] ?? types[0]) as TypeDeBot]);
  const debut = Date.now();
  const resultats = Array.from({ length: parties }, (_, i) => simulerPartie(bots, graineDeDepart + i));
  console.log(formaterResume(resumer(resultats, n), bots));
  console.log(`\n(${parties} parties simulées en ${((Date.now() - debut) / 1000).toFixed(1)} s)\n`);
}
