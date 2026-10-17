# Matériel des tests

Les tests des règles (moteur, IA, serveur) utilisent ces 3 fichiers, et non ceux de `data/`.
Ce sont les cartes d'origine du prototype (12/10), sur lesquelles les tests ont été écrits.

Ainsi, modifier les cartes, le plateau ou les Privilèges dans `data/` ne casse pas les tests des règles.
Seul `tests/materiel/materiel.test.ts` vérifie les vrais fichiers de `data/`.

Les effets des Privilèges sont toujours ceux du code (`src/game/privileges.ts`), et les réglages
ceux de `src/game/parametres.ts` : les tests vérifient donc les règles actuelles, avec des cartes fixes.
