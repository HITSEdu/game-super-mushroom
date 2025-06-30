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
        for (let i = 1; i <= 3; i++) {
          for (const season of playerSeasons) {
            await Assets.loadBundle(`player_${i}_${season}`);
          }
        }
        await Assets.loadBundle('player_underworld');

        const spirits = ['laurus', 'mira', 'onyx', 'swifty'];
        for (const spirit of spirits) {
          await Assets.loadBundle(`spirit_${spirit}`);
        }

        await Assets.loadBundle('enemy');

        const items = ['winter', 'spring', 'summer', 'autumn'];
        for (const item of items) {
          await Assets.loadBundle(`item_${item}`);
        }

        const platforms = [...playerSeasons, 'underworld'];
        for (const season of platforms) {
          await Assets.loadBundle(`platform_${season}`);
        }

        for (const season of playerSeasons) {
          await Assets.loadBundle(`platform_${season}_games`);
        }

        for (const season of [...playerSeasons, 'underworld']) {
          await Assets.loadBundle(`door_${season}`);
          await Assets.loadBundle(`ladder_${season}`);
        }

        for (let i = 1; i <= 3; i++) {
          for (const s of items) {
            await Assets.loadBundle(`tree${i}${s}`);
          }
        }

        const misc = ['trap', 'fountain', 'portal'];
        for (const object of misc) {
          await Assets.loadBundle(object);
        }

        for (let i = 1; i <= 12; i++) {
          await Assets.loadBundle(`flower${i}`);
        }

        for (let i = 1; i <= 2; i++) {
          await Assets.loadBundle(`glitch${i}`);
        }

        await Assets.loadBundle('bag');
        await Assets.loadBundle('shelf');
        await Assets.loadBundle('box1');
        await Assets.loadBundle('box2');
        await Assets.loadBundle('box_zone');
        await Assets.loadBundle('tablet');

        for (let i = 1; i <= 7; i++) {
          await Assets.loadBundle(`cloud${i}`);
        }

        const effects = ['snow', 'rain'];
        for (const effect of effects) {
          await Assets.loadBundle(effect);
        }

        await Assets.loadBundle('arrow');
        await Assets.loadBundle('fire');
        await Assets.loadBundle('fire_underworld');

        await Assets.loadBundle('sun');
        await Assets.loadBundle('moon');
        await Assets.loadBundle('slug');
        await Assets.loadBundle('bat');
        await Assets.loadBundle('underworld_spirit');

        await Assets.loadBundle('dog_winter');
        await Assets.loadBundle('dog_spring');
        await Assets.loadBundle('dog_summer');
        await Assets.loadBundle('dog_autumn');

        set({isInitialized: true});
      } catch (error) {
        console.error("Assets initialization failed:", error);
        throw error;
      }
    },
  }),
);
