import {Sprite, Texture} from "pixi.js";
import {extend} from '@pixi/react';
import { TILE_SIZE } from "../../../constants/values";

extend({Sprite});

const SkyElement = ({x, y, texture}: {
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
      width={TILE_SIZE * 5}
      height={TILE_SIZE * 5}
      eventMode={'static'}
      zIndex={-2}
    />
  );
}

export default SkyElement;