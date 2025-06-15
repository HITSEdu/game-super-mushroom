import {Howl} from 'howler';
import {useMusicPlayerStore} from "../../store/MusicPlayerStore.ts";

export const sounds: Record<string, Howl> = {
    win: new Howl({
        src: ['src/assets/sounds/win.mp3']
    }),
    music1: new Howl({
        src: ['src/assets/sounds/music1.mp3'],
        onend: () => {
            useMusicPlayerStore.getState().changeMusic();
        }
    }),
    music2: new Howl({
        src: ['src/assets/sounds/music2.mp3'],
        onend: () => {
            useMusicPlayerStore.getState().changeMusic();
        }
    }),
    music3: new Howl({
        src: ['src/assets/sounds/music3.mp3'],
        onend: () => {
            useMusicPlayerStore.getState().changeMusic();
        }
    }),
    music4: new Howl({
        src: ['src/assets/sounds/music4.mp3'],
        onend: () => {
            useMusicPlayerStore.getState().changeMusic();
            useMusicPlayerStore.getState().changeMusic();
        }
    }),
};

