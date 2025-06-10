import {Sprite, Texture} from "pixi.js";
import {extend} from '@pixi/react';
import type {ObjectSize} from "../../constants/interfaces.ts";
import { Container } from "lucide-react";

extend({Sprite});

export const Player = ({x, y, texture, size}: { x: number, y: number, texture: Texture, size: ObjectSize }) => {
    return (
        <Container>
            <pixiSprite
                x={x} y={y} 
                texture={texture} 
                width={size.width}
                height={size.height} 
                eventMode={'static'}
            />
        </Container>
    );
};
