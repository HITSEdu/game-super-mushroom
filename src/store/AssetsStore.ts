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

                await Assets.loadBundle('player');
                await Assets.loadBundle('enemy');
                await Assets.loadBundle('star');
                await Assets.loadBundle('finish');
                await Assets.loadBundle('ground');
                await Assets.loadBundle('platform');

                set({isInitialized: true});
            } catch (error) {
                console.error("Assets initialization failed:", error);
                throw error;
            }
        },
    }),
)
