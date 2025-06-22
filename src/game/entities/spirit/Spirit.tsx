import { Texture, Sprite, Assets } from "pixi.js";
import { extend } from "@pixi/react";
import { usePlayerAnimation } from "../../../hooks/usePlayerAnimation";
import { ANIMATION_SPEED, DEFAULT_SPRITE_SIZE } from "../../../constants/values";
import type { ObjectSize } from "../../../constants/interfaces";

extend({ Sprite });

interface SpiritProps {
  x: number;
  y: number;
  size: ObjectSize;
}

export const Spirit = ({ x, y, size }: SpiritProps) => {
  const textureKey = "spirit_mira";
  const baseTexture = Assets.get(textureKey);
  if (!baseTexture) {
    console.warn(`Spirit texture for key '${textureKey}' not found in Assets registry`);
    return null;
  }
  const texture = new Texture(baseTexture);
  const SPIRIT_ANIMATIONS = {
    "idle-right": { row: 24, frames: 2 },
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
      zIndex={10}
      eventMode="static"
    />
  );
};
