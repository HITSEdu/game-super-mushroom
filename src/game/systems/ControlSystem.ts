import {usePlayerStore} from '../../store/PlayerStore.ts';
import {enemies} from '../entities/enemies.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";

const keys: { [k: string]: boolean } = {left: false, right: false, jump: false, pause: false, down: false};

const keyMap: Record<string, string> = {
    w: 'jump', a: 'left', s: 'down', d: 'right',
    ц: 'jump', ф: 'left', ы: 'down', в: 'right',

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
        const dt = (now - last)
        last = now

        const {come, jump, tick: playerTick, stacked} = usePlayerStore.getState();
        const {pause, status, tick: sessionTick} = useGameSessionStore.getState();

        if (status === 'playing') {
            if (!stacked) {
                if (keys.left) come('left');
                if (keys.right) come('right');
            }
            if (keys.jump) jump();

            if (keys.pause) pause();

            sessionTick(dt);
            playerTick();
            enemies.forEach(e => e.update());
        }

        frame = requestAnimationFrame(loop);
    }

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

export function isMoving(): boolean {
    return keys.left || keys.right;
}