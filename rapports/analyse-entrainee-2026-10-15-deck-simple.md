# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 17.1 | 14.5 | 13.3 |
| Lignées du vainqueur | 6.4 | 5.8 | 5.6 |
| Victoires du 1er joueur | 42.9 % | 21.4 % | 13.4 % |
| Victoires du 2e joueur | 57.1 % | 49.9 % | 43.0 % |
| Victoires du 3e joueur | — | 28.6 % | 22.6 % |
| Victoires du 4e joueur | — | — | 21.1 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.19 | 0.14 |
| Cartes trashées | 5.24 | 4.33 |
| Cartes dans le deck à la fin | 3.95 | 4.81 |
| Cartes jouées par lignée | 1.65 | 1.88 |
| Tours par lignée | 2.51 | 2.71 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.07 | 0.00 |
| Effets Rouges choisis | 2.38 | 2.17 |
| Effets Rouges automatiques | 0.00 | 0.00 |
| Privilèges | 0.29 | 0.34 |
| Niveau d'Économie final | 2.22 | 2.11 |
| Niveau de Population final | 2.12 | 2.06 |

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

En moyenne, un vainqueur achète 0.19 carte(s) et un perdant 0.14.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 4.4 | 1.23 | 5.8 % | 3.7 % |
| Prison | 2 | 4.4 | 0.34 | 1.6 % | 5.8 % |
| Alchimiste royale | 6 | 4.3 | 2.05 | 9.4 % | 1.7 % |
| Mine | RR | 2.2 | 0.90 | 2.1 % | 2.3 % |
| Cardinal | 6 | 0.1 | 0.36 ? | 0.0 % | 0.1 % |
| Assassin | 4 | 0.1 | 0.51 ? | 0.0 % | 0.1 % |
| Tribunal | 4 | 0.1 | 0.00 ? | 0.0 % | 0.1 % |
| Forge | R | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Bibliothécaire | 2R | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Remouleur ambulant, Banque, Halle des négociants, Cabinet d'architecte, Contremaître, Carrière, Ferme, Chancellerie, Moulin, Apothicairerie, Sapeur, Comptoir maritime, Hôtel des impôts, Loge des bâtisseurs, Aqueduc, Roi, Hôpital, Mairie, Démolisseur, Maison du commerce, Archiviste royale, Cour du roi, Ambassade, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.24 cartes, un perdant 4.33.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Base Érudit | 99.4 % | 2.0 | 42.4 % | 28.7 % | 22.1 % | 96.7 % |
| Outil de pioche | 86.6 % | 2.3 | 31.3 % | 21.5 % | 13.4 % | 88.4 % |
| Vente | 83.5 % | 3.2 | 13.0 % | 15.3 % | 16.4 % | 71.2 % |
| Base Pierre | 93.5 % | 3.4 | 11.8 % | 18.0 % | 63.8 % | 71.7 % |
| Base Métal | 35.9 % | 4.4 | 1.5 % | 4.1 % | 94.6 % | 19.5 % |
| Outil de trash | 5.9 % | 5.3 | 0.0 % | 0.0 % | 94.2 % | 1.0 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 4.6 % | 3.3 % | 1.16 | 98.4 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 4.0 % | 2.7 % | 1.18 | 96.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 3.7 % | 1.5 % | 1.63 | 95.0 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 3.3 % | 3.2 % | 0.97 | 96.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 3.2 % | 5.2 % | 0.65 | 97.7 % |
| 5 | 1 blason Population supplémentaire | 2.4 % | 6.1 % | 0.45 | 98.4 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 2.3 % | 3.1 % | 0.76 | 95.5 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 2.0 % | 1.8 % | 1.02 | 93.8 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 1.0 % | 1.8 % | 0.66 | 98.6 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 0.9 % | 1.4 % | 0.70 | 82.2 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 0.5 % | 1.3 % | 0.48 | 84.4 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 0.4 % | 0.9 % | 0.46 ? | 77.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.3 % | 0.1 % | 1.58 ? | 69.0 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.2 % | 0.6 % | 0.46 ? | 90.1 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.1 % | 0.4 % | 0.46 ? | 74.5 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.1 % | 0.22 ? | 92.3 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | 0.00 ? | 75.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 58.4 % | 37.0 % | 1.65 | 2.22 | 2.11 | 0.7 % |
| Population | 28.1 % | 49.0 % | 1.12 | 2.12 | 2.06 | 3.6 % |
| Noblesse (Privilège) | 13.5 % | 13.9 % | 0.22 | 0.29 | 0.34 | 0.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.21 ? | 0.33 | 1.03 | 1.03 | 1.38 ? |
| Population | 1.36 | 0.65 | 1.09 | 0.78 | 1.14 |
| Privilèges | 1.07 | 0.87 | 0.70 | 1.25 ? | — |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 3.87 | 3.79 |
| Outil de trash | 2.24 | 1.92 |
| Base Pierre | 2.13 | 2.31 |
| Vente | 0.72 | 0.98 |
| Base Érudit | 0.34 | 0.43 |
| Alchimiste royale | 0.26 | 0.03 |
| Maître fondeur | 0.15 | 0.07 |
| Outil de pioche | 0.07 | 0.00 |
| Mine | 0.03 | 0.03 |
| Prison | 0.01 | 0.02 |
| Cardinal | 0.00 | 0.00 |
| Assassin | 0.00 | 0.00 |
| Tribunal | 0.00 | 0.00 |
| Bibliothécaire | 0.00 | 0.00 |
| Forge | 0.00 | 0.00 |
