# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 1000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 1000.

6877 joueurs observés, dont 2269 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 723 / 1000 | 753 / 1000 | 793 / 1000 |
| Tours de table du vainqueur | 43.9 | 42.3 | 43.3 |
| Lignées du vainqueur | 11.8 | 11.4 | 11.5 |
| Victoires du 1er joueur | 50.5 % | 24.4 % | 20.7 % |
| Victoires du 2e joueur | 49.5 % | 36.8 % | 20.7 % |
| Victoires du 3e joueur | — | 38.8 % | 30.0 % |
| Victoires du 4e joueur | — | — | 28.6 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.33 | 0.92 |
| Cartes trashées | 5.70 | 2.66 |
| Cartes dans le deck à la fin | 4.63 | 7.26 |
| Cartes jouées par lignée | 2.37 | 2.63 |
| Tours par lignée | 3.40 | 3.62 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.20 | 0.02 |
| Effets Rouges choisis | 0.82 | 1.15 |
| Effets Rouges automatiques | 1.57 | 1.73 |
| Privilèges | 1.43 | 1.61 |
| Niveau d'Économie final | 3.18 | 3.02 |
| Niveau de Population final | 3.39 | 3.27 |

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

En moyenne, un vainqueur achète 1.33 carte(s) et un perdant 0.92.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Mine | RR | 9.4 | 1.65 | 16.6 % | 5.8 % |
| Maître fondeur | 4 | 9.2 | 2.31 | 22.7 % | 2.5 % |
| Prison | 2 | 9.0 | 0.76 | 7.3 % | 9.8 % |
| Tribunal | 4 | 8.8 | 0.60 | 5.6 % | 10.4 % |
| Alchimiste royale | 6 | 8.8 | 2.39 | 22.7 % | 2.0 % |
| Assassin | 4 | 8.5 | 1.81 | 16.0 % | 4.5 % |
| Cardinal | 6 | 6.9 | 0.71 | 5.1 % | 7.7 % |
| Contremaître | 3 | 6.7 | 0.63 | 4.1 % | 7.6 % |
| Sapeur | RR | 6.1 | 0.81 | 4.8 % | 6.5 % |
| Bibliothécaire | 2R | 5.7 | 0.77 | 4.3 % | 6.3 % |
| Forge | R | 5.0 | 0.80 | 3.7 % | 5.4 % |
| Ambassade | RRR | 4.9 | 0.63 | 3.0 % | 5.8 % |
| Moulin | RR | 3.5 | 0.88 | 2.6 % | 3.5 % |
| Hôtel des impôts | 4 | 3.0 | 0.87 | 2.5 % | 3.1 % |
| Mairie | RR | 2.2 | 0.88 ? | 1.7 % | 2.2 % |
| Carrière | R | 2.1 | 0.90 ? | 1.4 % | 2.0 % |
| Halle des négociants | 2 | 2.1 | 0.83 ? | 0.8 % | 1.8 % |
| Remouleur ambulant | 2 | 1.6 | 0.61 ? | 0.5 % | 1.7 % |
| Ferme | 3 | 0.7 | 1.09 ? | 0.4 % | 0.4 % |
| Apothicairerie | 2R | 0.5 | 1.02 ? | 0.2 % | 0.4 % |
| Comptoir maritime | 5 | 0.5 | 1.33 ? | 0.4 % | 0.4 % |
| Cabinet d'architecte | R | 0.3 | 0.85 ? | 0.0 % | 0.1 % |
| Aqueduc | 5 | 0.2 | 1.57 ? | 0.3 % | 0.1 % |
| Archiviste royale | 7 | 0.1 | 2.12 ? | 0.2 % | 0.1 % |
| Maison du commerce | 7 | 0.0 | 1.85 ? | 0.1 % | 0.0 % |
| Hôpital | RR | 0.0 | 4.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Chancellerie, Loge des bâtisseurs, Roi, Démolisseur, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.70 cartes, un perdant 2.66.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Base Érudit | 99.6 % | 2.1 | 42.8 % | 28.9 % | 16.2 % | 68.3 % |
| Outil de pioche | 89.0 % | 2.3 | 37.9 % | 14.9 % | 11.0 % | 63.5 % |
| Base Pierre | 87.3 % | 3.4 | 9.7 % | 20.3 % | 57.2 % | 33.2 % |
| Vente | 78.2 % | 3.7 | 8.4 % | 11.2 % | 21.8 % | 33.3 % |
| Érudit-Métal | 45.2 % | 4.4 | 1.1 % | 7.8 % | 54.8 % | 12.4 % |
| Base Métal | 30.1 % | 5.0 | 0.0 % | 3.9 % | 92.4 % | 6.9 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.2 % | 9.2 % | 1.37 | 60.9 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 13.7 % | 12.1 % | 1.07 | 66.7 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 12.6 % | 12.0 % | 1.02 | 69.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 12.6 % | 12.5 % | 0.96 | 76.0 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 11.7 % | 12.9 % | 0.93 | 74.0 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.6 % | 13.8 % | 0.81 | 73.7 % |
| 5 | 1 blason Population supplémentaire | 10.0 % | 13.8 % | 0.77 | 76.1 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 9.6 % | 8.7 % | 1.09 | 57.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 9.4 % | 10.8 % | 0.95 | 61.0 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 8.0 % | 8.6 % | 1.01 | 56.9 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 6.8 % | 15.0 % | 0.55 | 70.2 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 5.9 % | 6.5 % | 1.03 | 33.9 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 5.9 % | 10.5 % | 0.69 | 38.5 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 4.9 % | 6.7 % | 0.89 | 32.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 3.4 % | 4.5 % | 0.93 | 23.0 % |
| 6 | 1 blason Économie supplémentaire | 1.5 % | 2.2 % | 0.87 ? | 20.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 0.7 % | 1.0 % | 0.93 ? | 19.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 16.0 % | 2.7 % | 1.09 | 3.18 | 3.02 | 38.2 % |
| Population | 47.4 % | 49.9 % | 1.28 | 3.39 | 3.27 | 59.1 % |
| Noblesse (Privilège) | 36.6 % | 47.4 % | 0.63 | 1.43 | 1.61 | 4.2 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.46 ? | 0.78 | 1.07 | 1.10 |
| Population | 0.42 | 0.83 | 0.92 | 1.19 | 0.99 |
| Privilèges | 1.82 | 1.07 | 0.76 | 1.02 | 1.15 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 10.53 | 10.74 |
| Base Pierre | 5.93 | 7.05 |
| Érudit-Métal | 4.09 | 4.46 |
| Vente | 3.29 | 3.98 |
| Base Érudit | 1.83 | 2.62 |
| Maître fondeur | 1.00 | 0.07 |
| Alchimiste royale | 0.98 | 0.06 |
| Mine | 0.58 | 0.19 |
| Assassin | 0.44 | 0.05 |
| Sapeur | 0.30 | 0.29 |
| Cardinal | 0.30 | 0.26 |
| Contremaître | 0.26 | 0.34 |
| Forge | 0.22 | 0.24 |
| Prison | 0.20 | 0.16 |
| Bibliothécaire | 0.19 | 0.16 |
| Hôtel des impôts | 0.17 | 0.11 |
| Ambassade | 0.14 | 0.28 |
| Moulin | 0.13 | 0.10 |
| Mairie | 0.12 | 0.08 |
| Tribunal | 0.12 | 0.11 |
