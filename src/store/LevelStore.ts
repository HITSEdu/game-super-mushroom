import {create} from 'zustand';
import {Point, type PointData} from 'pixi.js';
import {loadLevel} from '../game/utils/loader.ts';
import {v4 as uuidv4} from 'uuid';
import {
  DEFAULT_END_POSITION,
  DEFAULT_ENEMY_MINI_GAME_SIZE,
  DEFAULT_PLAYER_MINI_GAME_SIZE,
  DEFAULT_PLAYER_SIZE,
  DEFAULT_START_POSITION,
  GAME_HEIGHT,
  GAME_WIDTH, TILE_SIZE
} from "../constants/values.ts";
import {
  createEnemy,
  enemies as activeEnemies
} from "../game/entities/enemy/enemies.ts";
import type {EnemySpawnConfig, ObjectSize} from "../constants/interfaces.ts";
import {type IEnemy} from '../constants/interfaces.ts'
import type {SeasonType} from "../constants/types.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {useGameSessionStore} from "./GameSessionStore.ts";
import {useInventoryStore} from "./InventoryStore.ts";
import {clamp} from "../game/utils/clamp.ts";

export interface ObstacleData {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  visible: boolean;
}

export interface DecorationData {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  visible: boolean;
}

export interface EnemyData {
  x: number;
  y: number;
  type: string;
  speed: number;
  range: number;
  size: ObjectSize;
}

export interface ItemData {
  id: number;
  x: number;
  y: number;
  type: string;
  size: ObjectSize;
  visible: boolean;
}

export interface SpiritData {
  id: number;
  x: number;
  y: number;
  type: string;
  size: ObjectSize;
  visible: boolean;
}

interface LevelState {
  playerStart: Point;
  playerEnd: Point;
  levelType: SeasonType;
  obstacles: ObstacleData[];
  enemies: IEnemy[];
  items: ItemData[];
  decorations: DecorationData[],
  spirits: SpiritData[];
  isMiniGame: boolean;
  gravity: number;
  isLoaded: boolean;

  spawnEnemies: (spawns: EnemySpawnConfig[], target?: PointData) => void;
  removeEnemies: () => void;
  load: (id: string, season?: SeasonType) => Promise<void>;
  reset: () => void;
}

export const useLevelStore = create<LevelState>((set, get) => ({
  playerStart: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
  playerEnd: new Point(DEFAULT_END_POSITION.x, DEFAULT_END_POSITION.y),
  levelType: 'underworld',
  gravity: 1.5,
  items: [],
  decorations: [],
  spirits: [],
  obstacles: [],
  enemies: [],
  isMiniGame: false,
  isLoaded: false,

  load: async (id: string, season?: SeasonType) => {
    const currentSeason = season ?? usePlayerStore.getState().season;

    const data = await loadLevel(id, currentSeason);

    if (Number(id) > 4) {
      set({isMiniGame: true});
      usePlayerStore.setState({size: DEFAULT_PLAYER_MINI_GAME_SIZE})
    } else {
      set({isMiniGame: false});
      usePlayerStore.setState({size: DEFAULT_PLAYER_SIZE})
    }

    useGameSessionStore.setState({currentLevelID: id});

    activeEnemies.length = 0;

    (data.enemies || []).map((item: EnemyData) => {
      return {
        ...item,
        type: (item.type === 'dog') ? item.type + "_" + data.levelType : item.type,
      }
    }).forEach((e: EnemyData) => {
      const id = uuidv4();
      const isAngry = !e.type.startsWith('dog');
      createEnemy(id, e.x, e.y, e.x - e.range / 2, e.x + e.range / 2, e.speed, e.type, e.size, isAngry);
    });

    const obstaclesWithVisible = (data.obstacles || []).map((obs: ObstacleData) => ({
      ...obs,
      type: (obs.type === 'platform') || (obs.type === 'door') || (obs.type === 'ladder') ? obs.type + '_' + data.levelType : obs.type,
      visible: obs.visible !== undefined ? obs.visible : true,
    }));

    const newItems: ItemData[] = (data.items || []).map((item: ItemData) => {
      if (item.type === 'flower') {
        return {
          ...item,
          type: item.type + `${Math.ceil(Math.random() * 4)}`
        };
      } else if (item.type === 'box') {
        return {
          ...item,
          type: item.type + `${Math.ceil(Math.random() * 2)}`
        };
      }
      return {
        ...item,
        visible: !useInventoryStore.getState().getItem(item.id) && item.visible,
      }
    });

    const newDecorations: DecorationData[] = (data.decorations || []).map((d: DecorationData) => {
      if (d.type.startsWith("fire")) {
        return {
          ...d,
          visible: true,
        }
      } else if (d.type.startsWith("tree")) {
        return {
          ...d,
          type: d.type + data.levelType,
          visible: true,
        }
      } else if (d.type === "moon" || d.type === "sun") {
        return {
          ...d,
          type: d.type,
          visible: true,
        }
      }
    });

    const newSpirits: SpiritData[] = (data.spirits || []).map((spirit: SpiritData) => ({
      ...spirit,
      visible: spirit.visible !== undefined ? spirit.visible : true,
    }));

    set({
      levelType: data.levelType,
      playerStart: new Point(data.playerStart.x, data.playerStart.y),
      playerEnd: new Point(data.playerEnd.x, data.playerEnd.y),
      gravity: data.gravity,
      items: newItems,
      decorations: newDecorations,
      spirits: newSpirits,
      obstacles: obstaclesWithVisible,
      enemies: activeEnemies,
      isLoaded: true
    });
  },

  spawnEnemies: (spawns: EnemySpawnConfig[], target?: PointData) => {
    const size = DEFAULT_ENEMY_MINI_GAME_SIZE;
    const defaultSpeed = 2;

    const clampedData = target ? {
      x: [clamp(target.x - 150, 0, GAME_WIDTH - TILE_SIZE), clamp(target.x + 150, 0, GAME_WIDTH - TILE_SIZE)],
      y: [clamp(target.y - 150, 0, GAME_HEIGHT - TILE_SIZE), clamp(target.y + 150, 0, GAME_HEIGHT - TILE_SIZE)],
    } : {};

    const patrolArea = {
      x: clampedData.x ? clampedData.x : [0, GAME_WIDTH - TILE_SIZE],
      y: clampedData.y ? clampedData.y : [0, GAME_HEIGHT - TILE_SIZE],
    } as const;

    for (const spawn of spawns) {
      const [start, end] = patrolArea[spawn.axis];

      createEnemy(
        uuidv4(),
        spawn.x,
        spawn.y,
        start,
        end,
        spawn.speed ?? defaultSpeed,
        spawn.type ?? "trap2",
        spawn.size ?? size,
        spawn.isAngry ?? true,
        spawn.axis
      );
    }

    set({enemies: [...activeEnemies]});
  },

  removeEnemies: () => {
    activeEnemies.length = 0;
    set({enemies: []});
  },

  reset: () => {
    activeEnemies.length = 0;

    set({
      playerStart: new Point(get().playerStart.x, get().playerStart.y),
      playerEnd: new Point(get().playerEnd.x, get().playerEnd.y),
      obstacles: [],
      spirits: [],
      items: [],
      enemies: [],
      isMiniGame: false,
      isLoaded: false
    });
  }
}));
