import type {ObjectSize} from "./interfaces.ts";
import type {PointData} from "pixi.js";
import type {SeasonType} from "./types.ts";

export const DEFAULT_PLAYER_SIZE: ObjectSize = {width: 24, height: 48}
export const DEFAULT_PLAYER_MINI_GAME_SIZE: ObjectSize = {width: 22, height: 22}

export const DEFAULT_ENEMY_MINI_GAME_SIZE: ObjectSize = {width: 24, height: 24}

export const UNDERWORLD_SPAWN = {
  x: 24,
  y: 432,
}

export const DEFAULT_START_POSITION: PointData = {
  x: 24,
  y: 432,
};

export const DEFAULT_END_POSITION: PointData = {
  x: 960,
  y: 432
};

export const TILE_SIZE = 24;
export const COLS = 42;
export const ROWS = 21;

export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;

export const DEFAULT_GROUND_HEIGHT = window.innerHeight * 0.2;

export const PLAYER_COUNT = 3;

export const ICON_STYLES =
  "        h-xs:w-4 h-sm:h-4\n" +
  "        h-sm:w-6 h-sm:h-6\n" +
  "        h-md:w-8 h-md:h-8\n" +
  "        h-lg:w-10 h-lg:h-10\n" +
  "        h-xl:w-12 h-xl:h-12"

export const H1_STYLES =
  "h-xs:text-4xl h-xs:mt-3\n" +
  "h-sm:text-5xl h-sm:mt-2\n" +
  "h-md:text-6xl h-md:mt-2\n" +
  "h-lg:text-7xl h-lg:mt-1\n" +
  "h-xl:text-8xl h-xl:mt-1"

export const TOTAL_SLOTS = 13;

export const MUSIC_COUNT = 4;
export const ANIMATION_SPEED = 4;
export const DEFAULT_SPRITE_SIZE = 64

export const SONG_NAMES = [
  {id: 0, label: "turnOff", key: "music0"},
  {id: 1, label: "winter", key: "music1"},
  {id: 2, label: "spring", key: "music2"},
  {id: 3, label: "summer", key: "music3"},
  {id: 4, label: "autumn", key: "music4"},
];

export const SEASONS: {
  key: SeasonType;
  label: string;
  background: string;
}[] = [
  {
    key: 'underworld',
    label: 'underworld',
    background: 'backgrounds/12.png',
  },
  {
    key: 'winter',
    label: 'winter',
    background: 'backgrounds/4.png',
  },
  {
    key: 'spring',
    label: 'spring',
    background: 'backgrounds/7.png',
  },
  {
    key: 'summer',
    label: 'summer',
    background: 'backgrounds/8.png',
  },
  {
    key: 'autumn',
    label: 'autumn',
    background: 'backgrounds/13.png',
  },
];
