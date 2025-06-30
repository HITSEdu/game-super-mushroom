import {Graphics} from "pixi.js";
import {extend} from "@pixi/react";
import {useGameSessionStore} from "../../../store/GameSessionStore";

extend({Graphics})

const TOTAL_CYCLE_MS = 120_000 * 2;

interface SkyOverlayProps {
  containerWidth: number;
  containerHeight: number;
}

const SkyOverlay = ({containerWidth, containerHeight}: SkyOverlayProps) => {
  const curTime = useGameSessionStore(state => state.curTime);
  const cycleTime = curTime % TOTAL_CYCLE_MS;

  const t = cycleTime / TOTAL_CYCLE_MS;

  const alpha = 0.05 + 0.4 * (1 - Math.cos(2 * Math.PI * (t - 0.25))) / 2;

  return (
    <pixiGraphics
      draw={g => {
        g.clear();
        g.fill({color: 'black', alpha});
        g.rect(0, 0, containerWidth * 2, containerHeight * 2);
        g.fill();
      }}
      zIndex={999}
    />
  );
};

export default SkyOverlay;