# Force des cartes — 2026-11-12

Bot : **IA entraînée** à tous les sièges. Parties à **3 joueurs**, 10000 parties par expérience (graines 1 à 10000). Calcul : 22 min.

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
| Alchimiste royale | 6 | 16.5 % | −5.3 (−5.9 à −4.8) ! | +1.9 (+1.5 à +2.3) ! | 1 | 23.8 % |
| Capitaine | 6R | 15.5 % | −2.3 (−2.8 à −1.8) ! | −0.1 (−0.4 à +0.1) | 8 | 18.7 % |
| Roi | 6 | 10.3 % | −1.6 (−2.0 à −1.3) ! | +1.3 (+0.7 à +1.9) ! | 2 | 30.9 % |
| Maître fondeur | 5 | 15.5 % | −1.4 (−1.8 à −1.0) ! | −0.3 (−0.7 à +0.2) | 9 | 25.9 % |
| Apothicaire | 2R | 8.1 % | −1.4 (−1.7 à −1.0) ! | +1.0 (+0.3 à +1.6) ! | 3 | 36.2 % |
| Contremaître | 2 | 15.3 % | −1.2 (−1.7 à −0.8) ! | +0.2 (−0.3 à +0.7) | 6 | 30.2 % |
| Prison | 2 | 15.5 % | −1.1 (−1.6 à −0.7) ! | +0.4 (−0.2 à +0.9) | 4 | 32.0 % |
| Mairie | R | 12.8 % | −0.8 (−1.2 à −0.5) ! | −0.8 (−1.4 à −0.3) ! | 12 | 32.9 % |
| Hôpital | R | 15.5 % | −0.8 (−1.2 à −0.3) ! | −0.8 (−1.2 à −0.3) ! | 10 | 26.9 % |
| Archiviste royale | 8 | 6.0 % | −0.7 (−0.9 à −0.5) ! | −0.8 (−1.4 à −0.3) ! | 11 | 29.7 % |
| Intendante | 5 | 15.7 % | −0.6 (−1.0 à −0.1) ! | +0.0 (−0.3 à +0.3) | 7 | 18.6 % |
| Cabinet d’architecte | 3R | 11.6 % | −0.5 (−0.9 à −0.1) ! | −1.8 (−2.4 à −1.2) ! | 20 | 36.7 % |
| Bibliothécaire | 5R | 9.1 % | −0.5 (−0.8 à −0.2) ! | −2.0 (−2.6 à −1.4) ! | 21 | 37.8 % |
| Maison du commerce | 4 | 13.6 % | −0.4 (−0.8 à +0.0) | −1.0 (−1.6 à −0.4) ! | 13 | 34.6 % |
| Chancellerie | 2 | 4.0 % | −0.3 (−0.5 à −0.1) ! | +0.3 (−0.4 à +1.1) | 5 | 44.0 % |
| Cour du roi | 4R | 8.2 % | −0.3 (−0.6 à +0.0) | −1.3 (−2.0 à −0.6) ! | 15 | 37.9 % |
| Démolisseur | 7 | 1.9 % | −0.3 (−0.4 à −0.1) ! | −1.5 (−2.1 à −0.9) ! | 19 | 31.4 % |
| Forge | R | 13.4 % | −0.2 (−0.6 à +0.2) | −1.4 (−2.0 à −0.9) ! | 18 | 33.5 % |
| Grand argentier | 5 | 3.4 % | −0.2 (−0.3 à +0.0) | −2.3 (−2.9 à −1.6) ! | 24 | 37.6 % |
| Ferme | 7 | 2.2 % | −0.1 (−0.3 à +0.0) | −2.1 (−2.7 à −1.5) ! | 23 | 29.8 % |
| Banque | 3 | 3.3 % | −0.1 (−0.3 à +0.1) | −4.1 (−4.8 à −3.4) ! | 31 | 42.8 % |
| Négociant | 5 | 1.0 % | −0.1 (−0.2 à −0.0) ! | −1.4 (−2.0 à −0.7) ! | 16 | 37.8 % |
| Aqueduc | 5 | 3.2 % | −0.0 (−0.2 à +0.2) | −2.7 (−3.4 à −2.0) ! | 25 | 42.6 % |
| Carrière | R | 9.7 % | −0.0 (−0.3 à +0.3) | −2.7 (−3.4 à −2.1) ! | 26 | 40.1 % |
| Cardinal | 4 | 0.1 % | −0.0 (−0.0 à +0.0) | −4.7 (−5.4 à −4.0) ! | 34 | 40.0 % |
| Mine | 1R | 14.2 % | 0.0 (−0.4 à +0.4) | −1.4 (−1.8 à −1.0) ! | 17 | 26.1 % |
| Remouleur ambulant | 3 | 0.1 % | +0.0 (−0.0 à +0.0) | −4.2 (−4.9 à −3.5) ! | 32 | 43.1 % |
| Meunière | 1R | 4.8 % | +0.1 (−0.2 à +0.3) | −3.4 (−4.1 à −2.7) ! | 28 | 38.9 % |
| Loge des bâtisseurs | 3 | 4.2 % | +0.1 (−0.1 à +0.3) | −4.3 (−5.0 à −3.7) ! | 33 | 43.7 % |
| Ambassade | 5R | 3.2 % | +0.2 (+0.0 à +0.4) ! | −3.6 (−4.3 à −2.9) ! | 30 | 39.0 % |
| Tribunal | 4 | 12.1 % | +0.3 (−0.1 à +0.6) | −2.0 (−2.6 à −1.4) ! | 22 | 32.0 % |
| Hôtel des impôts | 4 | 10.2 % | +0.3 (−0.0 à +0.6) | −3.3 (−4.0 à −2.6) ! | 27 | 41.5 % |
| Chambellan | 8 | 13.7 % | +0.4 (+0.0 à +0.8) ! | −1.1 (−1.6 à −0.7) ! | 14 | 26.9 % |
| Assassin | 6 | 9.2 % | +0.6 (+0.3 à +0.9) ! | −3.4 (−4.0 à −2.9) ! | 29 | 30.3 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Histoire | 7486 | 34.6 % (33.6 à 35.7) ! | 1.04 |
| Justice | 7536 | 34.3 % (33.3 à 35.4) | 1.03 |
| Science | 7537 | 34.1 % (33.0 à 35.1) | 1.02 |
| Économie | 7481 | 33.7 % (32.7 à 34.8) | 1.01 |
| Production | 7501 | 33.1 % (32.0 à 34.1) | 0.99 |
| Religion | 7459 | 33.1 % (32.0 à 34.1) | 0.99 |
| Diplomatie | 7472 | 33.0 % (31.9 à 34.1) | 0.99 |
| Progrès | 7528 | 30.8 % (29.8 à 31.8) ! | 0.92 |
