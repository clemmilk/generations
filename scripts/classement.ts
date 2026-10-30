// Classement des cartes d'après les parties d'un bot, centré sur les vainqueurs :
// - cartes Avancée : les plus achetées et les plus jouées par les vainqueurs ;
// - Domaines : les plus joués et les moins trashés par les vainqueurs qui les avaient ;
// - cartes de départ : les plus trashées et les plus jouées par les vainqueurs.
//
//   npm run classement -- --games 1000
//
// Options : --games N (parties par taille de table, 1000 par défaut), --bot nom (entrainee par défaut).
// Le rapport est écrit dans rapports/classement-cartes-<date>.md.

import { mkdirSync, writeFileSync } from 'node:fs';
import { BOTS } from '../src/ai/index.ts';
import type { TypeDeBot } from '../src/ai/index.ts';
import { observerPartie } from '../src/ai/observation.ts';
import type { ObservationJoueur } from '../src/ai/observation.ts';
import { carte } from '../src/game/cartes.ts';
import { MATERIEL } from '../src/game/materiel/index.ts';

function option(nom: string, defaut: string): string {
  const position = process.argv.indexOf(`--${nom}`);
  return position === -1 ? defaut : (process.argv[position + 1] ?? defaut);
}

const parties = Number(option('games', '1000'));
const type = option('bot', 'entrainee') as TypeDeBot;
const bot = BOTS[type];
if (!bot) throw new Error(`Bot inconnu : ${type}`);

const joueurs: ObservationJoueur[] = [];
for (const n of [2, 3, 4]) {
  for (let graine = 1; graine <= parties; graine++) {
    const partie = observerPartie(Array(n).fill(bot), graine);
    if (partie.terminee) joueurs.push(...partie.joueurs);
  }
}
const vainqueurs = joueurs.filter((j) => j.gagne);
const tauxGlobal = vainqueurs.length / joueurs.length;

const nom = (id: string) => carte(id).nom;
const compter = (ids: string[], cible: string) => ids.filter((id) => nom(id) === cible).length;
const parCent = (valeur: number, sur: number) => (sur > 0 ? (100 * valeur) / sur : 0);
const f1 = (x: number) => x.toFixed(1).replace('.', ',');
const f2 = (x: number) => x.toFixed(2).replace('.', ',');
/** Indice de victoire : 1 = autant de victoires que la moyenne. Un « ? » si trop peu de joueurs. */
const indice = (groupe: ObservationJoueur[]) =>
  groupe.length === 0 ? '—' : `${f2(groupe.filter((j) => j.gagne).length / groupe.length / tauxGlobal)}${groupe.length < 100 ? ' ?' : ''}`;

const noms = (origine: string) => [...new Set(MATERIEL.cartes.filter((c) => c.origine === origine).map((c) => c.nom))];
const lignes: string[] = [];
const titre = (texte: string) => lignes.push('', `## ${texte}`, '');

lignes.push(
  `# Classement des cartes — ${new Date().toLocaleDateString('fr-FR')}`,
  '',
  `Bot : **${bot.nom}** à tous les sièges. ${parties} parties par taille de table (2, 3 et 4 joueurs), ` +
    `soit ${joueurs.length} joueurs observés, dont ${vainqueurs.length} vainqueurs.`,
  '',
  '> Ces chiffres décrivent la façon de jouer de ce bot. Une carte peu utilisée peut être faible, ou simplement mal jugée par le bot.',
  '> Indice de victoire : 1 = ceux qui ont fait ce choix gagnent autant que la moyenne ; 1,3 = 30 % de plus.',
);

// Cartes Avancée
titre('Cartes Avancée : les plus achetées et jouées par les vainqueurs');
lignes.push('Classées par nombre de fois jouées par les vainqueurs (pour 100 vainqueurs).', '');
lignes.push('| Rang | Carte | Coût | Jouée (pour 100 vainqueurs) | Achetée (pour 100 vainqueurs) | Dans le deck final des vainqueurs | Indice de victoire des acheteurs |');
lignes.push('|---:|---|---:|---:|---:|---:|---:|');
const avancees = noms('avancee').map((n) => {
  const c = MATERIEL.cartes.find((x) => x.nom === n)!;
  const acheteurs = joueurs.filter((j) => compter(j.achats, n) > 0);
  return {
    n,
    cout: `${c.cout.or > 0 ? c.cout.or : ''}${'P'.repeat(c.cout.pierre)}${'M'.repeat(c.cout.metal)}${'R'.repeat(c.cout.ressource)}`,
    jouee: parCent(vainqueurs.reduce((t, j) => t + compter(j.jouees, n), 0), vainqueurs.length),
    achetee: parCent(vainqueurs.reduce((t, j) => t + compter(j.achats, n), 0), vainqueurs.length),
    finale: parCent(vainqueurs.filter((j) => compter(j.deckFinal, n) > 0).length, vainqueurs.length),
    indice: indice(acheteurs),
  };
});
avancees.sort((a, b) => b.jouee - a.jouee || b.achetee - a.achetee);
avancees.forEach((a, i) =>
  lignes.push(`| ${i + 1} | ${a.n} | ${a.cout} | ${f1(a.jouee)} | ${f1(a.achetee)} | ${f1(a.finale)} % | ${a.indice} |`),
);

// Domaines
titre('Domaines : les plus joués et les moins trashés par les vainqueurs');
lignes.push("Parmi les vainqueurs qui avaient reçu le Domaine. Classés par nombre de fois joué par partie.", '');
lignes.push('| Rang | Domaine | Joué par partie (vainqueurs) | Gardé jusqu\'à la fin (vainqueurs) | Trashé (vainqueurs) | Indice de victoire de ceux qui l\'ont reçu |');
lignes.push('|---:|---|---:|---:|---:|---:|');
const domaines = noms('asymetrie').map((n) => {
  const recu = joueurs.filter((j) => compter(j.asymetrie, n) > 0);
  const gagnants = recu.filter((j) => j.gagne);
  return {
    n,
    jouee: gagnants.length ? gagnants.reduce((t, j) => t + compter(j.jouees, n), 0) / gagnants.length : 0,
    garde: parCent(gagnants.filter((j) => compter(j.deckFinal, n) > 0).length, gagnants.length),
    trashe: parCent(gagnants.filter((j) => compter(j.trashs, n) > 0).length, gagnants.length),
    indice: indice(recu),
  };
});
domaines.sort((a, b) => b.jouee - a.jouee || b.garde - a.garde);
domaines.forEach((d, i) => lignes.push(`| ${i + 1} | ${d.n} | ${f2(d.jouee)} | ${f1(d.garde)} % | ${f1(d.trashe)} % | ${d.indice} |`));

// Cartes de départ
const depart = noms('depart').map((n) => ({
  n,
  trashee: parCent(vainqueurs.filter((j) => compter(j.trashs, n) > 0).length, vainqueurs.length),
  jouee: vainqueurs.reduce((t, j) => t + compter(j.jouees, n), 0) / vainqueurs.length,
  trasheePerdants: parCent(
    joueurs.filter((j) => !j.gagne && compter(j.trashs, n) > 0).length,
    joueurs.filter((j) => !j.gagne).length,
  ),
}));
titre('Cartes de départ : les plus trashées par les vainqueurs');
lignes.push('| Rang | Carte | Trashée par les vainqueurs | Trashée par les perdants | Jouée par partie (vainqueurs) |');
lignes.push('|---:|---|---:|---:|---:|');
[...depart]
  .sort((a, b) => b.trashee - a.trashee)
  .forEach((d, i) => lignes.push(`| ${i + 1} | ${d.n} | ${f1(d.trashee)} % | ${f1(d.trasheePerdants)} % | ${f2(d.jouee)} |`));
titre('Cartes de départ : les plus jouées par les vainqueurs');
lignes.push('| Rang | Carte | Jouée par partie (vainqueurs) | Trashée par les vainqueurs |');
lignes.push('|---:|---|---:|---:|');
[...depart]
  .sort((a, b) => b.jouee - a.jouee)
  .forEach((d, i) => lignes.push(`| ${i + 1} | ${d.n} | ${f2(d.jouee)} | ${f1(d.trashee)} % |`));

const date = new Date();
const jour = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
mkdirSync(new URL('../rapports/', import.meta.url), { recursive: true });
const fichier = new URL(`../rapports/classement-cartes-${type}-${jour}.md`, import.meta.url);
writeFileSync(fichier, lignes.join('\n') + '\n', 'utf8');
console.log(`Classement écrit dans rapports/classement-cartes-${type}-${jour}.md`);
