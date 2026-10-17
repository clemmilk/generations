# Version « reboot » du 16/10 (cartes de départ simples)

Version d'essai conservée, testée par les IA le 16/10. Elle n'est pas active.

- Deck de départ de 9 cartes sans trash : 2 Base Pierre, 2 Base Métal, 2 Base Érudit, Outil de pioche, Vente, Érudit-Métal.
- Pas de cartes Assymétrie (réglage `cartesAsymetrieParJoueur: 0`).
- 28 cartes Avancée, achetées en Or uniquement.
- 19 Privilèges (le 20 retiré, le 13 « 3 Pierres pour piocher »).
- Fin de lignée : jauges au choix sur un budget commun de Ressources (décision Y).
- Achat : la carte achetée va en main (avec le trash à 1 Or).
- Dernier essai fait sans Or de compensation.

Pour la remettre en place : copier les 3 csv dans `data/`, puis `npm run import`, et régler `src/game/parametres.ts`
(`cartesAsymetrieParJoueur: 0`, `carteAcheteeVa: 'main'`, `ordreDesJauges: null`) et le Privilège 13 / 20 dans `src/game/privileges.ts`.
`poids-entraines.json` : l'IA entraînée sur cette version (à copier dans `src/ai/`).
Rapports : `rapports/analyse-*-2026-10-16-*.md`.
