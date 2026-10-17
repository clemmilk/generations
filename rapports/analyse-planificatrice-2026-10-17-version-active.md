# Analyse des parties entre IA — 2026-10-17

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 26.9 | 21.0 | 18.7 |
| Lignées du vainqueur | 6.7 | 5.8 | 5.7 |
| Victoires du 1er joueur | 48.8 % | 25.0 % | 20.0 % |
| Victoires du 2e joueur | 51.2 % | 42.5 % | 18.8 % |
| Victoires du 3e joueur | — | 32.5 % | 32.5 % |
| Victoires du 4e joueur | — | — | 28.7 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 4.30 | 4.21 |
| Cartes trashées | 9.86 | 8.26 |
| Cartes dans le deck à la fin | 5.45 | 6.95 |
| Cartes jouées par lignée | 2.25 | 2.36 |
| Tours par lignée | 3.71 | 3.84 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 2.01 | 0.78 |
| Effets Rouges choisis | 2.70 | 2.97 |
| Effets Rouges automatiques | 5.86 | 6.28 |
| Privilèges | 1.17 | 1.30 |
| Niveau d'Économie final | 3.78 | 3.46 |
| Niveau de Population final | 2.73 | 2.39 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Progrès | 193 | 1.17 | 1.25 ? | 0.97 ? | 1.30 ? | 42.9 % |
| Justice | 167 | 1.07 ? | 1.20 ? | 0.89 ? | 1.15 ? | 8.6 % |
| Diplomatie | 176 | 1.06 ? | 0.92 ? | 1.37 ? | 0.90 ? | 11.3 % |
| Histoire | 177 | 1.03 ? | 0.74 ? | 1.16 ? | 1.15 ? | 50.0 % |
| Science | 178 | 0.93 ? | 0.92 ? | 0.93 ? | 0.95 ? | 41.8 % |
| Religion | 178 | 0.93 ? | 1.30 ? | 0.67 ? | 0.80 ? | 14.5 % |
| Production | 179 | 0.92 | 0.90 ? | 1.05 ? | 0.80 ? | 16.4 % |
| Économie | 192 | 0.89 | 0.78 ? | 0.95 ? | 0.95 ? | 19.0 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 4.30 carte(s) et un perdant 4.21.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Alchimiste royale | 6 | 18.3 | 1.72 ? | 32.1 % | 10.2 % |
| Prison | 3 | 16.9 | 1.02 ? | 11.7 % | 12.1 % |
| Mine | R | 16.3 | 1.02 ? | 13.3 % | 13.1 % |
| Aqueduc | 5 | 16.0 | 1.13 ? | 15.8 % | 12.9 % |
| Maison du commerce | 5 | 15.8 | 1.11 ? | 12.9 % | 11.9 % |
| Ferme | 4 | 15.7 | 0.94 ? | 9.6 % | 11.3 % |
| Maître fondeur | 4 | 14.7 | 0.98 ? | 12.1 % | 12.1 % |
| Forge | R | 14.6 | 0.71 ? | 5.8 % | 12.1 % |
| Chambellan | 5R | 14.3 | 0.96 ? | 12.9 % | 13.1 % |
| Comptoir maritime | 6 | 14.0 | 0.92 ? | 9.2 % | 11.7 % |
| Moulin | RR | 13.9 | 0.95 ? | 5.0 % | 10.8 % |
| Contremaître | 3 | 13.8 | 0.67 ? | 7.1 % | 13.3 % |
| Grand argentier | 7 | 13.5 | 1.30 ? | 16.3 % | 8.1 % |
| Remouleur ambulant | 2 | 12.9 | 0.89 ? | 5.8 % | 9.0 % |
| Ambassade | RRR | 12.6 | 0.92 ? | 10.4 % | 11.0 % |
| Carrière | R | 12.4 | 0.68 ? | 5.4 % | 9.0 % |
| Banque | R | 11.9 | 0.81 ? | 5.0 % | 4.2 % |
| Halle des négociants | 2 | 11.9 | 0.63 ? | 4.2 % | 7.7 % |
| Bibliothécaire | 2R | 11.8 | 0.91 ? | 4.2 % | 5.0 % |
| Tribunal | 3 | 11.5 | 0.73 ? | 2.5 % | 3.1 % |
| Cardinal | 5 | 11.4 | 0.75 ? | 3.8 % | 8.5 % |
| Cabinet d'architecte | 2R | 11.3 | 0.87 ? | 6.7 % | 7.9 % |
| Assassin | 4 | 11.1 | 1.07 ? | 1.7 % | 3.5 % |
| Démolisseur | 6 | 11.0 | 0.85 ? | 6.7 % | 7.1 % |
| Apothicairerie | 1R | 10.8 | 1.03 ? | 3.8 % | 4.2 % |
| Loge des bâtisseurs | 4 | 10.3 | 0.99 ? | 2.5 % | 4.8 % |
| Archiviste royale | 3R | 10.3 | 0.93 ? | 4.2 % | 5.2 % |
| Cour du roi | 4R | 10.3 | 0.91 ? | 5.8 % | 8.1 % |
| Hôtel des impôts | 4 | 9.9 | 0.74 ? | 0.4 % | 4.8 % |
| Roi | 4 | 9.9 | 0.61 ? | 2.5 % | 3.5 % |
| Chancellerie | 3 | 9.7 | 0.81 ? | 1.7 % | 2.7 % |
| Sapeur | RR | 9.4 | 0.97 ? | 5.8 % | 6.0 % |
| Mairie | RR | 8.2 | 0.74 ? | 3.3 % | 4.2 % |
| Hôpital | RR | 7.5 | 0.99 ? | 1.7 % | 2.1 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 9.86 cartes, un perdant 8.26.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Imprimeur | 87.9 % | 4.2 | 16.3 % | 14.2 % | 12.1 % | 83.5 % |
| Cachot | 77.5 % | 4.3 | 13.3 % | 13.3 % | 22.5 % | 79.6 % |
| Marché | 86.7 % | 4.3 | 17.1 % | 13.3 % | 13.3 % | 76.7 % |
| Épicerie | 80.4 % | 5.0 | 7.9 % | 11.7 % | 19.6 % | 62.9 % |
| Colporteur | 77.5 % | 5.3 | 5.0 % | 10.4 % | 22.5 % | 67.7 % |
| Salle du trésor | 73.3 % | 5.5 | 5.4 % | 3.8 % | 26.7 % | 51.9 % |
| Ferrailleur | 73.3 % | 6.3 | 2.1 % | 6.7 % | 26.7 % | 60.8 % |
| Forgeron | 57.9 % | 6.7 | 2.9 % | 5.0 % | 42.1 % | 35.4 % |
| Tour de guet | 45.0 % | 7.0 | 3.3 % | 2.1 % | 55.0 % | 26.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 91.4 %, Diplomatie 88.7 %, Religion 85.5 %, Production 83.6 %, Économie 81.0 %, Science 58.2 %, Progrès 57.1 %, Histoire 50.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.4 % | 10.4 % | 1.21 ? | 70.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 12.1 % | 11.5 % | 1.00 ? | 79.8 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.8 % | 12.1 % | 0.90 ? | 79.8 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 10.4 % | 8.5 % | 1.14 ? | 72.7 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.3 % | 11.0 % | 0.82 ? | 79.5 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.5 % | 6.7 % | 1.08 ? | 62.0 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 7.1 % | 5.4 % | 1.13 ? | 67.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 7.1 % | 6.0 % | 1.06 ? | 71.7 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 5.4 % | 10.8 % | 0.61 ? | 69.2 % |
| 5 | 1 blason Population supplémentaire | 4.6 % | 9.2 % | 0.61 ? | 65.5 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.6 % | 6.3 % | 0.76 ? | 73.2 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 4.2 % | 7.7 % | 0.67 ? | 51.1 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 3.3 % | 3.3 % | 0.91 ? | 70.8 % |
| 7 | 1 blason Noblesse supplémentaire | 2.9 % | 2.3 % | 1.14 ? | 61.1 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 2.9 % | 2.3 % | 1.02 ? | 77.8 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 2.9 % | 4.6 % | 0.77 ? | 69.0 % |
| 6 | 1 blason Économie supplémentaire | 2.5 % | 2.1 % | 0.94 ? | 43.8 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 2.1 % | 4.6 % | 0.58 ? | 66.7 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 2.1 % | 3.3 % | 0.66 ? | 66.7 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.8 % | 1.9 % | 0.53 ? | 45.5 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 31.7 % | 25.4 % | 1.32 | 3.78 | 3.46 | 83.8 % |
| Population | 33.3 % | 32.1 % | 1.03 | 2.73 | 2.39 | 25.4 % |
| Noblesse (Privilège) | 35.0 % | 42.5 % | 0.65 | 1.17 | 1.30 | 0.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.71 ? | 0.60 ? | 0.51 ? | 1.20 |
| Population | 0.00 ? | 0.75 ? | 0.92 | 0.96 | 1.39 ? |
| Privilèges | 1.35 ? | 1.03 | 0.85 | 0.86 ? | 0.35 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 1.46 | 1.45 |
| Forgeron | 1.24 | 1.40 |
| Salle du trésor | 0.87 | 0.95 |
| Alchimiste royale | 0.82 | 0.14 |
| Ferrailleur | 0.75 | 0.81 |
| Colporteur | 0.68 | 0.70 |
| Épicerie | 0.47 | 0.52 |
| Cachot | 0.47 | 0.44 |
| Marché | 0.45 | 0.48 |
| Histoire | 0.41 | 0.36 |
| Progrès | 0.36 | 0.27 |
| Aqueduc | 0.36 | 0.21 |
| Maison du commerce | 0.35 | 0.22 |
| Chambellan | 0.33 | 0.19 |
| Mine | 0.31 | 0.19 |
| Prison | 0.30 | 0.20 |
| Maître fondeur | 0.28 | 0.23 |
| Science | 0.24 | 0.24 |
| Grand argentier | 0.23 | 0.10 |
| Ambassade | 0.21 | 0.14 |
