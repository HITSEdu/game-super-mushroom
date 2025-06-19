import {Rectangle, Texture} from "pixi.js";
import {useRef, useMemo} from "react";
import {useTick} from "@pixi/react";
import {usePlayerStore} from "../store/PlayerStore.ts";
import type {AnimationsMap} from "../game/systems/playerAnimations.ts";
import type {Action, Direction} from "../constants/types.ts";

interface UsePlayerAnimationProps {
    texture: Texture;
    frameWidth: number;
    frameHeight: number;
    animations: AnimationsMap;
    animationSpeed: number;
}

export function usePlayerAnimation({
                                       texture,
                                       frameWidth,
                                       frameHeight,
                                       animations,
                                       animationSpeed
                                   }: UsePlayerAnimationProps) {
    const frameIndex = useRef(0);
    const elapsed = useRef(0);
    const currentTexture = useRef<Texture>(Texture.EMPTY);
    const lastKey = useRef<string>("");

    const velocityX = usePlayerStore(state => state.velocityX);
    const velocityY = usePlayerStore(state => state.velocityY);
    const onGround = usePlayerStore(state => state.onGround);

    const isMoving = Math.abs(velocityX) > 0.5;
    const climbing = false;
    const isMiniGame = false;

    const {action, direction} = useMemo(() => {
        let action: Action = 'idle';
        let direction: Direction = 'right';

        const isActuallyJumping = !onGround && Math.abs(velocityY) > 0.1;

        if (climbing) {
            action = "climb";
            direction = velocityY < 0 ? "up" : "down";
        } else if (isActuallyJumping) {
            action = "jump";
            direction = velocityX < 0 ? "left" : "right";
        } else if (isMoving) {
            action = "walk";
            direction = velocityX < 0 ? "left" : "right";
        }

        return {action, direction};
    }, [velocityX, velocityY, onGround, isMoving, climbing]);

    let key = `${action}-${direction}`;
    if (isMiniGame) key += "-mini-game";

    const anim = animations[key] || animations["idle-right"];

    if (key !== lastKey.current) {
        frameIndex.current = 0;
        elapsed.current = 0;
        lastKey.current = key;
    }

    useTick((ticker) => {
        const delta = ticker.deltaMS / (1000 / 60);
        elapsed.current += delta;

        if (elapsed.current >= animationSpeed) {
            elapsed.current = 0;
            frameIndex.current = (frameIndex.current + 1) % anim.frames;
        }

        const frame = new Rectangle(
            frameIndex.current * frameWidth,
            anim.row * frameHeight,
            frameWidth,
            frameHeight
        );

        currentTexture.current = new Texture({
            source: texture.source,
            frame,
        });
    });

    return currentTexture.current;
}