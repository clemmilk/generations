# Sources des livrets de règles

- `livret_fr.html`, `livret_en.html` : le texte des livrets, en français et en anglais. Ce sont aussi les pages publiées sur le web.
- `impression.css` : la mise en page d'impression (pages de 160 × 190 mm, une page par bloc, 12 pages en tout).
- `impression_en.css` : un petit réglage pour la version anglaise, dont le texte est un peu plus long.
- `img/` : les visuels utilisés (copies allégées de `visuels-web/`, renommées). Si un visuel change dans `visuels/`, lancer `npm run images`, puis recopier le fichier ici sous le même nom.

## Refaire les PDF

```bash
powershell -ExecutionPolicy Bypass -File docs/livret/generer-pdf.ps1
```

Le script écrit `docs/livret_regles_generations.pdf` et `docs/rulebook_generations_en.pdf`. Il utilise Brave (ou Chrome, ou Edge) pour imprimer les pages en PDF. Fermer les PDF avant de le lancer : un fichier ouvert ne peut pas être remplacé.

## Après une modification du texte

Vérifier que chaque livret fait toujours 12 pages, et que chaque bloc tient sur sa page. Un texte plus long peut faire passer une image à la page suivante. Les numéros de page du sommaire (page 2) sont écrits à la main dans les deux fichiers HTML.
