# Analyse des parties entre IA — 2026-10-16

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17974 joueurs observés, dont 5993 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1999 / 2000 | 2000 / 2000 | 1994 / 2000 |
| Tours de table du vainqueur | 19.9 | 16.8 | 22.4 |
| Lignées du vainqueur | 3.8 | 3.5 | 4.9 |
| Victoires du 1er joueur | 48.4 % | 33.7 % | 16.0 % |
| Victoires du 2e joueur | 51.6 % | 39.2 % | 23.9 % |
| Victoires du 3e joueur | — | 27.1 % | 19.9 % |
| Victoires du 4e joueur | — | — | 40.2 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.20 | 0.96 |
| Cartes trashées | 2.56 | 1.42 |
| Cartes dans le deck à la fin | 7.64 | 8.54 |
| Cartes jouées par lignée | 3.79 | 3.70 |
| Tours par lignée | 4.96 | 4.77 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 4.82 | 3.13 |
| Effets Rouges choisis | 1.57 | 1.39 |
| Effets Rouges automatiques | 0.32 | 0.40 |
| Privilèges | 1.18 | 1.31 |
| Niveau d'Économie final | 1.45 | 1.47 |
| Niveau de Population final | 2.14 | 1.94 |

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

En moyenne, un vainqueur achète 1.20 carte(s) et un perdant 0.96.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Fonderie | 5 | 11.6 | 1.70 | 20.9 % | 6.9 % |
| Charrette | 3 | 11.5 | 1.10 | 13.5 % | 10.4 % |
| Recyclage | 4 | 11.3 | 0.65 | 7.9 % | 13.1 % |
| Carrière | 4 | 11.2 | 1.27 | 15.2 % | 9.1 % |
| Caravane | 5 | 11.1 | 0.82 | 9.7 % | 11.8 % |
| Grand Marché | 7 | 11.0 | 1.21 | 14.0 % | 9.4 % |
| Bourreau | 7 | 10.8 | 1.79 | 20.5 % | 5.9 % |
| Comptoir | 4 | 9.8 | 0.97 | 9.9 % | 9.8 % |
| Démolition | 5 | 7.7 | 0.43 | 3.2 % | 9.9 % |
| Forge | 3 | 7.6 | 0.60 | 4.5 % | 9.1 % |
| Atelier | 3 | 0.1 | 0.30 ? | 0.0 % | 0.1 % |
| Bibliothèque | 3 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Marché royal, Trésorerie, Archives, Académie, Chantier, Guilde, Conseil, Cathédrale.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 2.56 cartes, un perdant 1.42.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 69.2 % | 1.5 | 47.1 % | 12.9 % | 30.8 % | 49.8 % |
| Base Érudit | 66.3 % | 1.8 | 28.4 % | 26.2 % | 71.3 % | 46.7 % |
| Base Métal | 33.5 % | 2.8 | 5.4 % | 9.9 % | 90.9 % | 13.6 % |
| Érudit-Métal | 31.3 % | 2.8 | 5.5 % | 8.8 % | 68.7 % | 14.6 % |
| Base Pierre | 12.0 % | 4.1 | 0.4 % | 0.7 % | 97.1 % | 3.5 % |
| Outil de pioche | 2.0 % | 5.4 | 0.0 % | 0.0 % | 98.0 % | 0.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 17.7 % | 8.0 % | 1.58 | 76.6 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 11.5 % | 12.4 % | 0.93 | 82.7 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 11.4 % | 8.2 % | 1.29 | 67.2 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 10.9 % | 10.9 % | 1.02 | 74.1 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 9.2 % | 12.5 % | 0.81 | 80.4 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 8.8 % | 12.7 % | 0.77 | 79.5 % |
| 5 | 1 blason Population supplémentaire | 8.6 % | 13.2 % | 0.73 | 84.3 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.8 % | 11.1 % | 0.79 | 69.8 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 6.7 % | 8.3 % | 0.90 | 65.6 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 6.3 % | 5.6 % | 1.20 | 48.2 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 6.2 % | 8.8 % | 0.83 | 57.3 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 4.8 % | 7.7 % | 0.78 | 52.4 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 4.1 % | 4.9 % | 1.01 | 41.4 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 1.8 % | 3.8 % | 0.66 | 35.7 % |
| 6 | 1 blason Économie supplémentaire | 1.4 % | 2.3 % | 0.85 | 24.0 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.7 % | 0.7 % | 1.18 ? | 26.9 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 0.9 % | 1.4 % | 0.67 | 1.45 | 1.47 | 2.5 % |
| Population | 53.1 % | 49.8 % | 1.40 | 2.14 | 1.94 | 2.4 % |
| Noblesse (Privilège) | 45.4 % | 48.7 % | 0.85 | 1.18 | 1.31 | 0.8 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.88 | 1.02 | 1.02 | 0.97 | 1.07 |
| Population | 1.69 | 0.75 | 0.93 | 1.34 | 1.83 |
| Privilèges | 1.14 | 1.02 | 0.86 | 1.04 | 0.94 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Pierre | 3.97 | 4.22 |
| Base Métal | 3.42 | 3.79 |
| Outil de pioche | 1.40 | 0.82 |
| Érudit-Métal | 1.36 | 1.57 |
| Base Érudit | 1.33 | 2.10 |
| Vente | 1.16 | 1.50 |
| Fonderie | 0.48 | 0.12 |
| Bourreau | 0.38 | 0.07 |
| Charrette | 0.32 | 0.22 |
| Carrière | 0.32 | 0.17 |
| Caravane | 0.23 | 0.24 |
| Grand Marché | 0.22 | 0.12 |
| Comptoir | 0.22 | 0.16 |
| Recyclage | 0.12 | 0.18 |
| Forge | 0.04 | 0.06 |
| Démolition | 0.03 | 0.06 |
| Atelier | 0.00 | 0.00 |
| Bibliothèque | 0.00 | 0.00 |
