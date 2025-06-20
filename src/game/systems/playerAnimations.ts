interface AnimationConfig {
  row: number;
  frames: number;
}

export interface AnimationsMap {
  [key: string]: AnimationConfig;
}

export const PLAYER_ANIMATIONS = {
  "idle-right": {row: 24, frames: 2},
  "idle-left": {row: 24, frames: 2},
  "walk-right": {row: 11, frames: 9},
  "walk-left": {row: 9, frames: 9},
  "climb-up": {row: 22, frames: 6},
  "climb-down": {row: 22, frames: 6},
  "jump-right": {row: 28, frames: 5},
  "jump-left": {row: 28, frames: 5},

  "idle-up-mini-game": {row: 23, frames: 2},
  "idle-down-mini-game": {row: 25, frames: 2},
  "walk-up-mini-game": {row: 9, frames: 9},
  "walk-down-mini-game": {row: 11, frames: 9},
};