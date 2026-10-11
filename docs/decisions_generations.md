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

## Questions en attente
- F. `carte_1` (Remouleur ambulant) est un personnage sans Effet Rouge, mais son visuel a un bandeau noir. Sans effet sur le jeu ; visuel à corriger ?
