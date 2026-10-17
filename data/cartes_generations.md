# [GÉNÉRATIONS] Caractéristiques des cartes
**dossier :** le dossier où se trouve le visuel JPG.
**Identifiant :** le nom du fichier JPG représentant la carte (sans l'extension)
**Nom :** le nom de la carte, utilisée dans l'interface de jeu pour identifier facilement la carte
**Coût :** ce que le joueur doit dépenser pour acheter la carte, d'après la légende suivante :
- P : la ressource Pierre.
- M : la ressource Métal.
- Un chiffre (de 1 à 9) : une quantité d'Or.
- R : une ressource Pierre ou Métal, au choix du joueur.
Si la case est vide, c'est qu'il s'agit d'une carte de départ, dans le deck d'un joueur.
**Ressource :** les ressources rapportées par la carte et qui peuvent être dépensées ou qui servent à activer des effets, d'après la légende suivante :
- P : la ressource Pierre
- M : la ressource Métal
- E : un Érudit
Si la case est vide, c'est que la carte n'a pas de ressource et va directement dans la défausse.
**Effet :** l'effet que le joueur peut utiliser quand il joue la carte depuis sa main. Tous les effets sont facultatifs.
**Effet rouge :** l'effet que chaque autre joueur que celui qui a posé la carte peut effectuer. L'exécution de cet effet est simultané pour chaque joueur et les joueurs ne le font qu'une fois que le joueur actif a lui-même réalisé son action. Si le joueur actif ne fait pas l'effet de la carte, ses adversaires peuvent quand même appliquer l'Effet Rouge. Si la case est vide c'est qu'il n'y a pas d'effet pour les adversaires.
**Départ :** l'endroit où se trouve la carte au début de la partie. Si elle appartient à une couleur de joueur qui n'est pas jouée, alors elle n'est pas présente pour la durée de la partie.

**Code effet** et **Code effet rouge :** la traduction de l'effet et de l'effet rouge pour l'application. C'est ce code que le jeu applique : le texte des colonnes Effet et Effet rouge n'est qu'affiché. Si l'une des deux colonnes est modifiée, l'autre doit l'être aussi. Après toute modification d'un csv, lancer `npm test` : les erreurs d'écriture sont signalées carte par carte.

Un code est une suite d'étapes séparées par ` ; `. Les étapes sont indépendantes les unes des autres. Chaque étape s'écrit :

`payer(quoi:combien) > gain / compteur:tranche`

- `payer(...) >` (facultatif) : ce qu'il faut payer pour obtenir le gain. On peut payer `or`, `pierre` ou `metal`. Exemple : `payer(or:4) > trash(1)`.
- le gain (obligatoire), parmi :
  - `or+2` : gagne 2 Or
  - `pioche(1)` : pioche 1 carte
  - `trash(1)` : trash 1 carte
  - `recherche(1)` : recherche 1 carte
  - `lvlup(economie)` ou `lvlup(population)` : Lvl up de la piste
  - `privilege(choix)` : prend 1 Privilège parmi les 4 visibles ; `privilege(hasard)` : au hasard dans la pioche
  - `vendre(pierre:2 metal:3)` : paye de la Pierre et du Métal pour gagner 2 Or par Pierre et 3 Or par Métal
  - `rejouer` : Rejouer
  - `achete(1)` : achète 1 carte de la Rivière, en plus de l'action du tour, comme l'action Acheter
  - les majuscules sont ignorées (`Or+3` se lit `or+3`)
- `/ compteur:tranche` (facultatif) : le gain est obtenu 1 fois par tranche de ce que possède le joueur. On peut compter `pierre`, `metal`, `erudit`, `blason_noblesse`, `blason_economie`, `blason_population`. Sans `:tranche`, c'est 1 fois par élément. Exemples : `pioche(1) / pierre:2`, `or+2 / blason_noblesse`. Avec un `payer`, on paye 1 seule fois pour tous les gains.
- `repetable:` devant une étape : elle peut être refaite autant de fois que le joueur le veut. Exemple : `or+2 ; repetable: payer(or:8) > pioche(1)`.

Le bandeau en haut des cartes Avancée est purement visuel : blanc pour les personnages (effet uniquement pour le joueur actif), noir pour les bâtiments (qui proposent tous un Effet Rouge). Il n'a aucun effet en jeu.

Quand un effet permet de gagner des choses par rapport à quelque chose d'autre, on ne regarde que ce que possède le joueur qui fait l'effet, dans son aire de jeu ou sur son plateau personnel.