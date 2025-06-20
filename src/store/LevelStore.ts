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

export interface ObstacleData {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  visible: boolean;
}

export interface EnemyData {
  id: string;
  x: number;
  y: number;
  type: string;
  speed: number;
  range: number;
  size: ObjectSize;
}

interface LevelState {
  playerStart: Point;
  playerEnd: Point;
  levelType: SeasonType;
  obstacles: ObstacleData[];
  enemies: IEnemy[];
  gravity: number;
  isLoaded: boolean;
  load: (id: string) => Promise<void>;
  reset: () => void;
}

export const useLevelStore = create<LevelState>((set, get) => ({
  playerStart: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
  playerEnd: new Point(DEFAULT_END_POSITION.x, DEFAULT_END_POSITION.y),
  levelType: 'underworld',
  gravity: 1.5,
  obstacles: [],
  enemies: [],
  isLoaded: false,

  load: async (id: string) => {
    const data = await loadLevel(id);

    activeEnemies.length = 0;

    (data.enemies || []).forEach((e: EnemyData) => {
      const id = uuidv4();
      createEnemy(id, e.x, e.y, e.x - e.range / 2, e.x + e.range / 2, e.speed, e.type, e.size);
    });

    const obstaclesWithVisible = (data.obstacles || []).map((obs: ObstacleData) => ({
      ...obs,
      type: (obs.type === 'platform') || (obs.type === 'door') ? obs.type + '_' + data.levelType : obs.type,
      visible: obs.visible !== undefined ? obs.visible : true,
    }));

    set({
      levelType: data.levelType,
      playerStart: new Point(data.playerStart.x, data.playerStart.y),
      playerEnd: new Point(data.playerEnd.x, data.playerEnd.y),
      gravity: data.gravity,
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
      enemies: [],
      isLoaded: false
    });
  }
}));
