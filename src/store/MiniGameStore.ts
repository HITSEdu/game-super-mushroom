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
import {generateSummerMaze} from "../game/utils/mazeGenerator.ts";

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
  clearCurrentMiniGame: () => void;
  deliverItem: () => void;
  finishMiniGame: () => void;
  isCompleted: (id: string) => boolean;
  resetMiniGames: () => void;
  takeBoxFromShelf: () => void;

  generateDeliveryZones: () => void;
  generateFlowerZones: () => void;
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

      generateFlowerZones: () => {
        const state = get();
        if (!state.currentMiniGame) return;
        const config = MINI_GAMES[state.currentMiniGame];
        if (config.id !== 'spring') return;

        const zones = generateRandomDeliveryZones();

        const flowers = zones.map((zone) => ({
          id: config.itemId,
          x: zone.x,
          y: zone.y,
          type: config.itemName + `${Math.ceil(Math.random() * 12)}`,
          size: {width: 24, height: 24},
          visible: true,
        }));

        useLevelStore.setState((state) => ({
          items: [...state.items, ...flowers]
        }));

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
          {x: zone.x - 12, y: zone.y, axis: 'y', type: 'trap2', speed: 150},
          {x: zone.x + 12, y: zone.y, axis: 'y', type: 'trap2', speed: 150},
          {x: zone.x, y: zone.y - 12, axis: 'x', type: 'trap2', speed: 150},
          {x: zone.x, y: zone.y + 12, axis: 'x', type: 'trap2', speed: 150},
        ], zone);
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

            if (id === 'summer') set({canInteract: false});
            if (id === 'winter') set({canInteract: false});

            useLevelStore.getState().load(config.level, config.id).then(() => {
              usePlayerStore.getState().setPosition(useLevelStore.getState().playerStart);
              useGameSessionStore.setState({entered: 'left'});
              if (config.action) config.action();
              if (id === 'spring') {
                get().generateFlowerZones();
              }
              if (id === 'summer') {
                generateSummerMaze();
              }
            });

            set({currentMiniGame: id});
          }
        },

      clearCurrentMiniGame: () => {
        set({
          currentMiniGame: null,
          collected: 0,
          carriedItem: null,
          canInteract: true,
          deliveryZones: [],
          activeDeliveryZoneIndex: 0,
        });
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
            useLevelStore.getState().removeEnemies();
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

          useGameSessionStore.setState({currentLevelID: get().lastLevel});

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
      partialize: (state) => ({
        completed: state.completed,
      }),
    }
  )
);