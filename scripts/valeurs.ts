// Écrit le tableau des valeurs que les IA donnent aux cartes : rapports/valeurs-des-cartes.md
//
//   npm run valeurs
//
// Ces valeurs servent aux IA « à préférences » pour choisir quoi acheter, quoi trasher, quoi rechercher
// et quoi défausser. Elles sont calculées hors contexte (sans regarder le reste du deck), à partir des poids
// de chaque IA. L'IA qui planifie n'a pas de tableau : elle simule la suite de la partie.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { completer } from '../src/ai/index.ts';
import entrainement from '../src/ai/poids-entraines.json' with { type: 'json' };
import { POIDS_MANUELS } from '../src/ai/poids.ts';
import type { Poids } from '../src/ai/poids.ts';
import { valeurCarte } from '../src/ai/preferences.ts';
import { MATERIEL } from '../src/game/materiel/index.ts';
import type { Carte } from '../src/game/materiel/index.ts';
import { PARAMETRES } from '../src/game/parametres.ts';

const racine = new URL('../', import.meta.url);

/** Les IA comparées : les réglages manuels, l'IA entraînée, et les stratégies du tournoi si elles existent. */
const ias: { nom: string; poids: Poids }[] = [
  { nom: 'Réglée à la main', poids: POIDS_MANUELS },
  { nom: 'Entraînée (champion)', poids: completer(entrainement.poids) },
];
for (const [fichier, nom] of [
  ['pioche', 'Stratégie pioche'],
  ['acheteuse', 'Stratégie acheteuse'],
  ['population', 'Stratégie Population'],
] as const) {
  const chemin = new URL(`rapports/tournoi/${fichier}.json`, racine);
  if (existsSync(chemin)) ias.push({ nom, poids: completer(JSON.parse(readFileSync(chemin, 'utf8')).poids) });
}

const sansPrivilege = { privileges: [] };
const valeur = (c: Carte, p: Poids) => valeurCarte(sansPrivilege, c.id, p);
const chiffre = (x: number) => x.toFixed(1);
const coutTexte = (c: Carte) => `${c.cout.or > 0 ? c.cout.or : ''}${'R'.repeat(c.cout.ressource)}` || '—';
const ressourcesTexte = (c: Carte) =>
  `${'P'.repeat(c.ressources.pierre)}${'M'.repeat(c.ressources.metal)}${'E'.repeat(c.ressources.erudit)}`;

function tableau(entetes: string[], lignes: (string | number)[][]): string {
  return [
    `| ${entetes.join(' | ')} |`,
    `|${entetes.map((_, i) => (i < 2 ? '---' : '---:')).join('|')}|`,
    ...lignes.map((ligne) => `| ${ligne.join(' | ')} |`),
  ].join('\n');
}

/** Les cartes d'une origine, une seule fois par nom (les decks de départ sont identiques). */
function cartes(origine: Carte['origine']): Carte[] {
  const vues = new Set<string>();
  return MATERIEL.cartes.filter((c) => c.origine === origine && !vues.has(c.nom) && vues.add(c.nom));
}

/** Tableau des valeurs d'un groupe de cartes, trié selon la valeur du champion. */
function tableauDeValeurs(liste: Carte[]): string {
  const champion = ias[1]!.poids;
  return tableau(
    ['Carte', 'Effet', ...ias.map((ia) => ia.nom)],
    [...liste]
      .sort((a, b) => valeur(b, champion) - valeur(a, champion))
      .map((c) => [
        `${c.nom} (${ressourcesTexte(c)})`,
        c.texteEffet.length > 55 ? `${c.texteEffet.slice(0, 52)}…` : c.texteEffet,
        ...ias.map((ia) => {
          const v = valeur(c, ia.poids);
          // Une carte sous le seuil de trash est une carte dont l'IA accepte de se séparer.
          return v < ia.poids.seuilTrash ? `*${chiffre(v)}*` : chiffre(v);
        }),
      ]),
  );
}

/** Note d'achat d'une carte pour une IA, sans compter les ressources éventuelles à défausser. */
function noteAchat(c: Carte, p: Poids, avecTrash: boolean): number {
  const note = valeur(c, p) + p.achat - c.cout.or * p.or - c.cout.ressource * Math.min(p.pierre, p.metal);
  return avecTrash ? note + p.trash - PARAMETRES.surcoutTrashAchat * p.or : note;
}

const champion = ias[1]!.poids;
const sections = [
  '# Valeur des cartes pour les IA',
  `Généré le ${new Date().toISOString().slice(0, 10)} par \`npm run valeurs\`.`,
  [
    '## Comment lire ces tableaux',
    '',
    '- La valeur d\'une carte est exprimée **en Or** : 5 veut dire « vaut autant pour l\'IA que 5 Or ».',
    '- Elle additionne la valeur des ressources de la carte (Pierre, Métal, Érudit) et celle de son effet, coût de l\'effet déduit.',
    '- Elle est **calculée hors contexte** : l\'IA ne regarde pas le reste de son deck. Un effet « par Pierre » ou « par blason » est compté comme s\'il s\'appliquait un nombre fixe de fois.',
    '- Une valeur en *italique* est **sous le seuil de trash** de cette IA : c\'est une carte dont elle accepte de se séparer.',
    '- Ce tableau sert aux choix d\'achat, de trash, de recherche et de défausse. Pour décider quelle carte **jouer**, l\'IA recalcule la valeur de l\'effet dans la situation du moment.',
    '- La valeur de la vente au Marché ou au Commerce n\'apparaît pas : elle est jugée au moment de vendre, carte par carte.',
  ].join('\n'),
  [
    '## Les poids qui fabriquent ces valeurs',
    '',
    tableau(
      ['Poids', 'Ce qu\'il mesure', ...ias.map((ia) => ia.nom)],
      (
        [
          ['pioche', 'Valeur d\'1 carte piochée'],
          ['piocheCarte', 'Part de la valeur des cartes de sa pioche ajoutée à chaque pioche'],
          ['piocheProche', 'Supplément quand la pioche se vide'],
          ['trash', 'Valeur d\'1 carte trashée'],
          ['recherche', 'Valeur d\'1 carte recherchée'],
          ['lvlupEconomie', 'Valeur d\'un niveau d\'Économie'],
          ['lvlupPopulation', 'Valeur d\'un niveau de Population'],
          ['privilege', 'Valeur d\'un Privilège'],
          ['rejouer', 'Valeur d\'un Rejouer'],
          ['pierre', 'Valeur d\'1 Pierre'],
          ['metal', 'Valeur d\'1 Métal'],
          ['erudit', 'Valeur d\'1 Érudit'],
          ['achat', 'Envie de base d\'acheter (négatif : une carte de plus gêne)'],
          ['seuilTrash', 'Une carte qui vaut moins que ce seuil peut être trashée'],
          ['parTranche', 'Nombre de fois supposé pour un effet « par … »'],
        ] as const
      ).map(([cle, texte]) => [cle, texte, ...ias.map((ia) => chiffre(ia.poids[cle]))]),
    ),
  ].join('\n'),
  ['## Cartes de départ', '', tableauDeValeurs(cartes('depart'))].join('\n'),
  ['## Cartes Assymétrie', '', tableauDeValeurs(cartes('asymetrie'))].join('\n'),
  ['## Cartes Avancée', '', tableauDeValeurs(cartes('avancee'))].join('\n'),
  [
    '## Note d\'achat des cartes Avancée pour l\'IA entraînée',
    '',
    'C\'est la note que l\'IA donne à l\'action « acheter cette carte », comparée aux autres actions de son tour.',
    'Une note négative signifie qu\'elle préfère presque toujours faire autre chose. Les Ressources du coût sont comptées à la valeur moyenne d\'une Pierre ou d\'un Métal.',
    '',
    tableau(
      ['Carte', 'Coût', 'Valeur', 'Note d\'achat seul', 'Note d\'achat avec trash à 1 Or'],
      [...cartes('avancee')]
        .sort((a, b) => noteAchat(b, champion, true) - noteAchat(a, champion, true))
        .map((c) => [
          c.nom,
          coutTexte(c),
          chiffre(valeur(c, champion)),
          chiffre(noteAchat(c, champion, false)),
          chiffre(noteAchat(c, champion, true)),
        ]),
    ),
  ].join('\n'),
];

mkdirSync(new URL('rapports/', racine), { recursive: true });
writeFileSync(new URL('rapports/valeurs-des-cartes.md', racine), sections.join('\n\n') + '\n');
console.log('Tableau écrit dans rapports/valeurs-des-cartes.md');
