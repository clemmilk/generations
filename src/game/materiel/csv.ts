/**
 * Lit un texte csv et renvoie un objet { colonne: valeur } par ligne.
 * Accepte le séparateur « , » ou « ; » (Excel français) et les guillemets doubles.
 */
export function lireCsv(texte: string): Record<string, string>[] {
  const propre = texte.replace(/^﻿/, '');
  const premiereLigne = propre.split(/\r?\n/, 1)[0] ?? '';
  const separateur =
    premiereLigne.split(';').length > premiereLigne.split(',').length ? ';' : ',';

  const lignes: string[][] = [];
  let ligne: string[] = [];
  let champ = '';
  let entreGuillemets = false;

  for (let i = 0; i < propre.length; i++) {
    const c = propre[i];
    if (entreGuillemets) {
      if (c === '"' && propre[i + 1] === '"') {
        champ += '"';
        i++;
      } else if (c === '"') {
        entreGuillemets = false;
      } else {
        champ += c;
      }
    } else if (c === '"') {
      entreGuillemets = true;
    } else if (c === separateur) {
      ligne.push(champ);
      champ = '';
    } else if (c === '\n') {
      ligne.push(champ);
      lignes.push(ligne);
      ligne = [];
      champ = '';
    } else if (c !== '\r') {
      champ += c;
    }
  }
  if (champ !== '' || ligne.length > 0) {
    ligne.push(champ);
    lignes.push(ligne);
  }

  const [entetes, ...donnees] = lignes;
  if (!entetes) return [];
  return donnees
    .filter((valeurs) => valeurs.some((v) => v.trim() !== ''))
    .map((valeurs) => {
      const objet: Record<string, string> = {};
      entetes.forEach((entete, i) => {
        objet[entete.trim()] = (valeurs[i] ?? '').trim();
      });
      return objet;
    });
}
