import {create} from 'zustand';
import {Point} from 'pixi.js';
import {loadLevel} from '../game/utils/loader.ts';
import {v4 as uuidv4} from 'uuid';
import {
  DEFAULT_END_POSITION,
  DEFAULT_START_POSITION
} from "../constants/values.ts";
import {
  createEnemy,
  enemies as activeEnemies
} from "../game/entities/enemy/enemies.ts";
import type {ObjectSize} from "../constants/interfaces.ts";
import {type IEnemy} from '../constants/interfaces.ts'
import type {SeasonType} from "../constants/types.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {useGameSessionStore} from "./GameSessionStore.ts";
import {useInventoryStore} from "./InventoryStore.ts";

export interface ObstacleData {
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
  spirits: SpiritData[];
  isMiniGame: boolean;
  gravity: number;
  isLoaded: boolean;

  load: (id: string, season?: SeasonType) => Promise<void>;
  reset: () => void;
}

export const useLevelStore = create<LevelState>((set, get) => ({
  playerStart: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
  playerEnd: new Point(DEFAULT_END_POSITION.x, DEFAULT_END_POSITION.y),
  levelType: 'underworld',
  gravity: 1.5,
  items: [],
  spirits: [],
  obstacles: [],
  enemies: [],
  isMiniGame: false,
  isLoaded: false,

  load: async (id: string, season?: SeasonType) => {
    const currentSeason = season ?? usePlayerStore.getState().season;

    const data = await loadLevel(id, currentSeason);

    set({isMiniGame: Number(id) > 4});
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
      spirits: newSpirits,
      obstacles: obstaclesWithVisible,
      enemies: activeEnemies,
      isLoaded: true
    });
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
