# Analyse des parties entre IA — 2026-10-18

Bot : **IA entraînée** à tous les sièges. 1000 parties par taille de table (2, 3 et 4 joueurs), graines 1 à 1000.

9000 joueurs observés, dont 3000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 1000 / 1000 | 1000 / 1000 | 1000 / 1000 |
| Tours de table du vainqueur | 24.2 | 19.7 | 16.7 |
| Lignées du vainqueur | 4.1 | 3.4 | 2.9 |
| Victoires du 1er joueur | 54.1 % | 35.0 % | 24.9 % |
| Victoires du 2e joueur | 45.9 % | 32.4 % | 26.0 % |
| Victoires du 3e joueur | — | 32.6 % | 27.5 % |
| Victoires du 4e joueur | — | — | 21.6 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.83 | 2.58 |
| Cartes trashées | 3.07 | 2.73 |
| Cartes dans le deck à la fin | 10.76 | 10.84 |
| Cartes jouées par lignée | 4.62 | 3.99 |
| Tours par lignée | 6.02 | 5.24 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 10.41 | 7.79 |
| Effets Rouges choisis | 4.46 | 4.73 |
| Effets Rouges automatiques | 7.29 | 7.88 |
| Privilèges | 2.21 | 2.31 |
| Niveau d'Économie final | 2.96 | 3.04 |
| Niveau de Population final | 1.84 | 1.89 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|
| Progrès | 2275 | 1.11 | 1.10 | 1.17 | 1.06 | 96.0 % |
| Diplomatie | 2244 | 1.04 | 1.01 | 1.04 | 1.06 | 54.8 % |
| Histoire | 2246 | 1.02 | 0.97 | 1.03 | 1.06 | 66.0 % |
| Production | 2230 | 1.00 | 1.00 | 0.99 | 1.00 | 55.0 % |
| Économie | 2221 | 0.99 | 0.98 | 1.00 | 1.00 | 84.0 % |
| Science | 2254 | 0.96 | 0.98 | 0.97 | 0.94 | 50.5 % |
| Justice | 2299 | 0.96 | 1.08 | 0.89 | 0.90 | 45.7 % |
| Religion | 2231 | 0.92 | 0.86 | 0.92 | 0.97 | 72.2 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 2.83 carte(s) et un perdant 2.58.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Aqueduc | 5 | 11.9 | 1.05 | 12.9 % | 11.3 % |
| Archiviste royale | 3R | 11.6 | 1.36 | 16.6 % | 9.0 % |
| Ferme | 4 | 11.6 | 1.24 | 15.3 % | 9.7 % |
| Banque | R | 11.5 | 0.91 | 11.0 % | 11.6 % |
| Bibliothécaire | 2R | 11.4 | 1.25 | 14.9 % | 9.6 % |
| Roi | 4 | 11.0 | 0.88 | 10.1 % | 11.3 % |
| Négociant | 4 | 11.0 | 0.80 | 7.6 % | 9.9 % |
| Grand argentier | 7 | 10.9 | 1.25 | 14.6 % | 8.9 % |
| Apothicaire | 1R | 10.9 | 0.95 | 9.9 % | 10.1 % |
| Sapeur | RR | 10.9 | 1.36 | 15.6 % | 8.4 % |
| Démolisseur | 6 | 10.8 | 1.33 | 15.0 % | 8.6 % |
| Maison du commerce | 5 | 10.8 | 1.13 | 12.8 % | 9.6 % |
| Chambellan | 5R | 10.7 | 0.96 | 10.8 % | 10.5 % |
| Maître fondeur | 5 | 10.6 | 0.82 | 7.8 % | 10.4 % |
| Cour du roi | 4R | 10.4 | 1.16 | 12.4 % | 9.2 % |
| Remouleur ambulant | 2 | 10.1 | 0.96 | 9.8 % | 9.5 % |
| Contremaître | 3 | 10.1 | 1.00 | 10.2 % | 9.4 % |
| Carrière | R | 10.0 | 0.80 | 7.9 % | 10.4 % |
| Chancellerie | 3 | 9.6 | 0.85 | 7.6 % | 8.9 % |
| Forge | R | 9.4 | 0.80 | 7.4 % | 9.9 % |
| Hôtel des impôts | 4 | 9.1 | 0.83 | 7.3 % | 9.1 % |
| Ambassade | RRR | 9.0 | 0.97 | 9.2 % | 8.8 % |
| Comptoir maritime | 6 | 7.5 | 0.88 | 6.8 % | 7.5 % |
| Loge des bâtisseurs | 4 | 6.5 | 0.76 | 4.7 % | 6.8 % |
| Mairie | RR | 6.5 | 0.90 | 5.7 % | 6.5 % |
| Prison | 3 | 5.9 | 0.78 | 4.1 % | 5.6 % |
| Meunière | RR | 3.4 | 1.17 | 4.0 % | 2.7 % |
| Alchimiste royale | 6 | 1.0 | 0.76 ? | 0.8 % | 1.0 % |
| Mine | R | 0.9 | 0.82 ? | 0.7 % | 0.9 % |
| Cabinet d'architecte | 2R | 0.8 | 0.89 ? | 0.6 % | 0.8 % |
| Hôpital | RR | 0.2 | 0.91 ? | 0.2 % | 0.2 % |
| Tribunal | 3 | 0.1 | 1.00 ? | 0.1 % | 0.1 % |
| Cardinal | 5 | 0.0 | 3.00 ? | 0.0 % | 0.0 % |

Jamais achetées : Assassin.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 3.07 cartes, un perdant 2.73.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Marché | 56.2 % | 1.9 | 27.3 % | 14.2 % | 43.8 % | 49.0 % |
| Ferrailleur | 61.2 % | 2.1 | 21.9 % | 19.4 % | 38.8 % | 52.1 % |
| Tour de guet | 43.2 % | 2.4 | 12.3 % | 14.4 % | 56.8 % | 41.8 % |
| Cachot | 0.5 % | 2.4 | 0.2 % | 0.2 % | 99.5 % | 0.6 % |
| Épicerie | 35.9 % | 2.6 | 8.5 % | 10.5 % | 64.1 % | 27.5 % |
| Forgeron | 3.2 % | 2.8 | 0.7 % | 0.9 % | 96.8 % | 4.0 % |
| Salle du trésor | 17.7 % | 3.0 | 3.6 % | 4.1 % | 82.3 % | 13.8 % |
| Imprimeur | 0.6 % | 3.4 | 0.2 % | 0.0 % | 99.4 % | 0.5 % |
| Colporteur | 12.1 % | 3.5 | 0.4 % | 2.5 % | 87.9 % | 10.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Justice 54.3 %, Science 49.5 %, Diplomatie 45.2 %, Production 45.0 %, Histoire 34.0 %, Religion 27.8 %, Économie 16.0 %, Progrès 4.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 15 | À son tour, à la place de son action, le joueur peut paye… | 22.2 % | 14.0 % | 1.27 | 59.1 % |
| 12 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.5 % | 14.2 % | 1.15 | 47.5 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 17.0 % | 15.2 % | 1.04 | 50.4 % |
| 1 | Toutes les cartes de la pioche commune coûtent 2 Or de moins | 16.7 % | 16.5 % | 0.97 | 56.5 % |
| 11 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 16.2 % | 16.6 % | 0.96 | 58.4 % |
| 14 | À son tour, à la place de son action, le joueur peut paye… | 16.1 % | 16.8 % | 0.93 | 51.3 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 15.7 % | 16.8 % | 0.93 | 59.5 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 14.5 % | 16.9 % | 0.87 | 47.7 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 14.4 % | 15.6 % | 0.93 | 39.2 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 13.0 % | 13.2 % | 0.99 | 33.4 % |
| 5 | 1 blason Population supplémentaire | 12.5 % | 15.3 % | 0.86 | 34.4 % |
| 7 | 1 blason Noblesse supplémentaire | 9.3 % | 13.2 % | 0.78 | 29.7 % |
| 13 | À son tour, à la place de son action, le joueur peut paye… | 8.2 % | 12.5 % | 0.75 | 25.2 % |
| 6 | 1 blason Économie supplémentaire | 6.8 % | 9.3 % | 0.84 | 19.6 % |
| 10 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 6.4 % | 6.9 % | 0.98 | 18.9 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 3.6 % | 5.7 % | 0.77 | 20.5 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 3.4 % | 3.8 % | 0.99 | 17.8 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 2 Or | 2.4 % | 2.7 % | 0.98 | 16.8 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 2.3 % | 3.1 % | 0.87 | 19.4 % |
| 9 | Au début de chaque nouvelle lignée, le joueur gagne 2 or … | 2.0 % | 3.2 % | 0.80 | 20.7 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 32.1 % | 35.0 % | 1.05 | 2.96 | 3.04 | 43.0 % |
| Population | 10.4 % | 10.8 % | 0.89 | 1.84 | 1.89 | 5.1 % |
| Noblesse (Privilège) | 56.3 % | 53.9 % | 0.99 | 2.21 | 2.31 | 14.9 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.93 ? | 1.19 | 1.03 | 0.97 | 0.95 |
| Population | 1.71 | 0.97 | 1.07 | 0.77 | 0.82 |
| Privilèges | 1.93 ? | 1.12 | 0.96 | 0.91 | 0.94 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Cachot | 1.68 | 1.54 |
| Forgeron | 1.61 | 1.51 |
| Colporteur | 1.38 | 1.31 |
| Salle du trésor | 1.25 | 1.26 |
| Imprimeur | 1.15 | 0.86 |
| Épicerie | 0.94 | 1.03 |
| Marché | 0.58 | 0.68 |
| Progrès | 0.47 | 0.38 |
| Ferrailleur | 0.41 | 0.54 |
| Tour de guet | 0.35 | 0.35 |
| Économie | 0.30 | 0.31 |
| Ferme | 0.28 | 0.16 |
| Sapeur | 0.28 | 0.12 |
| Démolisseur | 0.28 | 0.15 |
| Archiviste royale | 0.28 | 0.13 |
| Bibliothécaire | 0.26 | 0.15 |
| Grand argentier | 0.26 | 0.14 |
| Aqueduc | 0.26 | 0.19 |
| Maison du commerce | 0.25 | 0.16 |
| Histoire | 0.24 | 0.24 |
