export type GameStatus = 'playing' | 'paused' | 'won' | 'lost' | 'modalOpen'

export type GlobalType = 'menu' | 'levelSelect' | 'playing'

export type MenuType = 'main' | 'settings' | 'language' | 'confirm' | 'volume' | 'play'

export type PlayerStateType = 'alive' | 'dead' | 'won' | 'lost' | 'menu'

export type CollisionDirection = 'top' | 'bottom' | 'left' | 'right' | null;

export type SeasonType = 'spring' | 'autumn' | 'winter' | 'summer' | 'underworld'

export type Direction = "left" | "right" | "up" | "down";

export type Action = "idle" | "walk" | "jump" | "climb";