import type { PartieExportee } from '../game/index.ts';

/** Fait télécharger au navigateur une partie exportée, sous forme de fichier JSON. */
export function telecharger(partie: PartieExportee): void {
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([JSON.stringify(partie, null, 2)], { type: 'application/json' }));
  lien.download = `generations-graine${partie.graine}-${partie.actions.length}actions.json`;
  lien.click();
  URL.revokeObjectURL(lien.href);
}
