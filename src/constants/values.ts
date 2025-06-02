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