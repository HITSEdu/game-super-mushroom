import {create} from 'zustand';
import {Point} from 'pixi.js';
import {loadLevel} from '../game/utils/loader.ts';
import {v4 as uuidv4} from 'uuid';
import {DEFAULT_START_POSITION} from "../constants/values.ts";
import {createEnemy, enemies as activeEnemies} from "../game/entities/enemy/enemies.ts";
import type {ObjectSize} from "../constants/interfaces.ts";
import {usePlayerStore} from "./PlayerStore.ts";
import {type IEnemy} from '../constants/interfaces.ts'

interface ObstacleData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    type: string;
    visible: boolean;
}

interface EnemyData {
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
    obstacles: ObstacleData[];
    enemies: IEnemy[];
    gravity: number;
    isLoaded: boolean;
    load: (id: number) => Promise<void>;
    reset: () => void;
}

export const useLevelStore = create<LevelState>((set, get) => ({
    playerStart: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
    gravity: 0,
    obstacles: [],
    enemies: [],
    isLoaded: false,

    load: async (id: number) => {
        const data = await loadLevel(id);
        const setPlayerPosition = usePlayerStore.getState().setPosition;
        setPlayerPosition({x: data.playerStart.x, y: data.playerStart.y});

        set({gravity: data.gravity});

        activeEnemies.length = 0;

        (data.enemies || []).forEach((e: EnemyData) => {
            const id = uuidv4();
            createEnemy(id, e.x, e.y, e.x - e.range / 2, e.x + e.range / 2, e.speed, e.type, e.size);
        });

        const obstaclesWithVisible = (data.obstacles || []).map((obs: ObstacleData) => ({
            ...obs,
            visible: obs.visible !== undefined ? obs.visible : true,
        }));

        set({
            playerStart: new Point(data.playerStart.x, data.playerStart.y),
            obstacles: obstaclesWithVisible,
            enemies: activeEnemies,
            isLoaded: true
        });
    },

    reset: () => {
        activeEnemies.length = 0;

        set({
            playerStart: new Point(get().playerStart.x, get().playerStart.y),
            obstacles: [],
            enemies: [],
            isLoaded: false
        });
    }
}));
