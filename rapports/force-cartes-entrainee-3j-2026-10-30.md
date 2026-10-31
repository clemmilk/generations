# Force des cartes — 2026-10-30

Bot : **IA entraînée** à tous les sièges. Parties à **3 joueurs**, 10000 parties par expérience (graines 1 à 10000). Calcul : 16 min.

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
| Bibliothécaire | 2R | 10.7 % | −1.6 (−2.0 à −1.2) ! | −0.1 (−0.3 à +0.2) | 8 | 12.9 % |
| Ferme | 5 | 11.1 % | −1.5 (−1.9 à −1.1) ! | +0.6 (+0.2 à +1.0) ! | 2 | 18.7 % |
| Archiviste royale | 4R | 10.5 % | −1.2 (−1.6 à −0.8) ! | +0.2 (−0.1 à +0.6) | 3 | 16.1 % |
| Hôtel des impôts | 4 | 10.7 % | −1.1 (−1.5 à −0.8) ! | +1.0 (+0.4 à +1.5) ! | 1 | 24.1 % |
| Démolisseur | 7 | 11.0 % | −1.1 (−1.5 à −0.7) ! | +0.1 (−0.3 à +0.4) | 6 | 16.7 % |
| Cour du roi | 3R | 10.6 % | −1.0 (−1.4 à −0.6) ! | +0.1 (−0.1 à +0.4) | 5 | 13.9 % |
| Hôpital | R | 9.7 % | −0.9 (−1.2 à −0.5) ! | −0.6 (−1.1 à −0.0) ! | 10 | 25.7 % |
| Assassin | 6 | 9.9 % | −0.8 (−1.1 à −0.4) ! | −1.3 (−1.8 à −0.7) ! | 17 | 26.0 % |
| Sapeur | 5R | 10.0 % | −0.8 (−1.1 à −0.4) ! | +0.2 (−0.2 à +0.6) | 4 | 18.3 % |
| Meunière | 3R | 5.9 % | −0.8 (−1.0 à −0.5) ! | −2.0 (−2.6 à −1.4) ! | 21 | 30.4 % |
| Mine | R | 11.3 % | −0.8 (−1.2 à −0.4) ! | −0.2 (−0.4 à +0.1) | 9 | 15.4 % |
| Apothicaire | 2R | 5.2 % | −0.6 (−0.8 à −0.4) ! | −0.7 (−1.4 à −0.1) ! | 12 | 31.7 % |
| Banque | 3 | 9.8 % | −0.6 (−0.9 à −0.2) ! | −0.7 (−1.2 à −0.1) ! | 11 | 22.9 % |
| Alchimiste royale | 6 | 5.8 % | −0.2 (−0.5 à +0.0) | −2.0 (−2.6 à −1.4) ! | 22 | 28.9 % |
| Cardinal | 5 | 3.4 % | −0.1 (−0.3 à +0.0) | −3.2 (−3.9 à −2.6) ! | 32 | 31.9 % |
| Roi | 6 | 3.9 % | −0.1 (−0.3 à +0.1) | −3.0 (−3.6 à −2.4) ! | 29 | 30.4 % |
| Aqueduc | 5 | 10.7 % | −0.1 (−0.5 à +0.3) | +0.0 (−0.3 à +0.4) | 7 | 17.0 % |
| Chambellan | 8 | 3.7 % | −0.1 (−0.3 à +0.1) | −2.5 (−3.0 à −1.9) ! | 27 | 28.2 % |
| Grand argentier | 8 | 8.0 % | −0.1 (−0.4 à +0.2) | −1.7 (−2.2 à −1.1) ! | 19 | 24.5 % |
| Forge | R | 8.4 % | −0.1 (−0.4 à +0.2) | −1.1 (−1.7 à −0.5) ! | 15 | 29.4 % |
| Carrière | R | 9.8 % | −0.0 (−0.4 à +0.3) | −1.1 (−1.6 à −0.6) ! | 16 | 23.6 % |
| Mairie | 1R | 4.9 % | −0.0 (−0.2 à +0.2) | −2.3 (−2.9 à −1.6) ! | 24 | 31.4 % |
| Contremaître | 4 | 3.3 % | +0.0 (−0.2 à +0.2) | −2.2 (−2.8 à −1.5) ! | 23 | 32.6 % |
| Ambassade | 6R | 2.6 % | +0.0 (−0.1 à +0.2) | −1.5 (−2.1 à −0.9) ! | 18 | 29.4 % |
| Loge des bâtisseurs | 3 | 1.6 % | +0.0 (−0.1 à +0.2) | −3.2 (−3.8 à −2.5) ! | 31 | 32.2 % |
| Remouleur ambulant | 3 | 9.2 % | +0.1 (−0.3 à +0.4) | −0.9 (−1.4 à −0.4) ! | 13 | 23.7 % |
| Comptoir maritime | 6 | 1.7 % | +0.1 (−0.0 à +0.2) | −3.5 (−4.1 à −2.9) ! | 34 | 32.0 % |
| Tribunal | 4 | 6.1 % | +0.1 (−0.1 à +0.3) | −2.9 (−3.6 à −2.3) ! | 28 | 31.2 % |
| Cabinet d'architecte | 4 | 3.5 % | +0.1 (−0.1 à +0.3) | −2.4 (−3.0 à −1.7) ! | 26 | 32.2 % |
| Prison | 3 | 9.7 % | +0.1 (−0.2 à +0.5) | −1.0 (−1.6 à −0.4) ! | 14 | 28.0 % |
| Négociant | 5 | 2.0 % | +0.1 (+0.0 à +0.3) ! | −3.5 (−4.1 à −2.9) ! | 33 | 32.3 % |
| Maison du commerce | 6 | 6.7 % | +0.2 (−0.1 à +0.5) | −1.9 (−2.5 à −1.4) ! | 20 | 27.4 % |
| Maître fondeur | 7 | 7.6 % | +0.5 (+0.2 à +0.8) ! | −2.3 (−2.9 à −1.8) ! | 25 | 25.8 % |
| Chancellerie | 3 | 8.1 % | +0.8 (+0.5 à +1.1) ! | −3.1 (−3.7 à −2.5) ! | 30 | 28.3 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Progrès | 7528 | 36.1 % (35.0 à 37.2) ! | 1.08 |
| Histoire | 7486 | 35.4 % (34.4 à 36.5) ! | 1.06 |
| Production | 7501 | 34.1 % (33.0 à 35.2) | 1.02 |
| Justice | 7536 | 33.3 % (32.2 à 34.3) | 1.00 |
| Diplomatie | 7472 | 33.0 % (32.0 à 34.1) | 0.99 |
| Science | 7537 | 33.0 % (31.9 à 34.0) | 0.99 |
| Économie | 7481 | 32.7 % (31.7 à 33.8) | 0.98 |
| Religion | 7459 | 29.0 % (28.0 à 30.1) ! | 0.87 |
