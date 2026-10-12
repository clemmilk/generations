// Lance en même temps le serveur multijoueur (port 3001) et l'interface (port 5173) :  npm run dev
// Le serveur redémarre tout seul quand son code change. Les options en plus sont passées à l'interface.

import { spawn } from 'node:child_process';

const lancer = (args: string[], env: Record<string, string> = {}) =>
  spawn(process.execPath, args, { stdio: 'inherit', env: { ...process.env, ...env } });

const enfants = [
  // En local, le serveur est toujours sur le port 3001, quelle que soit la variable PORT de l'environnement.
  lancer(['--watch', 'src/server/index.ts'], { PORT: '3001' }),
  lancer(['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort', ...process.argv.slice(2)]),
];

function toutArreter(code: number): never {
  for (const enfant of enfants) enfant.kill();
  process.exit(code);
}

// Si l'un des deux s'arrête, on arrête l'autre : pas de processus oublié en arrière-plan.
for (const enfant of enfants) enfant.on('exit', (code) => toutArreter(code ?? 0));
process.on('SIGINT', () => toutArreter(0));
process.on('SIGTERM', () => toutArreter(0));
