import {Application, type ApplicationRef, extend} from '@pixi/react';
import {Container, Sprite, Graphics} from 'pixi.js';
import {useEffect, useMemo, useRef} from "react";
import {usePlayerStore} from "../store/PlayerStore.ts";
import {useLevelStore} from "../store/LevelStore.ts";
import {
  initControlSystem,
  cleanupControlSystem
} from "./systems/ControlSystem.ts";
import {useGameSessionStore} from "../store/GameSessionStore.ts";
import {useContainerSize} from "../hooks/useContainerSize.ts";
import InteractionHint from "../components/ui/InteractionHint.tsx";
import {game_backgrounds} from "../constants/backgrounds.ts";
import {useMiniGameStore} from "../store/MiniGameStore.ts";
import ObstaclesList from "./entities/obstacle/ObstaclesList.tsx";
import ItemsList from "./entities/item/ItemsList.tsx";
import SpiritsList from "./entities/spirit/SpiritsList.tsx";
import EnemiesList from "./entities/enemy/EnemiesList.tsx";
import DecorationsList from "./entities/decoration/DecorationsList.tsx";
import PlayerWrapper from "./entities/player/PlayerWrapper.tsx";
import MiniGameStage from "./stages/MiniGameStage.tsx";
import WeatherEffect from "./effects/WeatherEffect.tsx";
import SkyAndClouds from "./effects/SkyAndClouds .tsx";

extend({
  Container,
  Sprite,
  Graphics,
});

const GameScene = () => {
  const isLoaded = useLevelStore(state => state.isLoaded);
  const load = useLevelStore(state => state.load);

  const playerSeason = usePlayerStore(state => state.season);

  const currentLevelID = useGameSessionStore(state => state.currentLevelID);

  const currentMiniGame = useMiniGameStore(state => state.currentMiniGame);

  const appRef = useRef<ApplicationRef>(null);

  useEffect(() => {
    const app = appRef.current?.getApplication?.();
    if (app) {
      app.renderer.background.color = Number(game_backgrounds[playerSeason].replace('#', '0x'));
    }
  }, [playerSeason]);

  useEffect(() => {
    const initializeControls = () => {
      initControlSystem();
    };

    initializeControls();

    return () => {
      cleanupControlSystem();
    };
  }, []);

  useEffect(() => {
    if (!currentLevelID || currentMiniGame) return;
    load(currentLevelID);

  }, [currentLevelID, playerSeason, load, currentMiniGame]);

  const containerRef = useRef<HTMLDivElement>(null);
  const {offsetX, offsetY, scale} = useContainerSize(containerRef, isLoaded);

  const containerSize = useMemo(() => ({
    width: containerRef.current?.clientWidth ?? window.innerWidth,
    height: containerRef.current?.clientHeight ?? window.innerHeight
  }), []);

  if (!isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative z-10"
    >
      <Application
        resizeTo={containerRef}
        ref={appRef}
        backgroundColor={game_backgrounds[playerSeason]}
      >
        <pixiContainer
          x={offsetX}
          y={offsetY}
          scale={scale}
          sortableChildren={true}
        >
          {!currentMiniGame && playerSeason !== 'underworld' &&
            <>
              <WeatherEffect season={playerSeason} />
              <SkyAndClouds
                containerWidth={containerSize.width}
                containerHeight={containerSize.height}
                isLoaded={isLoaded}
              />
            </>
          }

          {currentMiniGame && <MiniGameStage />}

          <PlayerWrapper />
          <EnemiesList />
          <ObstaclesList />
          <ItemsList />
          <SpiritsList />
          <DecorationsList />

        </pixiContainer>
      </Application>
      <InteractionHint
        offsetX={offsetX}
        offsetY={offsetY}
        scale={scale}
      />
    </div>
  );
}

export default GameScene;