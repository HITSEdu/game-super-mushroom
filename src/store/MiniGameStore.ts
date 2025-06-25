import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {useLevelStore} from "./LevelStore.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {useGameSessionStore} from "./GameSessionStore.ts";
import {type PointData} from "pixi.js";
import {
  DEFAULT_PLAYER_SIZE,
  UNDERWORLD_SPAWN
} from "../constants/values.ts";

interface MiniGameState {
  completed: Record<string, boolean>;
  currentMiniGame: string | null;
  lastLevel: string;
  lastPosition: PointData;

  markCompleted: (id: string) => void;
  startMiniGame: (id: string) => void;
  finishMiniGame: () => void;
  isCompleted: (id: string) => boolean;
  resetMiniGames: () => void;
}

export const useMiniGameStore = create<MiniGameState>()(
  persist(
    (set, get) => ({
      completed: {},
      currentMiniGame: null,
      lastLevel: '1',
      lastPosition: UNDERWORLD_SPAWN,

      markCompleted: (id) =>
        set((state) => ({
          completed: {...state.completed, [id]: true}
        })),

      startMiniGame: (id) => {
        if (!get().completed[id]) {
          set({
            lastPosition: usePlayerStore.getState().position,
            lastLevel: useGameSessionStore.getState().currentLevelID ?? '1'
          })

          useLevelStore.getState().load('5').then(() => {
              usePlayerStore.getState().setPosition(useLevelStore.getState().playerStart);
            }
          );
          set({currentMiniGame: id});
        }
      },

      finishMiniGame: () => {
        const cur = get().currentMiniGame;
        if (cur) {
          get().markCompleted(cur);
          set({currentMiniGame: null})
        }

        useLevelStore.getState().load(get().lastLevel).then(() => {
            usePlayerStore.setState({size: DEFAULT_PLAYER_SIZE});
            usePlayerStore.getState().setPosition(get().lastPosition);
          }
        );
      },

      isCompleted: (id) => !!get().completed[id],

      resetMiniGames: () => {
        set({
          currentMiniGame: null,
          lastLevel: '1',
          completed: {},
          lastPosition: UNDERWORLD_SPAWN
        });
      }
    }),
    {
      name: 'mini-game-store',
    }
  )
);
