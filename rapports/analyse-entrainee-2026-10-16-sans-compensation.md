# Analyse des parties entre IA — 2026-10-16

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17920 joueurs observés, dont 5980 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 1980 / 2000 |
| Tours de table du vainqueur | 22.9 | 26.3 | 28.1 |
| Lignées du vainqueur | 4.3 | 5.4 | 5.7 |
| Victoires du 1er joueur | 52.8 % | 40.6 % | 34.4 % |
| Victoires du 2e joueur | 47.1 % | 31.7 % | 25.2 % |
| Victoires du 3e joueur | — | 27.8 % | 21.3 % |
| Victoires du 4e joueur | — | — | 19.1 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.93 | 0.63 |
| Cartes trashées | 2.13 | 1.03 |
| Cartes dans le deck à la fin | 7.80 | 8.60 |
| Cartes jouées par lignée | 3.83 | 3.53 |
| Tours par lignée | 5.03 | 4.56 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 4.77 | 2.26 |
| Effets Rouges choisis | 1.02 | 0.83 |
| Effets Rouges automatiques | 0.24 | 0.26 |
| Privilèges | 1.69 | 1.79 |
| Niveau d'Économie final | 1.91 | 2.07 |
| Niveau de Population final | 2.40 | 2.02 |

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

En moyenne, un vainqueur achète 0.93 carte(s) et un perdant 0.63.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Fonderie | 5 | 7.4 | 1.87 | 15.0 % | 3.6 % |
| Charrette | 3 | 7.4 | 1.09 | 8.7 % | 6.7 % |
| Caravane | 5 | 7.2 | 1.07 | 8.3 % | 6.6 % |
| Carrière | 4 | 7.1 | 1.64 | 12.6 % | 4.4 % |
| Atelier de taille | 6 | 7.1 | 1.25 | 9.4 % | 5.9 % |
| Grand Marché | 7 | 7.1 | 1.17 | 8.9 % | 6.2 % |
| Bourreau | 7 | 7.1 | 1.95 | 14.4 % | 3.3 % |
| Recyclage | 4 | 7.0 | 0.74 | 5.5 % | 7.7 % |
| Comptoir | 4 | 6.8 | 0.94 | 6.9 % | 6.7 % |
| Démolition | 5 | 6.1 | 0.41 | 2.5 % | 7.8 % |
| Forge | 3 | 1.6 | 0.50 | 0.7 % | 2.1 % |
| Haut-fourneau | 6 | 0.3 | 0.15 ? | 0.0 % | 0.4 % |
| Atelier | 3 | 0.2 | 0.39 ? | 0.1 % | 0.3 % |
| Trésorerie | 6 | 0.2 | 0.11 ? | 0.0 % | 0.3 % |
| Lingots | 3 | 0.1 | 0.39 ? | 0.0 % | 0.1 % |
| Bloc de pierre | 3 | 0.1 | 0.26 ? | 0.0 % | 0.1 % |
| Bibliothèque | 3 | 0.1 | 0.30 ? | 0.0 % | 0.1 % |
| Guilde | 4 | 0.1 | 0.30 ? | 0.0 % | 0.1 % |
| Entrepôt | 4 | 0.1 | 0.31 ? | 0.0 % | 0.0 % |
| Scriptorium | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Marché royal | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Archives, Académie, Chantier, Conseil, Cathédrale, Carrière de marbre, Mine profonde.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 2.13 cartes, un perdant 1.03.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 61.1 % | 1.4 | 44.3 % | 10.7 % | 38.9 % | 35.8 % |
| Base Érudit | 55.6 % | 1.9 | 21.9 % | 22.4 % | 77.7 % | 33.4 % |
| Érudit-Métal | 26.2 % | 2.6 | 6.4 % | 6.8 % | 73.8 % | 12.0 % |
| Base Pierre | 27.2 % | 2.7 | 6.3 % | 6.4 % | 93.1 % | 10.8 % |
| Base Métal | 10.6 % | 3.7 | 0.5 % | 2.3 % | 98.0 % | 2.6 % |
| Outil de pioche | 1.1 % | 5.1 | 0.0 % | 0.0 % | 98.9 % | 0.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 15 | À son tour, à la place de son action, le joueur peut paye… | 22.4 % | 8.9 % | 1.72 | 53.2 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 20.3 % | 11.7 % | 1.39 | 64.6 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 16.4 % | 12.4 % | 1.19 | 62.5 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 14.0 % | 9.2 % | 1.38 | 37.8 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 12.1 % | 15.7 % | 0.82 | 71.3 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 11.6 % | 15.6 % | 0.81 | 67.0 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 11.2 % | 16.2 % | 0.76 | 67.9 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 10.3 % | 13.2 % | 0.87 | 51.9 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 10.1 % | 14.8 % | 0.77 | 59.8 % |
| 5 | 1 blason Population supplémentaire | 9.4 % | 16.8 % | 0.65 | 71.6 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 9.2 % | 11.6 % | 0.89 | 46.8 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 8.1 % | 10.4 % | 0.91 | 32.3 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 5.0 % | 9.4 % | 0.69 | 27.5 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 4.9 % | 6.5 % | 0.93 | 21.5 % |
| 6 | 1 blason Économie supplémentaire | 2.4 % | 4.8 % | 0.69 | 13.5 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 1.2 % | 1.9 % | 0.84 | 12.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 1.2 % | 2.0 % | 0.71 | 1.91 | 2.07 | 7.4 % |
| Population | 43.5 % | 39.9 % | 1.28 | 2.40 | 2.02 | 7.8 % |
| Noblesse (Privilège) | 55.2 % | 58.1 % | 0.98 | 1.69 | 1.79 | 3.9 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.00 | 1.07 | 1.03 | 0.87 | 0.89 |
| Population | 1.21 ? | 0.62 | 0.84 | 1.43 | 2.06 |
| Privilèges | 1.34 | 1.03 | 0.90 | 1.07 | 1.12 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 5.27 | 5.65 |
| Base Pierre | 4.60 | 5.09 |
| Base Érudit | 2.55 | 3.62 |
| Érudit-Métal | 2.07 | 2.34 |
| Vente | 1.60 | 2.12 |
| Outil de pioche | 1.32 | 0.50 |
| Fonderie | 0.41 | 0.08 |
| Carrière | 0.30 | 0.08 |
| Bourreau | 0.28 | 0.04 |
| Atelier de taille | 0.26 | 0.12 |
| Charrette | 0.26 | 0.16 |
| Caravane | 0.25 | 0.15 |
| Comptoir | 0.18 | 0.12 |
| Grand Marché | 0.16 | 0.10 |
| Recyclage | 0.09 | 0.10 |
| Démolition | 0.03 | 0.08 |
| Forge | 0.00 | 0.01 |
| Atelier | 0.00 | 0.00 |
| Lingots | 0.00 | 0.00 |
| Bibliothèque | 0.00 | 0.00 |
