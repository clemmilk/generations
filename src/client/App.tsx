import { useEffect, useState } from 'react';
import { BOTS, choisirAction } from '../ai/index.ts';
import type { TypeDeBot } from '../ai/index.ts';
import type { Action } from '../game/actions.ts';
import {
  applyAction,
  createGame,
  exporterPartie,
  getLegalActions,
  getPlayerView,
  rejouerPartie,
} from '../game/index.ts';
import type { Etat, Inscription } from '../game/index.ts';
import { PartieEnLigne } from './EnLigne.tsx';
import { Table } from './Table.tsx';
import { telecharger } from './telecharger.ts';

/** Temps laissé entre deux actions d'une IA, pour qu'on puisse suivre ce qu'elle fait. */
const PAUSE_IA_MS = 900;

const JOUEURS: Inscription[] = [
  { nom: 'Bleu', couleur: 'bleu' },
  { nom: 'Jaune', couleur: 'jaune' },
  { nom: 'Rouge', couleur: 'rouge' },
  { nom: 'Vert', couleur: 'vert' },
];

/** Qui tient un siège : un humain, ou l'un des bots de src/ai. */
type Siege = 'humain' | TypeDeBot;

const SIEGES_PAR_DEFAUT: Siege[] = ['humain', 'planificatrice', 'planificatrice', 'planificatrice'];

/** Une graine tirée au hasard : chaque nouvelle partie est différente, mais son numéro permet de la rejouer. */
function graineAuHasard(): number {
  return 1 + Math.floor(Math.random() * 999_999);
}

function creerPartie(sieges: Siege[], graine: number): Etat {
  return createGame(
    sieges.map((siege, i) => ({
      ...JOUEURS[i]!,
      nom: siege === 'humain' ? JOUEURS[i]!.nom : `${JOUEURS[i]!.nom} (IA)`,
    })),
    graine,
  );
}

/**
 * Partie locale : tous les joueurs sont sur le même écran, le moteur tourne dans le navigateur.
 * C'est le mode de test des règles : on peut annuler, exporter et importer une partie.
 */
function PartieLocale(props: { onRetour: () => void }) {
  const [nombre, setNombre] = useState(2);
  /** La graine demandée pour la prochaine partie. Vide : elle sera tirée au hasard. */
  const [graineVoulue, setGraineVoulue] = useState('');
  /** Le réglage des sièges pour la prochaine partie. */
  const [sieges, setSieges] = useState<Siege[]>(SIEGES_PAR_DEFAUT);
  /** Qui tient chaque siège dans la partie en cours. */
  const [enJeu, setEnJeu] = useState<Siege[]>(() => SIEGES_PAR_DEFAUT.slice(0, 2));
  const [etats, setEtats] = useState<Etat[]>(() => [creerPartie(SIEGES_PAR_DEFAUT.slice(0, 2), graineAuHasard())]);
  const [erreur, setErreur] = useState<string | null>(null);

  const etat = etats[etats.length - 1]!;
  const estHumain = (joueur: number) => (enJeu[joueur] ?? 'humain') === 'humain';
  const decideur = etat.attente?.joueur ?? null;
  const iaEnTrainDeJouer = decideur !== null && !estHumain(decideur);

  // On regarde la partie avec les yeux de l'humain qui doit choisir. Pendant le tour d'une IA,
  // on reste sur le dernier humain qui a joué : la main des IA n'est jamais montrée.
  const dernierHumain = [...etat.historique].reverse().find((action) => estHumain(action.joueur))?.joueur;
  const premierHumain = etat.joueurs.find((joueur) => estHumain(joueur.id))?.id;
  const moi = decideur !== null && estHumain(decideur) ? decideur : (dernierHumain ?? premierHumain ?? 0);

  // Quand c'est à une IA de choisir, elle joue toute seule après une courte pause.
  useEffect(() => {
    if (decideur === null) return;
    const siege = enJeu[decideur];
    if (!siege || siege === 'humain') return;
    const minuterie = setTimeout(() => {
      const action = choisirAction(etat, BOTS[siege], Math.random);
      if (!action) return;
      setEtats((courants) =>
        courants[courants.length - 1] === etat ? [...courants, applyAction(etat, action)] : courants,
      );
    }, PAUSE_IA_MS);
    return () => clearTimeout(minuterie);
  }, [etat, enJeu, decideur]);

  // Annuler revient au dernier choix d'un humain, en effaçant aussi ce que les IA ont joué depuis.
  let retour = -1;
  for (let i = etats.length - 2; i >= 0 && retour === -1; i--) {
    const precedent = etats[i]!.attente?.joueur;
    if (precedent !== undefined && estHumain(precedent)) retour = i;
  }

  const afficher = (suivants: Etat[]) => {
    setEtats(suivants);
    setErreur(null);
  };
  const appliquer = (action: Action) => {
    try {
      afficher([...etats, applyAction(etat, action)]);
    } catch (e) {
      setErreur((e as Error).message);
    }
  };
  const nouvellePartie = () => {
    const choisis = sieges.slice(0, nombre);
    setEnJeu(choisis);
    const demandee = Number(graineVoulue);
    const graine = graineVoulue.trim() !== '' && Number.isInteger(demandee) ? demandee : graineAuHasard();
    afficher([creerPartie(choisis, graine)]);
  };
  const importer = async (fichier: File) => {
    try {
      const rejoues = rejouerPartie(JSON.parse(await fichier.text()));
      // Une partie importée est reprise à la main sur tous les sièges, pour pouvoir l'examiner tranquillement.
      setEnJeu(rejoues[0]!.joueurs.map(() => 'humain'));
      afficher(rejoues);
    } catch (e) {
      setErreur(`Import impossible : ${(e as Error).message}`);
    }
  };

  const entete = (
    <>
      <h1>Générations</h1>
      <button type="button" onClick={props.onRetour}>
        Accueil
      </button>
      <label>
        Joueurs{' '}
        <select value={nombre} onChange={(e) => setNombre(Number(e.target.value))}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </label>
      {JOUEURS.slice(0, nombre).map((joueur, i) => (
        <label key={joueur.couleur}>
          {joueur.nom}{' '}
          <select
            value={sieges[i]}
            onChange={(e) => setSieges(sieges.map((siege, j) => (j === i ? (e.target.value as Siege) : siege)))}
          >
            <option value="humain">Humain</option>
            {Object.entries(BOTS).map(([type, bot]) => (
              <option key={type} value={type}>
                {bot.nom}
              </option>
            ))}
          </select>
        </label>
      ))}
      <label title="Laisse vide pour une partie au hasard. Pour rejouer une partie, indique son numéro.">
        Graine{' '}
        <input
          type="number"
          value={graineVoulue}
          placeholder="au hasard"
          onChange={(e) => setGraineVoulue(e.target.value)}
        />
      </label>
      <button type="button" onClick={nouvellePartie}>
        Nouvelle partie
      </button>
      <span className="graine" title="Le numéro de cette partie : indique-le dans « Graine » pour la rejouer à l'identique.">
        Partie n° <strong>{etat.graine}</strong>
      </span>
      <button type="button" disabled={retour === -1} onClick={() => afficher(etats.slice(0, retour + 1))}>
        Annuler la dernière action
      </button>
      <button
        type="button"
        onClick={() => telecharger(exporterPartie(etat))}
        title="Enregistre la graine et toutes les actions, pour rejouer la partie à l'identique"
      >
        Exporter la partie
      </button>
      <label className="import" title="Recharge une partie exportée">
        Importer une partie
        <input
          type="file"
          accept="application/json,.json"
          onChange={(e) => {
            const fichier = e.target.files?.[0];
            if (fichier) void importer(fichier);
            e.target.value = '';
          }}
        />
      </label>
    </>
  );

  return (
    <Table
      vue={getPlayerView(etat, moi)}
      actions={getLegalActions(etat, moi)}
      onAction={appliquer}
      entete={entete}
      enAttenteDe={iaEnTrainDeJouer ? `${etat.joueurs[decideur]?.nom} est en train de jouer…` : null}
      erreur={erreur}
    />
  );
}

export function App() {
  // Un lien d'invitation contient le code du salon : on va alors directement en ligne.
  const invitation = new URLSearchParams(window.location.search).get('salon');
  const [mode, setMode] = useState<'accueil' | 'locale' | 'enLigne'>(invitation ? 'enLigne' : 'accueil');
  const accueil = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setMode('accueil');
  };

  if (mode === 'locale') return <PartieLocale onRetour={accueil} />;
  if (mode === 'enLigne') return <PartieEnLigne onRetour={accueil} />;
  return (
    <div className="accueil">
      <h1>Générations</h1>
      <p>Prototype en cours de test.</p>
      <div className="choix">
        <button type="button" onClick={() => setMode('enLigne')}>
          <strong>Jouer en ligne</strong>
          <span>Créer un salon et inviter des amis avec un lien. Des IA peuvent compléter la table.</span>
        </button>
        <button type="button" onClick={() => setMode('locale')}>
          <strong>Partie locale</strong>
          <span>Tous les joueurs sur cet écran, contre des IA si besoin. Annulation, export et import de partie.</span>
        </button>
      </div>
    </div>
  );
}
