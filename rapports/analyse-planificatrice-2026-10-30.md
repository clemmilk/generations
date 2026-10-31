# Analyse des parties entre IA — 2026-10-30

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 23.1 | 20.7 | 19.5 |
| Lignées du vainqueur | 4.7 | 4.3 | 4.2 |
| Victoires du 1er joueur | 53.8 % | 37.5 % | 31.3 % |
| Victoires du 2e joueur | 46.3 % | 35.0 % | 28.7 % |
| Victoires du 3e joueur | — | 27.5 % | 25.0 % |
| Victoires du 4e joueur | — | — | 15.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.86 | 4.01 |
| Cartes trashées | 5.97 | 5.62 |
| Cartes dans le deck à la fin | 8.90 | 9.39 |
| Cartes jouées par lignée | 3.41 | 2.89 |
| Tours par lignée | 4.94 | 4.43 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 6.89 | 3.91 |
| Effets Rouges choisis | 1.65 | 1.72 |
| Effets Rouges automatiques | 3.25 | 2.95 |
| Privilèges | 2.05 | 2.04 |
| Niveau d'Économie final | 2.87 | 3.11 |
| Niveau de Population final | 1.52 | 1.50 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 177 | 1.15 ? | 1.20 ? | 1.11 ? | 1.15 ? | 47.8 % |
| Religion | 178 | 1.11 ? | 1.15 ? | 0.72 ? | 1.45 ? | 53.0 % |
| Science | 178 | 1.10 ? | 1.08 ? | 1.43 ? | 0.80 ? | 21.5 % |
| Justice | 167 | 1.06 ? | 1.27 ? | 0.95 ? | 1.00 ? | 31.6 % |
| Progrès | 193 | 1.04 | 0.75 ? | 1.29 ? | 1.10 ? | 41.2 % |
| Production | 179 | 1.00 | 0.90 ? | 0.74 ? | 1.35 ? | 36.7 % |
| Économie | 192 | 0.89 | 0.82 ? | 1.10 ? | 0.75 ? | 32.8 % |
| Diplomatie | 176 | 0.67 ? | 1.03 ? | 0.58 ? | 0.40 ? | 20.5 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.86 carte(s) et un perdant 4.01.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Ferme | 5 | 16.8 | 1.24 ? | 19.6 % | 12.7 % |
| Bibliothécaire | 2R | 15.4 | 1.30 ? | 19.6 % | 11.9 % |
| Mine | R | 15.1 | 1.15 ? | 13.3 % | 12.5 % |
| Aqueduc | 5 | 14.6 | 1.28 ? | 18.3 % | 11.9 % |
| Démolisseur | 7 | 14.6 | 1.47 ? | 20.8 % | 10.4 % |
| Cour du roi | 3R | 14.6 | 0.95 ? | 14.2 % | 14.0 % |
| Hôtel des impôts | 4 | 14.3 | 1.00 ? | 13.3 % | 12.5 % |
| Banque | 3 | 14.0 | 1.04 ? | 12.1 % | 11.5 % |
| Archiviste royale | 4R | 14.0 | 1.32 ? | 19.2 % | 10.4 % |
| Prison | 3 | 13.9 | 1.10 ? | 10.8 % | 10.0 % |
| Meunière | 3R | 13.6 | 0.92 ? | 11.7 % | 11.3 % |
| Sapeur | 5R | 13.3 | 1.00 ? | 12.5 % | 12.7 % |
| Carrière | R | 13.1 | 0.77 ? | 8.3 % | 10.2 % |
| Hôpital | R | 12.6 | 0.90 ? | 7.9 % | 10.8 % |
| Alchimiste royale | 6 | 12.6 | 0.65 ? | 5.8 % | 11.9 % |
| Apothicaire | 2R | 12.5 | 0.87 ? | 7.9 % | 11.5 % |
| Grand argentier | 8 | 12.5 | 1.14 ? | 14.6 % | 10.0 % |
| Assassin | 6 | 12.1 | 0.84 ? | 8.3 % | 11.5 % |
| Tribunal | 4 | 11.7 | 0.83 ? | 7.1 % | 8.5 % |
| Remouleur ambulant | 3 | 11.5 | 0.91 ? | 9.6 % | 10.2 % |
| Forge | R | 11.5 | 0.70 ? | 6.3 % | 10.6 % |
| Mairie | 1R | 10.6 | 0.77 ? | 3.8 % | 6.5 % |
| Maître fondeur | 7 | 10.1 | 0.69 ? | 4.2 % | 10.0 % |
| Chancellerie | 3 | 10.0 | 0.80 ? | 6.3 % | 7.5 % |
| Maison du commerce | 6 | 9.9 | 0.82 ? | 6.3 % | 9.0 % |
| Loge des bâtisseurs | 3 | 9.3 | 0.81 ? | 4.2 % | 5.2 % |
| Cabinet d'architecte | 4 | 8.5 | 1.21 ? | 8.8 % | 5.6 % |
| Chambellan | 8 | 8.5 | 0.56 ? | 4.6 % | 9.8 % |
| Négociant | 5 | 8.2 | 0.54 ? | 3.8 % | 6.5 % |
| Contremaître | 4 | 7.9 | 0.72 ? | 4.6 % | 7.9 % |
| Roi | 6 | 7.6 | 0.54 ? | 2.5 % | 6.7 % |
| Cardinal | 5 | 7.2 | 0.78 ? | 3.3 % | 4.2 % |
| Ambassade | 6R | 6.9 | 0.66 ? | 3.8 % | 6.9 % |
| Comptoir maritime | 6 | 6.8 | 0.79 ? | 4.6 % | 4.6 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.97 cartes, un perdant 5.62.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 62.9 % | 3.5 | 12.5 % | 12.5 % | 37.1 % | 62.3 % |
| Imprimeur | 30.8 % | 3.5 | 7.5 % | 5.8 % | 69.2 % | 33.3 % |
| Épicerie | 64.6 % | 3.6 | 11.3 % | 10.8 % | 35.4 % | 58.3 % |
| Cachot | 32.9 % | 3.9 | 5.4 % | 7.1 % | 67.1 % | 29.4 % |
| Ferrailleur | 45.0 % | 3.9 | 10.8 % | 6.3 % | 55.0 % | 43.1 % |
| Salle du trésor | 47.1 % | 4.1 | 7.1 % | 7.1 % | 52.9 % | 41.0 % |
| Colporteur | 48.8 % | 4.2 | 9.2 % | 7.9 % | 51.2 % | 42.7 % |
| Tour de guet | 49.6 % | 4.2 | 5.8 % | 9.2 % | 50.4 % | 46.7 % |
| Forgeron | 23.8 % | 4.3 | 2.5 % | 5.4 % | 76.3 % | 24.6 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Diplomatie 79.5 %, Science 78.5 %, Justice 68.4 %, Économie 67.2 %, Production 63.3 %, Progrès 58.8 %, Histoire 52.2 %, Religion 47.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 22.9 % | 12.1 % | 1.42 ? | 54.9 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 16.3 % | 12.7 % | 1.15 ? | 53.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 14.2 % | 11.5 % | 1.06 ? | 51.7 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 14.2 % | 10.6 % | 1.17 ? | 51.8 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 13.8 % | 13.3 % | 1.04 ? | 57.7 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 13.8 % | 12.7 % | 1.02 ? | 41.5 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 12.9 % | 15.0 % | 0.89 ? | 47.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.8 % | 11.0 % | 1.01 ? | 40.5 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.0 % | 9.2 % | 1.09 ? | 50.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 10.0 % | 16.5 % | 0.68 ? | 46.6 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 9.2 % | 12.5 % | 0.81 ? | 34.1 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 9.2 % | 8.8 % | 0.98 ? | 50.0 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 8.8 % | 6.5 % | 1.21 ? | 57.7 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.5 % | 10.0 % | 0.79 ? | 36.4 % |
| 1 | Toutes les cartes de la pioche commune coûtent 3 Or de moins | 7.1 % | 8.3 % | 0.89 ? | 50.9 % |
| 7 | 1 blason Noblesse supplémentaire | 5.8 % | 6.7 % | 0.90 ? | 47.8 % |
| 5 | 1 blason Population supplémentaire | 5.4 % | 7.5 % | 0.79 ? | 36.7 % |
| 6 | 1 blason Économie supplémentaire | 5.4 % | 6.0 % | 0.89 ? | 47.6 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 4.6 % | 9.2 % | 0.62 ? | 36.4 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 2.9 % | 4.2 % | 0.69 ? | 40.7 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 26.7 % | 25.0 % | 1.22 | 2.87 | 3.11 | 34.6 % |
| Population | 11.3 % | 16.0 % | 0.70 | 1.52 | 1.50 | 0.0 % |
| Noblesse (Privilège) | 61.7 % | 59.0 % | 1.03 | 2.05 | 2.04 | 10.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 4.00 ? | 1.34 ? | 1.26 ? | 0.91 | 0.86 |
| Population | 1.21 ? | 0.86 | 1.11 | 0.74 ? | 0.00 ? |
| Privilèges | 1.24 ? | 1.06 | 0.97 | 0.89 ? | 1.13 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.45 | 1.12 |
| Cachot | 1.24 | 1.06 |
| Imprimeur | 0.94 | 0.71 |
| Salle du trésor | 0.92 | 0.95 |
| Colporteur | 0.89 | 0.96 |
| Ferrailleur | 0.88 | 0.93 |
| Tour de guet | 0.83 | 0.81 |
| Épicerie | 0.53 | 0.59 |
| Marché | 0.47 | 0.42 |
| Bibliothécaire | 0.33 | 0.18 |
| Mine | 0.31 | 0.17 |
| Archiviste royale | 0.30 | 0.15 |
| Démolisseur | 0.30 | 0.12 |
| Ferme | 0.28 | 0.17 |
| Aqueduc | 0.27 | 0.18 |
| Cour du roi | 0.26 | 0.23 |
| Progrès | 0.26 | 0.28 |
| Hôtel des impôts | 0.25 | 0.20 |
| Prison | 0.23 | 0.14 |
| Histoire | 0.22 | 0.16 |

## Effets Rouges par carte

Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). « Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Salle du trésor | 677 | 1.00 | 0.0 % | 0.95 | 0.94 |
| Épicerie | 410 | 1.00 | 0.0 % | 0.63 | 0.54 |
| Cachot | 808 | 0.47 | 100.0 % | 0.49 | 0.54 |
| Marché | 312 | 1.00 | 0.0 % | 0.45 | 0.43 |
| Progrès | 196 | 1.00 | 0.0 % | 0.29 | 0.26 |
| Tour de guet | 588 | 0.31 | 100.0 % | 0.28 | 0.24 |
| Hôtel des impôts | 154 | 0.84 | 0.0 % | 0.19 | 0.17 |
| Économie | 177 | 0.50 | 100.0 % | 0.14 | 0.11 |
| Cour du roi | 175 | 0.53 | 100.0 % | 0.14 | 0.12 |
| Carrière | 104 | 1.00 | 0.0 % | 0.13 | 0.15 |
| Forge | 93 | 1.00 | 0.0 % | 0.13 | 0.13 |
| Production | 84 | 0.74 | 0.0 % | 0.13 | 0.07 |
| Religion | 146 | 0.47 | 100.0 % | 0.10 | 0.09 |
| Aqueduc | 150 | 0.54 | 100.0 % | 0.10 | 0.12 |
| Hôpital | 111 | 0.47 | 0.0 % | 0.10 | 0.06 |
| Histoire | 128 | 0.44 | 0.0 % | 0.08 | 0.07 |
| Ferme | 148 | 0.49 | 100.0 % | 0.08 | 0.11 |
| Ambassade | 54 | 0.72 | 0.0 % | 0.07 | 0.05 |
| Banque | 116 | 0.50 | 100.0 % | 0.07 | 0.09 |
| Diplomatie | 72 | 0.50 | 0.0 % | 0.06 | 0.04 |
| Chancellerie | 72 | 0.50 | 100.0 % | 0.05 | 0.05 |
| Mine | 158 | 0.33 | 100.0 % | 0.05 | 0.08 |
| Prison | 120 | 0.38 | 100.0 % | 0.04 | 0.07 |
| Maison du commerce | 93 | 0.32 | 100.0 % | 0.04 | 0.04 |
| Comptoir maritime | 56 | 0.39 | 100.0 % | 0.03 | 0.03 |
| Mairie | 41 | 0.39 | 0.0 % | 0.03 | 0.02 |
| Tribunal | 39 | 0.23 | 100.0 % | 0.02 | 0.01 |
| Justice | 65 | 0.23 | 0.0 % | 0.01 | 0.03 |
| Science | 55 | 0.07 | 100.0 % | 0.01 | 0.00 |
| Cabinet d'architecte | 74 | 0.08 | 100.0 % | 0.01 | 0.01 |
| Loge des bâtisseurs | 28 | 0.11 | 100.0 % | 0.01 | 0.00 |
