# Analyse des parties entre IA — 2026-10-16

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 23.9 | 19.3 | 16.4 |
| Lignées du vainqueur | 7.0 | 6.3 | 5.9 |
| Victoires du 1er joueur | 49.3 % | 31.1 % | 21.9 % |
| Victoires du 2e joueur | 50.7 % | 32.0 % | 24.2 % |
| Victoires du 3e joueur | — | 36.9 % | 24.9 % |
| Victoires du 4e joueur | — | — | 28.9 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.98 | 1.00 |
| Cartes trashées | 6.40 | 5.00 |
| Cartes dans le deck à la fin | 4.60 | 6.00 |
| Cartes jouées par lignée | 2.08 | 2.20 |
| Tours par lignée | 3.07 | 3.20 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 1.45 | 0.75 |
| Effets Rouges choisis | 3.61 | 3.50 |
| Effets Rouges automatiques | 6.90 | 7.47 |
| Privilèges | 1.11 | 1.06 |
| Niveau d'Économie final | 3.44 | 3.38 |
| Niveau de Population final | 3.17 | 2.84 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 3595 | 1.46 | 1.30 | 1.50 | 1.58 | 83.8 % |
| Justice | 3595 | 1.12 | 1.11 | 1.05 | 1.19 | 69.4 % |
| Commerce | 3688 | 1.09 | 1.14 | 1.11 | 1.00 | 74.6 % |
| Économie | 3620 | 0.97 | 0.96 | 0.99 | 0.96 | 64.1 % |
| Progrès | 3685 | 0.95 | 0.87 | 0.98 | 1.00 | 39.8 % |
| Production | 3594 | 0.94 | 0.93 | 0.94 | 0.95 | 34.2 % |
| Diplomatie | 3539 | 0.93 | 0.90 | 0.95 | 0.94 | 36.5 % |
| Religion | 3549 | 0.85 | 0.97 | 0.81 | 0.77 | 8.3 % |
| Éducation | 3545 | 0.85 | 0.89 | 0.79 | 0.86 | 12.7 % |
| Science | 3590 | 0.84 | 0.91 | 0.87 | 0.74 | 10.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.98 carte(s) et un perdant 1.00.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Prison | 2 | 7.1 | 0.57 | 3.0 % | 7.4 % |
| Maître fondeur | 4 | 7.1 | 1.25 | 8.3 % | 5.6 % |
| Maison du commerce | 7 | 6.8 | 0.76 | 5.5 % | 7.4 % |
| Aqueduc | 5 | 6.8 | 1.03 | 7.0 % | 6.4 % |
| Contremaître | 3 | 6.8 | 0.97 | 7.0 % | 6.6 % |
| Comptoir maritime | 5 | 6.6 | 0.85 | 6.0 % | 6.9 % |
| Mine | RR | 6.5 | 0.80 | 4.7 % | 6.7 % |
| Alchimiste royale | 6 | 6.4 | 1.94 | 13.2 % | 2.9 % |
| Forge | R | 6.4 | 0.73 | 4.1 % | 6.3 % |
| Ferme | 3 | 6.4 | 0.77 | 4.6 % | 6.3 % |
| Halle des négociants | 2 | 6.3 | 0.79 | 2.9 % | 4.8 % |
| Ambassade | RRR | 5.8 | 1.10 | 6.8 % | 5.2 % |
| Remouleur ambulant | 2 | 4.5 | 0.80 | 2.1 % | 3.6 % |
| Sapeur | RR | 3.9 | 0.81 | 3.1 % | 4.0 % |
| Cabinet d'architecte | R | 3.7 | 0.61 | 1.3 % | 3.3 % |
| Carrière | R | 2.8 | 0.64 | 1.0 % | 2.5 % |
| Hôtel des impôts | 4 | 1.8 | 0.67 | 0.8 % | 1.7 % |
| Cardinal | 6 | 1.7 | 0.74 | 1.1 % | 1.7 % |
| Bibliothécaire | 2R | 1.0 | 0.81 | 0.6 % | 0.8 % |
| Moulin | RR | 0.6 | 1.14 ? | 0.7 % | 0.4 % |
| Mairie | RR | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Banque | R | 0.0 | 0.60 ? | 0.0 % | 0.0 % |
| Apothicairerie | 2R | 0.0 | 0.48 ? | 0.0 % | 0.0 % |
| Cour du roi | 3RR | 0.0 | 0.92 ? | 0.0 % | 0.0 % |

Jamais achetées : Assassin, Chancellerie, Tribunal, Loge des bâtisseurs, Roi, Hôpital, Démolisseur, Archiviste royale, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 6.40 cartes, un perdant 5.00.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Colporteur | 60.8 % | 2.8 | 15.1 % | 15.6 % | 8.7 % | 56.3 % |
| Marché | 72.9 % | 3.0 | 17.0 % | 16.4 % | 9.1 % | 65.7 % |
| Épicerie | 74.1 % | 3.3 | 13.8 % | 14.2 % | 13.0 % | 64.2 % |
| Imprimeur | 71.2 % | 3.5 | 12.3 % | 12.1 % | 15.1 % | 57.4 % |
| Cachot | 70.7 % | 3.6 | 11.4 % | 10.9 % | 21.1 % | 56.2 % |
| Ferrailleur | 69.3 % | 4.0 | 9.8 % | 8.1 % | 27.3 % | 50.3 % |
| Salle du trésor | 61.2 % | 4.4 | 6.3 % | 5.7 % | 37.8 % | 37.9 % |
| Forgeron | 43.0 % | 5.0 | 2.3 % | 3.8 % | 56.8 % | 25.3 % |
| Tour de guet | 7.7 % | 6.9 | 0.0 % | 0.0 % | 92.2 % | 1.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Éducation 75.2 %, Religion 71.4 %, Science 71.0 %, Production 62.8 %, Diplomatie 61.4 %, Progrès 59.7 %, Économie 35.7 %, Justice 30.3 %, Commerce 24.9 %, Histoire 16.1 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 14.7 % | 7.5 % | 1.42 | 86.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 11.8 % | 9.4 % | 1.12 | 88.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 10.7 % | 9.9 % | 1.00 | 88.6 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 10.5 % | 8.8 % | 1.08 | 82.4 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.5 % | 10.6 % | 0.94 | 89.4 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.6 % | 8.1 % | 1.09 | 79.7 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 8.2 % | 7.5 % | 1.04 | 79.2 % |
| 5 | 1 blason Population supplémentaire | 7.3 % | 10.6 % | 0.74 | 83.9 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 6.0 % | 7.4 % | 0.85 | 76.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.4 % | 5.4 % | 1.01 | 66.1 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 5.2 % | 7.3 % | 0.78 | 71.1 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 3.6 % | 4.7 % | 0.84 | 62.1 % |
| 7 | 1 blason Noblesse supplémentaire | 3.1 % | 3.9 % | 0.86 | 60.3 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 2.3 % | 2.3 % | 1.02 | 60.8 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 1.2 % | 1.4 % | 0.90 | 53.7 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.7 % | 0.7 % | 1.01 ? | 39.8 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 0.1 % | 0.2 % | 0.74 ? | 48.3 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 48.6 % | 52.8 % | 1.27 | 3.44 | 3.38 | 63.1 % |
| Population | 13.2 % | 11.0 % | 1.09 | 3.17 | 2.84 | 38.5 % |
| Noblesse (Privilège) | 38.1 % | 36.2 % | 0.64 | 1.11 | 1.06 | 0.1 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.96 ? | 0.81 | 1.04 | 0.97 | 1.00 |
| Population | — | 0.52 | 0.88 | 0.88 | 1.32 |
| Privilèges | 0.96 | 1.01 | 1.01 | 0.95 | 0.92 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.54 | 2.31 |
| Forgeron | 1.90 | 1.78 |
| Salle du trésor | 1.36 | 1.46 |
| Ferrailleur | 0.88 | 0.99 |
| Histoire | 0.69 | 0.27 |
| Commerce | 0.52 | 0.39 |
| Justice | 0.48 | 0.35 |
| Épicerie | 0.46 | 0.56 |
| Cachot | 0.42 | 0.50 |
| Alchimiste royale | 0.40 | 0.06 |
| Économie | 0.39 | 0.39 |
| Maître fondeur | 0.29 | 0.13 |
| Progrès | 0.28 | 0.32 |
| Production | 0.25 | 0.29 |
| Diplomatie | 0.24 | 0.27 |
| Contremaître | 0.24 | 0.18 |
| Aqueduc | 0.23 | 0.14 |
| Marché | 0.22 | 0.29 |
| Comptoir maritime | 0.19 | 0.19 |
| Ambassade | 0.16 | 0.09 |
