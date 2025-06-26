interface AnimationConfig {
  row: number;
  frames: number;
}

export interface AnimationsMap {
  [key: string]: AnimationConfig;
}

export const PLAYER_ANIMATIONS: AnimationsMap = {
  "idle-right": {row: 24, frames: 2},
  "idle-left": {row: 24, frames: 2},
  "walk-right": {row: 11, frames: 9},
  "walk-left": {row: 9, frames: 9},
  "climb-up": {row: 21, frames: 6},
  "climb-down": {row: 21, frames: 6},
  "jump-right": {row: 28, frames: 5},
  "jump-left": {row: 28, frames: 5},

  "idle-up-mini-game": {row: 20, frames: 2},
  "idle-down-mini-game": {row: 22, frames: 2},
  "idle-left-mini-game": {row: 24, frames: 2},
  "idle-right-mini-game": {row: 22, frames: 2},

  "walk-up-mini-game": {row: 8, frames: 9},
  "walk-down-mini-game": {row: 10, frames: 9},
  "walk-left-mini-game": {row: 9, frames: 9},
  "walk-right-mini-game": {row: 11, frames: 9},
};
