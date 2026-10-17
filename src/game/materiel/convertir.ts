import { lireCodeEffet } from './codeEffet.ts';
import { lireCsv } from './csv.ts';
import type {
  Carte,
  Couleur,
  Cout,
  Materiel,
  Origine,
  Paiement,
  Plateau,
  Privilege,
  Ressources,
} from './types.ts';

// Transforme le texte des 3 fichiers csv de data/ en matériel utilisable par le moteur.
// Toutes les erreurs trouvées sont regroupées dans un seul message, pour tout corriger en une fois.

const COULEURS: readonly Couleur[] = ['bleu', 'jaune', 'rouge', 'vert'];

function cheminImage(dossier: string, fichier: string): string {
  return `${dossier.replace(/\\/g, '/')}/${fichier}`;
}

function lireCout(texte: string): Cout {
  const cout: Cout = { or: 0, pierre: 0, metal: 0, ressource: 0 };
  const morceaux = /^(\d*)([PMR]*)$/.exec(texte);
  if (!morceaux) throw new Error(`coût illisible « ${texte} »`);
  cout.or = morceaux[1] === '' ? 0 : Number(morceaux[1]);
  for (const lettre of morceaux[2]!) {
    if (lettre === 'P') cout.pierre++;
    if (lettre === 'M') cout.metal++;
    if (lettre === 'R') cout.ressource++;
  }
  return cout;
}

function lireRessources(texte: string): Ressources {
  if (!/^[PME]*$/.test(texte)) throw new Error(`ressources illisibles « ${texte} »`);
  const ressources: Ressources = { pierre: 0, metal: 0, erudit: 0 };
  for (const lettre of texte) {
    if (lettre === 'P') ressources.pierre++;
    if (lettre === 'M') ressources.metal++;
    if (lettre === 'E') ressources.erudit++;
  }
  return ressources;
}

function lireDepart(texte: string): { origine: Origine; couleur: Couleur | null } {
  if (/pioche commune/i.test(texte)) return { origine: 'avancee', couleur: null };
  if (/ass?ymétrie/i.test(texte)) return { origine: 'asymetrie', couleur: null };
  const couleur = COULEURS.find((c) => texte.toLowerCase().includes(`joueur ${c}`));
  if (couleur) return { origine: 'depart', couleur };
  throw new Error(`colonne Départ illisible « ${texte} »`);
}

function convertirCartes(csv: string, erreurs: string[]): Carte[] {
  const cartes: Carte[] = [];
  for (const ligne of lireCsv(csv)) {
    const id = ligne['Identifiant'] ?? '';
    try {
      const texteEffet = ligne['Effet'] ?? '';
      const texteEffetRouge = ligne['Effet Rouge'] ?? '';
      const codeEffet = ligne['Code effet'] ?? '';
      const codeEffetRouge = ligne['Code effet rouge'] ?? '';
      if ((texteEffet === '') !== (codeEffet === '')) {
        throw new Error('les colonnes Effet et Code effet doivent être remplies ensemble');
      }
      if ((texteEffetRouge === '') !== (codeEffetRouge === '')) {
        throw new Error(
          'les colonnes Effet Rouge et Code effet rouge doivent être remplies ensemble',
        );
      }
      cartes.push({
        id,
        nom: ligne['Nom'] ?? '',
        image: cheminImage(ligne['Dossier'] ?? '', `${id}.jpg`),
        ...lireDepart(ligne['Départ'] ?? ''),
        cout: lireCout(ligne['Coût'] ?? ''),
        ressources: lireRessources(ligne['Ressource'] ?? ''),
        effet: lireCodeEffet(codeEffet),
        effetRouge: lireCodeEffet(codeEffetRouge),
        texteEffet,
        texteEffetRouge,
      });
    } catch (erreur) {
      erreurs.push(`Carte ${id} : ${(erreur as Error).message}`);
    }
  }
  return cartes;
}

function convertirPrivileges(csv: string, erreurs: string[]): Privilege[] {
  const privileges: Privilege[] = [];
  for (const ligne of lireCsv(csv)) {
    const id = ligne['Identifiant'] ?? '';
    const numero = /^privilege_(\d+)$/.exec(id);
    if (!numero) {
      erreurs.push(`Privilège « ${id} » : l'identifiant doit s'écrire privilege_N`);
      continue;
    }
    privileges.push({
      id,
      numero: Number(numero[1]),
      image: cheminImage(ligne['Dossier'] ?? '', `${id}.jpg`),
      texte: ligne['Effet'] ?? '',
    });
  }
  return privileges;
}

function premierNombre(texte: string, motif: RegExp): number | null {
  const trouve = motif.exec(texte);
  return trouve ? Number(trouve[1]) : null;
}

function convertirPlateau(csv: string, erreurs: string[]): Plateau {
  const plateau: Plateau = { noblesse: [], economie: [], population: [] };
  for (const ligne of lireCsv(csv)) {
    const piste = ligne['Piste'] ?? '';
    const statut = ligne['Statut'] ?? '';
    const texteCout = ligne['Coût'] ?? '';
    const cout = premierNombre(texteCout, /(\d+)/) ?? 0;
    // « 2 Or » : l'Or est dépensé ; « 1 Pierre / Métal » : les ressources sont seulement comptées.
    const paiement: Paiement = /pierre|métal|metal/i.test(texteCout) ? 'ressources' : 'or';
    const blasons = premierNombre(statut, /(\d+) blasons?/i) ?? 0;
    if (piste === 'Noblesse') {
      plateau.noblesse.push({ erudits: cout, blasons });
    } else if (piste === 'Économie') {
      const or = premierNombre(statut, /(\d+) Or en début/i);
      if (or === null) {
        erreurs.push(`Plateau, Économie : « N Or en début de lignée » attendu dans « ${statut} »`);
        continue;
      }
      plateau.economie.push({ cout, paiement, or, blasons });
    } else if (piste === 'Population') {
      const cartes = premierNombre(statut, /Pioche (\d+) cartes?/i);
      if (cartes === null) {
        erreurs.push(`Plateau, Population : « Pioche N cartes » attendu dans « ${statut} »`);
        continue;
      }
      plateau.population.push({ cout, paiement, cartes, blasons });
    } else {
      erreurs.push(`Plateau : piste inconnue « ${piste} »`);
    }
  }
  return plateau;
}

function signalerDoublons(ids: string[], quoi: string, erreurs: string[]): void {
  const vus = new Set<string>();
  for (const id of ids) {
    if (vus.has(id)) erreurs.push(`${quoi} : l'identifiant « ${id} » apparaît plusieurs fois`);
    vus.add(id);
  }
}

export function convertirMateriel(
  csvCartes: string,
  csvPrivileges: string,
  csvPlateau: string,
): Materiel {
  const erreurs: string[] = [];
  const materiel: Materiel = {
    cartes: convertirCartes(csvCartes, erreurs),
    privileges: convertirPrivileges(csvPrivileges, erreurs),
    plateau: convertirPlateau(csvPlateau, erreurs),
  };
  signalerDoublons(materiel.cartes.map((c) => c.id), 'Cartes', erreurs);
  signalerDoublons(materiel.privileges.map((p) => p.id), 'Privilèges', erreurs);
  if (erreurs.length > 0) {
    throw new Error(`Erreurs dans les fichiers csv :\n- ${erreurs.join('\n- ')}`);
  }
  return materiel;
}
