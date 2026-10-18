# Règles — Générations
## Aperçu
- 2 à 4 joueurs, environ 30 minutes.
- Chaque joueur possède son propre domaine, représenté par son deck de cartes. Au fur et à mesure de la partie, il fait évoluer son domaine en ajoutant et retirant des cartes à son deck.
- Le jeu est découpé en Lignées. Chaque fois qu'un joueur recommence avec son deck totalement constitué, il débute une nouvelle Lignée.
- Pour l'emporter, un joueur doit arriver au terme d'une lignée, et donc piocher toutes les cartes de son deck.
- Les mots « génération », « lignée » et « manche » désignent la même chose. Le terme retenu est **lignée**.


## Matériel
Voir le dossier /data pour le détail en csv de chaque élément du jeu. Chaque csv est expliqué dans le fichier .md correspondant, dans /data également.
- 9 cartes de départ (chaque joueur possède 9 cartes de départ à sa couleur : vert, rouge, bleu ou jaune). Les 9 cartes constituent le deck de départ. Les cartes de tous les decks de départ sont identiques, seulement différenciées par leur couleur.
- 8 cartes Assymétrie (Domaines).
- 34 cartes Avancée.
- 20 tuiles Privilège
- 4 plateaux personnels (tous identiques)
- 2 marqueurs de progression par joueur
- des pièces, pour compter l'or de chaque joueur. C'est un élément qui ne sera pas représenté par du matériel, mais juste indiqué.


## Vocabulaire
- Pioche : le deck d'un joueur. Au début du jeu c'est son deck de départ, mais par la suite, le joueur peut ajouter ou retirer des cartes de son deck.
- Pioche commune : la pioche qui contient toutes les cartes Avancée.
- Rivière : 4 cartes, face visible, à côté de la pioche commune.
- Main : les cartes qu'un joueur a en main à un instant T.
- Aire de jeu : la zone où un joueur joue ses cartes. Elles restent dans son aire de jeu tant que les ressources de la carte n'ont pas été dépensées. Si une carte n'a pas de ressource, elle va directement dans la défausse.
- Défausse : le lieu où les cartes d'un joueur sont placées une fois qu'elles sont jouées, si elles n'ont pas de ressources, ou une fois que leurs ressources ont été dépensées.
- Trasher : l'action, pour un joueur, de retirer une carte de son deck. La carte peut être retirée depuis l'aire de jeu, la défausse ou la main du joueur, ou bien être la carte du dessus de sa pioche, prise au hasard (sans la regarder). La carte est écartée définitivement du jeu. Un joueur peut trasher la carte qu'il vient de jouer. Cela vaut pour tous les trashs ; quand un effet permet de trasher plusieurs cartes, le joueur peut prendre plusieurs fois la carte du dessus de sa pioche.
- Rechercher : consiste à regarder toutes les cartes de son deck pour choisir 1 carte et l'ajouter à sa main. Le deck est ensuite remélangé. Rechercher la dernière carte de son deck revient à la piocher : le joueur gagne la partie.
- Rejouer : capacité qui permet de rejouer un tour juste après la fin de son tour. Ce tour supplémentaire est un tour complet (les 4 actions sont possibles). Les Effets Rouges de la carte jouée sont résolus avant le tour supplémentaire. Les « Rejouer » se cumulent. (Aucune carte ne l'utilise dans la version actuelle.)
- Remplacer : quand un joueur achète une carte, elle remplace une carte de son deck, qui est trashée (voir « Acheter 1 carte »).
- Payer : le fait de payer quelque chose pour obtenir autre chose. Dans le jeu, on peut payer de l'Or, de la Pierre et/ou du Métal. Quand on paye de l'Or, il est déduit de notre réserve. Quand on paye de la Pierre ou du Métal, on doit défausser des cartes de notre aire de jeu contenant les ressources correspondantes. Une carte défaussée pour payer est défaussée entièrement : ses ressources excédentaires et ses Érudits sont perdus. La carte qui vient d'être jouée peut être défaussée pour payer le coût de son propre effet.
- Piocher : le fait de piocher 1 carte de son deck pour l'ajouter à sa main.
- Or : le stock d'or de chaque joueur. L'Or peut être dépensé pour acheter des cartes ou activer des effets.
- Métal : une ressource du jeu, disponible sur les cartes et autres éléments du jeu. Le Métal peut être dépensé pour acheter des cartes ou activer des effets.
- Pierre : une ressource du jeu, disponible sur les cartes et autres éléments du jeu. La pierre peut être dépensée pour acheter des cartes ou activer des effets.
- Ressource : de la Pierre ou du Métal, au choix. Une même carte portant 1 Pierre et 1 Métal peut payer 2 Ressources.
- Érudit : c'est une autre forme de ressource mais elle n'entre pas en compte dans le mot clé Ressource. Elle est disponible sur les cartes et les autres éléments du jeu. Elle n'est pas utilisée pour acheter des cartes.
- Population : niveau de population consigné sur le plateau personnel de chaque joueur. Chaque niveau de population octroie des avantages à son propriétaire. À certains niveaux, le joueur gagne 1 blason Population.
- Économie : niveau d'économie consigné sur le plateau personnel de chaque joueur. Chaque niveau d'économie octroie des avantages à son propriétaire. À certains niveaux, le joueur gagne 1 blason Économie.
- Noblesse : niveau de noblesse consigné sur le plateau personnel de chaque joueur. La piste Noblesse est constituée de 4 emplacements de tuiles Privilège : le niveau de Noblesse d'un joueur est le nombre de Privilèges qu'il possède. À certains niveaux, le joueur gagne 1 blason Noblesse.
- Blason : le nombre de blasons d'un joueur, dans chaque type, est celui affiché à son niveau actuel sur la piste correspondante (ce n'est pas un cumul des niveaux précédents), plus les éventuels blasons donnés par ses Privilèges.
- Lvl up : le fait d'augmenter d'un niveau sa jauge de Population ou d'Économie. Un Lvl up obtenu par l'effet d'une carte remplace le coût indiqué sur la piste. On ne peut pas dépasser le niveau maximum d'une piste.
- Effet rouge : quand un joueur joue une carte qui possède un effet rouge, tous ses adversaires peuvent, après qu'il ait joué, appliquer l'éventuel Effet Rouge de la carte qu'il a joué.


## Mise en place
1. Chaque joueur reçoit le deck à sa couleur. Il ajoute 2 cartes prises aléatoirement dans le deck Assymétrie qu'il consulte pour savoir avec quoi il va jouer. Il mélange ensuite son deck (les 9 cartes de départ + les 2 cartes Assymétrie). Les cartes Assymétrie d'un joueur ne sont pas montrées aux autres joueurs. Les cartes Assymétrie non distribuées sont écartées de la partie (à 4 joueurs, les 8 cartes sont distribuées).
2. Chaque joueur reçoit un plateau personnel et place un marqueur en bas des pistes de Population et Économie de son plateau personnel pour indiquer leur niveau durant la partie. Au niveau de départ, un joueur prend 4 Or et pioche 3 cartes à chaque début de lignée, et ne possède aucun blason.
3. La pioche commune est mélangée face cachée, puis on révèle les 4 premières cartes de la pioche face visible, pour constituer la Rivière.
4. On mélange toutes les tuiles Privilège face cachée puis on révèle 4 tuiles Privilège, face visible.
5. Le premier joueur est désigné aléatoirement. On donne 1 or au 2ème, 2 or au 3ème et 3 or au quatrième.
6. Tous les joueurs débutent leur première lignée dès la mise en place : chacun pioche ses cartes et prend son Or avant le premier tour du premier joueur. Cet Or s'ajoute à l'Or reçu à l'étape 5.


## Principes du jeu
- Le joueur qui l'emporte est celui qui arrive, en premier, à piocher la dernière carte de sa pioche. Il gagne immédiatement la partie.
- Chaque joueur va jouer plusieurs lignées. Une lignée commence quand le joueur débute son deck entier. Elle se termine quand il gagne la partie en piochant la dernière carte de son deck ou quand il décide de mettre fin à sa lignée pour en commencer une nouvelle.
- Les lignées de chaque joueur peuvent se décaler au fur et à mesure de la partie, en fonction de leurs décisions respectives.
- Au début de chaque nouvelle lignée, le joueur reconstitue son deck entier en mélangeant les cartes de sa main, de sa défausse et de son aire de jeu.


## Débuter une nouvelle lignée
Quand un joueur débute une nouvelle lignée, il applique les étapes suivantes, dans cet ordre :
1. Il prend autant d'Or qu'indiqué par sa jauge d'Économie, ainsi que l'Or octroyé par ses tuiles Privilège.
2. Il pioche autant de cartes qu'indiqué par sa jauge de Population.
3. Il applique le Privilège 8, s'il le possède.
4. Il applique le Privilège 12, s'il le possède.

Si cette pioche lui fait piocher la dernière carte de son deck, il remporte immédiatement la partie, même si ce n'est pas son tour.


## Tour de jeu
En commençant par le premier joueur, chaque joueur effectue son tour, puis on passe au joueur suivant, dans l'ordre du tour.
Il est interdit de passer son tour. À son tour, le joueur effectue 1 action parmi 4 possibles :
- **Acheter 1 carte :** il achète une des 4 cartes de la rivière en s'acquittant de son coût. L'or vient de sa réserve personnelle. S'il doit également dépenser des ressources, il doit défausser des cartes de son aire de jeu contenant le bon nombre de ressources correspondantes. Il peut défausser 1 ou plusieurs cartes pour cela. La carte achetée **remplace obligatoirement une carte du deck du joueur**, qui est trashée gratuitement. La carte achetée prend la place de la carte trashée :
  - une carte de sa **main** : la carte achetée va dans sa main, et il pourra la jouer lors d'un prochain tour ;
  - une carte de son **aire de jeu** : la carte achetée va dans son aire de jeu. Ses ressources sont disponibles (celles de la carte trashée sont perdues), mais son effet ne se déclenche pas ;
  - une carte de sa **défausse** : la carte achetée va dans sa défausse, il ne pourra pas la jouer pendant cette lignée ;
  - la **première carte de sa pioche** (sans la regarder) : elle est trashée et la carte achetée est posée à sa place, sur le dessus de la pioche.

  Un achat ne change donc pas le nombre de cartes du deck. La carte achetée est remplacée, dans la rivière, par la première carte de la pioche commune, qui est révélée. Quand la pioche commune est vide, la rivière n'est plus complétée : on peut encore acheter les cartes qui y restent, jusqu'à ce qu'elle soit vide.
- **Jouer 1 carte :** le joueur joue une carte de sa main. Si la carte contient des ressources, il la place dans son aire de jeu puis applique son effet. Si elle n'en contient pas, il la place dans sa défausse puis applique son effet. L'effet est facultatif : le joueur peut jouer une carte « à vide », sans appliquer son effet. Tous les autres joueurs peuvent ensuite appliquer l'Effet Rouge de la carte qui vient d'être jouée, que le joueur actif ait appliqué son effet ou non.
- **Utiliser un Privilège d'action :** si le joueur possède le Privilège 13, 14 ou 15, il peut en payer le coût pour trasher 1 carte (Privilège 13) ou piocher 1 carte (Privilèges 14 et 15). Cela remplace l'action de son tour : c'est donc 1 seule fois par tour, mais il peut le refaire lors de tours suivants, tant qu'il peut payer.
- **Mettre fin à sa lignée :** si le joueur possède 0 ou 1 carte en main, il peut mettre fin à sa lignée. Il applique alors les étapes suivantes, dans cet ordre :
  1. **Noblesse :** il regarde s'il possède suffisamment d'Érudits dans son aire de jeu pour recevoir un nouveau Privilège. Le nombre d'Érudits requis est celui indiqué sur le premier emplacement libre de sa piste Noblesse (1 pour le premier Privilège, 2 pour le deuxième, 3 pour le troisième, 4 pour le quatrième). Les Érudits ne sont pas dépensés. Si c'est le cas, il peut en prendre un parmi les 4 disponibles et l'ajouter à son plateau. Ce n'est pas obligatoire. Il ne peut prendre qu'1 seul Privilège par fin de lignée. Le Privilège qu'il a choisi est remplacé par le premier de la pioche Privilège afin qu'il y ait 4 choix pour le prochain joueur.
  2. **Population :** il regarde s'il dispose de suffisamment d'Or pour augmenter son niveau en Population (le coût est indiqué sur la piste). Si c'est le cas, il peut dépenser l'Or et avancer son marqueur d'une case sur la jauge de Population. Ce n'est pas obligatoire. Il ne peut gagner qu'1 seul niveau par fin de lignée.
  3. **Économie :** il regarde s'il possède suffisamment de Ressources (Pierre ou Métal) sur les cartes dans son aire de jeu pour augmenter son niveau en Économie. Les Ressources ne sont pas dépensées. Si c'est le cas, il peut avancer son marqueur d'une case sur la jauge d'Économie. Ce n'est pas obligatoire. Il ne peut gagner qu'1 seul niveau par fin de lignée. Puis il défausse le reste de son Or (sauf Privilège 18).
  4. Le joueur reforme son deck en mélangeant, face cachée, les cartes de sa main, de sa défausse et de son aire de jeu, puis il débute une nouvelle lignée. À son prochain tour, il pourra Acheter 1 carte ou Jouer 1 carte.


## Effets des cartes
- Tous les effets sont facultatifs.
- Quand un effet comporte plusieurs parties (« Gagne 1 Or puis Achète 1 carte », « Paye 5 Or pour trasher 1 carte puis 5 Or pour trasher 1 carte »), elles sont indépendantes : le joueur peut appliquer la seconde même s'il n'a pas appliqué la première.
- Quand un effet permet de trasher ou rechercher plusieurs cartes, le joueur peut en faire moins que le maximum.
- Quand un effet fait piocher des cartes, le joueur pioche directement toutes les cartes auxquelles il a droit, sans pouvoir s'arrêter en cours de route.
- Quand un effet compte quelque chose (ressources, Érudits, blasons), on ne regarde que ce que possède le joueur qui applique l'effet, dans son aire de jeu ou sur son plateau personnel. La carte qui vient d'être jouée est dans l'aire de jeu : elle compte pour son propre effet.
- « Pioche / Trash / Recherche 1 carte pour chaque X ressources (ou Érudits) dans son aire de jeu » : on compte les ressources présentes, par tranche de X. Elles ne sont pas dépensées.
- « Paye … pour obtenir … par tranche (ou par blason) » : on compte **avant** de payer. Les ressources défaussées pour payer comptent encore pour cet effet.
- « Achète 1 carte » : le joueur achète 1 carte de la Rivière, en plus de l'action de son tour, exactement comme l'action Acheter (coût normal, remplacement obligatoire). C'est facultatif. Si l'effet permet plusieurs achats, la Rivière est complétée entre deux achats.
- « Paye X pour faire 1 chose par blason » : on paye 1 seule fois, puis on fait la chose autant de fois qu'on a de blasons.
- « Paye X Or pour piocher / trasher 1 carte » : 1 seule fois par carte jouée, sauf mention contraire.
- « Paye de la Pierre et du Métal pour gagner 2 Or pour chaque Pierre et 3 Or pour chaque Métal » : le joueur paye autant de ressources qu'il le souhaite. Toutes les ressources des cartes défaussées rapportent (une carte portant 1 Pierre et 1 Métal rapporte 5 Or).


## Effets Rouges
- Les adversaires du joueur actif appliquent l'Effet Rouge chacun à leur tour, dans l'ordre du tour, en commençant par le joueur qui suit le joueur actif.
- Chaque adversaire utilise ses propres ressources, son propre Or et son propre plateau.


## Privilèges
- Un joueur ne peut pas posséder plus de 4 Privilèges : ce sont les 4 emplacements de la piste Noblesse de son plateau personnel.
- Un Privilège obtenu par l'effet d'une carte (Religion, Chancellerie, Cour du roi) occupe également un emplacement de la piste Noblesse. Il ne demande pas d'Érudits, mais il donne les blasons de l'emplacement et augmente d'autant le nombre d'Érudits requis pour le Privilège suivant.
- Sauf mention « au hasard dans la pioche », un Privilège se prend au choix parmi les 4 visibles.
- Quand la pioche de Privilèges est vide, les Privilèges visibles ne sont plus remplacés et on ne peut plus prendre de Privilège au hasard dans la pioche.
- Le Privilège 16 compte comme 1 Érudit dans l'aire de jeu, y compris pour obtenir un Privilège en fin de lignée.
- Privilèges 2, 3 et 4 : chaque carte Avancée de l'aire de jeu du joueur rapporte 1 Érudit (2), 1 Pierre (3) ou 1 Métal (4) de plus. Ces ressources comptent partout (paiements, jauges, Privilèges, effets par tranche). Une même carte peut recevoir le bonus de plusieurs de ces Privilèges.
- Privilège 20 : chaque fois que le joueur joue une carte Avancée, il gagne 2 Or, même s'il n'applique pas l'effet de la carte.
- Privilège 18 : l'Or qui reste après avoir payé la Population n'est pas défaussé.
- Privilège 8 : prendre 1 carte dans son deck est obligatoire. Privilège 12 : défausser 1 carte est obligatoire. Les ressources et Érudits qu'ils ajoutent comptent partout : pour payer, pour augmenter sa Population, pour obtenir un Privilège et pour les effets des cartes.
- Le Privilège 1 ne réduit que le coût en Or des cartes, qui ne peut pas descendre sous 0.
- Le Privilège 17 s'applique à chaque carte trashée, y compris la carte remplacée lors d'un achat.
- Le Privilège 12 fait défausser 1 carte (elle n'est pas trashée).


## Fin de partie
Quand un joueur pioche la dernière carte de son deck, pour quelque raison que ce soit (y compris en la Recherchant ou lors de la pioche de début de lignée), il remporte immédiatement la partie. Si plusieurs joueurs piochent la dernière carte de leur deck en même temps, c'est le joueur dont c'est le tour qui l'emporte. S'il n'en fait pas partie, c'est le premier d'entre eux dans l'ordre du tour, en partant du joueur qui a joué la carte.
Un joueur qui trashe la dernière carte de son deck (il ne lui reste plus aucune carte en pioche, en main, dans son aire de jeu ni dans sa défausse) remporte lui aussi immédiatement la partie. De même, trasher la dernière carte de sa pioche (en trashant la carte du dessus de sa pioche) revient à la piocher : le joueur remporte la partie. Un achat ne peut jamais vider le deck, puisque la carte achetée remplace la carte trashée.
Il n'y a qu'un vainqueur : les autres joueurs ne sont pas classés.


## Information cachée
- La main d'un joueur est secrète. Les autres joueurs voient seulement combien de cartes il a en main.
- L'ordre de la pioche commune et de chaque joueur sont inconnus de tous.
- La pioche de tuiles Privilège est inconnue de tous.
- La composition du deck de chaque joueur est connue de tous : les cartes de départ sont les mêmes pour tous, les achats et les trashs sont publics, et une carte Assymétrie est connue dès qu'elle a été vue une première fois. On ne sait pas, en revanche, quelles cartes un adversaire a en main et lesquelles sont dans sa pioche.
- Tout le reste est public : l'aire de jeu, la défausse, les cartes trashées, le nombre de cartes restant dans chaque deck, l'Or, les jauges et les Privilèges de chaque joueur.
