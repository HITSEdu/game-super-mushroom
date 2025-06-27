import { useTick } from "@pixi/react";
import { Texture, Rectangle } from "pixi.js";
import { useRef } from "react";

export function useAnimation({
  texture,
  frameWidth,
  frameHeight,
  frameCount,
  animationSpeed
}: {
  texture: Texture;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  animationSpeed: number;
}) {
  const frameIndex = useRef(0);
  const elapsed = useRef(0);
  const current = useRef<Texture>(Texture.EMPTY);

  useTick((ticker) => {
    const delta = ticker.deltaMS / (1000 / 60);
    elapsed.current += delta;
    if (elapsed.current >= animationSpeed) {
      elapsed.current = 0;
      frameIndex.current = (frameIndex.current + 1) % frameCount;
    }
    const rect = new Rectangle(
      frameIndex.current * frameWidth,
      0,
      frameWidth,
      frameHeight
    );
    current.current = new Texture({ source: texture.source, frame: rect });
  });

  return current.current;
}