import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import type { Action } from '../game/actions.ts';
import { carte, nomsDesCartes, privilege } from '../game/cartes.ts';
import type { Vue, VueJoueur } from '../game/index.ts';
import { gainsDeLignee } from '../game/lignee.ts';
import { MATERIEL } from '../game/materiel/index.ts';
import { coutEnOrDuNiveau } from '../game/moteur.ts';
import { PARAMETRES } from '../game/parametres.ts';
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
  /** Carte sélectionnée (par exemple pour renouveler la Rivière). */
  choisie?: boolean;
  /** Texte au survol, à la place de la liste des actions possibles. */
  titre?: string;
}) {
  const c = carte(props.id);
  const cliquable = (props.actions?.length ?? 0) > 0;
  return (
    <button
      type="button"
      className={`carte${props.petite ? ' petite' : ''}${cliquable ? ' cliquable' : ''}${props.choisie ? ' choisie' : ''}`}
      disabled={!cliquable}
      title={props.titre ?? (cliquable ? props.actions!.map((a) => libelleAction(a, null)).join(' / ') : c.nom)}
      onClick={() => props.onChoisir?.(props.id)}
      onMouseEnter={() => props.onSurvol(props.id)}
      onMouseLeave={() => props.onSurvol(null)}
    >
      <span className="nom-carte">{c.nom}</span>
      <img src={urlImage(c.image)} alt={c.nom} onError={(e) => (e.currentTarget.style.display = 'none')} />
    </button>
  );
}

/** Ce que dit une carte : son nom, son effet et son Effet Rouge. */
function TexteCarte(props: { id: string }) {
  const c = carte(props.id);
  return (
    <p>
      <strong>{c.nom}</strong>
      <br />
      {c.texteEffet}
      {c.texteEffetRouge && (
        <>
          <br />
          <em>Effet Rouge : {c.texteEffetRouge}</em>
        </>
      )}
    </p>
  );
}

/** Une carte montrée depuis le journal, et l'endroit de l'écran où on l'a pointée. */
interface CarteDuJournal {
  id: string;
  x: number;
  y: number;
  /** Ouverte d'un toucher (tablette) : elle reste affichée jusqu'au toucher suivant. */
  touchee: boolean;
}

/**
 * Une ligne du journal, où les noms des cartes citées sont soulignés en pointillé.
 * On cherche chaque carte citée dans l'ordre, après le nom du joueur (qui pourrait ressembler à un nom de carte).
 */
function LigneDuJournal(props: {
  texte: string;
  cartes: string[];
  nomDuJoueur: string | null;
  onMontrer: (carte: CarteDuJournal | null) => void;
}) {
  const morceaux: ReactNode[] = [];
  let position = props.nomDuJoueur && props.texte.startsWith(props.nomDuJoueur) ? props.nomDuJoueur.length : 0;
  let debut = 0;
  props.cartes.forEach((id, i) => {
    const nom = carte(id).nom;
    const trouve = props.texte.indexOf(nom, position);
    if (trouve === -1) return;
    morceaux.push(props.texte.slice(debut, trouve));
    morceaux.push(
      <span
        key={i}
        className="carte-du-journal"
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') props.onMontrer({ id, x: e.clientX, y: e.clientY, touchee: false });
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') props.onMontrer(null);
        }}
        onClick={(e) => {
          // Sur tablette, pas de survol : on touche le nom pour voir la carte.
          e.stopPropagation();
          props.onMontrer({ id, x: e.clientX, y: e.clientY, touchee: true });
        }}
      >
        {nom}
      </span>,
    );
    position = trouve + nom.length;
    debut = position;
  });
  morceaux.push(props.texte.slice(debut));
  return <>{morceaux}</>;
}

/** La carte pointée dans le journal, dans une bulle à côté du pointeur, qui ne déplace rien à l'écran. */
function BulleCarte(props: { carte: CarteDuJournal; onFermer: () => void }) {
  const { id, x, y, touchee } = props.carte;
  // Après un toucher, le toucher suivant n'importe où ferme la bulle.
  useEffect(() => {
    if (!touchee) return;
    const fermer = () => props.onFermer();
    document.addEventListener('pointerdown', fermer);
    return () => document.removeEventListener('pointerdown', fermer);
  }, [touchee, props.onFermer]);
  const largeur = 220;
  const hauteur = 420;
  const marge = 12;
  // À gauche du pointeur s'il est dans la moitié droite de l'écran (le journal), sinon à droite.
  const gauche =
    x > window.innerWidth / 2 ? Math.max(marge, x - largeur - marge) : Math.min(x + marge, window.innerWidth - largeur - marge);
  const haut = Math.max(marge, Math.min(y - hauteur / 3, window.innerHeight - hauteur - marge));
  // Affichée directement dans la page, hors de la colonne du journal : sinon elle passerait sous le cadre
  // de la question en cours, qui reste collé en haut de l'écran.
  return createPortal(
    <div className="apercu bulle-carte" style={{ left: gauche, top: haut, width: largeur }}>
      <img src={urlImage(carte(id).image)} alt="" />
      <TexteCarte id={id} />
    </div>,
    document.body,
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
  return <img className="icone" src={urlImage(`${MATERIEL.plateau.icones}/icone_${props.nom}.png`)} alt={props.titre} title={props.titre} />;
}

/** Une piste du plateau : des cases remplies jusqu'au niveau atteint, ce qu'elle rapporte, le coût suivant, les blasons. */
function Piste(props: {
  nom: string;
  icone: string;
  niveau: number;
  niveauMax: number;
  /** Ce que la piste donne à chaque début de lignée : une icône et un nombre. null si elle ne donne rien. */
  rapporte: { icone: string; valeur: number | string; titre: string } | null;
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

/** Le coût du prochain niveau d'une jauge, avec son unité lue dans le plateau (Or ou Ressources). Privilège 7 compris. */
function texteCoutJauge(
  joueur: VueJoueur,
  piste: 'economie' | 'population',
  niveau: { cout: number; paiement: 'or' | 'ressources' },
): string {
  return niveau.paiement === 'or' ? `${coutEnOrDuNiveau(joueur, piste, niveau.cout)} Or` : `${niveau.cout} Ressource(s)`;
}

/** Ce que la jauge de Population fait prendre à chaque début de lignée : « 3 », ou « 3 + 1 » avec une carte révélée. */
function cartesDeLaJauge(niveau: { cartes: number; revele: number } | undefined): string {
  if (!niveau) return '0';
  return niveau.revele > 0 ? `${niveau.cartes} + ${niveau.revele}` : String(niveau.cartes);
}

function Jauges(props: { joueur: VueJoueur }) {
  const j = props.joueur;
  const { economie, population, noblesse } = MATERIEL.plateau;
  const b = blasons(j);
  const prochaineEconomie = economie[j.niveauEconomie + 1];
  const prochainePopulation = population[j.niveauPopulation + 1];
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
        prochain={prochaineEconomie === undefined ? null : texteCoutJauge(j, 'economie', prochaineEconomie)}
        blasons={b.economie}
      />
      <Piste
        nom="Population"
        icone="population"
        niveau={j.niveauPopulation}
        niveauMax={population.length - 1}
        rapporte={{
          icone: 'pioche',
          valeur: cartesDeLaJauge(population[j.niveauPopulation]),
          titre: 'Cartes piochées (+ cartes révélées) à chaque début de lignée',
        }}
        prochain={prochainePopulation === undefined ? null : texteCoutJauge(j, 'population', prochainePopulation)}
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
      {detail.length === 0 && <span className="vide">—</span>}
      {RESSOURCES.map(({ type, nom }) => {
        const unites = detail.filter((ressource) => ressource.type === type);
        if (unites.length === 0) return null;
        // Une icône par ressource, regroupées par type : ni chiffre ni nom.
        return (
          <span key={type} className="groupe-ressource" title={`${unites.length} ${nom}`}>
            {unites.map((ressource, i) => (
              <img
                key={i}
                className={ressource.privilege === null ? 'ressource' : 'ressource bonus'}
                src={urlImage(`${MATERIEL.plateau.icones}/icone_${type}.png`)}
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
  choisies?: string[];
  /** Texte au survol de chaque carte, à la place de la liste de ses actions. */
  titreCarte?: (id: string) => string;
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
            choisie={props.choisies?.includes(id)}
            titre={props.titreCarte?.(id)}
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

/** L'Or que ce joueur reçoit à chaque début de lignée, en détaillant la part de ses Privilèges. */
function orParLignee(joueur: VueJoueur): string {
  const gains = gainsDeLignee(joueur);
  if (gains.orDesPrivileges === 0) return String(gains.orDeLaJauge);
  return `${gains.orDeLaJauge + gains.orDesPrivileges} (${gains.orDeLaJauge} + ${gains.orDesPrivileges} par Privilège)`;
}

/** Les cartes que ce joueur prend à chaque début de lignée, en détaillant l'effet de ses Privilèges. */
function cartesParLignee(joueur: VueJoueur): string {
  const gains = gainsDeLignee(joueur);
  const details: string[] = [];
  if (gains.cartesChoisies > 0) details.push(`${gains.cartesChoisies} au choix`);
  if (gains.cartesPiocheesPuisDefaussees > 0) {
    details.push(`${gains.cartesPiocheesPuisDefaussees} piochée puis défaussée`);
  }
  if (gains.cartesRevelees > 0) details.push(`${gains.cartesRevelees} révélée(s)`);
  if (details.length === 0) return String(gains.cartesPiochees);
  return `${gains.cartesPiochees} piochées + ${details.join(' + ')}`;
}

/** Ce que chaque joueur a fait pendant la partie. Replié en cours de partie, ouvert à la fin. */
/** En fin de partie : le deck complet du vainqueur, rangé par origine des cartes. */
function DeckDuVainqueur(props: { vue: Vue; onSurvol: (id: string | null) => void }) {
  const deck = props.vue.deckDuVainqueur;
  const vainqueur = props.vue.vainqueur === null ? undefined : props.vue.joueurs[props.vue.vainqueur];
  if (!deck || !vainqueur) return null;
  const groupes = [
    { titre: 'Cartes de départ', origine: 'depart' },
    { titre: 'Domaines', origine: 'asymetrie' },
    { titre: 'Cartes Avancée', origine: 'avancee' },
  ] as const;
  return (
    <details className="deck-vainqueur">
      <summary>
        Voir le deck de {vainqueur.nom} ({deck.length} carte{deck.length > 1 ? 's' : ''})
      </summary>
      {groupes.map(({ titre, origine }) => {
        const cartes = deck
          .filter((id) => carte(id).origine === origine)
          .sort((a, b) => carte(a).nom.localeCompare(carte(b).nom, 'fr'));
        if (cartes.length === 0) return null;
        return (
          <div key={origine}>
            <h4>
              {titre} ({cartes.length})
            </h4>
            <div className="rangee">
              {cartes.map((id) => (
                <ImageCarte key={id} id={id} petite onSurvol={props.onSurvol} />
              ))}
            </div>
          </div>
        );
      })}
    </details>
  );
}

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
    ['Rivière renouvelée', (j) => j.statistiques.renouvellementsRiviere ?? 0],
    ['Privilèges', (j) => j.privileges.length],
    ['Niveau d\'Économie', (j) => j.niveauEconomie],
    ['Or à chaque début de lignée', orParLignee],
    ['Niveau de Population', (j) => j.niveauPopulation],
    ['Cartes à chaque début de lignée', cartesParLignee],
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
  /** La carte montrée depuis le journal (survol ou toucher de son nom). */
  const [carteDuJournal, setCarteDuJournal] = useState<CarteDuJournal | null>(null);
  const fermerCarteDuJournal = useCallback(() => setCarteDuJournal(null), []);
  /** La carte de la Rivière que le joueur est en train d'acheter, en attendant qu'il choisisse comment payer. */
  const [achat, setAchat] = useState<string | null>(null);
  /** Renouvellement de la Rivière en cours : les cartes de la Rivière déjà choisies (null hors renouvellement). */
  const [renouvellement, setRenouvellement] = useState<string[] | null>(null);

  const actionsParCarte = new Map<string, Action[]>();
  for (const action of actions) {
    if ('carte' in action) {
      actionsParCarte.set(action.carte, [...(actionsParCarte.get(action.carte) ?? []), action]);
    }
  }

  const appliquer = (action: Action) => {
    setAchat(null);
    setRenouvellement(null);
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

  // Renouveler la Rivière : le joueur choisit les cartes une à une, puis valide quand il en a assez.
  const renouvellements = actions.filter((a) => a.type === 'renouvelerRiviere');
  const nombreARenouveler = renouvellements[0]?.cartes.length ?? 0;
  const renouvellementChoisi =
    renouvellement && renouvellement.length === nombreARenouveler
      ? renouvellements.find((a) => a.cartes.every((id) => renouvellement.includes(id)))
      : undefined;
  const zoneRiviere = renouvellement
    ? {
        actionsParCarte: new Map(vue.riviere.map((id) => [id, renouvellements] as [string, Action[]])),
        onChoisir: (id: string) =>
          setRenouvellement((choisies) =>
            choisies?.includes(id)
              ? choisies.filter((x) => x !== id)
              : (choisies ?? []).length < nombreARenouveler
                ? [...(choisies ?? []), id]
                : choisies,
          ),
        onSurvol: setSurvol,
        choisies: renouvellement,
        titreCarte: (id: string) => `${renouvellement.includes(id) ? 'Retirer' : 'Choisir'} ${carte(id).nom}`,
      }
    : null;

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
          <Zone
            titre={`Rivière — ${vue.nbCartesPiocheCommune} carte(s) dans la pioche commune`}
            ids={vue.riviere}
            {...(zoneRiviere ?? zone)}
          />
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
            <>
              <p className="question victoire">{vue.joueurs[vue.vainqueur]?.nom} remporte la partie !</p>
              <DeckDuVainqueur vue={vue} onSurvol={setSurvol} />
            </>
          ) : renouvellement ? (
            <p className="question">
              Renouveler la Rivière ({PARAMETRES.renouvellementRiviere.cout} Or) : clique sur les {nombreARenouveler} cartes
              à remplacer ({renouvellement.length}/{nombreARenouveler} choisie(s)). Elles iront sous la pioche commune.
            </p>
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
          {renouvellement ? (
            <div className="boutons">
              <button type="button" disabled={!renouvellementChoisi} onClick={() => renouvellementChoisi && appliquer(renouvellementChoisi)}>
                Remplacer {renouvellement.length > 0 ? nomsDesCartes(renouvellement) : 'ces cartes'}
              </button>
              <button type="button" className="secondaire" onClick={() => setRenouvellement(null)}>
                Annuler
              </button>
            </div>
          ) : paiementsPossibles.length > 0 ? (
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
              {renouvellements.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    // Toute la Rivière (décision MMM) : il n'y a rien à choisir.
                    nombreARenouveler >= vue.riviere.length && renouvellements.length === 1
                      ? appliquer(renouvellements[0]!)
                      : setRenouvellement([])
                  }
                >
                  {nombreARenouveler >= vue.riviere.length ? 'Renouveler toute la Rivière' : 'Renouveler la Rivière'} (
                  {PARAMETRES.renouvellementRiviere.cout} Or)
                </button>
              )}
              {actions
                .filter((action) => action.type !== 'acheter' && action.type !== 'renouvelerRiviere')
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
            <TexteCarte id={survol} />
          </div>
        )}
        <h4>Journal</h4>
        <ol className="journal">
          {[...vue.journal].reverse().map((entree, i) => (
            <li key={vue.journal.length - i}>
              <LigneDuJournal
                texte={entree.texte}
                cartes={entree.cartes ?? []}
                nomDuJoueur={entree.joueur === null ? null : (vue.joueurs[entree.joueur]?.nom ?? null)}
                onMontrer={setCarteDuJournal}
              />
            </li>
          ))}
        </ol>
        {carteDuJournal && <BulleCarte carte={carteDuJournal} onFermer={fermerCarteDuJournal} />}
      </aside>
    </div>
  );
}