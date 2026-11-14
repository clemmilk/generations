# Analyse des parties entre IA — 2026-11-14

Bot : **IA entraînée** à tous les sièges. 30000 parties par taille de table (2, 3, 4 joueurs), graines 1 à 30000.

270000 joueurs observés, dont 90000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 2 joueurs | 3 joueurs | 4 joueurs |
|---|---:|---:|---:|
| Parties terminées | 30000 / 30000 | 30000 / 30000 | 30000 / 30000 |
| Tours de table du vainqueur | 20.5 | 19.1 | 18.3 |
| Lignées du vainqueur | 5.8 | 5.4 | 5.2 |
| Tours joués par partie (tous les joueurs) | 40.6 | 56.5 | 71.9 |
| Renouvellements de la Rivière par joueur | 0.05 | 0.06 | 0.07 |
| Renouvellements de la Rivière par partie | 0.10 | 0.17 | 0.28 |
| Victoires du 1er joueur | 50.6 % | 32.9 % | 23.9 % |
| Victoires du 2e joueur | 49.4 % | 34.3 % | 25.1 % |
| Victoires du 3e joueur | — | 32.7 % | 24.9 % |
| Victoires du 4e joueur | — | — | 26.1 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

« Tours joués par partie » additionne les tours de tous les joueurs (un tour = une action : jouer, acheter ou finir sa lignée). « Renouvellements » : le joueur paye 2 Or pour remplacer toute la Rivière.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.88 | 3.61 |
| Cartes trashées | 7.23 | 5.71 |
| Cartes dans le deck à la fin | 8.65 | 9.90 |
| Cartes jouées par lignée | 2.99 | 2.74 |
| Tours par lignée | 3.64 | 3.49 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Renouvellements de la Rivière (2 Or) | 0.05 | 0.07 |
| Pioches supplémentaires | 7.39 | 5.13 |
| Effets Rouges choisis | 1.97 | 1.63 |
| Effets Rouges automatiques | 3.47 | 3.05 |
| Privilèges | 2.80 | 2.59 |
| Niveau d'Économie final | 2.94 | 2.76 |
| Niveau de Population final | 2.68 | 2.12 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| N° | Carte | Joueurs l'ayant reçue | Indice de victoire | À 2 | À 3 | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|---:|---:|---:|
| 38 | Histoire | 67457 | 1.12 | 1.07 | 1.13 | 1.14 | 64.2 % |
| 35 | Justice | 67664 | 1.03 | 1.01 | 1.03 | 1.05 | 41.8 % |
| 42 | Science | 67715 | 1.01 | 1.02 | 1.01 | 1.00 | 27.2 % |
| 37 | Économie | 67433 | 1.00 | 1.01 | 0.99 | 1.00 | 12.4 % |
| 41 | Production | 67468 | 1.00 | 1.00 | 0.99 | 0.99 | 26.5 % |
| 40 | Religion | 67393 | 0.97 | 0.98 | 0.96 | 0.96 | 20.8 % |
| 36 | Diplomatie | 67320 | 0.96 | 0.96 | 0.97 | 0.96 | 25.4 % |
| 43 | Progrès | 67550 | 0.92 | 0.95 | 0.91 | 0.89 | 43.3 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.88 carte(s) et un perdant 3.61.

| N° | Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|---:|
| 1 | Remouleur ambulant | 3 | 14.5 | 0.91 | 12.7 % | 14.8 % |
| 5 | Intendante | 7 | 14.4 | 1.06 | 14.9 % | 13.7 % |
| 6 | Contremaître | R | 14.1 | 1.08 | 14.0 % | 12.9 % |
| 12 | Tribunal | 4 | 13.9 | 1.17 | 16.3 % | 12.4 % |
| 26 | Mairie | R | 13.6 | 0.99 | 12.8 % | 13.1 % |
| 4 | Prison | 3 | 13.3 | 1.00 | 12.4 % | 12.8 % |
| 18 | Capitaine | 6R | 13.2 | 1.12 | 14.4 % | 12.2 % |
| 24 | Hôpital | 2R | 12.8 | 1.03 | 12.5 % | 12.3 % |
| 27 | Alchimiste royale | 8 | 12.7 | 1.34 | 16.4 % | 10.4 % |
| 16 | Maître fondeur | 7 | 12.6 | 1.13 | 13.8 % | 11.6 % |
| 34 | Chambellan | 8 | 12.4 | 0.96 | 11.4 % | 12.5 % |
| 25 | Cardinal | 2 | 12.4 | 0.87 | 9.6 % | 12.4 % |
| 23 | Roi | 6 | 12.3 | 1.38 | 17.0 % | 9.7 % |
| 7 | Assassin | 6 | 12.2 | 0.84 | 10.0 % | 13.0 % |
| 29 | Maison du commerce | 4 | 12.2 | 0.96 | 10.4 % | 11.9 % |
| 9 | Forge | R | 11.9 | 0.83 | 8.0 % | 11.9 % |
| 15 | Mine | 3R | 11.5 | 0.80 | 8.3 % | 12.3 % |
| 11 | Chancellerie | 2 | 11.3 | 1.15 | 10.0 % | 9.2 % |
| 33 | Grand argentier | 4 | 11.2 | 1.05 | 11.2 % | 10.7 % |
| 14 | Apothicaire | 2R | 11.2 | 1.30 | 14.4 % | 9.3 % |
| 32 | Ambassade | 3R | 10.7 | 0.94 | 9.2 % | 10.7 % |
| 19 | Hôtel des impôts | 4 | 9.9 | 0.80 | 7.1 % | 10.6 % |
| 17 | Cabinet d’architecte | 3R | 9.7 | 1.14 | 10.5 % | 8.9 % |
| 28 | Démolisseur | 5 | 8.9 | 1.15 | 9.7 % | 8.1 % |
| 30 | Archiviste royale | 7 | 8.7 | 1.39 | 11.9 % | 6.9 % |
| 8 | Carrière | R | 8.6 | 0.79 | 4.6 % | 8.1 % |
| 20 | Loge des bâtisseurs | 3 | 8.4 | 1.09 | 7.5 % | 7.5 % |
| 10 | Ferme | 5 | 8.4 | 1.20 | 9.5 % | 7.4 % |
| 2 | Banque | 2 | 8.0 | 1.05 | 7.5 % | 7.1 % |
| 3 | Négociant | 4 | 7.7 | 1.12 | 7.9 % | 7.1 % |
| 13 | Meunière | 1R | 7.4 | 0.84 | 5.4 % | 7.4 % |
| 21 | Aqueduc | 4 | 6.8 | 0.80 | 4.7 % | 7.3 % |
| 22 | Bibliothécaire | 5R | 6.8 | 1.11 | 7.2 % | 6.4 % |
| 31 | Cour du roi | 4R | 6.1 | 1.00 | 5.4 % | 6.0 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 7.23 cartes, un perdant 5.71.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Forgeron | 67.6 % | 3.3 | 22.6 % | 11.6 % | 32.4 % | 61.3 % |
| Épicerie | 85.2 % | 3.5 | 17.9 % | 17.0 % | 14.8 % | 74.2 % |
| Alchimiste | 45.4 % | 4.3 | 9.3 % | 7.8 % | 54.6 % | 39.3 % |
| Salle du trésor | 71.8 % | 4.5 | 5.4 % | 10.1 % | 28.2 % | 56.6 % |
| Marché | 59.4 % | 4.5 | 8.6 % | 9.6 % | 40.6 % | 48.1 % |
| Colporteur | 73.0 % | 4.6 | 1.9 % | 9.4 % | 27.0 % | 61.1 % |
| Tour de guet | 67.4 % | 4.9 | 3.9 % | 7.3 % | 32.6 % | 49.5 % |
| Cachot | 49.5 % | 5.8 | 1.8 % | 3.5 % | 50.5 % | 33.7 % |
| Imprimeur | 30.6 % | 6.3 | 1.4 % | 2.9 % | 69.4 % | 20.9 % |
| Docteur | 10.5 % | 8.9 | 0.0 % | 0.2 % | 89.5 % | 3.1 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Économie (n° 37) 87.6 %, Religion (n° 40) 79.2 %, Diplomatie (n° 36) 74.6 %, Production (n° 41) 73.5 %, Science (n° 42) 72.8 %, Justice (n° 35) 58.2 %, Progrès (n° 43) 56.7 %, Histoire (n° 38) 35.8 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 7 | Progresser d’un niveau de population coûte 5 or de moins | 25.4 % | 14.8 % | 1.36 | 42.2 % |
| 10 | Après avoir acheté 1 carte, révélez 1 carte | 22.3 % | 15.9 % | 1.21 | 39.7 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 21.3 % | 17.2 % | 1.12 | 48.1 % |
| 9 | Après avoir acheté 1 carte, vous pouvez jouer 1 carte de … | 21.0 % | 16.4 % | 1.15 | 36.0 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 20.9 % | 16.3 % | 1.14 | 47.3 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 20.7 % | 17.4 % | 1.09 | 50.5 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 18.0 % | 18.4 % | 0.96 | 54.6 % |
| 12 | Au début de chaque nouvelle lignée, révélez 1 carte et pa… | 17.5 % | 18.4 % | 0.94 | 54.5 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 17.0 % | 16.5 % | 1.02 | 28.4 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 16.9 % | 15.9 % | 1.05 | 23.4 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 15.6 % | 18.5 % | 0.88 | 32.3 % |
| 13 | À son tour, en plus de son action, le joueur peut payer 3… | 15.4 % | 19.8 % | 0.82 | 52.4 % |
| 11 | À son tour, en plus de son action, le joueur peut payer 7… | 13.1 % | 15.8 % | 0.90 | 20.1 % |
| 15 | À son tour, en plus de son action, le joueur peut payer 8… | 12.2 % | 13.6 % | 0.97 | 15.8 % |
| 14 | À son tour, en plus de son action, le joueur peut payer 2… | 9.1 % | 11.5 % | 0.91 | 12.7 % |
| 5 | Au début de chaque nouvelle lignée, gagnez 2 Or par Privi… | 7.4 % | 7.2 % | 1.11 | 10.3 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 3.3 % | 3.6 % | 1.05 | 10.7 % |
| 1 | Après avoir acheté 1 carte, gagnez 5 Or | 0.9 % | 0.5 % | 1.37 | 27.4 % |
| 18 | Chaque fois que le joueur révèle 1 carte, il gagne 4 Or | 0.8 % | 0.6 % | 1.23 | 27.1 % |
| 6 | Chaque fois que le joueur joue 1 carte avec un effet roug… | 0.7 % | 0.6 % | 1.17 | 28.8 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 14.0 % | 13.9 % | 0.81 | 2.94 | 2.76 | 42.5 % |
| Population | 16.1 % | 14.7 % | 0.82 | 2.68 | 2.12 | 33.0 % |
| Noblesse (Privilège) | 69.9 % | 71.4 % | 1.36 | 2.80 | 2.59 | 26.4 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 0.88 | 0.96 | 0.93 | 0.94 | 1.10 |
| Population | 0.51 | 0.86 | 0.76 | 1.11 | 1.46 |
| Privilèges | 0.68 | 0.80 | 0.89 | 1.05 | 1.19 |

## Cartes les plus jouées

| N° | Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|---:|
| départ | Docteur | 2.00 | 1.96 |
| départ | Colporteur | 1.16 | 1.14 |
| départ | Imprimeur | 1.10 | 1.01 |
| départ | Cachot | 0.94 | 1.01 |
| départ | Alchimiste | 0.78 | 0.69 |
| départ | Marché | 0.66 | 0.67 |
| départ | Salle du trésor | 0.64 | 0.75 |
| départ | Tour de guet | 0.44 | 0.53 |
| départ | Forgeron | 0.41 | 0.42 |
| 18 | Capitaine | 0.35 | 0.21 |
| départ | Épicerie | 0.34 | 0.42 |
| 5 | Intendante | 0.34 | 0.25 |
| 27 | Alchimiste royale | 0.34 | 0.15 |
| 38 | Histoire | 0.34 | 0.28 |
| 6 | Contremaître | 0.30 | 0.21 |
| 1 | Remouleur ambulant | 0.29 | 0.27 |
| 24 | Hôpital | 0.26 | 0.20 |
| 11 | Chancellerie | 0.25 | 0.17 |
| 43 | Progrès | 0.25 | 0.32 |
| 12 | Tribunal | 0.24 | 0.14 |

## Effets Rouges par carte

Combien de fois le voisin de droite profite de l'Effet Rouge d'une carte, quand elle est jouée. Seul le joueur de droite peut l’appliquer : au plus 1 fois par carte jouée. « Choisi » : le voisin a payé ou fait un choix ; sinon, c'est un gain automatique. « Utilisé par partie » : combien de fois, en moyenne, l'Effet Rouge de cette carte est appliqué dans une partie (tous joueurs confondus). Les cartes de départ portent le même nom dans les 4 couleurs : elles sont comptées ensemble (N° « départ »).

| N° | Carte | Utilisé par partie à 2 | Utilisé par partie à 3 | Utilisé par partie à 4 | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| départ | Salle du trésor | 1.56 | 2.18 | 2.70 | 193116 | 1.00 | 0.0 % | 0.79 | 0.68 |
| départ | Marché | 1.62 | 2.19 | 2.18 | 179716 | 1.00 | 0.0 % | 0.72 | 0.64 |
| départ | Cachot | 1.31 | 1.63 | 1.91 | 266074 | 0.55 | 100.0 % | 0.59 | 0.51 |
| départ | Épicerie | 0.91 | 1.20 | 1.42 | 105821 | 1.00 | 0.0 % | 0.45 | 0.37 |
| départ | Tour de guet | 0.57 | 0.67 | 0.77 | 135434 | 0.45 | 100.0 % | 0.29 | 0.19 |
| 11 | Chancellerie | 0.42 | 0.57 | 0.75 | 52495 | 1.00 | 0.0 % | 0.17 | 0.21 |
| 43 | Progrès | 0.43 | 0.60 | 0.72 | 79963 | 0.66 | 100.0 % | 0.22 | 0.18 |
| 9 | Forge | 0.43 | 0.56 | 0.69 | 50508 | 1.00 | 0.0 % | 0.21 | 0.17 |
| 26 | Mairie | 0.45 | 0.57 | 0.67 | 55547 | 0.91 | 0.0 % | 0.19 | 0.18 |
| 38 | Histoire | 0.39 | 0.54 | 0.67 | 81741 | 0.59 | 0.0 % | 0.18 | 0.17 |
| 15 | Mine | 0.36 | 0.46 | 0.52 | 59589 | 0.68 | 100.0 % | 0.17 | 0.14 |
| 24 | Hôpital | 0.32 | 0.42 | 0.53 | 60147 | 0.63 | 0.0 % | 0.15 | 0.14 |
| 35 | Justice | 0.30 | 0.38 | 0.47 | 39159 | 0.88 | 0.0 % | 0.14 | 0.12 |
| 8 | Carrière | 0.24 | 0.37 | 0.49 | 32795 | 1.00 | 0.0 % | 0.14 | 0.11 |
| 32 | Ambassade | 0.26 | 0.35 | 0.42 | 49653 | 0.62 | 0.0 % | 0.12 | 0.11 |
| 17 | Cabinet d’architecte | 0.20 | 0.28 | 0.37 | 39413 | 0.65 | 100.0 % | 0.09 | 0.09 |
| 36 | Diplomatie | 0.23 | 0.24 | 0.23 | 24540 | 0.85 | 0.0 % | 0.10 | 0.07 |
| 12 | Tribunal | 0.20 | 0.23 | 0.24 | 46708 | 0.43 | 100.0 % | 0.08 | 0.07 |
| 21 | Aqueduc | 0.14 | 0.23 | 0.30 | 29806 | 0.67 | 100.0 % | 0.09 | 0.07 |
| 20 | Loge des bâtisseurs | 0.13 | 0.21 | 0.28 | 34451 | 0.54 | 100.0 % | 0.07 | 0.07 |
| 4 | Prison | 0.17 | 0.20 | 0.23 | 45136 | 0.40 | 100.0 % | 0.07 | 0.06 |
| 19 | Hôtel des impôts | 0.15 | 0.20 | 0.24 | 32321 | 0.55 | 0.0 % | 0.08 | 0.06 |
| 31 | Cour du roi | 0.11 | 0.20 | 0.27 | 28828 | 0.60 | 100.0 % | 0.07 | 0.06 |
| 40 | Religion | 0.15 | 0.19 | 0.22 | 25077 | 0.66 | 100.0 % | 0.08 | 0.05 |
| 2 | Banque | 0.10 | 0.15 | 0.20 | 24876 | 0.55 | 100.0 % | 0.05 | 0.05 |
| 10 | Ferme | 0.10 | 0.15 | 0.19 | 23327 | 0.57 | 100.0 % | 0.05 | 0.05 |
| 42 | Science | 0.08 | 0.12 | 0.13 | 18766 | 0.53 | 100.0 % | 0.05 | 0.03 |
| 41 | Production | 0.06 | 0.07 | 0.05 | 10947 | 0.49 | 0.0 % | 0.03 | 0.02 |
| 37 | Économie | 0.00 | 0.00 | 0.00 | 6605 | 0.00 | 0.0 % | 0.00 | 0.00 |
| 29 | Maison du commerce | 0.00 | 0.00 | 0.00 | 45410 | 0.00 | 0.0 % | 0.00 | 0.00 |
