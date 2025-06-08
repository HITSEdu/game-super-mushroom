import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Point, Texture} from 'pixi.js';
import {DEFAULT_PLAYER_SIZE, DEFAULT_START_POSITION} from "../constants/values.ts";
import type {ObjectSize} from "../constants/interfaces.ts";
import {handlePlayerEnemyCollision, handleObstacleCollision} from "../game/systems/collision.ts";
import {useGameSessionStore} from "./GameSessionStore.ts";

interface PlayerStore {
    name: string;
    texture: Texture | null;
    textureString: string | null;
    position: Point;
    velocityY: number;
    velocityX: number;
    speed: number;
    jumpPower: number;
    onGround: boolean;
    size: ObjectSize;
    stacked: boolean;

    setName: (name: string) => void;
    setPosition: (position: { x: number; y: number }) => void;
    setTexture: (texture: Texture) => void;
    setOnGround: (newState: boolean) => void;
    setVelocity: (direction: 'x' | 'y', newState: number) => void;
    reset: () => void;
    jump: () => void;
    come: (direction: 'left' | 'right') => void;
    tick: () => void;

    init: (name: string, texture: Texture, textureString: string, speed: number, jumpPower: number, size: ObjectSize) => void;
    change: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            name: '',
            texture: null,
            textureString: null,
            size: {width: DEFAULT_PLAYER_SIZE.width, height: DEFAULT_PLAYER_SIZE.height},
            position: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
            velocityY: 0,
            velocityX: 0,
            speed: 10,
            jumpPower: 20,
            onGround: true,
            stacked: false,

            init: (name, texture, textureString, speed, jumpPower, size) => {
                set({
                    name,
                    texture,
                    textureString,
                    size,
                    speed,
                    jumpPower,
                })
            },
            change: () => set({textureString: null}),

            setName: (name) => set({name}),
            setPosition: (position) => set({position: new Point(position.x, position.y)}),
            setOnGround: (newState) => set({onGround: newState}),
            setVelocity: (direction: 'x' | 'y', newState: number) => {
                if (direction === 'y') set({velocityY: newState})
                else if (direction === 'x') set({velocityX: newState})
            },
            setTexture: (texture) => set({texture}),
            reset: () => set({
                position: new Point(DEFAULT_START_POSITION.x, DEFAULT_START_POSITION.y),
                velocityY: 0,
                velocityX: 0,
                onGround: true,
                stacked: false
            }),
            jump: () => {
                const {onGround, jumpPower} = get();
                if (onGround) {
                    set({velocityY: -jumpPower, onGround: false});
                }
            },
            come: (direction) => {
                const {speed, velocityX} = get();
                let changedSpeed;
                if (velocityX < 0 && direction === 'right' || velocityX > 0 && direction === 'left') {
                    changedSpeed = speed * 0.6;
                }
                else changedSpeed = Math.min(speed, Math.max(speed * 0.6, Math.abs(velocityX) * 1.2));
                const newVelocityX = direction === 'left' ? -changedSpeed : changedSpeed;
                set({velocityX: newVelocityX});
            },
            tick: () => {
                handlePlayerEnemyCollision();

                const {position, velocityX, velocityY, size} = get();
                const {win, getStar} = useGameSessionStore.getState();

                const result = handleObstacleCollision(
                    position,
                    size,
                    velocityX,
                    velocityY,
                    true,
                );

                if (result.obsType === 'finish') win();
                else if (result.obsType === 'star') getStar();
                else set({stacked: result.stacked});

                set({
                    position: result.position,
                    velocityX: result.velocityX,
                    velocityY: result.velocityY,
                    onGround: result.onGround
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
            }),
            merge: (persistedState, currentState) => {
                const s = persistedState as PlayerStore;
                return {
                    ...currentState,
                    ...s,
                    position: new Point(s.position?.x ?? 0, s.position?.y ?? 0),
                };
            },
        }
    )
);