import {useGameSessionStore} from "../../../store/GameSessionStore";
import SkyElement from "./SkyElement";
import {Texture} from "pixi.js";
import {TILE_SIZE} from "../../../constants/values.ts";

interface MovingSkyElementProps {
  sunTexture: Texture;
  moonTexture: Texture;
  containerWidth: number;
  containerHeight: number;
}

const TOTAL_CYCLE_MS = 120_000 * 2;

const SPRITE_WIDTH = 5 * TILE_SIZE;

const PHASE_LENGTH = TOTAL_CYCLE_MS / 2;

const MovingSkyElement = ({
                            sunTexture,
                            moonTexture,
                            containerWidth,
                            containerHeight,
                          }: MovingSkyElementProps) => {
  const curTime = useGameSessionStore(state => state.curTime);
  const cycleTime = curTime % TOTAL_CYCLE_MS;

  const skyHeight = containerHeight * 0.15;
  const amplitude = containerHeight * 0.08;

  function calcPosition(progress: number) {
    const x = progress * (containerWidth + 2 * SPRITE_WIDTH) - SPRITE_WIDTH;
    const y = skyHeight + Math.sin(progress * Math.PI) * -amplitude;
    return {x, y};
  }

  if (cycleTime < PHASE_LENGTH) {
    const sunT = cycleTime / PHASE_LENGTH;
    const {x, y} = calcPosition(sunT);
    return <SkyElement
      x={x}
      y={y}
      texture={sunTexture}
    />;
  } else {
    const moonT = (cycleTime - PHASE_LENGTH) / PHASE_LENGTH;
    const {x, y} = calcPosition(moonT);
    return <SkyElement
      x={x}
      y={y}
      texture={moonTexture}
    />;
  }
};

export default MovingSkyElement;