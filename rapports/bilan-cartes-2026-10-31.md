# Bilan de toutes les cartes — version du 30/10

Synthèse des tests du 30 et du 31 octobre 2026. Toutes les parties sont jouées **à 3 joueurs**, avec la règle d'Effet Rouge en vigueur (pour le joueur précédent seulement).

## D'où viennent les chiffres

| Source | IA | Parties | Ce qu'elle mesure | Fiabilité |
|---|---|---:|---|---|
| [Parties jumelles d'hier](force-cartes-entrainee-3j-2026-10-30.md) | IA entraînée | 10 000 par expérience | Effet réel de chaque carte Avancée (±0,4 point) | **Forte** : on rejoue la même partie avec et sans la carte |
| [Analyse d'hier soir](analyse-planificatrice-2026-10-30-3j.md) | IA qui planifie | 2 000 | Indice de victoire des acheteurs, Domaines, Privilèges, cartes de départ | **Faible pour les cartes achetées** (simple corrélation), forte pour les Domaines |
| [Parties jumelles de cette nuit](force-cartes-planificatrice-3j-2026-10-31.md) | IA qui planifie | 1 000 par expérience | Effet réel de 3 cartes : Hôtel des impôts, Forge, Grand argentier (±2 points) | **Moyenne** : même méthode, mais moins de parties |
| Relevé des paiements | IA entraînée | 3 000 | Combien de fois l'IA paye l'effet d'une carte quand elle la joue | Descriptif |

**Comment lire les écarts des parties jumelles :**
- **Interdite** : un joueur n'a pas le droit d'acheter la carte. Un écart négatif veut dire que la carte lui manque, donc qu'elle est utile. Un écart positif veut dire qu'il joue *mieux* sans elle : l'IA la surestime, c'est un piège.
- **Prioritaire** : le joueur l'achète dès qu'il peut. Forcer un achat désorganise presque toujours le jeu, donc presque toutes les cartes ont un écart négatif. Il faut lire cette colonne **en comparant les cartes entre elles** (le rang sur 34), pas en valeur absolue.
- Un écart de −1,0 veut dire 1 partie gagnée de moins sur 100. À 3 joueurs, on en gagne 33,3 sur 100 en moyenne.

**Comment lire l'indice de victoire de l'IA qui planifie :**
- 1,00 = les acheteurs gagnent autant que la moyenne ; 1,20 = 20 % de victoires en plus.
- C'est une corrélation : une carte chère est achetée par des joueurs déjà riches, donc déjà bien partis. Un bon indice ne prouve pas que la carte est forte.

> Tous ces chiffres décrivent la façon de jouer de nos IA. Une carte qu'elles utilisent mal paraîtra plus faible qu'elle ne l'est pour un humain.

## L'essentiel

1. **Les cartes qui piochent ou recherchent selon les ressources de l'aire de jeu sont les meilleures** : Bibliothécaire, Archiviste royale, Ferme, Démolisseur, Sapeur. Les deux IA sont d'accord. Les vainqueurs de l'IA qui planifie piochent presque deux fois plus que les perdants (6,7 pioches supplémentaires contre 3,8).
2. **Les cartes qui demandent de payer pour leur effet sont presque toutes faibles**, surtout quand on paye en Pierre ou en Métal (il faut alors défausser des cartes de l'aire de jeu). L'IA entraînée ne paye *jamais* l'effet du Cabinet d'architecte ni de la Loge des bâtisseurs, et rarement celui du Négociant, du Grand argentier, du Roi et du Chambellan (23 à 32 % des fois).
3. **Monter les jauges est rarement rentable.** Toutes les cartes dont l'effet est « Lvl up » sont faibles. Chez l'IA qui planifie, finir avec une Économie haute est même associé à la défaite.
4. **Deux cartes très faibles** : Comptoir maritime et Négociant (−3,5 points quand on les force, les pires des 34).
5. **Trois pièges** : l'IA joue mieux quand on lui interdit la Forge (+4,6 points chez l'IA qui planifie), la Chancellerie (+0,8) et le Maître fondeur (+0,5).
6. **Domaines** : Histoire est trop forte (confirmé par les deux IA), Religion trop faible (idem). Économie est peut-être un peu faible.

## Cartes Avancées

Colonnes :
- **Rapporte** : ressources de la carte (P = Pierre, M = Métal, E = Érudit).
- **Interdite / Prioritaire** : parties jumelles de l'IA entraînée, en points. **!** = écart certain (pas dû au hasard). Le rang en prioritaire va de 1 (la meilleure à viser) à 34.
- **Indice** : indice de victoire des acheteurs chez l'IA qui planifie.
- **Effet payé** : part des fois où l'IA entraînée paye l'effet quand elle joue la carte (seulement pour les cartes dont l'effet commence par un paiement).

### Fortes : elles manquent quand on les interdit

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Bibliothécaire | 2R | PEE | Recherche 1 carte par 3 Érudits | −1,6 ! | −0,1 (8) | 1,18 | |
| Ferme | 5 | PM | Pioche 2 cartes par 3 Pierre | −1,5 ! | +0,6 ! (2) | 1,15 | |
| Archiviste royale | 4R | PE | Recherche 1 carte par 2 Érudits | −1,2 ! | +0,2 (3) | 1,28 | |
| Démolisseur | 7 | PP | Pioche 1 carte par 2 Pierre | −1,1 ! | +0,1 (6) | **1,38** | |
| Cour du roi | 3R | PPP | Prend 1 Privilège au choix | −1,0 ! | +0,1 (5) | 0,99 | |
| Sapeur | 5R | ME | Recherche 1 carte par 2 Érudits | −0,8 ! | +0,2 (4) | 1,17 | |

La Ferme est la seule carte qu'il vaut la peine de viser systématiquement chez l'IA entraînée. La Cour du roi est la seule carte « Privilège » forte, sans doute parce qu'elle donne le Privilège sans rien payer.

### Bonnes au bon moment : utiles, mais pas à acheter à tout prix

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Hôtel des impôts | 4 | PPE | Gagne 3 Or par blason Économie | −1,1 ! | +1,0 ! (1) | 1,02 | |
| Hôpital | R | EE | Gagne 2 Or par Érudit | −0,9 ! | −0,6 ! (10) | 0,94 | |
| Assassin | 6 | PE | Paye 3 Pierre : trash 1 carte par blason Économie | −0,8 ! | −1,3 ! (17) | 0,91 | 53 % |
| Meunière | 3R | M | Paye 10 Or : pioche 1 carte par blason Économie | −0,8 ! | −2,0 ! (21) | 0,82 | 48 % |
| Mine | R | PP | Paye 5 Or : trash 1 carte, deux fois | −0,8 ! | −0,2 (9) | 0,84 | 66 % |
| Apothicaire | 2R | PE | Paye 8 Or : pioche 1 carte par blason Noblesse | −0,6 ! | −0,7 ! (12) | 0,89 | 55 % |
| Banque | 3 | P | Pioche 1 carte par 2 Pierre | −0,6 ! | −0,7 ! (11) | 1,15 | |

**Hôtel des impôts : les deux IA divergent.** L'IA entraînée gagne à le viser (+1,0, la meilleure des 34). L'IA qui planifie, elle, *perd* à le viser : −2,6 points (de −4,5 à −0,7), et il lui manque un peu quand il est interdit (−1,4, pas certain). Conclusion prudente : bonne carte, mais à acheter quand on a déjà des blasons Économie, pas d'office.

### Moyennes : elles ne manquent pas, et ne font pas vraiment perdre

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Aqueduc | 5 | PP | Paye 3 Or : pioche 1 carte, deux fois | −0,1 | +0,0 (7) | 1,04 | 72 % |
| Remouleur ambulant | 3 | PP | Gagne 3 Or | +0,1 | −0,9 ! (13) | 0,87 | |
| Prison | 3 | M | Trash 1 carte par 2 Métal | +0,1 | −1,0 ! (14) | 0,79 | |
| Carrière | R | P | Gagne 6 Or | −0,0 | −1,1 ! (16) | 0,84 | |

### Incertaine

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Grand argentier | 8 | MME | Paye 3 Métal : pioche 1 carte par blason Économie | −0,1 | −1,7 ! (19) | 1,14 | 29 % |

Parties jumelles de l'IA qui planifie : interdite −1,7 (de −3,6 à +0,2), prioritaire −2,0 (de −4,0 à +0,0). Aucun des deux n'est certain.

Son bon indice (1,14) s'explique sans doute par son prix : seul un joueur déjà riche peut le payer 8 Or. Chez l'IA entraînée, il ne manque pas quand on l'interdit et fait perdre quand on le force ; son effet n'est payé qu'une fois sur trois. Rien ne montre qu'il soit fort ; rien ne prouve non plus qu'il soit faible. Pour trancher, il faudrait environ 4 fois plus de parties avec l'IA qui planifie, ou tester directement une variante.

### Faibles : elles ne manquent pas, et les forcer fait perdre

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Ambassade | 6R | PPE | Gagne 3 Or par blason Population | +0,0 | −1,5 ! (18) | 0,78 | |
| Maison du commerce | 6 | MMM | Lvl up Économie | +0,2 | −1,9 ! (20) | 0,76 | |
| Alchimiste royale | 6 | ME | Trash 1 carte par 2 Métal | −0,2 | −2,0 ! (22) | 0,92 | |
| Contremaître | 4 | MM | Gagne 3 Or | +0,0 | −2,2 ! (23) | 0,79 | |
| Mairie | 1R | ME | Gagne 3 Or par blason Noblesse | −0,0 | −2,3 ! (24) | 0,80 | |
| Cabinet d'architecte | 4 | PME | Paye 2 Métal : Lvl up Population | +0,1 | −2,4 ! (26) | 0,94 | **0 %** |
| Chambellan | 8 | PPMM | Paye 9 Or : pioche 1 carte par symbole Population | −0,1 | −2,5 ! (27) | 0,82 | 29 % |
| Tribunal | 4 | P | Paye 3 Pierre : trash 1 carte par blason Noblesse | +0,1 | −2,9 ! (28) | 0,78 | 64 % |
| Roi | 6 | MM | Paye 3 Métal : pioche 1 carte par blason Noblesse | −0,1 | −3,0 ! (29) | 0,84 | 32 % |
| Loge des bâtisseurs | 3 | PE | Paye 2 Pierre : Lvl up Population | +0,0 | −3,2 ! (31) | 0,78 | **0 %** |
| Cardinal | 5 | P | Paye 3 Pierre : trash 1 carte par blason Population | −0,1 | −3,2 ! (32) | 0,76 | 65 % |

### Très faibles

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Négociant | 5 | ME | Paye 3 Métal : pioche 1 carte par blason Population | +0,1 ! | −3,5 ! (33) | 0,75 | 23 % |
| Comptoir maritime | 6 | MME | Paye 2 Or : Lvl up Économie | +0,1 | −3,5 ! (34) | **0,65** | 50 % |

Les deux IA sont d'accord : ce sont les deux pires cartes du jeu.

### Pièges : l'IA joue mieux quand on les lui interdit

| Carte | Coût | Rapporte | Effet | Interdite | Prioritaire (rang) | Indice | Effet payé |
|---|---:|---|---|---:|---:|---:|---:|
| Forge | R | M | Gagne 5 Or | −0,1 | −1,1 ! (15) | **0,69** | |
| Maître fondeur | 7 | ME | Trash 2 cartes par 3 Métal | **+0,5 !** | −2,3 ! (25) | 0,90 | |
| Chancellerie | 3 | PE | Paye 2 Pierre : prend 1 Privilège au choix | **+0,8 !** | −3,1 ! (30) | 0,87 | 84 % |

**La Forge** est le résultat le plus net de cette nuit. Chez l'IA qui planifie, l'interdire fait gagner **+4,6 points** (de +2,4 à +6,8), le plus gros effet mesuré jusqu'ici. La forcer fait perdre 2,6 points. Son indice de 0,69 n'était donc pas une illusion. À comparer avec la Carrière, même coût et même principe (Gagne 6 Or, rapporte de la Pierre), qui n'est que moyenne : la Forge rapporte moins d'Or, et rapporte du Métal, moins utile.

**La Chancellerie** est la carte dont l'IA entraînée paye le plus souvent l'effet (84 %) : elle se ruine en Pierre pour prendre des Privilèges, alors que c'est perdant. Le Maître fondeur est un piège plus léger.

## Domaines (cartes Assymétrie)

Distribués au hasard au départ : c'est la mesure la plus fiable de ce bilan. Taux de victoire des joueurs qui ont reçu le Domaine ; à force égale, il serait de **33,3 %**. **!** = écart certain.

| Domaine | Effet | IA entraînée (≈ 7 500 joueurs) | IA qui planifie (≈ 1 500 joueurs) | Verdict |
|---|---|---:|---:|---|
| Histoire | Gagne 2 Or par Érudit | 35,4 % ! | 36,7 % ! | **Trop forte** |
| Progrès | Gagne 4 Or | 36,1 % ! | 34,3 % | Un peu forte |
| Production | Gagne 2 Or par blason Économie | 34,1 % | 35,0 % | Équilibrée |
| Diplomatie | Gagne 2 Or par blason Population | 33,0 % | 34,7 % | Équilibrée |
| Justice | Gagne 2 Or par blason Noblesse | 33,3 % | 33,3 % | Équilibrée |
| Science | Paye 2 Métal : Lvl up Population | 33,0 % | 31,3 % | Équilibrée |
| Économie | Paye 2 Or : Lvl up Économie | 32,7 % | 30,3 % ! | Peut-être un peu faible |
| Religion | Paye 2 Pierre : prend 1 Privilège au choix | 29,0 % ! | 30,7 % ! | **Trop faible** |

Fourchettes : environ ±1,1 point pour l'IA entraînée, ±2,4 points pour l'IA qui planifie. Les parties jumelles de cette nuit donnent les mêmes tendances (Histoire 36,9 %, Religion 30,3 %), mais elles reprennent les mêmes graines que l'analyse d'hier soir : ce n'est pas une confirmation indépendante.

On retrouve le constat des cartes Avancées : les Domaines qui *paient* pour une jauge ou un Privilège (Religion, Économie) sont en bas, ceux qui *rapportent* de l'Or (Histoire, Progrès) en haut.

## Cartes de départ

Non testées par parties jumelles (à ta demande). Chiffres de l'IA qui planifie, 2 000 parties.

| Carte | Effet | Trashée par les vainqueurs | Rang moyen du trash | Gardée jusqu'à la fin (vainqueurs) | Jouée par partie (vainqueurs / perdants) |
|---|---|---:|---:|---:|---:|
| Forgeron | Pioche 1 carte par 2 Pierre | 19,5 % | 4,1 | **80,5 %** | 1,39 / 1,11 |
| Imprimeur | Recherche 1 carte par 3 Érudits | 31,3 % | 3,8 | 68,8 % | 0,95 / 0,74 |
| Cachot | Paye 2 Or : pioche 1 carte | 32,0 % | 4,2 | 68,0 % | 1,12 / 1,09 |
| Salle du trésor | Gagne 3 Or | 46,9 % | 4,2 | 53,0 % | 0,91 / 0,95 |
| Tour de guet | Paye 5 Or : trash 1 carte | 49,6 % | 4,1 | 50,3 % | 0,84 / 0,84 |
| Ferrailleur | Gagne 1 Or par ressource | 49,7 % | 3,9 | 50,3 % | 0,81 / 0,88 |
| Colporteur | Achète 1 carte | 51,8 % | 3,8 | 48,1 % | 0,93 / 0,95 |
| Épicerie | Gagne 2 Or | 67,0 % | 3,6 | 33,0 % | 0,53 / 0,58 |
| Marché | Gagne 2 Or | 65,5 % | 3,3 | 34,5 % | 0,42 / 0,46 |

Les cartes de pioche (Forgeron, Imprimeur, Cachot) sont gardées, et les vainqueurs les jouent plus souvent que les perdants. Les petites cartes d'Or (Marché, Épicerie) partent en premier.

## Privilèges

Chiffres de l'IA qui planifie, 2 000 parties. **Attention** : obtenir un Privilège est en partie une conséquence du fait de bien jouer. Un indice élevé ne prouve pas que la tuile est forte ; la comparaison entre tuiles reste parlante.

| Privilège | Effet | Indice de victoire des possesseurs |
|---|---|---:|
| 12 | Début de lignée : pioche 1 carte de plus, puis en défausse 1 | **1,32** |
| 3 | Chaque carte avancée rapporte aussi 1 Pierre | 1,20 |
| 2 | Chaque carte avancée rapporte aussi 1 Érudit | 1,13 |
| 7 | 1 blason Noblesse supplémentaire | 1,13 |
| 16 | 1 symbole Érudit permanent | 1,10 |
| 9 | Début de lignée : 2 Or par blason Population | 1,03 |
| 4 | Chaque carte avancée rapporte aussi 1 Métal | 1,02 |
| 14 | Payer 2 Métal pour piocher 1 carte (à la place de l'action) | 0,99 |
| 1 | Cartes de la pioche commune 3 Or moins chères | 0,98 |
| 19 | Début de lignée : 3 Or de plus | 0,98 |
| 11 | Début de lignée : 2 Or par blason Économie | 0,95 |
| 8 | Début de lignée : pioche 1 carte de moins, puis prend 1 carte de son deck | 0,94 |
| 5 | 1 blason Population supplémentaire | 0,92 |
| 20 | Chaque carte avancée jouée rapporte 2 Or | 0,90 |
| 15 | Payer 6 Or pour piocher 1 carte (à la place de l'action) | 0,89 |
| 6 | 1 blason Économie supplémentaire | 0,87 |
| 10 | Début de lignée : 2 Or par blason Noblesse | 0,82 |
| 17 | Chaque trash rapporte 1 Or | 0,81 |
| 18 | Garde son Or restant en fin de lignée | 0,79 |
| 13 | Payer 3 Pierre pour trasher 1 carte (à la place de l'action) | **0,77** |

Les Privilèges qui renforcent la pioche ou les ressources de l'aire de jeu (12, 3, 2, 16) sont en haut. Ceux qui coûtent une action et des ressources (13, 15) ou qui ne rapportent que de l'Or (17, 18, 10) sont en bas.

## Pistes pour la suite

- **Variantes à tester en priorité** (en changeant les codes du csv, environ 15 min par essai avec l'IA entraînée) :
  - les deux plus faibles : Comptoir maritime et Négociant ;
  - la Forge (par exemple : Gagne 6 Or, comme la Carrière) ;
  - les deux cartes « Lvl up Population » dont l'effet n'est jamais payé : Cabinet d'architecte et Loge des bâtisseurs ;
  - les Domaines Histoire (à affaiblir) et Religion (à renforcer).
- **Le Grand argentier** : plutôt que 4 fois plus de parties, tester une variante et voir si elle change ses résultats.
- **Ce que ce bilan ne couvre pas** : les tables à 2 et à 4 joueurs, et les parties jumelles de l'IA qui planifie sur les 31 autres cartes Avancées (environ 2 h de calcul par carte pour une précision de ±2 points).
