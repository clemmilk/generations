# Analyse des parties entre IA — 2026-10-15

Bot : **IA entraînée** à tous les sièges. 3000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 3000.

27000 joueurs observés, dont 9000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 3000 / 3000 | 3000 / 3000 | 3000 / 3000 |
| Tours de table du vainqueur | 25.3 | 20.2 | 17.2 |
| Lignées du vainqueur | 8.0 | 7.2 | 6.7 |
| Victoires du 1er joueur | 49.7 % | 33.3 % | 19.5 % |
| Victoires du 2e joueur | 50.3 % | 33.2 % | 24.3 % |
| Victoires du 3e joueur | — | 33.5 % | 25.8 % |
| Victoires du 4e joueur | — | — | 30.4 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.68 | 0.60 |
| Cartes trashées | 7.51 | 6.00 |
| Cartes dans le deck à la fin | 4.16 | 5.60 |
| Cartes jouées par lignée | 1.93 | 2.08 |
| Tours par lignée | 2.84 | 2.96 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.19 | 0.08 |
| Effets Rouges choisis | 4.29 | 4.15 |
| Effets Rouges automatiques | 8.33 | 8.85 |
| Privilèges | 1.28 | 1.26 |
| Niveau d'Économie final | 2.80 | 2.51 |
| Niveau de Population final | 2.80 | 2.52 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 5397 | 1.37 | 1.23 | 1.42 | 1.45 | 71.9 % |
| Justice | 5411 | 1.10 | 1.12 | 1.06 | 1.12 | 67.6 % |
| Commerce | 5445 | 1.07 | 1.13 | 1.06 | 1.02 | 64.2 % |
| Progrès | 5556 | 0.97 | 0.92 | 0.93 | 1.07 | 71.3 % |
| Production | 5310 | 0.97 | 0.95 | 0.98 | 0.98 | 36.4 % |
| Diplomatie | 5316 | 0.95 | 0.94 | 0.96 | 0.94 | 36.0 % |
| Économie | 5429 | 0.93 | 0.92 | 0.97 | 0.89 | 32.5 % |
| Éducation | 5349 | 0.91 | 0.95 | 0.91 | 0.87 | 10.4 % |
| Science | 5364 | 0.87 | 0.92 | 0.86 | 0.83 | 7.8 % |
| Religion | 5423 | 0.85 | 0.89 | 0.84 | 0.83 | 6.9 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.68 carte(s) et un perdant 0.60.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Prison | 2 | 6.0 | 0.60 | 2.7 % | 6.5 % |
| Maître fondeur | 4 | 6.0 | 1.31 | 7.1 % | 4.2 % |
| Forge | R | 5.8 | 0.81 | 3.4 % | 4.8 % |
| Contremaître | 3 | 5.8 | 0.90 | 4.7 % | 5.3 % |
| Mine | RR | 5.8 | 0.95 | 4.7 % | 5.1 % |
| Alchimiste royale | 6 | 5.5 | 2.31 | 13.6 % | 1.3 % |
| Halle des négociants | 2 | 5.3 | 0.82 | 2.6 % | 4.0 % |
| Moulin | RR | 5.2 | 0.84 | 3.4 % | 4.6 % |
| Comptoir maritime | 5 | 4.1 | 0.79 | 2.6 % | 3.8 % |
| Ambassade | RRR | 3.7 | 1.08 | 4.1 % | 3.4 % |
| Carrière | R | 3.2 | 0.71 | 1.6 % | 3.0 % |
| Sapeur | RR | 2.8 | 0.88 | 2.0 % | 2.4 % |
| Maison du commerce | 7 | 1.0 | 0.68 | 0.6 % | 1.1 % |
| Cabinet d'architecte | R | 0.5 | 0.60 ? | 0.1 % | 0.4 % |
| Remouleur ambulant | 2 | 0.5 | 0.83 ? | 0.3 % | 0.3 % |
| Ferme | 3 | 0.5 | 1.25 ? | 0.5 % | 0.3 % |
| Cardinal | 6 | 0.5 | 0.94 ? | 0.4 % | 0.4 % |
| Aqueduc | 5 | 0.3 | 0.70 ? | 0.2 % | 0.3 % |
| Mairie | RR | 0.1 | 0.56 ? | 0.1 % | 0.1 % |
| Bibliothécaire | 2R | 0.0 | 0.44 ? | 0.0 % | 0.1 % |
| Hôtel des impôts | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Assassin, Chancellerie, Tribunal, Apothicairerie, Loge des bâtisseurs, Roi, Hôpital, Démolisseur, Archiviste royale, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.51 cartes, un perdant 6.00.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 92.9 % | 3.2 | 25.4 % | 16.6 % | 7.1 % | 86.3 % |
| Cachot | 87.6 % | 3.4 | 19.6 % | 14.8 % | 12.4 % | 80.7 % |
| Colporteur | 88.1 % | 3.7 | 15.4 % | 15.2 % | 11.9 % | 77.5 % |
| Imprimeur | 85.8 % | 4.1 | 10.3 % | 12.5 % | 14.2 % | 69.2 % |
| Épicerie | 80.7 % | 4.5 | 7.8 % | 9.1 % | 19.3 % | 59.7 % |
| Ferrailleur | 75.8 % | 4.8 | 5.0 % | 9.0 % | 24.2 % | 54.8 % |
| Salle du trésor | 56.9 % | 5.5 | 2.8 % | 4.9 % | 43.1 % | 35.7 % |
| Forgeron | 46.1 % | 5.8 | 0.9 % | 3.8 % | 53.9 % | 30.1 % |
| Tour de guet | 11.3 % | 6.3 | 0.0 % | 0.0 % | 88.7 % | 2.3 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Religion 93.1 %, Science 92.2 %, Éducation 89.6 %, Économie 67.5 %, Diplomatie 64.0 %, Production 63.6 %, Commerce 35.8 %, Justice 32.4 %, Progrès 28.7 %, Histoire 28.1 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 16.6 % | 8.2 % | 1.45 | 80.6 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 13.2 % | 10.2 % | 1.14 | 82.7 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 11.9 % | 10.8 % | 1.02 | 84.5 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 11.5 % | 10.5 % | 1.02 | 79.3 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 10.6 % | 12.5 % | 0.85 | 82.7 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 9.7 % | 10.2 % | 0.95 | 75.8 % |
| 5 | 1 blason Population supplémentaire | 8.9 % | 11.2 % | 0.83 | 78.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.0 % | 6.7 % | 1.13 | 54.9 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 7.4 % | 8.6 % | 0.91 | 73.3 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 7.3 % | 7.8 % | 0.95 | 63.9 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 7.0 % | 10.5 % | 0.75 | 70.9 % |
| 20 | Toutes les cartes de la pioche commune coûtent 1 Ressourc… | 5.1 % | 6.9 % | 0.82 | 54.7 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 4.0 % | 5.0 % | 0.89 | 50.3 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 2.8 % | 2.7 % | 1.05 | 45.5 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 2.4 % | 3.0 % | 0.86 | 43.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 1.3 % | 1.2 % | 1.11 | 41.2 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.4 % | 0.4 % | 0.97 ? | 29.9 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 7 | 1 blason Noblesse supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 14.7 % | 9.8 % | 1.10 | 2.80 | 2.51 | 19.9 % |
| Population | 42.4 % | 44.5 % | 1.17 | 2.80 | 2.52 | 27.8 % |
| Noblesse (Privilège) | 42.9 % | 45.7 % | 0.73 | 1.28 | 1.26 | 1.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.00 ? | 0.52 | 0.89 | 1.07 | 1.19 |
| Population | 0.78 | 0.54 | 1.05 | 0.89 | 1.25 |
| Privilèges | 1.15 | 1.00 | 0.93 | 1.03 | 1.45 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.54 | 2.40 |
| Forgeron | 2.24 | 2.00 |
| Salle du trésor | 1.54 | 1.64 |
| Ferrailleur | 1.32 | 1.49 |
| Histoire | 0.70 | 0.36 |
| Épicerie | 0.63 | 0.77 |
| Commerce | 0.52 | 0.42 |
| Justice | 0.48 | 0.37 |
| Progrès | 0.44 | 0.45 |
| Alchimiste royale | 0.44 | 0.03 |
| Colporteur | 0.41 | 0.50 |
| Marché | 0.36 | 0.41 |
| Maître fondeur | 0.28 | 0.12 |
| Diplomatie | 0.27 | 0.28 |
| Production | 0.27 | 0.27 |
| Économie | 0.23 | 0.26 |
| Imprimeur | 0.20 | 0.31 |
| Contremaître | 0.19 | 0.16 |
| Cachot | 0.16 | 0.11 |
| Forge | 0.15 | 0.15 |
