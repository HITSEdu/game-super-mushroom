import {Texture, Sprite} from "pixi.js";
import {extend} from "@pixi/react";
import {usePlayerAnimation} from "../../../hooks/usePlayerAnimation";
import {ANIMATION_SPEED, DEFAULT_SPRITE_SIZE} from "../../../constants/values";
import type {ObjectSize} from "../../../constants/interfaces";

extend({Sprite});

interface SpiritProps {
  x: number;
  y: number;
  texture: Texture;
  size: ObjectSize;
}

export const Spirit = ({x, y, texture, size}: SpiritProps) => {
  const SPIRIT_ANIMATIONS = {
    "idle-right": {row: 24, frames: 2},
  };

  const spriteTexture = usePlayerAnimation({
    texture,
    frameWidth: DEFAULT_SPRITE_SIZE,
    frameHeight: DEFAULT_SPRITE_SIZE,
    animations: SPIRIT_ANIMATIONS,
    animationSpeed: ANIMATION_SPEED,
  });

  return (
    <pixiSprite
      x={x}
      y={y}
      texture={spriteTexture}
      width={size.width}
      height={size.height}
      zIndex={9}
      eventMode="static"
    />
  );
};
