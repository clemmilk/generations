import type { Compteur, CoutEffet, Etape, Gain, Piste } from './types.ts';

// Lecture des colonnes « Code effet » et « Code effet rouge » du csv des cartes.
// L'écriture des codes est expliquée dans data/cartes_generations.md.

const COMPTEURS: readonly Compteur[] = [
  'pierre',
  'metal',
  'erudit',
  'blason_noblesse',
  'blason_economie',
  'blason_population',
];

function entier(texte: string, code: string): number {
  if (!/^\d+$/.test(texte)) {
    throw new Error(`« ${texte} » n'est pas un nombre entier dans « ${code} »`);
  }
  return Number(texte);
}

/** Lit « pierre:2 metal:3 » et renvoie { pierre: '2', metal: '3' }. */
function lirePaires(texte: string, code: string): Record<string, string> {
  const paires: Record<string, string> = {};
  for (const morceau of texte.trim().split(/\s+/)) {
    const [nom, valeur, ...reste] = morceau.split(':');
    if (!nom || valeur === undefined || reste.length > 0) {
      throw new Error(`« ${morceau} » devrait s'écrire nom:nombre dans « ${code} »`);
    }
    paires[nom] = valeur;
  }
  return paires;
}

function lireCout(texte: string, code: string): CoutEffet {
  const cout: CoutEffet = { or: 0, pierre: 0, metal: 0 };
  for (const [nom, valeur] of Object.entries(lirePaires(texte, code))) {
    if (nom !== 'or' && nom !== 'pierre' && nom !== 'metal') {
      throw new Error(`On ne peut pas payer en « ${nom} » dans « ${code} »`);
    }
    cout[nom] = entier(valeur, code);
  }
  return cout;
}

function lireGain(texte: string, code: string): Gain {
  if (texte === 'rejouer') return { type: 'rejouer' };

  const or = /^or\+(\d+)$/.exec(texte);
  if (or) return { type: 'or', montant: entier(or[1]!, code) };

  const appel = /^(\w+)\((.*)\)$/.exec(texte);
  if (appel) {
    const nom = appel[1]!;
    const argument = appel[2]!.trim();
    switch (nom) {
      case 'pioche':
      case 'trash':
      case 'recherche':
        return { type: nom, nombre: entier(argument, code) };
      case 'achete':
        return { type: 'achat', nombre: entier(argument, code) };
      case 'lvlup':
        if (argument !== 'economie' && argument !== 'population') {
          throw new Error(`Piste inconnue « ${argument} » dans « ${code} »`);
        }
        return { type: 'lvlup', piste: argument satisfies Piste };
      case 'privilege':
        if (argument !== 'choix' && argument !== 'hasard') {
          throw new Error(`privilege(...) attend choix ou hasard dans « ${code} »`);
        }
        return { type: 'privilege', mode: argument };
      case 'vendre': {
        const paires = lirePaires(argument, code);
        return {
          type: 'vendre',
          orParPierre: entier(paires['pierre'] ?? '', code),
          orParMetal: entier(paires['metal'] ?? '', code),
        };
      }
    }
  }
  throw new Error(`Gain inconnu « ${texte} » dans « ${code} »`);
}

function lirePar(texte: string, code: string): { compteur: Compteur; tranche: number } {
  const [nom, tranche] = texte.split(':');
  const compteur = COMPTEURS.find((c) => c === nom);
  if (!compteur) {
    throw new Error(`On ne sait pas compter « ${nom} » dans « ${code} »`);
  }
  return { compteur, tranche: tranche === undefined ? 1 : entier(tranche, code) };
}

function lireEtape(texteEtape: string, code: string): Etape {
  let texte = texteEtape.trim();

  const repetable = texte.startsWith('repetable:');
  if (repetable) texte = texte.slice('repetable:'.length).trim();

  let cout: CoutEffet | null = null;
  const payer = /^payer\(([^)]*)\)\s*>\s*(.*)$/.exec(texte);
  if (payer) {
    cout = lireCout(payer[1]!, code);
    texte = payer[2]!.trim();
  }

  const [texteGain, textePar, ...reste] = texte.split('/').map((t) => t.trim());
  if (!texteGain || reste.length > 0) {
    throw new Error(`Étape illisible « ${texteEtape.trim()} » dans « ${code} »`);
  }
  const gain = lireGain(texteGain, code);
  const par = textePar === undefined ? null : lirePar(textePar, code);
  if (par && par.tranche < 1) {
    throw new Error(`La tranche doit valoir au moins 1 dans « ${code} »`);
  }

  return { cout, gain, par, repetable };
}

/**
 * Transforme un code d'effet (ex. « or+2 ; rejouer ») en liste d'étapes. Un code vide donne une liste vide.
 * Les majuscules sont ignorées : « Or+3 » se lit comme « or+3 » (Excel en ajoute parfois toutes seules).
 */
export function lireCodeEffet(code: string): Etape[] {
  if (code.trim() === '') return [];
  return code.toLowerCase().split(';').map((etape) => lireEtape(etape, code));
}
