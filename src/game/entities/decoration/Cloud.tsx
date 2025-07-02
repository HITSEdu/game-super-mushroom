import {Sprite, Texture} from "pixi.js";
import {extend, useTick} from "@pixi/react";
import {useRef} from "react";

extend({Sprite});

interface CloudProps {
  x: number;
  y: number;
  texture: Texture;
  width: number;
  height: number;
  speed: number;
  boundsWidth: number;
}

const Cloud = ({
                 x,
                 y,
                 texture,
                 width,
                 height,
                 speed,
                 boundsWidth
               }: CloudProps) => {
  const sprite = useRef<Sprite>(null!);

  useTick((ticker) => {
    if (!sprite.current) return;
    sprite.current.x += speed * (ticker.deltaMS / 1000);
    if (sprite.current.x > boundsWidth) {
      sprite.current.x = -width;
    }
  });

  return (
    <pixiSprite
      ref={sprite}
      x={x}
      y={y}
      texture={texture}
      width={width}
      height={height}
      eventMode="static"
      zIndex={0}
    />
  );
};

export default Cloud;
