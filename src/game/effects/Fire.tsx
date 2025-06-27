import { extend } from "@pixi/react";
import { Assets, Sprite as PixiSprite } from "pixi.js";
import { TILE_SIZE } from "../../constants/values";
import { useAnimation } from "../../hooks/useAnimation";

extend({ Sprite: PixiSprite });

interface FireProps {
  x: number;
  y: number;
}

export const Fire = ({ x, y }: FireProps) => {

    const texture = Assets.get("fire")
    const frameWidth = TILE_SIZE
    const frameHeight = TILE_SIZE
    const frameCount = 8
    const animationSpeed = 6

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
      width={TILE_SIZE}
      height={TILE_SIZE}
      zIndex={0}
      eventMode="static"
    />
  );
};