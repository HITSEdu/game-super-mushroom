import {create} from "zustand";
import {MUSIC_COUNT, SONG_NAMES} from "../constants/values.ts";
import {sounds} from "../game/utils/sound.ts";
import {Howler} from "howler";
import {useToastStore} from "./ToastStore.ts";
import i18next from "i18next";

interface MusicPlayerState {
  music: string;

  setMusic: (music: string) => void;
  changeMusic: () => void;
  playMusic: () => void;
  offMusic: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerState>()(
  (set, get) => ({
    music: 'music0',
    setMusic: (music: string) => {
      Howler.stop();
      set({music});

      const entry = SONG_NAMES.find(el => el.key === music);
      const label = entry ? i18next.t(`translations:${entry.label}`) : '???';

      if (music !== 'music0') {
        sounds[music]?.play();
        useToastStore.getState().show(`${i18next.t('translations:currentlyPlaying')}: ${label}`);
      } else {
        get().offMusic();
        useToastStore.getState().show(i18next.t('translations:musicIsDisabled'));
      }
    },

    changeMusic: () => {
      Howler.stop();

      const current = parseInt(get().music.replace(/\D+/g, ''));
      const nextNumber = (current + 1) % (MUSIC_COUNT + 1);
      const next = 'music' + nextNumber;

      set({music: next});

      if (next !== 'music0') {
        sounds[next]?.play();

        const entry = SONG_NAMES.find(el => el.key === next);
        const label = entry ? i18next.t(`translations:${entry.label}`) : '???';

        useToastStore.getState().show(`${i18next.t('translations:currentlyPlaying')}: ${label}`);
      } else {
        useToastStore.getState().show(i18next.t('translations:musicIsDisabled'));
      }
    },

    playMusic: () => {
      const current = sounds[get().music];
      if (current) current.play();
    },

    offMusic: () => {
      Howler.stop();
    },
  }),
);