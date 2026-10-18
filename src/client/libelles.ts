import type { Action, Attente } from '../game/actions.ts';
import { carte, nomsDesCartes, privilege } from '../game/cartes.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { EFFETS_PRIVILEGES } from '../game/privileges.ts';
import type { CoutEffet, Etape } from '../game/materiel/index.ts';
import type { Vue } from '../game/vue.ts';

// Les textes affichés par l'interface. Aucune règle ici : on ne fait que décrire.

/** L'adresse d'une image du dossier visuels/. */
export function urlImage(image: string): string {
  return encodeURI('/' + image.replace(/^visuels\//, ''));
}

function etapeDe(attente: { carte: string; index: number; rouge: boolean }): Etape | undefined {
  const c = carte(attente.carte);
  return (attente.rouge ? c.effetRouge : c.effet)[attente.index];
}

function texteCout(cout: CoutEffet): string {
  const morceaux: string[] = [];
  if (cout.or > 0) morceaux.push(`${cout.or} Or`);
  if (cout.pierre > 0) morceaux.push(`${cout.pierre} Pierre`);
  if (cout.metal > 0) morceaux.push(`${cout.metal} Métal`);
  return morceaux.join(' + ');
}

/** La question posée au joueur dont on attend un choix. */
export function question(vue: Vue): string {
  const attente = vue.attente;
  if (!attente) return '';
  const nom = vue.joueurs[attente.joueur]?.nom ?? '?';
  switch (attente.type) {
    case 'tour':
      return `${nom}, c'est ton tour : joue une carte, achète une carte ou mets fin à ta lignée.`;
    case 'payer': {
      const c = carte(attente.carte);
      const etape = etapeDe(attente);
      const texte = attente.rouge ? c.texteEffetRouge : c.texteEffet;
      return `${nom} — ${c.nom}${attente.rouge ? ' (Effet Rouge)' : ''} : « ${texte} ». Payer ${etape?.cout ? texteCout(etape.cout) : ''} ?`;
    }
    case 'gain': {
      const c = carte(attente.carte);
      const texte = attente.rouge ? c.texteEffetRouge : c.texteEffet;
      const reste = attente.restant > 1 ? ` (encore ${attente.restant} fois au maximum)` : '';
      return `${nom} — ${c.nom}${attente.rouge ? ' (Effet Rouge)' : ''} : « ${texte} »${reste}.`;
    }
    case 'trashAchat':
      return `${nom}, veux-tu payer 1 Or de plus pour trasher 1 de tes cartes ?`;
    case 'remplacementAchat':
      return `${nom}, choisis la carte que ${carte(attente.carte).nom} va remplacer (elle sera trashée).`;
    case 'trashPrivilege':
      return `${nom}, choisis 1 carte à trasher (Privilège).`;
    case 'finNoblesse':
      return `${nom}, tu as assez d'Érudits : veux-tu prendre un Privilège ?`;
    case 'finJauges': {
      if (attente.seule === undefined) {
        return `${nom}, veux-tu monter une jauge ? (Les Ressources de ton aire de jeu sont partagées entre les deux.)`;
      }
      const moi = vue.joueurs[attente.joueur];
      const niveau = attente.seule === 'economie' ? (moi?.niveauEconomie ?? 0) : (moi?.niveauPopulation ?? 0);
      const suivant = MATERIEL.plateau[attente.seule][niveau + 1];
      const nomJauge = attente.seule === 'economie' ? 'Économie' : 'Population';
      const cout = suivant ? (suivant.paiement === 'or' ? `${suivant.cout} Or` : `${suivant.cout} Ressource(s) de ton aire de jeu, sans les dépenser`) : '';
      const suite = attente.seule === 'economie' ? ' (Le reste de ton Or sera ensuite défaussé.)' : '';
      return `${nom}, veux-tu monter en ${nomJauge} ? Coût : ${cout}.${suite}`;
    }
    case 'debutRecherche':
      return `${nom}, début de lignée : choisis 1 carte de ton deck à prendre en main (Privilège).`;
    case 'debutDefausse':
      return `${nom}, début de lignée : défausse 1 carte de ta main (Privilège).`;
  }
}

/** Le texte du bouton d'une action. */
export function libelleAction(action: Action, attente: Attente | null): string {
  switch (action.type) {
    case 'jouer':
      return `Jouer ${carte(action.carte).nom}`;
    case 'acheter':
      return action.paiement.length > 0
        ? `Acheter ${carte(action.carte).nom} en défaussant ${nomsDesCartes(action.paiement)}`
        : `Acheter ${carte(action.carte).nom}`;
    case 'finLignee':
      return 'Mettre fin à ma lignée';
    case 'remplacer':
      return `Remplacer ${carte(action.carte).nom}`;
    case 'remplacerPioche':
      return 'Remplacer la première carte de ma pioche';
    case 'utiliserPrivilege': {
      const verbe = EFFETS_PRIVILEGES[action.numero]?.type === 'actionTrash' ? 'trasher' : 'piocher';
      return action.paiement.length > 0
        ? `Privilège ${action.numero} : ${verbe} en défaussant ${nomsDesCartes(action.paiement)}`
        : `Privilège ${action.numero} : payer pour ${verbe}`;
    }
    case 'defausser':
      return `Défausser ${carte(action.carte).nom}`;
    case 'payer':
      return action.paiement.length > 0
        ? `Payer en défaussant ${nomsDesCartes(action.paiement)}`
        : 'Payer';
    case 'trasher':
      return `Trasher ${carte(action.carte).nom}`;
    case 'trasherPioche':
      return 'Trasher la carte du dessus de ma pioche (sans la voir)';
    case 'rechercher':
      return `Prendre ${carte(action.carte).nom}`;
    case 'vendre':
      return `Vendre ${carte(action.carte).nom}`;
    case 'prendrePrivilege':
      return `Privilège ${action.numero} : ${privilege(action.numero).texte}`;
    case 'rejouer':
      return 'Rejouer après ce tour';
    case 'monter':
      return action.piste === 'economie' ? 'Monter en Économie' : 'Monter en Population';
    case 'passer':
      return attente?.type === 'gain' ? 'Arrêter là' : 'Non merci';
  }
}
