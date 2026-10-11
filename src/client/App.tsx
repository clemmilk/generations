import { useState } from 'react';
import type { Action } from '../game/actions.ts';
import { carte, privilege } from '../game/cartes.ts';
import { applyAction, createGame, getLegalActions, getPlayerView } from '../game/index.ts';
import type { Etat, Inscription, Vue, VueJoueur } from '../game/index.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { blasons } from '../game/ressources.ts';
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

function Jauges(props: { joueur: VueJoueur }) {
  const j = props.joueur;
  const { economie, population, noblesse } = MATERIEL.plateau;
  const b = blasons(j);
  const eco = economie[j.niveauEconomie];
  const pop = population[j.niveauPopulation];
  const prochainErudits = noblesse[j.privileges.length]?.erudits;
  return (
    <div className="jauges">
      <span title="Or en réserve">
        <Icone nom="or" titre="Or" /> <strong>{j.or}</strong>
      </span>
      <span title="Économie : Or reçu à chaque début de lignée">
        <Icone nom="economie" titre="Économie" /> niv. {j.niveauEconomie} · {eco?.or} Or/lignée · {b.economie} blason(s)
      </span>
      <span title="Population : cartes piochées à chaque début de lignée">
        <Icone nom="population" titre="Population" /> niv. {j.niveauPopulation} · {pop?.cartes} cartes/lignée ·{' '}
        {b.population} blason(s)
      </span>
      <span title="Noblesse : Privilèges possédés">
        <Icone nom="noblesse" titre="Noblesse" /> {j.privileges.length}/4 Privilèges · {b.noblesse} blason(s)
        {prochainErudits !== undefined && ` · prochain : ${prochainErudits} Érudit(s)`}
      </span>
      <span title="Cartes restantes dans la pioche">
        <Icone nom="pioche" titre="Pioche" /> <strong>{j.nbCartesPioche}</strong> en pioche
      </span>
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

export function App() {
  const [nombre, setNombre] = useState(2);
  const [graine, setGraine] = useState(1);
  const [etats, setEtats] = useState<Etat[]>(() => [createGame(JOUEURS.slice(0, 2), 1)]);
  const [survol, setSurvol] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const etat = etats[etats.length - 1]!;
  // On regarde la partie avec les yeux du joueur qui doit choisir.
  const moi = etat.attente?.joueur ?? etat.vainqueur ?? 0;
  const vue = getPlayerView(etat, moi);
  const actions = getLegalActions(etat, moi);

  const actionsParCarte = new Map<string, Action[]>();
  for (const action of actions) {
    if ('carte' in action) {
      actionsParCarte.set(action.carte, [...(actionsParCarte.get(action.carte) ?? []), action]);
    }
  }

  const appliquer = (action: Action) => {
    try {
      setEtats([...etats, applyAction(etat, action)]);
      setErreur(null);
    } catch (e) {
      setErreur((e as Error).message);
    }
  };
  // Un clic sur une carte applique son action quand il n'y en a qu'une ; sinon il faut passer par les boutons.
  const choisirCarte: ChoisirCarte = (id) => {
    const possibles = actionsParCarte.get(id) ?? [];
    if (possibles.length === 1) appliquer(possibles[0]!);
  };
  const nouvellePartie = () => {
    setEtats([createGame(JOUEURS.slice(0, nombre), graine)]);
    setErreur(null);
  };

  const privilegeAPrendre = (numero: number) =>
    actions.find((a) => a.type === 'prendrePrivilege' && a.numero === numero);
  const recherche = actions.filter((a) => a.type === 'rechercher');
  const zone = { actionsParCarte, onChoisir: choisirCarte, onSurvol: setSurvol };

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
        <label>
          Graine <input type="number" value={graine} onChange={(e) => setGraine(Number(e.target.value))} />
        </label>
        <button type="button" onClick={nouvellePartie}>
          Nouvelle partie
        </button>
        <button type="button" disabled={etats.length < 2} onClick={() => setEtats(etats.slice(0, -1))}>
          Annuler la dernière action
        </button>
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
          {vue.trash.length > 0 && <Zone titre="Cartes trashées" ids={vue.trash} petite {...zone} actionsParCarte={new Map()} />}
        </section>

        <section className="decision">
          {vue.vainqueur !== null ? (
            <p className="question victoire">{vue.joueurs[vue.vainqueur]?.nom} remporte la partie !</p>
          ) : (
            <p className="question">{question(vue)}</p>
          )}
          {erreur && <p className="erreur">{erreur}</p>}
          <div className="boutons">
            {actions.map((action, i) => (
              <button type="button" key={i} onClick={() => appliquer(action)}>
                {libelleAction(action, vue.attente)}
              </button>
            ))}
          </div>
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
