import {Sprite, Texture} from "pixi.js";
import {extend} from '@pixi/react';
import type {ObjectSize} from "../../../constants/interfaces.ts";

extend({Sprite});

export const Enemy = (
  {x, y, texture, size}: {
    x: number,
    y: number,
    texture: Texture,
    size: ObjectSize
  }
) => {
  return texture &&
    <pixiSprite
      x={x}
      y={y}
      texture={texture}
      width={size.width}
      height={size.height}
      eventMode={'static'}
      zIndex={10}
    />;
};
