import {type RefObject, useEffect, useState} from "react";
import {GAME_HEIGHT, GAME_WIDTH} from "../constants/values.ts";
import {usePlayerStore} from "../store/PlayerStore.ts";

export function useContainerSize(ref: RefObject<HTMLDivElement | null>, isLoaded: boolean) {
  const [size, setSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const {width, height} = entries[0].contentRect;
      setSize({width, height});
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, isLoaded]);

  const scale = {
    x: size.width / 1008,
    y: size.height / 504,
  };

  const levelWidth = GAME_WIDTH * scale.x;
  const levelHeight = GAME_HEIGHT * scale.y;

  const viewWidth = size.width;
  const viewHeight = size.height;

  const playerSize = usePlayerStore.getState().size;

  const playerWidth = playerSize.width * scale.x;
  const playerHeight = playerSize.height * scale.y;

  const playerPosition = usePlayerStore.getState().position;

  let offsetX = viewWidth / 2 - playerPosition.x * scale.x - playerWidth / 2;
  let offsetY = viewHeight / 2 - playerPosition.y * scale.y - playerHeight / 2;

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const minOffsetX = viewWidth - levelWidth;
  const minOffsetY = viewHeight - levelHeight;

  offsetX = clamp(offsetX, minOffsetX, 0);
  offsetY = clamp(offsetY, minOffsetY, 0);

  return {offsetX, offsetY, scale};
}
