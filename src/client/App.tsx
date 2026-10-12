import { useEffect, useState } from 'react';
import { BOTS, choisirAction } from '../ai/index.ts';
import type { TypeDeBot } from '../ai/index.ts';
import type { Action } from '../game/actions.ts';
import { carte, nomsDesCartes, privilege } from '../game/cartes.ts';
import {
  applyAction,
  createGame,
  exporterPartie,
  getLegalActions,
  getPlayerView,
  rejouerPartie,
} from '../game/index.ts';
import type { Etat, Inscription, Vue, VueJoueur } from '../game/index.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { blasons, detailDesRessources } from '../game/ressources.ts';
import type { OrigineRessource } from '../game/ressources.ts';
import { libelleAction, question, urlImage } from './libelles.ts';

// Interface locale : tous les joueurs sont sur le même écran.
// Elle n'applique aucune règle : elle affiche la vue du joueur qui doit choisir
// et propose les actions que le moteur déclare permises.

const JOUEURS: Inscription[] = [
  { nom: 'Bleu', couleur: 'bleu' },
  { nom: 'Jaune', couleur: 'jaune' },
  { nom: 'Rouge', couleur: 'rouge' },
  { nom: 'Vert', couleur: 'vert' },
];

type ChoisirCarte = (id: string) => void;

function ImageCarte(props: {
  id: string;
  petite?: boolean;
  actions?: Action[];
  onChoisir?: ChoisirCarte;
  onSurvol: (id: string | null) => void;
}) {
  const c = carte(props.id);
  const cliquable = (props.actions?.length ?? 0) > 0;
  return (
    <button
      type="button"
      className={`carte${props.petite ? ' petite' : ''}${cliquable ? ' cliquable' : ''}`}
      disabled={!cliquable}
      title={cliquable ? props.actions!.map((a) => libelleAction(a, null)).join(' / ') : c.nom}
      onClick={() => props.onChoisir?.(props.id)}
      onMouseEnter={() => props.onSurvol(props.id)}
      onMouseLeave={() => props.onSurvol(null)}
    >
      <span className="nom-carte">{c.nom}</span>
      <img src={urlImage(c.image)} alt={c.nom} onError={(e) => (e.currentTarget.style.display = 'none')} />
    </button>
  );
}

function Tuile(props: { numero: number; action?: Action; onAction?: (a: Action) => void }) {
  const p = privilege(props.numero);
  return (
    <button
      type="button"
      className={`tuile${props.action ? ' cliquable' : ''}`}
      disabled={!props.action}
      title={p.texte}
      onClick={() => props.action && props.onAction?.(props.action)}
    >
      <span className="nom-carte">{p.texte}</span>
      <img src={urlImage(p.image)} alt={p.texte} onError={(e) => (e.currentTarget.style.display = 'none')} />
    </button>
  );
}

function Icone(props: { nom: string; titre: string }) {
  return <img className="icone" src={`/plateau/icone_${props.nom}.png`} alt={props.titre} title={props.titre} />;
}

/** Une piste du plateau : des cases remplies jusqu'au niveau atteint, ce qu'elle rapporte, le coût suivant, les blasons. */
function Piste(props: {
  nom: string;
  icone: string;
  niveau: number;
  niveauMax: number;
  /** Ce que la piste donne à chaque début de lignée : une icône et un nombre. null si elle ne donne rien. */
  rapporte: { icone: string; valeur: number; titre: string } | null;
  /** Ce qu'il faut pour passer au niveau suivant, ou null au niveau maximum. */
  prochain: string | null;
  blasons: number;
}) {
  return (
    <div className="piste" title={`${props.nom} : niveau ${props.niveau} sur ${props.niveauMax}`}>
      <span className="piste-nom">{props.nom}</span>
      <span className="cases">
        {Array.from({ length: props.niveauMax }, (_, i) => (
          <span key={i} className={`case${i < props.niveau ? ' remplie' : ''}`} />
        ))}
      </span>
      <span className="rapporte" title={props.rapporte?.titre}>
        {props.rapporte && (
          <>
            <Icone nom={props.rapporte.icone} titre={props.rapporte.titre} />
            <strong>{props.rapporte.valeur}</strong>
          </>
        )}
      </span>
      <span className="piste-texte">
        {props.prochain === null ? 'niveau maximum' : `prochain : ${props.prochain}`}
      </span>
      <span className="blasons">
        {Array.from({ length: props.blasons }, (_, i) => (
          <Icone key={i} nom={props.icone} titre={`Blason ${props.nom}`} />
        ))}
      </span>
    </div>
  );
}

function Jauges(props: { joueur: VueJoueur }) {
  const j = props.joueur;
  const { economie, population, noblesse } = MATERIEL.plateau;
  const b = blasons(j);
  const prochaineEconomie = economie[j.niveauEconomie + 1]?.cout;
  const prochainePopulation = population[j.niveauPopulation + 1]?.cout;
  const prochainErudits = noblesse[j.privileges.length]?.erudits;
  return (
    <div className="jauges">
      <div className="reserves">
        <span title="Or en réserve">
          <Icone nom="or" titre="Or" /> <strong>{j.or}</strong> Or
        </span>
        <span title="Cartes restantes dans la pioche">
          <Icone nom="pioche" titre="Pioche" /> <strong>{j.nbCartesPioche}</strong> en pioche
        </span>
        <span title="Toutes les cartes du deck : pioche, main, aire de jeu et défausse">
          <strong>{j.nbCartesPioche + j.nbCartesMain + j.aireDeJeu.length + j.defausse.length}</strong> cartes dans le
          deck
        </span>
      </div>
      <Piste
        nom="Économie"
        icone="economie"
        niveau={j.niveauEconomie}
        niveauMax={economie.length - 1}
        rapporte={{
          icone: 'or',
          valeur: economie[j.niveauEconomie]?.or ?? 0,
          titre: 'Or pris à chaque début de lignée',
        }}
        prochain={prochaineEconomie === undefined ? null : `${prochaineEconomie} Or`}
        blasons={b.economie}
      />
      <Piste
        nom="Population"
        icone="population"
        niveau={j.niveauPopulation}
        niveauMax={population.length - 1}
        rapporte={{
          icone: 'pioche',
          valeur: population[j.niveauPopulation]?.cartes ?? 0,
          titre: 'Cartes piochées à chaque début de lignée',
        }}
        prochain={prochainePopulation === undefined ? null : `${prochainePopulation} Ressource(s)`}
        blasons={b.population}
      />
      <Piste
        nom="Noblesse"
        icone="noblesse"
        niveau={j.privileges.length}
        niveauMax={noblesse.length}
        rapporte={null}
        prochain={prochainErudits === undefined ? null : `${prochainErudits} Érudit(s)`}
        blasons={b.noblesse}
      />
      <RessourcesEnJeu joueur={j} />
    </div>
  );
}

const RESSOURCES = [
  { type: 'pierre', nom: 'Pierre', lettre: 'P' },
  { type: 'metal', nom: 'Métal', lettre: 'M' },
  { type: 'erudit', nom: 'Érudit', lettre: 'E' },
] as const;

/** D'où vient une ressource, pour l'infobulle de son icône. */
function origine(ressource: OrigineRessource): string {
  if (ressource.carte === null) return `Privilège ${ressource.privilege}`;
  const nom = carte(ressource.carte).nom;
  return ressource.privilege === null ? nom : `${nom}, grâce au Privilège ${ressource.privilege}`;
}

/** Les ressources de l'aire de jeu, bonus des Privilèges compris : une icône par ressource. */
function RessourcesEnJeu(props: { joueur: VueJoueur }) {
  const detail = detailDesRessources(props.joueur);
  return (
    <div className="ressources" title="Ressources disponibles dans l'aire de jeu, bonus des Privilèges compris">
      <span className="piste-nom">Ressources</span>
      {RESSOURCES.map(({ type, nom, lettre }) => {
        const unites = detail.filter((ressource) => ressource.type === type);
        return (
          <span key={type} className="groupe-ressource">
            <strong>{unites.length}</strong> {nom}
            {unites.map((ressource, i) => (
              <span
                key={i}
                className={`ressource ${type}${ressource.privilege === null ? '' : ' bonus'}`}
                title={`${nom} : ${origine(ressource)}`}
              >
                {lettre}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function Zone(props: {
  titre: string;
  ids: string[];
  petite?: boolean;
  actionsParCarte: Map<string, Action[]>;
  onChoisir: ChoisirCarte;
  onSurvol: (id: string | null) => void;
}) {
  return (
    <div className="zone">
      <h4>
        {props.titre} ({props.ids.length})
      </h4>
      <div className="rangee">
        {props.ids.length === 0 && <span className="vide">—</span>}
        {props.ids.map((id) => (
          <ImageCarte
            key={id}
            id={id}
            petite={props.petite}
            actions={props.actionsParCarte.get(id)}
            onChoisir={props.onChoisir}
            onSurvol={props.onSurvol}
          />
        ))}
      </div>
    </div>
  );
}

function PanneauJoueur(props: {
  joueur: VueJoueur;
  vue: Vue;
  actionsParCarte: Map<string, Action[]>;
  onChoisir: ChoisirCarte;
  onSurvol: (id: string | null) => void;
}) {
  const { joueur, vue } = props;
  const moi = joueur.id === vue.moi;
  const commun = {
    actionsParCarte: moi ? props.actionsParCarte : new Map<string, Action[]>(),
    onChoisir: props.onChoisir,
    onSurvol: props.onSurvol,
  };
  return (
    <section className={`joueur couleur-${joueur.couleur}${moi ? ' moi' : ''}`}>
      <h3>
        {joueur.nom}
        {vue.joueurActif === joueur.id && ' — joueur actif'}
        {vue.premierJoueur === joueur.id && ' · premier joueur'}
      </h3>
      <Jauges joueur={joueur} />
      {joueur.privileges.length > 0 && (
        <div className="rangee">
          {joueur.privileges.map((numero) => (
            <Tuile key={numero} numero={numero} />
          ))}
        </div>
      )}
      {joueur.main ? (
        <Zone titre="Main" ids={joueur.main} {...commun} />
      ) : (
        <p className="main-cachee">Main : {joueur.nbCartesMain} carte(s) cachée(s)</p>
      )}
      <Zone titre="Aire de jeu" ids={joueur.aireDeJeu} petite={!moi} {...commun} />
      <Zone titre="Défausse" ids={joueur.defausse} petite {...commun} />
    </section>
  );
}

/** Qui tient un siège : un humain, ou l'un des bots de src/ai. */
type Siege = 'humain' | TypeDeBot;

/** Temps laissé entre deux actions d'une IA, pour qu'on puisse suivre ce qu'elle fait. */
const PAUSE_IA_MS = 900;

const SIEGES_PAR_DEFAUT: Siege[] = ['humain', 'entrainee', 'entrainee', 'entrainee'];

function creerPartie(sieges: Siege[], graine: number): Etat {
  return createGame(
    sieges.map((siege, i) => ({
      ...JOUEURS[i]!,
      nom: siege === 'humain' ? JOUEURS[i]!.nom : `${JOUEURS[i]!.nom} (IA)`,
    })),
    graine,
  );
}

export function App() {
  const [nombre, setNombre] = useState(2);
  const [graine, setGraine] = useState(1);
  /** Le réglage des sièges pour la prochaine partie. */
  const [sieges, setSieges] = useState<Siege[]>(SIEGES_PAR_DEFAUT);
  /** Qui tient chaque siège dans la partie en cours. */
  const [enJeu, setEnJeu] = useState<Siege[]>(() => SIEGES_PAR_DEFAUT.slice(0, 2));
  const [etats, setEtats] = useState<Etat[]>(() => [creerPartie(SIEGES_PAR_DEFAUT.slice(0, 2), 1)]);
  const [survol, setSurvol] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  /** La carte de la Rivière que le joueur est en train d'acheter, en attendant qu'il choisisse comment payer. */
  const [achat, setAchat] = useState<string | null>(null);

  const etat = etats[etats.length - 1]!;
  const estHumain = (joueur: number) => (enJeu[joueur] ?? 'humain') === 'humain';
  const decideur = etat.attente?.joueur ?? null;
  const iaEnTrainDeJouer = decideur !== null && !estHumain(decideur);

  // On regarde la partie avec les yeux de l'humain qui doit choisir. Pendant le tour d'une IA,
  // on reste sur le dernier humain qui a joué : la main des IA n'est jamais montrée.
  const dernierHumain = [...etat.historique].reverse().find((action) => estHumain(action.joueur))?.joueur;
  const premierHumain = etat.joueurs.find((joueur) => estHumain(joueur.id))?.id;
  const moi = decideur !== null && estHumain(decideur) ? decideur : (dernierHumain ?? premierHumain ?? 0);
  const vue = getPlayerView(etat, moi);
  const actions = getLegalActions(etat, moi);

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

  const actionsParCarte = new Map<string, Action[]>();
  for (const action of actions) {
    if ('carte' in action) {
      actionsParCarte.set(action.carte, [...(actionsParCarte.get(action.carte) ?? []), action]);
    }
  }

  /** Change l'état affiché, et oublie l'achat en cours de préparation. */
  const afficher = (suivants: Etat[]) => {
    setEtats(suivants);
    setAchat(null);
    setErreur(null);
  };
  const appliquer = (action: Action) => {
    try {
      afficher([...etats, applyAction(etat, action)]);
    } catch (e) {
      setErreur((e as Error).message);
    }
  };

  // Achat en deux temps : on choisit d'abord la carte, puis les cartes à défausser pour la payer.
  const achats = actions.filter((a) => a.type === 'acheter');
  const cartesAchetables = [...new Set(achats.map((a) => a.carte))];
  const paiementsPossibles = achats.filter((a) => a.carte === achat);
  const choisirAchat = (id: string) => {
    const possibles = achats.filter((a) => a.carte === id);
    const seul = possibles.length === 1 ? possibles[0]! : null;
    // Rien à défausser : on achète directement.
    if (seul && seul.paiement.length === 0) appliquer(seul);
    else setAchat(id);
  };

  // Un clic sur une carte applique son action quand il n'y en a qu'une ; sinon il faut passer par les boutons.
  const choisirCarte: ChoisirCarte = (id) => {
    const possibles = actionsParCarte.get(id) ?? [];
    if (possibles[0]?.type === 'acheter') choisirAchat(id);
    else if (possibles.length === 1) appliquer(possibles[0]!);
  };
  const nouvellePartie = () => {
    const choisis = sieges.slice(0, nombre);
    setEnJeu(choisis);
    afficher([creerPartie(choisis, graine)]);
  };

  const exporter = () => {
    const contenu = JSON.stringify(exporterPartie(etat), null, 2);
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(new Blob([contenu], { type: 'application/json' }));
    lien.download = `generations-graine${etat.graine}-${etat.historique.length}actions.json`;
    lien.click();
    URL.revokeObjectURL(lien.href);
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

  const privilegeAPrendre =(numero: number) =>
    actions.find((a) => a.type === 'prendrePrivilege' && a.numero === numero);
  const recherche = actions.filter((a) => a.type === 'rechercher');
  // Pendant le choix du paiement d'un achat, les cartes ne sont plus cliquables : on répond d'abord à la question.
  const zone = {
    actionsParCarte: paiementsPossibles.length > 0 ? new Map<string, Action[]>() : actionsParCarte,
    onChoisir: choisirCarte,
    onSurvol: setSurvol,
  };

  return (
    <div className="table">
      <header>
        <h1>Générations</h1>
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
        <label>
          Graine <input type="number" value={graine} onChange={(e) => setGraine(Number(e.target.value))} />
        </label>
        <button type="button" onClick={nouvellePartie}>
          Nouvelle partie
        </button>
        <button type="button" disabled={retour === -1} onClick={() => afficher(etats.slice(0, retour + 1))}>
          Annuler la dernière action
        </button>
        <button type="button" onClick={exporter} title="Enregistre la graine et toutes les actions, pour rejouer la partie à l'identique">
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
      </header>

      <main>
        <section className="commun">
          <Zone titre={`Rivière — ${vue.nbCartesPiocheCommune} carte(s) dans la pioche commune`} ids={vue.riviere} {...zone} />
          <div className="zone">
            <h4>Privilèges disponibles — {vue.nbPrivilegesPioche} dans la pioche</h4>
            <div className="rangee">
              {vue.privilegesVisibles.map((numero) => (
                <Tuile key={numero} numero={numero} action={privilegeAPrendre(numero)} onAction={appliquer} />
              ))}
            </div>
          </div>
          {vue.trash.length > 0 && (
            <details className="trash">
              <summary>Cartes trashées ({vue.trash.length}) — cliquer pour afficher ou masquer</summary>
              <div className="rangee">
                {vue.trash.map((id) => (
                  <ImageCarte key={id} id={id} petite onSurvol={setSurvol} />
                ))}
              </div>
            </details>
          )}
        </section>

        <section className="decision">
          {vue.vainqueur !== null ? (
            <p className="question victoire">{vue.joueurs[vue.vainqueur]?.nom} remporte la partie !</p>
          ) : paiementsPossibles.length > 0 ? (
            <p className="question">
              Achat de {carte(achat!).nom} : quelles cartes de ton aire de jeu veux-tu défausser pour payer ?
            </p>
          ) : iaEnTrainDeJouer ? (
            <p className="question ia">{etat.joueurs[decideur]?.nom} est en train de jouer…</p>
          ) : (
            <p className="question">{question(vue)}</p>
          )}
          {erreur && <p className="erreur">{erreur}</p>}
          {paiementsPossibles.length > 0 ? (
            <div className="boutons">
              {paiementsPossibles.map((action, i) => (
                <button type="button" key={i} onClick={() => appliquer(action)}>
                  {action.paiement.length > 0 ? `Défausser ${nomsDesCartes(action.paiement)}` : 'Ne rien défausser'}
                </button>
              ))}
              <button type="button" className="secondaire" onClick={() => setAchat(null)}>
                Annuler l'achat
              </button>
            </div>
          ) : (
            <div className="boutons">
              {actions
                .filter((action) => action.type !== 'acheter')
                .map((action, i) => (
                  <button type="button" key={i} onClick={() => appliquer(action)}>
                    {libelleAction(action, vue.attente)}
                  </button>
                ))}
              {cartesAchetables.map((id) => (
                <button type="button" key={id} onClick={() => choisirAchat(id)}>
                  Acheter {carte(id).nom}
                </button>
              ))}
            </div>
          )}
          {recherche.length > 0 && (
            <Zone titre="Cartes de ta pioche" ids={recherche.map((a) => a.carte)} petite {...zone} />
          )}
        </section>

        {[...vue.joueurs.slice(moi), ...vue.joueurs.slice(0, moi)].map((joueur) => (
          <PanneauJoueur key={joueur.id} joueur={joueur} vue={vue} {...zone} />
        ))}
      </main>

      <aside>
        {survol && (
          <div className="apercu">
            <img src={urlImage(carte(survol).image)} alt="" />
            <p>
              <strong>{carte(survol).nom}</strong>
              <br />
              {carte(survol).texteEffet}
              {carte(survol).texteEffetRouge && (
                <>
                  <br />
                  <em>Effet Rouge : {carte(survol).texteEffetRouge}</em>
                </>
              )}
            </p>
          </div>
        )}
        <h4>Journal</h4>
        <ol className="journal">
          {[...vue.journal].reverse().map((entree, i) => (
            <li key={vue.journal.length - i}>{entree.texte}</li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
