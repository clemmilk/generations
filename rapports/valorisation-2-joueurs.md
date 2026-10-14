# Valeur des éléments du jeu pour l'IA qui planifie (parties à 2 joueurs)

Généré le 2026-10-14 par `npm run valorisation` : 300 situations de vraies parties, 60 suites simulées par situation et par élément.

Chaque valeur dit **combien d'Or ce bonus vaut pour l'IA qui planifie**, au début de son tour, en moyenne sur toute la partie : 
on mesure de combien l'élément augmente ses chances de gagner, puis on divise par ce qu'apporte 1 Or.
Repère : 1 Or augmente ses chances de gagner de 0.50 point(s).

> Ces valeurs dépendent de sa façon de jouer : elle imagine la suite avec l'IA entraînée pour guide.
> Une valeur négative veut dire que l'élément la gêne. Les petites valeurs (moins de 1 Or environ) sont dans la marge de bruit.

## Or

| Élément | Valeur en Or |
|---|---:|
| +6 Or | 4.6 |
| +3 Or | 3.0 |
| +1 Or | 1.4 |

## Actions

| Élément | Valeur en Or |
|---|---:|
| Piocher 1 carte maintenant | 11.3 |
| 1 action de plus (un tour supplémentaire) | 10.8 |

## Jauges

| Élément | Valeur en Or |
|---|---:|
| +1 niveau de Population | 13.9 |
| +1 niveau d'Économie | 2.3 |

## Privilèges

| Élément | Valeur en Or |
|---|---:|
| Privilège 12 : Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 42.1 |
| Privilège 8 : Au début de chaque nouvelle lignée, le joueur pioche 1 ca… | 14.8 |
| Privilège 3 : Chaque carte qui rapporte au moins 1 Pierre, rapporte 1 P… | 6.5 |
| Privilège 16 : 1 symbole Érudit, valable pour toutes les effets demandan… | 6.5 |
| Privilège 2 : Chaque carte qui rapporte au moins 1 Métal, rapporte égal… | 5.9 |
| Privilège 4 : Chaque carte qui rapporte au moins 1 Érudit, rapporte éga… | 5.1 |
| Privilège 15 : À son tour, à la place de son action, le joueur peut paye… | 2.1 |
| Privilège 18 : Chaque fois que le joueur met fin à sa lignée, après avoi… | -0.2 |
| Privilège 19 : Au début de chaque nouvelle lignée, le joueur gagne 3 Or … | -1.6 |
| Privilège 17 : Chaque fois que le joueur trash 1 carte, il gagne 2 Or | -1.8 |
| Privilège 11 : Au début de chaque nouvelle lignée, le joueur gagne 2 or … | -3.0 |
| Privilège 20 : Chaque fois que le joueur utilise un Effet rouge d'un adv… | -3.2 |
| Privilège 9 : Au début de chaque nouvelle lignée, le joueur gagne 2 or … | -3.4 |
| Privilège 14 : À son tour, à la place de son action, le joueur peut paye… | -4.3 |
| Privilège 10 : Au début de chaque nouvelle lignée, le joueur gagne 2 or … | -4.8 |
| Privilège 1 : Toutes les cartes de la pioche commune coûtent 2 Or de moins | -5.6 |
| Privilège 13 : À son tour, à la place de son action, le joueur peut paye… | -6.0 |
| Privilège 7 : 1 blason Noblesse supplémentaire | -6.2 |
| Privilège 6 : 1 blason Économie supplémentaire | -7.0 |
| Privilège 5 : 1 blason Population supplémentaire | -7.1 |

## Cartes de départ (en main)

| Élément | Valeur en Or |
|---|---:|
| Forgeron | 0.2 |
| Ferrailleur | -28.8 |
| Tour de guet | -29.7 |
| Imprimeur | -30.2 |
| Salle du trésor | -30.5 |
| Marché | -32.0 |
| Cachot | -34.1 |
| Colporteur | -35.1 |
| Épicerie | -38.1 |

## Trasher une carte de départ

| Élément | Valeur en Or |
|---|---:|
| Épicerie | 43.0 |
| Imprimeur | 37.5 |
| Marché | 37.2 |
| Salle du trésor | 35.7 |
| Cachot | 35.2 |
| Colporteur | 34.2 |
| Ferrailleur | 32.2 |
| Tour de guet | 29.8 |
| Forgeron | 11.7 |

## Cartes Assymétrie (en main)

| Élément | Valeur en Or |
|---|---:|
| Histoire | 4.8 |
| Commerce | -22.3 |
| Justice | -27.7 |
| Économie | -30.6 |
| Diplomatie | -35.0 |
| Production | -35.8 |
| Science | -35.9 |
| Éducation | -36.3 |
| Progrès | -37.8 |
| Religion | -39.4 |

## Cartes Avancée (en main)

| Élément | Valeur en Or |
|---|---:|
| Alchimiste royale | 47.8 |
| Maître fondeur | 12.0 |
| Aqueduc | 8.6 |
| Ambassade | 5.6 |
| Contremaître | 4.1 |
| Archiviste royale | -7.2 |
| Moulin | -15.2 |
| Comptoir maritime | -15.6 |
| Démolisseur | -15.7 |
| Maison du commerce | -15.9 |
| Grand argentier | -17.9 |
| Remouleur ambulant | -19.9 |
| Halle des négociants | -20.8 |
| Bibliothécaire | -21.1 |
| Mine | -21.7 |
| Cour du roi | -24.0 |
| Sapeur | -24.4 |
| Apothicairerie | -25.6 |
| Cardinal | -27.0 |
| Assassin | -27.6 |
| Forge | -29.1 |
| Ferme | -30.3 |
| Cabinet d'architecte | -31.1 |
| Banque | -31.1 |
| Hôtel des impôts | -33.3 |
| Roi | -33.5 |
| Loge des bâtisseurs | -34.5 |
| Hôpital | -35.4 |
| Chancellerie | -35.6 |
| Mairie | -35.6 |
| Carrière | -37.9 |
| Tribunal | -41.0 |
| Prison | -43.6 |
