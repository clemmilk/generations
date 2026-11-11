# Force des cartes — 2026-11-11

Bot : **IA entraînée** à tous les sièges. Parties à **3 joueurs**, 10000 parties par expérience (graines 1 à 10000). Calcul : 20 min.

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
| Démolisseur | 7 | 11.8 % | −2.4 (−2.8 à −2.0) ! | +0.5 (+0.1 à +0.9) ! | 3 | 18.6 % |
| Ferme | 7 | 10.9 % | −2.1 (−2.4 à −1.7) ! | +1.0 (+0.5 à +1.6) ! | 2 | 26.8 % |
| Apothicaire | 2R | 9.8 % | −1.8 (−2.2 à −1.5) ! | +1.2 (+0.6 à +1.8) ! | 1 | 29.6 % |
| Cour du roi | 3R | 11.4 % | −1.4 (−1.8 à −1.0) ! | +0.1 (−0.4 à +0.6) | 5 | 24.2 % |
| Archiviste royale | 8 | 12.2 % | −1.1 (−1.6 à −0.7) ! | −0.1 (−0.4 à +0.2) | 10 | 15.6 % |
| Banque | 3 | 10.8 % | −1.1 (−1.5 à −0.7) ! | −0.0 (−0.6 à +0.5) | 7 | 26.2 % |
| Bibliothécaire | 5R | 11.3 % | −0.6 (−1.0 à −0.3) ! | −0.6 (−1.1 à −0.1) ! | 13 | 24.8 % |
| Roi | 6 | 9.6 % | −0.6 (−1.0 à −0.3) ! | +0.1 (−0.5 à +0.6) | 6 | 23.4 % |
| Aqueduc | 5 | 12.2 % | −0.6 (−1.0 à −0.2) ! | +0.1 (−0.3 à +0.6) | 4 | 19.6 % |
| Capitaine | 6 | 10.7 % | −0.5 (−0.9 à −0.1) ! | −0.0 (−0.5 à +0.4) | 8 | 22.0 % |
| Cabinet d’architecte | 4R | 5.8 % | −0.5 (−0.8 à −0.2) ! | −0.6 (−1.2 à +0.0) | 14 | 32.4 % |
| Tribunal | 4 | 9.4 % | −0.3 (−0.7 à −0.0) ! | −1.3 (−1.9 à −0.7) ! | 18 | 29.1 % |
| Intendante | 4 | 11.9 % | −0.3 (−0.7 à +0.1) | −0.1 (−0.4 à +0.3) | 9 | 16.5 % |
| Mairie | 1R | 6.6 % | −0.3 (−0.6 à −0.0) ! | −1.7 (−2.3 à −1.0) ! | 21 | 32.3 % |
| Négociant | 5 | 3.7 % | −0.2 (−0.4 à +0.0) | −1.1 (−1.8 à −0.4) ! | 16 | 32.9 % |
| Remouleur ambulant | 3 | 10.4 % | −0.1 (−0.5 à +0.2) | −1.1 (−1.7 à −0.5) ! | 17 | 29.6 % |
| Cardinal | 4 | 1.9 % | −0.1 (−0.3 à −0.0) ! | −2.3 (−2.9 à −1.6) ! | 25 | 33.7 % |
| Hôpital | R | 11.9 % | −0.1 (−0.5 à +0.3) | −0.4 (−0.8 à +0.1) | 11 | 24.2 % |
| Alchimiste royale | 6 | 3.1 % | −0.1 (−0.3 à +0.1) | −1.9 (−2.6 à −1.3) ! | 23 | 32.4 % |
| Ambassade | 5R | 8.6 % | −0.1 (−0.4 à +0.2) | −0.9 (−1.4 à −0.3) ! | 15 | 28.7 % |
| Forge | R | 4.1 % | −0.0 (−0.2 à +0.2) | −2.7 (−3.3 à −2.0) ! | 27 | 35.2 % |
| Contremaître | 4 | 0.4 % | 0.0 (−0.1 à +0.1) | −2.8 (−3.5 à −2.2) ! | 30 | 34.5 % |
| Chancellerie | 3 | 2.8 % | 0.0 (−0.2 à +0.2) | −1.6 (−2.3 à −1.0) ! | 20 | 35.3 % |
| Loge des bâtisseurs | 3 | 1.4 % | +0.0 (−0.1 à +0.1) | −2.8 (−3.4 à −2.1) ! | 29 | 35.6 % |
| Maison du commerce | 6 | 0.2 % | +0.0 (−0.0 à +0.0) | −3.5 (−4.1 à −2.9) ! | 34 | 31.4 % |
| Hôtel des impôts | 4 | 11.9 % | +0.1 (−0.3 à +0.4) | −1.3 (−1.9 à −0.8) ! | 19 | 26.3 % |
| Meunière | 3R | 3.6 % | +0.1 (−0.0 à +0.3) | −2.9 (−3.5 à −2.3) ! | 31 | 31.8 % |
| Prison | 3 | 5.4 % | +0.1 (−0.1 à +0.4) | −2.5 (−3.2 à −1.9) ! | 26 | 34.7 % |
| Grand argentier | 8 | 3.0 % | +0.2 (+0.0 à +0.4) ! | −3.3 (−3.8 à −2.8) ! | 33 | 25.4 % |
| Carrière | R | 10.2 % | +0.2 (−0.1 à +0.6) | −1.8 (−2.3 à −1.2) ! | 22 | 28.6 % |
| Mine | R | 12.6 % | +0.3 (−0.2 à +0.7) | −0.5 (−0.8 à −0.2) ! | 12 | 17.1 % |
| Maître fondeur | 7 | 5.2 % | +0.4 (+0.1 à +0.6) ! | −2.7 (−3.3 à −2.1) ! | 28 | 30.5 % |
| Chambellan | 8 | 8.9 % | +0.6 (+0.3 à +0.9) ! | −2.0 (−2.5 à −1.5) ! | 24 | 23.9 % |
| Assassin | 6 | 10.0 % | +1.3 (+0.9 à +1.6) ! | −3.1 (−3.7 à −2.6) ! | 32 | 26.1 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Diplomatie | 7472 | 36.8 % (35.7 à 37.9) ! | 1.10 |
| Histoire | 7486 | 35.2 % (34.1 à 36.3) ! | 1.06 |
| Progrès | 7528 | 34.2 % (33.2 à 35.3) | 1.03 |
| Science | 7537 | 32.8 % (31.7 à 33.8) | 0.98 |
| Justice | 7536 | 32.3 % (31.3 à 33.4) | 0.97 |
| Religion | 7459 | 32.1 % (31.1 à 33.2) ! | 0.96 |
| Économie | 7481 | 31.7 % (30.7 à 32.8) ! | 0.95 |
| Production | 7501 | 31.6 % (30.6 à 32.7) ! | 0.95 |
