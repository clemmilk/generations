# Analyse des parties entre IA — 2026-10-14

Bot : **IA entraînée** à tous les sièges. 3000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 3000.

27000 joueurs observés, dont 9000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 3000 / 3000 | 3000 / 3000 | 3000 / 3000 |
| Tours de table du vainqueur | 24.3 | 19.4 | 16.3 |
| Lignées du vainqueur | 7.2 | 6.5 | 6.0 |
| Victoires du 1er joueur | 50.3 % | 34.4 % | 21.7 % |
| Victoires du 2e joueur | 49.7 % | 33.5 % | 22.6 % |
| Victoires du 3e joueur | — | 32.2 % | 24.6 % |
| Victoires du 4e joueur | — | — | 31.2 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 0.65 | 0.60 |
| Cartes trashées | 7.01 | 5.66 |
| Cartes dans le deck à la fin | 4.64 | 5.94 |
| Cartes jouées par lignée | 2.10 | 2.21 |
| Tours par lignée | 3.04 | 3.14 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 1.55 | 0.81 |
| Effets Rouges choisis | 3.80 | 3.66 |
| Effets Rouges automatiques | 7.41 | 8.05 |
| Privilèges | 1.13 | 1.08 |
| Niveau d'Économie final | 3.49 | 3.43 |
| Niveau de Population final | 3.14 | 2.80 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 5397 | 1.50 | 1.37 | 1.54 | 1.60 | 88.1 % |
| Commerce | 5445 | 1.12 | 1.10 | 1.17 | 1.10 | 76.0 % |
| Justice | 5411 | 1.08 | 1.09 | 1.06 | 1.09 | 74.2 % |
| Économie | 5429 | 0.98 | 0.96 | 1.01 | 0.97 | 69.4 % |
| Production | 5310 | 0.94 | 0.97 | 0.90 | 0.96 | 39.9 % |
| Progrès | 5556 | 0.92 | 0.88 | 0.95 | 0.95 | 45.4 % |
| Diplomatie | 5316 | 0.91 | 0.93 | 0.90 | 0.90 | 39.4 % |
| Éducation | 5349 | 0.88 | 0.93 | 0.86 | 0.86 | 11.8 % |
| Religion | 5423 | 0.83 | 0.92 | 0.78 | 0.79 | 11.9 % |
| Science | 5364 | 0.82 | 0.85 | 0.82 | 0.80 | 10.4 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 0.65 carte(s) et un perdant 0.60.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Maître fondeur | 4 | 5.9 | 1.05 | 5.8 % | 5.3 % |
| Contremaître | 3 | 5.8 | 0.92 | 5.6 % | 5.8 % |
| Aqueduc | 5 | 5.4 | 1.05 | 5.9 % | 5.0 % |
| Alchimiste royale | 6 | 5.4 | 1.93 | 11.3 % | 2.4 % |
| Comptoir maritime | 5 | 5.4 | 0.80 | 4.6 % | 5.7 % |
| Maison du commerce | 7 | 5.3 | 0.83 | 4.7 % | 5.5 % |
| Forge | R | 5.3 | 0.76 | 3.3 % | 5.1 % |
| Prison | 2 | 5.2 | 0.61 | 2.4 % | 5.3 % |
| Mine | RR | 4.8 | 0.84 | 3.7 % | 4.9 % |
| Ambassade | RRR | 4.3 | 1.05 | 4.9 % | 4.0 % |
| Ferme | 3 | 3.8 | 0.79 | 2.8 % | 3.8 % |
| Sapeur | RR | 2.7 | 0.82 | 2.4 % | 2.7 % |
| Halle des négociants | 2 | 1.8 | 0.78 | 1.0 % | 1.5 % |
| Remouleur ambulant | 2 | 0.5 | 0.94 ? | 0.4 % | 0.4 % |
| Hôtel des impôts | 4 | 0.0 | 1.85 ? | 0.1 % | 0.0 % |
| Carrière | R | 0.0 | 1.14 ? | 0.0 % | 0.0 % |
| Bibliothécaire | 2R | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Banque, Cabinet d'architecte, Assassin, Chancellerie, Tribunal, Moulin, Apothicairerie, Loge des bâtisseurs, Roi, Hôpital, Cardinal, Mairie, Démolisseur, Archiviste royale, Cour du roi, Grand argentier.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.01 cartes, un perdant 5.66.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Colporteur | 89.5 % | 2.7 | 29.6 % | 18.3 % | 10.5 % | 86.4 % |
| Marché | 89.6 % | 3.2 | 19.8 % | 18.4 % | 10.4 % | 81.6 % |
| Épicerie | 86.4 % | 3.6 | 14.3 % | 14.2 % | 13.6 % | 73.6 % |
| Imprimeur | 82.1 % | 3.9 | 10.3 % | 12.2 % | 17.9 % | 65.6 % |
| Cachot | 75.8 % | 4.2 | 7.1 % | 9.6 % | 24.2 % | 58.8 % |
| Ferrailleur | 70.1 % | 4.7 | 4.6 % | 7.1 % | 29.9 % | 49.6 % |
| Salle du trésor | 56.7 % | 5.2 | 2.8 % | 4.7 % | 43.3 % | 36.2 % |
| Forgeron | 40.1 % | 5.7 | 0.8 % | 3.6 % | 59.9 % | 25.7 % |
| Tour de guet | 6.6 % | 8.2 | 0.0 % | 0.0 % | 93.4 % | 1.4 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Science 89.6 %, Éducation 88.2 %, Religion 88.1 %, Diplomatie 60.6 %, Production 60.1 %, Progrès 54.6 %, Économie 30.6 %, Justice 25.8 %, Commerce 24.0 %, Histoire 11.9 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.9 % | 7.0 % | 1.53 | 86.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 11.5 % | 9.7 % | 1.08 | 87.4 % |
| 3 | Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 11.2 % | 8.7 % | 1.13 | 84.3 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 11.2 % | 10.0 % | 1.02 | 88.8 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 9.8 % | 11.4 % | 0.85 | 88.1 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 9.2 % | 8.4 % | 1.04 | 80.4 % |
| 4 | Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 7.8 % | 8.3 % | 0.94 | 79.2 % |
| 5 | 1 blason Population supplémentaire | 7.6 % | 10.4 % | 0.77 | 84.2 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 6.2 % | 7.5 % | 0.86 | 77.2 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 5.8 % | 5.3 % | 1.08 | 67.3 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 5.3 % | 7.4 % | 0.78 | 70.1 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 3.8 % | 4.9 % | 0.83 | 63.9 % |
| 7 | 1 blason Noblesse supplémentaire | 3.1 % | 3.8 % | 0.88 | 64.3 % |
| 20 | Chaque fois que le joueur utilise un Effet rouge d'un adv… | 2.5 % | 2.5 % | 1.06 | 60.1 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 1.4 % | 1.5 % | 0.96 | 53.0 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 0.9 % | 0.7 % | 1.20 | 51.7 % |
| 2 | Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 0.2 % | 0.2 % | 1.05 ? | 47.3 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 48.8 % | 52.6 % | 1.27 | 3.49 | 3.43 | 66.4 % |
| Population | 12.4 % | 11.7 % | 1.07 | 3.14 | 2.80 | 36.8 % |
| Noblesse (Privilège) | 38.8 % | 35.7 % | 0.66 | 1.13 | 1.08 | 0.1 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.44 ? | 0.81 | 1.01 | 0.99 | 1.00 |
| Population | — | 0.54 | 0.89 | 0.87 | 1.35 |
| Privilèges | 0.96 | 1.00 | 1.02 | 0.94 | 1.39 ? |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Tour de guet | 2.59 | 2.42 |
| Forgeron | 2.07 | 1.90 |
| Salle du trésor | 1.52 | 1.60 |
| Ferrailleur | 1.03 | 1.10 |
| Histoire | 0.73 | 0.28 |
| Épicerie | 0.60 | 0.69 |
| Commerce | 0.55 | 0.39 |
| Cachot | 0.54 | 0.63 |
| Justice | 0.50 | 0.39 |
| Économie | 0.42 | 0.39 |
| Alchimiste royale | 0.35 | 0.05 |
| Marché | 0.31 | 0.39 |
| Progrès | 0.30 | 0.36 |
| Production | 0.29 | 0.31 |
| Diplomatie | 0.25 | 0.30 |
| Maître fondeur | 0.19 | 0.13 |
| Contremaître | 0.19 | 0.16 |
| Aqueduc | 0.18 | 0.11 |
| Comptoir maritime | 0.15 | 0.16 |
| Maison du commerce | 0.14 | 0.13 |
