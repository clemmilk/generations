# Mettre Générations en ligne

Le jeu en ligne est fait de deux morceaux, hébergés à deux endroits :

- **le serveur de jeu**, sur Render : il détient les parties et fait jouer les IA ;
- **le site** (l'interface), sur Vercel : c'est l'adresse que tu donnes à tes amis.

Les deux récupèrent le code depuis un dépôt GitHub. Une fois en place, chaque `git push` les met à jour tout seuls.

L'ordre compte : GitHub, puis Render, puis Vercel, car le site a besoin de l'adresse du serveur.

> Les noms des boutons sur GitHub, Render et Vercel peuvent avoir changé depuis la rédaction de ce guide.
> L'important est ce qu'il faut renseigner, indiqué à chaque étape.

## 1. Envoyer le projet sur GitHub

1. Sur github.com, crée un nouveau dépôt **privé**, par exemple `generations`. Ne coche aucune option
   d'initialisation (pas de README, pas de .gitignore) : le projet existe déjà.
2. Dans un terminal ouvert dans le dossier du projet, remplace `TON-COMPTE` par ton nom d'utilisateur GitHub :

   ```bash
   git remote add origin https://github.com/TON-COMPTE/generations.git
   ```

   ```bash
   git push -u origin master
   ```

   Le premier envoi prend quelques minutes : il contient les visuels d'origine (environ 60 Mo).

## 2. Le serveur de jeu, sur Render

1. Sur render.com, crée un compte ou connecte-toi avec GitHub, et autorise Render à lire le dépôt `generations`.
2. Crée un nouveau **Blueprint** et choisis ce dépôt. Render lit le fichier `render.yaml` du projet, qui
   contient déjà tous les réglages : un service web gratuit nommé `generations-serveur`.
3. Valide. Le premier déploiement prend quelques minutes.
4. Note l'adresse du service, de la forme `https://generations-serveur-xxxx.onrender.com`.
5. Vérification : ouvre cette adresse dans ton navigateur. Elle doit afficher « Serveur Générations en marche. »

Si tu préfères créer le service à la main plutôt que par Blueprint, voici les réglages :

| Réglage | Valeur |
|---|---|
| Type | Web Service |
| Environnement | Node |
| Commande de build | `npm install --omit=dev` |
| Commande de démarrage | `node src/server/index.ts` |
| Variable d'environnement | `NODE_VERSION` = `24` |

## 3. Le site, sur Vercel

1. Sur vercel.com, crée un compte ou connecte-toi avec GitHub, et importe le dépôt `generations` comme nouveau projet.
2. Les commandes de build sont déjà dans le fichier `vercel.json` du projet : ne change rien.
3. Avant de lancer le déploiement, ajoute une **variable d'environnement** :

   | Nom | Valeur |
   |---|---|
   | `VITE_SERVEUR` | l'adresse du serveur Render notée à l'étape 2, sans barre oblique à la fin |

4. Lance le déploiement. Vercel te donne l'adresse du site, de la forme `https://generations-xxxx.vercel.app`.

Si tu oublies `VITE_SERVEUR` ou si tu changes l'adresse du serveur, corrige la variable dans les réglages du
projet Vercel puis relance un déploiement : elle n'est lue qu'au moment de la construction du site.

## 4. Vérifier

1. Ouvre l'adresse Vercel, choisis « Jouer en ligne », entre un pseudo et crée un salon.
2. Ouvre le lien d'invitation dans un autre onglet, ou envoie-le à quelqu'un.
3. Lance une partie et joue quelques tours.

Si l'écran reste sur « Connexion au serveur… » :

- attends une minute : sur l'offre gratuite, le serveur Render s'endort après un quart d'heure sans visite
  et met environ une minute à se réveiller ;
- vérifie que l'adresse Render affiche bien « Serveur Générations en marche. » ;
- vérifie la variable `VITE_SERVEUR` dans Vercel (adresse complète, en `https://`, sans barre finale).

## 5. Facultatif : réserver le serveur à ton site

Par défaut, le serveur accepte les connexions venant de n'importe quel site. Pour ne l'ouvrir qu'au tien,
ajoute sur Render la variable d'environnement `ORIGINE` avec l'adresse exacte de ton site Vercel.
Ne le fais qu'une fois que tout fonctionne : une adresse mal recopiée bloquerait toutes les connexions.

## Mettre à jour le jeu ensuite

Après une modification (règles, cartes, interface) :

```bash
npm test
```

```bash
git push
```

Render et Vercel se mettent à jour tout seuls en quelques minutes. Les parties en cours sur le serveur sont
perdues à chaque mise à jour.

Si tu as ajouté ou modifié un visuel dans `visuels/`, refais d'abord les copies allégées que le site affiche,
puis enregistre-les avec le reste :

```bash
npm run images
```

`npm test` signale un visuel dont la copie allégée manque.

## Ce qu'il faut savoir sur l'hébergement gratuit

- **Réveil du serveur** : environ une minute d'attente pour le premier joueur après une période sans visite.
- **Parties en mémoire** : un redémarrage du serveur (mise à jour, mise en veille) efface les salons et les parties.
- **IA qui planifie** : elle demande beaucoup de calcul. Sur le petit serveur gratuit, elle réfléchira plus
  longtemps que sur ton ordinateur. Si c'est gênant, préfère l'IA entraînée en ligne.
- **Le lien d'invitation est impossible à deviner**, mais le site lui-même est accessible à quiconque en
  connaît l'adresse.
