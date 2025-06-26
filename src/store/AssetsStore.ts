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

        await Assets.loadBundle('spirit_laurus');
        await Assets.loadBundle('spirit_mira');
        await Assets.loadBundle('spirit_onyx');
        await Assets.loadBundle('spirit_swifty');

        await Assets.loadBundle('enemy');
        await Assets.loadBundle('star');

        await Assets.loadBundle('item_winter');
        await Assets.loadBundle('item_spring');
        await Assets.loadBundle('item_summer');
        await Assets.loadBundle('item_autumn');

        await Assets.loadBundle('platform_underworld');
        await Assets.loadBundle('platform_winter');
        await Assets.loadBundle('platform_summer');
        await Assets.loadBundle('platform_spring');
        await Assets.loadBundle('platform_autumn');
        await Assets.loadBundle('platform_winter_games');
        await Assets.loadBundle('platform_summer_games');
        await Assets.loadBundle('platform_spring_games');
        await Assets.loadBundle('platform_autumn_games');

        await Assets.loadBundle('door_underworld');
        await Assets.loadBundle('door_winter');
        await Assets.loadBundle('door_summer');
        await Assets.loadBundle('door_spring');
        await Assets.loadBundle('door_autumn');

        await Assets.loadBundle('ladder');
        await Assets.loadBundle('trap');
        await Assets.loadBundle('fountain');
        await Assets.loadBundle('portal');

        await Assets.loadBundle('flower1');
        await Assets.loadBundle('flower2');
        await Assets.loadBundle('flower3');
        await Assets.loadBundle('flower4');


        await Assets.loadBundle('bag');
        await Assets.loadBundle('shelf');

        await Assets.loadBundle('box1');
        await Assets.loadBundle('box2');
        await Assets.loadBundle('box_zone');

        set({isInitialized: true});
      } catch (error) {
        console.error("Assets initialization failed:", error);
        throw error;
      }
    },
  }),
)