# Valeur des cartes pour les IA

Généré le 2026-10-14 par `npm run valeurs`.

## Comment lire ces tableaux

- La valeur d'une carte est exprimée **en Or** : 5 veut dire « vaut autant pour l'IA que 5 Or ».
- Elle additionne la valeur des ressources de la carte (Pierre, Métal, Érudit) et celle de son effet, coût de l'effet déduit.
- Elle est **calculée hors contexte** : l'IA ne regarde pas le reste de son deck. Un effet « par Pierre » ou « par blason » est compté comme s'il s'appliquait un nombre fixe de fois.
- Une valeur en *italique* est **sous le seuil de trash** de cette IA : c'est une carte dont elle accepte de se séparer.
- Ce tableau sert aux choix d'achat, de trash, de recherche et de défausse. Pour décider quelle carte **jouer**, l'IA recalcule la valeur de l'effet dans la situation du moment.
- La valeur de la vente au Marché ou au Commerce n'apparaît pas : elle est jugée au moment de vendre, carte par carte.

## Les poids qui fabriquent ces valeurs

| Poids | Ce qu'il mesure | Réglée à la main | Entraînée (champion) | Stratégie pioche | Stratégie acheteuse | Stratégie Population |
|---|---|---:|---:|---:|---:|---:|
| pioche | Valeur d'1 carte piochée | 4.0 | 1.1 | 11.6 | 3.5 | 0.7 |
| piocheCarte | Part de la valeur des cartes de sa pioche ajoutée à chaque pioche | 0.5 | 0.0 | 2.2 | -0.2 | 0.0 |
| piocheProche | Supplément quand la pioche se vide | 6.0 | 12.6 | 14.7 | 12.8 | 12.2 |
| trash | Valeur d'1 carte trashée | 8.0 | 8.5 | 3.3 | 5.7 | 8.3 |
| recherche | Valeur d'1 carte recherchée | 4.0 | 4.0 | 5.1 | 3.2 | 5.3 |
| lvlupEconomie | Valeur d'un niveau d'Économie | 6.0 | 4.3 | 3.5 | 4.0 | 3.1 |
| lvlupPopulation | Valeur d'un niveau de Population | 10.0 | 2.7 | 0.7 | 5.9 | 14.0 |
| privilege | Valeur d'un Privilège | 8.0 | 3.9 | 4.2 | 5.7 | 6.3 |
| rejouer | Valeur d'un Rejouer | 2.0 | 6.5 | 7.1 | 8.9 | 8.4 |
| pierre | Valeur d'1 Pierre | 1.5 | 2.2 | 3.1 | 1.5 | 3.2 |
| metal | Valeur d'1 Métal | 1.5 | 3.8 | 1.4 | 4.9 | 7.4 |
| erudit | Valeur d'1 Érudit | 1.5 | 0.0 | 0.2 | 0.7 | -1.1 |
| achat | Envie de base d'acheter (négatif : une carte de plus gêne) | -4.0 | -10.0 | -0.0 | 2.0 | -12.5 |
| seuilTrash | Une carte qui vaut moins que ce seuil peut être trashée | 6.0 | 9.9 | 1.5 | 13.1 | 12.1 |
| parTranche | Nombre de fois supposé pour un effet « par … » | 1.0 | 1.0 | 2.4 | 0.7 | 1.0 |

## Cartes de départ

| Carte | Effet | Réglée à la main | Entraînée (champion) | Stratégie pioche | Stratégie acheteuse | Stratégie Population |
|---|---|---:|---:|---:|---:|---:|
| Forgeron (M) | Trash 1 carte pour 2 Métal dans son aire de jeu | 9.5 | 12.1 | 9.2 | *8.9* | 15.5 |
| Salle du trésor (E) | Gagne 2 Or puis Rejouer | *5.5* | *8.6* | 9.3 | *11.5* | *9.3* |
| Tour de guet (M) | Paye 4 Or pour trasher 1 carte | *5.5* | *8.3* | *1.4* | *6.6* | *11.7* |
| Colporteur (P) | Gagne 2 Or, puis peut dépenser 8 Or pour piocher 1 c… | *3.5* | *4.2* | 8.7 | *3.5* | *5.2* |
| Épicerie (E) | Gagne 4 Or | *5.5* | *4.0* | 4.2 | *4.7* | *2.9* |
| Imprimeur (E) | Recherche 1 carte pour chaque 3 Érudits dans son air… | *5.5* | *3.9* | 12.5 | *2.8* | *4.0* |
| Marché (M) | Paye de la Pierre et du Métal pour gagner 2 Or pour … | *1.5* | *3.8* | *1.4* | *4.9* | *7.4* |
| Ferrailleur (P) | Pioche 1 carte pour chaque 2 Pierre dans son aire de… | *5.5* | *3.2* | 30.8 | *3.9* | *3.8* |
| Cachot (P) | Paye 3 Or pour piocher 1 carte | *2.5* | *2.2* | 11.7 | *2.0* | *3.2* |

## Cartes Assymétrie

| Carte | Effet | Réglée à la main | Entraînée (champion) | Stratégie pioche | Stratégie acheteuse | Stratégie Population |
|---|---|---:|---:|---:|---:|---:|
| Histoire (ME) | Gagne 3 Or puis Rejouer | 8.0 | 13.4 | 11.8 | 17.4 | 17.7 |
| Commerce (PM) | Paye de la Pierre et du Métal pour gagner 2 Or pour … | *3.0* | *6.0* | 4.5 | *6.4* | *10.6* |
| Économie (M) | Paye 1 Pierre pour Lvl up Économie | 6.0 | *5.8* | 1.9 | *7.4* | *7.4* |
| Justice (ME) | Gagne 2 Or par Blason Noblesse | *5.0* | *5.8* | 6.4 | *6.9* | *8.2* |
| Progrès (E) | Gagne 5 Or | 6.5 | *5.0* | 5.2 | *5.7* | *3.9* |
| Diplomatie (PE) | Gagne 2 Or par Blason Population | *5.0* | *4.2* | 8.1 | *3.5* | *4.0* |
| Production (PE) | Gagne 2 Or par Blason Économie | *5.0* | *4.2* | 8.1 | *3.5* | *4.0* |
| Religion (P) | Paye 1 Métal pour prendre 1 Privilège au choix parmi… | 8.0 | *2.3* | 5.8 | *2.3* | *3.2* |
| Science (P) | Paye 5 Or pour Lvl up Population | 6.5 | *2.2* | 3.1 | *2.4* | 12.2 |
| Éducation (E) | Gagne 2 Or par Érudit | *3.5* | *2.0* | 5.0 | *2.0* | *0.8* |

## Cartes Avancée

| Carte | Effet | Réglée à la main | Entraînée (champion) | Stratégie pioche | Stratégie acheteuse | Stratégie Population |
|---|---|---:|---:|---:|---:|---:|
| Maître fondeur (M) | Trash 1 carte pour 2 Métal dans son aire de jeu, pui… | 11.5 | 18.6 | 16.3 | 17.7 | 23.9 |
| Alchimiste royale (MM) | Trash 1 carte pour 2 Métal dans son aire de jeu | 11.0 | 15.9 | 10.6 | 13.8 | 22.9 |
| Ambassade (MMM) | Gagne 3 Or par Blason Noblesse | 7.5 | 14.3 | 11.5 | 16.8 | 25.1 |
| Aqueduc (MM) | Paye 1 Or pour piocher 1 carte, puis Rejoue | 8.0 | 14.2 | 20.6 | 21.2 | 23.3 |
| Contremaître (MM) | Rejouer | *5.0* | 14.1 | 10.0 | 18.7 | 23.3 |
| Mine (PP) | Paye 9 Or pour trasher 2 cartes | 10.0 | 12.5 | 6.2 | *5.5* | 14.0 |
| Remouleur ambulant (PP) | Rejouer | *5.0* | 11.0 | 13.3 | *11.9* | 14.8 |
| Maison du commerce (MME) | Paye 1 Or pour Lvl up Économie | 9.5 | 10.9 | 5.6 | 13.5 | 15.8 |
| Cour du roi (PPP) | Prend 1 Privilège au choix parmi les 4 visibles | 12.5 | 10.5 | 13.4 | *10.2* | 15.8 |
| Sapeur (PM) | Recherche 1 carte pour chaque 3 Érudits dans son air… | 7.0 | 9.9 | 16.8 | *8.6* | 15.8 |
| Comptoir maritime (MME) | Paye 1 Pierre pour Lvl up Économie | 9.0 | *9.6* | 3.5 | *12.9* | 13.7 |
| Halle des négociants (PE) | Paye de la Pierre et du Métal pour gagner 2 Or pour … | *5.0* | *8.8* | 10.4 | *11.0* | *10.5* |
| Bibliothécaire (PPE) | Recherche 1 carte pour chaque 3 Érudits dans son air… | 8.5 | *8.4* | 18.6 | *5.9* | *10.4* |
| Prison (E) | Trash 1 carte pour 2 Métal dans son aire de jeu | 9.5 | *8.3* | 8.0 | *4.6* | *6.9* |
| Hôtel des impôts (PPE) | Gagne 3 Or par Blason Économie | 7.5 | *7.3* | 13.5 | *5.8* | *8.1* |
| Ferme (PM) | Pioche 1 carte pour chaque 2 Pierre dans son aire de… | 7.0 | *7.0* | 32.2 | *8.8* | *11.2* |
| Archiviste royale (PEE) | Recherche 1 carte pour chaque 3 Érudits dans son air… | 8.5 | *6.2* | 15.7 | *5.0* | *6.1* |
| Forge (M) | Gagne 2 Or | *3.5* | *5.8* | 3.4 | *6.9* | *9.4* |
| Apothicairerie (ME) | Gagne 2 Or par Érudit | *5.0* | *5.8* | 6.4 | *6.9* | *8.2* |
| Démolisseur (PP) | Pioche 1 carte pour chaque 2 Pierre dans son aire de… | 7.0 | *5.5* | 33.9 | *5.5* | *7.0* |
| Cardinal (ME) | Paye 3 Pierre pour Trasher 1 carte par blason Popula… | 6.5 | *5.5* | 1.6 | *5.6* | *6.3* |
| Carrière (P) | Gagne 3 Or | *4.5* | *5.2* | 6.1 | *4.5* | *6.2* |
| Mairie (PE) | Gagne 3 Or par Blason Population | 6.0 | *5.1* | 10.4 | *4.2* | *5.0* |
| Grand argentier (PPE) | Paye 2 Métal pour piocher 1 carte par blason Économie | *5.5* | *4.4* | 31.2 | *3.7* | *5.2* |
| Roi (PP) | Paye 2 Métal pour piocher 1 carte par blason Noblesse | *4.0* | *4.4* | 31.0 | *3.0* | *6.4* |
| Cabinet d'architecte (M) | Paye 5 Or pour Lvl up Population | 6.5 | *3.8* | *1.4* | *5.8* | 16.4 |
| Moulin (M) | Paye 6 Or pour piocher 2 cartes | *3.5* | *3.8* | 18.6 | *5.9* | *7.4* |
| Banque (P) | Pioche 1 carte pour chaque 2 Pierre dans son aire de… | *5.5* | *3.2* | 30.8 | *3.9* | *3.8* |
| Assassin (P) | Paye 2 Métal pour trasher 1 carte par blason Économie | 6.5 | *2.9* | 8.0 | *1.5* | *3.2* |
| Tribunal (P) | Paye 2 Métal pour trasher 1 carte par blason Noblesse | 6.5 | *2.9* | 8.0 | *1.5* | *3.2* |
| Loge des bâtisseurs (PE) | Paye 1 Métal pour Lvl up Population | 11.5 | *2.2* | 3.3 | *3.2* | *8.6* |
| Hôpital (EE) | Gagne 2 Or par Érudit | *5.0* | *2.0* | 5.2 | *2.7* | *-0.3* |
| Chancellerie (E) | Paye 1 Métal pour prendre 1 Privilège au choix parmi… | 8.0 | *0.1* | 2.9 | *1.4* | *-1.1* |

## Note d'achat des cartes Avancée pour l'IA entraînée

C'est la note que l'IA donne à l'action « acheter cette carte », comparée aux autres actions de son tour.
Une note négative signifie qu'elle préfère presque toujours faire autre chose. Les Ressources du coût sont comptées à la valeur moyenne d'une Pierre ou d'un Métal.

| Carte | Coût | Valeur | Note d'achat seul | Note d'achat avec trash à 1 Or |
|---|---|---:|---:|---:|
| Maître fondeur | 4 | 18.6 | 4.6 | 12.1 |
| Contremaître | 3 | 14.1 | 1.1 | 8.6 |
| Alchimiste royale | 6 | 15.9 | -0.2 | 7.4 |
| Aqueduc | 5 | 14.2 | -0.8 | 6.7 |
| Remouleur ambulant | 2 | 11.0 | -1.0 | 6.5 |
| Mine | RR | 12.5 | -2.0 | 5.6 |
| Ambassade | RRR | 14.3 | -2.4 | 5.2 |
| Halle des négociants | 2 | 8.8 | -3.2 | 4.3 |
| Prison | 2 | 8.3 | -3.7 | 3.8 |
| Sapeur | RR | 9.9 | -4.5 | 3.0 |
| Comptoir maritime | 5 | 9.6 | -5.4 | 2.2 |
| Bibliothécaire | 2R | 8.4 | -5.9 | 1.7 |
| Ferme | 3 | 7.0 | -6.0 | 1.6 |
| Maison du commerce | 7 | 10.9 | -6.2 | 1.4 |
| Forge | R | 5.8 | -6.4 | 1.1 |
| Hôtel des impôts | 4 | 7.3 | -6.7 | 0.9 |
| Cour du roi | 3RR | 10.5 | -6.9 | 0.6 |
| Carrière | R | 5.2 | -7.0 | 0.5 |
| Cabinet d'architecte | R | 3.8 | -8.4 | -0.9 |
| Apothicairerie | 2R | 5.8 | -8.5 | -0.9 |
| Banque | R | 3.2 | -9.0 | -1.4 |
| Mairie | RR | 5.1 | -9.3 | -1.8 |
| Démolisseur | 6 | 5.5 | -10.6 | -3.0 |
| Cardinal | 6 | 5.5 | -10.6 | -3.0 |
| Roi | 5 | 4.4 | -10.6 | -3.1 |
| Moulin | RR | 3.8 | -10.6 | -3.1 |
| Archiviste royale | 7 | 6.2 | -10.8 | -3.3 |
| Assassin | 4 | 2.9 | -11.1 | -3.6 |
| Tribunal | 4 | 2.9 | -11.1 | -3.6 |
| Hôpital | RR | 2.0 | -12.4 | -4.9 |
| Loge des bâtisseurs | 5 | 2.2 | -12.8 | -5.3 |
| Grand argentier | 8 | 4.4 | -13.6 | -6.0 |
| Chancellerie | 4 | 0.1 | -13.9 | -6.4 |
