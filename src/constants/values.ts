import type {ObjectSize} from "./interfaces.ts";
import type {PointData} from "pixi.js";

export const DEFAULT_PLAYER_SIZE: ObjectSize = {width: 50, height: 50}
export const DEFAULT_ENEMY_SIZE: ObjectSize = {width: 50, height: 50}

export const DEFAULT_START_POSITION: PointData = {x: window.innerWidth * 0.1, y: window.innerHeight * 0.7};

export const TILE_SIZE = 32
export const COLS = 32
export const ROWS = 17

export const GAME_WIDTH = TILE_SIZE * COLS - TILE_SIZE
export const GAME_HEIGHT = TILE_SIZE * ROWS - TILE_SIZE

export const DEFAULT_GROUND_HEIGHT = window.innerHeight * 0.8;

export const PLAYER_COUNT = 3;

export const ICON_STYLES =
    "        h-xs:w-4 h-sm:h-4\n" +
    "        h-sm:w-6 h-sm:h-6\n" +
    "        h-md:w-8 h-md:h-8\n" +
    "        h-lg:w-10 h-lg:h-10\n" +
    "        h-xl:w-12 h-xl:h-12"