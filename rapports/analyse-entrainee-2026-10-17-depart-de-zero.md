# Analyse des parties entre IA — 2026-10-17

Bot : **IA entraînée** à tous les sièges. 2000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 2000.

18000 joueurs observés, dont 6000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 2000 / 2000 | 2000 / 2000 | 2000 / 2000 |
| Tours de table du vainqueur | 25.7 | 21.3 | 18.2 |
| Lignées du vainqueur | 4.2 | 3.5 | 3.0 |
| Victoires du 1er joueur | 50.2 % | 34.5 % | 26.6 % |
| Victoires du 2e joueur | 49.8 % | 32.8 % | 25.4 % |
| Victoires du 3e joueur | — | 32.6 % | 25.4 % |
| Victoires du 4e joueur | — | — | 22.6 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.63 | 3.37 |
| Cartes trashées | 4.00 | 3.63 |
| Cartes dans le deck à la fin | 10.63 | 10.75 |
| Cartes jouées par lignée | 4.66 | 4.01 |
| Tours par lignée | 6.25 | 5.44 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 10.67 | 7.79 |
| Effets Rouges choisis | 4.46 | 4.60 |
| Effets Rouges automatiques | 8.00 | 8.50 |
| Privilèges | 2.24 | 2.37 |
| Niveau d'Économie final | 2.90 | 2.97 |
| Niveau de Population final | 1.93 | 2.02 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Histoire | 4487 | 1.06 | 1.03 | 1.11 | 1.04 | 78.7 % |
| Progrès | 4532 | 1.05 | 1.03 | 1.04 | 1.06 | 80.4 % |
| Production | 4485 | 1.04 | 0.99 | 1.02 | 1.12 | 64.1 % |
| Économie | 4527 | 1.00 | 1.03 | 0.94 | 1.03 | 42.8 % |
| Diplomatie | 4492 | 0.99 | 1.03 | 0.98 | 0.96 | 61.6 % |
| Science | 4535 | 0.98 | 0.98 | 1.01 | 0.94 | 33.9 % |
| Religion | 4414 | 0.95 | 0.98 | 0.96 | 0.90 | 49.7 % |
| Justice | 4528 | 0.94 | 0.93 | 0.95 | 0.95 | 56.5 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.63 carte(s) et un perdant 3.37.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Aqueduc | 5 | 14.2 | 1.01 | 14.9 % | 13.8 % |
| Bibliothécaire | 2R | 14.0 | 1.34 | 19.7 % | 11.2 % |
| Ferme | 4 | 13.9 | 1.07 | 15.7 % | 13.0 % |
| Archiviste royale | 3R | 13.9 | 1.38 | 20.1 % | 10.8 % |
| Banque | R | 13.8 | 0.93 | 13.4 % | 13.9 % |
| Démolisseur | 6 | 13.7 | 1.36 | 19.5 % | 10.8 % |
| Sapeur | RR | 13.6 | 1.42 | 20.3 % | 10.2 % |
| Chambellan | 5R | 13.5 | 1.02 | 14.4 % | 13.0 % |
| Maître fondeur | 5 | 13.5 | 0.75 | 10.1 % | 14.5 % |
| Roi | 4 | 13.4 | 0.89 | 12.4 % | 13.8 % |
| Grand argentier | 7 | 13.2 | 1.35 | 18.6 % | 10.5 % |
| Prison | 3 | 13.2 | 0.83 | 8.8 % | 11.4 % |
| Hôtel des impôts | 4 | 13.1 | 0.89 | 11.7 % | 13.2 % |
| Maison du commerce | 5 | 13.1 | 1.16 | 15.6 % | 11.5 % |
| Ambassade | RRR | 13.1 | 0.88 | 12.2 % | 13.4 % |
| Apothicairerie | 1R | 13.1 | 0.92 | 11.8 % | 12.3 % |
| Contremaître | 3 | 12.9 | 0.92 | 11.5 % | 12.5 % |
| Mairie | RR | 12.9 | 0.88 | 11.5 % | 13.1 % |
| Cour du roi | 4R | 11.9 | 1.09 | 13.1 % | 10.7 % |
| Comptoir maritime | 6 | 11.4 | 0.86 | 9.6 % | 11.4 % |
| Forge | R | 11.1 | 0.85 | 8.3 % | 10.4 % |
| Remouleur ambulant | 2 | 10.9 | 0.94 | 8.5 % | 9.3 % |
| Alchimiste royale | 6 | 10.6 | 0.88 | 8.5 % | 10.1 % |
| Chancellerie | 3 | 10.0 | 0.86 | 6.4 % | 7.9 % |
| Hôpital | RR | 9.1 | 0.98 | 8.6 % | 8.8 % |
| Carrière | R | 8.4 | 0.81 | 5.7 % | 8.0 % |
| Halle des négociants | 2 | 7.5 | 0.90 | 5.7 % | 6.8 % |
| Moulin | RR | 5.8 | 0.83 | 4.8 % | 6.1 % |
| Cardinal | 5 | 5.1 | 0.76 | 3.2 % | 4.9 % |
| Cabinet d'architecte | 2R | 1.2 | 0.72 | 0.7 % | 1.2 % |
| Loge des bâtisseurs | 4 | 0.7 | 1.14 ? | 0.5 % | 0.5 % |
| Mine | R | 0.2 | 0.66 ? | 0.1 % | 0.1 % |
| Tribunal | 3 | 0.1 | 1.06 ? | 0.0 % | 0.0 % |
| Assassin | 4 | 0.0 | 0.00 ? | 0.0 % | 0.0 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 4.00 cartes, un perdant 3.63.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Ferrailleur | 69.8 % | 2.3 | 25.9 % | 17.0 % | 30.2 % | 66.1 % |
| Marché | 51.8 % | 2.5 | 17.6 % | 11.8 % | 48.1 % | 46.9 % |
| Tour de guet | 55.8 % | 2.7 | 13.7 % | 15.7 % | 44.2 % | 52.0 % |
| Cachot | 0.3 % | 2.9 | 0.0 % | 0.1 % | 99.7 % | 0.3 % |
| Salle du trésor | 46.7 % | 2.9 | 9.6 % | 11.1 % | 53.3 % | 39.6 % |
| Colporteur | 35.0 % | 3.3 | 4.6 % | 8.9 % | 65.0 % | 30.3 % |
| Épicerie | 33.5 % | 3.4 | 5.5 % | 6.2 % | 66.5 % | 27.1 % |
| Imprimeur | 0.1 % | 3.4 | 0.0 % | 0.0 % | 99.9 % | 0.1 % |
| Forgeron | 7.2 % | 4.2 | 0.8 % | 1.5 % | 92.8 % | 7.5 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Science 66.1 %, Économie 57.2 %, Religion 50.3 %, Justice 43.5 %, Diplomatie 38.4 %, Production 35.9 %, Histoire 21.3 %, Progrès 19.6 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 15 | À son tour, à la place de son action, le joueur peut paye… | 21.8 % | 14.2 % | 1.26 | 57.3 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 18.0 % | 16.0 % | 1.04 | 58.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 16.9 % | 14.7 % | 1.08 | 42.6 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 16.3 % | 17.0 % | 0.95 | 55.8 % |
| 5 | 1 blason Population supplémentaire | 16.0 % | 17.2 % | 0.92 | 60.1 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 15.9 % | 16.9 % | 0.94 | 52.8 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 15.5 % | 16.5 % | 0.93 | 48.1 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 15.4 % | 16.6 % | 0.93 | 51.7 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 14.1 % | 16.2 % | 0.89 | 42.6 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 12.8 % | 14.6 % | 0.92 | 32.3 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 12.6 % | 16.3 % | 0.83 | 36.4 % |
| 7 | 1 blason Noblesse supplémentaire | 11.2 % | 14.2 % | 0.86 | 27.0 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 8.3 % | 10.1 % | 0.90 | 19.6 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 8.2 % | 12.9 % | 0.74 | 22.9 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 6.5 % | 8.0 % | 0.91 | 15.7 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 5.7 % | 5.1 % | 1.15 | 12.6 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 2.4 % | 3.7 % | 0.78 | 14.6 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 2.1 % | 2.5 % | 0.98 | 14.3 % |
| 6 | 1 blason Économie supplémentaire | 2.0 % | 2.2 % | 0.97 | 15.1 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 1.9 % | 2.2 % | 0.97 | 18.5 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 26.0 % | 27.4 % | 1.04 | 2.90 | 2.97 | 41.3 % |
| Population | 12.4 % | 12.0 % | 0.89 | 1.93 | 2.02 | 7.1 % |
| Noblesse (Privilège) | 60.8 % | 60.5 % | 1.02 | 2.24 | 2.37 | 14.7 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.72 | 1.22 | 1.02 | 0.94 | 0.95 |
| Population | 1.50 | 1.02 | 1.11 | 0.73 | 0.82 |
| Privilèges | 1.71 | 1.13 | 1.00 | 0.92 | 0.89 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Forgeron | 1.58 | 1.44 |
| Cachot | 1.56 | 1.37 |
| Imprimeur | 1.48 | 1.22 |
| Colporteur | 1.31 | 1.28 |
| Épicerie | 1.14 | 1.21 |
| Salle du trésor | 0.82 | 0.90 |
| Marché | 0.77 | 0.88 |
| Histoire | 0.37 | 0.33 |
| Ferrailleur | 0.36 | 0.45 |
| Démolisseur | 0.35 | 0.18 |
| Progrès | 0.35 | 0.33 |
| Sapeur | 0.35 | 0.16 |
| Archiviste royale | 0.34 | 0.16 |
| Bibliothécaire | 0.34 | 0.18 |
| Grand argentier | 0.31 | 0.15 |
| Maison du commerce | 0.29 | 0.19 |
| Ferme | 0.29 | 0.21 |
| Aqueduc | 0.29 | 0.23 |
| Chambellan | 0.27 | 0.21 |
| Tour de guet | 0.22 | 0.21 |
