# Analyse des parties entre IA — 2026-10-16

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 25.0 | 19.8 | 16.4 |
| Lignées du vainqueur | 7.6 | 6.7 | 6.1 |
| Victoires du 1er joueur | 51.2 % | 31.9 % | 21.1 % |
| Victoires du 2e joueur | 48.8 % | 33.6 % | 23.1 % |
| Victoires du 3e joueur | — | 34.5 % | 25.9 % |
| Victoires du 4e joueur | — | — | 30.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.67 | 0.62 |
| Cartes trashées | 7.04 | 5.77 |
| Cartes dans le deck à la fin | 4.63 | 5.85 |
| Cartes jouées par lignée | 2.04 | 2.11 |
| Tours par lignée | 2.98 | 3.05 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 1.58 | 0.78 |
| Effets Rouges choisis | 3.91 | 3.76 |
| Effets Rouges automatiques | 7.64 | 8.26 |
| Privilèges | 1.15 | 1.06 |
| Niveau d'Économie final | 3.54 | 3.48 |
| Niveau de Population final | 3.13 | 2.77 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 3595 | 1.53 | 1.39 | 1.53 | 1.68 | 88.8 % |
| Commerce | 3688 | 1.14 | 1.14 | 1.25 | 1.03 | 77.4 % |
| Justice | 3595 | 1.10 | 1.07 | 1.11 | 1.12 | 72.4 % |
| Économie | 3620 | 1.00 | 0.99 | 0.99 | 1.01 | 67.3 % |
| Progrès | 3685 | 0.92 | 0.85 | 0.89 | 1.02 | 44.8 % |
| Production | 3594 | 0.89 | 0.95 | 0.86 | 0.88 | 39.7 % |
| Diplomatie | 3539 | 0.89 | 0.89 | 0.86 | 0.92 | 39.2 % |
| Éducation | 3545 | 0.89 | 0.93 | 0.90 | 0.83 | 13.5 % |
| Religion | 3549 | 0.85 | 0.89 | 0.86 | 0.79 | 9.5 % |
| Science | 3590 | 0.79 | 0.88 | 0.76 | 0.74 | 11.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.67 carte(s) et un perdant 0.62.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 5.9 | 1.04 | 5.7 % | 5.3 % |
| Contremaître | 3 | 5.8 | 0.93 | 5.8 % | 5.8 % |
| Comptoir maritime | 5 | 5.6 | 0.81 | 4.9 % | 5.9 % |
| Maison du commerce | 7 | 5.6 | 0.78 | 4.7 % | 6.0 % |
| Aqueduc | 5 | 5.5 | 1.11 | 6.3 % | 4.8 % |
| Forge | R | 5.4 | 0.77 | 3.5 % | 5.0 % |
| Prison | 2 | 5.4 | 0.60 | 2.5 % | 5.6 % |
| Alchimiste royale | 6 | 5.3 | 1.70 | 9.5 % | 3.0 % |
| Mine | RR | 5.1 | 0.85 | 3.9 % | 5.0 % |
| Ambassade | RRR | 4.4 | 1.07 | 5.1 % | 4.0 % |
| Ferme | 3 | 4.1 | 0.88 | 3.2 % | 3.8 % |
| Sapeur | RR | 2.8 | 0.94 | 2.8 % | 2.6 % |
| Halle des négociants | 2 | 1.8 | 0.86 | 1.1 % | 1.4 % |
| Remouleur ambulant | 2 | 0.6 | 1.16 ? | 0.6 % | 0.4 % |
| Hôtel des impôts | 4 | 0.1 | 1.33 ? | 0.1 % | 0.0 % |
| Carrière | R | 0.0 | 1.20 ? | 0.0 % | 0.0 % |
| Cardinal | 6 | 0.0 | 1.50 ? | 0.0 % | 0.0 % |
| Bibliothécaire | 2R | 0.0 | 2.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Cabinet d'architecte, Assassin, Chancellerie, Tribunal, Moulin, Apothicairerie, Loge des bâtisseurs, Roi, Hôpital, Mairie, Démolisseur, Archiviste royale, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.04 cartes, un perdant 5.77.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Colporteur | 90.0 % | 2.6 | 29.4 % | 20.9 % | 10.0 % | 87.8 % |
| Marché | 90.3 % | 3.2 | 19.6 % | 18.8 % | 9.8 % | 82.3 % |
| Épicerie | 87.6 % | 3.6 | 14.8 % | 15.4 % | 12.3 % | 74.9 % |
| Imprimeur | 83.1 % | 3.9 | 11.0 % | 12.0 % | 16.9 % | 67.6 % |
| Cachot | 75.9 % | 4.4 | 6.7 % | 8.7 % | 24.1 % | 61.0 % |
| Ferrailleur | 70.0 % | 4.8 | 4.7 % | 5.7 % | 30.0 % | 50.4 % |
| Salle du trésor | 56.0 % | 5.3 | 2.7 % | 3.4 % | 44.0 % | 36.4 % |
| Forgeron | 40.4 % | 5.6 | 1.0 % | 3.9 % | 59.6 % | 26.0 % |
| Tour de guet | 6.2 % | 8.2 | 0.0 % | 0.0 % | 93.8 % | 1.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Religion 90.5 %, Science 88.9 %, Éducation 86.5 %, Diplomatie 60.8 %, Production 60.3 %, Progrès 55.2 %, Économie 32.7 %, Justice 27.6 %, Commerce 22.6 %, Histoire 11.2 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.9 % | 7.0 % | 1.52 | 86.9 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 12.3 % | 9.4 % | 1.14 | 88.5 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 11.7 % | 8.6 % | 1.17 | 83.6 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 10.4 % | 10.1 % | 0.96 | 89.4 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.2 % | 10.9 % | 0.91 | 89.5 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.3 % | 8.3 % | 1.05 | 80.1 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 8.2 % | 8.0 % | 0.99 | 79.5 % |
| 5 | 1 blason Population supplémentaire | 7.5 % | 10.6 % | 0.75 | 85.4 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 6.2 % | 7.4 % | 0.87 | 78.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.8 % | 5.5 % | 1.05 | 66.1 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 5.5 % | 7.3 % | 0.82 | 71.7 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.0 % | 4.8 % | 0.88 | 63.1 % |
| 7 | 1 blason Noblesse supplémentaire | 2.9 % | 3.8 % | 0.83 | 62.4 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 2.3 % | 2.4 % | 1.01 | 57.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 1.5 % | 1.3 % | 1.09 | 55.6 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.8 % | 0.5 % | 1.31 ? | 50.4 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 0.2 % | 0.2 % | 1.14 ? | 59.5 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 47.2 % | 51.2 % | 1.30 | 3.54 | 3.48 | 70.3 % |
| Population | 15.2 % | 14.9 % | 1.05 | 3.13 | 2.77 | 36.4 % |
| Noblesse (Privilège) | 37.6 % | 33.9 % | 0.65 | 1.15 | 1.06 | 0.1 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.39 ? | 0.76 | 1.07 | 0.93 | 1.01 |
| Population | — | 0.60 | 0.85 | 0.87 | 1.40 |
| Privilèges | 0.91 | 0.99 | 1.07 | 1.06 | 1.44 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.67 | 2.51 |
| Forgeron | 2.16 | 1.95 |
| Salle du trésor | 1.61 | 1.68 |
| Ferrailleur | 1.10 | 1.15 |
| Histoire | 0.78 | 0.28 |
| Épicerie | 0.61 | 0.72 |
| Cachot | 0.60 | 0.66 |
| Commerce | 0.59 | 0.42 |
| Justice | 0.51 | 0.39 |
| Économie | 0.44 | 0.41 |
| Marché | 0.32 | 0.41 |
| Progrès | 0.32 | 0.38 |
| Production | 0.29 | 0.34 |
| Diplomatie | 0.27 | 0.32 |
| Alchimiste royale | 0.24 | 0.04 |
| Maître fondeur | 0.15 | 0.08 |
| Contremaître | 0.15 | 0.12 |
| Aqueduc | 0.14 | 0.07 |
| Comptoir maritime | 0.12 | 0.11 |
| Éducation | 0.12 | 0.16 |
