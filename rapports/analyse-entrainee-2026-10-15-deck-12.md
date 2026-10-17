# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17998 joueurs observés, dont 5999 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1999 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 32.5 | 29.0 | 27.2 |
| Lignées du vainqueur | 11.0 | 10.5 | 10.3 |
| Victoires du 1er joueur | 49.6 % | 31.1 % | 21.9 % |
| Victoires du 2e joueur | 50.4 % | 37.3 % | 25.8 % |
| Victoires du 3e joueur | — | 31.6 % | 24.1 % |
| Victoires du 4e joueur | — | — | 28.2 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.75 | 0.74 |
| Cartes trashées | 8.93 | 6.62 |
| Cartes dans le deck à la fin | 3.82 | 6.11 |
| Cartes jouées par lignée | 1.81 | 2.15 |
| Tours par lignée | 2.79 | 3.12 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.06 | 0.01 |
| Effets Rouges choisis | 2.72 | 2.52 |
| Effets Rouges automatiques | 0.66 | 0.59 |
| Privilèges | 1.28 | 1.39 |
| Niveau d'Économie final | 2.65 | 2.77 |
| Niveau de Population final | 2.16 | 2.66 |

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

En moyenne, un vainqueur achète 0.75 carte(s) et un perdant 0.74.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Mine | RR | 6.4 | 1.18 | 7.9 % | 5.5 % |
| Cardinal | 6 | 6.2 | 0.62 | 4.1 % | 7.2 % |
| Maître fondeur | 4 | 6.2 | 1.69 | 11.1 % | 3.6 % |
| Tribunal | 4 | 6.1 | 0.51 | 3.3 % | 7.5 % |
| Assassin | 4 | 6.0 | 1.22 | 7.2 % | 5.0 % |
| Alchimiste royale | 6 | 5.9 | 2.24 | 14.0 % | 1.8 % |
| Prison | 2 | 5.8 | 0.81 | 5.0 % | 6.2 % |
| Contremaître | 3 | 5.7 | 0.76 | 3.2 % | 5.9 % |
| Sapeur | RR | 4.7 | 0.54 | 2.1 % | 5.5 % |
| Bibliothécaire | 2R | 4.6 | 0.75 | 2.9 % | 4.9 % |
| Forge | R | 4.4 | 0.65 | 2.1 % | 4.8 % |
| Hôtel des impôts | 4 | 3.0 | 0.91 | 2.1 % | 2.8 % |
| Ambassade | RRR | 2.7 | 0.65 | 1.5 % | 3.1 % |
| Carrière | R | 1.8 | 0.45 | 0.7 % | 2.1 % |
| Moulin | RR | 1.6 | 0.48 | 0.4 % | 1.7 % |
| Mairie | RR | 0.9 | 0.59 ? | 0.4 % | 1.0 % |
| Remouleur ambulant | 2 | 0.8 | 0.52 ? | 0.2 % | 0.8 % |
| Halle des négociants | 2 | 0.7 | 0.46 ? | 0.1 % | 0.7 % |
| Apothicairerie | 2R | 0.2 | 0.42 ? | 0.0 % | 0.1 % |
| Cabinet d'architecte | R | 0.2 | 0.00 ? | 0.0 % | 0.1 % |
| Comptoir maritime | 5 | 0.1 | 0.29 ? | 0.0 % | 0.1 % |
| Ferme | 3 | 0.1 | 0.24 ? | 0.0 % | 0.1 % |
| Hôpital | RR | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Aqueduc | 5 | 0.0 | 0.67 ? | 0.0 % | 0.0 % |
| Maison du commerce | 7 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Archiviste royale | 7 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Chancellerie, Loge des bâtisseurs, Roi, Démolisseur, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 8.93 cartes, un perdant 6.62.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Base Érudit | 99.9 % | 2.8 | 28.3 % | 21.5 % | 7.8 % | 97.9 % |
| Fardeau | 98.2 % | 3.3 | 25.0 % | 17.2 % | 1.8 % | 94.2 % |
| Outil de pioche | 94.4 % | 3.6 | 18.4 % | 15.9 % | 5.6 % | 91.0 % |
| Base Pierre | 97.4 % | 4.8 | 7.8 % | 13.0 % | 32.9 % | 72.2 % |
| Érudit-Pierre | 92.7 % | 4.9 | 9.0 % | 10.2 % | 7.3 % | 75.3 % |
| Vente | 91.2 % | 5.1 | 8.6 % | 8.5 % | 8.8 % | 71.3 % |
| Érudit-Métal | 64.8 % | 6.6 | 2.0 % | 4.6 % | 35.2 % | 29.2 % |
| Base Métal | 58.0 % | 6.7 | 0.9 % | 4.4 % | 79.7 % | 19.3 % |
| Outil de trash | 10.3 % | 7.7 | 0.0 % | 0.0 % | 89.7 % | 1.7 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 22.7 % | 5.7 % | 1.94 | 79.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.4 % | 10.6 % | 1.22 | 81.3 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 14.1 % | 10.5 % | 1.17 | 83.0 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 13.1 % | 11.2 % | 1.08 | 81.1 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 8.6 % | 10.2 % | 0.89 | 71.8 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 8.0 % | 12.5 % | 0.72 | 78.5 % |
| 5 | 1 blason Population supplémentaire | 6.6 % | 13.8 % | 0.56 | 83.3 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 6.5 % | 10.4 % | 0.72 | 69.3 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 6.4 % | 9.3 % | 0.77 | 66.6 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 6.3 % | 12.7 % | 0.60 | 74.9 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 5.4 % | 7.9 % | 0.80 | 63.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 4.1 % | 8.0 % | 0.64 | 51.3 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 3.6 % | 6.9 % | 0.64 | 46.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 3.1 % | 2.6 % | 1.24 | 40.4 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 2.3 % | 5.0 % | 0.60 | 42.5 % |
| 6 | 1 blason Économie supplémentaire | 0.8 % | 1.6 % | 0.69 | 37.7 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 0.5 % | 0.6 % | 1.01 ? | 32.4 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 15.9 % | 8.5 % | 1.21 | 2.65 | 2.77 | 13.9 % |
| Population | 30.4 % | 40.4 % | 0.97 | 2.16 | 2.66 | 14.3 % |
| Noblesse (Privilège) | 53.8 % | 51.1 % | 0.82 | 1.28 | 1.39 | 1.2 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.83 ? | 1.21 | 0.86 | 0.86 |
| Population | 2.21 | 1.93 | 1.01 | 0.71 | 0.82 |
| Privilèges | 1.38 | 1.07 | 0.82 | 0.76 | 0.88 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Métal | 5.53 | 5.90 |
| Outil de trash | 4.04 | 3.12 |
| Base Pierre | 2.45 | 3.04 |
| Érudit-Métal | 1.99 | 2.25 |
| Vente | 1.11 | 1.53 |
| Érudit-Pierre | 0.76 | 0.91 |
| Base Érudit | 0.74 | 0.90 |
| Alchimiste royale | 0.62 | 0.05 |
| Maître fondeur | 0.49 | 0.11 |
| Mine | 0.32 | 0.19 |
| Contremaître | 0.18 | 0.23 |
| Assassin | 0.16 | 0.08 |
| Cardinal | 0.10 | 0.18 |
| Hôtel des impôts | 0.09 | 0.09 |
| Sapeur | 0.08 | 0.15 |
| Prison | 0.08 | 0.07 |
| Forge | 0.08 | 0.13 |
| Bibliothécaire | 0.07 | 0.09 |
| Outil de pioche | 0.07 | 0.04 |
| Ambassade | 0.06 | 0.08 |
