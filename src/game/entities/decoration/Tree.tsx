import {Sprite, Texture} from "pixi.js";
import {extend} from '@pixi/react';
import { TILE_SIZE } from "../../../constants/values";

extend({Sprite});

const Tree = ({x, y, texture}: {
  x: number,
  y: number,
  texture: Texture,
}) => {
  return (
    texture &&
    <pixiSprite
      x={x}
      y={y}
      texture={texture}
      width={TILE_SIZE * 4}
      height={TILE_SIZE * 4}
      eventMode={'static'}
      zIndex={1}
    />
  );
}

export default Tree;