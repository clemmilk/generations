# Analyse des parties entre IA — 2026-10-16

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17892 joueurs observés, dont 5973 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 1973 / 2000 |
| Tours de table du vainqueur | 23.0 | 19.4 | 28.3 |
| Lignées du vainqueur | 4.3 | 4.0 | 5.8 |
| Victoires du 1er joueur | 52.6 % | 32.6 % | 14.6 % |
| Victoires du 2e joueur | 47.4 % | 37.0 % | 22.6 % |
| Victoires du 3e joueur | — | 30.4 % | 25.3 % |
| Victoires du 4e joueur | — | — | 37.5 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.90 | 0.61 |
| Cartes trashées | 2.02 | 0.93 |
| Cartes dans le deck à la fin | 7.88 | 8.68 |
| Cartes jouées par lignée | 3.91 | 3.71 |
| Tours par lignée | 5.07 | 4.72 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 5.26 | 3.15 |
| Effets Rouges choisis | 1.62 | 1.32 |
| Effets Rouges automatiques | 0.25 | 0.25 |
| Privilèges | 1.56 | 1.67 |
| Niveau d'Économie final | 1.68 | 1.82 |
| Niveau de Population final | 2.30 | 2.02 |

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

En moyenne, un vainqueur achète 0.90 carte(s) et un perdant 0.61.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Fonderie | 5 | 7.3 | 1.92 | 15.2 % | 3.4 % |
| Charrette | 3 | 7.3 | 1.14 | 9.0 % | 6.4 % |
| Caravane | 5 | 7.1 | 0.91 | 7.0 % | 7.2 % |
| Carrière | 4 | 7.0 | 1.24 | 9.4 % | 5.9 % |
| Grand Marché | 7 | 7.0 | 1.24 | 9.3 % | 5.8 % |
| Atelier de taille | 6 | 7.0 | 1.23 | 9.1 % | 5.9 % |
| Bourreau | 7 | 6.9 | 2.03 | 14.9 % | 2.9 % |
| Recyclage | 4 | 6.9 | 0.78 | 5.7 % | 7.4 % |
| Comptoir | 4 | 6.7 | 0.94 | 6.8 % | 6.7 % |
| Démolition | 5 | 5.9 | 0.46 | 2.8 % | 7.4 % |
| Forge | 3 | 1.2 | 0.35 ? | 0.3 % | 1.6 % |
| Haut-fourneau | 6 | 0.1 | 0.00 ? | 0.0 % | 0.2 % |
| Atelier | 3 | 0.1 | 0.00 ? | 0.0 % | 0.1 % |
| Trésorerie | 6 | 0.0 | 0.00 ? | 0.0 % | 0.1 % |
| Bibliothèque | 3 | 0.0 | 0.67 ? | 0.0 % | 0.0 % |
| Guilde | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Lingots | 3 | 0.0 | 1.33 ? | 0.0 % | 0.0 % |
| Chantier | 5 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Bloc de pierre | 3 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Entrepôt | 4 | 0.0 | 4.00 ? | 0.0 % | 0.0 % |
| Scriptorium | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Marché royal, Archives, Académie, Conseil, Cathédrale, Carrière de marbre, Mine profonde.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 2.02 cartes, un perdant 0.93.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 55.9 % | 1.5 | 38.9 % | 10.2 % | 44.1 % | 32.4 % |
| Base Érudit | 53.5 % | 1.8 | 24.2 % | 19.2 % | 78.4 % | 31.1 % |
| Base Pierre | 25.2 % | 2.7 | 5.8 % | 6.3 % | 93.7 % | 9.3 % |
| Érudit-Métal | 24.1 % | 2.8 | 4.9 % | 6.3 % | 75.9 % | 10.3 % |
| Base Métal | 11.3 % | 3.6 | 0.3 % | 2.8 % | 98.2 % | 2.2 % |
| Outil de pioche | 1.6 % | 5.3 | 0.0 % | 0.0 % | 98.4 % | 0.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 21.1 % | 10.1 % | 1.53 | 67.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 19.3 % | 8.9 % | 1.61 | 54.5 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 14.8 % | 12.1 % | 1.13 | 65.6 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 12.2 % | 15.0 % | 0.86 | 72.8 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 11.4 % | 14.5 % | 0.84 | 70.6 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 10.9 % | 8.8 % | 1.23 | 43.4 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 9.7 % | 16.0 % | 0.69 | 70.8 % |
| 5 | 1 blason Population supplémentaire | 9.5 % | 15.9 % | 0.69 | 74.0 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.5 % | 14.1 % | 0.76 | 62.2 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 9.0 % | 12.4 % | 0.84 | 55.1 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 8.7 % | 10.5 % | 0.93 | 51.1 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 8.0 % | 8.8 % | 1.03 | 35.6 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 5.0 % | 7.9 % | 0.80 | 30.4 % |
| 6 | 1 blason Économie supplémentaire | 3.4 % | 6.1 % | 0.75 | 24.1 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 2.4 % | 3.8 % | 0.85 | 17.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 0.8 % | 1.8 % | 0.63 | 13.2 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 1.8 % | 2.0 % | 0.68 | 1.68 | 1.82 | 4.9 % |
| Population | 44.3 % | 43.7 % | 1.30 | 2.30 | 2.02 | 5.8 % |
| Noblesse (Privilège) | 53.5 % | 54.2 % | 0.97 | 1.56 | 1.67 | 2.5 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.99 | 1.05 | 1.02 | 0.88 | 0.88 |
| Population | 1.48 | 0.71 | 0.87 | 1.33 | 1.86 |
| Privilèges | 1.17 | 1.05 | 0.90 | 1.07 | 1.10 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 4.90 | 5.23 |
| Base Pierre | 4.24 | 4.72 |
| Base Érudit | 2.16 | 3.18 |
| Érudit-Métal | 1.75 | 2.00 |
| Outil de pioche | 1.54 | 0.86 |
| Vente | 1.54 | 2.03 |
| Fonderie | 0.40 | 0.07 |
| Bourreau | 0.30 | 0.04 |
| Charrette | 0.24 | 0.15 |
| Atelier de taille | 0.24 | 0.11 |
| Carrière | 0.21 | 0.11 |
| Caravane | 0.19 | 0.16 |
| Grand Marché | 0.17 | 0.09 |
| Comptoir | 0.17 | 0.12 |
| Recyclage | 0.08 | 0.08 |
| Démolition | 0.03 | 0.07 |
| Forge | 0.00 | 0.00 |
| Bibliothèque | 0.00 | 0.00 |
| Lingots | 0.00 | 0.00 |
| Entrepôt | 0.00 | 0.00 |
