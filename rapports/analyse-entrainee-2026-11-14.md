# Analyse des parties entre IA — 2026-11-14

Bot : **IA entraînée** à tous les sièges. 30000 parties par taille de table (2, 3, 4 joueurs), graines 1 à 30000.

270000 joueurs observés, dont 90000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 30000 / 30000 | 30000 / 30000 | 30000 / 30000 |
| Tours de table du vainqueur | 20.5 | 19.2 | 18.5 |
| Lignées du vainqueur | 4.4 | 4.2 | 4.2 |
| Tours joués par partie (tous les joueurs) | 40.7 | 56.7 | 72.6 |
| Renouvellements de la Rivière par joueur | 0.01 | 0.01 | 0.02 |
| Renouvellements de la Rivière par partie | 0.02 | 0.04 | 0.09 |
| Victoires du 1er joueur | 52.2 % | 34.8 % | 26.2 % |
| Victoires du 2e joueur | 47.8 % | 33.7 % | 25.3 % |
| Victoires du 3e joueur | — | 31.5 % | 25.1 % |
| Victoires du 4e joueur | — | — | 23.4 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

« Tours joués par partie » additionne les tours de tous les joueurs (un tour = une action : jouer, acheter ou finir sa lignée). « Renouvellements » : le joueur paye 2 Or pour remplacer toute la Rivière.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 4.73 | 4.38 |
| Cartes trashées | 5.97 | 5.15 |
| Cartes dans le deck à la fin | 10.77 | 11.23 |
| Cartes jouées par lignée | 3.42 | 2.95 |
| Tours par lignée | 4.72 | 4.20 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Renouvellements de la Rivière (2 Or) | 0.01 | 0.02 |
| Pioches supplémentaires | 10.75 | 7.19 |
| Effets Rouges choisis | 2.35 | 1.91 |
| Effets Rouges automatiques | 2.55 | 2.26 |
| Privilèges | 2.78 | 2.70 |
| Niveau d'Économie final | 2.54 | 2.74 |
| Niveau de Population final | 2.06 | 1.82 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| N° | Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|---:|
| 38 | Histoire | 67457 | 1.09 | 1.06 | 1.10 | 1.11 | 73.0 % |
| 35 | Justice | 67664 | 1.03 | 1.00 | 1.03 | 1.05 | 62.6 % |
| 40 | Religion | 67393 | 1.00 | 1.00 | 1.00 | 0.99 | 38.8 % |
| 41 | Production | 67468 | 1.00 | 1.00 | 1.00 | 0.99 | 26.0 % |
| 42 | Science | 67715 | 1.00 | 1.02 | 1.00 | 0.98 | 26.9 % |
| 36 | Diplomatie | 67320 | 0.99 | 0.99 | 0.98 | 0.99 | 34.2 % |
| 37 | Économie | 67433 | 0.98 | 0.99 | 0.97 | 0.98 | 51.0 % |
| 43 | Progrès | 67550 | 0.92 | 0.94 | 0.92 | 0.91 | 89.2 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 4.73 carte(s) et un perdant 4.38.

| N° | Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|---:|
| 21 | Aqueduc | 4 | 16.9 | 1.00 | 17.2 % | 16.5 % |
| 25 | Cardinal | 2 | 16.9 | 0.98 | 16.6 % | 16.6 % |
| 14 | Apothicaire | 2R | 16.8 | 1.34 | 22.9 % | 13.5 % |
| 23 | Roi | 6 | 16.6 | 1.30 | 22.0 % | 13.7 % |
| 28 | Démolisseur | 5 | 16.6 | 1.17 | 19.6 % | 14.8 % |
| 3 | Négociant | 4 | 16.5 | 1.12 | 18.6 % | 15.0 % |
| 17 | Cabinet d’architecte | 3R | 16.5 | 1.03 | 17.0 % | 15.9 % |
| 22 | Bibliothécaire | 5R | 16.5 | 1.09 | 18.1 % | 15.3 % |
| 33 | Grand argentier | 4 | 16.5 | 1.03 | 16.9 % | 15.7 % |
| 10 | Ferme | 5 | 16.4 | 1.22 | 20.1 % | 14.1 % |
| 30 | Archiviste royale | 7 | 16.4 | 1.23 | 20.4 % | 14.1 % |
| 2 | Banque | 2 | 16.2 | 1.06 | 16.4 % | 14.3 % |
| 15 | Mine | 3R | 16.2 | 0.84 | 13.6 % | 17.1 % |
| 13 | Meunière | 1R | 16.0 | 0.82 | 12.3 % | 16.3 % |
| 26 | Mairie | R | 15.9 | 1.01 | 14.9 % | 14.5 % |
| 24 | Hôpital | 2R | 15.8 | 1.00 | 15.7 % | 15.5 % |
| 19 | Hôtel des impôts | 4 | 15.7 | 0.93 | 14.3 % | 15.8 % |
| 32 | Ambassade | 3R | 15.4 | 0.98 | 15.0 % | 15.2 % |
| 11 | Chancellerie | 2 | 15.3 | 1.13 | 16.5 % | 13.6 % |
| 12 | Tribunal | 4 | 15.3 | 1.16 | 17.4 % | 13.5 % |
| 20 | Loge des bâtisseurs | 3 | 15.0 | 1.06 | 14.8 % | 13.7 % |
| 31 | Cour du roi | 4R | 13.5 | 1.05 | 13.8 % | 12.9 % |
| 6 | Contremaître | R | 13.2 | 0.96 | 9.8 % | 11.5 % |
| 1 | Remouleur ambulant | 3 | 12.5 | 0.93 | 9.3 % | 11.2 % |
| 7 | Assassin | 6 | 12.4 | 0.77 | 9.0 % | 13.5 % |
| 8 | Carrière | R | 11.6 | 0.84 | 7.1 % | 10.3 % |
| 29 | Maison du commerce | 4 | 10.9 | 0.90 | 7.6 % | 10.0 % |
| 9 | Forge | R | 10.1 | 0.87 | 5.9 % | 8.4 % |
| 16 | Maître fondeur | 7 | 8.7 | 1.04 | 8.3 % | 8.2 % |
| 5 | Intendante | 7 | 6.7 | 0.95 | 5.7 % | 6.7 % |
| 4 | Prison | 3 | 5.7 | 1.01 | 3.8 % | 4.4 % |
| 34 | Chambellan | 8 | 3.0 | 1.02 | 2.9 % | 2.9 % |
| 27 | Alchimiste royale | 8 | 2.1 | 1.16 | 2.2 % | 1.9 % |
| 18 | Capitaine | 6R | 0.0 | 0.76 ? | 0.0 % | 0.0 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 5.97 cartes, un perdant 5.15.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Tour de guet | 83.2 % | 2.6 | 31.5 % | 17.4 % | 16.8 % | 77.4 % |
| Épicerie | 74.7 % | 3.1 | 17.4 % | 17.1 % | 25.3 % | 66.5 % |
| Marché | 68.7 % | 3.3 | 15.9 % | 14.5 % | 31.3 % | 62.3 % |
| Alchimiste | 49.0 % | 3.9 | 6.9 % | 8.9 % | 51.0 % | 42.3 % |
| Salle du trésor | 54.1 % | 4.2 | 4.7 % | 8.5 % | 45.9 % | 45.0 % |
| Forgeron | 24.5 % | 4.2 | 3.5 % | 4.6 % | 75.5 % | 23.0 % |
| Docteur | 41.3 % | 4.9 | 1.6 % | 4.5 % | 58.7 % | 31.4 % |
| Colporteur | 38.7 % | 5.3 | 0.2 % | 1.9 % | 61.3 % | 31.9 % |
| Cachot | 25.3 % | 5.7 | 0.7 % | 2.1 % | 74.7 % | 18.8 % |
| Imprimeur | 9.7 % | 6.1 | 0.2 % | 0.8 % | 90.3 % | 8.8 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Production (n° 41) 74.0 %, Science (n° 42) 73.1 %, Diplomatie (n° 36) 65.8 %, Religion (n° 40) 61.2 %, Économie (n° 37) 49.0 %, Justice (n° 35) 37.4 %, Histoire (n° 38) 27.0 %, Progrès (n° 43) 10.8 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 1 | Après avoir acheté 1 carte, gagnez 5 Or | 24.1 % | 16.2 % | 1.25 | 52.5 % |
| 7 | Progresser d’un niveau de population coûte 5 or de moins | 22.1 % | 16.9 % | 1.16 | 50.6 % |
| 18 | Chaque fois que le joueur révèle 1 carte, il gagne 4 Or | 21.8 % | 17.2 % | 1.13 | 52.1 % |
| 10 | Après avoir acheté 1 carte, révélez 1 carte | 20.8 % | 14.6 % | 1.26 | 22.1 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 20.3 % | 17.9 % | 1.06 | 46.8 % |
| 9 | Après avoir acheté 1 carte, vous pouvez jouer 1 carte de … | 19.8 % | 16.9 % | 1.09 | 31.9 % |
| 6 | Chaque fois que le joueur joue 1 carte avec un effet roug… | 19.2 % | 17.9 % | 1.03 | 35.4 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 18.8 % | 18.0 % | 1.01 | 44.1 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 18.1 % | 17.3 % | 1.03 | 26.7 % |
| 12 | Au début de chaque nouvelle lignée, révélez 1 carte et pa… | 16.9 % | 19.2 % | 0.89 | 53.8 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 15.3 % | 15.6 % | 1.01 | 17.9 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 15.3 % | 20.3 % | 0.80 | 49.5 % |
| 13 | À son tour, en plus de son action, le joueur peut payer 3… | 13.1 % | 20.9 % | 0.70 | 40.1 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 11.5 % | 14.5 % | 0.89 | 14.0 % |
| 14 | À son tour, en plus de son action, le joueur peut payer 2… | 8.8 % | 12.3 % | 0.84 | 10.7 % |
| 5 | Au début de chaque nouvelle lignée, gagnez 2 Or par Privi… | 6.5 % | 8.2 % | 0.94 | 8.2 % |
| 11 | À son tour, en plus de son action, le joueur peut payer 7… | 3.1 % | 4.1 % | 0.91 | 6.4 % |
| 15 | À son tour, en plus de son action, le joueur peut payer 8… | 0.9 % | 0.7 % | 1.10 | 12.9 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 0.8 % | 0.8 % | 1.03 | 12.3 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 0.8 % | 0.7 % | 1.02 | 12.3 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 11.1 % | 13.1 % | 0.78 | 2.54 | 2.74 | 26.0 % |
| Population | 9.6 % | 8.3 % | 0.66 | 2.06 | 1.82 | 17.0 % |
| Noblesse (Privilège) | 79.3 % | 78.7 % | 1.54 | 2.78 | 2.70 | 24.0 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.51 | 1.25 | 1.05 | 0.92 | 0.87 |
| Population | 0.77 | 1.03 | 0.90 | 1.07 | 1.28 |
| Privilèges | 0.85 | 1.03 | 0.94 | 0.99 | 1.10 |

## Cartes les plus jouées

| N° | Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|---:|
| départ | Imprimeur | 1.24 | 1.12 |
| départ | Colporteur | 1.19 | 1.18 |
| départ | Forgeron | 1.00 | 0.88 |
| départ | Cachot | 0.92 | 0.97 |
| départ | Docteur | 0.69 | 0.77 |
| départ | Alchimiste | 0.52 | 0.57 |
| départ | Salle du trésor | 0.50 | 0.55 |
| 14 | Apothicaire | 0.42 | 0.21 |
| 43 | Progrès | 0.35 | 0.42 |
| 22 | Bibliothécaire | 0.34 | 0.27 |
| 23 | Roi | 0.33 | 0.18 |
| 17 | Cabinet d’architecte | 0.31 | 0.26 |
| 28 | Démolisseur | 0.31 | 0.23 |
| 11 | Chancellerie | 0.30 | 0.21 |
| 3 | Négociant | 0.30 | 0.22 |
| 30 | Archiviste royale | 0.28 | 0.19 |
| 25 | Cardinal | 0.28 | 0.28 |
| 21 | Aqueduc | 0.28 | 0.27 |
| 38 | Histoire | 0.27 | 0.23 |
| 24 | Hôpital | 0.27 | 0.24 |

## Effets Rouges par carte

Combien de fois le voisin de droite profite de l'Effet Rouge d'une carte, quand elle est jouée. Seul le joueur de droite peut l’appliquer : au plus 1 fois par carte jouée. « Choisi » : le voisin a payé ou fait un choix ; sinon, c'est un gain automatique. « Utilisé par partie » : combien de fois, en moyenne, l'Effet Rouge de cette carte est appliqué dans une partie (tous joueurs confondus). Les cartes de départ portent le même nom dans les 4 couleurs : elles sont comptées ensemble (N° « départ »).

| N° | Carte | Utilisé par partie à 2 | Utilisé par partie à 3 | Utilisé par partie à 4 | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| départ | Salle du trésor | 1.28 | 1.84 | 1.69 | 144430 | 1.00 | 0.0 % | 0.60 | 0.50 |
| départ | Cachot | 1.21 | 1.59 | 1.98 | 257756 | 0.56 | 100.0 % | 0.59 | 0.50 |
| 43 | Progrès | 0.55 | 0.80 | 1.02 | 107399 | 0.66 | 100.0 % | 0.31 | 0.24 |
| 11 | Chancellerie | 0.55 | 0.73 | 0.89 | 65356 | 1.00 | 0.0 % | 0.22 | 0.25 |
| départ | Marché | 0.56 | 0.72 | 0.72 | 59876 | 1.00 | 0.0 % | 0.24 | 0.21 |
| 15 | Mine | 0.46 | 0.57 | 0.66 | 73701 | 0.69 | 100.0 % | 0.24 | 0.16 |
| 26 | Mairie | 0.42 | 0.56 | 0.69 | 53340 | 0.94 | 0.0 % | 0.19 | 0.18 |
| 17 | Cabinet d’architecte | 0.43 | 0.56 | 0.67 | 74511 | 0.67 | 100.0 % | 0.22 | 0.17 |
| départ | Épicerie | 0.44 | 0.56 | 0.64 | 49360 | 1.00 | 0.0 % | 0.20 | 0.17 |
| 21 | Aqueduc | 0.45 | 0.54 | 0.64 | 73575 | 0.67 | 100.0 % | 0.23 | 0.16 |
| 24 | Hôpital | 0.38 | 0.50 | 0.61 | 67834 | 0.66 | 0.0 % | 0.18 | 0.16 |
| 38 | Histoire | 0.31 | 0.44 | 0.57 | 66641 | 0.60 | 0.0 % | 0.15 | 0.15 |
| 32 | Ambassade | 0.34 | 0.45 | 0.53 | 62334 | 0.64 | 0.0 % | 0.16 | 0.14 |
| 35 | Justice | 0.30 | 0.41 | 0.49 | 42029 | 0.85 | 0.0 % | 0.14 | 0.13 |
| 8 | Carrière | 0.23 | 0.37 | 0.48 | 32253 | 1.00 | 0.0 % | 0.14 | 0.11 |
| 20 | Loge des bâtisseurs | 0.24 | 0.35 | 0.43 | 54129 | 0.57 | 100.0 % | 0.12 | 0.11 |
| 31 | Cour du roi | 0.23 | 0.35 | 0.44 | 47885 | 0.64 | 100.0 % | 0.12 | 0.11 |
| 19 | Hôtel des impôts | 0.27 | 0.34 | 0.40 | 57630 | 0.53 | 0.0 % | 0.13 | 0.10 |
| 2 | Banque | 0.25 | 0.34 | 0.38 | 50901 | 0.57 | 100.0 % | 0.12 | 0.10 |
| 10 | Ferme | 0.24 | 0.31 | 0.36 | 47196 | 0.58 | 100.0 % | 0.11 | 0.10 |
| 9 | Forge | 0.19 | 0.30 | 0.41 | 26975 | 1.00 | 0.0 % | 0.11 | 0.09 |
| 12 | Tribunal | 0.20 | 0.26 | 0.28 | 42511 | 0.52 | 100.0 % | 0.08 | 0.08 |
| 37 | Économie | 0.14 | 0.19 | 0.24 | 33503 | 0.50 | 100.0 % | 0.07 | 0.06 |
| 29 | Maison du commerce | 0.10 | 0.17 | 0.24 | 29954 | 0.51 | 100.0 % | 0.05 | 0.06 |
| 36 | Diplomatie | 0.13 | 0.17 | 0.20 | 17429 | 0.86 | 0.0 % | 0.07 | 0.05 |
| 40 | Religion | 0.09 | 0.14 | 0.11 | 16074 | 0.64 | 100.0 % | 0.05 | 0.03 |
| 4 | Prison | 0.02 | 0.06 | 0.09 | 9932 | 0.50 | 100.0 % | 0.02 | 0.02 |
| 42 | Science | 0.03 | 0.03 | 0.04 | 5964 | 0.52 | 100.0 % | 0.01 | 0.01 |
| 41 | Production | 0.02 | 0.03 | 0.03 | 4169 | 0.51 | 0.0 % | 0.01 | 0.01 |
| départ | Tour de guet | 0.00 | 0.01 | 0.00 | 907 | 0.45 | 100.0 % | 0.00 | 0.00 |
