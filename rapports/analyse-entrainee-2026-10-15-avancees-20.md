# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17984 joueurs observés, dont 5993 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1994 / 2000 | 2000 / 2000 | 1999 / 2000 |
| Tours de table du vainqueur | 23.1 | 18.8 | 18.2 |
| Lignées du vainqueur | 5.1 | 4.6 | 4.8 |
| Victoires du 1er joueur | 49.9 % | 37.2 % | 23.7 % |
| Victoires du 2e joueur | 50.1 % | 35.0 % | 22.7 % |
| Victoires du 3e joueur | — | 27.8 % | 21.6 % |
| Victoires du 4e joueur | — | — | 32.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.99 | 1.73 |
| Cartes trashées | 5.34 | 3.05 |
| Cartes dans le deck à la fin | 5.65 | 7.68 |
| Cartes jouées par lignée | 2.90 | 3.09 |
| Tours par lignée | 4.17 | 4.32 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 4.49 | 3.57 |
| Effets Rouges choisis | 1.83 | 1.88 |
| Effets Rouges automatiques | 0.59 | 0.63 |
| Privilèges | 0.88 | 0.79 |
| Niveau d'Économie final | 2.18 | 2.21 |
| Niveau de Population final | 2.46 | 2.23 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Justice | 0 | — | — | — | — | 0.0 % |
| Commerce | 0 | — | — | — | — | 0.0 % |
| Diplomatie | 0 | — | — | — | — | 0.0 % |
| Économie | 0 | — | — | — | — | 0.0 % |
| Histoire | 0 | — | — | — | — | 0.0 % |
| Éducation | 0 | — | — | — | — | 0.0 % |
| Religion | 0 | — | — | — | — | 0.0 % |
| Production | 0 | — | — | — | — | 0.0 % |
| Science | 0 | — | — | — | — | 0.0 % |
| Progrès | 0 | — | — | — | — | 0.0 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 1.99 carte(s) et un perdant 1.73.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Bourreau | 7 | 15.7 | 2.29 | 37.9 % | 4.5 % |
| Fonderie | RR | 15.4 | 1.44 | 21.6 % | 11.2 % |
| Forge | 3 | 15.3 | 0.83 | 11.3 % | 15.8 % |
| Charrette | 3 | 15.0 | 0.89 | 12.5 % | 15.0 % |
| Recyclage | 4 | 14.9 | 0.53 | 6.6 % | 17.8 % |
| Caravane | 5 | 14.8 | 0.74 | 11.5 % | 16.4 % |
| Carrière | RR | 14.8 | 1.24 | 17.5 % | 12.0 % |
| Démolition | 5 | 14.5 | 0.93 | 13.9 % | 14.7 % |
| Atelier | 3 | 14.3 | 0.76 | 8.9 % | 14.9 % |
| Grand Marché | 7 | 14.1 | 1.14 | 16.4 % | 12.7 % |
| Comptoir | 4 | 14.0 | 0.89 | 12.1 % | 14.3 % |
| Chantier | 5 | 9.9 | 0.94 | 8.8 % | 10.0 % |
| Guilde | 4 | 3.1 | 0.56 | 1.5 % | 3.7 % |
| Trésorerie | 6 | 2.9 | 0.59 | 1.6 % | 3.5 % |
| Marché royal | 4 | 1.5 | 0.72 | 0.7 % | 1.4 % |
| Conseil | 5 | 0.7 | 0.91 ? | 0.5 % | 0.8 % |
| Bibliothèque | 3 | 0.5 | 0.64 ? | 0.2 % | 0.4 % |
| Archives | 5 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Académie | 6 | 0.0 | 3.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Cathédrale.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.34 cartes, un perdant 3.05.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Base Érudit | 94.4 % | 2.0 | 57.5 % | 9.0 % | 36.4 % | 82.3 % |
| Vente | 74.4 % | 3.0 | 17.5 % | 18.5 % | 25.6 % | 51.8 % |
| Outil de pioche | 59.2 % | 3.4 | 11.2 % | 12.3 % | 40.8 % | 39.4 % |
| Base Métal | 70.0 % | 3.5 | 5.4 % | 20.6 % | 68.2 % | 32.2 % |
| Érudit-Métal | 59.1 % | 3.8 | 7.4 % | 11.8 % | 40.9 % | 30.1 % |
| Base Pierre | 49.4 % | 4.3 | 0.0 % | 6.3 % | 83.0 % | 16.4 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 12.3 % | 6.2 % | 1.47 | 89.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 10.3 % | 8.2 % | 1.12 | 93.8 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.0 % | 7.8 % | 1.14 | 91.7 % |
| 5 | 1 blason Population supplémentaire | 8.2 % | 8.3 % | 0.96 | 90.7 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 7.6 % | 7.5 % | 1.01 | 89.3 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.2 % | 6.4 % | 1.07 | 88.8 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 6.7 % | 5.0 % | 1.25 | 80.8 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 6.4 % | 6.0 % | 1.07 | 77.8 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 5.5 % | 6.0 % | 0.95 | 90.4 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 3.8 % | 3.1 % | 1.20 | 71.8 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 3.7 % | 4.7 % | 0.89 | 75.6 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 3.3 % | 3.4 % | 1.05 | 72.2 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 1.1 % | 2.6 % | 0.59 | 64.8 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 1.1 % | 1.5 % | 0.86 | 62.8 % |
| 6 | 1 blason Économie supplémentaire | 0.6 % | 1.1 % | 0.76 ? | 58.8 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.4 % | 0.6 % | 0.94 ? | 51.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.1 % | 0.1 % | 1.24 ? | 44.4 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 0.0 % | 0.0 % | 0.75 ? | 60.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | 0.00 ? | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | 0.00 ? | 33.3 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 7.3 % | 7.2 % | 1.05 | 2.18 | 2.21 | 9.5 % |
| Population | 50.5 % | 62.6 % | 1.27 | 2.46 | 2.23 | 17.6 % |
| Noblesse (Privilège) | 41.5 % | 29.3 % | 0.62 | 0.88 | 0.79 | 0.2 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.61 | 1.09 | 1.06 | 0.90 | 0.93 |
| Population | 0.59 | 0.50 | 1.23 | 1.07 | 1.05 |
| Privilèges | 0.78 | 1.11 | 1.03 | 1.10 | 0.86 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Pierre | 3.62 | 3.80 |
| Base Métal | 2.84 | 3.26 |
| Vente | 0.99 | 1.26 |
| Bourreau | 0.91 | 0.06 |
| Érudit-Métal | 0.90 | 1.16 |
| Outil de pioche | 0.82 | 0.63 |
| Fonderie | 0.69 | 0.22 |
| Base Érudit | 0.49 | 0.75 |
| Carrière | 0.41 | 0.22 |
| Comptoir | 0.34 | 0.27 |
| Grand Marché | 0.33 | 0.22 |
| Charrette | 0.31 | 0.31 |
| Atelier | 0.29 | 0.34 |
| Forge | 0.28 | 0.29 |
| Caravane | 0.28 | 0.36 |
| Chantier | 0.19 | 0.17 |
| Démolition | 0.18 | 0.10 |
| Recyclage | 0.12 | 0.20 |
| Guilde | 0.04 | 0.01 |
| Trésorerie | 0.02 | 0.03 |
