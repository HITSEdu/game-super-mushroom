import {extend} from "@pixi/react";
import {Assets, Sprite as PixiSprite} from "pixi.js";
import {TILE_SIZE} from "../../../constants/values.ts";
import {useAnimation} from "../../../hooks/useAnimation.ts";

extend({Sprite: PixiSprite});

interface RainProps {
  x: number;
  y: number;
}

export const Rain = ({x, y}: RainProps) => {

  const texture = Assets.get("rain")

  const frameWidth = TILE_SIZE * 8
  const frameHeight = TILE_SIZE * 8
  const frameCount = 16
  const animationSpeed = 4

  const currentTexture = useAnimation({
    texture,
    frameWidth,
    frameHeight,
    frameCount,
    animationSpeed
  });

  return (
    <pixiSprite
      x={x}
      y={y}
      texture={currentTexture}
      width={frameWidth}
      height={frameHeight}
      zIndex={-1}
      eventMode="static"
    />
  );
};