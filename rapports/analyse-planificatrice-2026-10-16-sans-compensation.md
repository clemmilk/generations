# Analyse des parties entre IA — 2026-10-16

Bot : **IA qui planifie (40 simulations)** à tous les sièges. 80 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 80.

720 joueurs observés, dont 240 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 80 / 80 | 80 / 80 | 80 / 80 |
| Tours de table du vainqueur | 18.4 | 19.1 | 17.9 |
| Lignées du vainqueur | 3.6 | 3.8 | 3.7 |
| Victoires du 1er joueur | 60.0 % | 43.8 % | 40.0 % |
| Victoires du 2e joueur | 40.0 % | 30.0 % | 18.8 % |
| Victoires du 3e joueur | — | 26.3 % | 18.8 % |
| Victoires du 4e joueur | — | — | 22.5 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.26 | 2.15 |
| Cartes trashées | 3.61 | 2.61 |
| Cartes dans le deck à la fin | 7.65 | 8.54 |
| Cartes jouées par lignée | 3.76 | 3.66 |
| Tours par lignée | 5.20 | 5.04 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 3.92 | 2.68 |
| Effets Rouges choisis | 1.04 | 1.38 |
| Effets Rouges automatiques | 0.38 | 0.31 |
| Privilèges | 1.18 | 1.30 |
| Niveau d'Économie final | 1.39 | 1.42 |
| Niveau de Population final | 2.12 | 1.91 |

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

En moyenne, un vainqueur achète 2.26 carte(s) et un perdant 2.15.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Atelier de taille | 6 | 12.9 | 1.10 ? | 14.6 % | 11.9 % |
| Caravane | 5 | 12.6 | 1.27 ? | 16.7 % | 10.4 % |
| Grand Marché | 7 | 12.5 | 1.01 ? | 12.5 % | 12.1 % |
| Bourreau | 7 | 12.5 | 1.76 ? | 21.7 % | 7.3 % |
| Fonderie | 5 | 12.4 | 1.19 ? | 15.0 % | 10.6 % |
| Carrière | 4 | 12.1 | 1.51 ? | 19.2 % | 8.3 % |
| Comptoir | 4 | 11.5 | 0.93 ? | 10.8 % | 11.0 % |
| Charrette | 3 | 10.0 | 0.99 ? | 9.6 % | 9.2 % |
| Recyclage | 4 | 10.0 | 0.72 ? | 5.4 % | 9.8 % |
| Atelier | 3 | 8.8 | 0.88 ? | 7.1 % | 8.8 % |
| Académie | 6 | 8.6 | 1.27 ? | 10.4 % | 7.3 % |
| Lingots | 3 | 8.6 | 0.71 ? | 4.2 % | 8.1 % |
| Bibliothèque | 3 | 8.3 | 1.13 ? | 8.8 % | 6.5 % |
| Forge | 3 | 8.2 | 0.86 ? | 5.8 % | 7.7 % |
| Démolition | 5 | 7.4 | 0.62 ? | 3.3 % | 7.5 % |
| Mine profonde | 5 | 7.4 | 0.78 ? | 4.6 % | 5.4 % |
| Cathédrale | 8 | 6.7 | 0.93 ? | 4.2 % | 5.6 % |
| Marché royal | 4 | 6.1 | 0.70 ? | 1.3 % | 2.7 % |
| Bloc de pierre | 3 | 5.8 | 1.05 ? | 4.2 % | 2.9 % |
| Scriptorium | 4 | 5.8 | 0.80 ? | 2.5 % | 4.8 % |
| Archives | 5 | 5.6 | 0.91 ? | 3.3 % | 3.5 % |
| Guilde | 4 | 4.4 | 0.72 ? | 2.9 % | 4.4 % |
| Haut-fourneau | 6 | 4.2 | 0.96 ? | 4.2 % | 3.5 % |
| Carrière de marbre | 5 | 3.6 | 0.45 ? | 1.3 % | 2.1 % |
| Trésorerie | 6 | 3.5 | 0.46 ? | 0.8 % | 3.5 % |
| Conseil | 5 | 3.1 | 0.42 ? | 0.8 % | 2.1 % |
| Entrepôt | 4 | 3.1 | 0.56 ? | 0.4 % | 3.5 % |
| Chantier | 5 | 2.9 | 0.54 ? | 0.4 % | 2.7 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 3.61 cartes, un perdant 2.61.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 77.9 % | 1.9 | 37.9 % | 19.2 % | 22.1 % | 62.3 % |
| Base Érudit | 78.3 % | 2.0 | 27.9 % | 27.9 % | 66.7 % | 65.2 % |
| Base Pierre | 43.8 % | 2.7 | 10.4 % | 13.8 % | 86.7 % | 29.4 % |
| Base Métal | 30.8 % | 2.8 | 9.6 % | 7.1 % | 94.6 % | 19.2 % |
| Outil de pioche | 6.7 % | 2.9 | 1.7 % | 1.3 % | 93.3 % | 5.4 % |
| Érudit-Métal | 40.8 % | 3.2 | 7.5 % | 7.9 % | 59.2 % | 22.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.4 % | 10.0 % | 1.24 ? | 84.7 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 11.3 % | 9.4 % | 1.10 ? | 73.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 11.3 % | 9.6 % | 1.10 ? | 79.5 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 10.4 % | 9.8 % | 1.09 ? | 75.0 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 8.8 % | 8.5 % | 1.03 ? | 72.6 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 8.8 % | 4.4 % | 1.55 ? | 54.8 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 7.9 % | 10.4 % | 0.80 ? | 71.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 7.1 % | 9.4 % | 0.88 ? | 83.9 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 6.3 % | 7.3 % | 0.96 ? | 78.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 5.8 % | 9.6 % | 0.72 ? | 61.7 % |
| 5 | 1 blason Population supplémentaire | 5.0 % | 10.6 % | 0.59 ? | 61.9 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 4.6 % | 4.4 % | 1.11 ? | 68.8 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.2 % | 10.8 % | 0.50 ? | 72.6 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 3.8 % | 2.7 % | 1.19 ? | 86.4 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 2.9 % | 1.7 % | 1.33 ? | 60.0 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 2.5 % | 6.5 % | 0.49 ? | 64.9 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 1.3 % | 1.5 % | 0.95 ? | 60.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.8 % | 1.3 % | 0.67 ? | 75.0 % |
| 6 | 1 blason Économie supplémentaire | 0.4 % | 2.5 % | 0.26 ? | 84.6 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 3.3 % | 8.3 % | 0.75 | 1.39 | 1.42 | 2.5 % |
| Population | 38.3 % | 29.4 % | 1.25 | 2.12 | 1.91 | 3.8 % |
| Noblesse (Privilège) | 57.9 % | 62.3 % | 0.93 | 1.18 | 1.30 | 0.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.37 ? | 0.97 | 0.88 | 1.25 ? | 1.76 ? |
| Population | 1.23 ? | 0.84 ? | 0.92 | 1.31 ? | 1.80 ? |
| Privilèges | 1.18 ? | 1.05 | 0.85 | 0.88 ? | — |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 3.02 | 3.14 |
| Base Pierre | 2.40 | 2.64 |
| Outil de pioche | 1.22 | 0.87 |
| Base Érudit | 1.11 | 1.65 |
| Érudit-Métal | 1.06 | 1.21 |
| Vente | 0.92 | 1.07 |
| Bourreau | 0.48 | 0.09 |
| Caravane | 0.33 | 0.16 |
| Fonderie | 0.33 | 0.17 |
| Carrière | 0.33 | 0.12 |
| Atelier de taille | 0.30 | 0.17 |
| Comptoir | 0.18 | 0.14 |
| Charrette | 0.18 | 0.14 |
| Grand Marché | 0.18 | 0.14 |
| Académie | 0.15 | 0.08 |
| Atelier | 0.13 | 0.17 |
| Bibliothèque | 0.11 | 0.08 |
| Forge | 0.10 | 0.06 |
| Cathédrale | 0.10 | 0.08 |
| Lingots | 0.09 | 0.13 |
