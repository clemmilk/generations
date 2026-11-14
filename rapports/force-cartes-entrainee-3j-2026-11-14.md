# Force des cartes — 2026-11-14

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
| Apothicaire | 2R | 17.4 % | −2.3 (−2.8 à −1.8) ! | +0.8 (+0.2 à +1.4) ! | 1 | 30.8 % |
| Chancellerie | 2 | 15.1 % | −1.8 (−2.3 à −1.4) ! | +0.7 (+0.1 à +1.3) ! | 2 | 33.5 % |
| Ferme | 5 | 16.1 % | −1.7 (−2.2 à −1.3) ! | +0.7 (+0.2 à +1.2) ! | 3 | 30.5 % |
| Démolisseur | 5 | 16.8 % | −1.7 (−2.2 à −1.2) ! | +0.1 (−0.2 à +0.5) | 5 | 24.1 % |
| Roi | 6 | 16.2 % | −1.7 (−2.2 à −1.2) ! | −0.1 (−0.5 à +0.4) | 8 | 25.1 % |
| Archiviste royale | 7 | 16.1 % | −1.6 (−2.1 à −1.1) ! | −0.0 (−0.4 à +0.4) | 7 | 23.8 % |
| Négociant | 4 | 17.2 % | −1.2 (−1.7 à −0.8) ! | +0.3 (−0.1 à +0.7) | 4 | 27.0 % |
| Tribunal | 4 | 15.2 % | −1.0 (−1.4 à −0.6) ! | −1.4 (−2.1 à −0.7) ! | 22 | 41.5 % |
| Loge des bâtisseurs | 3 | 14.4 % | −1.0 (−1.4 à −0.5) ! | −0.2 (−0.8 à +0.5) | 9 | 35.6 % |
| Banque | 2 | 16.5 % | −0.9 (−1.4 à −0.4) ! | −0.7 (−1.3 à −0.1) ! | 17 | 36.1 % |
| Contremaître | R | 13.3 % | −0.8 (−1.2 à −0.4) ! | −1.6 (−2.3 à −0.9) ! | 23 | 43.0 % |
| Mairie | R | 16.0 % | −0.7 (−1.1 à −0.2) ! | −1.3 (−1.9 à −0.6) ! | 21 | 40.3 % |
| Cabinet d’architecte | 3R | 16.3 % | −0.5 (−1.0 à −0.1) ! | −0.5 (−0.9 à −0.1) ! | 16 | 25.0 % |
| Cour du roi | 4R | 13.4 % | −0.5 (−0.9 à −0.1) ! | −0.4 (−1.0 à +0.2) | 14 | 36.0 % |
| Hôpital | 2R | 16.6 % | −0.4 (−0.9 à +0.1) | −0.4 (−1.0 à +0.1) | 15 | 31.2 % |
| Intendante | 7 | 6.8 % | −0.2 (−0.5 à +0.0) | −1.7 (−2.4 à −1.0) ! | 25 | 43.4 % |
| Ambassade | 3R | 14.8 % | −0.2 (−0.7 à +0.2) | −1.2 (−1.7 à −0.6) ! | 18 | 32.1 % |
| Grand argentier | 4 | 16.9 % | −0.2 (−0.6 à +0.3) | −0.3 (−0.8 à +0.3) | 12 | 32.8 % |
| Prison | 3 | 5.4 % | −0.2 (−0.4 à +0.0) | −2.1 (−2.9 à −1.4) ! | 27 | 49.6 % |
| Cardinal | 2 | 16.8 % | −0.1 (−0.6 à +0.3) | +0.1 (−0.2 à +0.4) | 6 | 20.2 % |
| Alchimiste royale | 8 | 2.1 % | −0.1 (−0.2 à +0.0) | −0.2 (−0.9 à +0.5) | 11 | 42.2 % |
| Chambellan | 8 | 3.0 % | −0.1 (−0.2 à +0.0) | −3.0 (−3.7 à −2.3) ! | 33 | 41.5 % |
| Bibliothécaire | 5R | 16.5 % | −0.1 (−0.6 à +0.4) | −0.4 (−0.7 à −0.1) ! | 13 | 21.3 % |
| Aqueduc | 4 | 16.4 % | −0.1 (−0.5 à +0.4) | −0.2 (−0.4 à +0.1) | 10 | 19.4 % |
| Forge | R | 9.9 % | −0.1 (−0.4 à +0.3) | −2.3 (−3.0 à −1.5) ! | 30 | 45.4 % |
| Capitaine | 6R | 0.0 % | 0.0 (0.0 à 0.0) | −2.8 (−3.6 à −2.1) ! | 32 | 45.7 % |
| Hôtel des impôts | 4 | 15.8 % | +0.1 (−0.4 à +0.5) | −1.2 (−1.8 à −0.7) ! | 20 | 34.0 % |
| Maître fondeur | 7 | 9.0 % | +0.1 (−0.2 à +0.4) | −2.2 (−2.8 à −1.5) ! | 28 | 42.0 % |
| Carrière | R | 11.6 % | +0.1 (−0.2 à +0.4) | −2.2 (−2.9 à −1.5) ! | 29 | 44.7 % |
| Maison du commerce | 4 | 11.3 % | +0.2 (−0.2 à +0.6) | −1.6 (−2.3 à −0.9) ! | 24 | 42.2 % |
| Remouleur ambulant | 3 | 12.7 % | +0.3 (−0.1 à +0.6) | −1.7 (−2.4 à −1.0) ! | 26 | 42.2 % |
| Meunière | 1R | 16.6 % | +0.6 (+0.2 à +1.1) ! | −2.8 (−3.4 à −2.2) ! | 31 | 36.9 % |
| Assassin | 6 | 12.6 % | +0.9 (+0.5 à +1.2) ! | −4.1 (−4.8 à −3.4) ! | 34 | 41.4 % |
| Mine | 3R | 16.2 % | +1.0 (+0.5 à +1.4) ! | −1.2 (−1.6 à −0.8) ! | 19 | 26.4 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Histoire | 7486 | 36.0 % (34.9 à 37.1) ! | 1.08 |
| Justice | 7536 | 34.2 % (33.1 à 35.3) | 1.03 |
| Religion | 7459 | 34.1 % (33.0 à 35.1) | 1.02 |
| Science | 7537 | 33.1 % (32.1 à 34.2) | 0.99 |
| Diplomatie | 7472 | 33.1 % (32.0 à 34.1) | 0.99 |
| Économie | 7481 | 32.7 % (31.7 à 33.8) | 0.98 |
| Production | 7501 | 32.3 % (31.3 à 33.4) | 0.97 |
| Progrès | 7528 | 31.2 % (30.1 à 32.2) ! | 0.93 |
