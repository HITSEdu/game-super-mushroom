import {create} from 'zustand'
import type {GameStatus} from "../constants/types.ts";
import {useLevelsStore} from "./LevelsStore.ts";
import {useLevelStore} from "./LevelStore.ts";
import {useMusicPlayerStore} from "./MusicPlayerStore.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {UNDERWORLD_SPAWN} from "../constants/values.ts";
import i18next from "i18next";
import {useToastStore} from "./ToastStore.ts";
import {MODALS} from "../constants/modals.tsx";
import {useMiniGameStore} from "./MiniGameStore.ts";
import {useInventoryStore} from "./InventoryStore.ts";
import {generateSummerMaze} from "../game/utils/mazeGenerator.ts";

interface GameSessionState {
  currentLevelID: string | null
  status: GameStatus
  currentAttempts: number
  curTime: number
  entered: 'right' | 'left'

  startLevel: (id: string) => void
  pause: () => void
  resume: () => void
  setStatus: (status: GameStatus) => void

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
  entered: 'left',

  startLevel: (id: string) => {
    Howler.stop();
    useMusicPlayerStore.getState().playMusic();
    usePlayerStore.getState().setPosition(UNDERWORLD_SPAWN);

    set(() => ({
      currentLevelID: id,
      status: "playing",
      currentAttempts: 1,
      curTime: 0,
      entered: 'left',
    }))
  },

  pause: () => {
    if (get().status === "playing") set(() => (
      {
        status: "paused",
      }
    ))
  },

  setStatus: (status: GameStatus) => {
    set({status})
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
      const message = `${i18next.t('translations:entered')} ${nextID}!`;

      useToastStore.getState().show(message);
      usePlayerStore.getState().setPosition(side === 'right' ? useLevelStore.getState().playerStart : useLevelStore.getState().playerEnd);
    });
    set({
      currentLevelID: nextID.toString(),
      entered: side === 'left' ? "right" : "left"
    });
  },

  win: () => {
    const completeLevel = useLevelsStore.getState().completeLevel;
    const curLevel = get().currentLevelID;

    if (curLevel) {
      Howler.stop();
      completeLevel(curLevel, get().curTime, get().currentAttempts)
    }

    set(() => ({
      status: "won",
    }))
  },

  lose: () => {
    const reloadLevel = useLevelStore.getState().load;
    const curLevel = get().currentLevelID;

    if (curLevel) reloadLevel(curLevel).then(() => {
        const spawnPosition = get().entered === 'left' ? useLevelStore.getState().playerStart : useLevelStore.getState().playerEnd;
        usePlayerStore.getState().setPosition(spawnPosition);

        const currentMiniGame = useMiniGameStore.getState().currentMiniGame;
        if (currentMiniGame) {
          useInventoryStore.getState().removeMiniGameItems();
          useMiniGameStore.setState({carriedItem: null});
        }

        if (currentMiniGame === 'summer') {
          generateSummerMaze();
        }

        if (currentMiniGame === 'spring') {
          useMiniGameStore.setState({
            collected: 0,
            canInteract: true,
          });

          const remaining = useLevelStore.getState().items.filter(item => item.type !== 'flower');
          useLevelStore.setState({items: remaining});
          useMiniGameStore.getState().generateFlowerZones();
        }
      }
    );

    MODALS['lose']();

    set((state) => ({
      currentAttempts: state.currentAttempts + 1,
    }))
  },

  reset: () => {
    Howler.stop();

    set(() => ({
      currentLevelID: null,
      status: "paused",
      currentAttempts: 0,
      curTime: 0,
    }))
  },

  tick: (dt) =>
    set((state) =>
      state.status === 'playing'
        ? {curTime: state.curTime + dt}
        : state
    ),
}))
