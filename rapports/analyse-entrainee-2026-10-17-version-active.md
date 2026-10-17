# Analyse des parties entre IA — 2026-10-17

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 24.5 | 19.9 | 17.2 |
| Lignées du vainqueur | 7.4 | 6.7 | 6.3 |
| Victoires du 1er joueur | 52.2 % | 31.3 % | 22.6 % |
| Victoires du 2e joueur | 47.8 % | 32.8 % | 25.0 % |
| Victoires du 3e joueur | — | 35.9 % | 27.9 % |
| Victoires du 4e joueur | — | — | 24.6 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.44 | 1.40 |
| Cartes trashées | 8.02 | 6.38 |
| Cartes dans le deck à la fin | 4.43 | 6.02 |
| Cartes jouées par lignée | 2.00 | 2.19 |
| Tours par lignée | 2.99 | 3.17 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.72 | 0.40 |
| Effets Rouges choisis | 3.89 | 3.82 |
| Effets Rouges automatiques | 6.45 | 7.05 |
| Privilèges | 0.86 | 0.90 |
| Niveau d'Économie final | 3.91 | 3.65 |
| Niveau de Population final | 2.96 | 2.61 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 4487 | 1.28 | 1.15 | 1.27 | 1.41 | 64.0 % |
| Progrès | 4532 | 1.03 | 1.00 | 1.01 | 1.07 | 46.1 % |
| Science | 4535 | 0.98 | 1.06 | 0.93 | 0.96 | 43.3 % |
| Production | 4485 | 0.95 | 0.96 | 1.00 | 0.91 | 6.8 % |
| Justice | 4528 | 0.95 | 0.95 | 1.00 | 0.90 | 5.4 % |
| Économie | 4527 | 0.94 | 0.93 | 0.99 | 0.91 | 13.9 % |
| Religion | 4414 | 0.93 | 0.96 | 0.89 | 0.96 | 10.4 % |
| Diplomatie | 4492 | 0.93 | 0.99 | 0.91 | 0.89 | 7.5 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 1.44 carte(s) et un perdant 1.40.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Aqueduc | 5 | 8.2 | 0.99 | 8.3 % | 7.8 % |
| Prison | 3 | 8.0 | 0.87 | 5.6 % | 7.1 % |
| Mine | R | 7.8 | 1.06 | 8.1 % | 6.9 % |
| Maître fondeur | 4 | 7.8 | 1.09 | 8.2 % | 7.0 % |
| Alchimiste royale | 6 | 7.8 | 2.14 | 17.2 % | 2.6 % |
| Forge | R | 7.7 | 0.91 | 5.6 % | 6.7 % |
| Comptoir maritime | 6 | 7.6 | 0.80 | 5.9 % | 8.0 % |
| Chambellan | 5R | 7.6 | 0.93 | 7.2 % | 7.4 % |
| Contremaître | 3 | 7.6 | 0.96 | 7.1 % | 7.3 % |
| Maison du commerce | 5 | 7.5 | 1.14 | 8.5 % | 6.5 % |
| Remouleur ambulant | 2 | 7.2 | 0.80 | 3.0 % | 5.5 % |
| Ferme | 4 | 7.1 | 0.67 | 3.5 % | 7.0 % |
| Cardinal | 5 | 7.1 | 0.79 | 4.2 % | 6.5 % |
| Moulin | RR | 6.8 | 0.84 | 4.9 % | 6.5 % |
| Ambassade | RRR | 6.6 | 0.88 | 6.1 % | 6.6 % |
| Halle des négociants | 2 | 6.2 | 0.78 | 2.7 % | 4.9 % |
| Carrière | R | 5.9 | 0.79 | 3.2 % | 5.3 % |
| Cabinet d'architecte | 2R | 5.5 | 0.80 | 3.5 % | 5.3 % |
| Sapeur | RR | 2.1 | 0.79 | 1.5 % | 2.1 % |
| Hôtel des impôts | 4 | 1.7 | 0.75 | 0.8 % | 1.3 % |
| Loge des bâtisseurs | 4 | 1.6 | 0.66 | 0.7 % | 1.3 % |
| Roi | 4 | 1.0 | 0.54 | 0.3 % | 0.9 % |
| Cour du roi | 4R | 1.0 | 0.62 | 0.4 % | 1.0 % |
| Chancellerie | 3 | 0.8 | 0.80 ? | 0.3 % | 0.6 % |
| Apothicairerie | 1R | 0.7 | 0.37 ? | 0.2 % | 0.8 % |
| Tribunal | 3 | 0.6 | 0.48 ? | 0.2 % | 0.7 % |
| Banque | R | 0.5 | 0.65 ? | 0.2 % | 0.4 % |
| Assassin | 4 | 0.4 | 1.33 ? | 0.1 % | 0.2 % |
| Démolisseur | 6 | 0.3 | 0.88 ? | 0.1 % | 0.2 % |
| Bibliothécaire | 2R | 0.2 | 1.04 ? | 0.1 % | 0.2 % |
| Grand argentier | 7 | 0.1 | 1.01 ? | 0.1 % | 0.1 % |
| Mairie | RR | 0.1 | 0.72 ? | 0.1 % | 0.1 % |
| Archiviste royale | 3R | 0.0 | 1.09 ? | 0.0 % | 0.0 % |

Jamais achetées : Hôpital.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 8.02 cartes, un perdant 6.38.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Imprimeur | 92.0 % | 3.3 | 24.8 % | 15.1 % | 8.0 % | 87.4 % |
| Marché | 90.3 % | 3.7 | 17.1 % | 14.5 % | 9.8 % | 81.2 % |
| Cachot | 87.5 % | 3.9 | 13.0 % | 13.9 % | 12.4 % | 77.2 % |
| Épicerie | 83.1 % | 4.5 | 8.9 % | 10.8 % | 16.9 % | 67.9 % |
| Colporteur | 79.0 % | 4.9 | 4.7 % | 10.5 % | 21.0 % | 59.8 % |
| Ferrailleur | 71.7 % | 5.4 | 2.4 % | 7.2 % | 28.3 % | 50.2 % |
| Salle du trésor | 61.3 % | 5.7 | 1.6 % | 5.5 % | 38.8 % | 39.6 % |
| Forgeron | 41.0 % | 6.4 | 0.3 % | 3.2 % | 59.0 % | 23.5 % |
| Tour de guet | 22.4 % | 6.9 | 0.0 % | 0.0 % | 77.6 % | 8.8 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 94.6 %, Production 93.2 %, Diplomatie 92.5 %, Religion 89.6 %, Économie 86.1 %, Science 56.7 %, Progrès 53.9 %, Histoire 36.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 13.4 % | 7.4 % | 1.35 | 90.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.1 % | 9.1 % | 1.02 | 90.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 9.2 % | 8.9 % | 0.98 | 91.2 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.2 % | 6.4 % | 1.13 | 81.7 % |
| 5 | 1 blason Population supplémentaire | 6.9 % | 9.0 % | 0.80 | 88.3 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 6.2 % | 8.2 % | 0.80 | 85.4 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 5.5 % | 10.2 % | 0.61 | 87.9 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.3 % | 6.9 % | 0.82 | 81.6 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.9 % | 4.6 % | 1.03 | 73.5 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 4.8 % | 6.0 % | 0.83 | 77.2 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 3.3 % | 3.8 % | 0.89 | 73.7 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 2.7 % | 2.3 % | 1.12 | 61.7 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 2.6 % | 3.7 % | 0.78 | 66.8 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 1.5 % | 1.7 % | 0.93 | 65.3 % |
| 7 | 1 blason Noblesse supplémentaire | 0.9 % | 1.1 % | 0.89 | 61.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 0.4 % | 0.4 % | 0.97 ? | 68.1 % |
| 6 | 1 blason Économie supplémentaire | 0.1 % | 0.1 % | 1.38 ? | 58.3 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 21.4 % | 16.3 % | 1.24 | 3.91 | 3.65 | 92.2 % |
| Population | 52.9 % | 56.9 % | 1.26 | 2.96 | 2.61 | 34.9 % |
| Noblesse (Privilège) | 25.6 % | 26.8 % | 0.49 | 0.86 | 0.90 | 0.2 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.00 ? | 0.16 ? | 0.36 | 0.46 | 1.13 |
| Population | 0.00 ? | 0.58 | 0.98 | 0.90 | 1.29 |
| Privilèges | 1.15 | 0.97 | 0.86 | 1.05 | 0.86 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.45 | 2.20 |
| Forgeron | 2.07 | 1.86 |
| Salle du trésor | 1.28 | 1.42 |
| Ferrailleur | 0.92 | 1.10 |
| Colporteur | 0.71 | 0.73 |
| Histoire | 0.69 | 0.42 |
| Alchimiste royale | 0.53 | 0.05 |
| Marché | 0.40 | 0.52 |
| Progrès | 0.39 | 0.41 |
| Science | 0.37 | 0.40 |
| Épicerie | 0.36 | 0.45 |
| Cachot | 0.34 | 0.44 |
| Maison du commerce | 0.29 | 0.17 |
| Aqueduc | 0.27 | 0.19 |
| Maître fondeur | 0.27 | 0.19 |
| Contremaître | 0.24 | 0.19 |
| Mine | 0.23 | 0.15 |
| Chambellan | 0.23 | 0.18 |
| Comptoir maritime | 0.19 | 0.22 |
| Prison | 0.19 | 0.18 |
