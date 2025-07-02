import {Sprite, Texture} from "pixi.js";
import {extend, useTick} from '@pixi/react';
import type {ObjectSize} from "../../../constants/interfaces.ts";
import {useRef} from "react";

extend({Sprite});

export const Enemy = (
  {x, y, texture, size, type}: {
    x: number,
    y: number,
    texture: Texture,
    size: ObjectSize
    type: string
  }
) => {
  const spriteRef = useRef<Sprite>(null);

  const shouldSpin = type.includes('trap2');
  const spinSpeed = 0.1;

  useTick((ticker) => {
    const delta = ticker.deltaTime;
    if (shouldSpin && spriteRef.current) {
      spriteRef.current.rotation += spinSpeed * delta;
    }
  });

  return texture &&
    <pixiSprite
      ref={spriteRef}
      x={x + size.width / 2}
      y={y + size.height / 2}
      anchor={0.5}
      texture={texture}
      width={size.width}
      height={size.height}
      eventMode={'static'}
      zIndex={10}
    />;
};