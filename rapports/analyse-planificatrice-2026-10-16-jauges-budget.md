# Analyse des parties entre IA — 2026-10-16

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 18.8 | 17.3 | 17.0 |
| Lignées du vainqueur | 3.4 | 3.6 | 3.2 |
| Victoires du 1er joueur | 46.3 % | 33.8 % | 16.3 % |
| Victoires du 2e joueur | 53.8 % | 33.8 % | 30.0 % |
| Victoires du 3e joueur | — | 32.5 % | 33.8 % |
| Victoires du 4e joueur | — | — | 20.0 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.43 | 2.40 |
| Cartes trashées | 3.61 | 2.77 |
| Cartes dans le deck à la fin | 7.83 | 8.63 |
| Cartes jouées par lignée | 4.12 | 3.85 |
| Tours par lignée | 5.65 | 5.33 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 4.68 | 2.92 |
| Effets Rouges choisis | 1.02 | 1.35 |
| Effets Rouges automatiques | 0.45 | 0.43 |
| Privilèges | 1.07 | 1.12 |
| Niveau d'Économie final | 0.75 | 0.75 |
| Niveau de Population final | 1.58 | 1.61 |

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

En moyenne, un vainqueur achète 2.43 carte(s) et un perdant 2.40.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Carrière | 4 | 18.5 | 1.45 ? | 27.9 % | 13.8 % |
| Charrette | 3 | 18.1 | 1.15 ? | 21.7 % | 14.6 % |
| Grand Marché | 7 | 18.1 | 1.05 ? | 19.6 % | 16.5 % |
| Fonderie | 5 | 18.1 | 0.86 ? | 15.8 % | 18.3 % |
| Caravane | 5 | 17.8 | 0.87 ? | 16.3 % | 17.7 % |
| Comptoir | 4 | 16.5 | 0.81 ? | 13.8 % | 16.9 % |
| Bourreau | 7 | 16.5 | 1.62 ? | 25.0 % | 11.5 % |
| Recyclage | 4 | 16.1 | 0.44 ? | 7.5 % | 18.5 % |
| Bibliothèque | 3 | 14.2 | 1.46 ? | 17.1 % | 7.1 % |
| Forge | 3 | 12.5 | 0.42 ? | 5.0 % | 13.3 % |
| Atelier | 3 | 12.4 | 0.61 ? | 7.1 % | 12.5 % |
| Académie | 6 | 10.6 | 1.27 ? | 13.8 % | 7.3 % |
| Démolition | 5 | 9.4 | 0.61 ? | 4.2 % | 10.8 % |
| Archives | 5 | 8.8 | 1.38 ? | 11.3 % | 4.0 % |
| Marché royal | 4 | 8.3 | 0.87 ? | 1.7 % | 4.0 % |
| Cathédrale | 8 | 6.8 | 0.96 ? | 5.4 % | 6.9 % |
| Guilde | 4 | 5.3 | 0.83 ? | 2.5 % | 5.0 % |
| Chantier | 5 | 4.9 | 0.88 ? | 3.3 % | 2.9 % |
| Trésorerie | 6 | 4.7 | 0.35 ? | 1.3 % | 5.4 % |
| Conseil | 5 | 3.8 | 0.86 ? | 1.3 % | 2.9 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 3.61 cartes, un perdant 2.77.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 73.8 % | 2.0 | 30.0 % | 25.8 % | 26.3 % | 67.1 % |
| Base Érudit | 79.6 % | 2.0 | 30.4 % | 27.1 % | 66.7 % | 73.3 % |
| Base Métal | 47.9 % | 2.6 | 16.7 % | 8.8 % | 84.2 % | 30.4 % |
| Base Pierre | 35.8 % | 2.8 | 12.1 % | 7.1 % | 92.5 % | 18.5 % |
| Outil de pioche | 11.3 % | 3.0 | 2.5 % | 3.8 % | 88.8 % | 7.5 % |
| Érudit-Métal | 33.8 % | 3.4 | 6.3 % | 4.2 % | 66.3 % | 24.4 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.4 % | 10.6 % | 1.21 ? | 79.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 11.7 % | 6.9 % | 1.42 ? | 82.0 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 9.6 % | 9.2 % | 1.02 ? | 86.6 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 8.8 % | 9.4 % | 0.92 ? | 84.8 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 7.9 % | 7.1 % | 1.11 ? | 75.5 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 7.9 % | 4.2 % | 1.50 ? | 74.4 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 6.7 % | 7.1 % | 1.05 ? | 80.0 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 6.3 % | 8.5 % | 0.85 ? | 78.6 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 6.3 % | 8.3 % | 0.80 ? | 78.2 % |
| 5 | 1 blason Population supplémentaire | 5.0 % | 9.8 % | 0.63 ? | 76.3 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 4.6 % | 2.1 % | 1.55 ? | 76.2 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 4.2 % | 6.9 % | 0.71 ? | 55.8 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 3.3 % | 7.3 % | 0.57 ? | 67.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 2.9 % | 3.5 % | 0.92 ? | 79.2 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 2.5 % | 4.0 % | 0.75 ? | 88.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 2.1 % | 1.5 % | 1.30 ? | 66.7 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 1.3 % | 2.7 % | 0.61 ? | 75.0 % |
| 6 | 1 blason Économie supplémentaire | 0.8 % | 2.5 % | 0.50 ? | 64.3 % |
| 7 | 1 blason Noblesse supplémentaire | 0.4 % | 0.6 % | 0.67 ? | 75.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 7.9 % | 6.3 % | 0.51 | 0.75 | 0.75 | 0.0 % |
| Population | 30.0 % | 33.5 % | 1.23 | 1.58 | 1.61 | 2.1 % |
| Noblesse (Privilège) | 61.7 % | 60.2 % | 0.94 | 1.07 | 1.12 | 0.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.02 | 0.98 | 0.93 ? | 1.40 ? | — |
| Population | 1.47 ? | 1.05 | 0.92 | 0.99 ? | 1.58 ? |
| Privilèges | 1.12 ? | 0.96 | 1.05 ? | 0.82 ? | — |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Pierre | 2.55 | 2.79 |
| Base Métal | 2.13 | 2.45 |
| Outil de pioche | 1.32 | 0.87 |
| Base Érudit | 1.11 | 1.43 |
| Érudit-Métal | 0.99 | 1.08 |
| Vente | 0.91 | 0.98 |
| Bourreau | 0.57 | 0.13 |
| Carrière | 0.54 | 0.17 |
| Charrette | 0.37 | 0.23 |
| Caravane | 0.32 | 0.29 |
| Fonderie | 0.30 | 0.28 |
| Bibliothèque | 0.28 | 0.11 |
| Grand Marché | 0.26 | 0.15 |
| Académie | 0.20 | 0.10 |
| Comptoir | 0.19 | 0.20 |
| Archives | 0.13 | 0.03 |
| Atelier | 0.13 | 0.23 |
| Cathédrale | 0.12 | 0.12 |
| Recyclage | 0.11 | 0.21 |
| Forge | 0.07 | 0.10 |
