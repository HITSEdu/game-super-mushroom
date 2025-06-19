import {Rectangle, Texture} from "pixi.js";
import {useEffect, useRef} from "react";
import {useTick} from "@pixi/react";
import {usePlayerStore} from "../../store/PlayerStore.ts";
import {isMoving} from "../systems/ControlSystem.ts";
import type {Action} from "./utils/typeAction.ts";
import type {Direction} from "./utils/typeDirection.ts";
import type {AnimationsMap} from "./utils/playerAnimations.ts";


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

    const {velocityX, velocityY, onGround} = usePlayerStore.getState();
    const moving = isMoving();
    const isMiniGame = false;
    const climbing = false;

    let action: Action = 'idle';
    let direction: Direction = 'right';

    if (climbing) {
        action = "climb";
        direction = velocityY < 0 ? "up" : "down";
    } else if (!onGround) {
        action = "jump";
        direction = velocityX < 0 ? "left" : "right";
    } else if (moving) {
        action = "walk";
        direction = velocityX < 0 ? "left" : "right";
    }

    let key = `${action}-${direction}`;
    if (isMiniGame) {
        key += `-mini-game`;
    }

    console.log(key);
    const anim = animations[key] || animations["idle-right"];

    if (key !== lastKey.current ||
        (direction === "right" && velocityX < 0) ||
        (direction === "left" && velocityX > 0)) {
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
            source: texture.baseTexture,
            frame: frame,
        });
    });

    // useEffect(() => {
    //     return () => {
    //         if (currentTexture.current !== Texture.EMPTY) {
    //             currentTexture.current.destroy(true);
    //         }
    //     };
    // }, []);

    return currentTexture.current;
}