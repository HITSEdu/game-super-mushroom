import {
  ANIMATION_SPEED,
  DEFAULT_SPRITE_SIZE
} from "../../../constants/values.ts";
import {usePlayerAnimation} from "../../../hooks/usePlayerAnimation.ts";
import {PLAYER_ANIMATIONS} from "../../systems/playerAnimations.ts";
import {Sprite, type Texture} from "pixi.js";
import type {ObjectSize} from "../../../constants/interfaces.ts";
import {extend} from "@pixi/react";

extend({Sprite});

export const Player = (
  {x, y, texture, size}: {
    x: number,
    y: number,
    texture: Texture,
    size: ObjectSize
  }) => {

  const spriteTexture = usePlayerAnimation({
    texture,
    frameWidth: DEFAULT_SPRITE_SIZE,
    frameHeight: DEFAULT_SPRITE_SIZE,
    animations: PLAYER_ANIMATIONS,
    animationSpeed: ANIMATION_SPEED,
  });

  return (
    <pixiSprite
      zIndex={10}
      x={x}
      y={y}
      texture={spriteTexture}
      width={size.width}
      height={size.height}
      eventMode="static"
    />
  );
};
