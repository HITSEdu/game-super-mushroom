import {usePlayerStore} from '../../store/PlayerStore.ts';
import {enemies} from '../entities/enemy/enemies.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";

export const keys: { [k: string]: boolean } = {
  left: false,
  right: false,
  jump: false,
  pause: false,
  up: false,
  down: false,
  use: false
};

const keyMap: Record<string, string> = {
  w: 'up', a: 'left', s: 'down', d: 'right',
  ц: 'up', ф: 'left', ы: 'down', в: 'right',

  e: 'use',
  у: 'use',

  ' ': 'jump', escape: 'pause',
}

let frame: number | null = null;

export function press(action: keyof typeof keys) {
  keys[action] = true;
}

export function release(action: keyof typeof keys) {
  keys[action] = false;
}

function onKeyDown(e: KeyboardEvent) {
  const action = keyMap[e.key.toLowerCase()];
  if (action) keys[action] = true;
}

function onKeyUp(e: KeyboardEvent) {
  const action = keyMap[e.key.toLowerCase()];
  if (action) keys[action] = false;
}

export function initControlSystem() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  let last = performance.now()

  const loop = (now: number) => {
    const dt = now - last;
    last = now;

    const player = usePlayerStore.getState();
    const session = useGameSessionStore.getState();

    if (session.status === 'playing') {
      if (!player.stacked) {
        if (keys.left) player.come('left');
        if (keys.right) player.come('right');
      }

      if (player.onLadder) {
        if (keys.up) player.setVelocity('y', -player.speed / 2);
        else if (keys.down) player.setVelocity('y', +player.speed / 2);
        else player.setVelocity('y', 0);
      } else {
        if (keys.jump) player.jump();
      }
      if (keys.pause) session.pause();

      for (const interaction of player.nearInteractive) {
        const key = interaction.key.toLowerCase();
        if (keys[key]) {
          interaction.action();
          usePlayerStore.setState(() => ({
            nearInteractive: player.nearInteractive.filter(i => i.id !== interaction.id),
          }));
          break;
        }
      }

      session.tick(dt);
      player.tick();
      enemies.forEach(e => e.update());
    }

    frame = requestAnimationFrame(loop);
  };

  frame = requestAnimationFrame(loop);
}

function clearKeys() {
  for (const key in keys) keys[key] = false;
}

export function cleanupControlSystem() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);

  if (frame) cancelAnimationFrame(frame);
  clearKeys();
}

export const getPlayerPosition = () => {
  return usePlayerStore.getState().position;
}