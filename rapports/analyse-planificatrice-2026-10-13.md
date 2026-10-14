# Analyse des parties entre IA — 2026-10-13

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 120 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 120.

1080 joueurs observés, dont 360 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 120 / 120 | 120 / 120 | 120 / 120 |
| Tours de table du vainqueur | 18.8 | 15.2 | 13.2 |
| Lignées du vainqueur | 6.0 | 5.3 | 5.0 |
| Victoires du 1er joueur | 52.5 % | 27.5 % | 18.3 % |
| Victoires du 2e joueur | 47.5 % | 33.3 % | 26.7 % |
| Victoires du 3e joueur | — | 39.2 % | 28.3 % |
| Victoires du 4e joueur | — | — | 26.7 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.54 | 1.59 |
| Cartes trashées | 7.02 | 5.73 |
| Cartes dans le deck à la fin | 5.53 | 6.86 |
| Cartes jouées par lignée | 2.45 | 2.41 |
| Tours par lignée | 3.55 | 3.54 |
| Tours gagnés par Rejouer | 3.19 | 2.18 |
| Pioches supplémentaires | 2.39 | 1.16 |
| Effets Rouges choisis | 2.94 | 2.84 |
| Effets Rouges automatiques | 6.63 | 7.83 |
| Privilèges | 1.52 | 1.47 |
| Niveau d'Économie final | 3.22 | 3.05 |
| Niveau de Population final | 2.56 | 2.19 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 223 | 1.31 | 1.41 ? | 1.03 ? | 1.45 ? | 91.8 % |
| Justice | 206 | 1.22 | 1.28 ? | 0.94 ? | 1.44 ? | 42.9 % |
| Production | 214 | 1.20 | 1.25 ? | 1.36 ? | 0.99 ? | 47.7 % |
| Progrès | 214 | 1.01 | 0.95 ? | 0.95 ? | 1.11 ? | 42.3 % |
| Économie | 234 | 0.98 | 0.74 ? | 1.18 ? | 1.03 ? | 37.7 % |
| Diplomatie | 192 | 0.97 | 0.91 ? | 1.02 ? | 0.96 ? | 61.7 % |
| Commerce | 228 | 0.94 | 0.88 ? | 1.15 ? | 0.78 ? | 33.3 % |
| Religion | 215 | 0.82 | 0.82 ? | 0.85 ? | 0.78 ? | 18.6 % |
| Science | 225 | 0.80 | 1.00 ? | 0.71 ? | 0.67 ? | 23.3 % |
| Éducation | 209 | 0.77 | 0.71 ? | 0.77 ? | 0.82 ? | 17.0 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 1.54 carte(s) et un perdant 1.59.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 9.5 | 1.23 ? | 10.8 % | 7.6 % |
| Aqueduc | 5 | 8.9 | 1.10 ? | 10.0 % | 7.4 % |
| Remouleur ambulant | 2 | 7.9 | 0.78 ? | 5.8 % | 7.2 % |
| Alchimiste royale | 6 | 7.6 | 1.56 ? | 11.1 % | 4.7 % |
| Contremaître | 3 | 7.4 | 0.91 ? | 6.4 % | 6.5 % |
| Halle des négociants | 2 | 7.3 | 0.61 ? | 3.1 % | 6.9 % |
| Ferme | 3 | 6.2 | 0.83 ? | 3.6 % | 4.2 % |
| Prison | 2 | 6.0 | 0.69 ? | 0.6 % | 3.8 % |
| Mine | RR | 5.8 | 0.79 ? | 3.6 % | 5.0 % |
| Comptoir maritime | 5 | 5.5 | 0.58 ? | 1.1 % | 4.7 % |
| Bibliothécaire | 2R | 5.4 | 0.71 ? | 2.5 % | 3.9 % |
| Démolisseur | 6 | 5.4 | 1.33 ? | 7.2 % | 3.2 % |
| Banque | R | 5.0 | 0.93 ? | 1.4 % | 1.5 % |
| Hôtel des impôts | 4 | 4.7 | 0.92 ? | 2.5 % | 3.5 % |
| Carrière | R | 4.5 | 0.55 ? | 0.8 % | 3.1 % |
| Apothicairerie | 2R | 4.5 | 1.00 ? | 1.4 % | 3.1 % |
| Archiviste royale | 7 | 4.5 | 1.03 ? | 4.4 % | 3.2 % |
| Maison du commerce | 7 | 4.3 | 1.00 ? | 3.3 % | 3.5 % |
| Grand argentier | 8 | 4.3 | 0.98 ? | 3.3 % | 3.2 % |
| Cabinet d'architecte | R | 4.2 | 0.74 ? | 0.3 % | 1.1 % |
| Moulin | RR | 3.9 | 1.21 ? | 3.9 % | 1.5 % |
| Assassin | 4 | 3.7 | 1.29 ? | 0.0 % | 1.3 % |
| Forge | R | 3.6 | 0.50 ? | 0.6 % | 2.5 % |
| Sapeur | RR | 3.5 | 1.19 ? | 3.1 % | 2.5 % |
| Cardinal | 6 | 3.4 | 0.52 ? | 1.1 % | 2.4 % |
| Chancellerie | 4 | 3.3 | 0.91 ? | 0.6 % | 0.8 % |
| Roi | 5 | 3.3 | 0.80 ? | 1.1 % | 1.9 % |
| Loge des bâtisseurs | 5 | 3.2 | 0.65 ? | 0.6 % | 1.3 % |
| Hôpital | RR | 2.7 | 0.66 ? | 0.8 % | 0.8 % |
| Ambassade | RRR | 2.6 | 0.48 ? | 1.1 % | 2.8 % |
| Cour du roi | 3RR | 2.1 | 0.26 ? | 0.3 % | 2.9 % |
| Tribunal | 4 | 2.0 | 0.72 ? | 0.0 % | 0.6 % |
| Mairie | RR | 1.3 | 0.77 ? | 0.0 % | 0.4 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.02 cartes, un perdant 5.73.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Cachot | 76.7 % | 3.5 | 18.1 % | 11.4 % | 23.3 % | 71.9 % |
| Ferrailleur | 73.6 % | 3.5 | 15.6 % | 13.9 % | 26.4 % | 62.6 % |
| Marché | 75.3 % | 3.7 | 15.0 % | 11.7 % | 24.7 % | 62.9 % |
| Imprimeur | 70.6 % | 3.9 | 8.9 % | 12.8 % | 29.4 % | 56.5 % |
| Épicerie | 65.6 % | 4.0 | 8.6 % | 10.6 % | 34.4 % | 54.6 % |
| Colporteur | 57.5 % | 4.5 | 5.0 % | 6.9 % | 42.5 % | 45.6 % |
| Salle du trésor | 36.7 % | 4.8 | 5.0 % | 5.3 % | 63.3 % | 21.1 % |
| Tour de guet | 56.7 % | 5.0 | 3.9 % | 7.8 % | 43.3 % | 39.9 % |
| Forgeron | 20.6 % | 6.1 | 1.4 % | 1.4 % | 79.4 % | 12.2 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Éducation 83.0 %, Religion 81.4 %, Science 76.7 %, Commerce 66.7 %, Économie 62.3 %, Progrès 57.7 %, Justice 57.1 %, Production 52.3 %, Diplomatie 38.3 %, Histoire 8.2 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 20.6 % | 8.8 % | 1.57 ? | 71.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 12.2 % | 11.3 % | 1.02 ? | 72.0 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 11.9 % | 11.8 % | 0.98 ? | 70.3 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 11.9 % | 11.8 % | 0.98 ? | 75.8 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 10.8 % | 11.4 % | 0.91 ? | 69.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.6 % | 9.2 % | 1.05 ? | 69.2 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 10.3 % | 6.9 % | 1.27 ? | 50.6 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 10.3 % | 9.6 % | 1.02 ? | 61.3 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.4 % | 9.4 % | 1.00 ? | 56.9 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 7.8 % | 10.1 % | 0.80 ? | 60.4 % |
| 5 | 1 blason Population supplémentaire | 7.5 % | 12.4 % | 0.68 ? | 69.8 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 6.4 % | 7.4 % | 0.87 ? | 39.5 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 4.7 % | 5.0 % | 1.05 ? | 64.2 % |
| 7 | 1 blason Noblesse supplémentaire | 4.4 % | 6.0 % | 0.83 ? | 57.6 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 3.6 % | 3.3 % | 1.01 ? | 59.5 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 3.3 % | 3.9 % | 0.93 ? | 47.5 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 2.8 % | 3.5 % | 0.87 ? | 80.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 1.9 % | 2.1 % | 0.91 ? | 54.5 % |
| 6 | 1 blason Économie supplémentaire | 0.6 % | 1.4 % | 0.44 ? | 41.7 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 0.6 % | 2.2 % | 0.36 ? | 50.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 29.7 % | 41.3 % | 1.18 | 3.22 | 3.05 | 48.9 % |
| Population | 11.9 % | 11.5 % | 0.95 | 2.56 | 2.19 | 15.8 % |
| Noblesse (Privilège) | 58.3 % | 47.2 % | 0.87 | 1.52 | 1.47 | 1.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.75 ? | 0.91 ? | 0.81 | 0.93 | 1.15 |
| Population | — | 0.41 ? | 1.02 | 0.97 | 1.53 ? |
| Privilèges | 1.10 ? | 1.00 | 0.98 | 1.01 ? | 1.18 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.83 | 1.28 |
| Salle du trésor | 1.60 | 1.37 |
| Tour de guet | 1.31 | 1.30 |
| Colporteur | 0.82 | 0.76 |
| Épicerie | 0.71 | 0.85 |
| Histoire | 0.69 | 0.29 |
| Marché | 0.53 | 0.71 |
| Ferrailleur | 0.51 | 0.45 |
| Cachot | 0.44 | 0.44 |
| Imprimeur | 0.42 | 0.35 |
| Maître fondeur | 0.36 | 0.15 |
| Alchimiste royale | 0.33 | 0.08 |
| Aqueduc | 0.32 | 0.15 |
| Justice | 0.29 | 0.17 |
| Production | 0.28 | 0.17 |
| Commerce | 0.24 | 0.24 |
| Contremaître | 0.23 | 0.13 |
| Économie | 0.22 | 0.23 |
| Progrès | 0.16 | 0.23 |
| Diplomatie | 0.16 | 0.17 |
