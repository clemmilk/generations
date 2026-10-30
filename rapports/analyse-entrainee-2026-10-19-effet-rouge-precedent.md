# Analyse des parties entre IA — 2026-10-19 (essai : Effet Rouge pour le joueur précédent seulement)

Bot : **IA entraînée** à tous les sièges. 1000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 1000.

9000 joueurs observés, dont 3000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1000 / 1000 | 1000 / 1000 | 1000 / 1000 |
| Tours de table du vainqueur | 22.6 | 21.4 | 20.5 |
| Lignées du vainqueur | 4.2 | 4.1 | 3.9 |
| Victoires du 1er joueur | 53.5 % | 34.3 % | 27.2 % |
| Victoires du 2e joueur | 46.5 % | 35.1 % | 27.8 % |
| Victoires du 3e joueur | — | 30.6 % | 23.4 % |
| Victoires du 4e joueur | — | — | 21.6 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.48 | 3.28 |
| Cartes trashées | 4.54 | 4.00 |
| Cartes dans le deck à la fin | 9.93 | 10.28 |
| Cartes jouées par lignée | 4.13 | 3.57 |
| Tours par lignée | 5.45 | 4.81 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 9.53 | 6.85 |
| Effets Rouges choisis | 2.01 | 1.90 |
| Effets Rouges automatiques | 4.02 | 3.71 |
| Privilèges | 1.90 | 2.02 |
| Niveau d'Économie final | 3.23 | 3.37 |
| Niveau de Population final | 2.30 | 2.47 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Progrès | 2275 | 1.14 | 1.08 | 1.15 | 1.20 | 90.4 % |
| Économie | 2221 | 1.05 | 1.03 | 1.03 | 1.09 | 38.4 % |
| Diplomatie | 2244 | 1.01 | 0.99 | 1.03 | 1.02 | 31.4 % |
| Histoire | 2246 | 1.00 | 1.04 | 1.05 | 0.91 | 56.6 % |
| Production | 2230 | 0.97 | 1.01 | 0.96 | 0.95 | 39.0 % |
| Justice | 2299 | 0.95 | 0.95 | 0.95 | 0.96 | 18.1 % |
| Science | 2254 | 0.94 | 0.98 | 0.88 | 0.98 | 29.4 % |
| Religion | 2231 | 0.92 | 0.92 | 0.94 | 0.90 | 30.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.48 carte(s) et un perdant 3.28.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Aqueduc | 5 | 13.9 | 1.16 | 16.2 % | 12.6 % |
| Ferme | 4 | 13.7 | 1.24 | 17.5 % | 11.7 % |
| Bibliothécaire | 2R | 13.7 | 1.23 | 17.3 % | 11.8 % |
| Archiviste royale | 3R | 13.4 | 1.31 | 18.1 % | 11.1 % |
| Sapeur | RR | 13.1 | 1.35 | 18.1 % | 10.4 % |
| Démolisseur | 6 | 13.0 | 1.28 | 16.9 % | 10.9 % |
| Banque | R | 12.9 | 0.98 | 13.0 % | 12.4 % |
| Grand argentier | 7 | 12.9 | 1.46 | 19.5 % | 9.5 % |
| Chambellan | 5R | 12.8 | 0.99 | 12.9 % | 12.6 % |
| Maison du commerce | 5 | 12.7 | 1.13 | 14.5 % | 11.5 % |
| Remouleur ambulant | 2 | 12.0 | 0.87 | 9.8 % | 12.0 % |
| Prison | 3 | 11.9 | 0.84 | 9.3 % | 11.7 % |
| Contremaître | 3 | 11.9 | 0.89 | 10.3 % | 12.3 % |
| Hôtel des impôts | 4 | 11.8 | 0.92 | 10.8 % | 12.0 % |
| Cour du roi | 4R | 11.4 | 1.13 | 13.0 % | 10.5 % |
| Maître fondeur | 5 | 10.6 | 0.82 | 8.2 % | 10.8 % |
| Assassin | 4 | 10.2 | 0.81 | 7.9 % | 10.6 % |
| Alchimiste royale | 6 | 10.1 | 0.95 | 9.4 % | 10.2 % |
| Loge des bâtisseurs | 4 | 10.1 | 0.92 | 8.6 % | 9.7 % |
| Cardinal | 5 | 10.0 | 0.78 | 7.7 % | 10.7 % |
| Carrière | R | 9.9 | 0.83 | 7.9 % | 10.3 % |
| Roi | 4 | 9.5 | 0.82 | 7.3 % | 9.9 % |
| Forge | R | 9.5 | 0.78 | 6.9 % | 10.0 % |
| Comptoir maritime | 6 | 9.2 | 0.86 | 7.7 % | 9.6 % |
| Mine | R | 8.2 | 1.03 | 7.6 % | 7.3 % |
| Meunière | RR | 8.0 | 1.19 | 9.6 % | 7.0 % |
| Ambassade | RRR | 7.0 | 0.89 | 6.1 % | 7.4 % |
| Hôpital | RR | 6.1 | 1.00 | 5.9 % | 6.1 % |
| Négociant | 4 | 5.0 | 0.75 | 3.6 % | 5.2 % |
| Apothicaire | 1R | 4.5 | 1.26 | 5.5 % | 3.8 % |
| Cabinet d'architecte | 2R | 4.4 | 0.75 | 2.8 % | 4.7 % |
| Mairie | RR | 4.0 | 0.82 | 3.1 % | 4.3 % |
| Chancellerie | 3 | 3.7 | 0.78 | 1.9 % | 2.9 % |
| Tribunal | 3 | 3.4 | 0.82 | 2.4 % | 3.1 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 4.54 cartes, un perdant 4.00.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Ferrailleur | 75.4 % | 2.5 | 23.1 % | 20.4 % | 24.6 % | 68.2 % |
| Marché | 71.8 % | 2.7 | 16.8 % | 18.8 % | 28.2 % | 62.7 % |
| Tour de guet | 44.3 % | 2.9 | 12.4 % | 9.3 % | 55.7 % | 41.3 % |
| Cachot | 8.8 % | 3.5 | 1.9 % | 2.1 % | 91.2 % | 8.1 % |
| Épicerie | 41.3 % | 3.8 | 3.4 % | 7.0 % | 58.7 % | 31.6 % |
| Salle du trésor | 37.0 % | 3.8 | 3.8 % | 5.8 % | 63.0 % | 27.5 % |
| Colporteur | 38.8 % | 3.8 | 0.8 % | 6.9 % | 61.2 % | 35.0 % |
| Forgeron | 10.0 % | 4.7 | 1.0 % | 1.3 % | 90.0 % | 8.8 % |
| Imprimeur | 2.3 % | 5.6 | 0.0 % | 0.2 % | 97.7 % | 1.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 81.9 %, Science 70.6 %, Religion 69.9 %, Diplomatie 68.6 %, Économie 61.6 %, Production 61.0 %, Histoire 43.4 %, Progrès 9.6 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.9 % | 12.7 % | 1.25 | 60.8 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 16.6 % | 14.7 % | 1.05 | 66.5 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 15.9 % | 14.8 % | 1.03 | 67.8 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 14.8 % | 14.6 % | 0.97 | 64.1 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 14.7 % | 13.5 % | 1.03 | 45.4 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 14.5 % | 14.8 % | 0.97 | 51.2 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 14.0 % | 13.8 % | 1.01 | 51.8 % |
| 6 | 1 blason Économie supplémentaire | 13.2 % | 15.3 % | 0.87 | 62.2 % |
| 5 | 1 blason Population supplémentaire | 12.6 % | 16.4 % | 0.80 | 64.6 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.4 % | 12.4 % | 0.90 | 29.7 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 10.1 % | 9.8 % | 1.06 | 25.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 9.6 % | 14.8 % | 0.74 | 41.5 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 9.6 % | 14.2 % | 0.77 | 34.4 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 6.8 % | 8.9 % | 0.88 | 23.7 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 5.3 % | 6.1 % | 0.96 | 16.8 % |
| 7 | 1 blason Noblesse supplémentaire | 2.3 % | 4.1 % | 0.72 | 15.1 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 1.1 % | 1.3 % | 1.04 ? | 10.3 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 0.0 % | 0.0 % | — | 0.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 0.0 % | 0.0 % | — | 0.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 21.5 % | 19.3 % | 1.08 | 3.23 | 3.37 | 51.5 % |
| Population | 20.2 % | 20.6 % | 0.98 | 2.30 | 2.47 | 10.6 % |
| Noblesse (Privilège) | 58.1 % | 60.1 % | 0.93 | 1.90 | 2.02 | 6.3 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.80 ? | 1.57 | 1.26 | 0.90 | 0.94 |
| Population | 1.67 ? | 1.04 | 1.18 | 0.76 | 0.91 |
| Privilèges | 1.54 ? | 1.13 | 0.96 | 0.85 | 0.97 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Cachot | 1.62 | 1.45 |
| Forgeron | 1.60 | 1.58 |
| Colporteur | 1.33 | 1.34 |
| Imprimeur | 1.22 | 0.97 |
| Épicerie | 1.18 | 1.33 |
| Salle du trésor | 1.08 | 1.23 |
| Tour de guet | 0.61 | 0.57 |
| Marché | 0.55 | 0.69 |
| Progrès | 0.51 | 0.41 |
| Aqueduc | 0.34 | 0.23 |
| Ferme | 0.33 | 0.21 |
| Archiviste royale | 0.32 | 0.19 |
| Maison du commerce | 0.31 | 0.21 |
| Démolisseur | 0.31 | 0.19 |
| Sapeur | 0.31 | 0.17 |
| Bibliothécaire | 0.31 | 0.20 |
| Ferrailleur | 0.30 | 0.39 |
| Grand argentier | 0.29 | 0.12 |
| Chambellan | 0.25 | 0.22 |
| Contremaître | 0.24 | 0.23 |

## Effets Rouges par carte

Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). « Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Épicerie | 11512 | 1.00 | 0.0 % | 1.35 | 1.24 |
| Salle du trésor | 10654 | 1.00 | 0.0 % | 1.24 | 1.15 |
| Cachot | 13553 | 0.75 | 100.0 % | 1.18 | 1.11 |
| Progrès | 3996 | 1.00 | 0.0 % | 0.43 | 0.45 |
| Aqueduc | 2438 | 0.72 | 100.0 % | 0.20 | 0.19 |
| Forge | 1332 | 1.00 | 0.0 % | 0.18 | 0.13 |
| Carrière | 1390 | 1.00 | 0.0 % | 0.18 | 0.14 |
| Ferme | 2231 | 0.70 | 100.0 % | 0.18 | 0.17 |
| Hôtel des impôts | 1450 | 0.99 | 0.0 % | 0.17 | 0.15 |
| Banque | 1584 | 0.70 | 100.0 % | 0.15 | 0.11 |
| Histoire | 2093 | 0.58 | 0.0 % | 0.14 | 0.13 |
| Économie | 1655 | 0.66 | 100.0 % | 0.12 | 0.12 |
| Maison du commerce | 2189 | 0.50 | 100.0 % | 0.11 | 0.13 |
| Production | 924 | 0.95 | 0.0 % | 0.10 | 0.09 |
| Diplomatie | 627 | 0.91 | 0.0 % | 0.07 | 0.06 |
| Comptoir maritime | 1276 | 0.50 | 100.0 % | 0.07 | 0.07 |
| Hôpital | 646 | 0.72 | 0.0 % | 0.06 | 0.05 |
| Mairie | 354 | 0.99 | 0.0 % | 0.04 | 0.04 |
| Ambassade | 850 | 0.57 | 0.0 % | 0.04 | 0.06 |
| Justice | 99 | 0.51 | 0.0 % | 0.01 | 0.01 |
| Tour de guet | 5241 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Marché | 5777 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Religion | 1072 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Science | 1485 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Prison | 1634 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Cabinet d'architecte | 415 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Chancellerie | 232 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Tribunal | 67 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Mine | 932 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Loge des bâtisseurs | 1088 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Cour du roi | 1707 | 0.00 | 0.0 % | 0.00 | 0.00 |
