import {Sprite, Texture} from "pixi.js";
import type {ObjectSize} from "../../../constants/interfaces.ts";
import {extend} from '@pixi/react';

extend({Sprite});

const Obstacle = ({x, y, texture, size}: { x: number, y: number, texture: Texture, size: ObjectSize }) => {
    return (
        texture &&
        <pixiSprite x={x} y={y} texture={texture} width={size.width}
                    height={size.height} eventMode={'static'}/>
    );
}

export default Obstacle;