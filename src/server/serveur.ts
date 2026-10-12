import { randomInt } from 'node:crypto';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';
import type { Demandes } from './protocole.ts';
import {
  changerNombre,
  creerSalon,
  deconnecter,
  estVide,
  instantane,
  jouer,
  jouerIA,
  lancer,
  liberer,
  phase,
  reglerSiege,
  rejoindre,
  remplacerParIA,
  revanche,
  tourDUneIA,
} from './salon.ts';
import type { Salon } from './salon.ts';

// Le serveur multijoueur : il garde les salons en mémoire, applique les demandes des joueurs avec la
// logique de salon.ts, et envoie à chacun son propre instantané après chaque changement.

export interface OptionsDuServeur {
  port: number;
  /** Pause entre deux actions d'une IA, en millisecondes. */
  pauseIA?: number;
  /** Temps laissé à un joueur déconnecté pour revenir avant de libérer son siège (salon d'attente), en ms. */
  delaiDeRetour?: number;
  /** Adresse du site autorisé à se connecter (toutes par défaut, pour le développement). */
  origine?: string;
}

/** Les codes de salon évitent les caractères qui se confondent (0 et O, 1 et I…). */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const DUREE_DE_VIE = 6 * 60 * 60 * 1000;

export function demarrerServeur(options: OptionsDuServeur) {
  const http = createServer((_requete, reponse) => {
    reponse.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    reponse.end('Serveur Générations en marche.');
  });
  const io = new Server(http, { cors: { origin: options.origine ?? '*' } });

  const salons = new Map<string, Salon>();
  /** Pour chaque connexion : dans quel salon elle se trouve, et avec quel jeton. */
  const places = new Map<string, { code: string; jeton: string }>();
  const minuteries = new Map<string, NodeJS.Timeout>();

  function nouveauCode(): string {
    for (;;) {
      const code = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
      if (!salons.has(code)) return code;
    }
  }

  /** Envoie à chaque joueur connecté du salon son instantané personnel. */
  function diffuser(salon: Salon): void {
    salon.activite = Date.now();
    for (const [id, place] of places) {
      if (place.code === salon.code) io.to(id).emit('instantane', instantane(salon, place.jeton));
    }
    faireJouerLesIA(salon);
  }

  /** Tant que c'est à une IA de jouer, elle joue une action après une pause, puis on recommence. */
  function faireJouerLesIA(salon: Salon): void {
    if (minuteries.has(salon.code) || !tourDUneIA(salon)) return;
    minuteries.set(
      salon.code,
      setTimeout(() => {
        minuteries.delete(salon.code);
        if (!salons.has(salon.code)) return;
        try {
          if (jouerIA(salon)) diffuser(salon);
        } catch (erreur) {
          console.error(`Salon ${salon.code} : une IA a échoué.`, erreur);
        }
      }, options.pauseIA ?? 900),
    );
  }

  function supprimer(salon: Salon): void {
    clearTimeout(minuteries.get(salon.code));
    minuteries.delete(salon.code);
    salons.delete(salon.code);
  }

  /** Ce joueur a-t-il encore une connexion ouverte sur ce salon (un autre onglet, ou un retour) ? */
  function present(code: string, jeton: string): boolean {
    return [...places.values()].some((place) => place.code === code && place.jeton === jeton);
  }

  /** Le joueur est parti pour de bon : avant le lancement, son siège est libéré. */
  function partir(salon: Salon, jeton: string): void {
    if (!salons.has(salon.code) || present(salon.code, jeton)) return;
    liberer(salon, jeton);
    if (estVide(salon) && phase(salon) === 'attente') supprimer(salon);
    else diffuser(salon);
  }

  /**
   * Retire une connexion de son salon. « volontaire » : le joueur a demandé à quitter. Sinon c'est une
   * coupure (ou un rechargement de page) : on lui laisse un délai pour revenir avant de libérer son siège.
   */
  function quitter(socket: Socket, volontaire: boolean): void {
    const place = places.get(socket.id);
    if (!place) return;
    places.delete(socket.id);
    void socket.leave(place.code);
    const salon = salons.get(place.code);
    if (!salon || present(place.code, place.jeton)) return;
    if (volontaire) {
      partir(salon, place.jeton);
      return;
    }
    deconnecter(salon, place.jeton);
    diffuser(salon);
    setTimeout(() => partir(salon, place.jeton), options.delaiDeRetour ?? 20_000).unref();
  }

  io.on('connection', (socket) => {
    /** Branche une demande : les erreurs de règles sont renvoyées au joueur, en clair. */
    function ecouter<K extends keyof Demandes>(
      nom: K,
      traiter: (demande: Demandes[K], place: { code: string; jeton: string } | undefined) => Salon | void,
    ): void {
      socket.on(nom as string, (demande: Demandes[K]) => {
        try {
          const salon = traiter(demande ?? ({} as Demandes[K]), places.get(socket.id));
          if (salon) diffuser(salon);
        } catch (erreur) {
          socket.emit('erreur', (erreur as Error).message);
        }
      });
    }

    /** Le salon où se trouve cette connexion, et son jeton. */
    function ici(place: { code: string; jeton: string } | undefined): { salon: Salon; jeton: string } {
      const salon = place && salons.get(place.code);
      if (!place || !salon) throw new Error('Tu n\'es dans aucun salon.');
      return { salon, jeton: place.jeton };
    }

    function installer(salon: Salon, jeton: string): Salon {
      const avant = places.get(socket.id);
      // Changer de salon, c'est quitter le précédent. Redemander le même salon ne change rien.
      if (avant && (avant.code !== salon.code || avant.jeton !== jeton)) quitter(socket, true);
      places.set(socket.id, { code: salon.code, jeton });
      void socket.join(salon.code);
      return salon;
    }

    ecouter('creer', ({ jeton, pseudo, nombre }) => {
      if (typeof jeton !== 'string' || jeton.length < 8) throw new Error('Identifiant de joueur invalide.');
      const salon = creerSalon(nouveauCode(), jeton, String(pseudo ?? ''), Number(nombre));
      salons.set(salon.code, salon);
      return installer(salon, jeton);
    });

    ecouter('rejoindre', ({ code, jeton, pseudo }) => {
      if (typeof jeton !== 'string' || jeton.length < 8) throw new Error('Identifiant de joueur invalide.');
      const salon = salons.get(String(code ?? '').trim().toUpperCase());
      if (!salon) throw new Error('Ce salon n\'existe pas ou a été fermé.');
      rejoindre(salon, jeton, String(pseudo ?? ''));
      return installer(salon, jeton);
    });

    ecouter('nombre', ({ nombre }, place) => {
      const { salon, jeton } = ici(place);
      changerNombre(salon, jeton, Number(nombre));
      return salon;
    });

    ecouter('siege', ({ siege, type }, place) => {
      const { salon, jeton } = ici(place);
      reglerSiege(salon, jeton, Number(siege), type);
      return salon;
    });

    ecouter('lancer', (_demande, place) => {
      const { salon, jeton } = ici(place);
      lancer(salon, jeton, randomInt(1, 2 ** 31 - 1));
      return salon;
    });

    ecouter('action', ({ action }, place) => {
      const { salon, jeton } = ici(place);
      jouer(salon, jeton, action);
      return salon;
    });

    ecouter('remplacer', ({ siege, type }, place) => {
      const { salon, jeton } = ici(place);
      remplacerParIA(salon, jeton, Number(siege), type);
      return salon;
    });

    ecouter('revanche', (_demande, place) => {
      const { salon, jeton } = ici(place);
      revanche(salon, jeton);
      return salon;
    });

    ecouter('quitter', () => quitter(socket, true));
    socket.on('disconnect', () => quitter(socket, false));
  });

  // Ménage : les salons sans activité depuis longtemps sont supprimés.
  const menage = setInterval(() => {
    for (const salon of salons.values()) {
      if (Date.now() - salon.activite > DUREE_DE_VIE) supprimer(salon);
    }
  }, 10 * 60 * 1000);
  menage.unref();

  http.listen(options.port);

  return {
    /** Arrête le serveur et toutes les parties en cours. */
    async fermer(): Promise<void> {
      clearInterval(menage);
      for (const minuterie of minuteries.values()) clearTimeout(minuterie);
      await io.close();
    },
    /** Le nombre de salons ouverts. */
    nombreDeSalons: () => salons.size,
  };
}
