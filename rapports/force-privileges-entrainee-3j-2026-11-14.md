# Force des Privilèges — 2026-11-14

Bot : **IA entraînée** à tous les sièges. Parties à **3 joueurs**, 10000 parties par expérience (graines 1 à 10000). Calcul : 12 min.

## Comment lire ce rapport

Chaque graine est jouée plusieurs fois : une partie de **référence**, où tout le monde joue normalement, puis une partie par expérience, où **un seul joueur** reçoit une consigne. Ce joueur change de siège d'une graine à l'autre.

- **Interdite** : ce joueur n'a pas le droit de choisir la tuile. Si l'écart est très négatif, la tuile lui manque : elle est forte.
- **Prioritaire** : ce joueur prend la tuile dès qu'elle lui est proposée (parmi les tuiles visibles). Si l'écart est positif, la viser est une bonne stratégie ; s'il est négatif, la prendre à tout prix fait perdre.

L'écart est en **points de victoire** : « −3.0 » veut dire que ce joueur gagne 3 parties de moins sur 100 (à 3 joueurs, un joueur gagne en moyenne 33.3 parties sur 100). Entre parenthèses, la fourchette à 95 % ; un **!** signale un écart qui ne peut pas venir du seul hasard.

« Possédée en temps normal » : part des parties de référence où ce joueur finit avec la tuile. Une tuile rarement prise en temps normal ne peut pas beaucoup manquer quand on l'interdit : c'est alors l'écart « Prioritaire » qui renseigne.

Une tuile tirée « au hasard dans la pioche » (effet de certaines cartes) n'est pas choisie : la consigne ne s'y applique pas.

> Ces chiffres mesurent les tuiles telles que ce bot les joue. Une tuile qu'il utilise mal paraîtra plus faible qu'elle ne l'est.

| Privilège | Effet | Possédée en temps normal | Interdite : écart | Prioritaire : écart | Rang en prioritaire | Possédée quand prioritaire |
|---|---|---:|---:|---:|---:|---:|
| 1 | Après avoir acheté 1 carte, gagnez 5 Or | 18.6 % | −2.1 (−2.6 à −1.6) ! | +0.2 (+0.1 à +0.3) ! | 5 | 19.5 % |
| 10 | Après avoir acheté 1 carte, révélez 1 carte | 16.7 % | −1.9 (−2.3 à −1.4) ! | +2.7 (+2.1 à +3.3) ! | 1 | 35.8 % |
| 7 | Progresser d’un niveau de population coûte 5 or de moins | 19.0 % | −1.6 (−2.1 à −1.1) ! | +0.3 (+0.1 à +0.6) ! | 4 | 22.1 % |
| 18 | Chaque fois que le joueur révèle 1 carte, il gagne 4 Or | 18.5 % | −1.5 (−1.9 à −1.0) ! | +0.1 (−0.1 à +0.3) | 7 | 20.6 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne 3 Or | 19.1 % | −0.8 (−1.3 à −0.3) ! | +0.1 (−0.2 à +0.5) | 6 | 24.9 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 15.3 % | −0.4 (−0.8 à −0.0) ! | 0.0 (−0.6 à +0.6) | 8 | 38.4 % |
| 9 | Après avoir acheté 1 carte, vous pouvez jouer 1 carte de votre main | 17.8 % | −0.4 (−0.8 à +0.1) | +0.5 (−0.0 à +1.0) | 3 | 31.3 % |
| 5 | Au début de chaque nouvelle lignée, gagnez 2 Or par Privilège | 6.8 % | −0.3 (−0.5 à −0.0) ! | −0.3 (−1.0 à +0.4) | 12 | 45.1 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 18.9 % | −0.1 (−0.5 à +0.4) | −0.2 (−0.8 à +0.4) | 10 | 35.2 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 18.9 % | 0.0 (−0.5 à +0.5) | −0.3 (−0.7 à +0.1) | 11 | 27.1 % |
| 15 | À son tour, en plus de son action, le joueur peut payer 8 Or pour p… | 0.8 % | 0.0 (0.0 à 0.0) | −3.9 (−4.6 à −3.1) ! | 20 | 47.6 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandant des Érud… | 0.9 % | 0.0 (0.0 à 0.0) | −1.1 (−1.9 à −0.4) ! | 15 | 47.5 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 0.7 % | 0.0 (0.0 à 0.0) | −3.8 (−4.5 à −3.1) ! | 19 | 47.6 % |
| 11 | À son tour, en plus de son action, le joueur peut payer 7 Or pour r… | 3.1 % | +0.0 (−0.1 à +0.1) | −3.1 (−3.9 à −2.4) ! | 17 | 46.9 % |
| 14 | À son tour, en plus de son action, le joueur peut payer 2 Métal pou… | 11.0 % | +0.2 (−0.1 à +0.5) | −3.2 (−3.9 à −2.5) ! | 18 | 43.7 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or supplément… | 12.9 % | +0.3 (−0.0 à +0.5) | −0.9 (−1.6 à −0.3) ! | 14 | 39.8 % |
| 6 | Chaque fois que le joueur joue 1 carte avec un effet rouge, il gagn… | 18.3 % | +0.5 (+0.1 à +1.0) ! | +0.5 (+0.1 à +1.0) ! | 2 | 29.8 % |
| 12 | Au début de chaque nouvelle lignée, révélez 1 carte et payez 3 Or | 18.6 % | +0.9 (+0.4 à +1.3) ! | 0.0 (0.0 à 0.0) | 9 | 18.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 carte de moi… | 18.3 % | +1.5 (+1.0 à +2.0) ! | −0.9 (−1.2 à −0.6) ! | 13 | 23.0 % |
| 13 | À son tour, en plus de son action, le joueur peut payer 3 Pierres p… | 18.7 % | +2.9 (+2.4 à +3.3) ! | −2.3 (−2.7 à −1.8) ! | 16 | 27.7 % |
