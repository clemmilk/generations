# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

17613 joueurs observés, dont 5836 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1874 / 2000 | 1983 / 2000 | 1979 / 2000 |
| Tours de table du vainqueur | 55.4 | 38.8 | 45.0 |
| Lignées du vainqueur | 10.8 | 8.1 | 9.4 |
| Victoires du 1er joueur | 47.9 % | 30.0 % | 22.5 % |
| Victoires du 2e joueur | 52.1 % | 38.8 % | 26.9 % |
| Victoires du 3e joueur | — | 31.3 % | 23.0 % |
| Victoires du 4e joueur | — | — | 27.5 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 1.00 | 0.65 |
| Cartes trashées | 3.76 | 1.68 |
| Cartes dans le deck à la fin | 6.24 | 7.97 |
| Cartes jouées par lignée | 3.42 | 3.40 |
| Tours par lignée | 4.56 | 4.40 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 6.08 | 4.89 |
| Effets Rouges choisis | 3.72 | 3.50 |
| Effets Rouges automatiques | 0.83 | 0.89 |
| Privilèges | 2.23 | 2.32 |
| Niveau d'Économie final | 3.59 | 3.43 |
| Niveau de Population final | 3.39 | 3.10 |

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

En moyenne, un vainqueur achète 1.00 carte(s) et un perdant 0.65.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Mine | RR | 6.8 | 1.84 | 13.3 % | 3.5 % |
| Alchimiste royale | 6 | 6.4 | 2.24 | 15.4 % | 1.9 % |
| Sapeur | RR | 6.3 | 1.07 | 7.0 % | 5.8 % |
| Maître fondeur | 4 | 6.3 | 1.87 | 12.5 % | 3.1 % |
| Assassin | 4 | 6.3 | 1.32 | 8.6 % | 4.9 % |
| Prison | 2 | 6.2 | 0.78 | 5.1 % | 6.7 % |
| Tribunal | 4 | 6.2 | 0.77 | 5.1 % | 6.7 % |
| Cardinal | 6 | 6.1 | 0.97 | 6.1 % | 6.0 % |
| Bibliothécaire | 2R | 6.0 | 0.87 | 5.3 % | 6.2 % |
| Hôtel des impôts | 4 | 6.0 | 0.90 | 5.5 % | 6.0 % |
| Archiviste royale | 7 | 5.4 | 1.05 | 6.0 % | 5.1 % |
| Mairie | RR | 3.5 | 1.03 | 3.5 % | 3.4 % |
| Remouleur ambulant | 2 | 1.7 | 0.68 | 1.0 % | 1.9 % |
| Apothicairerie | 2R | 1.2 | 1.00 | 1.1 % | 1.3 % |
| Halle des négociants | 2 | 0.6 | 0.84 ? | 0.5 % | 0.7 % |
| Carrière | R | 0.6 | 0.61 ? | 0.3 % | 0.6 % |
| Ambassade | RRR | 0.4 | 1.17 ? | 0.4 % | 0.3 % |
| Hôpital | RR | 0.2 | 1.32 ? | 0.2 % | 0.2 % |
| Contremaître | 3 | 0.2 | 0.69 ? | 0.1 % | 0.2 % |
| Comptoir maritime | 5 | 0.2 | 1.04 ? | 0.2 % | 0.2 % |
| Forge | R | 0.1 | 1.19 ? | 0.1 % | 0.1 % |
| Ferme | 3 | 0.1 | 1.25 ? | 0.1 % | 0.1 % |
| Moulin | RR | 0.0 | 0.92 ? | 0.0 % | 0.0 % |
| Maison du commerce | 7 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |
| Loge des bâtisseurs | 5 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Cabinet d'architecte, Chancellerie, Aqueduc, Roi, Démolisseur, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 3.76 cartes, un perdant 1.68.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Vente | 71.1 % | 2.2 | 32.7 % | 12.3 % | 28.9 % | 41.6 % |
| Base Érudit | 65.8 % | 2.3 | 22.8 % | 16.8 % | 61.0 % | 38.0 % |
| Outil de pioche | 60.7 % | 2.4 | 20.3 % | 15.6 % | 39.3 % | 32.9 % |
| Base Métal | 58.9 % | 3.0 | 8.1 % | 17.6 % | 72.6 % | 26.1 % |
| Base Pierre | 32.4 % | 4.1 | 1.1 % | 6.9 % | 89.9 % | 8.7 % |
| Érudit-Métal | 8.0 % | 5.7 | 0.0 % | 0.1 % | 92.0 % | 1.7 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 0.0 %, Commerce 0.0 %, Diplomatie 0.0 %, Économie 0.0 %, Histoire 0.0 %, Éducation 0.0 %, Religion 0.0 %, Production 0.0 %, Science 0.0 %, Progrès 0.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 24.8 % | 11.3 % | 1.54 | 45.0 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 23.1 % | 14.2 % | 1.32 | 52.5 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 22.4 % | 13.0 % | 1.38 | 41.4 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 15.2 % | 17.0 % | 0.91 | 56.6 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 15.2 % | 12.9 % | 1.13 | 25.3 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 15.1 % | 16.7 % | 0.91 | 60.4 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 14.7 % | 17.2 % | 0.88 | 56.2 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 14.7 % | 14.9 % | 0.99 | 38.9 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 13.5 % | 13.7 % | 1.01 | 35.3 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 13.0 % | 18.1 % | 0.78 | 61.4 % |
| 5 | 1 blason Population supplémentaire | 12.6 % | 18.5 % | 0.75 | 59.4 % |
| 7 | 1 blason Noblesse supplémentaire | 10.1 % | 13.5 % | 0.85 | 21.6 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 8.6 % | 11.0 % | 0.90 | 20.1 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 7.6 % | 20.8 % | 0.46 | 49.7 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 6.3 % | 10.1 % | 0.78 | 12.5 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 4.5 % | 6.3 % | 0.89 | 8.6 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 1.7 % | 3.0 % | 0.77 | 4.6 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 5.8 % | 1.1 % | 1.05 | 3.59 | 3.43 | 65.3 % |
| Population | 35.5 % | 33.4 % | 1.09 | 3.39 | 3.10 | 62.4 % |
| Noblesse (Privilège) | 58.7 % | 65.5 % | 0.86 | 2.23 | 2.32 | 12.5 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.54 ? | 0.68 | 0.90 | 1.10 |
| Population | 0.39 | 0.48 | 1.04 | 0.95 | 1.11 |
| Privilèges | 1.33 ? | 1.31 | 0.84 | 0.98 | 1.07 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Base Pierre | 9.40 | 9.37 |
| Base Métal | 7.77 | 7.97 |
| Base Érudit | 5.76 | 5.92 |
| Érudit-Métal | 5.23 | 5.24 |
| Vente | 1.92 | 2.48 |
| Outil de pioche | 1.81 | 1.75 |
| Alchimiste royale | 0.61 | 0.05 |
| Maître fondeur | 0.49 | 0.07 |
| Mine | 0.47 | 0.10 |
| Sapeur | 0.38 | 0.28 |
| Cardinal | 0.34 | 0.24 |
| Bibliothécaire | 0.33 | 0.28 |
| Hôtel des impôts | 0.29 | 0.23 |
| Archiviste royale | 0.26 | 0.17 |
| Assassin | 0.24 | 0.10 |
| Mairie | 0.11 | 0.12 |
| Prison | 0.09 | 0.08 |
| Tribunal | 0.07 | 0.05 |
| Remouleur ambulant | 0.04 | 0.05 |
| Apothicairerie | 0.03 | 0.06 |
