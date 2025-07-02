import {create} from 'zustand'
import {manifest} from "../../public/assets/manifest.ts";
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

        const playerSeasons = ['winter', 'summer', 'autumn', 'spring'];
        await Assets.loadBundle('player_underworld');
        for (let i = 1; i <= 3; i++) {
          for (const season of playerSeasons) {
            await Assets.loadBundle(`player_${i}_${season}`);
          }
        }

        const spirits = ['laurus', 'mira', 'onyx', 'swifty'];
        for (const spirit of spirits) {
          await Assets.loadBundle(`spirit_${spirit}`);
        }

        for (const season of playerSeasons) {
          await Assets.loadBundle(`item_${season}`);
          await Assets.loadBundle(`dog_${season}`);
          await Assets.loadBundle(`platform_games_${season}`);
          await Assets.loadBundle(`jewel_${season}`);
        }

        for (const season of [...playerSeasons, 'underworld']) {
          await Assets.loadBundle(`door_${season}`);
          await Assets.loadBundle(`ladder_${season}`);
          await Assets.loadBundle(`platform_${season}`);
        }

        for (let i = 1; i <= 3; i++) {
          for (const s of playerSeasons) {
            await Assets.loadBundle(`tree${i}${s}`);
          }
        }

        for (let i = 1; i <= 3; i++) {
          await Assets.loadBundle(`trap${i}`);
          await Assets.loadBundle(`box${i}`);
          await Assets.loadBundle(`rock${i}`);
        }

        const misc = ['fountain', 'portal', 'fire', 'sun', 'moon', 'snowman'];
        for (const object of misc) {
          await Assets.loadBundle(object);
        }

        for (let i = 1; i <= 12; i++) {
          await Assets.loadBundle(`flower${i}`);
        }

        await Assets.loadBundle('bag');
        await Assets.loadBundle('shelf');
        await Assets.loadBundle('box_zone');
        await Assets.loadBundle('tablet');

        await Assets.loadBundle('water_games');
        await Assets.loadBundle('water');
        await Assets.loadBundle('ice');

        for (let i = 1; i <= 7; i++) {
          await Assets.loadBundle(`cloud${i}`);
        }

        const effects = ['snow', 'rain'];
        for (const effect of effects) {
          await Assets.loadBundle(effect);
        }

        const enemy = ['slug', 'bat', 'underworld_spirit']
        for (const e of enemy) {
          await Assets.loadBundle(e);
        }

        set({isInitialized: true});
      } catch (error) {
        console.error("Assets initialization failed:", error);
        throw error;
      }
    },
  }),
);
