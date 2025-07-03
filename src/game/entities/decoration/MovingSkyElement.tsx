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

  const sunProgress = cycleTime / TOTAL_CYCLE_MS;
  const moonProgress = (cycleTime + PHASE_LENGTH) % TOTAL_CYCLE_MS / TOTAL_CYCLE_MS;

  return (
    <>
      <SkyElement {...calcPosition(sunProgress)} texture={sunTexture} />
      <SkyElement {...calcPosition(moonProgress)} texture={moonTexture} />
    </>
  );
};

export default MovingSkyElement;