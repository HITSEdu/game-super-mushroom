import {create} from 'zustand'
import type {GameStatus} from "../constants/types.ts";
import {useLevelsStore} from "./LevelsStore.ts";
import {useLevelStore} from "./LevelStore.ts";
import {sounds} from "../game/utils/sound.ts";

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

        set(() => ({
            currentLevelID: id,
            status: "playing",
            currentAttempts: 1,
            curTime: 0,
            stars: 0,
        }))
    },

    pause: () => set(() => ({
        status: "paused",
    })),

    resume: () => set(() => ({
        status: "playing",
    })),

    getStar: () => set((state) => ({stars: state.stars + 1})),

    win: () => {
        const completeLevel = useLevelsStore.getState().completeLevel;
        const curLevel = get().currentLevelID;

        if (curLevel) {
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

        if (curLevel) reloadLevel(Number(curLevel));

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
