# Force des cartes — 2026-10-31

Bot : **IA qui planifie (40 simulations)** à tous les sièges. Parties à **3 joueurs**, 1000 parties par expérience (graines 1 à 1000). Calcul : 430 min.

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
| Grand argentier | 8 | 11.3 % | −1.7 (−3.6 à +0.2) | −2.0 (−4.0 à +0.0) | 1 | 34.9 % |
| Hôtel des impôts | 4 | 14.5 % | −1.4 (−3.3 à +0.5) | −2.6 (−4.5 à −0.7) ! | 3 | 30.7 % |
| Forge | R | 11.0 % | +4.6 (+2.4 à +6.8) ! | −2.6 (−4.7 à −0.5) ! | 2 | 39.2 % |

## Domaines

Les Domaines sont distribués au hasard au départ : on compare simplement le taux de victoire de ceux qui l'ont reçu (parties de référence). À force égale, ce taux serait de 33.3 %. Un **!** signale un écart qui ne peut pas venir du seul hasard.

| Domaine | Joueurs l'ayant reçu | Taux de victoire (fourchette à 95 %) | Indice de victoire |
|---|---:|---:|---:|
| Histoire | 746 | 36.9 % (33.5 à 40.4) ! | 1.11 |
| Progrès | 757 | 35.5 % (32.2 à 39.0) | 1.07 |
| Production | 734 | 34.2 % (30.9 à 37.7) | 1.03 |
| Justice | 771 | 33.7 % (30.5 à 37.1) | 1.01 |
| Diplomatie | 754 | 33.2 % (29.9 à 36.6) | 0.99 |
| Économie | 741 | 31.7 % (28.5 à 35.2) | 0.95 |
| Science | 754 | 31.2 % (28.0 à 34.6) | 0.94 |
| Religion | 743 | 30.3 % (27.1 à 33.7) | 0.91 |
