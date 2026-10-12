import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: 'src/client',
  // Le dossier visuels/ est servi tel quel : visuels/cartes/x.jpg est disponible à l'adresse /cartes/x.jpg
  publicDir: '../../visuels',
  build: { outDir: '../../dist', emptyOutDir: true },
  plugins: [react()],
  // Surveillance des fichiers par relecture régulière : sans cela, des modifications
  // très rapprochées d'un même fichier étaient parfois manquées et la page restait sur une ancienne version.
  server: { watch: { usePolling: true, interval: 300 } },
  // Les tests sont dans tests/, à la racine du projet.
  test: { root: '.' },
});
