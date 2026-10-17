# Analyse des parties entre IA — 2026-10-17

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 29.7 | 26.1 | 23.6 |
| Lignées du vainqueur | 8.2 | 7.6 | 7.2 |
| Victoires du 1er joueur | 50.1 % | 32.0 % | 26.5 % |
| Victoires du 2e joueur | 49.9 % | 35.1 % | 27.0 % |
| Victoires du 3e joueur | — | 32.8 % | 24.1 % |
| Victoires du 4e joueur | — | — | 22.5 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.24 | 1.94 |
| Cartes trashées | 8.10 | 6.69 |
| Cartes dans le deck à la fin | 5.14 | 6.25 |
| Cartes jouées par lignée | 2.33 | 2.43 |
| Tours par lignée | 3.40 | 3.48 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 0.64 | 0.15 |
| Effets Rouges choisis | 3.47 | 3.89 |
| Effets Rouges automatiques | 11.99 | 13.19 |
| Privilèges | 1.79 | 1.80 |
| Niveau d'Économie final | 3.91 | 3.73 |
| Niveau de Population final | 3.60 | 3.25 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 4487 | 1.11 | 1.04 | 1.18 | 1.12 | 66.0 % |
| Progrès | 4532 | 1.03 | 1.02 | 1.03 | 1.03 | 35.2 % |
| Science | 4535 | 1.01 | 1.03 | 0.99 | 1.00 | 49.3 % |
| Diplomatie | 4492 | 0.99 | 1.03 | 0.94 | 1.01 | 15.8 % |
| Religion | 4414 | 0.98 | 1.03 | 0.96 | 0.95 | 6.4 % |
| Production | 4485 | 0.97 | 0.95 | 1.01 | 0.96 | 14.1 % |
| Économie | 4527 | 0.96 | 0.97 | 0.93 | 0.98 | 7.9 % |
| Justice | 4528 | 0.95 | 0.92 | 0.97 | 0.96 | 14.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 2.24 carte(s) et un perdant 1.94.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Prison | 3 | 10.0 | 0.89 | 8.8 % | 9.9 % |
| Aqueduc | 5 | 9.9 | 1.07 | 9.8 % | 8.5 % |
| Comptoir maritime | 6 | 9.8 | 0.93 | 8.8 % | 9.5 % |
| Mine | R | 9.8 | 1.59 | 15.7 % | 6.1 % |
| Cardinal | 5 | 9.7 | 0.84 | 7.5 % | 10.0 % |
| Maître fondeur | 5 | 9.7 | 1.01 | 10.1 % | 9.3 % |
| Forge | R | 9.5 | 0.89 | 6.9 % | 8.9 % |
| Contremaître | 3 | 9.5 | 1.08 | 9.8 % | 8.6 % |
| Halle des négociants | 2 | 9.5 | 0.80 | 5.0 % | 8.2 % |
| Alchimiste royale | 6 | 9.5 | 1.38 | 13.3 % | 7.0 % |
| Maison du commerce | 5 | 9.4 | 1.16 | 11.1 % | 8.1 % |
| Chambellan | 5R | 9.4 | 1.43 | 13.6 % | 6.6 % |
| Ferme | 4 | 9.2 | 0.77 | 4.6 % | 7.6 % |
| Ambassade | RRR | 9.1 | 1.13 | 10.5 % | 7.9 % |
| Moulin | RR | 8.7 | 0.97 | 7.9 % | 8.3 % |
| Remouleur ambulant | 2 | 8.6 | 0.90 | 2.8 % | 4.5 % |
| Cabinet d'architecte | 2R | 8.4 | 0.90 | 6.0 % | 7.7 % |
| Carrière | R | 7.3 | 0.82 | 3.5 % | 5.4 % |
| Hôtel des impôts | 4 | 6.4 | 0.93 | 2.8 % | 4.0 % |
| Sapeur | RR | 4.6 | 1.09 | 4.3 % | 3.8 % |
| Loge des bâtisseurs | 4 | 4.5 | 1.05 | 2.0 % | 2.6 % |
| Apothicairerie | 1R | 4.1 | 0.94 | 1.6 % | 2.3 % |
| Chancellerie | 3 | 3.8 | 0.91 | 1.4 % | 2.1 % |
| Bibliothécaire | 2R | 3.2 | 1.04 | 1.7 % | 2.0 % |
| Cour du roi | 4R | 2.2 | 0.99 | 1.6 % | 1.7 % |
| Roi | 4 | 2.1 | 1.11 | 1.2 % | 1.3 % |
| Tribunal | 3 | 2.0 | 0.79 | 0.4 % | 1.3 % |
| Assassin | 4 | 1.3 | 1.67 | 0.3 % | 0.3 % |
| Mairie | RR | 0.7 | 1.03 ? | 0.4 % | 0.4 % |
| Grand argentier | 7 | 0.6 | 1.65 ? | 0.7 % | 0.3 % |
| Banque | R | 0.5 | 1.03 ? | 0.1 % | 0.2 % |
| Archiviste royale | 3R | 0.4 | 1.13 ? | 0.2 % | 0.2 % |
| Hôpital | RR | 0.3 | 1.02 ? | 0.1 % | 0.2 % |
| Démolisseur | 6 | 0.3 | 1.33 ? | 0.2 % | 0.2 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 8.10 cartes, un perdant 6.69.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Cachot | 94.1 % | 2.9 | 30.8 % | 16.3 % | 5.9 % | 91.1 % |
| Forgeron | 89.8 % | 3.2 | 23.5 % | 16.9 % | 10.2 % | 87.9 % |
| Imprimeur | 88.9 % | 3.9 | 13.4 % | 13.9 % | 11.1 % | 82.3 % |
| Ferrailleur | 81.0 % | 4.6 | 7.4 % | 9.1 % | 19.0 % | 70.1 % |
| Salle du trésor | 79.2 % | 4.9 | 3.8 % | 9.7 % | 20.8 % | 63.9 % |
| Colporteur | 69.2 % | 5.6 | 1.1 % | 6.4 % | 30.8 % | 49.1 % |
| Marché | 56.8 % | 6.0 | 1.1 % | 5.0 % | 43.2 % | 40.4 % |
| Épicerie | 39.8 % | 6.7 | 0.4 % | 2.9 % | 60.2 % | 23.3 % |
| Tour de guet | 16.3 % | 8.7 | 0.3 % | 0.0 % | 83.7 % | 5.8 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Religion 93.6 %, Économie 92.1 %, Justice 85.9 %, Production 85.9 %, Diplomatie 84.2 %, Progrès 64.8 %, Science 50.7 %, Histoire 34.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 21.6 % | 10.4 % | 1.48 | 70.2 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 16.5 % | 13.3 % | 1.12 | 63.5 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 14.2 % | 14.0 % | 0.99 | 70.2 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 14.0 % | 14.6 % | 0.95 | 69.4 % |
| 15 | À son tour, à la place de son action, le joueur peut paye… | 13.6 % | 13.0 % | 1.00 | 59.5 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 13.0 % | 13.9 % | 0.92 | 60.5 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 12.8 % | 12.3 % | 1.02 | 52.9 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 12.2 % | 13.2 % | 0.93 | 55.6 % |
| 5 | 1 blason Population supplémentaire | 12.1 % | 14.8 % | 0.84 | 67.8 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 11.3 % | 10.6 % | 1.06 | 41.5 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 10.5 % | 11.6 % | 0.93 | 47.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 8.0 % | 8.5 % | 0.99 | 32.8 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 6.2 % | 7.4 % | 0.92 | 26.1 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 5.1 % | 5.2 % | 1.07 | 23.2 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 4.5 % | 12.5 % | 0.47 | 35.9 % |
| 7 | 1 blason Noblesse supplémentaire | 2.6 % | 3.5 % | 0.89 | 16.2 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 1.2 % | 1.1 % | 1.16 | 14.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 6 | 1 blason Économie supplémentaire | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 15.3 % | 10.5 % | 1.04 | 3.91 | 3.73 | 92.7 % |
| Population | 31.9 % | 31.0 % | 1.10 | 3.60 | 3.25 | 71.5 % |
| Noblesse (Privilège) | 52.8 % | 58.5 % | 0.86 | 1.79 | 1.80 | 4.2 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | — | 0.00 ? | 0.45 | 0.52 | 1.08 |
| Population | — | 0.33 | 0.76 | 0.74 | 1.21 |
| Privilèges | 1.37 | 1.04 | 0.95 | 0.98 | 1.17 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Épicerie | 2.36 | 2.43 |
| Marché | 1.90 | 2.00 |
| Colporteur | 1.66 | 1.71 |
| Tour de guet | 1.61 | 1.17 |
| Salle du trésor | 1.08 | 1.22 |
| Ferrailleur | 1.05 | 1.23 |
| Histoire | 0.69 | 0.60 |
| Science | 0.49 | 0.52 |
| Mine | 0.49 | 0.15 |
| Alchimiste royale | 0.45 | 0.20 |
| Chambellan | 0.43 | 0.16 |
| Imprimeur | 0.42 | 0.54 |
| Progrès | 0.42 | 0.44 |
| Maison du commerce | 0.36 | 0.23 |
| Aqueduc | 0.36 | 0.24 |
| Contremaître | 0.34 | 0.25 |
| Forgeron | 0.33 | 0.42 |
| Comptoir maritime | 0.30 | 0.29 |
| Maître fondeur | 0.27 | 0.20 |
| Cardinal | 0.26 | 0.30 |
