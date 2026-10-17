# Analyse des parties entre IA — 2026-10-17

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 29.4 | 25.4 | 22.0 |
| Lignées du vainqueur | 7.1 | 6.5 | 6.1 |
| Victoires du 1er joueur | 48.8 % | 35.0 % | 22.5 % |
| Victoires du 2e joueur | 51.2 % | 38.8 % | 28.7 % |
| Victoires du 3e joueur | — | 26.3 % | 26.3 % |
| Victoires du 4e joueur | — | — | 22.5 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 5.63 | 5.69 |
| Cartes trashées | 11.20 | 9.38 |
| Cartes dans le deck à la fin | 5.43 | 7.30 |
| Cartes jouées par lignée | 2.33 | 2.46 |
| Tours par lignée | 3.92 | 4.13 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 1.82 | 0.68 |
| Effets Rouges choisis | 2.60 | 3.00 |
| Effets Rouges automatiques | 7.95 | 8.35 |
| Privilèges | 1.81 | 1.76 |
| Niveau d'Économie final | 3.80 | 3.58 |
| Niveau de Population final | 3.10 | 2.64 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Religion | 178 | 1.18 ? | 1.10 ? | 0.98 ? | 1.45 ? | 7.1 % |
| Justice | 167 | 1.11 ? | 1.13 ? | 0.84 ? | 1.35 ? | 20.0 % |
| Histoire | 177 | 1.05 ? | 1.20 ? | 1.21 ? | 0.75 ? | 39.3 % |
| Économie | 192 | 1.04 | 1.18 ? | 1.00 ? | 0.90 ? | 10.3 % |
| Progrès | 193 | 1.01 | 1.13 ? | 1.15 ? | 0.70 ? | 28.8 % |
| Diplomatie | 176 | 0.92 ? | 0.72 ? | 1.05 ? | 1.00 ? | 16.7 % |
| Production | 179 | 0.88 | 0.86 ? | 0.95 ? | 0.85 ? | 15.1 % |
| Science | 178 | 0.82 ? | 0.65 ? | 0.79 ? | 1.00 ? | 35.4 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 5.63 carte(s) et un perdant 5.69.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Mine | R | 22.5 | 1.38 ? | 27.5 % | 15.8 % |
| Maison du commerce | 5 | 21.8 | 1.04 ? | 17.1 % | 16.0 % |
| Prison | 3 | 21.3 | 0.96 ? | 11.7 % | 15.8 % |
| Alchimiste royale | 6 | 21.3 | 1.12 ? | 20.8 % | 16.5 % |
| Aqueduc | 5 | 19.9 | 0.81 ? | 10.8 % | 16.7 % |
| Maître fondeur | 5 | 19.4 | 0.88 ? | 15.4 % | 15.6 % |
| Comptoir maritime | 6 | 19.0 | 0.78 ? | 10.0 % | 15.4 % |
| Cardinal | 5 | 19.0 | 0.77 ? | 11.3 % | 16.5 % |
| Ferme | 4 | 18.5 | 0.94 ? | 7.5 % | 11.5 % |
| Moulin | RR | 18.3 | 0.73 ? | 7.5 % | 16.7 % |
| Chambellan | 5R | 18.2 | 1.08 ? | 17.5 % | 14.6 % |
| Contremaître | 3 | 18.1 | 0.85 ? | 8.8 % | 15.4 % |
| Forge | R | 17.8 | 0.78 ? | 8.8 % | 13.8 % |
| Halle des négociants | 2 | 17.6 | 0.80 ? | 3.8 % | 10.8 % |
| Ambassade | RRR | 16.9 | 0.95 ? | 13.3 % | 15.6 % |
| Assassin | 4 | 16.8 | 1.16 ? | 2.5 % | 4.6 % |
| Remouleur ambulant | 2 | 16.4 | 1.02 ? | 6.3 % | 6.5 % |
| Grand argentier | 7 | 16.1 | 1.17 ? | 12.9 % | 5.6 % |
| Hôtel des impôts | 4 | 15.6 | 0.91 ? | 6.3 % | 7.3 % |
| Bibliothécaire | 2R | 15.4 | 1.00 ? | 10.0 % | 8.1 % |
| Tribunal | 3 | 15.1 | 0.79 ? | 1.7 % | 3.5 % |
| Apothicairerie | 1R | 15.1 | 0.83 ? | 1.7 % | 8.1 % |
| Carrière | R | 14.9 | 0.54 ? | 5.0 % | 9.4 % |
| Banque | R | 14.7 | 0.94 ? | 4.2 % | 2.5 % |
| Cabinet d'architecte | 2R | 14.7 | 0.97 ? | 8.8 % | 10.0 % |
| Roi | 4 | 14.6 | 1.09 ? | 2.1 % | 3.8 % |
| Sapeur | RR | 14.3 | 0.90 ? | 6.3 % | 10.2 % |
| Loge des bâtisseurs | 4 | 13.8 | 1.07 ? | 4.2 % | 5.0 % |
| Démolisseur | 6 | 13.8 | 1.18 ? | 5.8 % | 3.5 % |
| Cour du roi | 4R | 13.6 | 0.97 ? | 4.6 % | 7.3 % |
| Archiviste royale | 3R | 13.5 | 0.85 ? | 4.6 % | 4.0 % |
| Chancellerie | 3 | 13.3 | 1.01 ? | 2.5 % | 3.3 % |
| Hôpital | RR | 13.3 | 0.85 ? | 6.7 % | 6.5 % |
| Mairie | RR | 12.4 | 1.00 ? | 4.6 % | 6.3 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 11.20 cartes, un perdant 9.38.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Cachot | 88.8 % | 4.2 | 21.3 % | 13.3 % | 11.3 % | 87.5 % |
| Forgeron | 87.5 % | 4.7 | 17.9 % | 7.9 % | 12.5 % | 86.0 % |
| Imprimeur | 91.7 % | 4.9 | 14.6 % | 15.4 % | 8.3 % | 77.1 % |
| Colporteur | 77.1 % | 5.7 | 6.3 % | 5.4 % | 22.9 % | 62.1 % |
| Ferrailleur | 78.8 % | 5.8 | 7.5 % | 10.4 % | 21.3 % | 70.2 % |
| Salle du trésor | 79.6 % | 5.9 | 5.8 % | 12.1 % | 20.4 % | 65.6 % |
| Marché | 73.8 % | 7.0 | 3.8 % | 6.7 % | 26.3 % | 54.6 % |
| Épicerie | 65.0 % | 7.4 | 2.5 % | 5.0 % | 35.0 % | 45.2 % |
| Tour de guet | 48.8 % | 7.5 | 2.9 % | 3.8 % | 51.2 % | 27.9 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Religion 92.9 %, Économie 89.7 %, Production 84.9 %, Diplomatie 83.3 %, Justice 80.0 %, Progrès 71.2 %, Science 64.6 %, Histoire 60.7 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.3 % | 13.5 % | 1.17 ? | 63.3 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 16.3 % | 14.8 % | 1.02 ? | 62.7 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 15.8 % | 11.5 % | 1.22 ? | 60.2 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 15.8 % | 11.5 % | 1.22 ? | 58.1 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 14.2 % | 12.9 % | 1.06 ? | 69.8 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 11.3 % | 10.2 % | 1.03 ? | 50.0 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 10.8 % | 10.4 % | 0.98 ? | 51.3 % |
| 5 | 1 blason Population supplémentaire | 9.6 % | 12.9 % | 0.79 ? | 56.5 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 9.6 % | 12.9 % | 0.78 ? | 47.1 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 8.8 % | 10.4 % | 0.90 ? | 56.3 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 8.3 % | 6.9 % | 1.17 ? | 54.7 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.3 % | 10.4 % | 0.82 ? | 42.9 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 6.7 % | 5.6 % | 1.15 ? | 55.8 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 6.3 % | 6.9 % | 0.90 ? | 39.6 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 5.4 % | 2.9 % | 1.50 ? | 51.9 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 4.6 % | 4.4 % | 1.03 ? | 53.1 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 4.6 % | 7.5 % | 0.73 ? | 29.8 % |
| 7 | 1 blason Noblesse supplémentaire | 2.9 % | 3.8 % | 0.95 ? | 36.0 % |
| 6 | 1 blason Économie supplémentaire | 2.1 % | 2.5 % | 0.90 ? | 58.8 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 1.7 % | 3.8 % | 0.52 ? | 63.6 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 27.1 % | 20.0 % | 1.10 | 3.80 | 3.58 | 85.8 % |
| Population | 23.3 % | 26.3 % | 0.98 | 3.10 | 2.64 | 43.8 % |
| Noblesse (Privilège) | 49.6 % | 53.8 % | 0.92 | 1.81 | 1.76 | 1.7 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.00 ? | 0.87 ? | 0.50 ? | 1.13 |
| Population | — | 0.63 ? | 0.75 | 0.90 | 1.44 |
| Privilèges | 1.03 ? | 1.01 | 0.93 | 1.19 ? | 0.70 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Épicerie | 1.17 | 1.40 |
| Marché | 1.09 | 1.15 |
| Colporteur | 0.99 | 1.01 |
| Tour de guet | 0.95 | 0.88 |
| Mine | 0.78 | 0.26 |
| Salle du trésor | 0.68 | 0.71 |
| Ferrailleur | 0.66 | 0.73 |
| Alchimiste royale | 0.64 | 0.29 |
| Chambellan | 0.46 | 0.24 |
| Maison du commerce | 0.45 | 0.32 |
| Histoire | 0.44 | 0.37 |
| Imprimeur | 0.39 | 0.46 |
| Prison | 0.36 | 0.25 |
| Forgeron | 0.36 | 0.35 |
| Aqueduc | 0.30 | 0.33 |
| Maître fondeur | 0.29 | 0.24 |
| Cardinal | 0.29 | 0.30 |
| Progrès | 0.28 | 0.27 |
| Comptoir maritime | 0.28 | 0.29 |
| Contremaître | 0.27 | 0.32 |
