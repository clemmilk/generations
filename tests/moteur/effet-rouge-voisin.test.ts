import { describe, expect, it } from 'vitest';
import { c, faire, installer, scene } from './outils.ts';

// Décision JJ (30/10) : seul le joueur assis à droite du joueur actif, c'est-à-dire celui qui a joué juste
// avant lui, peut appliquer l'Effet Rouge. Alice (0) joue ; l'ordre du tour est Alice, Bob, Chloé, David.
// Matériel de test : l'Effet Rouge de l'Épicerie donne 2 Or ; celui de la Tour de guet fait payer pour trasher.

describe('Effet Rouge : seulement le joueur de droite', () => {
  it('à 3 joueurs, seule Chloé (qui a joué juste avant Alice) reçoit le gain', () => {
    const etat = faire(scene({ main: [c('Épicerie')] }, 3), { type: 'jouer', carte: c('Épicerie') });
    expect(etat.joueurs.map((j) => j.or)).toEqual([4, 0, 2]);
    expect(etat.attente).toEqual({ type: 'tour', joueur: 1 });
  });

  it('à 4 joueurs, seul David en profite', () => {
    const etat = faire(scene({ main: [c('Épicerie')] }, 4), { type: 'jouer', carte: c('Épicerie') });
    expect(etat.joueurs.map((j) => j.or)).toEqual([4, 0, 0, 2]);
  });

  it('à 2 joueurs, l\'adversaire en profite toujours', () => {
    const etat = faire(scene({ main: [c('Épicerie')] }, 2), { type: 'jouer', carte: c('Épicerie') });
    expect(etat.joueurs.map((j) => j.or)).toEqual([4, 2]);
  });

  it('ne propose de payer qu\'au joueur de droite, puis passe au joueur suivant', () => {
    const etat = scene({ main: [c('Tour de guet')] }, 3);
    installer(etat, 1, { or: 20, main: [c('Cachot', 'jaune')] });
    installer(etat, 2, { or: 20, main: [c('Cachot', 'rouge')] });
    const apres = faire(etat, { type: 'jouer', carte: c('Tour de guet') });
    // Bob a de quoi payer, mais ce n'est pas lui qui est à droite d'Alice.
    expect(apres.attente).toMatchObject({ type: 'payer', joueur: 2, rouge: true });
    const fin = faire(apres, { type: 'passer' });
    expect(fin.attente).toEqual({ type: 'tour', joueur: 1 });
    expect(fin.joueurs[1]!.or).toBe(20);
  });
});
