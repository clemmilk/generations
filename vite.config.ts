import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: 'src/client',
  // Le dossier visuels/ est servi tel quel : visuels/cartes/x.jpg est disponible à l'adresse /cartes/x.jpg
  publicDir: '../../visuels',
  build: { outDir: '../../dist', emptyOutDir: true },
  plugins: [react()],
  // Les tests sont dans tests/, à la racine du projet.
  test: { root: '.' },
});
