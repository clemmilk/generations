# Analyse des parties entre IA — 2026-11-11

Bot : **IA entraînée** à tous les sièges. 20000 parties par taille de table (3 joueurs), graines 1 à 20000.

60000 joueurs observés, dont 20000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 3 joueurs |
|---|---:|
| Parties terminées | 20000 / 20000 |
| Tours de table du vainqueur | 16.7 |
| Lignées du vainqueur | 4.1 |
| Victoires du 1er joueur | 33.0 % |
| Victoires du 2e joueur | 35.2 % |
| Victoires du 3e joueur | 31.7 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 2.67 | 2.61 |
| Cartes trashées | 4.33 | 3.88 |
| Cartes dans le deck à la fin | 9.35 | 9.74 |
| Cartes jouées par lignée | 3.61 | 3.22 |
| Tours par lignée | 4.18 | 3.86 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 9.08 | 6.54 |
| Effets Rouges choisis | 2.00 | 1.79 |
| Effets Rouges automatiques | 4.27 | 4.07 |
| Privilèges | 2.33 | 2.28 |
| Niveau d'Économie final | 2.76 | 2.97 |
| Niveau de Population final | 1.85 | 1.83 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 3 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|
| Diplomatie | 14987 | 1.09 | 1.09 | 80.8 % |
| Histoire | 14964 | 1.05 | 1.05 | 66.3 % |
| Progrès | 15060 | 1.04 | 1.04 | 80.1 % |
| Science | 15052 | 0.98 | 0.98 | 14.5 % |
| Justice | 15071 | 0.98 | 0.98 | 41.7 % |
| Économie | 14939 | 0.96 | 0.96 | 49.2 % |
| Religion | 14939 | 0.96 | 0.96 | 25.3 % |
| Production | 14988 | 0.95 | 0.95 | 38.1 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 2.67 carte(s) et un perdant 2.61.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Mine | R | 12.5 | 0.94 | 11.5 % | 12.8 % |
| Intendante | 4 | 12.1 | 0.98 | 11.7 % | 12.1 % |
| Hôpital | R | 11.9 | 1.00 | 11.5 % | 11.7 % |
| Aqueduc | 5 | 11.9 | 0.98 | 11.5 % | 11.9 % |
| Archiviste royale | 8 | 11.9 | 1.19 | 14.1 % | 10.7 % |
| Démolisseur | 7 | 11.8 | 1.33 | 15.7 % | 9.8 % |
| Hôtel des impôts | 4 | 11.5 | 0.88 | 9.9 % | 12.1 % |
| Banque | 3 | 11.4 | 1.10 | 12.3 % | 10.5 % |
| Cour du roi | 3R | 11.1 | 1.18 | 12.7 % | 10.0 % |
| Bibliothécaire | 5R | 10.9 | 1.04 | 11.3 % | 10.6 % |
| Capitaine | 6 | 10.9 | 0.97 | 10.3 % | 10.9 % |
| Ferme | 7 | 10.7 | 1.33 | 14.2 % | 8.9 % |
| Assassin | 6 | 10.2 | 0.62 | 6.3 % | 12.1 % |
| Carrière | R | 10.1 | 0.81 | 7.3 % | 10.3 % |
| Apothicaire | 2R | 10.1 | 1.47 | 14.7 % | 7.6 % |
| Remouleur ambulant | 3 | 10.0 | 0.92 | 8.7 % | 10.1 % |
| Roi | 6 | 9.8 | 1.19 | 11.7 % | 8.8 % |
| Tribunal | 4 | 9.5 | 1.13 | 10.6 % | 8.8 % |
| Chambellan | 8 | 9.2 | 0.76 | 6.9 % | 10.3 % |
| Ambassade | 5R | 8.8 | 0.90 | 7.8 % | 9.2 % |
| Mairie | 1R | 6.7 | 0.96 | 6.1 % | 6.6 % |
| Cabinet d’architecte | 4R | 5.9 | 1.16 | 6.7 % | 5.4 % |
| Prison | 3 | 5.5 | 0.82 | 3.6 % | 4.9 % |
| Maître fondeur | 7 | 5.0 | 0.78 | 3.8 % | 5.4 % |
| Forge | R | 4.1 | 0.83 | 2.4 % | 3.4 % |
| Négociant | 5 | 3.9 | 1.11 | 4.2 % | 3.5 % |
| Meunière | 3R | 3.3 | 0.69 | 2.2 % | 3.7 % |
| Alchimiste royale | 6 | 3.1 | 0.88 | 2.6 % | 3.1 % |
| Chancellerie | 3 | 2.9 | 0.85 | 2.1 % | 2.8 % |
| Grand argentier | 8 | 2.9 | 0.71 | 2.0 % | 3.3 % |
| Cardinal | 4 | 1.7 | 0.98 | 1.5 % | 1.5 % |
| Loge des bâtisseurs | 3 | 1.3 | 0.87 | 1.0 % | 1.1 % |
| Contremaître | 4 | 0.4 | 1.00 | 0.4 % | 0.4 % |
| Maison du commerce | 6 | 0.2 | 0.78 ? | 0.1 % | 0.2 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 4.33 cartes, un perdant 3.88.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Épicerie | 80.7 % | 2.2 | 30.6 % | 23.8 % | 19.3 % | 75.8 % |
| Tour de guet | 68.6 % | 2.7 | 18.2 % | 18.5 % | 31.4 % | 61.6 % |
| Ferrailleur | 47.7 % | 3.2 | 9.3 % | 10.2 % | 52.3 % | 42.1 % |
| Colporteur | 43.3 % | 3.7 | 2.7 % | 8.7 % | 56.7 % | 39.3 % |
| Salle du trésor | 39.6 % | 3.8 | 4.0 % | 5.9 % | 60.4 % | 31.6 % |
| Imprimeur | 8.1 % | 4.3 | 1.0 % | 1.4 % | 91.9 % | 8.1 % |
| Forgeron | 11.6 % | 4.3 | 2.4 % | 1.7 % | 88.4 % | 11.2 % |
| Cachot | 21.7 % | 4.5 | 1.9 % | 2.8 % | 78.3 % | 17.2 % |
| Marché | 4.3 % | 6.8 | 0.1 % | 0.2 % | 95.7 % | 2.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Science 85.5 %, Religion 74.7 %, Production 61.9 %, Justice 58.3 %, Économie 50.8 %, Histoire 33.7 %, Progrès 19.9 %, Diplomatie 19.2 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 12 | Au début de chaque nouvelle lignée, révélez 1 carte | 25.2 % | 12.4 % | 1.51 | 58.8 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 18.8 % | 15.6 % | 1.13 | 57.4 % |
| 7 | Progresser d’un niveau de population coûte 5 or de moins | 17.3 % | 16.4 % | 1.04 | 52.7 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 16.7 % | 16.1 % | 1.03 | 60.5 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 16.7 % | 16.3 % | 1.02 | 44.8 % |
| 5 | Au début de chaque nouvelle lignée, gagnez 2 Or par Privi… | 16.1 % | 15.4 % | 1.03 | 35.5 % |
| 13 | À son tour, en plus de son action, le joueur peut payer 3… | 15.7 % | 16.7 % | 0.96 | 60.2 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 15.7 % | 16.8 % | 0.95 | 56.0 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.1 % | 16.5 % | 0.94 | 40.8 % |
| 15 | À son tour, en plus de son action, le joueur peut payer 8… | 14.1 % | 14.1 % | 1.00 | 24.8 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 14.1 % | 17.4 % | 0.87 | 50.2 % |
| 11 | À son tour, en plus de son action, le joueur peut payer 8… | 12.5 % | 16.1 % | 0.84 | 30.7 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 11.1 % | 12.8 % | 0.91 | 21.5 % |
| 9 | Après avoir acheté 1 carte, vous pouvez jouer 1 carte de … | 9.9 % | 10.7 % | 0.95 | 17.2 % |
| 10 | Après avoir acheté 1 carte, révélez 1 carte | 8.4 % | 7.4 % | 1.09 | 13.2 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 4.2 % | 5.1 % | 0.88 | 10.8 % |
| 6 | Chaque fois que le joueur joue 1 carte avec un effet roug… | 1.5 % | 2.0 % | 0.83 | 9.4 % |
| 1 | Toutes les cartes de la pioche commune coûtent 3 Or de moins | 0.0 % | 0.0 % | — | 0.0 % |
| 14 | À son tour, en plus de son action, le joueur peut payer 2… | 0.0 % | 0.0 % | — | 0.0 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 0.0 % | 0.0 % | — | 0.0 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 16.6 % | 19.7 % | 1.06 | 2.76 | 2.97 | 27.2 % |
| Population | 8.7 % | 11.2 % | 0.77 | 1.85 | 1.83 | 3.2 % |
| Noblesse (Privilège) | 74.4 % | 69.1 % | 1.14 | 2.33 | 2.28 | 12.8 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 2.08 | 1.47 | 1.10 | 0.92 | 0.88 |
| Population | 0.78 | 1.11 | 0.90 | 1.13 | 0.97 |
| Privilèges | 1.39 | 1.02 | 0.91 | 1.03 | 1.18 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Marché | 1.71 | 1.59 |
| Forgeron | 1.41 | 1.24 |
| Imprimeur | 1.14 | 0.94 |
| Cachot | 1.13 | 1.14 |
| Colporteur | 1.12 | 1.16 |
| Salle du trésor | 0.93 | 1.07 |
| Ferrailleur | 0.74 | 0.83 |
| Progrès | 0.40 | 0.36 |
| Diplomatie | 0.39 | 0.33 |
| Tour de guet | 0.36 | 0.38 |
| Histoire | 0.27 | 0.25 |
| Mine | 0.27 | 0.24 |
| Cour du roi | 0.25 | 0.16 |
| Intendante | 0.24 | 0.21 |
| Démolisseur | 0.23 | 0.14 |
| Apothicaire | 0.23 | 0.08 |
| Capitaine | 0.22 | 0.18 |
| Aqueduc | 0.21 | 0.20 |
| Bibliothécaire | 0.21 | 0.17 |
| Hôpital | 0.21 | 0.19 |

## Effets Rouges par carte

Combien de fois les adversaires profitent de l'Effet Rouge d'une carte, quand elle est jouée. Une carte jouée à 4 joueurs peut servir jusqu'à 3 fois (une par adversaire). « Choisi » : l'adversaire a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Marché | 97662 | 1.00 | 0.0 % | 1.61 | 1.64 |
| Salle du trésor | 61377 | 1.00 | 0.0 % | 1.08 | 1.00 |
| Cachot | 68375 | 0.63 | 100.0 % | 0.77 | 0.70 |
| Diplomatie | 20794 | 0.86 | 0.0 % | 0.32 | 0.29 |
| Progrès | 22413 | 0.71 | 100.0 % | 0.28 | 0.26 |
| Épicerie | 14245 | 1.00 | 0.0 % | 0.26 | 0.23 |
| Mine | 14820 | 0.69 | 100.0 % | 0.20 | 0.16 |
| Carrière | 9333 | 1.00 | 0.0 % | 0.18 | 0.14 |
| Histoire | 15375 | 0.66 | 0.0 % | 0.17 | 0.17 |
| Tour de guet | 22517 | 0.39 | 100.0 % | 0.17 | 0.13 |
| Aqueduc | 12452 | 0.69 | 100.0 % | 0.17 | 0.13 |
| Hôpital | 11777 | 0.69 | 0.0 % | 0.14 | 0.13 |
| Banque | 9923 | 0.61 | 100.0 % | 0.11 | 0.10 |
| Économie | 10857 | 0.59 | 100.0 % | 0.10 | 0.11 |
| Ambassade | 8207 | 0.71 | 0.0 % | 0.10 | 0.09 |
| Hôtel des impôts | 11000 | 0.54 | 0.0 % | 0.10 | 0.10 |
| Justice | 6451 | 0.80 | 0.0 % | 0.09 | 0.08 |
| Ferme | 7285 | 0.59 | 100.0 % | 0.07 | 0.07 |
| Mairie | 4348 | 0.96 | 0.0 % | 0.07 | 0.07 |
| Production | 5738 | 0.51 | 0.0 % | 0.06 | 0.04 |
| Cabinet d’architecte | 4574 | 0.68 | 100.0 % | 0.06 | 0.05 |
| Forge | 2840 | 1.00 | 0.0 % | 0.05 | 0.04 |
| Tribunal | 6593 | 0.51 | 100.0 % | 0.05 | 0.06 |
| Chancellerie | 2584 | 1.00 | 0.0 % | 0.04 | 0.04 |
| Prison | 2942 | 0.47 | 100.0 % | 0.03 | 0.02 |
| Science | 1129 | 0.05 | 100.0 % | 0.00 | 0.00 |
| Loge des bâtisseurs | 721 | 0.08 | 100.0 % | 0.00 | 0.00 |
| Maison du commerce | 86 | 0.51 | 100.0 % | 0.00 | 0.00 |
| Religion | 3627 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Cour du roi | 11307 | 0.00 | 0.0 % | 0.00 | 0.00 |
