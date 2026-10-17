# Analyse des parties entre IA — 2026-10-14

Bot : **IA entraînée** à tous les sièges. 3000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 3000.

27000 joueurs observés, dont 9000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 3000 / 3000 | 3000 / 3000 | 3000 / 3000 |
| Tours de table du vainqueur | 25.8 | 20.1 | 16.7 |
| Lignées du vainqueur | 6.9 | 6.1 | 5.6 |
| Victoires du 1er joueur | 50.8 % | 33.1 % | 22.5 % |
| Victoires du 2e joueur | 49.2 % | 32.7 % | 23.3 % |
| Victoires du 3e joueur | — | 34.2 % | 24.9 % |
| Victoires du 4e joueur | — | — | 29.3 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.72 | 0.64 |
| Cartes trashées | 6.52 | 5.06 |
| Cartes dans le deck à la fin | 5.20 | 6.59 |
| Cartes jouées par lignée | 2.42 | 2.51 |
| Tours par lignée | 3.37 | 3.44 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 3.00 | 1.72 |
| Effets Rouges choisis | 5.01 | 4.65 |
| Effets Rouges automatiques | 8.23 | 9.29 |
| Privilèges | 1.22 | 1.13 |
| Niveau d'Économie final | 3.69 | 3.69 |
| Niveau de Population final | 3.28 | 2.90 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 5397 | 1.64 | 1.37 | 1.70 | 1.86 | 88.2 % |
| Justice | 5411 | 1.22 | 1.21 | 1.23 | 1.20 | 67.5 % |
| Commerce | 5445 | 1.15 | 1.11 | 1.21 | 1.12 | 77.7 % |
| Économie | 5429 | 1.07 | 1.10 | 1.04 | 1.08 | 71.3 % |
| Production | 5310 | 0.88 | 0.93 | 0.84 | 0.88 | 38.7 % |
| Progrès | 5556 | 0.88 | 0.89 | 0.85 | 0.90 | 53.2 % |
| Diplomatie | 5316 | 0.84 | 0.88 | 0.81 | 0.83 | 41.6 % |
| Éducation | 5349 | 0.81 | 0.85 | 0.79 | 0.78 | 10.5 % |
| Religion | 5423 | 0.77 | 0.82 | 0.82 | 0.69 | 21.0 % |
| Science | 5364 | 0.73 | 0.83 | 0.71 | 0.65 | 17.3 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.72 carte(s) et un perdant 0.64.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 5.9 | 1.18 | 7.0 % | 5.0 % |
| Mine | RR | 5.8 | 0.83 | 5.0 % | 6.0 % |
| Prison | 2 | 5.6 | 0.52 | 2.2 % | 5.7 % |
| Alchimiste royale | 6 | 5.5 | 1.95 | 11.4 % | 2.3 % |
| Contremaître | 3 | 5.1 | 0.93 | 4.5 % | 4.6 % |
| Ambassade | RRR | 4.5 | 1.06 | 5.2 % | 4.0 % |
| Remouleur ambulant | 2 | 4.2 | 0.78 | 2.8 % | 3.8 % |
| Sapeur | RR | 4.1 | 0.91 | 3.9 % | 4.0 % |
| Forge | R | 3.8 | 0.79 | 2.5 % | 3.3 % |
| Ferme | 3 | 3.6 | 0.85 | 3.1 % | 3.4 % |
| Bibliothécaire | 2R | 3.4 | 0.81 | 2.7 % | 3.3 % |
| Carrière | R | 3.2 | 0.77 | 2.0 % | 2.8 % |
| Comptoir maritime | 5 | 3.2 | 0.94 | 3.0 % | 2.9 % |
| Hôtel des impôts | 4 | 2.7 | 0.89 | 2.2 % | 2.3 % |
| Aqueduc | 5 | 2.6 | 1.04 | 2.8 % | 2.3 % |
| Maison du commerce | 7 | 2.5 | 0.92 | 2.5 % | 2.3 % |
| Cour du roi | 3RR | 0.5 | 0.97 ? | 0.6 % | 0.5 % |
| Halle des négociants | 2 | 0.3 | 0.75 ? | 0.1 % | 0.2 % |
| Archiviste royale | 7 | 0.0 | 1.37 ? | 0.0 % | 0.0 % |
| Mairie | RR | 0.0 | 0.86 ? | 0.0 % | 0.0 % |
| Démolisseur | 6 | 0.0 | 1.00 ? | 0.0 % | 0.0 % |
| Apothicairerie | 2R | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Cardinal | 6 | 0.0 | 2.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Cabinet d'architecte, Assassin, Chancellerie, Tribunal, Moulin, Loge des bâtisseurs, Roi, Hôpital, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 6.52 cartes, un perdant 5.06.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Colporteur | 87.0 % | 2.5 | 31.1 % | 19.3 % | 13.0 % | 82.5 % |
| Épicerie | 87.8 % | 3.0 | 20.8 % | 19.5 % | 12.2 % | 75.9 % |
| Marché | 84.1 % | 3.4 | 14.6 % | 15.9 % | 15.9 % | 69.4 % |
| Cachot | 71.8 % | 3.8 | 9.3 % | 11.3 % | 28.2 % | 54.3 % |
| Imprimeur | 73.6 % | 4.0 | 7.4 % | 10.3 % | 26.4 % | 52.7 % |
| Ferrailleur | 58.4 % | 4.8 | 4.0 % | 5.9 % | 41.6 % | 35.6 % |
| Forgeron | 52.0 % | 5.0 | 2.6 % | 4.6 % | 48.0 % | 29.2 % |
| Salle du trésor | 34.0 % | 5.7 | 0.9 % | 2.0 % | 66.0 % | 19.1 % |
| Tour de guet | 4.3 % | 8.1 | 0.0 % | 0.0 % | 95.7 % | 0.9 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Éducation 89.5 %, Science 82.7 %, Religion 79.0 %, Production 61.3 %, Diplomatie 58.4 %, Progrès 46.8 %, Justice 32.5 %, Économie 28.7 %, Commerce 22.3 %, Histoire 11.8 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.9 % | 8.1 % | 1.41 | 85.8 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 13.2 % | 9.4 % | 1.17 | 86.2 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 12.0 % | 9.9 % | 1.09 | 85.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.0 % | 9.8 % | 0.98 | 80.6 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 9.7 % | 9.5 % | 0.97 | 80.9 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 9.2 % | 8.8 % | 0.99 | 71.5 % |
| 5 | 1 blason Population supplémentaire | 8.7 % | 11.3 % | 0.79 | 84.5 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.7 % | 7.5 % | 1.09 | 70.0 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 8.3 % | 10.8 % | 0.80 | 72.4 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 7.6 % | 6.8 % | 1.06 | 66.6 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.9 % | 6.5 % | 0.81 | 63.4 % |
| 7 | 1 blason Noblesse supplémentaire | 4.2 % | 5.4 % | 0.84 | 62.2 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 3.7 % | 3.6 % | 1.04 | 58.3 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 2.6 % | 2.8 % | 0.97 | 52.9 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 1.7 % | 1.8 % | 0.99 | 49.6 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 0.8 % | 0.7 % | 1.12 | 50.0 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 0.2 % | 0.3 % | 0.59 ? | 41.1 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 56.5 % | 62.1 % | 1.38 | 3.69 | 3.69 | 75.5 % |
| Population | 7.9 % | 6.7 % | 1.01 | 3.28 | 2.90 | 45.7 % |
| Noblesse (Privilège) | 35.5 % | 31.2 % | 0.61 | 1.22 | 1.13 | 0.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.71 ? | 1.11 | 1.12 | 1.04 | 0.98 |
| Population | — | 0.45 | 0.85 | 0.83 | 1.32 |
| Privilèges | 0.91 | 1.00 | 1.07 | 0.95 | 0.76 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.40 | 2.34 |
| Salle du trésor | 2.08 | 2.00 |
| Forgeron | 1.41 | 1.39 |
| Cachot | 1.16 | 1.28 |
| Ferrailleur | 1.06 | 1.02 |
| Histoire | 0.82 | 0.24 |
| Marché | 0.72 | 0.92 |
| Commerce | 0.58 | 0.38 |
| Justice | 0.55 | 0.32 |
| Économie | 0.49 | 0.37 |
| Épicerie | 0.46 | 0.60 |
| Progrès | 0.35 | 0.40 |
| Alchimiste royale | 0.33 | 0.04 |
| Production | 0.32 | 0.36 |
| Diplomatie | 0.29 | 0.37 |
| Colporteur | 0.25 | 0.19 |
| Maître fondeur | 0.20 | 0.09 |
| Religion | 0.15 | 0.25 |
| Contremaître | 0.14 | 0.09 |
| Imprimeur | 0.13 | 0.09 |
