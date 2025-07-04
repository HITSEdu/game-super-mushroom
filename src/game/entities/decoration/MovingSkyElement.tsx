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

const TOTAL_CYCLE_MS = 240_000;
const HALF_CYCLE = TOTAL_CYCLE_MS / 2;

const SPRITE_WIDTH = 5 * TILE_SIZE;

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

  if (cycleTime < HALF_CYCLE) {
    const progress = cycleTime / HALF_CYCLE;
    return <SkyElement {...calcPosition(progress)} texture={sunTexture} />;
  } else {
    const progress = (cycleTime - HALF_CYCLE) / HALF_CYCLE;
    return <SkyElement {...calcPosition(progress)} texture={moonTexture} />;
  }
};

export default MovingSkyElement;