import { extend } from "@pixi/react";
import { Assets, Sprite as PixiSprite } from "pixi.js";
import { TILE_SIZE } from "../../constants/values";
import { useAnimation } from "../../hooks/useAnimation";

extend({ Sprite: PixiSprite });

interface SnowProps {
  x: number;
  y: number;
}

export const Snow = ({ x, y }: SnowProps) => {

    const texture = Assets.get("snow")
    const frameWidth = TILE_SIZE * 8
    const frameHeight = TILE_SIZE * 8
    const frameCount = 16
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
      width={frameWidth}
      height={frameHeight}
      zIndex={-1}
      eventMode="static"
    />
  );
};
