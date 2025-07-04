import {extend} from '@pixi/react';
import {Graphics, Container, Sprite} from "pixi.js";
import {usePlayerStore} from '../../store/PlayerStore.ts';
import {useEffect, useRef} from 'react';
import {COLS, GAME_HEIGHT, GAME_WIDTH, ROWS} from "../../constants/values.ts";
import {getTextureSafe} from "../utils/getTextureSafe.ts";

extend({Graphics, Container, Sprite});

const TILE_SIZE = 24;
const FOG_ALPHA = 1;

const WinterFog = () => {
  const playerPosition = usePlayerStore(state => state.position);
  const containerRef = useRef<Container>(null);
  const maskRef = useRef<Graphics>(null);

  const texture = getTextureSafe('fog');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.removeChildren();

    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const sprite = new Sprite(texture);
        sprite.alpha = FOG_ALPHA;
        sprite.x = x * TILE_SIZE;
        sprite.y = y * TILE_SIZE;
        container.addChild(sprite);
      }
    }
  }, [texture]);

  const drawMask = (g: Graphics) => {
    g.clear();
    const centerX = playerPosition.x + TILE_SIZE / 2;
    const centerY = playerPosition.y + TILE_SIZE / 2;

    g.rect(0, 0, GAME_WIDTH, GAME_HEIGHT).fill(0xffffff);

    g.circle(centerX, centerY, TILE_SIZE * 2);
    g.cut();
  };

  useEffect(() => {
    if (containerRef.current && maskRef.current) {
      containerRef.current.mask = maskRef.current;
    }
  }, [containerRef.current, maskRef.current]);

  return (
    <>
      <pixiContainer
        ref={containerRef}
        zIndex={9999}
      >
      </pixiContainer>

      <pixiGraphics
        ref={maskRef}
        draw={drawMask}
        zIndex={10000}
      />
    </>
  );
};

export default WinterFog;