import {create} from 'zustand'
import type {GameStatus} from "../constants/types.ts";
import {useLevelsStore} from "./LevelsStore.ts";
import {useLevelStore} from "./LevelStore.ts";
import {sounds} from "../game/utils/sound.ts";
import {useMusicPlayerStore} from "./MusicPlayerStore.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {UNDERWORLD_SPAWN} from "../constants/values.ts";

interface GameSessionState {
  currentLevelID: string | null
  status: GameStatus
  currentAttempts: number
  curTime: number
  stars: number

  startLevel: (id: string) => void
  pause: () => void
  resume: () => void

  getStar: () => void
  enterDoor: (side: 'left' | 'right') => void
  win: () => void
  lose: () => void

  reset: () => void
  tick: (dt: number) => void
}

export const useGameSessionStore = create<GameSessionState>()((set, get) => ({
  currentLevelID: null,
  status: "paused",
  currentAttempts: 1,
  curTime: 0,
  stars: 0,

  startLevel: (id: string) => {
    Howler.stop();
    useMusicPlayerStore.getState().playMusic();
    usePlayerStore.getState().setPosition(UNDERWORLD_SPAWN);

    set(() => ({
      currentLevelID: id,
      status: "playing",
      currentAttempts: 1,
      curTime: 0,
      stars: 0,
    }))
  },

  pause: () => {
    if (get().status === "playing") set(() => (
      {
        status: "paused",
      }
    ))
  },

  resume: () => set(() => ({
    status: "playing",
  })),

  enterDoor: (side: 'left' | 'right') => {
    const cur = Number(get().currentLevelID);
    let nextID = cur;

    if (side === 'right') {
      nextID = cur + 1 > 4 ? 1 : cur + 1;
    } else if (side === 'left') {
      nextID = cur - 1 < 1 ? 4 : cur - 1;
    }

    useLevelStore.getState().load(nextID.toString()).then(() => {
      usePlayerStore.getState().setPosition(side === 'right' ? useLevelStore.getState().playerStart : useLevelStore.getState().playerEnd);
    });
    set({currentLevelID: nextID.toString()});
  },
  getStar: () => set((state) => ({stars: state.stars + 1})),

  win: () => {
    const completeLevel = useLevelsStore.getState().completeLevel;
    const curLevel = get().currentLevelID;

    if (curLevel) {
      Howler.stop();
      sounds.win.play();
      completeLevel(curLevel, get().curTime, get().stars, get().currentAttempts)
    }

    set(() => ({
      status: "won",
    }))
  },

  lose: () => {
    const reloadLevel = useLevelStore.getState().load;
    const curLevel = get().currentLevelID;

    if (curLevel) reloadLevel(curLevel);

    set((state) => ({
      currentAttempts: state.currentAttempts + 1,
      curTime: 0,
      stars: 0,
    }))
  },

  reset: () => {
    Howler.stop();

    set(() => ({
      currentLevelID: null,
      status: "paused",
      currentAttempts: 0,
      curTime: 0,
      stars: 0,
    }))
  },

  tick: (dt) =>
    set((state) =>
      state.status === 'playing'
        ? {curTime: state.curTime + dt}
        : state
    ),
}))
