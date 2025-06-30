import {Howl} from 'howler';
import {useMusicPlayerStore} from "../../store/MusicPlayerStore.ts";

export const sounds: Record<string, Howl> = {
  win: new Howl({
    src: ['assets/sounds/win.mp3']
  }),
  portal: new Howl({
    src: ['assets/sounds/portal.mp3']
  }),
  music0: new Howl({
    src: ['assets/sounds/music0.mp3'],
    onend: () => {
      useMusicPlayerStore.getState().changeMusic();
    }
  }),
  music1: new Howl({
    src: ['assets/sounds/music1.mp3'],
    onend: () => {
      useMusicPlayerStore.getState().changeMusic();
    }
  }),
  music2: new Howl({
    src: ['assets/sounds/music2.mp3'],
    onend: () => {
      useMusicPlayerStore.getState().changeMusic();
    }
  }),
  music3: new Howl({
    src: ['assets/sounds/music3.mp3'],
    onend: () => {
      useMusicPlayerStore.getState().changeMusic();
    }
  }),
  music4: new Howl({
    src: ['assets/sounds/music4.mp3'],
    onend: () => {
      useMusicPlayerStore.getState().changeMusic();
      useMusicPlayerStore.getState().changeMusic();
    }
  }),
};

