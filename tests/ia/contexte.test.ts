import { describe, expect, it } from 'vitest';
import { valeurMarginale } from '../../src/ai/contexte.ts';
import { POIDS_MANUELS } from '../../src/ai/poids.ts';
import { valeurCarte, valeurPourMoi } from '../../src/ai/preferences.ts';
import { getPlayerView } from '../../src/game/index.ts';
import { c, scene } from '../moteur/outils.ts';

// La valeur d'une carte dans le deck du joueur (src/ai/contexte.ts).
// Matériel de test : Ferrailleur (1 Pierre) pioche 1 carte par 2 Pierres ; Forgeron (1 Métal) trashe
// 1 carte par 2 Métal ; Cachot et Colporteur portent 1 Pierre ; Épicerie, Imprimeur, Salle du trésor
// portent 1 Érudit ; Tour de guet et Marché portent 1 Métal.

const p = { ...POIDS_MANUELS, contexte: 1 };

/** Le joueur 0, tel qu'il se voit, avec exactement ces cartes dans son deck (toutes en pioche). */
function joueurAvec(cartes: string[]) {
  return getPlayerView(scene({ pioche: cartes }), 0).joueurs[0]!;
}

const richeEnPierres = [c('Ferrailleur'), c('Cachot'), c('Colporteur'), c('Cachot', 'jaune'), c('Colporteur', 'jaune'), c('Forgeron')];
const pauvreEnPierres = [c('Ferrailleur'), c('Épicerie'), c('Imprimeur'), c('Salle du trésor'), c('Marché'), c('Forgeron')];

describe('valeur d\'une carte dans le deck', () => {
  it('un effet « par Pierre » vaut plus dans un deck riche en Pierres', () => {
    const riche = valeurMarginale(joueurAvec(richeEnPierres), c('Ferrailleur'), p);
    const pauvre = valeurMarginale(joueurAvec(pauvreEnPierres), c('Ferrailleur'), p);
    expect(riche).toBeGreaterThan(pauvre);
  });

  it('une carte à Pierre vaut plus si le deck contient une carte qui compte les Pierres', () => {
    const avec = [c('Colporteur'), c('Ferrailleur'), c('Épicerie'), c('Imprimeur'), c('Marché')];
    const sans = [c('Colporteur'), c('Salle du trésor'), c('Épicerie'), c('Imprimeur'), c('Marché')];
    expect(valeurMarginale(joueurAvec(avec), c('Colporteur'), p)).toBeGreaterThan(
      valeurMarginale(joueurAvec(sans), c('Colporteur'), p),
    );
  });

  it('à l\'achat, une carte vaut plus si elle complète le deck', () => {
    // Un second Ferrailleur, dans la Rivière : il profite des Pierres du deck.
    const ferrailleur = c('Ferrailleur', 'jaune');
    expect(valeurPourMoi(joueurAvec(richeEnPierres), ferrailleur, p)).toBeGreaterThan(
      valeurPourMoi(joueurAvec(pauvreEnPierres), ferrailleur, p),
    );
  });

  it('la carte la moins utile dépend du deck : Forgeron ou Ferrailleur', () => {
    // Deck riche en Pierres : le Forgeron (par Métal) ne sert à rien, le Ferrailleur (par Pierre) si.
    const riche = joueurAvec(richeEnPierres);
    expect(valeurPourMoi(riche, c('Forgeron'), p)).toBeLessThan(valeurPourMoi(riche, c('Ferrailleur'), p));
    // Deck riche en Métal : c'est l'inverse.
    const metal = joueurAvec([c('Ferrailleur'), c('Forgeron'), c('Tour de guet'), c('Marché'), c('Tour de guet', 'jaune'), c('Marché', 'jaune')]);
    expect(valeurPourMoi(metal, c('Ferrailleur'), p)).toBeLessThan(valeurPourMoi(metal, c('Forgeron'), p));
  });

  it('avec un poids du contexte à 0, la valeur reste celle hors contexte', () => {
    const joueur = joueurAvec(richeEnPierres);
    const sansContexte = { ...POIDS_MANUELS, contexte: 0 };
    expect(valeurPourMoi(joueur, c('Ferrailleur'), sansContexte)).toBe(valeurCarte(joueur, c('Ferrailleur'), sansContexte));
  });
});
