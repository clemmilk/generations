// Point d'entrée du serveur multijoueur :  node src/server/index.ts
// Variables d'environnement : PORT (3001 par défaut), ORIGINE (adresse du site autorisé, toutes par défaut).

import { demarrerServeur } from './serveur.ts';

const port = Number(process.env['PORT'] ?? 3001);
demarrerServeur({ port, origine: process.env['ORIGINE'] });
console.log(`Serveur Générations à l'écoute sur le port ${port}.`);
