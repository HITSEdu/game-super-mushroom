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
import {MINI_GAMES} from "../constants/miniGames.tsx";
import {useInventoryStore} from "./InventoryStore.ts";
import i18next from "i18next";
import {useToastStore} from "./ToastStore.ts";
import {
  generateRandomDeliveryZones
} from "../game/utils/generateRandomDeliveryZones.ts";

interface MiniGameState {
  completed: Record<string, boolean>;
  currentMiniGame: string | null;
  lastLevel: string;
  lastPosition: PointData;
  collected: number;
  carriedItem: number | null;
  canInteract: boolean;

  deliveryZones: PointData[];
  activeDeliveryZoneIndex: number;

  markCompleted: (id: string) => void;
  startMiniGame: (id: string) => void;
  deliverItem: () => void;
  finishMiniGame: () => void;
  isCompleted: (id: string) => boolean;
  resetMiniGames: () => void;
  takeBoxFromShelf: () => void;

  generateDeliveryZones: () => void;
  nextDeliveryZone: () => void;
}

export const useMiniGameStore = create<MiniGameState>()(
  persist(
    (set, get) => ({
      completed: {},
      currentMiniGame: null,
      lastLevel: '1',
      canInteract: true,
      lastPosition: UNDERWORLD_SPAWN,
      collected: 0,
      carriedItem: null,

      deliveryZones: [],
      activeDeliveryZoneIndex: 0,

      generateDeliveryZones: () => {
        const zones = generateRandomDeliveryZones();
        set({deliveryZones: zones, activeDeliveryZoneIndex: 0});
      },

      nextDeliveryZone: () => {
        set((state) => ({
          activeDeliveryZoneIndex: state.activeDeliveryZoneIndex + 1
        }));
      },

      takeBoxFromShelf: () => {
        const state = get();
        if (!state.currentMiniGame) return;
        const config = MINI_GAMES[state.currentMiniGame];
        if (config.id !== 'autumn') return;

        if (!state.canInteract) {
          useToastStore.getState().show(i18next.t('translations:miniGame.allBoxesDelivered'));
          return;
        }

        const inventory = useInventoryStore.getState();

        if (state.carriedItem === config.itemId) {
          useToastStore.getState().show(i18next.t('translations:overload'));
          return;
        }

        useToastStore.getState().show(i18next.t('translations:miniGame.takeBox'));
        inventory.addItem(config.itemId);
        set({
          carriedItem: config.itemId,
        });

        const {deliveryZones, activeDeliveryZoneIndex} = get();
        const zone = deliveryZones[activeDeliveryZoneIndex];
        if (!zone) return;

        useLevelStore.getState().spawnEnemies([
          {x: zone.x - 10, y: 24 + 16, axis: 'y', type: 'arrow', speed: 4},
          {x: zone.x + 10, y: 24 + 16, axis: 'y', type: 'arrow', speed: 4},
          {x: 24 + 16, y: zone.y - 10, axis: 'x', type: 'arrow', speed: 4},
          {x: 24 + 16, y: zone.y + 10, axis: 'x', type: 'arrow', speed: 4},
        ]);
      },

      markCompleted: (id) =>
        set((state) => ({
          completed: {...state.completed, [id]: true}
        })),

      startMiniGame:
        (id) => {
          if (!get().completed[id]) {
            useInventoryStore.getState().removeMiniGameItems();
            const config = MINI_GAMES[id];
            set({
              lastPosition: usePlayerStore.getState().position,
              lastLevel: useGameSessionStore.getState().currentLevelID ?? '1',
              carriedItem: null,
              canInteract: true,
              collected: 0,
              deliveryZones: [],
              activeDeliveryZoneIndex: 0,
            });

            if (id === 'autumn') {
              get().generateDeliveryZones();
            }

            useLevelStore.getState().load(config.level, config.id).then(() => {
              usePlayerStore.getState().setPosition(useLevelStore.getState().playerStart);
              if (config.action) config.action();
            });

            set({currentMiniGame: id});
          }
        },

      deliverItem:
        () => {
          const id = get().currentMiniGame;
          if (!id) return;

          const config = MINI_GAMES[id];
          const curItem = get().carriedItem;

          if (curItem !== config.itemId) {
            const itemName = i18next.t(`translations:items.names.${config.itemId}`);
            useToastStore.getState().show(
              i18next.t('translations:miniGame.noItem', {itemName})
            );
            return;
          }

          if (!get().canInteract) {
            useToastStore.getState().show(i18next.t('translations:miniGame.allFlowersDelivered'));
            return;
          }

          const nextCount = get().collected + 1;

          useInventoryStore.getState().reduceItem(curItem);
          set({
            collected: nextCount,
            carriedItem: null
          });

          const remaining = config.goal - nextCount;
          useToastStore.getState().show(
            i18next.t('translations:miniGame.delivered', {
              itemName: i18next.t(`translations:items.names.${curItem}`),
              remaining
            })
          );

          if (id === 'autumn') {
            useLevelStore.getState().removeEnemies();
            if (nextCount < config.goal) {
              get().nextDeliveryZone();
            }
          }

          if (nextCount >= config.goal) {
            set({canInteract: false});
            useLevelStore.setState((state) => ({
              items: state.items.map(item =>
                item.id === config.butterflyId
                  ? {...item, visible: true}
                  : item
              )
            }));
          }
        },

      finishMiniGame:
        () => {
          const cur = get().currentMiniGame;
          if (cur) {
            useInventoryStore.getState().removeMiniGameItems();
            get().markCompleted(cur);
            set({
              currentMiniGame: null,
              collected: 0,
              carriedItem: null,
              canInteract: true,
              deliveryZones: [],
              activeDeliveryZoneIndex: 0,
            });
          }

          useLevelStore.getState().load(get().lastLevel).then(() => {
            usePlayerStore.setState({size: DEFAULT_PLAYER_SIZE});
            usePlayerStore.getState().setPosition(get().lastPosition);
          });
        },

      isCompleted:
        (id) => !!get().completed[id],

      resetMiniGames:
        () => {
          set({
            currentMiniGame: null,
            lastLevel: '1',
            completed: {},
            lastPosition: UNDERWORLD_SPAWN,
            collected: 0,
            carriedItem: null,
            canInteract: true,
            deliveryZones: [],
            activeDeliveryZoneIndex: 0,
          });
        }
    }),
    {
      name: 'mini-game-store',
    }
  )
);