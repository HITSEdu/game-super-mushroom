import {create} from "zustand"
import {MUSIC_COUNT} from "../constants/values.ts";
import {sounds} from "../game/utils/sound.ts";

interface MusicPlayerState {
  music: string

  setMusic: (music: string) => void
  changeMusic: () => void
  playMusic: () => void
  offMusic: () => void
}

export const useMusicPlayerStore = create<MusicPlayerState>()(
  (set, get) => ({
    music: 'music0',
    setMusic: (music: string) => {
      Howler.stop();

      set({music});
      if (music !== 'music0') {
        sounds[music]?.play();
      } else {
        get().offMusic();
      }
    },
    playMusic: () => {
      const current = sounds[get().music];
      if (current) current.play();
    },
    changeMusic: () => {
      Howler.stop();

      const current = parseInt(get().music.replace(/\D+/g, ''));
      const nextNumber = (current + 1) % (MUSIC_COUNT + 1);
      const next = 'music' + nextNumber;

      set({music: next});

      const nextSound = sounds[next];
      if (nextSound) nextSound.play();
    },
    offMusic: () => {
      Howler.stop();
    },
  }),
);