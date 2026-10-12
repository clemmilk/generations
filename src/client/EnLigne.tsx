import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { BOTS } from '../ai/index.ts';
import type { TypeDeBot } from '../ai/index.ts';
import type { Demandes, Instantane } from '../server/protocole.ts';
import { Table } from './Table.tsx';
import { telecharger } from './telecharger.ts';

// Partie en ligne : le moteur tourne sur le serveur. Ce navigateur ne reçoit que la vue de son joueur
// et ses actions permises, et renvoie l'action choisie.

/** L'adresse du serveur : celle donnée à la mise en ligne, sinon le port 3001 de la machine qui sert le site. */
const SERVEUR: string =
  import.meta.env['VITE_SERVEUR'] ?? `${window.location.protocol}//${window.location.hostname}:3001`;

/** Lit ou crée une valeur gardée par le navigateur. */
function memoire(stockage: () => Storage, cle: string, creer: () => string): string {
  try {
    const connue = stockage().getItem(cle);
    if (connue) return connue;
    const neuve = creer();
    stockage().setItem(cle, neuve);
    return neuve;
  } catch {
    return creer();
  }
}

/**
 * Le jeton secret qui identifie ce joueur auprès du serveur. Il est gardé par onglet : il survit à un
 * rechargement de page (on retrouve son siège), et deux onglets du même navigateur sont deux joueurs distincts.
 */
function lireJeton(): string {
  return memoire(() => window.sessionStorage, 'generations-jeton', () => crypto.randomUUID());
}

/** Retient, pour cet onglet, le salon où il se trouve (null : aucun). */
function noterSalon(code: string | null): void {
  try {
    if (code === null) window.sessionStorage.removeItem('generations-salon');
    else window.sessionStorage.setItem('generations-salon', code);
  } catch {
    // Sans stockage, on ne reprendra simplement pas sa place tout seul après un rechargement.
  }
}

/** Cet onglet était-il déjà dans ce salon avant le rechargement de la page ? */
function dejaDansLeSalon(code: string): boolean {
  try {
    return window.sessionStorage.getItem('generations-salon') === code;
  } catch {
    return false;
  }
}

function retenir(cle: string, valeur: string): void {
  try {
    window.localStorage.setItem(cle, valeur);
  } catch {
    // Navigation privée : tant pis, le pseudo ne sera pas retenu.
  }
}

const NOMS_DES_SIEGES: Record<string, string> = { bleu: 'Bleu', jaune: 'Jaune', rouge: 'Rouge', vert: 'Vert' };

export function PartieEnLigne(props: { onRetour: () => void }) {
  const [jeton] = useState(lireJeton);
  const [pseudo, setPseudo] = useState(() => memoire(() => window.localStorage, 'generations-pseudo', () => ''));
  const [nombre, setNombre] = useState(2);
  const [salon, setSalon] = useState<Instantane | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [connecte, setConnecte] = useState(false);
  const [copie, setCopie] = useState(false);
  const socket = useRef<Socket | null>(null);
  /** Le code du salon où l'on est (ou que le lien d'invitation désigne), pour y revenir après une coupure. */
  const code = useRef(new URLSearchParams(window.location.search).get('salon'));
  const pseudoCourant = useRef(pseudo);
  pseudoCourant.current = pseudo;

  useEffect(() => {
    const connexion = io(SERVEUR);
    socket.current = connexion;
    connexion.on('connect', () => {
      setConnecte(true);
      // Après une coupure ou un rechargement de page, on reprend sa place tout seul.
      // Un onglet qui arrive pour la première fois par le lien d'invitation choisit d'abord son pseudo.
      if (code.current && dejaDansLeSalon(code.current) && pseudoCourant.current.trim() !== '') {
        connexion.emit('rejoindre', { code: code.current, jeton, pseudo: pseudoCourant.current });
      }
    });
    connexion.on('disconnect', () => setConnecte(false));
    connexion.on('instantane', (instantane: Instantane) => {
      code.current = instantane.code;
      noterSalon(instantane.code);
      window.history.replaceState(null, '', `?salon=${instantane.code}`);
      setSalon(instantane);
      setErreur(null);
    });
    connexion.on('erreur', (message: string) => setErreur(message));
    return () => {
      connexion.disconnect();
    };
  }, [jeton]);

  function demander<K extends keyof Demandes>(nom: K, demande: Demandes[K]): void {
    socket.current?.emit(nom, demande);
  }

  const quitter = () => {
    demander('quitter', {});
    noterSalon(null);
    props.onRetour();
  };

  // ───────── Avant d'être dans un salon : choisir son pseudo, puis créer ou rejoindre ─────────
  if (!salon) {
    const pret = connecte && pseudo.trim() !== '';
    const valider = () => {
      retenir('generations-pseudo', pseudo.trim());
      if (code.current) demander('rejoindre', { code: code.current, jeton, pseudo });
      else demander('creer', { jeton, pseudo, nombre });
    };
    return (
      <div className="accueil">
        <h1>Générations</h1>
        <p>{code.current ? `Tu es invité dans le salon ${code.current}.` : 'Créer un salon en ligne.'}</p>
        <form
          className="formulaire"
          onSubmit={(e) => {
            e.preventDefault();
            if (pret) valider();
          }}
        >
          <label>
            Ton pseudo{' '}
            <input value={pseudo} maxLength={20} autoFocus onChange={(e) => setPseudo(e.target.value)} />
          </label>
          {!code.current && (
            <label>
              Nombre de joueurs{' '}
              <select value={nombre} onChange={(e) => setNombre(Number(e.target.value))}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>
          )}
          <button type="submit" disabled={!pret}>
            {code.current ? 'Rejoindre le salon' : 'Créer le salon'}
          </button>
          <button type="button" className="secondaire" onClick={props.onRetour}>
            Retour
          </button>
        </form>
        {!connecte && <p className="note">Connexion au serveur…</p>}
        {erreur && <p className="erreur">{erreur}</p>}
      </div>
    );
  }

  const hote = salon.monSiege === salon.hote;
  const lien = `${window.location.origin}${window.location.pathname}?salon=${salon.code}`;
  const bots = Object.entries(BOTS) as [TypeDeBot, (typeof BOTS)[TypeDeBot]][];

  // ───────── Salon d'attente ─────────
  if (salon.phase === 'attente') {
    const complet = salon.sieges.every((siege) => siege.type !== 'libre');
    return (
      <div className="accueil">
        <h1>Salon {salon.code}</h1>
        <div className="invitation">
          <span>Lien d'invitation :</span>
          <input readOnly value={lien} onFocus={(e) => e.target.select()} />
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(lien).then(() => setCopie(true));
            }}
          >
            {copie ? 'Copié' : 'Copier'}
          </button>
        </div>

        {hote && (
          <label>
            Nombre de joueurs{' '}
            <select value={salon.sieges.length} onChange={(e) => demander('nombre', { nombre: Number(e.target.value) })}>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
        )}

        <ul className="sieges">
          {salon.sieges.map((siege, i) => (
            <li key={i} className={`couleur-${siege.couleur}`}>
              <strong>{NOMS_DES_SIEGES[siege.couleur]}</strong>
              {siege.type === 'humain' ? (
                <span>
                  {siege.nom}
                  {i === salon.hote && ' (hôte)'}
                  {i === salon.monSiege && ' — toi'}
                  {!siege.connecte && ' — déconnecté'}
                </span>
              ) : hote ? (
                <select
                  value={siege.type}
                  onChange={(e) => demander('siege', { siege: i, type: e.target.value as 'libre' | TypeDeBot })}
                >
                  <option value="libre">En attente d'un joueur…</option>
                  {bots.map(([type, bot]) => (
                    <option key={type} value={type}>
                      {bot.nom}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{siege.type === 'libre' ? 'En attente d\'un joueur…' : BOTS[siege.type].nom}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="formulaire">
          {hote ? (
            <button type="button" disabled={!complet} onClick={() => demander('lancer', {})}>
              Lancer la partie
            </button>
          ) : (
            <p className="note">L'hôte lancera la partie quand la table sera complète.</p>
          )}
          <button type="button" className="secondaire" onClick={quitter}>
            Quitter le salon
          </button>
        </div>
        {hote && !complet && <p className="note">Invite un joueur ou mets une IA sur chaque siège libre.</p>}
        {!connecte && <p className="erreur">Connexion perdue, nouvelle tentative…</p>}
        {erreur && <p className="erreur">{erreur}</p>}
      </div>
    );
  }

  // ───────── Partie en cours ou terminée ─────────
  if (!salon.vue) {
    return (
      <div className="accueil">
        <h1>Salon {salon.code}</h1>
        <p>Tu n'as plus de siège dans cette partie.</p>
        <button type="button" onClick={quitter}>
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const decideur = salon.vue.attente?.joueur ?? null;
  const absents = salon.sieges
    .map((siege, i) => ({ ...siege, i }))
    .filter((siege) => siege.type === 'humain' && !siege.connecte);
  const entete = (
    <>
      <h1>Générations</h1>
      <span>Salon {salon.code}</span>
      {!connecte && <span className="erreur">Connexion perdue, nouvelle tentative…</span>}
      {absents.map((siege) => (
        <span key={siege.i} className="absent">
          {siege.nom} est déconnecté
          {hote && (
            <button type="button" onClick={() => demander('remplacer', { siege: siege.i, type: 'planificatrice' })}>
              Le remplacer par une IA
            </button>
          )}
        </span>
      ))}
      {salon.partie && (
        <button type="button" onClick={() => telecharger(salon.partie!)}>
          Exporter la partie
        </button>
      )}
      {salon.phase === 'finie' && hote && (
        <button type="button" onClick={() => demander('revanche', {})}>
          Revenir au salon pour rejouer
        </button>
      )}
      <button type="button" onClick={quitter}>
        Quitter
      </button>
    </>
  );

  return (
    <Table
      vue={salon.vue}
      actions={salon.actions}
      onAction={(action) => demander('action', { action })}
      entete={entete}
      enAttenteDe={
        decideur !== null && decideur !== salon.monSiege
          ? `${salon.vue.joueurs[decideur]?.nom} est en train de jouer…`
          : null
      }
      erreur={erreur}
    />
  );
}
