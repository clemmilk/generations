# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17933 joueurs observés, dont 5983 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 1999 / 2000 | 1984 / 2000 |
| Tours de table du vainqueur | 22.6 | 22.5 | 30.8 |
| Lignées du vainqueur | 4.2 | 4.5 | 6.2 |
| Victoires du 1er joueur | 47.3 % | 28.1 % | 16.5 % |
| Victoires du 2e joueur | 52.8 % | 42.5 % | 24.7 % |
| Victoires du 3e joueur | — | 29.4 % | 20.9 % |
| Victoires du 4e joueur | — | — | 37.9 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.31 | 1.08 |
| Cartes trashées | 2.84 | 1.53 |
| Cartes dans le deck à la fin | 7.47 | 8.56 |
| Cartes jouées par lignée | 3.92 | 3.67 |
| Tours par lignée | 5.14 | 4.79 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 5.52 | 3.27 |
| Effets Rouges choisis | 1.41 | 1.33 |
| Effets Rouges automatiques | 0.38 | 0.44 |
| Privilèges | 1.38 | 1.48 |
| Niveau d'Économie final | 0.97 | 0.96 |
| Niveau de Population final | 1.91 | 1.62 |

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

En moyenne, un vainqueur achète 1.31 carte(s) et un perdant 1.08.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Fonderie | 5 | 12.2 | 1.54 | 19.5 % | 8.4 % |
| Charrette | 3 | 12.0 | 1.15 | 14.7 % | 10.6 % |
| Recyclage | 4 | 11.8 | 0.65 | 8.1 % | 13.6 % |
| Carrière | 4 | 11.8 | 1.48 | 18.6 % | 8.3 % |
| Caravane | 5 | 11.6 | 0.97 | 11.8 % | 11.5 % |
| Grand Marché | 7 | 11.5 | 1.16 | 14.1 % | 10.3 % |
| Bourreau | 7 | 11.5 | 1.91 | 22.9 % | 5.6 % |
| Comptoir | 4 | 10.6 | 0.89 | 9.7 % | 11.0 % |
| Forge | 3 | 10.1 | 0.52 | 5.3 % | 12.4 % |
| Démolition | 5 | 9.8 | 0.47 | 4.6 % | 12.4 % |
| Atelier | 3 | 1.6 | 0.29 | 0.3 % | 2.1 % |
| Trésorerie | 6 | 0.8 | 0.21 ? | 0.1 % | 1.0 % |
| Guilde | 4 | 0.2 | 0.29 ? | 0.0 % | 0.2 % |
| Bibliothèque | 3 | 0.2 | 0.31 ? | 0.1 % | 0.2 % |
| Marché royal | 4 | 0.1 | 0.00 ? | 0.0 % | 0.0 % |
| Chantier | 5 | 0.0 | 0.50 ? | 0.0 % | 0.0 % |
| Conseil | 5 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Académie | 6 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Archives, Cathédrale.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 2.84 cartes, un perdant 1.53.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 72.4 % | 1.6 | 47.9 % | 14.5 % | 27.6 % | 49.4 % |
| Base Érudit | 69.5 % | 1.9 | 29.4 % | 28.0 % | 67.8 % | 48.4 % |
| Érudit-Métal | 35.1 % | 2.9 | 5.8 % | 8.8 % | 64.9 % | 16.6 % |
| Base Métal | 37.9 % | 3.0 | 5.2 % | 10.2 % | 87.6 % | 17.0 % |
| Base Pierre | 16.5 % | 4.2 | 0.5 % | 1.1 % | 95.6 % | 5.0 % |
| Outil de pioche | 2.6 % | 5.4 | 0.0 % | 0.0 % | 97.4 % | 0.2 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.8 % | 9.7 % | 1.47 | 74.2 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 13.6 % | 11.0 % | 1.16 | 70.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 12.9 % | 8.9 % | 1.33 | 56.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 12.4 % | 13.3 % | 0.93 | 78.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.4 % | 13.7 % | 0.82 | 75.6 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 9.9 % | 13.4 % | 0.82 | 72.4 % |
| 5 | 1 blason Population supplémentaire | 9.3 % | 14.5 % | 0.72 | 78.7 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.6 % | 12.6 % | 0.77 | 64.4 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 8.5 % | 10.1 % | 0.93 | 51.4 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 8.5 % | 10.9 % | 0.87 | 62.3 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 7.9 % | 6.5 % | 1.25 | 40.9 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 7.8 % | 9.0 % | 0.96 | 45.7 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 4.3 % | 6.4 % | 0.86 | 33.9 % |
| 6 | 1 blason Économie supplémentaire | 2.8 % | 4.6 % | 0.82 | 27.4 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 1.9 % | 2.8 % | 0.90 | 23.1 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.9 % | 1.2 % | 0.99 ? | 23.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 0.0 % | 0.0 % | 0.53 | 0.97 | 0.96 | 0.0 % |
| Population | 50.3 % | 51.3 % | 1.33 | 1.91 | 1.62 | 2.3 % |
| Noblesse (Privilège) | 49.3 % | 48.6 % | 1.01 | 1.38 | 1.48 | 1.8 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.06 | 0.93 | 1.22 | 1.32 ? | 1.50 ? |
| Population | 2.23 ? | 0.73 | 1.04 | 1.49 | 2.22 |
| Privilèges | 1.03 | 1.06 | 0.86 | 1.07 | 1.19 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Pierre | 4.95 | 5.43 |
| Base Métal | 4.33 | 4.94 |
| Base Érudit | 2.33 | 3.46 |
| Érudit-Métal | 1.79 | 2.18 |
| Vente | 1.44 | 1.88 |
| Outil de pioche | 1.44 | 0.73 |
| Fonderie | 0.52 | 0.16 |
| Bourreau | 0.47 | 0.06 |
| Carrière | 0.45 | 0.18 |
| Charrette | 0.39 | 0.26 |
| Caravane | 0.33 | 0.26 |
| Grand Marché | 0.24 | 0.15 |
| Comptoir | 0.23 | 0.18 |
| Recyclage | 0.18 | 0.27 |
| Démolition | 0.05 | 0.07 |
| Forge | 0.04 | 0.06 |
| Atelier | 0.01 | 0.04 |
| Bibliothèque | 0.00 | 0.00 |
| Trésorerie | 0.00 | 0.01 |
| Guilde | 0.00 | 0.00 |
