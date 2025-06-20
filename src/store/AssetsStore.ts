import {create} from 'zustand'
import {manifest} from "../assets/manifest.ts";
import {Assets} from "pixi.js";

interface AssetsStore {
  isInitialized: boolean;
  initialize: () => void;
}

export const useAssetsStore = create<AssetsStore>()(
  (set, get) => ({
    isInitialized: false,
    initialize: async () => {
      if (get().isInitialized) return;

      try {
        await Assets.init({manifest});

        await Assets.loadBundle('player_1_winter');
        await Assets.loadBundle('player_1_summer');
        await Assets.loadBundle('player_1_autumn');
        await Assets.loadBundle('player_1_spring');

        await Assets.loadBundle('player_2_winter');
        await Assets.loadBundle('player_2_summer');
        await Assets.loadBundle('player_2_autumn');
        await Assets.loadBundle('player_2_spring');


        await Assets.loadBundle('player_3_winter');
        await Assets.loadBundle('player_3_summer');
        await Assets.loadBundle('player_3_autumn');
        await Assets.loadBundle('player_3_spring');

        await Assets.loadBundle('player_underworld');

        await Assets.loadBundle('enemy');
        await Assets.loadBundle('star');

        await Assets.loadBundle('platform_underworld');
        await Assets.loadBundle('door_underworld');
        await Assets.loadBundle('ladder');

        set({isInitialized: true});
      } catch (error) {
        console.error("Assets initialization failed:", error);
        throw error;
      }
    },
  }),
)