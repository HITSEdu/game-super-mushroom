import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {type PointData, Texture} from 'pixi.js';
import {
  DEFAULT_PLAYER_SIZE,
  DEFAULT_START_POSITION, GAME_HEIGHT, GAME_WIDTH, TILE_SIZE
} from "../constants/values.ts";
import type {IInteraction, ObjectSize} from "../constants/interfaces.ts";
import {
  handlePlayerEnemyCollision,
  handleObstacleCollision
} from "../game/systems/CollisionSystem.ts";
import type {Direction, SeasonType} from '../constants/types.ts';

interface PlayerStore {
  name: string;
  texture: Texture | null;
  textureString: string | null;
  position: PointData;
  velocityY: number;
  velocityX: number;
  speed: number;
  jumpPower: number;
  onGround: boolean;
  size: ObjectSize;
  stacked: { x: boolean; y: boolean; };
  season: SeasonType;
  onLadder: boolean;
  id: number;
  nearInteractive: IInteraction[];

  setName: (name: string) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setTexture: (texture: Texture) => void;
  setOnGround: (newState: boolean) => void;
  setVelocity: (direction: 'x' | 'y', newState: number) => void;
  setSeason: (newSeason: SeasonType) => void;
  setId: (newId: number) => void;
  reset: () => void;
  jump: () => void;
  setOnLadder: (val: boolean) => void,
  come: (direction: Direction) => void;
  tick: (dt: number) => void;

  init: (name: string, texture: Texture, textureString: string, speed: number, jumpPower: number, size: ObjectSize, season: SeasonType, id: number) => void;
  change: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      name: '',
      texture: null,
      textureString: null,
      size: DEFAULT_PLAYER_SIZE,
      nearInteractive: [],
      position: DEFAULT_START_POSITION,
      velocityY: 0,
      velocityX: 0,
      onLadder: false,
      speed: 96,
      jumpPower: 480,
      onGround: true,
      stacked: {x: false, y: false},
      season: 'underworld',
      id: 1,

      init: (name, texture, textureString, speed, jumpPower, size, season, id) => {
        set({
          name,
          position: DEFAULT_START_POSITION,
          velocityX: 0,
          velocityY: 0,
          nearInteractive: [],
          onLadder: false,
          onGround: true,
          stacked: {x: false, y: false},
          texture,
          textureString,
          size,
          speed,
          jumpPower,
          season,
          id,
        })
      },
      change: () => set({textureString: null}),

      setName: (name) => set({name}),
      setPosition: (position) => {
        const clampedX = Math.min(GAME_WIDTH - TILE_SIZE, Math.max(0, position.x));
        const clampedY = Math.min(GAME_HEIGHT - TILE_SIZE, Math.max(0, position.y));

        set({position: {x: clampedX, y: clampedY}});
      },
      setOnGround: (newState) => set({onGround: newState}),
      setVelocity: (direction: 'x' | 'y', newState: number) => {
        if (direction === 'y') set({velocityY: newState})
        else if (direction === 'x') set({velocityX: newState})
      },
      setTexture: (texture) => set({texture}),
      setSeason: (newSeason) => {
        const prefix = 'player_';
        if (newSeason === 'underworld') {
          set({textureString: prefix + newSeason});
        } else {
          set({textureString: prefix + get().id + "_" + newSeason});
        }
        set({season: newSeason})
      },
      setId: (id) => set({id}),
      reset: () => set({
        position: DEFAULT_START_POSITION,
        velocityY: 0,
        velocityX: 0,
        onGround: true,
        stacked: {x: false, y: false},
        season: 'underworld',
        id: 1,
      }),
      setOnLadder: (val: boolean) => set({onLadder: val}),
      jump: () => {
        const {onGround, jumpPower} = get();
        if (onGround) {
          set({velocityY: -jumpPower, onGround: false});
        }
      },
      come: (direction: Direction) => {
        const {speed} = get();

        switch (direction) {
          case 'left':
            set({velocityX: -speed});
            break;
          case 'right':
            set({velocityX: speed});
            break;
          case 'up':
            set({velocityY: -speed});
            break;
          case 'down':
            set({velocityY: speed});
            break;
        }
      },

      tick: (dt: number) => {
        handlePlayerEnemyCollision();

        const result = handleObstacleCollision(
          get().position,
          get().size,
          get().velocityX,
          get().velocityY,
          dt,
          true,
        );

        set({stacked: result.stacked});

        get().setPosition(result.position);
        set({
          nearInteractive: result.nearInteractive ?? [],
          velocityX: result.velocityX,
          velocityY: result.velocityY,
          onGround: result.onGround,
          onLadder: result.onLadder
        });
      },
    }),
    {
      name: 'playerStore',
      partialize: (state) => ({
        name: state.name,
        size: state.size,
        textureString: state.textureString,
        velocityY: state.velocityY,
        velocityX: state.velocityX,
        speed: state.speed,
        jumpPower: state.jumpPower,
        onGround: state.onGround,
        position: {x: state.position.x, y: state.position.y},
        season: state.season,
        id: state.id,
      }),
      merge: (persistedState, currentState) => {
        const s = persistedState as PlayerStore;
        return {
          ...currentState,
          ...s,
          position: s.position ?? DEFAULT_START_POSITION,
        };
      },
    }
  )
);