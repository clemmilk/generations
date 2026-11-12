# Analyse des parties entre IA — 2026-11-12

Bot : **IA entraînée** à tous les sièges. 20000 parties par taille de table (4 joueurs), graines 1 à 20000.

80000 joueurs observés, dont 20000 vainqueurs.

> Ces chiffres décrivent la façon de jouer de ce bot, pas celle d'un joueur humain. Une carte peu utilisée peut être faible, ou simplement ignorée par le bot.

## Vue d'ensemble

|  | 4 joueurs |
|---|---:|
| Parties terminées | 20000 / 20000 |
| Tours de table du vainqueur | 17.9 |
| Lignées du vainqueur | 5.6 |
| Victoires du 1er joueur | 20.6 % |
| Victoires du 2e joueur | 24.8 % |
| Victoires du 3e joueur | 29.3 % |
| Victoires du 4e joueur | 25.3 % |

À force égale, chaque joueur gagnerait 50 %, 33,3 % ou 25 % des parties selon la taille de la table.

## Profil des vainqueurs et des perdants

| Moyenne par joueur | Vainqueurs | Perdants |
|---|---:|---:|
| Cartes achetées | 3.15 | 3.02 |
| Cartes trashées | 8.05 | 6.00 |
| Cartes dans le deck à la fin | 7.09 | 9.02 |
| Cartes jouées par lignée | 2.59 | 2.54 |
| Tours par lignée | 3.24 | 3.25 |
| Tours gagnés par Rejouer | 0.00 | 0.00 |
| Pioches supplémentaires | 5.30 | 4.06 |
| Effets Rouges choisis | 2.28 | 1.88 |
| Effets Rouges automatiques | 4.13 | 3.73 |
| Privilèges | 2.51 | 2.45 |
| Niveau d'Économie final | 3.15 | 2.89 |
| Niveau de Population final | 2.40 | 2.19 |

Attention : la partie s'arrête dès qu'un joueur gagne. Les perdants ont donc joué un peu moins longtemps, ce qui explique une partie des écarts.

## Cartes Assymétrie reçues au départ

Ces cartes sont distribuées au hasard : c'est la mesure la plus fiable de ce rapport, car elle ne dépend d'aucun choix du joueur.

| Carte | Joueurs l'ayant reçue | Indice de victoire | À 4 | Encore dans le deck des vainqueurs |
|---|---:|---:|---:|---:|
| Histoire | 20000 | 1.03 | 1.03 | 43.0 % |
| Science | 20000 | 1.03 | 1.03 | 19.1 % |
| Production | 20000 | 1.02 | 1.02 | 17.1 % |
| Économie | 20000 | 1.01 | 1.01 | 7.9 % |
| Justice | 20000 | 1.01 | 1.01 | 28.3 % |
| Diplomatie | 20000 | 0.98 | 0.98 | 14.8 % |
| Religion | 20000 | 0.97 | 0.97 | 12.5 % |
| Progrès | 20000 | 0.94 | 0.94 | 31.3 % |

## Cartes Avancée achetées

En moyenne, un vainqueur achète 3.15 carte(s) et un perdant 3.02.

| Carte | Coût | Achats pour 100 joueurs | Indice de victoire des acheteurs | Dans le deck final des vainqueurs | Dans le deck final des perdants |
|---|---:|---:|---:|---:|---:|
| Alchimiste royale | 6 | 16.2 | 1.82 | 28.0 % | 11.6 % |
| Intendante | 5 | 15.9 | 1.06 | 15.9 % | 15.4 % |
| Maître fondeur | 5 | 15.8 | 1.11 | 16.6 % | 15.0 % |
| Prison | 2 | 15.7 | 1.07 | 15.3 % | 14.7 % |
| Contremaître | 2 | 15.6 | 1.07 | 14.9 % | 14.8 % |
| Hôpital | R | 15.4 | 0.87 | 12.0 % | 15.5 % |
| Capitaine | 6R | 15.3 | 1.33 | 19.6 % | 13.5 % |
| Mine | 1R | 15.1 | 0.73 | 9.5 % | 15.9 % |
| Chambellan | 8 | 14.5 | 0.89 | 11.9 % | 14.9 % |
| Maison du commerce | 4 | 14.3 | 1.03 | 13.0 % | 13.6 % |
| Forge | R | 13.9 | 0.75 | 7.8 % | 13.8 % |
| Mairie | R | 12.6 | 0.92 | 10.4 % | 12.4 % |
| Cabinet d’architecte | 3R | 12.1 | 0.94 | 10.5 % | 12.0 % |
| Tribunal | 4 | 11.2 | 1.00 | 10.7 % | 11.1 % |
| Carrière | R | 10.5 | 0.68 | 3.8 % | 9.0 % |
| Hôtel des impôts | 4 | 10.4 | 0.76 | 6.6 % | 10.8 % |
| Bibliothécaire | 5R | 9.9 | 0.86 | 8.1 % | 10.1 % |
| Roi | 6 | 9.3 | 1.46 | 13.3 % | 7.7 % |
| Cour du roi | 4R | 9.1 | 0.89 | 7.0 % | 9.0 % |
| Assassin | 6 | 8.5 | 0.81 | 6.5 % | 8.9 % |
| Apothicaire | 2R | 7.4 | 1.38 | 10.1 % | 6.4 % |
| Archiviste royale | 8 | 5.6 | 1.39 | 7.6 % | 4.8 % |
| Meunière | 1R | 4.6 | 0.88 | 3.6 % | 4.4 % |
| Loge des bâtisseurs | 3 | 4.3 | 0.77 | 2.2 % | 3.9 % |
| Chancellerie | 2 | 4.1 | 1.01 | 2.3 % | 2.9 % |
| Aqueduc | 5 | 3.5 | 0.86 | 2.7 % | 3.5 % |
| Banque | 3 | 3.2 | 1.01 | 3.0 % | 3.0 % |
| Ambassade | 5R | 3.2 | 0.70 | 2.0 % | 3.5 % |
| Grand argentier | 5 | 3.1 | 1.22 | 3.5 % | 2.8 % |
| Ferme | 7 | 2.2 | 1.26 | 2.6 % | 1.9 % |
| Démolisseur | 7 | 1.9 | 1.34 | 2.4 % | 1.6 % |
| Négociant | 5 | 0.8 | 1.22 | 0.8 % | 0.7 % |
| Remouleur ambulant | 3 | 0.1 | 0.81 ? | 0.1 % | 0.1 % |
| Cardinal | 4 | 0.1 | 0.67 ? | 0.0 % | 0.1 % |

Jamais achetées : aucune.

Un indice suivi de « ? » repose sur trop peu de parties pour être fiable.

## Cartes de départ : lesquelles sont trashées, et dans quel ordre

Un vainqueur trashe en moyenne 8.05 cartes, un perdant 6.00.

| Carte de départ | Trashée par les vainqueurs | Rang moyen du trash | Trashée en 1er | Trashée en 2e | Gardée jusqu'à la fin (vainqueurs) | Trashée par les perdants |
|---|---:|---:|---:|---:|---:|---:|
| Forgeron | 81.8 % | 3.5 | 23.0 % | 12.3 % | 18.2 % | 70.4 % |
| Épicerie | 91.3 % | 3.6 | 19.3 % | 17.2 % | 8.6 % | 80.0 % |
| Colporteur | 86.9 % | 4.3 | 3.8 % | 16.2 % | 13.1 % | 73.0 % |
| Salle du trésor | 83.0 % | 4.5 | 5.6 % | 11.9 % | 17.0 % | 65.2 % |
| Alchimiste | 48.2 % | 4.8 | 8.8 % | 6.1 % | 51.8 % | 40.4 % |
| Ferrailleur | 61.3 % | 5.1 | 6.6 % | 7.2 % | 38.7 % | 46.1 % |
| Cachot | 57.7 % | 6.0 | 1.9 % | 3.1 % | 42.3 % | 39.2 % |
| Imprimeur | 47.0 % | 6.1 | 1.8 % | 3.3 % | 53.0 % | 26.6 % |
| Tour de guet | 45.5 % | 7.4 | 0.1 % | 0.4 % | 54.5 % | 19.1 % |
| Marché | 15.4 % | 8.5 | 0.1 % | 0.3 % | 84.6 % | 3.4 % |

Le rang moyen indique à quel moment la carte part : 1 = toujours la première trashée.

Cartes Assymétrie trashées par leur propriétaire vainqueur : Économie 92.1 %, Religion 87.5 %, Diplomatie 85.2 %, Production 82.9 %, Science 80.9 %, Justice 71.7 %, Progrès 68.7 %, Histoire 57.0 %.

## Privilèges

| Privilège | Effet | Chez les vainqueurs | Chez les perdants | Indice de victoire des possesseurs | Pris en 1er par ses possesseurs |
|---|---:|---:|---:|---:|---:|
| 7 | Progresser d’un niveau de population coûte 5 or de moins | 18.6 % | 15.4 % | 1.15 | 49.0 % |
| 10 | Après avoir acheté 1 carte, révélez 1 carte | 18.6 % | 15.2 % | 1.16 | 46.4 % |
| 9 | Après avoir acheté 1 carte, vous pouvez jouer 1 carte de … | 17.8 % | 15.5 % | 1.11 | 43.7 % |
| 2 | Chaque carte avancée rapporte également 1 Érudit | 17.3 % | 15.2 % | 1.10 | 52.0 % |
| 20 | Chaque fois que le joueur joue 1 carte avancée, il gagne … | 17.1 % | 15.9 % | 1.06 | 53.3 % |
| 19 | Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | 17.1 % | 15.0 % | 1.10 | 28.7 % |
| 3 | Chaque carte avancée rapporte également 1 Pierre | 16.4 % | 16.1 % | 1.02 | 51.4 % |
| 16 | 1 symbole Érudit, valable pour toutes les effets demandan… | 16.1 % | 15.2 % | 1.05 | 34.7 % |
| 8 | Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 16.1 % | 16.5 % | 0.98 | 53.8 % |
| 12 | Au début de chaque nouvelle lignée, révélez 1 carte et pa… | 15.4 % | 15.8 % | 0.98 | 54.1 % |
| 17 | Chaque fois que le joueur trash 1 carte, il gagne 1 Or | 14.2 % | 16.9 % | 0.87 | 39.6 % |
| 15 | À son tour, en plus de son action, le joueur peut payer 8… | 13.8 % | 13.6 % | 1.01 | 18.6 % |
| 11 | À son tour, en plus de son action, le joueur peut payer 7… | 13.6 % | 15.4 % | 0.91 | 24.2 % |
| 13 | À son tour, en plus de son action, le joueur peut payer 3… | 13.0 % | 17.2 % | 0.80 | 54.1 % |
| 14 | À son tour, en plus de son action, le joueur peut payer 2… | 10.3 % | 12.2 % | 0.88 | 15.5 % |
| 5 | Au début de chaque nouvelle lignée, gagnez 2 Or par Privi… | 8.8 % | 7.9 % | 1.08 | 10.8 % |
| 4 | Chaque carte avancée rapporte également 1 Metal | 4.5 % | 3.9 % | 1.11 | 10.2 % |
| 1 | Toutes les cartes de la pioche commune coûtent 3 Or de mo… | 0.9 % | 0.7 % | 1.21 | 21.4 % |
| 6 | Chaque fois que le joueur joue 1 carte avec un effet roug… | 0.8 % | 0.7 % | 1.16 | 22.4 % |
| 18 | Chaque fois que le joueur met fin à sa lignée, après avoi… | 0.7 % | 0.6 % | 1.15 | 23.9 % |

Posséder un Privilège est en partie une conséquence du fait de bien jouer (il faut des Érudits ou une carte pour l'obtenir) : un indice élevé ne prouve pas à lui seul que la tuile est forte. La comparaison entre tuiles reste parlante.

## Jauges : lesquelles sont montées en priorité

|  | Première montée (vainqueurs) | Première montée (perdants) | Parmi les 3 premières montées (vainqueurs) | Niveau final moyen (vainqueurs) | Niveau final moyen (perdants) | Au maximum (vainqueurs) |
|---|---:|---:|---:|---:|---:|---:|
| Économie | 16.6 % | 12.0 % | 1.00 | 3.15 | 2.89 | 45.0 % |
| Population | 19.8 % | 22.7 % | 0.85 | 2.40 | 2.19 | 13.4 % |
| Noblesse (Privilège) | 63.5 % | 65.3 % | 1.15 | 2.51 | 2.45 | 19.7 % |

| Indice de victoire selon le niveau final | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Économie | 1.20 ? | 0.72 | 0.76 | 0.95 | 1.25 |
| Population | 0.48 | 0.95 | 0.79 | 1.30 | 1.21 |
| Privilèges | 1.19 | 1.09 | 0.87 | 1.00 | 1.20 |

## Cartes les plus jouées

| Carte | Fois jouée par partie (vainqueurs) | Fois jouée par partie (perdants) |
|---|---:|---:|
| Marché | 1.80 | 1.93 |
| Tour de guet | 1.12 | 1.18 |
| Colporteur | 0.90 | 0.99 |
| Ferrailleur | 0.89 | 0.94 |
| Alchimiste | 0.87 | 0.67 |
| Imprimeur | 0.81 | 0.85 |
| Cachot | 0.79 | 0.88 |
| Alchimiste royale | 0.73 | 0.19 |
| Capitaine | 0.52 | 0.25 |
| Salle du trésor | 0.44 | 0.59 |
| Intendante | 0.42 | 0.30 |
| Contremaître | 0.33 | 0.26 |
| Maître fondeur | 0.32 | 0.23 |
| Prison | 0.28 | 0.17 |
| Hôpital | 0.26 | 0.27 |
| Mine | 0.25 | 0.29 |
| Forgeron | 0.23 | 0.30 |
| Chambellan | 0.21 | 0.22 |
| Maison du commerce | 0.21 | 0.20 |
| Histoire | 0.21 | 0.23 |

## Effets Rouges par carte

Combien de fois le voisin de droite profite de l'Effet Rouge d'une carte, quand elle est jouée. Seul le joueur de droite peut l’appliquer : au plus 1 fois par carte jouée. « Choisi » : le voisin a payé ou fait un choix ; sinon, c'est un gain automatique.

| Carte | Fois jouée (toutes parties) | Effet Rouge utilisé, pour 1 carte jouée | dont choisi | Utilisé par partie (vainqueurs) | Utilisé par partie (perdants) |
|---|---:|---:|---:|---:|---:|
| Marché | 151564 | 1.00 | 0.0 % | 2.02 | 1.85 |
| Tour de guet | 93474 | 0.48 | 100.0 % | 0.72 | 0.50 |
| Salle du trésor | 44453 | 1.00 | 0.0 % | 0.60 | 0.54 |
| Cachot | 68436 | 0.61 | 100.0 % | 0.54 | 0.52 |
| Épicerie | 21343 | 1.00 | 0.0 % | 0.29 | 0.26 |
| Forge | 17137 | 1.00 | 0.0 % | 0.24 | 0.20 |
| Mine | 22384 | 0.71 | 100.0 % | 0.23 | 0.19 |
| Progrès | 21075 | 0.68 | 100.0 % | 0.20 | 0.17 |
| Mairie | 14288 | 0.91 | 0.0 % | 0.17 | 0.16 |
| Carrière | 11116 | 1.00 | 0.0 % | 0.16 | 0.13 |
| Hôpital | 21541 | 0.58 | 0.0 % | 0.16 | 0.15 |
| Cabinet d’architecte | 14132 | 0.69 | 100.0 % | 0.13 | 0.12 |
| Histoire | 17830 | 0.55 | 0.0 % | 0.13 | 0.12 |
| Cour du roi | 12527 | 0.64 | 100.0 % | 0.11 | 0.10 |
| Justice | 8903 | 0.88 | 0.0 % | 0.11 | 0.09 |
| Prison | 15848 | 0.41 | 100.0 % | 0.09 | 0.08 |
| Hôtel des impôts | 10642 | 0.55 | 0.0 % | 0.08 | 0.07 |
| Tribunal | 9182 | 0.46 | 100.0 % | 0.07 | 0.05 |
| Diplomatie | 4784 | 0.87 | 0.0 % | 0.06 | 0.05 |
| Chancellerie | 4510 | 1.00 | 0.0 % | 0.05 | 0.06 |
| Religion | 4364 | 0.71 | 100.0 % | 0.05 | 0.04 |
| Aqueduc | 3995 | 0.70 | 100.0 % | 0.04 | 0.03 |
| Loge des bâtisseurs | 4282 | 0.60 | 100.0 % | 0.03 | 0.03 |
| Ambassade | 3710 | 0.62 | 0.0 % | 0.03 | 0.03 |
| Science | 3194 | 0.61 | 100.0 % | 0.03 | 0.02 |
| Banque | 2763 | 0.61 | 100.0 % | 0.02 | 0.02 |
| Production | 1556 | 0.55 | 0.0 % | 0.01 | 0.01 |
| Ferme | 1438 | 0.63 | 100.0 % | 0.01 | 0.01 |
| Économie | 769 | 0.00 | 0.0 % | 0.00 | 0.00 |
| Maison du commerce | 16030 | 0.00 | 0.0 % | 0.00 | 0.00 |
