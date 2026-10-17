# Analyse des parties entre IA — 2026-10-14

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 120 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 120.

1080 joueurs observés, dont 360 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 120 / 120 | 120 / 120 | 120 / 120 |
| Tours de table du vainqueur | 26.7 | 21.3 | 17.9 |
| Lignées du vainqueur | 5.9 | 5.1 | 5.2 |
| Victoires du 1er joueur | 45.8 % | 32.5 % | 18.3 % |
| Victoires du 2e joueur | 54.2 % | 30.0 % | 26.7 % |
| Victoires du 3e joueur | — | 37.5 % | 24.2 % |
| Victoires du 4e joueur | — | — | 30.8 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.88 | 2.70 |
| Cartes trashées | 7.62 | 6.39 |
| Cartes dans le deck à la fin | 6.26 | 7.31 |
| Cartes jouées par lignée | 2.82 | 2.63 |
| Tours par lignée | 4.20 | 3.97 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 3.74 | 1.57 |
| Effets Rouges choisis | 2.80 | 2.82 |
| Effets Rouges automatiques | 6.77 | 7.40 |
| Privilèges | 1.41 | 1.40 |
| Niveau d'Économie final | 3.21 | 3.25 |
| Niveau de Population final | 2.96 | 2.77 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 223 | 1.45 | 1.11 ? | 1.71 ? | 1.58 ? | 89.0 % |
| Production | 214 | 1.06 | 0.96 ? | 0.95 ? | 1.29 ? | 61.8 % |
| Économie | 234 | 1.02 | 1.07 ? | 1.14 ? | 0.83 ? | 52.5 % |
| Justice | 206 | 0.98 | 1.06 ? | 0.86 ? | 1.03 ? | 64.7 % |
| Commerce | 228 | 0.98 | 1.12 ? | 0.92 ? | 0.90 ? | 64.0 % |
| Éducation | 209 | 0.96 | 0.76 ? | 1.14 ? | 0.98 ? | 15.2 % |
| Diplomatie | 192 | 0.95 | 1.09 ? | 0.97 ? | 0.83 ? | 49.2 % |
| Progrès | 214 | 0.94 | 1.18 ? | 0.82 ? | 0.82 ? | 47.0 % |
| Religion | 215 | 0.83 | 0.73 ? | 0.85 ? | 0.91 ? | 20.0 % |
| Science | 225 | 0.81 | 0.92 ? | 0.67 ? | 0.83 ? | 21.3 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 2.88 carte(s) et un perdant 2.70.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Alchimiste royale | 6 | 13.1 | 1.47 ? | 20.0 % | 8.6 % |
| Maître fondeur | 4 | 12.0 | 1.00 ? | 11.1 % | 10.4 % |
| Aqueduc | 5 | 12.0 | 1.09 ? | 11.9 % | 10.4 % |
| Mine | RR | 11.8 | 1.12 ? | 7.5 % | 8.6 % |
| Ambassade | RRR | 11.0 | 0.94 ? | 9.4 % | 9.7 % |
| Contremaître | 3 | 10.4 | 0.95 ? | 10.8 % | 8.9 % |
| Ferme | 3 | 10.2 | 0.91 ? | 8.1 % | 8.8 % |
| Comptoir maritime | 5 | 10.2 | 0.63 ? | 4.4 % | 10.6 % |
| Prison | 2 | 9.8 | 0.95 ? | 4.2 % | 4.7 % |
| Maison du commerce | 7 | 9.4 | 0.81 ? | 6.7 % | 8.9 % |
| Assassin | 4 | 9.2 | 0.98 ? | 0.8 % | 2.1 % |
| Démolisseur | 6 | 9.2 | 1.60 ? | 14.2 % | 4.3 % |
| Forge | R | 9.0 | 0.64 ? | 2.5 % | 7.9 % |
| Halle des négociants | 2 | 8.8 | 0.95 ? | 4.4 % | 5.8 % |
| Apothicairerie | 2R | 8.7 | 0.84 ? | 2.8 % | 5.3 % |
| Sapeur | RR | 8.6 | 1.14 ? | 8.3 % | 6.5 % |
| Bibliothécaire | 2R | 8.1 | 0.77 ? | 3.9 % | 6.1 % |
| Moulin | RR | 8.1 | 1.05 ? | 8.1 % | 4.9 % |
| Banque | R | 8.0 | 1.33 ? | 7.8 % | 2.9 % |
| Carrière | R | 8.0 | 0.57 ? | 2.2 % | 6.0 % |
| Hôtel des impôts | 4 | 7.5 | 0.94 ? | 4.2 % | 5.1 % |
| Remouleur ambulant | 2 | 7.3 | 0.75 ? | 3.1 % | 4.6 % |
| Hôpital | RR | 6.9 | 0.57 ? | 1.1 % | 3.1 % |
| Cour du roi | 3RR | 6.9 | 0.92 ? | 4.4 % | 5.1 % |
| Roi | 5 | 6.7 | 0.92 ? | 3.6 % | 3.5 % |
| Cabinet d'architecte | R | 6.6 | 0.72 ? | 2.2 % | 3.2 % |
| Grand argentier | 8 | 6.1 | 1.28 ? | 8.1 % | 3.6 % |
| Loge des bâtisseurs | 5 | 5.6 | 0.68 ? | 1.4 % | 3.1 % |
| Chancellerie | 4 | 5.6 | 0.44 ? | 0.8 % | 2.1 % |
| Mairie | RR | 5.5 | 1.15 ? | 3.3 % | 1.9 % |
| Tribunal | 4 | 5.4 | 0.83 ? | 0.8 % | 1.5 % |
| Cardinal | 6 | 5.3 | 0.74 ? | 2.8 % | 4.2 % |
| Archiviste royale | 7 | 5.3 | 0.85 ? | 4.2 % | 4.0 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.62 cartes, un perdant 6.39.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Colporteur | 79.4 % | 3.4 | 23.9 % | 8.9 % | 20.6 % | 79.4 % |
| Marché | 79.2 % | 3.7 | 15.8 % | 16.9 % | 20.8 % | 69.0 % |
| Épicerie | 76.9 % | 4.1 | 12.2 % | 11.4 % | 23.1 % | 64.3 % |
| Tour de guet | 44.7 % | 4.3 | 8.6 % | 5.8 % | 55.3 % | 26.4 % |
| Imprimeur | 69.2 % | 4.4 | 7.8 % | 8.6 % | 30.8 % | 58.2 % |
| Cachot | 55.3 % | 4.8 | 4.7 % | 8.1 % | 44.7 % | 53.8 % |
| Ferrailleur | 61.9 % | 4.9 | 5.0 % | 9.4 % | 38.1 % | 47.9 % |
| Salle du trésor | 54.4 % | 5.1 | 5.6 % | 6.7 % | 45.6 % | 37.6 % |
| Forgeron | 45.8 % | 5.7 | 1.4 % | 6.7 % | 54.2 % | 32.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Éducation 84.8 %, Religion 80.0 %, Science 78.7 %, Progrès 53.0 %, Diplomatie 50.8 %, Économie 47.5 %, Production 38.2 %, Commerce 36.0 %, Justice 35.3 %, Histoire 11.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 17.5 % | 8.6 % | 1.46 ? | 76.8 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 14.2 % | 8.2 % | 1.38 ? | 71.8 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 12.2 % | 8.5 % | 1.24 ? | 75.2 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 11.9 % | 10.8 % | 1.03 ? | 76.9 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 11.7 % | 12.9 % | 0.91 ? | 71.1 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 10.6 % | 10.7 % | 0.98 ? | 71.3 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 10.3 % | 9.4 % | 1.02 ? | 66.7 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 7.8 % | 8.2 % | 0.92 ? | 58.6 % |
| 5 | 1 blason Population supplémentaire | 7.2 % | 9.9 % | 0.81 ? | 69.1 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 5.6 % | 7.8 % | 0.77 ? | 47.4 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 5.0 % | 3.9 % | 1.12 ? | 52.2 % |
| 7 | 1 blason Noblesse supplémentaire | 5.0 % | 4.4 % | 1.04 ? | 62.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.0 % | 7.1 % | 0.82 ? | 72.5 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 4.2 % | 3.2 % | 1.15 ? | 47.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 3.9 % | 6.5 % | 0.71 ? | 77.0 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 2.5 % | 7.6 % | 0.45 ? | 68.8 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 1.9 % | 1.9 % | 0.90 ? | 61.9 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 1.9 % | 1.7 % | 1.12 ? | 52.6 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 1.7 % | 6.8 % | 0.32 ? | 40.0 % |
| 6 | 1 blason Économie supplémentaire | 1.4 % | 1.5 % | 0.86 ? | 43.8 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 44.2 % | 47.1 % | 1.32 | 3.21 | 3.25 | 50.0 % |
| Population | 10.8 % | 7.5 % | 0.88 | 2.96 | 2.77 | 34.4 % |
| Noblesse (Privilège) | 45.0 % | 45.4 % | 0.79 | 1.41 | 1.40 | 1.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.00 ? | 1.13 ? | 1.10 | 0.96 | 0.98 |
| Population | — | 0.69 ? | 1.15 | 0.71 | 1.32 |
| Privilèges | 1.05 ? | 1.02 | 0.92 | 1.09 ? | 0.95 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 1.48 | 1.51 |
| Forgeron | 1.40 | 1.49 |
| Salle du trésor | 1.09 | 1.19 |
| Ferrailleur | 0.91 | 0.92 |
| Cachot | 0.79 | 0.67 |
| Histoire | 0.62 | 0.24 |
| Épicerie | 0.60 | 0.62 |
| Alchimiste royale | 0.59 | 0.15 |
| Imprimeur | 0.55 | 0.45 |
| Colporteur | 0.44 | 0.32 |
| Marché | 0.41 | 0.44 |
| Commerce | 0.39 | 0.34 |
| Économie | 0.34 | 0.29 |
| Justice | 0.33 | 0.30 |
| Maître fondeur | 0.31 | 0.22 |
| Aqueduc | 0.31 | 0.18 |
| Contremaître | 0.25 | 0.20 |
| Ambassade | 0.25 | 0.20 |
| Production | 0.23 | 0.26 |
| Mine | 0.23 | 0.12 |
