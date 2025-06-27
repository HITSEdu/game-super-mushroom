import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import levelsData from './res/levels.json'

interface LevelData {
  id: string
  completed: boolean
  unlocked: boolean
  attempts: number
  bestTime?: number
  stars?: number
}

interface LevelsState {
  levels: Record<string, LevelData>
  completeLevel: (id: string, time: number, stars: number, attempts: number) => void
  unlockLevel: (id: string) => void
  resetProgress: () => void
}

const initLevels: Record<string, LevelData> = JSON.parse(JSON.stringify(levelsData));

export const useLevelsStore = create<LevelsState>()(
  persist(
    (set) => ({
      levels: JSON.parse(JSON.stringify(initLevels)),
      completeLevel: (id: string, time: number, stars: number, attempts: number) =>
        set((state) => {
          const level = state.levels[id]
          const updatedLevel = {
            ...level,
            attempts: attempts,
            completed: true,
            bestTime: level.bestTime ? Math.min(level.bestTime, time) : time,
            stars: stars
          }

          const nextId = `${parseInt(id) + 1}`;
          const nextLevel = state.levels[nextId];

          return {
            levels: {
              ...state.levels,
              [id]: updatedLevel,
              ...(nextLevel ? {
                [nextId]: {
                  ...nextLevel,
                  unlocked: true,
                },
              } : {}),
            },
          }
        }),
      unlockLevel: (id: string) =>
        set((state) => ({
          levels: {
            ...state.levels,
            [id]: {
              ...state.levels[id],
              unlocked: true,
            },
          },
        })),
      resetProgress: () =>
        set(() => ({
          levels: JSON.parse(JSON.stringify(initLevels)),
        })),
    }),
    {
      name: 'levelsStore',
    }
  ),
)
