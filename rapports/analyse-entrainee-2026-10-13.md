# Analyse des parties entre IA — 2026-10-13

Bot : **IA entraînée** à tous les sièges. 3000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 3000.

27000 joueurs observés, dont 9000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 3000 / 3000 | 3000 / 3000 | 3000 / 3000 |
| Tours de table du vainqueur | 17.5 | 14.3 | 12.3 |
| Lignées du vainqueur | 6.7 | 6.0 | 5.6 |
| Victoires du 1er joueur | 49.5 % | 31.2 % | 23.4 % |
| Victoires du 2e joueur | 50.5 % | 36.2 % | 25.7 % |
| Victoires du 3e joueur | — | 32.6 % | 27.2 % |
| Victoires du 4e joueur | — | — | 23.7 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.58 | 0.56 |
| Cartes trashées | 6.84 | 5.42 |
| Cartes dans le deck à la fin | 4.75 | 6.14 |
| Cartes jouées par lignée | 2.11 | 2.12 |
| Tours par lignée | 3.04 | 3.03 |
| Tours gagnés par Rejouer | 3.98 | 2.75 |
| Pioches supplémentaires | 1.50 | 0.87 |
| Effets Rouges choisis | 3.18 | 3.14 |
| Effets Rouges automatiques | 8.31 | 9.62 |
| Privilèges | 1.62 | 1.51 |
| Niveau d'Économie final | 3.54 | 3.42 |
| Niveau de Population final | 2.53 | 2.00 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 5397 | 1.71 | 1.43 | 1.73 | 1.97 | 95.9 % |
| Économie | 5429 | 1.05 | 1.06 | 1.04 | 1.04 | 35.2 % |
| Commerce | 5445 | 1.03 | 1.03 | 1.06 | 1.01 | 43.1 % |
| Justice | 5411 | 1.03 | 1.03 | 1.09 | 0.96 | 38.9 % |
| Production | 5310 | 0.93 | 0.92 | 0.93 | 0.94 | 37.7 % |
| Religion | 5423 | 0.89 | 0.92 | 0.90 | 0.84 | 14.8 % |
| Diplomatie | 5316 | 0.88 | 0.93 | 0.84 | 0.85 | 36.6 % |
| Science | 5364 | 0.83 | 0.91 | 0.78 | 0.80 | 12.2 % |
| Éducation | 5349 | 0.83 | 0.87 | 0.80 | 0.82 | 11.2 % |
| Progrès | 5556 | 0.82 | 0.88 | 0.82 | 0.77 | 39.0 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.58 carte(s) et un perdant 0.56.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 5.8 | 1.22 | 7.5 % | 4.8 % |
| Contremaître | 3 | 5.7 | 1.25 | 7.5 % | 4.7 % |
| Aqueduc | 5 | 5.4 | 1.14 | 6.6 % | 4.8 % |
| Halle des négociants | 2 | 5.2 | 0.82 | 4.0 % | 4.9 % |
| Remouleur ambulant | 2 | 5.2 | 0.78 | 3.8 % | 5.5 % |
| Alchimiste royale | 6 | 5.2 | 1.69 | 9.0 % | 2.9 % |
| Prison | 2 | 4.9 | 0.44 | 0.7 % | 4.4 % |
| Mine | RR | 4.2 | 0.64 | 2.4 % | 4.7 % |
| Ferme | 3 | 2.7 | 0.62 | 1.0 % | 2.4 % |
| Comptoir maritime | 5 | 2.3 | 0.82 | 1.5 % | 2.1 % |
| Hôtel des impôts | 4 | 1.9 | 0.76 | 0.8 % | 1.4 % |
| Maison du commerce | 7 | 1.9 | 0.85 | 1.5 % | 1.8 % |
| Ambassade | RRR | 1.7 | 0.81 | 1.5 % | 1.8 % |
| Sapeur | RR | 1.5 | 0.72 | 1.2 % | 1.6 % |
| Bibliothécaire | 2R | 1.4 | 0.78 | 0.9 % | 1.3 % |
| Forge | R | 0.9 | 0.52 | 0.2 % | 0.7 % |
| Carrière | R | 0.4 | 0.80 ? | 0.1 % | 0.3 % |
| Cour du roi | 3RR | 0.1 | 0.79 ? | 0.1 % | 0.1 % |
| Apothicairerie | 2R | 0.1 | 0.94 ? | 0.0 % | 0.1 % |
| Archiviste royale | 7 | 0.0 | 0.89 ? | 0.0 % | 0.0 % |
| Roi | 5 | 0.0 | 1.00 ? | 0.0 % | 0.0 % |
| Cardinal | 6 | 0.0 | 1.20 ? | 0.0 % | 0.0 % |
| Mairie | RR | 0.0 | 1.33 ? | 0.0 % | 0.0 % |
| Démolisseur | 6 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Cabinet d'architecte, Assassin, Chancellerie, Tribunal, Moulin, Loge des bâtisseurs, Hôpital, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 6.84 cartes, un perdant 5.42.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Cachot | 84.1 % | 3.0 | 23.4 % | 15.7 % | 15.9 % | 76.7 % |
| Ferrailleur | 81.9 % | 3.3 | 17.9 % | 13.8 % | 18.1 % | 72.4 % |
| Marché | 85.8 % | 3.5 | 16.5 % | 14.4 % | 14.2 % | 71.9 % |
| Imprimeur | 77.7 % | 3.9 | 10.9 % | 12.2 % | 22.3 % | 62.6 % |
| Épicerie | 73.2 % | 4.1 | 8.4 % | 10.8 % | 26.8 % | 54.1 % |
| Colporteur | 58.0 % | 4.5 | 4.7 % | 6.4 % | 42.0 % | 40.9 % |
| Tour de guet | 63.6 % | 4.9 | 1.4 % | 8.6 % | 36.4 % | 45.0 % |
| Salle du trésor | 24.5 % | 5.9 | 0.5 % | 2.3 % | 75.5 % | 11.4 % |
| Forgeron | 10.6 % | 7.8 | 0.0 % | 0.0 % | 89.4 % | 2.0 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Éducation 88.8 %, Science 87.8 %, Religion 85.2 %, Économie 64.8 %, Diplomatie 63.4 %, Production 62.3 %, Justice 61.1 %, Progrès 61.0 %, Commerce 56.9 %, Histoire 4.1 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 23.5 % | 7.4 % | 1.75 | 75.9 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 14.4 % | 11.3 % | 1.12 | 64.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 13.5 % | 12.3 % | 1.02 | 75.6 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 13.4 % | 12.4 % | 1.00 | 76.7 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 12.0 % | 11.6 % | 0.99 | 71.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 11.6 % | 11.9 % | 0.94 | 60.3 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 11.4 % | 12.4 % | 0.91 | 70.9 % |
| 5 | 1 blason Population supplémentaire | 10.5 % | 13.7 % | 0.79 | 74.0 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.3 % | 11.3 % | 0.92 | 55.8 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 9.7 % | 10.4 % | 0.94 | 54.9 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.4 % | 9.5 % | 0.91 | 50.5 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 7.7 % | 6.0 % | 1.19 | 41.9 % |
| 7 | 1 blason Noblesse supplémentaire | 6.7 % | 9.0 % | 0.83 | 46.6 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 3.9 % | 5.5 % | 0.83 | 40.8 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 3.0 % | 3.5 % | 0.93 | 35.0 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 1.5 % | 1.8 % | 0.94 | 30.7 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 0.6 % | 0.6 % | 1.02 ? | 22.7 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 32.9 % | 39.7 % | 1.20 | 3.54 | 3.42 | 65.2 % |
| Population | 8.1 % | 8.3 % | 0.90 | 2.53 | 2.00 | 14.8 % |
| Noblesse (Privilège) | 59.1 % | 52.0 % | 0.90 | 1.62 | 1.51 | 1.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.59 ? | 0.67 | 0.80 | 0.97 | 1.06 |
| Population | 0.42 ? | 0.36 | 1.10 | 1.11 | 1.58 |
| Privilèges | 0.67 | 0.97 | 1.03 | 1.09 | 0.94 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 2.11 | 1.32 |
| Salle du trésor | 2.09 | 1.90 |
| Tour de guet | 1.62 | 1.50 |
| Histoire | 0.97 | 0.27 |
| Épicerie | 0.89 | 1.10 |
| Colporteur | 0.84 | 0.79 |
| Marché | 0.58 | 0.69 |
| Cachot | 0.35 | 0.44 |
| Ferrailleur | 0.33 | 0.34 |
| Commerce | 0.30 | 0.27 |
| Maître fondeur | 0.26 | 0.12 |
| Justice | 0.25 | 0.24 |
| Alchimiste royale | 0.25 | 0.05 |
| Contremaître | 0.25 | 0.12 |
| Économie | 0.24 | 0.23 |
| Production | 0.21 | 0.25 |
| Progrès | 0.20 | 0.31 |
| Aqueduc | 0.20 | 0.10 |
| Diplomatie | 0.19 | 0.25 |
| Imprimeur | 0.17 | 0.10 |
