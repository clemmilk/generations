# Analyse des parties entre IA — 2026-10-15

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 29.8 | 23.8 | 20.9 |
| Lignées du vainqueur | 7.4 | 6.4 | 6.3 |
| Victoires du 1er joueur | 56.3 % | 40.0 % | 32.5 % |
| Victoires du 2e joueur | 43.8 % | 28.7 % | 22.5 % |
| Victoires du 3e joueur | — | 31.3 % | 25.0 % |
| Victoires du 4e joueur | — | — | 20.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.48 | 3.39 |
| Cartes trashées | 9.43 | 7.57 |
| Cartes dans le deck à la fin | 5.05 | 6.83 |
| Cartes jouées par lignée | 2.44 | 2.54 |
| Tours par lignée | 3.75 | 3.84 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 1.57 | 0.61 |
| Effets Rouges choisis | 3.08 | 3.27 |
| Effets Rouges automatiques | 8.39 | 9.06 |
| Privilèges | 1.55 | 1.63 |
| Niveau d'Économie final | 2.98 | 2.78 |
| Niveau de Population final | 2.76 | 2.52 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 147 | 1.38 ? | 1.03 ? | 1.24 ? | 1.88 ? | 50.0 % |
| Diplomatie | 131 | 1.16 ? | 1.30 ? | 1.27 ? | 0.95 ? | 34.7 % |
| Progrès | 154 | 1.02 ? | 0.81 ? | 0.92 ? | 1.31 ? | 38.5 % |
| Production | 141 | 1.01 ? | 1.06 ? | 1.22 ? | 0.73 ? | 35.4 % |
| Science | 148 | 1.00 ? | 1.03 ? | 1.15 ? | 0.82 ? | 18.4 % |
| Justice | 127 | 1.00 ? | 1.00 ? | 0.73 ? | 1.24 ? | 71.4 % |
| Éducation | 137 | 0.99 ? | 1.16 ? | 0.70 ? | 1.08 ? | 20.0 % |
| Commerce | 149 | 0.92 ? | 1.03 ? | 1.10 ? | 0.63 ? | 50.0 % |
| Économie | 157 | 0.86 ? | 0.92 ? | 0.92 ? | 0.73 ? | 21.7 % |
| Religion | 149 | 0.70 ? | 0.76 ? | 0.74 ? | 0.58 ? | 17.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.48 carte(s) et un perdant 3.39.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Alchimiste royale | 6 | 15.4 | 1.79 ? | 26.7 % | 7.9 % |
| Maître fondeur | 4 | 14.6 | 1.27 ? | 17.1 % | 10.2 % |
| Prison | 2 | 13.6 | 0.81 ? | 5.0 % | 8.5 % |
| Mine | RR | 13.3 | 1.32 ? | 10.8 % | 7.1 % |
| Forge | R | 13.2 | 0.57 ? | 4.2 % | 10.0 % |
| Contremaître | 3 | 12.9 | 0.73 ? | 7.1 % | 10.2 % |
| Moulin | RR | 12.5 | 0.68 ? | 5.0 % | 8.5 % |
| Ambassade | RRR | 12.5 | 1.03 ? | 11.3 % | 11.0 % |
| Comptoir maritime | 5 | 12.1 | 0.82 ? | 4.6 % | 9.0 % |
| Assassin | 4 | 11.5 | 1.00 ? | 1.7 % | 3.1 % |
| Ferme | 3 | 11.5 | 0.96 ? | 5.8 % | 6.9 % |
| Démolisseur | 6 | 11.5 | 1.22 ? | 8.3 % | 4.8 % |
| Aqueduc | 5 | 10.8 | 0.91 ? | 6.3 % | 8.8 % |
| Halle des négociants | 2 | 10.4 | 0.89 ? | 1.7 % | 7.3 % |
| Apothicairerie | 2R | 10.4 | 1.00 ? | 2.1 % | 5.4 % |
| Banque | R | 10.1 | 0.95 ? | 3.8 % | 1.7 % |
| Carrière | R | 10.1 | 0.85 ? | 3.8 % | 7.7 % |
| Roi | 5 | 9.4 | 0.69 ? | 2.5 % | 3.1 % |
| Cabinet d'architecte | R | 9.3 | 1.04 ? | 4.6 % | 4.8 % |
| Chancellerie | 4 | 9.3 | 0.83 ? | 0.8 % | 2.3 % |
| Sapeur | RR | 9.3 | 0.94 ? | 6.7 % | 6.0 % |
| Remouleur ambulant | 2 | 9.2 | 1.19 ? | 5.4 % | 4.4 % |
| Hôtel des impôts | 4 | 9.2 | 0.96 ? | 4.6 % | 6.0 % |
| Mairie | RR | 8.9 | 0.93 ? | 3.8 % | 3.5 % |
| Hôpital | RR | 8.8 | 0.71 ? | 1.7 % | 4.2 % |
| Cardinal | 6 | 8.5 | 0.83 ? | 5.8 % | 5.6 % |
| Cour du roi | 3RR | 8.5 | 0.66 ? | 2.5 % | 5.4 % |
| Maison du commerce | 7 | 8.3 | 0.76 ? | 2.9 % | 6.9 % |
| Bibliothécaire | 2R | 8.1 | 0.89 ? | 3.8 % | 4.2 % |
| Loge des bâtisseurs | 5 | 7.5 | 0.53 ? | 0.4 % | 2.9 % |
| Archiviste royale | 7 | 7.5 | 1.07 ? | 5.4 % | 4.4 % |
| Tribunal | 4 | 7.4 | 0.83 ? | 1.3 % | 1.7 % |
| Grand argentier | 8 | 6.4 | 0.98 ? | 5.0 % | 3.5 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 9.43 cartes, un perdant 7.57.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 84.6 % | 4.1 | 23.3 % | 11.3 % | 15.4 % | 80.6 % |
| Cachot | 81.3 % | 4.4 | 15.8 % | 8.3 % | 18.8 % | 75.2 % |
| Colporteur | 86.7 % | 4.7 | 12.9 % | 12.9 % | 13.3 % | 70.8 % |
| Imprimeur | 76.7 % | 4.9 | 10.0 % | 10.0 % | 23.3 % | 69.8 % |
| Tour de guet | 53.8 % | 5.2 | 5.4 % | 9.6 % | 46.3 % | 29.0 % |
| Épicerie | 72.1 % | 5.6 | 7.5 % | 5.8 % | 27.9 % | 59.2 % |
| Ferrailleur | 75.8 % | 5.7 | 5.0 % | 7.1 % | 24.2 % | 52.9 % |
| Salle du trésor | 66.7 % | 5.8 | 5.0 % | 8.3 % | 33.3 % | 42.3 % |
| Forgeron | 52.9 % | 6.6 | 1.7 % | 5.0 % | 47.1 % | 36.0 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Religion 82.9 %, Science 81.6 %, Éducation 80.0 %, Économie 78.3 %, Diplomatie 65.3 %, Production 64.6 %, Progrès 61.5 %, Commerce 50.0 %, Histoire 50.0 %, Justice 28.6 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 20.0 % | 13.1 % | 1.26 ? | 64.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 15.4 % | 13.8 % | 1.03 ? | 69.9 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 13.8 % | 10.0 % | 1.19 ? | 61.7 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 12.9 % | 11.7 % | 1.05 ? | 66.7 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 11.3 % | 12.1 % | 0.95 ? | 71.8 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.8 % | 8.8 % | 1.14 ? | 58.8 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 9.2 % | 12.3 % | 0.80 ? | 55.6 % |
| 5 | 1 blason Population supplémentaire | 8.8 % | 12.9 % | 0.76 ? | 53.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 8.3 % | 6.0 % | 1.28 ? | 87.8 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 6.7 % | 8.3 % | 0.87 ? | 55.4 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 6.3 % | 9.0 % | 0.76 ? | 58.6 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 6.3 % | 5.0 % | 1.08 ? | 43.6 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 5.8 % | 8.1 % | 0.79 ? | 49.1 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 5.4 % | 10.6 % | 0.63 ? | 51.6 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 4.6 % | 4.8 % | 0.97 ? | 32.4 % |
| 6 | 1 blason Économie supplémentaire | 2.9 % | 2.7 % | 0.97 ? | 50.0 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 2.5 % | 2.7 % | 0.91 ? | 57.9 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 2.5 % | 4.4 % | 0.69 ? | 29.6 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.8 % | 3.1 % | 0.30 ? | 41.2 % |
| 7 | 1 blason Noblesse supplémentaire | 0.4 % | 3.5 % | 0.18 ? | 66.7 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 21.3 % | 17.1 % | 1.13 | 2.98 | 2.78 | 28.3 % |
| Population | 23.3 % | 32.3 % | 1.02 | 2.76 | 2.52 | 28.7 % |
| Noblesse (Privilège) | 55.4 % | 50.6 % | 0.85 | 1.55 | 1.63 | 2.9 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.60 ? | 0.88 | 1.08 | 1.06 |
| Population | 0.68 ? | 0.63 ? | 1.09 | 0.70 | 1.48 ? |
| Privilèges | 1.07 ? | 1.08 | 0.97 | 0.76 ? | 0.83 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.59 | 1.71 |
| Tour de guet | 1.49 | 1.53 |
| Salle du trésor | 1.18 | 1.29 |
| Ferrailleur | 1.04 | 1.14 |
| Alchimiste royale | 0.92 | 0.15 |
| Épicerie | 0.76 | 0.76 |
| Colporteur | 0.63 | 0.62 |
| Cachot | 0.55 | 0.39 |
| Histoire | 0.53 | 0.29 |
| Maître fondeur | 0.52 | 0.25 |
| Imprimeur | 0.50 | 0.60 |
| Marché | 0.47 | 0.52 |
| Mine | 0.40 | 0.13 |
| Commerce | 0.32 | 0.33 |
| Ambassade | 0.30 | 0.22 |
| Progrès | 0.30 | 0.31 |
| Justice | 0.28 | 0.32 |
| Production | 0.25 | 0.24 |
| Diplomatie | 0.23 | 0.19 |
| Contremaître | 0.22 | 0.26 |
