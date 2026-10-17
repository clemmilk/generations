# [GÉNÉRATIONS] Journal des décisions

Réponses du game designer aux ambiguïtés relevées dans les règles et le matériel.
Chaque décision a été reportée dans `docs/regles_generations.md` ou dans les fichiers de `data/`.

## 11/10/2026 — Première relecture des règles

### Matériel et vocabulaire
1. Le jeu se joue de 2 à 4 joueurs (pas de 5e joueur, 4 plateaux personnels).
2. Il y a 20 tuiles Privilège.
3. « Génération », « lignée » et « manche » désignent la même chose. Le mot retenu est **lignée**.
4. Privilège 12 : l'icône de poubelle signifie défausser. La carte est défaussée, pas trashée.
5. Privilèges 13, 14 et 15 : l'icône ∞ des tuiles est fausse. C'est 1 fois par tour et cela remplace l'action du tour. On peut le refaire à des tours différents, tant qu'on peut payer.
6. Chancellerie : le Privilège est pris au choix parmi les 4 visibles.

### Victoire
7. Rechercher la dernière carte de son deck revient à la piocher : le joueur gagne.
8. Si la pioche de début de lignée vide le deck, la victoire est immédiate, même hors de son tour.
9. Si plusieurs joueurs vident leur deck en même temps sans que le joueur actif en fasse partie, le vainqueur est le premier dans l'ordre du tour, en partant du joueur qui a joué la carte.
10. Il n'y a qu'un vainqueur, pas de classement ni de score.

### Mise en place et première lignée
11. L'Or de compensation (1 / 2 / 3) s'ajoute à l'Or de début de lignée.
12. Tous les joueurs piochent et prennent leur Or dès la mise en place.
13. Les cartes Assymétrie des adversaires ne sont pas publiques. Les cartes Assymétrie non distribuées sont écartées.

### Tour de jeu
14. « Rejouer » donne un tour complet. Les Effets Rouges sont résolus avant. Les « Rejouer » se cumulent.
15. Les Privilèges 13 à 15 ne s'utilisent pas en plus du tour : ils constituent l'action du tour (voir 5).
16. Il est interdit de passer. On peut jouer une carte à vide ; les adversaires peuvent alors utiliser son éventuel Effet Rouge.
17. Quand la pioche commune est vide, la Rivière n'est plus complétée (précisé le 12/10/2026, décision J : les cartes restantes de la Rivière restent achetables).

### Payer et ressources
18. Les ressources excédentaires d'une carte défaussée pour payer sont perdues, ainsi que ses Érudits.
19. La carte qui vient d'être jouée compte dans son propre effet et peut payer son propre coût.
20. « Trash 1 carte pour 2 Métal » : 1 trash par tranche de 2 Métal présents dans l'aire de jeu, sans les dépenser.
21. « Paye 2 Métal pour trasher 1 carte par blason » : on paye 1 fois pour N trashs.
22. « Paye X Or pour piocher / trasher 1 carte » : 1 seule fois par carte jouée (sauf Colporteur).
23. Marché : on paye autant de ressources qu'on veut, et toutes les ressources des cartes défaussées rapportent (une carte Pierre + Métal rapporte 5 Or).
24. Une seule carte Pierre + Métal peut payer un coût de 2 Ressources.
25. On peut trasher la carte qu'on vient de jouer. Le trash à l'achat est limité à 1 carte.
26. Privilège 1 : la réduction ne porte que sur l'Or, avec un minimum de 0.

### Effets Rouges
27. Les Effets Rouges sont résolus dans l'ordre du tour.
28. Privilège 20 : les 2 Or ne sont gagnés que si l'Effet Rouge a réellement été appliqué.
29. Quand la pioche de Privilèges est vide, on ne peut plus en prendre au hasard. Un joueur est de toute façon limité à 4 Privilèges.

### Fin de lignée et jauges
30. La piste Noblesse est constituée de 4 emplacements de tuiles : le 1er Privilège demande 1 Érudit, le 2e 2 Érudits (+1 blason), etc.
31. Un Privilège gagné par une carte occupe un emplacement, donne les blasons correspondants et renchérit le suivant. Maximum 4 Privilèges par joueur.
32. Les Érudits sont comptés dans l'aire de jeu sans être dépensés. Le Privilège 16 compte.
33. Prendre un Privilège et monter en Économie en fin de lignée ne sont pas obligatoires.
34. Maximum 1 niveau par jauge et 1 Privilège par fin de lignée.
35. Le nombre de blasons est celui affiché au niveau actuel, pas un cumul.
36. Un Lvl up par carte remplace le coût de la piste. On ne peut pas dépasser le niveau maximum.
37. Début de lignée : on prend son Or, puis ses cartes, puis on applique le Privilège 8, puis le Privilège 12.

### Privilèges entre eux
38. Les Privilèges 2, 3 et 4 ne se cumulent pas (pas d'enchaînement).
39. Le Privilège 17 s'applique au trash lors d'un achat.

### Information visible
40. Tout est public (défausse, cartes trashées, nombre de cartes des decks, aire de jeu, Or, jauges), sauf la main des joueurs.

## 12/10/2026 — Compléments
- A. La montée de Population en fin de lignée n'est pas obligatoire (comme le Privilège et l'Économie).
- B. Les ressources ajoutées par les Privilèges 2, 3 et 4 comptent partout : paiement, montée de Population, Érudits pour la Noblesse, effets des cartes.
- C. Niveau de départ des jauges : 3 Or et 3 cartes, sans blason.
- D. Le bandeau des cartes Avancée est purement visuel. Les personnages ont un bandeau blanc et un effet uniquement pour le joueur actif ; les bâtiments ont un bandeau noir et proposent tous un Effet Rouge.
- E. `carte_34` (Justice) est utilisée telle quelle, malgré la bande blanche sous l'illustration.

- G. Effets en deux parties (« Paye 1 Or pour piocher 1 carte, puis Rejoue », « Trash 1 carte pour 2 Métal, puis Rejoue », « Gagne 2 Or puis Rejouer ») : les deux parties sont indépendantes. Le Rejouer est acquis même si le joueur ne fait pas la première partie.
- H. Quand un effet donne plusieurs pioches ou trashs (« piocher 2 cartes », « trasher 1 carte par blason »), le joueur peut en faire moins que le maximum.
- I. Un joueur qui vide entièrement son deck (il trashe sa dernière carte : plus aucune carte en pioche, en main, dans l'aire de jeu ni en défausse) gagne immédiatement la partie.
- J. Quand la pioche commune est vide, on peut encore acheter les cartes restantes de la Rivière, qui n'est simplement plus complétée.
- K. Pour un effet « 1 trash / pioche par tranche de ressources » (Forgeron, Ferrailleur…), le nombre de fois est compté une seule fois, au moment où l'effet commence. Trasher ensuite une carte qui portait ces ressources ne réduit pas ce nombre.
- L. Le trash à 1 Or lors d'un achat est proposé juste après l'achat : le joueur peut trasher la carte qu'il vient d'acheter.
- M. Pioche : le joueur pioche directement toutes les cartes auxquelles il a droit, sans valider carte par carte. Cela remplace la décision H pour les pioches (H reste valable pour les trashs et les recherches).
- N. Conséquence de M, acceptée : une pioche sans coût (Ferrailleur, Banque, Ferme, Démolisseur) se fait automatiquement dès que la carte est jouée, sans possibilité d'y renoncer.
- O. Privilèges 2, 3 et 4 sur une même carte : chacun regarde ce qui est imprimé sur la carte, indépendamment des autres. Une carte peut donc recevoir 2 bonus (avec les Privilèges 3 et 4, une carte Pierre + Érudit apporte 2 Pierres de plus), mais la ressource ajoutée par un Privilège n'en déclenche pas un autre.
- P. Privilège 8 : prendre une carte dans son deck est obligatoire. Privilège 12 : la défausse est obligatoire.
- Q. Privilège 20 : les 2 Or sont gagnés 1 seule fois par tour d'un adversaire, dès que le joueur applique l'Effet Rouge, même s'il le déclenche plusieurs fois (plusieurs ventes au Marché).
- R. Mémoire des joueurs : la composition du deck de chaque adversaire est connue de tous. Les cartes de départ sont identiques pour tous, les achats et les trashs sont publics, et une carte Assymétrie est connue dès qu'elle a été vue une fois (jouée, défaussée ou trashée). Restent cachés : quelles cartes sont en main et lesquelles sont en pioche, l'ordre des pioches, et les cartes Assymétrie pas encore vues.

- X. Effet « paye … pour obtenir … par tranche » (ex. « Paye 1 Métal pour trasher 1 carte par 2 Métal ») : le nombre de fois est compté AVANT le paiement. Les ressources défaussées pour payer comptent encore pour cet effet, plus pour les suivants. (Décidé le 15/10.)

## Version d'essai du 15/10 (tests par les IA, pas encore dans les règles)
Changements faits seulement dans les codes des csv et dans `src/game/privileges.ts`, pour voir comment jouent les IA. Les visuels et le fichier de règles ne sont pas à jour.
- S. Nouveau gain `achete(N)` : acheter 1 carte de la Rivière exactement comme l'action Acheter (coût normal en Or et en Ressources, 1 Or de plus pour trasher 1 carte, la carte va en main, facultatif). Avec deux achats (Moulin), la carte achetée est remplacée dans la Rivière avant le second.
- T. Les jauges se payent selon la colonne Coût du plateau : en Or (dépensé), ou en Pierre/Métal (seulement comptés dans l'aire de jeu, pas dépensés). Dans cette version, la Population se paye en Or et l'Économie en Ressources.
- U. Ordre de fin de lignée : Noblesse, puis Population, puis Économie, puis on défausse l'Or restant (réglé dans `src/game/parametres.ts`). Avec le Privilège 18, l'Or qui reste après avoir payé la Population est conservé.
- V. Privilège 20 (nouveau) : les cartes de la Rivière coûtent 1 Ressource de moins. Il se cumule avec le Privilège 1, s'applique aussi aux achats des effets `achete`, et le coût d'une carte peut tomber à 0.
- W. Privilège 13 : payer 3 Pierres pour trasher 1 carte (au lieu de piocher), à la place de son action, comme les trashs des cartes (main, aire de jeu ou défausse ; trasher la dernière carte de son deck fait gagner).

## Version d'essai du 16/10 (tests par les IA, pas encore dans les règles)
Deck de départ de 9 cartes sans trash, sans cartes Assymétrie, 20 cartes Avancée proposées le 15/10.
- Y. Fin de lignée : après la Noblesse, le joueur choisit quelle(s) jauge(s) monter (1 niveau au plus chacune), dans l'ordre qu'il veut. Les deux jauges se payent en Ressources (Pierre/Métal) comptées dans l'aire de jeu, sans être dépensées, sur un budget commun : ce qu'une jauge utilise ne compte plus pour l'autre. Coûts 2/4/6/8 pour les deux ; la Population pioche 3/4/5/6/7 cartes.
- Z. L'Or achète les cartes et active des effets ; les Ressources activent des effets, alimentent les effets par tranche et montent les jauges. Les cartes Avancée ne coûtent plus de Ressources (Carrière 4 Or, Fonderie 5 Or).
- Le Privilège 20 est retiré (19 Privilèges).
- Essai sans Or de compensation au départ (0 Or pour tous les joueurs, au lieu de 0/1/2/3), pour mesurer l'effet de l'ordre des sièges.

## Essai du 16/10 : version du 14/10, cartes achetées dans la défausse
- Reprise des cartes de la version d'essai du 14/10 (plateau et Privilèges d'origine), avec une seule règle changée : une carte achetée va dans la défausse, pas dans la main (réglage `carteAcheteeVa` dans `src/game/parametres.ts`). Il faut donc commencer une nouvelle lignée pour la revoir.

## Essai du 16/10 : version du 14/10, achat par remplacement
- AA. Une carte achetée remplace obligatoirement une carte du deck du joueur, trashée gratuitement (le trash à 1 Or disparaît). La carte achetée prend la place de la carte trashée :
  - main → elle va en main et peut être jouée ensuite ;
  - aire de jeu → elle va dans l'aire de jeu : ses ressources sont disponibles (celles de la carte trashée sont perdues), mais son effet ne se déclenche pas ;
  - défausse → elle va dans la défausse ;
  - pioche → la première carte de la pioche (inconnue) est trashée, et la carte achetée est posée à sa place, sur le dessus.
  Le prix de la carte et le Privilège 1 sont inchangés ; le Privilège 17 s'applique à la carte remplacée. Un achat ne change pas la taille du deck : on gagne toujours avec les autres trashs ou en piochant sa dernière carte. Réglage `carteAcheteeVa: 'remplacement'` dans `src/game/parametres.ts`.

## Version du 17/10 (version active)
Fichiers `data/*_essai-17-10.csv` installés comme version active ; la version « reboot » du 16/10 est conservée dans `data/versions/reboot-16-10/`.
- BB. Achat par remplacement (décision AA), y compris pour les effets « Achète 1 carte ».
- CC. Économie payée en Ressources comptées (1 / 1 / 2 / 2), Population payée en Or (2 / 5 / 8 / 12) : coûts et valeurs voulus, y compris le niveau 1 d'Économie qui donne 4 Or comme le niveau 0.
- DD. Fin de lignée dans cet ordre : Noblesse, Population, Économie, puis on défausse l'Or restant (sauf Privilège 18). Réglage `ordreDesJauges` dans `src/game/parametres.ts`.
- EE. Privilèges 2, 3 et 4 : chaque carte Avancée de l'aire de jeu rapporte 1 Érudit / Pierre / Métal de plus, qui compte partout. Privilège 20 : +1 Or chaque fois que le joueur joue une carte Avancée, même sans appliquer son effet. Privilège 13 : 3 Pierres pour trasher 1 carte.
- FF. Or de compensation au départ : 0 / 1 / 2 / 3. 2 cartes Assymétrie par joueur (8 Domaines : toutes distribuées à 4 joueurs).

## Questions en attente
- F. `carte_1` (Remouleur ambulant) est un personnage sans Effet Rouge, mais son visuel a un bandeau noir. Sans effet sur le jeu ; visuel à corriger ?
