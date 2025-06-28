import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {GlobalType} from '../constants/types.ts';

interface GlobalState {
  global: GlobalType;
  change: (newState: GlobalType) => void;

  storyShown: boolean;
  setStoryShown: (shown: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      global: 'menu',
      change: (newState) => set({global: newState}),

      storyShown: false,
      setStoryShown: (shown) => set({storyShown: shown}),
    }),
    {
      name: 'global-storage',
      partialize: (state) => ({
        storyShown: state.storyShown,
      }),
    }
  )
);
