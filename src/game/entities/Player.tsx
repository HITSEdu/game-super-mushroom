import {Sprite, Texture, Container} from "pixi.js";
import {extend} from '@pixi/react';
import type {ObjectSize} from "../../constants/interfaces.ts";

extend({Sprite, Container});

export const Player = ({x, y, texture, size}: { x: number, y: number, texture: Texture, size: ObjectSize }) => {
    return (
        <pixiContainer>
            <pixiSprite
                x={x} y={y} 
                texture={texture} 
                width={size.width}
                height={size.height} 
                eventMode={'static'}
            />
        </pixiContainer>
    );
};
