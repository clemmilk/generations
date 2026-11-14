# Force des cartes — 2026-11-14

Bot : **IA entraînée** à tous les sièges. Parties à **3 joueurs**, 10000 parties par expérience (graines 1 à 10000). Calcul : 23 min.

## Comment lire ce rapport

Chaque graine est jouée plusieurs fois : une partie de **référence**, où tout le monde joue normalement, puis une partie par expérience, où **un seul joueur** reçoit une consigne. Ce joueur change de siège d'une graine à l'autre.

- **Interdite** : ce joueur n'a pas le droit d'acheter la carte. Si l'écart est très négatif, la carte lui manque : elle est forte.
- **Prioritaire** : ce joueur achète la carte dès qu'il le peut. Si l'écart est positif, la viser est une bonne stratégie ; s'il est négatif, l'acheter à tout prix fait perdre.

L'écart est en **points de victoire** : « −3.0 » veut dire que ce joueur gagne 3 parties de moins sur 100 (à 3 joueurs, un joueur gagne en moyenne 33.3 parties sur 100). Entre parenthèses, la fourchette à 95 % ; un **!** signale un écart qui ne peut pas venir du seul hasard.

> Ces chiffres mesurent les cartes telles que ce bot les joue. Une carte qu'il utilise mal paraîtra plus faible qu'elle ne l'est.

## Cartes Avancée

Classées de la plus regrettée quand elle est interdite (en haut) à la moins regrettée. « Achetée en temps normal » : part des parties de référence où ce joueur l'achète. Une carte rarement achetée en temps normal ne peut pas beaucoup manquer quand on l'interdit.

| Carte | Coût | Achetée en temps normal | Interdite : écart | Prioritaire : écart | Rang en prioritaire | Achetée quand prioritaire |
|---|---:|---:|---:|---:|---:|---:|
| Chancellerie | 2 | 11.3 % | −1.8 (−2.1 à −1.4) ! | +1.6 (+1.0 à +2.2) ! | 1 | 35.3 % |
| Apothicaire | 2R | 11.7 % | −1.4 (−1.8 à −1.1) ! | +0.0 (−0.7 à +0.7) | 4 | 38.5 % |
| Roi | 6 | 12.6 % | −1.4 (−1.8 à −1.0) ! | +0.4 (−0.2 à +1.0) | 3 | 32.8 % |
| Alchimiste royale | 8 | 12.5 % | −1.4 (−1.8 à −1.0) ! | +0.6 (+0.1 à +1.0) ! | 2 | 24.5 % |
| Archiviste royale | 7 | 8.5 % | −1.1 (−1.4 à −0.8) ! | −0.6 (−1.2 à +0.0) | 11 | 34.7 % |
| Contremaître | R | 14.0 % | −1.0 (−1.4 à −0.6) ! | −0.6 (−1.0 à −0.2) ! | 12 | 26.7 % |
| Capitaine | 6R | 13.1 % | −0.7 (−1.1 à −0.3) ! | −0.2 (−0.6 à +0.1) | 5 | 21.1 % |
| Ferme | 5 | 8.5 % | −0.7 (−1.0 à −0.4) ! | −1.2 (−1.9 à −0.5) ! | 23 | 39.7 % |
| Mairie | R | 13.7 % | −0.7 (−1.1 à −0.2) ! | −0.6 (−1.2 à −0.0) ! | 13 | 33.5 % |
| Démolisseur | 5 | 8.7 % | −0.6 (−0.9 à −0.3) ! | −0.6 (−1.3 à +0.0) | 14 | 38.7 % |
| Cabinet d’architecte | 3R | 9.8 % | −0.5 (−0.9 à −0.2) ! | −1.0 (−1.6 à −0.3) ! | 16 | 37.3 % |
| Hôpital | 2R | 13.0 % | −0.5 (−0.9 à −0.1) ! | −1.0 (−1.5 à −0.5) ! | 17 | 30.6 % |
| Loge des bâtisseurs | 3 | 8.3 % | −0.5 (−0.8 à −0.2) ! | −0.4 (−1.1 à +0.3) | 9 | 39.9 % |
| Négociant | 4 | 7.8 % | −0.5 (−0.8 à −0.2) ! | −0.4 (−1.1 à +0.3) | 10 | 40.6 % |
| Ambassade | 3R | 10.5 % | −0.4 (−0.7 à −0.0) ! | −1.2 (−1.8 à −0.6) ! | 22 | 34.0 % |
| Banque | 2 | 7.9 % | −0.3 (−0.6 à −0.0) ! | −2.1 (−2.8 à −1.4) ! | 29 | 41.9 % |
| Maître fondeur | 7 | 12.3 % | −0.3 (−0.7 à +0.1) | −1.1 (−1.6 à −0.5) ! | 19 | 28.9 % |
| Cour du roi | 4R | 6.5 % | −0.2 (−0.5 à +0.1) | −1.2 (−1.8 à −0.5) ! | 20 | 36.6 % |
| Forge | R | 11.8 % | −0.1 (−0.5 à +0.3) | −1.6 (−2.1 à −1.1) ! | 24 | 32.1 % |
| Bibliothécaire | 5R | 7.0 % | −0.1 (−0.4 à +0.1) | −1.2 (−1.8 à −0.5) ! | 21 | 36.6 % |
| Carrière | R | 8.6 % | −0.1 (−0.4 à +0.2) | −2.6 (−3.3 à −2.0) ! | 32 | 38.4 % |
| Tribunal | 4 | 13.5 % | −0.1 (−0.5 à +0.3) | −2.3 (−2.9 à −1.7) ! | 30 | 32.6 % |
| Remouleur ambulant | 3 | 14.7 % | −0.1 (−0.5 à +0.3) | −0.3 (−0.6 à −0.0) ! | 6 | 19.2 % |
| Intendante | 7 | 14.7 % | −0.1 (−0.5 à +0.3) | −0.4 (−0.7 à −0.1) ! | 8 | 19.3 % |
| Grand argentier | 4 | 11.3 % | −0.0 (−0.3 à +0.3) | −0.9 (−1.6 à −0.2) ! | 15 | 38.9 % |
| Meunière | 1R | 7.0 % | +0.1 (−0.1 à +0.3) | −3.4 (−4.1 à −2.7) ! | 34 | 41.8 % |
| Cardinal | 2 | 12.3 % | +0.1 (−0.3 à +0.5) | −2.0 (−2.7 à −1.4) ! | 27 | 37.5 % |
| Prison | 3 | 13.3 % | +0.1 (−0.3 à +0.5) | −0.4 (−1.0 à +0.3) | 7 | 35.8 % |
| Mine | 3R | 10.8 % | +0.1 (−0.2 à +0.5) | −1.9 (−2.4 à −1.4) ! | 26 | 28.6 % |
| Maison du commerce | 4 | 11.8 % | +0.2 (−0.2 à +0.5) | −1.0 (−1.6 à −0.5) ! | 18 | 31.7 % |
| Aqueduc | 4 | 6.6 % | +0.2 (−0.1 à +0.5) | −1.6 (−2.3 à −1.0) ! | 25 | 39.2 % |
| Hôtel des impôts | 4 | 10.2 % | +0.4 (+0.0 à +0.7) ! | −2.4 (−3.0 à −1.7) ! | 31 | 40.0 % |
| Chambellan | 8 | 11.6 % | +0.9 (+0.5 à +1.2) ! | −2.0 (−2.5 à −1.5) ! | 28 | 25.3 % |
| Assassin | 6 | 12.3 % | +1.1 (+0.8 à +1.4) ! | −3.1 (−3.7 à −2.5) ! | 33 | 33.1 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Histoire | 7486 | 37.8 % (36.7 à 38.9) ! | 1.13 |
| Justice | 7536 | 34.4 % (33.3 à 35.4) | 1.03 |
| Science | 7537 | 33.5 % (32.5 à 34.6) | 1.01 |
| Production | 7501 | 33.4 % (32.4 à 34.5) | 1.00 |
| Économie | 7481 | 32.7 % (31.6 à 33.8) | 0.98 |
| Religion | 7459 | 31.9 % (30.8 à 32.9) ! | 0.96 |
| Diplomatie | 7472 | 31.6 % (30.6 à 32.7) ! | 0.95 |
| Progrès | 7528 | 31.4 % (30.4 à 32.5) ! | 0.94 |
