# Analyse des parties entre IA — 2026-10-19

Bot : **IA entraînée** à tous les sièges. 1000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 1000.

9000 joueurs observés, dont 3000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1000 / 1000 | 1000 / 1000 | 1000 / 1000 |
| Tours de table du vainqueur | 22.6 | 18.9 | 16.2 |
| Lignées du vainqueur | 4.2 | 3.5 | 2.9 |
| Victoires du 1er joueur | 53.5 % | 36.8 % | 27.5 % |
| Victoires du 2e joueur | 46.5 % | 33.4 % | 27.4 % |
| Victoires du 3e joueur | — | 29.8 % | 24.0 % |
| Victoires du 4e joueur | — | — | 21.1 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.01 | 2.75 |
| Cartes trashées | 3.97 | 3.37 |
| Cartes dans le deck à la fin | 10.05 | 10.38 |
| Cartes jouées par lignée | 4.45 | 3.79 |
| Tours par lignée | 5.70 | 4.96 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 9.60 | 7.21 |
| Effets Rouges choisis | 3.28 | 3.41 |
| Effets Rouges automatiques | 6.99 | 7.62 |
| Privilèges | 1.68 | 1.74 |
| Niveau d'Économie final | 3.04 | 3.15 |
| Niveau de Population final | 1.96 | 2.01 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Progrès | 2275 | 1.06 | 1.08 | 1.03 | 1.06 | 92.9 % |
| Diplomatie | 2244 | 1.05 | 0.99 | 1.04 | 1.12 | 33.7 % |
| Histoire | 2246 | 1.02 | 1.04 | 1.01 | 1.01 | 60.8 % |
| Économie | 2221 | 1.00 | 1.03 | 1.03 | 0.94 | 47.0 % |
| Production | 2230 | 0.99 | 1.01 | 0.94 | 1.00 | 41.9 % |
| Science | 2254 | 0.97 | 0.98 | 1.00 | 0.93 | 35.3 % |
| Justice | 2299 | 0.96 | 0.95 | 0.96 | 0.97 | 21.7 % |
| Religion | 2231 | 0.95 | 0.92 | 0.98 | 0.96 | 38.8 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.01 carte(s) et un perdant 2.75.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Aqueduc | 5 | 12.4 | 0.97 | 12.5 % | 12.3 % |
| Ferme | 4 | 12.1 | 1.10 | 14.1 % | 11.1 % |
| Bibliothécaire | 2R | 12.0 | 1.28 | 16.2 % | 9.9 % |
| Archiviste royale | 3R | 12.0 | 1.40 | 17.6 % | 9.2 % |
| Sapeur | RR | 11.7 | 1.34 | 16.5 % | 9.2 % |
| Banque | R | 11.6 | 0.87 | 10.7 % | 11.8 % |
| Démolisseur | 6 | 11.5 | 1.25 | 15.1 % | 9.7 % |
| Maison du commerce | 5 | 11.2 | 1.18 | 13.7 % | 9.8 % |
| Grand argentier | 7 | 11.0 | 1.45 | 17.1 % | 7.9 % |
| Remouleur ambulant | 2 | 10.8 | 0.97 | 10.2 % | 10.2 % |
| Prison | 3 | 10.7 | 0.86 | 8.7 % | 10.7 % |
| Chambellan | 5R | 10.7 | 0.94 | 10.6 % | 10.7 % |
| Contremaître | 3 | 10.4 | 0.92 | 9.6 % | 10.6 % |
| Cour du roi | 4R | 10.1 | 1.09 | 11.3 % | 9.3 % |
| Hôtel des impôts | 4 | 9.7 | 0.98 | 9.8 % | 9.4 % |
| Carrière | R | 9.0 | 0.87 | 7.6 % | 9.1 % |
| Forge | R | 8.9 | 0.82 | 7.0 % | 9.4 % |
| Loge des bâtisseurs | 4 | 8.7 | 0.85 | 7.1 % | 8.7 % |
| Maître fondeur | 5 | 8.7 | 0.81 | 6.8 % | 8.9 % |
| Alchimiste royale | 6 | 8.3 | 0.90 | 7.5 % | 8.6 % |
| Assassin | 4 | 7.9 | 0.82 | 6.7 % | 8.2 % |
| Comptoir maritime | 6 | 7.9 | 0.86 | 7.0 % | 8.3 % |
| Mine | R | 7.5 | 0.93 | 6.4 % | 7.2 % |
| Roi | 4 | 7.3 | 0.78 | 5.7 % | 7.6 % |
| Cardinal | 5 | 7.3 | 0.76 | 5.9 % | 7.7 % |
| Meunière | RR | 6.0 | 1.19 | 7.7 % | 5.1 % |
| Ambassade | RRR | 5.4 | 0.95 | 5.3 % | 5.5 % |
| Hôpital | RR | 5.2 | 1.00 | 5.1 % | 5.0 % |
| Cabinet d'architecte | 2R | 3.9 | 0.73 | 2.6 % | 4.1 % |
| Chancellerie | 3 | 3.2 | 0.77 | 2.0 % | 3.0 % |
| Apothicaire | 1R | 3.0 | 1.10 | 3.4 % | 2.5 % |
| Mairie | RR | 2.7 | 0.82 | 2.4 % | 2.8 % |
| Négociant | 4 | 2.6 | 0.76 | 2.2 % | 2.5 % |
| Tribunal | 3 | 2.1 | 0.84 | 1.8 % | 1.8 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 3.97 cartes, un perdant 3.37.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Ferrailleur | 68.8 % | 2.3 | 23.6 % | 19.9 % | 31.2 % | 60.9 % |
| Marché | 64.1 % | 2.5 | 17.2 % | 18.6 % | 35.9 % | 54.0 % |
| Tour de guet | 38.0 % | 2.7 | 11.4 % | 9.1 % | 62.0 % | 35.4 % |
| Cachot | 7.4 % | 3.4 | 1.7 % | 1.6 % | 92.6 % | 6.4 % |
| Colporteur | 33.3 % | 3.6 | 1.2 % | 6.9 % | 66.7 % | 30.0 % |
| Épicerie | 31.9 % | 3.7 | 2.9 % | 6.1 % | 68.1 % | 24.1 % |
| Salle du trésor | 28.6 % | 3.7 | 3.3 % | 5.0 % | 71.4 % | 20.7 % |
| Forgeron | 8.5 % | 4.3 | 1.3 % | 1.2 % | 91.5 % | 6.4 % |
| Imprimeur | 2.2 % | 5.0 | 0.1 % | 0.2 % | 97.8 % | 0.9 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 78.3 %, Diplomatie 66.3 %, Science 64.7 %, Religion 61.2 %, Production 58.1 %, Économie 53.0 %, Histoire 39.2 %, Progrès 7.1 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 17.3 % | 11.7 % | 1.22 | 64.2 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 14.8 % | 13.5 % | 1.02 | 72.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 14.1 % | 13.8 % | 0.97 | 71.4 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 14.0 % | 13.0 % | 0.99 | 69.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 12.6 % | 13.3 % | 0.93 | 57.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 12.5 % | 12.2 % | 1.00 | 56.5 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 12.0 % | 12.3 % | 0.94 | 50.5 % |
| 5 | 1 blason Population supplémentaire | 11.9 % | 14.6 % | 0.81 | 70.3 % |
| 6 | 1 blason Économie supplémentaire | 11.8 % | 13.6 % | 0.86 | 68.1 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.0 % | 11.9 % | 0.87 | 46.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.7 % | 9.8 % | 0.98 | 34.3 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 8.2 % | 11.8 % | 0.76 | 39.0 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 7.4 % | 7.7 % | 0.98 | 32.5 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.1 % | 6.4 % | 0.86 | 30.1 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 3.8 % | 4.3 % | 0.90 | 20.1 % |
| 7 | 1 blason Noblesse supplémentaire | 1.8 % | 2.7 % | 0.77 | 18.3 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.4 % | 1.0 % | 0.60 ? | 16.9 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 0.0 % | 0.0 % | — | 0.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 0.0 % | 0.0 % | — | 0.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 29.9 % | 30.1 % | 1.09 | 3.04 | 3.15 | 46.4 % |
| Population | 15.8 % | 16.2 % | 0.92 | 1.96 | 2.01 | 6.1 % |
| Noblesse (Privilège) | 52.5 % | 53.4 % | 0.90 | 1.68 | 1.74 | 4.7 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 2.62 ? | 1.29 | 1.06 | 0.93 | 0.95 |
| Population | 1.95 | 0.96 | 1.11 | 0.71 | 0.96 |
| Privilèges | 1.60 | 1.09 | 0.89 | 0.88 | 0.99 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.52 | 1.40 |
| Cachot | 1.47 | 1.31 |
| Colporteur | 1.20 | 1.19 |
| Imprimeur | 1.15 | 0.84 |
| Épicerie | 1.14 | 1.22 |
| Salle du trésor | 1.03 | 1.13 |
| Tour de guet | 0.62 | 0.54 |
| Marché | 0.56 | 0.68 |
| Progrès | 0.44 | 0.38 |
| Ferrailleur | 0.30 | 0.40 |
| Archiviste royale | 0.30 | 0.15 |
| Bibliothécaire | 0.28 | 0.15 |
| Maison du commerce | 0.28 | 0.17 |
| Démolisseur | 0.27 | 0.16 |
| Sapeur | 0.27 | 0.14 |
| Aqueduc | 0.26 | 0.22 |
| Ferme | 0.26 | 0.19 |
| Grand argentier | 0.25 | 0.10 |
| Contremaître | 0.22 | 0.19 |
| Histoire | 0.21 | 0.21 |

## Effets Rouges par carte

Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). « Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Épicerie | 10741 | 2.19 | 0.0 % | 2.44 | 2.69 |
| Salle du trésor | 9862 | 2.19 | 0.0 % | 2.25 | 2.47 |
| Cachot | 12265 | 1.43 | 100.0 % | 1.93 | 1.96 |
| Progrès | 3620 | 2.13 | 0.0 % | 0.76 | 0.91 |
| Aqueduc | 2106 | 1.45 | 100.0 % | 0.32 | 0.35 |
| Forge | 1174 | 2.12 | 0.0 % | 0.28 | 0.27 |
| Carrière | 1181 | 2.06 | 0.0 % | 0.27 | 0.27 |
| Ferme | 1904 | 1.28 | 100.0 % | 0.26 | 0.27 |
| Histoire | 1876 | 1.29 | 0.0 % | 0.26 | 0.27 |
| Économie | 1592 | 1.54 | 100.0 % | 0.24 | 0.29 |
| Banque | 1351 | 1.28 | 100.0 % | 0.22 | 0.18 |
| Hôtel des impôts | 1067 | 1.98 | 0.0 % | 0.22 | 0.24 |
| Production | 811 | 2.06 | 0.0 % | 0.18 | 0.19 |
| Maison du commerce | 1864 | 1.06 | 100.0 % | 0.18 | 0.24 |
| Comptoir maritime | 1057 | 1.07 | 100.0 % | 0.12 | 0.13 |
| Diplomatie | 520 | 1.84 | 0.0 % | 0.11 | 0.10 |
| Hôpital | 510 | 1.51 | 0.0 % | 0.09 | 0.08 |
| Ambassade | 586 | 0.96 | 0.0 % | 0.06 | 0.06 |
| Mairie | 229 | 1.81 | 0.0 % | 0.05 | 0.04 |
| Justice | 69 | 0.75 | 0.0 % | 0.00 | 0.01 |
| Tour de guet | 5114 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Marché | 5745 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Religion | 1050 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Science | 1422 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Prison | 1456 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Cabinet d'architecte | 365 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Chancellerie | 178 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Tribunal | 39 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Mine | 835 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Loge des bâtisseurs | 899 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Cour du roi | 1456 | 0.00 | 0.0 % | 0.00 | 0.00 |
