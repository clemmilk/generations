import { afterEach, describe, expect, it } from 'vitest';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { Instantane } from '../../src/server/protocole.ts';
import { demarrerServeur } from '../../src/server/serveur.ts';

// Tests de bout en bout : un vrai serveur, de vraies connexions, sur un port local.

let prochainPort = 4100;
const aFermer: (() => unknown)[] = [];

afterEach(async () => {
  for (const fermer of aFermer.splice(0).reverse()) await fermer();
});

function serveur(options: { pauseIA?: number; delaiDeRetour?: number } = {}) {
  const port = prochainPort++;
  const lance = demarrerServeur({ port, pauseIA: 0, delaiDeRetour: 60, ...options });
  aFermer.push(() => lance.fermer());
  return { port, lance };
}

/** Un joueur connecté, qui garde le dernier instantané et la dernière erreur reçus. */
function joueur(port: number, jeton: string) {
  const socket: Socket = io(`http://localhost:${port}`, { forceNew: true });
  aFermer.push(() => socket.disconnect());
  const moi = {
    socket,
    jeton,
    dernier: null as Instantane | null,
    /** Nombre d'instantanés reçus depuis la connexion. */
    recus: 0,
    erreur: null as string | null,
    /** Attend un instantané qui remplit la condition. */
    attendre(condition: (i: Instantane) => boolean): Promise<Instantane> {
      return new Promise((resoudre, rejeter) => {
        const delai = setTimeout(() => rejeter(new Error(`Rien reçu pour ${jeton}`)), 4000);
        const verifier = () => {
          if (moi.dernier && condition(moi.dernier)) {
            clearTimeout(delai);
            socket.off('instantane', verifier);
            resoudre(moi.dernier);
          }
        };
        socket.on('instantane', verifier);
        verifier();
      });
    },
    attendreErreur(): Promise<string> {
      return new Promise((resoudre) => socket.once('erreur', resoudre));
    },
  };
  socket.on('instantane', (instantane: Instantane) => {
    moi.dernier = instantane;
    moi.recus++;
  });
  socket.on('erreur', (message: string) => (moi.erreur = message));
  return moi;
}

describe('serveur multijoueur', () => {
  it('crée un salon, y accueille un second joueur et lance la partie', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-1');
    const bob = joueur(port, 'jeton-bob-1');

    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    const salon = await alice.attendre((i) => i.phase === 'attente');
    expect(salon.code).toMatch(/^[A-Z2-9]{6}$/);

    bob.socket.emit('rejoindre', { code: salon.code.toLowerCase(), jeton: bob.jeton, pseudo: 'Bob' });
    await alice.attendre((i) => i.sieges[1]!.type === 'humain');
    expect((await bob.attendre((i) => i.monSiege === 1)).sieges.map((s) => s.nom)).toEqual(['Alice', 'Bob']);

    alice.socket.emit('lancer', {});
    const vueAlice = await alice.attendre((i) => i.phase === 'jeu');
    const vueBob = await bob.attendre((i) => i.phase === 'jeu');
    expect(vueAlice.vue!.moi).toBe(0);
    expect(vueBob.vue!.moi).toBe(1);
    expect(vueAlice.vue!.joueurs[1]!.main).toBeNull();
    expect(vueBob.vue!.joueurs[0]!.main).toBeNull();
    // Un seul des deux a la main.
    expect(vueAlice.actions.length > 0).not.toBe(vueBob.actions.length > 0);
  });

  it('applique une action et prévient tous les joueurs', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-2');
    const bob = joueur(port, 'jeton-bob-2');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    const { code } = await alice.attendre((i) => i.phase === 'attente');
    bob.socket.emit('rejoindre', { code, jeton: bob.jeton, pseudo: 'Bob' });
    await alice.attendre((i) => i.sieges[1]!.type === 'humain');
    alice.socket.emit('lancer', {});
    await alice.attendre((i) => i.phase === 'jeu');
    await bob.attendre((i) => i.phase === 'jeu');

    const actif = alice.dernier!.actions.length > 0 ? alice : bob;
    const passif = actif === alice ? bob : alice;
    const journalAvant = passif.dernier!.vue!.journal.length;
    actif.socket.emit('action', { action: actif.dernier!.actions[0] });
    const apres = await passif.attendre((i) => i.vue!.journal.length > journalAvant);
    expect(apres.vue!.journal.length).toBeGreaterThan(journalAvant);
  });

  it('renvoie une erreur lisible pour une action illégale, sans toucher à la partie', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-3');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    await alice.attendre((i) => i.phase === 'attente');
    const erreur = alice.attendreErreur();
    alice.socket.emit('lancer', {});
    expect(await erreur).toMatch(/sièges libres/);

    const autre = alice.attendreErreur();
    alice.socket.emit('rejoindre', { code: 'ZZZZZZ', jeton: alice.jeton, pseudo: 'Alice' });
    expect(await autre).toMatch(/n'existe pas/);
  });

  it('fait jouer les IA toutes seules, jusqu\'à rendre la main au joueur', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-4');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 3 });
    await alice.attendre((i) => i.phase === 'attente');
    alice.socket.emit('siege', { siege: 1, type: 'entrainee' });
    alice.socket.emit('siege', { siege: 2, type: 'entrainee' });
    await alice.attendre((i) => i.sieges[2]!.type === 'entrainee');
    alice.socket.emit('lancer', {});
    // Que les IA commencent ou non, la main finit par revenir à Alice.
    let vu = await alice.attendre((i) => i.phase === 'jeu' && i.actions.length > 0);
    // Alice joue son premier choix chaque fois qu'on lui rend la main, jusqu'à ce que les deux IA aient joué un tour.
    const lesIAOntJoue = (i: Instantane) => i.vue!.joueurs.filter((j) => j.id !== 0).every((j) => j.statistiques.tours > 0);
    for (let coup = 0; coup < 30 && !lesIAOntJoue(vu); coup++) {
      // Une action ne laisse pas toujours de trace dans le journal : on attend simplement la réponse suivante.
      const recus = alice.recus;
      alice.socket.emit('action', { action: vu.actions[0] });
      vu = await alice.attendre((i) => alice.recus > recus && (i.actions.length > 0 || i.phase === 'finie'));
      if (vu.phase === 'finie') break;
    }
    expect(vu.phase === 'finie' || lesIAOntJoue(vu)).toBe(true);
  });

  it('garde le siège d\'un joueur qui recharge sa page, y compris en cours de partie', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-5');
    const bob = joueur(port, 'jeton-bob-5');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    const { code } = await alice.attendre((i) => i.phase === 'attente');
    bob.socket.emit('rejoindre', { code, jeton: bob.jeton, pseudo: 'Bob' });
    await alice.attendre((i) => i.sieges[1]!.type === 'humain');
    alice.socket.emit('lancer', {});
    await bob.attendre((i) => i.phase === 'jeu');
    const mainDeBob = bob.dernier!.vue!.joueurs[1]!.main;

    // Bob ferme son onglet : Alice le voit déconnecté, mais son siège reste le sien.
    bob.socket.disconnect();
    await alice.attendre((i) => i.sieges[1]!.connecte === false);
    expect(alice.dernier!.sieges[1]!.type).toBe('humain');

    // Bob revient avec le même jeton, depuis une nouvelle connexion.
    const bobRevenu = joueur(port, bob.jeton);
    bobRevenu.socket.emit('rejoindre', { code, jeton: bob.jeton, pseudo: 'Bob' });
    const vu = await bobRevenu.attendre((i) => i.phase === 'jeu');
    expect(vu.monSiege).toBe(1);
    expect(vu.vue!.joueurs[1]!.main).toEqual(mainDeBob);
    await alice.attendre((i) => i.sieges[1]!.connecte === true);
  });

  it('libère le siège d\'un joueur qui ne revient pas dans le salon d\'attente, après un délai', async () => {
    const { port } = serveur({ delaiDeRetour: 80 });
    const alice = joueur(port, 'jeton-alice-6');
    const bob = joueur(port, 'jeton-bob-6');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    const { code } = await alice.attendre((i) => i.phase === 'attente');
    bob.socket.emit('rejoindre', { code, jeton: bob.jeton, pseudo: 'Bob' });
    await alice.attendre((i) => i.sieges[1]!.type === 'humain');

    bob.socket.disconnect();
    // D'abord déconnecté mais toujours assis…
    await alice.attendre((i) => i.sieges[1]!.type === 'humain' && !i.sieges[1]!.connecte);
    // … puis son siège est libéré.
    await alice.attendre((i) => i.sieges[1]!.type === 'libre');
  });

  it('supprime un salon d\'attente quand tout le monde est parti', async () => {
    const { port, lance } = serveur({ delaiDeRetour: 50 });
    const alice = joueur(port, 'jeton-alice-7');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    await alice.attendre((i) => i.phase === 'attente');
    expect(lance.nombreDeSalons()).toBe(1);
    alice.socket.disconnect();
    await new Promise((r) => setTimeout(r, 250));
    expect(lance.nombreDeSalons()).toBe(0);
  });

  it('n\'envoie jamais le jeton d\'un joueur aux autres', async () => {
    const { port } = serveur();
    const alice = joueur(port, 'jeton-alice-8');
    const bob = joueur(port, 'jeton-bob-8');
    alice.socket.emit('creer', { jeton: alice.jeton, pseudo: 'Alice', nombre: 2 });
    const { code } = await alice.attendre((i) => i.phase === 'attente');
    bob.socket.emit('rejoindre', { code, jeton: bob.jeton, pseudo: 'Bob' });
    await alice.attendre((i) => i.sieges[1]!.type === 'humain');
    alice.socket.emit('lancer', {});
    await bob.attendre((i) => i.phase === 'jeu');
    expect(JSON.stringify(bob.dernier)).not.toContain('jeton-alice');
    expect(JSON.stringify(alice.dernier)).not.toContain('jeton-bob');
  });
});
