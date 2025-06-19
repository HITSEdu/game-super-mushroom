import {ANIMATION_SPEED, DEFAULT_SPRITE_SIZE} from "../../constants/values";
import {usePlayerAnimation} from "./usePlayerAnimation.ts";
import {PLAYER_ANIMATIONS} from "./utils/playerAnimations.ts";
import type {Texture} from "pixi.js";
import type {ObjectSize} from "../../constants/interfaces.ts";


export const Player = (
    {x, y, texture, size}: { x: number, y: number, texture: Texture, size: ObjectSize }) => {

    const spriteTexture = usePlayerAnimation({
        texture,
        frameWidth: DEFAULT_SPRITE_SIZE,
        frameHeight: DEFAULT_SPRITE_SIZE,
        animations: PLAYER_ANIMATIONS,
        animationSpeed: ANIMATION_SPEED,
    });

    return (
        <pixiContainer>
            <pixiSprite
                x={x}
                y={y}
                texture={spriteTexture}
                width={size.width}
                height={size.height}
                eventMode="static"
            />
        </pixiContainer>
    );
};
