# [GÉNÉRATIONS] — Simulateur en ligne

## Contexte
Simulateur web du jeu de société [GÉNÉRATIONS], un prototype en cours de création (non publié).
Objectifs :
1. Jouer en ligne entre amis (2 à 4 joueurs), via un lien d'invitation.
2. Jouer contre des IA, ou compléter une table avec des IA.
3. Simuler des parties IA contre IA pour tester l'équilibrage.

Je suis game designer, pas développeur : explique tes choix simplement et signale-moi tout ce que je dois tester à la main.

## Source de vérité
- Les règles sont dans le fichier `docs/regles_generations.md`. Elles font foi.
- Le matériel (cartes, tuiles, plateau, effets) est dans les 3 fichiers csv du dossier `data/`, chacun expliqué par le fichier .md du même nom.
- **Si une règle est ambiguë, incomplète ou contradictoire : NE TRANCHE PAS.
  Pose-moi la question**, puis note ma réponse dans `docs/decisions_generations.md`.
- Les règles évoluent souvent (c'est un prototype). Le code doit être facile à modifier : valeurs et effets dans des fichiers de données, pas en dur.

## Stack technique
- TypeScript partout (mode strict).
- Moteur de jeu : sur mesure, sans framework de jeu. Code simple et lisible plutôt qu'abstrait ou générique : il ne sert qu'à ce jeu.
- Front : React + Vite.
- Serveur multijoueur : Node.js + Socket.io.
- Tests : Vitest.
- Pas de base de données au départ : les parties en cours vivent en mémoire sur le serveur.
- Limiter les dépendances : demande-moi avant d'ajouter une bibliothèque.
- Hébergement visé : front sur Vercel, serveur sur Render.

## Fonctionnement du moteur
- `createGame(joueurs, seed)` → état initial
- `getLegalActions(état, joueur)` → liste des actions possibles
- `applyAction(état, action)` → nouvel état (ou erreur si action illégale)
- `getPlayerView(état, joueur)` → état filtré, sans les infos cachées pour ce joueur
- `isGameOver(état)` / `getScores(état)`
- Hasard : générateur pseudo-aléatoire seedé maison, stocké dans l'état, pour que chaque partie soit rejouable à l'identique.
- Le serveur fait autorité : il valide chaque action avec le moteur avant de l'appliquer, puis envoie à chaque joueur sa propre vue filtrée.

## Architecture
docs/            Règles, décisions, définition de la procédure
visuels/         les fichiers JPG du matériel de jeu, à appeler d'après les indications des fichiers csv du dossier data/
data/            définition du matériel : csv du matériel et explication des csv
src/game/        Moteur de règles : logique PURE, aucune dépendance à l'UI
src/ai/          Bots (aléatoire, heuristique, MCTS)
src/client/      Interface React
src/server/      Serveur multijoueur
scripts/         Outils (simulation de masse, import du CSV)
tests/           Tests du moteur et des bots


Principes :
- Le moteur est une fonction pure : (état, action) → nouvel état.
  Il est utilisé à l'identique par le client, le serveur et les IA.
- L'UI n'implémente aucune règle : elle demande au moteur quels coups sont légaux.
- Information cachée : un joueur ne doit JAMAIS recevoir les données qu'il n'est pas censé voir (mains adverses, ordre de la pioche). Filtrer côté serveur.


## Règles de travail
- Avance par petites étapes. Pour toute tâche non triviale, propose un plan avant de coder.
- Chaque règle implémentée doit avoir au moins un test, cas limites compris (pioche vide, égalité, action impossible…).
- Lance `npm test` après chaque modification du moteur. Ne considère pas une tâche finie si des tests échouent.
- Ne supprime ni ne modifie un test existant pour le faire passer sans me demander : un test qui casse signale peut-être une règle mal comprise.
- Chaque partie produit un journal lisible des actions, exportable en JSON pour reproduire un bug.
- Ne commite pas sans mon accord. Messages de commit en français.

## Commandes
- `npm run dev` : lance le client et le serveur en local
- `npm test` : lance les tests
- `npm run simulate -- --games 1000` : simule des parties entre bots et affiche les statistiques (taux de victoire par siège, durée, scores)

## Interface
- Langue : français.
- Doit être jouable sur ordinateur ET sur tablette.
- Les visuels sont dans `visuels`. S'il en manque, utilise des placeholders simples (rectangle + nom de la carte), jamais d'images inventées.

## Étape en cours
Étape 1 : moteur de règles + tests, avec interface.
