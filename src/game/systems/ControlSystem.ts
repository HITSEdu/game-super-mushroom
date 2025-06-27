// ControlSystem.ts
import {usePlayerStore} from '../../store/PlayerStore.ts';
import {enemies} from '../entities/enemy/enemies.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {useLevelStore} from "../../store/LevelStore.ts";
import {useInteractionHoldStore} from "../../store/InteractionHoldStore.ts";

export const keys: Record<string, boolean> = {
  left: false, right: false, up: false, down: false,
  jump: false, pause: false,
  use: false,
  interact: false,
};

const keyMap: Record<string, keyof typeof keys> = {
  w: 'up', a: 'left', s: 'down', d: 'right',
  'ц': 'up', 'ф': 'left', 'ы': 'down', 'в': 'right',
  ' ': 'jump', Escape: 'pause',

  e: 'use',
  'у': 'use',

  f: 'interact',
  'а': 'interact',
};

let frame: number | null = null;
const holdStart: Record<string, number> = {};
const pressedOnce: Record<string, boolean> = {};

export function press(action: keyof typeof keys) {
  keys[action] = true;
  holdStart[action] = performance.now();

  const player = usePlayerStore.getState();
  const inter = player.nearInteractive.find(i => i.key === action);
  if (inter?.holdable && inter.key === action) {
    useInteractionHoldStore.getState().startHold(inter.id);
  }
}

export function release(action: keyof typeof keys) {
  keys[action] = false;
  pressedOnce[action] = false;
  delete holdStart[action];

  useInteractionHoldStore.getState().cancelHold();
}

function onKeyDown(e: KeyboardEvent) {
  const act = keyMap[e.key];
  if (act && !keys[act]) press(act);
}

function onKeyUp(e: KeyboardEvent) {
  const act = keyMap[e.key];
  if (act) release(act);
}

export function initControlSystem() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  let last = performance.now();

  const loop = (now: number) => {
    const dt = now - last;
    last = now;

    const player = usePlayerStore.getState();
    const session = useGameSessionStore.getState();
    const level = useLevelStore.getState();
    const hold = useInteractionHoldStore.getState();

    if (hold.interactionId && !player.nearInteractive.some(i => i.id === hold.interactionId)) {
      useInteractionHoldStore.getState().cancelHold();
      if (keys['interact']) release('interact');
    }

    if (session.status === 'playing') {
      const isVertical = player.onLadder || level.isMiniGame;

      if (!player.stacked) {
        if (keys.left && !keys.right) player.come('left');
        else if (keys.right && !keys.left) player.come('right');
        else player.setVelocity('x', 0);
      }

      if (isVertical) {
        if (keys.up && !keys.down) player.come('up');
        else if (keys.down && !keys.up) player.come('down');
        else player.setVelocity('y', 0);
      } else if (keys.jump) {
        player.jump();
      }

      if (keys.pause) session.pause();

      for (const inter of player.nearInteractive) {
        const key = inter.key;
        if (!keys[key]) continue;

        const nowMs = performance.now();
        if (inter.holdable) {
          const elapsed = nowMs - (holdStart[key] ?? nowMs);
          const prog = Math.min(elapsed / (inter.holdDuration ?? 1000), 1);
          useInteractionHoldStore.getState().updateProgress(prog);

          if (prog >= 1) {
            inter.action();
            useInteractionHoldStore.getState().cancelHold();
            release(key);
            delete holdStart[key];

            usePlayerStore.setState(s => ({
              nearInteractive: s.nearInteractive.filter(i => i.id !== inter.id)
            }));
            break;
          }
        } else {
          if (!pressedOnce[key]) {
            pressedOnce[key] = true;
            inter.action();
            usePlayerStore.setState(s => ({
              nearInteractive: s.nearInteractive.filter(i => i.id !== inter.id)
            }));
            break;
          }
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

export function cleanupControlSystem() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  if (frame) cancelAnimationFrame(frame);
  for (const k in keys) keys[k] = false;
}