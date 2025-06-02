export type GameStatus = 'playing' | 'paused' | 'won' | 'lost'

export type GlobalType = 'menu' | 'levelSelect' | 'playing'

export type MenuType = 'main' | 'settings' | 'language' | 'confirm'

export type PlayerStateType = 'alive' | 'dead' | 'won' | 'lost' | 'menu'

export type CollisionDirection = 'top' | 'bottom' | 'left' | 'right' | null;