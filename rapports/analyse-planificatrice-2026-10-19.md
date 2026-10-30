# Analyse des parties entre IA — 2026-10-19

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 22.1 | 18.6 | 16.1 |
| Lignées du vainqueur | 3.9 | 3.5 | 3.0 |
| Victoires du 1er joueur | 61.3 % | 25.0 % | 23.8 % |
| Victoires du 2e joueur | 38.8 % | 41.3 % | 25.0 % |
| Victoires du 3e joueur | — | 33.8 % | 26.3 % |
| Victoires du 4e joueur | — | — | 25.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.97 | 3.89 |
| Cartes trashées | 4.92 | 4.61 |
| Cartes dans le deck à la fin | 10.05 | 10.28 |
| Cartes jouées par lignée | 4.00 | 3.13 |
| Tours par lignée | 5.68 | 4.74 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 7.80 | 4.48 |
| Effets Rouges choisis | 2.35 | 2.69 |
| Effets Rouges automatiques | 5.15 | 5.71 |
| Privilèges | 1.68 | 1.68 |
| Niveau d'Économie final | 2.72 | 3.01 |
| Niveau de Population final | 1.68 | 1.85 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 177 | 1.17 ? | 0.97 ? | 1.02 ? | 1.50 ? | 67.6 % |
| Production | 179 | 1.12 | 1.10 ? | 1.16 ? | 1.10 ? | 43.3 % |
| Économie | 192 | 1.04 | 0.94 ? | 0.90 ? | 1.30 ? | 57.4 % |
| Diplomatie | 176 | 0.99 ? | 1.13 ? | 1.05 ? | 0.80 ? | 41.4 % |
| Science | 178 | 0.95 ? | 1.03 ? | 0.89 ? | 0.95 ? | 46.4 % |
| Justice | 167 | 0.93 ? | 0.87 ? | 1.00 ? | 0.90 ? | 34.0 % |
| Progrès | 193 | 0.91 | 1.13 ? | 1.02 ? | 0.55 ? | 70.0 % |
| Religion | 178 | 0.89 ? | 0.80 ? | 0.98 ? | 0.90 ? | 35.8 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.97 carte(s) et un perdant 3.89.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Ferme | 4 | 16.3 | 1.18 ? | 18.8 % | 13.1 % |
| Bibliothécaire | 2R | 15.6 | 1.27 ? | 21.3 % | 12.7 % |
| Grand argentier | 7 | 15.6 | 1.16 ? | 19.2 % | 13.1 % |
| Aqueduc | 5 | 15.4 | 0.84 ? | 12.9 % | 15.2 % |
| Démolisseur | 6 | 15.0 | 1.51 ? | 22.1 % | 10.4 % |
| Sapeur | RR | 14.9 | 1.47 ? | 22.5 % | 10.4 % |
| Archiviste royale | 3R | 14.7 | 1.52 ? | 23.8 % | 9.8 % |
| Banque | R | 14.6 | 1.00 ? | 13.8 % | 12.9 % |
| Maison du commerce | 5 | 14.6 | 0.75 ? | 10.0 % | 14.2 % |
| Prison | 3 | 14.0 | 0.74 ? | 8.8 % | 12.5 % |
| Hôtel des impôts | 4 | 12.8 | 0.98 ? | 12.1 % | 11.7 % |
| Chambellan | 5R | 12.4 | 0.82 ? | 10.0 % | 12.1 % |
| Alchimiste royale | 6 | 12.2 | 0.61 ? | 7.9 % | 13.3 % |
| Apothicaire | 1R | 11.5 | 0.66 ? | 6.7 % | 10.2 % |
| Cour du roi | 4R | 11.5 | 1.21 ? | 13.8 % | 9.0 % |
| Loge des bâtisseurs | 4 | 11.4 | 0.85 ? | 9.2 % | 9.6 % |
| Roi | 4 | 11.0 | 1.05 ? | 10.8 % | 8.5 % |
| Meunière | RR | 10.7 | 0.84 ? | 7.1 % | 9.4 % |
| Contremaître | 3 | 10.6 | 0.78 ? | 6.3 % | 10.0 % |
| Mine | R | 10.6 | 1.22 ? | 8.3 % | 5.8 % |
| Forge | R | 10.4 | 0.60 ? | 5.4 % | 10.4 % |
| Remouleur ambulant | 2 | 10.3 | 0.88 ? | 8.8 % | 9.8 % |
| Maître fondeur | 5 | 10.1 | 0.82 ? | 7.5 % | 10.2 % |
| Comptoir maritime | 6 | 10.0 | 0.82 ? | 7.1 % | 9.4 % |
| Carrière | R | 9.9 | 0.89 ? | 7.5 % | 7.9 % |
| Chancellerie | 3 | 9.6 | 1.01 ? | 7.5 % | 6.3 % |
| Tribunal | 3 | 9.0 | 0.70 ? | 3.8 % | 6.5 % |
| Négociant | 4 | 8.9 | 0.47 ? | 3.8 % | 6.5 % |
| Cardinal | 5 | 8.9 | 0.67 ? | 5.4 % | 8.3 % |
| Assassin | 4 | 8.8 | 0.74 ? | 4.2 % | 7.3 % |
| Mairie | RR | 8.8 | 0.85 ? | 7.1 % | 8.8 % |
| Cabinet d'architecte | 2R | 8.5 | 0.83 ? | 5.8 % | 6.5 % |
| Hôpital | RR | 8.3 | 1.00 ? | 7.5 % | 7.7 % |
| Ambassade | RRR | 5.3 | 0.53 ? | 2.9 % | 6.3 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 4.92 cartes, un perdant 4.61.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Cachot | 17.9 % | 2.8 | 4.6 % | 5.8 % | 82.1 % | 22.1 % |
| Colporteur | 52.1 % | 3.0 | 12.5 % | 11.3 % | 47.9 % | 46.5 % |
| Ferrailleur | 59.2 % | 3.1 | 14.6 % | 13.3 % | 40.8 % | 52.1 % |
| Marché | 63.3 % | 3.1 | 16.7 % | 9.2 % | 36.7 % | 53.8 % |
| Salle du trésor | 40.0 % | 3.1 | 10.0 % | 7.9 % | 60.0 % | 32.9 % |
| Imprimeur | 11.7 % | 3.3 | 3.3 % | 2.9 % | 88.3 % | 12.9 % |
| Forgeron | 19.2 % | 3.3 | 2.1 % | 4.6 % | 80.8 % | 20.0 % |
| Tour de guet | 40.0 % | 3.6 | 6.7 % | 7.9 % | 60.0 % | 36.0 % |
| Épicerie | 41.7 % | 3.9 | 5.8 % | 8.3 % | 58.3 % | 36.0 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 66.0 %, Religion 64.2 %, Diplomatie 58.6 %, Production 56.7 %, Science 53.6 %, Économie 42.6 %, Histoire 32.4 %, Progrès 30.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 2 | Chaque carte avancée rapporte également 1 Érudit | 14.6 % | 8.5 % | 1.27 ? | 50.0 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 14.2 % | 13.8 % | 1.01 ? | 72.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 13.8 % | 13.8 % | 0.97 ? | 65.7 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 13.3 % | 13.8 % | 0.94 ? | 54.1 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 12.9 % | 13.3 % | 0.95 ? | 60.0 % |
| 5 | 1 blason Population supplémentaire | 11.7 % | 10.2 % | 1.03 ? | 55.8 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 8.3 % | 11.3 % | 0.80 ? | 51.4 % |
| 6 | 1 blason Économie supplémentaire | 8.3 % | 11.3 % | 0.76 ? | 50.0 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 8.3 % | 7.1 % | 1.14 ? | 42.6 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 8.3 % | 10.4 % | 0.86 ? | 48.6 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 7.9 % | 4.6 % | 1.30 ? | 65.9 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 7.5 % | 6.3 % | 1.04 ? | 58.3 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.5 % | 7.1 % | 1.03 ? | 46.2 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 6.3 % | 5.4 % | 1.04 ? | 70.7 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.0 % | 3.3 % | 1.27 ? | 53.6 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 4.6 % | 4.4 % | 0.99 ? | 62.5 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 4.6 % | 7.9 % | 0.68 ? | 57.1 % |
| 7 | 1 blason Noblesse supplémentaire | 3.8 % | 4.2 % | 0.88 ? | 69.0 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 3.8 % | 6.5 % | 0.68 ? | 45.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 3.8 % | 4.8 % | 0.83 ? | 68.8 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 24.2 % | 26.3 % | 1.07 | 2.72 | 3.01 | 31.3 % |
| Population | 17.5 % | 16.0 % | 0.83 | 1.68 | 1.85 | 0.4 % |
| Noblesse (Privilège) | 57.5 % | 57.3 % | 1.00 | 1.68 | 1.68 | 2.5 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 2.21 ? | 1.57 ? | 1.17 ? | 0.90 | 0.82 |
| Population | 1.91 ? | 0.94 | 1.04 | 0.72 ? | 0.25 ? |
| Privilèges | 1.19 ? | 1.12 | 0.86 | 1.06 ? | 1.03 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Cachot | 1.27 | 0.89 |
| Imprimeur | 1.15 | 0.82 |
| Forgeron | 1.06 | 0.99 |
| Colporteur | 0.77 | 0.74 |
| Épicerie | 0.72 | 0.82 |
| Salle du trésor | 0.72 | 0.75 |
| Tour de guet | 0.63 | 0.62 |
| Marché | 0.49 | 0.56 |
| Ferrailleur | 0.43 | 0.51 |
| Archiviste royale | 0.38 | 0.11 |
| Sapeur | 0.32 | 0.10 |
| Ferme | 0.31 | 0.15 |
| Démolisseur | 0.30 | 0.11 |
| Bibliothécaire | 0.30 | 0.13 |
| Grand argentier | 0.28 | 0.15 |
| Progrès | 0.26 | 0.29 |
| Aqueduc | 0.23 | 0.20 |
| Histoire | 0.20 | 0.18 |
| Cour du roi | 0.20 | 0.11 |
| Économie | 0.20 | 0.17 |
