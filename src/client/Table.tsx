import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Action } from '../game/actions.ts';
import { carte, nomsDesCartes, privilege } from '../game/cartes.ts';
import type { Vue, VueJoueur } from '../game/index.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { blasons, detailDesRessources } from '../game/ressources.ts';
import type { OrigineRessource } from '../game/ressources.ts';
import { libelleAction, question, urlImage } from './libelles.ts';

// L'écran de jeu, commun à la partie locale et à la partie en ligne.
// Il n'applique aucune règle : il affiche une vue et propose les actions qu'on lui donne.

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
  { type: 'pierre', nom: 'Pierre' },
  { type: 'metal', nom: 'Métal' },
  { type: 'erudit', nom: 'Érudit' },
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
      {RESSOURCES.map(({ type, nom }) => {
        const unites = detail.filter((ressource) => ressource.type === type);
        return (
          <span key={type} className="groupe-ressource">
            <strong>{unites.length}</strong> {nom}
            {unites.map((ressource, i) => (
              <img
                key={i}
                className={ressource.privilege === null ? 'ressource' : 'ressource bonus'}
                src={`/plateau/icone_${type}.png`}
                alt={nom}
                title={`${nom} : ${origine(ressource)}`}
              />
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

/** Ce que chaque joueur a fait pendant la partie. Replié en cours de partie, ouvert à la fin. */
function TableauDesStatistiques(props: { vue: Vue }) {
  const { vue } = props;
  const lignes: [string, (joueur: VueJoueur) => string | number][] = [
    ['Résultat', (j) => (vue.vainqueur === j.id ? 'Vainqueur' : '—')],
    ['Tours joués', (j) => j.statistiques.tours],
    ['Tours de table (sans les Rejouer)', (j) => j.statistiques.tours - j.statistiques.toursRejoues],
    ['Lignées', (j) => j.statistiques.lignees],
    ['Tours par lignée', (j) => (j.statistiques.tours / Math.max(1, j.statistiques.lignees)).toFixed(1)],
    ['Cartes jouées', (j) => j.statistiques.cartesJouees],
    ['Cartes achetées', (j) => j.statistiques.cartesAchetees],
    ['Cartes trashées', (j) => j.statistiques.cartesTrashees],
    ['Pioches supplémentaires', (j) => j.statistiques.piochesSupplementaires],
    ['Effets Rouges choisis', (j) => j.statistiques.effetsRougesChoisis],
    ['Effets Rouges automatiques', (j) => j.statistiques.effetsRougesAutomatiques],
    ['Privilèges', (j) => j.privileges.length],
    ['Niveau d\'Économie', (j) => j.niveauEconomie],
    ['Niveau de Population', (j) => j.niveauPopulation],
    [
      'Cartes dans le deck',
      (j) => j.nbCartesPioche + j.nbCartesMain + j.aireDeJeu.length + j.defausse.length,
    ],
  ];
  return (
    // La clé change à la fin de la partie : le tableau s'ouvre alors tout seul.
    <details className="statistiques" key={String(vue.vainqueur !== null)} open={vue.vainqueur !== null}>
      <summary>Statistiques de la partie</summary>
      <table>
        <thead>
          <tr>
            <th />
            {vue.joueurs.map((joueur) => (
              <th key={joueur.id} className={`couleur-${joueur.couleur}`}>
                {joueur.nom}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map(([titre, valeur]) => (
            <tr key={titre}>
              <th>{titre}</th>
              {vue.joueurs.map((joueur) => (
                <td key={joueur.id}>{valeur(joueur)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">
        Pioches supplémentaires : cartes piochées ou recherchées grâce à un effet ou un Privilège, hors pioche de début
        de lignée. Effets Rouges choisis : le joueur a payé ou fait un choix pour en profiter. Effets Rouges automatiques :
        reçus sans rien faire, comme un gain d'Or. Chaque carte adverse compte 1 fois au plus.
      </p>
    </details>
  );
}

/**
 * L'écran de jeu complet : la Rivière, les Privilèges, la question en cours, les joueurs et le journal.
 * Il reçoit la vue d'un joueur et ses actions permises, et prévient quand le joueur en choisit une.
 */
export function Table(props: {
  vue: Vue;
  actions: Action[];
  onAction: (action: Action) => void;
  /** Le contenu de la barre du haut (réglages de la partie locale, ou état du salon en ligne). */
  entete: ReactNode;
  /** Message affiché à la place de la question quand ce n'est pas à ce joueur de choisir. */
  enAttenteDe: string | null;
  erreur: string | null;
}) {
  const { vue, actions } = props;
  const [survol, setSurvol] = useState<string | null>(null);
  /** La carte de la Rivière que le joueur est en train d'acheter, en attendant qu'il choisisse comment payer. */
  const [achat, setAchat] = useState<string | null>(null);

  const actionsParCarte = new Map<string, Action[]>();
  for (const action of actions) {
    if ('carte' in action) {
      actionsParCarte.set(action.carte, [...(actionsParCarte.get(action.carte) ?? []), action]);
    }
  }

  const appliquer = (action: Action) => {
    setAchat(null);
    props.onAction(action);
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

  const privilegeAPrendre = (numero: number) =>
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
      <header>{props.entete}</header>

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
          ) : props.enAttenteDe !== null ? (
            <p className="question ia">{props.enAttenteDe}</p>
          ) : (
            <p className="question">{question(vue)}</p>
          )}
          {props.erreur && <p className="erreur">{props.erreur}</p>}
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

        <TableauDesStatistiques vue={vue} />

        {[...vue.joueurs.slice(vue.moi), ...vue.joueurs.slice(0, vue.moi)].map((joueur) => (
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