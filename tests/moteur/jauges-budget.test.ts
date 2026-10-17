import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MATERIEL } from '../../src/game/materiel/index.ts';
import { avecReglage, c, faire, permises, scene } from './outils.ts';

// Décision Y (essai du 16/10), toujours disponible par le réglage ordreDesJauges : null.
// En fin de lignée, après la Noblesse, le joueur choisit quelle(s) jauge(s) monter, dans l'ordre qu'il veut.
// Les jauges payées en Ressources puisent dans un budget commun : les Pierres et Métaux de l'aire de jeu,
// comptés sans être dépensés. Pour ces tests, les deux jauges du matériel de test se payent en Ressources.

describe('fin de lignée : jauges au choix sur un budget de Ressources commun', () => {
  avecReglage('ordreDesJauges', null);
  const economie = MATERIEL.plateau.economie;
  const avant = economie.map((niveau) => ({ ...niveau }));
  beforeEach(() => {
    economie.forEach((niveau, i) => Object.assign(niveau, { paiement: 'ressources', cout: i }));
  });
  afterEach(() => {
    economie.forEach((niveau, i) => Object.assign(niveau, avant[i]));
  });
  // Économie niveau 1 : 1 Ressource ; Population niveau 1 : 1 Ressource (matériel de test).
  const coutEco = 1;
  const coutPop = MATERIEL.plateau.population[1]!.cout;
  const pierres = [c('Cachot'), c('Ferrailleur'), c('Colporteur')];

  it('propose les deux jauges, et le joueur choisit l\'ordre', () => {
    const etat = scene({ aire: pierres.slice(0, coutEco + coutPop) });
    let apres = faire(etat, { type: 'finLignee' });
    expect(apres.attente?.type).toBe('finJauges');
    expect(permises(apres)).toEqual([
      { type: 'monter', piste: 'economie' },
      { type: 'monter', piste: 'population' },
      { type: 'passer' },
    ]);
    apres = faire(apres, { type: 'monter', piste: 'economie' });
    expect(permises(apres)).toEqual([{ type: 'monter', piste: 'population' }, { type: 'passer' }]);
    apres = faire(apres, { type: 'monter', piste: 'population' });
    expect(apres.joueurs[0]!.niveauEconomie).toBe(1);
    expect(apres.joueurs[0]!.niveauPopulation).toBe(1);
  });

  it('les Ressources prises par une jauge ne comptent plus pour l\'autre', () => {
    const etat = scene({ aire: pierres.slice(0, Math.max(coutEco, coutPop)) });
    const apres = faire(etat, { type: 'finLignee' }, { type: 'monter', piste: 'population' });
    expect(apres.attente).toEqual({ type: 'tour', joueur: 1 });
    expect(apres.joueurs[0]!.niveauPopulation).toBe(1);
    expect(apres.joueurs[0]!.niveauEconomie).toBe(0);
  });

  it('ne dépense pas les Ressources, et on peut ne rien monter', () => {
    const apres = faire(scene({ aire: pierres.slice(0, 2) }), { type: 'finLignee' }, { type: 'passer' });
    expect(apres.joueurs[0]!.niveauEconomie + apres.joueurs[0]!.niveauPopulation).toBe(0);
  });
});
