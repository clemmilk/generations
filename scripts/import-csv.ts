// Relit les 3 fichiers csv de data/ et régénère src/game/materiel/materiel.json.
// Lancé automatiquement avant les tests ; à la main : npm run import

import { readFileSync, writeFileSync } from 'node:fs';
import { convertirMateriel } from '../src/game/materiel/convertir.ts';

const racine = new URL('../', import.meta.url);
const lire = (chemin: string) => readFileSync(new URL(chemin, racine), 'utf8');

try {
  const materiel = convertirMateriel(
    lire('data/cartes_generations.csv'),
    lire('data/privileges_generations.csv'),
    lire('data/plateau_generations.csv'),
  );
  writeFileSync(
    new URL('src/game/materiel/materiel.json', racine),
    JSON.stringify(materiel, null, 2) + '\n',
  );
  console.log(
    `Matériel importé : ${materiel.cartes.length} cartes, ${materiel.privileges.length} Privilèges.`,
  );
} catch (erreur) {
  console.error((erreur as Error).message);
  process.exit(1);
}
