# Analyse des parties entre IA — 2026-10-30 (essai : Effet Rouge pour le joueur précédent seulement)

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 2000 parties par taille de table (3 joueurs), graines 1 à 2000.

6000 joueurs observés, dont 2000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 3 joueurs |
|---|---:|
| Parties terminées | 2000 / 2000 |
| Tours de table du vainqueur | 20.4 |
| Lignées du vainqueur | 4.3 |
| Victoires du 1er joueur | 34.2 % |
| Victoires du 2e joueur | 34.9 % |
| Victoires du 3e joueur | 30.9 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.76 | 4.10 |
| Cartes trashées | 5.89 | 5.70 |
| Cartes dans le deck à la fin | 8.87 | 9.40 |
| Cartes jouées par lignée | 3.37 | 2.85 |
| Tours par lignée | 4.90 | 4.40 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 6.73 | 3.77 |
| Effets Rouges choisis | 1.67 | 1.66 |
| Effets Rouges automatiques | 3.15 | 3.02 |
| Privilèges | 1.98 | 2.02 |
| Niveau d'Économie final | 2.84 | 3.07 |
| Niveau de Population final | 1.49 | 1.46 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 3 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|
| Histoire | 1491 | 1.10 | 1.10 | 50.9 % |
| Production | 1483 | 1.05 | 1.05 | 40.5 % |
| Diplomatie | 1503 | 1.04 | 1.04 | 33.6 % |
| Progrès | 1510 | 1.03 | 1.03 | 49.7 % |
| Justice | 1510 | 1.00 | 1.00 | 29.9 % |
| Science | 1525 | 0.94 | 0.94 | 22.3 % |
| Religion | 1468 | 0.92 | 0.92 | 45.8 % |
| Économie | 1510 | 0.91 | 0.91 | 48.7 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.76 carte(s) et un perdant 4.10.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Bibliothécaire | 2R | 15.8 | 1.18 | 18.1 % | 13.4 % |
| Aqueduc | 5 | 15.4 | 1.04 | 15.6 % | 14.1 % |
| Ferme | 5 | 15.1 | 1.15 | 16.7 % | 13.1 % |
| Démolisseur | 7 | 15.1 | 1.38 | 20.1 % | 11.8 % |
| Mine | R | 14.8 | 0.84 | 10.8 % | 14.1 % |
| Cour du roi | 3R | 14.4 | 0.99 | 13.6 % | 13.5 % |
| Archiviste royale | 4R | 14.1 | 1.28 | 17.6 % | 11.4 % |
| Banque | 3 | 14.0 | 1.15 | 14.8 % | 11.6 % |
| Hôpital | R | 13.8 | 0.94 | 11.1 % | 11.5 % |
| Sapeur | 5R | 13.6 | 1.17 | 15.7 % | 11.6 % |
| Hôtel des impôts | 4 | 13.6 | 1.02 | 12.8 % | 12.2 % |
| Assassin | 6 | 13.0 | 0.91 | 10.0 % | 11.9 % |
| Carrière | R | 12.9 | 0.84 | 8.2 % | 11.3 % |
| Remouleur ambulant | 3 | 12.9 | 0.87 | 9.3 % | 11.7 % |
| Prison | 3 | 12.8 | 0.79 | 7.4 % | 10.9 % |
| Apothicaire | 2R | 12.5 | 0.89 | 8.8 % | 10.3 % |
| Forge | R | 12.4 | 0.69 | 5.9 % | 11.1 % |
| Meunière | 3R | 11.7 | 0.82 | 7.8 % | 9.3 % |
| Mairie | 1R | 11.5 | 0.80 | 6.1 % | 8.5 % |
| Grand argentier | 8 | 11.3 | 1.14 | 12.4 % | 9.8 % |
| Tribunal | 4 | 10.9 | 0.78 | 5.4 % | 7.6 % |
| Chancellerie | 3 | 10.6 | 0.87 | 6.9 % | 8.5 % |
| Alchimiste royale | 6 | 10.5 | 0.92 | 8.0 % | 8.8 % |
| Maître fondeur | 7 | 10.2 | 0.90 | 7.3 % | 9.4 % |
| Cabinet d'architecte | 4 | 10.2 | 0.94 | 7.0 % | 8.3 % |
| Loge des bâtisseurs | 3 | 10.0 | 0.78 | 4.6 % | 5.7 % |
| Contremaître | 4 | 9.6 | 0.79 | 5.3 % | 8.6 % |
| Maison du commerce | 6 | 9.4 | 0.76 | 5.7 % | 9.1 % |
| Ambassade | 6R | 8.3 | 0.78 | 5.8 % | 8.4 % |
| Cardinal | 5 | 8.3 | 0.76 | 3.6 % | 5.6 % |
| Roi | 6 | 8.1 | 0.84 | 5.6 % | 6.2 % |
| Négociant | 5 | 8.0 | 0.75 | 3.8 % | 5.3 % |
| Comptoir maritime | 6 | 7.4 | 0.65 | 3.7 % | 7.0 % |
| Chambellan | 8 | 6.4 | 0.82 | 5.1 % | 6.5 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.89 cartes, un perdant 5.70.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 65.5 % | 3.3 | 15.7 % | 12.4 % | 34.5 % | 63.5 % |
| Épicerie | 67.0 % | 3.6 | 12.3 % | 13.7 % | 33.0 % | 61.9 % |
| Colporteur | 51.8 % | 3.8 | 8.9 % | 9.4 % | 48.1 % | 43.2 % |
| Imprimeur | 31.3 % | 3.8 | 5.0 % | 6.2 % | 68.8 % | 34.4 % |
| Ferrailleur | 49.7 % | 3.9 | 8.9 % | 8.1 % | 50.3 % | 43.1 % |
| Forgeron | 19.5 % | 4.1 | 3.7 % | 2.8 % | 80.5 % | 23.3 % |
| Tour de guet | 49.6 % | 4.1 | 5.9 % | 7.4 % | 50.3 % | 43.9 % |
| Salle du trésor | 46.9 % | 4.2 | 6.7 % | 7.1 % | 53.0 % | 41.2 % |
| Cachot | 32.0 % | 4.2 | 5.2 % | 5.3 % | 68.0 % | 31.9 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Science 77.7 %, Justice 70.1 %, Diplomatie 66.4 %, Production 59.5 %, Religion 54.2 %, Économie 51.3 %, Progrès 50.3 %, Histoire 49.1 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 19.8 % | 12.6 % | 1.32 | 57.8 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 17.1 % | 12.9 % | 1.20 | 57.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 15.4 % | 12.8 % | 1.13 | 52.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 12.4 % | 12.8 % | 0.98 | 55.1 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 12.0 % | 13.1 % | 0.95 | 53.9 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 10.9 % | 12.8 % | 0.90 | 49.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 10.6 % | 14.2 % | 0.81 | 47.6 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 10.5 % | 15.2 % | 0.77 | 49.8 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.2 % | 9.8 % | 1.03 | 44.9 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 10.0 % | 11.8 % | 0.89 | 38.3 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 9.2 % | 10.0 % | 0.94 | 43.2 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 8.6 % | 7.4 % | 1.10 | 52.0 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 8.0 % | 7.8 % | 1.02 | 50.1 % |
| 7 | 1 blason Noblesse supplémentaire | 7.9 % | 6.6 % | 1.13 | 38.2 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.4 % | 10.0 % | 0.82 | 38.0 % |
| 1 | Toutes les cartes de la pioche commune coûtent 3 Or de moins | 7.2 % | 7.4 % | 0.98 | 49.8 % |
| 5 | 1 blason Population supplémentaire | 6.2 % | 7.0 % | 0.92 | 38.3 % |
| 6 | 1 blason Économie supplémentaire | 5.7 % | 7.0 % | 0.87 | 46.3 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 4.8 % | 6.7 % | 0.79 | 44.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 4.5 % | 4.6 % | 0.99 | 39.2 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 25.7 % | 24.7 % | 1.20 | 2.84 | 3.07 | 31.6 % |
| Population | 13.8 % | 14.8 % | 0.70 | 1.49 | 1.46 | 0.4 % |
| Noblesse (Privilège) | 60.3 % | 60.4 % | 1.06 | 1.98 | 2.02 | 8.3 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 2.50 ? | 1.45 | 1.15 | 0.93 | 0.88 |
| Population | 1.26 | 0.80 | 1.13 | 0.78 | 1.14 ? |
| Privilèges | 1.36 ? | 1.03 | 0.97 | 0.94 | 1.09 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.39 | 1.11 |
| Cachot | 1.12 | 1.09 |
| Imprimeur | 0.95 | 0.74 |
| Colporteur | 0.93 | 0.95 |
| Salle du trésor | 0.91 | 0.95 |
| Tour de guet | 0.84 | 0.84 |
| Ferrailleur | 0.81 | 0.88 |
| Épicerie | 0.53 | 0.58 |
| Marché | 0.42 | 0.46 |
| Bibliothécaire | 0.31 | 0.17 |
| Démolisseur | 0.29 | 0.14 |
| Archiviste royale | 0.28 | 0.14 |
| Cour du roi | 0.27 | 0.21 |
| Mine | 0.25 | 0.21 |
| Aqueduc | 0.25 | 0.18 |
| Progrès | 0.24 | 0.24 |
| Ferme | 0.24 | 0.15 |
| Sapeur | 0.24 | 0.12 |
| Hôtel des impôts | 0.22 | 0.18 |
| Banque | 0.21 | 0.13 |

## Effets Rouges par carte

Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). « Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Salle du trésor | 5605 | 1.00 | 0.0 % | 0.94 | 0.93 |
| Épicerie | 3383 | 1.00 | 0.0 % | 0.59 | 0.55 |
| Cachot | 6589 | 0.47 | 100.0 % | 0.52 | 0.51 |
| Marché | 2674 | 1.00 | 0.0 % | 0.46 | 0.44 |
| Tour de guet | 5021 | 0.32 | 100.0 % | 0.29 | 0.26 |
| Progrès | 1449 | 1.00 | 0.0 % | 0.25 | 0.24 |
| Forge | 801 | 1.00 | 0.0 % | 0.16 | 0.12 |
| Hôtel des impôts | 1167 | 0.89 | 0.0 % | 0.15 | 0.18 |
| Carrière | 898 | 1.00 | 0.0 % | 0.15 | 0.15 |
| Cour du roi | 1377 | 0.54 | 100.0 % | 0.11 | 0.13 |
| Aqueduc | 1197 | 0.52 | 100.0 % | 0.09 | 0.11 |
| Production | 693 | 0.78 | 0.0 % | 0.09 | 0.09 |
| Économie | 1351 | 0.44 | 100.0 % | 0.09 | 0.10 |
| Religion | 1014 | 0.47 | 100.0 % | 0.09 | 0.08 |
| Mine | 1341 | 0.38 | 100.0 % | 0.08 | 0.09 |
| Ambassade | 593 | 0.77 | 0.0 % | 0.08 | 0.07 |
| Ferme | 1099 | 0.50 | 100.0 % | 0.08 | 0.10 |
| Hôpital | 970 | 0.45 | 0.0 % | 0.07 | 0.07 |
| Histoire | 1050 | 0.42 | 0.0 % | 0.07 | 0.07 |
| Banque | 961 | 0.48 | 100.0 % | 0.07 | 0.08 |
| Diplomatie | 589 | 0.52 | 0.0 % | 0.06 | 0.05 |
| Chancellerie | 535 | 0.52 | 100.0 % | 0.06 | 0.04 |
| Maison du commerce | 679 | 0.42 | 100.0 % | 0.05 | 0.04 |
| Prison | 823 | 0.34 | 100.0 % | 0.05 | 0.04 |
| Comptoir maritime | 419 | 0.47 | 100.0 % | 0.04 | 0.03 |
| Mairie | 501 | 0.44 | 0.0 % | 0.04 | 0.04 |
| Justice | 505 | 0.25 | 0.0 % | 0.02 | 0.02 |
| Tribunal | 400 | 0.33 | 100.0 % | 0.02 | 0.02 |
| Science | 466 | 0.10 | 100.0 % | 0.01 | 0.01 |
| Cabinet d'architecte | 592 | 0.07 | 100.0 % | 0.01 | 0.01 |
| Loge des bâtisseurs | 364 | 0.10 | 100.0 % | 0.01 | 0.01 |
