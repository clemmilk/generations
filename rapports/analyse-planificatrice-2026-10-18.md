# Analyse des parties entre IA — 2026-10-18

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 23.3 | 19.4 | 16.7 |
| Lignées du vainqueur | 4.2 | 3.6 | 3.1 |
| Victoires du 1er joueur | 55.0 % | 38.8 % | 25.0 % |
| Victoires du 2e joueur | 45.0 % | 31.3 % | 25.0 % |
| Victoires du 3e joueur | — | 30.0 % | 35.0 % |
| Victoires du 4e joueur | — | — | 15.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.92 | 3.90 |
| Cartes trashées | 4.50 | 4.24 |
| Cartes dans le deck à la fin | 10.43 | 10.66 |
| Cartes jouées par lignée | 3.99 | 3.34 |
| Tours par lignée | 5.74 | 5.02 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 8.19 | 5.10 |
| Effets Rouges choisis | 2.86 | 3.31 |
| Effets Rouges automatiques | 5.27 | 5.71 |
| Privilèges | 2.03 | 2.11 |
| Niveau d'Économie final | 2.78 | 2.84 |
| Niveau de Population final | 1.77 | 1.75 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 177 | 1.17 ? | 0.86 ? | 1.16 ? | 1.45 ? | 66.2 % |
| Diplomatie | 176 | 1.11 ? | 1.03 ? | 1.11 ? | 1.20 ? | 60.0 % |
| Science | 178 | 1.02 ? | 0.97 ? | 1.03 ? | 1.05 ? | 45.0 % |
| Production | 179 | 0.98 | 1.05 ? | 1.05 ? | 0.85 ? | 52.5 % |
| Justice | 167 | 0.98 ? | 1.00 ? | 0.79 ? | 1.15 ? | 67.9 % |
| Religion | 178 | 0.94 ? | 1.00 ? | 1.09 ? | 0.75 ? | 66.1 % |
| Économie | 192 | 0.92 | 0.90 ? | 0.86 ? | 1.00 ? | 71.7 % |
| Progrès | 193 | 0.90 | 1.17 ? | 0.92 ? | 0.55 ? | 79.7 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.92 carte(s) et un perdant 3.90.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Ferme | 4 | 16.8 | 0.97 ? | 16.3 % | 14.6 % |
| Grand argentier | 7 | 16.3 | 1.30 ? | 22.5 % | 12.5 % |
| Aqueduc | 5 | 15.4 | 0.93 ? | 13.8 % | 15.0 % |
| Bibliothécaire | 2R | 15.3 | 1.24 ? | 20.4 % | 12.1 % |
| Banque | R | 14.9 | 0.81 ? | 12.1 % | 14.6 % |
| Démolisseur | 6 | 14.7 | 1.41 ? | 21.3 % | 11.0 % |
| Archiviste royale | 3R | 14.7 | 1.09 ? | 17.1 % | 13.1 % |
| Sapeur | RR | 14.6 | 1.31 ? | 20.0 % | 11.9 % |
| Maison du commerce | 5 | 14.3 | 1.14 ? | 15.8 % | 12.1 % |
| Apothicaire | 1R | 14.2 | 0.73 ? | 9.2 % | 13.3 % |
| Roi | 4 | 14.2 | 0.70 ? | 9.6 % | 14.4 % |
| Hôtel des impôts | 4 | 12.5 | 0.87 ? | 10.0 % | 11.5 % |
| Négociant | 4 | 12.4 | 0.98 ? | 10.0 % | 10.4 % |
| Prison | 3 | 12.1 | 1.01 ? | 9.6 % | 7.5 % |
| Cour du roi | 4R | 11.7 | 0.88 ? | 10.4 % | 11.3 % |
| Chambellan | 5R | 11.7 | 1.02 ? | 12.1 % | 10.2 % |
| Forge | R | 11.1 | 0.95 ? | 9.2 % | 9.4 % |
| Maître fondeur | 5 | 11.0 | 0.80 ? | 7.9 % | 9.8 % |
| Remouleur ambulant | 2 | 10.7 | 0.92 ? | 8.3 % | 8.8 % |
| Contremaître | 3 | 10.6 | 0.74 ? | 6.7 % | 10.6 % |
| Loge des bâtisseurs | 4 | 10.6 | 0.94 ? | 9.6 % | 8.1 % |
| Carrière | R | 10.3 | 0.83 ? | 7.5 % | 8.8 % |
| Meunière | RR | 10.3 | 0.91 ? | 9.2 % | 8.8 % |
| Chancellerie | 3 | 10.0 | 0.69 ? | 4.6 % | 8.5 % |
| Mine | R | 10.0 | 0.87 ? | 6.3 % | 6.5 % |
| Alchimiste royale | 6 | 9.7 | 1.04 ? | 9.2 % | 8.1 % |
| Comptoir maritime | 6 | 9.6 | 0.96 ? | 8.3 % | 8.5 % |
| Tribunal | 3 | 8.3 | 0.73 ? | 3.3 % | 5.0 % |
| Hôpital | RR | 8.2 | 0.70 ? | 5.4 % | 8.3 % |
| Cabinet d'architecte | 2R | 7.5 | 0.73 ? | 5.0 % | 6.7 % |
| Mairie | RR | 7.5 | 0.86 ? | 5.8 % | 7.1 % |
| Assassin | 4 | 7.2 | 0.76 ? | 2.9 % | 3.8 % |
| Cardinal | 5 | 6.5 | 0.79 ? | 4.2 % | 4.0 % |
| Ambassade | RRR | 6.3 | 0.71 ? | 4.6 % | 7.1 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 4.50 cartes, un perdant 4.24.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 64.6 % | 2.5 | 22.1 % | 16.7 % | 35.4 % | 54.2 % |
| Imprimeur | 11.3 % | 2.9 | 3.8 % | 2.9 % | 88.8 % | 10.4 % |
| Épicerie | 55.8 % | 2.9 | 12.5 % | 13.8 % | 44.2 % | 42.5 % |
| Ferrailleur | 50.0 % | 3.1 | 11.3 % | 10.0 % | 50.0 % | 48.8 % |
| Cachot | 14.2 % | 3.1 | 3.3 % | 3.3 % | 85.8 % | 18.5 % |
| Salle du trésor | 37.5 % | 3.1 | 9.6 % | 7.1 % | 62.5 % | 31.0 % |
| Tour de guet | 44.2 % | 3.2 | 10.8 % | 10.0 % | 55.8 % | 38.5 % |
| Colporteur | 42.1 % | 3.2 | 5.8 % | 10.0 % | 57.9 % | 39.2 % |
| Forgeron | 12.5 % | 3.7 | 3.3 % | 2.1 % | 87.5 % | 15.0 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Science 55.0 %, Production 47.5 %, Diplomatie 40.0 %, Religion 33.9 %, Histoire 33.8 %, Justice 32.1 %, Économie 28.3 %, Progrès 20.3 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.8 % | 12.7 % | 1.26 ? | 52.8 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 15.8 % | 11.3 % | 1.23 ? | 39.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 15.0 % | 14.8 % | 1.00 ? | 44.9 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 15.0 % | 13.1 % | 1.06 ? | 52.5 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 13.3 % | 14.8 % | 0.93 ? | 43.7 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 12.9 % | 15.0 % | 0.89 ? | 57.3 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 12.9 % | 16.3 % | 0.84 ? | 57.8 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 12.9 % | 12.3 % | 1.01 ? | 55.6 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 9.6 % | 7.5 % | 1.19 ? | 54.2 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 9.6 % | 13.3 % | 0.78 ? | 49.4 % |
| 5 | 1 blason Population supplémentaire | 8.8 % | 11.0 % | 0.83 ? | 31.1 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 8.8 % | 9.6 % | 0.91 ? | 50.7 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 7.9 % | 7.7 % | 0.94 ? | 50.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 7.9 % | 8.3 % | 0.96 ? | 47.5 % |
| 7 | 1 blason Noblesse supplémentaire | 7.5 % | 9.8 % | 0.83 ? | 35.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.1 % | 7.3 % | 0.95 ? | 48.1 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.8 % | 6.3 % | 0.97 ? | 27.3 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 5.0 % | 6.7 % | 0.85 ? | 29.5 % |
| 6 | 1 blason Économie supplémentaire | 4.2 % | 5.0 % | 0.79 ? | 32.4 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 4.2 % | 7.9 % | 0.63 ? | 54.2 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 25.8 % | 26.5 % | 1.06 | 2.78 | 2.84 | 34.6 % |
| Population | 12.9 % | 12.9 % | 0.85 | 1.77 | 1.75 | 2.1 % |
| Noblesse (Privilège) | 59.6 % | 60.6 % | 1.02 | 2.03 | 2.11 | 7.5 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 2.23 ? | 1.09 ? | 1.00 | 0.98 | 0.94 |
| Population | 1.39 ? | 0.80 | 1.12 | 0.75 ? | 0.78 ? |
| Privilèges | 2.13 ? | 1.09 ? | 0.95 | 0.93 ? | 0.94 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Cachot | 1.32 | 1.03 |
| Forgeron | 1.30 | 1.22 |
| Imprimeur | 1.19 | 0.83 |
| Colporteur | 0.82 | 0.84 |
| Salle du trésor | 0.75 | 0.88 |
| Épicerie | 0.58 | 0.65 |
| Ferrailleur | 0.52 | 0.50 |
| Tour de guet | 0.49 | 0.57 |
| Marché | 0.49 | 0.54 |
| Bibliothécaire | 0.35 | 0.15 |
| Grand argentier | 0.34 | 0.14 |
| Démolisseur | 0.32 | 0.15 |
| Progrès | 0.31 | 0.32 |
| Maison du commerce | 0.30 | 0.16 |
| Sapeur | 0.28 | 0.12 |
| Ferme | 0.27 | 0.16 |
| Histoire | 0.24 | 0.19 |
| Archiviste royale | 0.24 | 0.13 |
| Économie | 0.23 | 0.23 |
| Aqueduc | 0.20 | 0.18 |
