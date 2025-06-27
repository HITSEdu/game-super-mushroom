import {Application, type ApplicationRef, extend} from '@pixi/react';
import {Container, Sprite, Graphics, Texture, Assets} from 'pixi.js';
import {useEffect, useRef} from "react";
import {usePlayerStore} from "../store/PlayerStore.ts";
import Obstacle from "./entities/obstacle/Obstacle.tsx";
import {Enemy} from "./entities/enemy/Enemy.tsx";
import {useLevelStore} from "../store/LevelStore.ts";
import {
  initControlSystem,
  cleanupControlSystem
} from "./systems/ControlSystem.ts";
import {useGameSessionStore} from "../store/GameSessionStore.ts";
import {Player} from "./entities/player/Player.tsx";
import {useContainerSize} from "../hooks/useContainerSize.ts";
import InteractionHint from "../components/ui/InteractionHint.tsx";
import {Spirit} from './entities/spirit/Spirit.tsx';
import Item from "./entities/item/Item.tsx";
import {game_backgrounds} from "../constants/backgrounds.ts";
import {useMiniGameStore} from "../store/MiniGameStore.ts";
import { Snow } from './effects/Snow.tsx';
import { Rain } from './effects/Rain.tsx';

extend({
  Container,
  Sprite,
  Graphics,
});

const GameScene = () => {
  const {
    obstacles,
    enemies: levelEnemies,
    items: levelItems,
    spirits: levelSpirits,
    isLoaded,
    load
  } = useLevelStore();

  const {
    texture: playerTexture,
    textureString: playerTextureString,
    size: playerSize,
    setTexture,
    position: playerPosition,
    season: playerSeason,
  } = usePlayerStore();

  const {currentLevelID, status: gameStatus} = useGameSessionStore();

  const {
    carriedItem,
    currentMiniGame,
    deliveryZones,
    activeDeliveryZoneIndex
  } = useMiniGameStore();

  const appRef = useRef<ApplicationRef>(null);

  useEffect(() => {
    const app = appRef.current?.getApplication?.();
    if (app) {
      app.renderer.background.color = Number(game_backgrounds[playerSeason].replace('#', '0x'));
    }
  }, [playerSeason]);

  useEffect(() => {
    if (currentLevelID)
      load(currentLevelID).then(() => {
        if (playerTextureString)
          Assets.load(playerTextureString)
            .then(playerTex => {
              setTexture(playerTex as Texture);
            });

        initControlSystem();
      });

    return () => {
      cleanupControlSystem();
    };
  }, [currentLevelID, load, playerSeason, playerTextureString, setTexture]);

  const getTextureSafe = (alias: string): Texture => {
    return Assets.cache.has(alias) ? Assets.get(alias) : Texture.EMPTY;
  }

  const rainTiles = [];
  const snowTiles = []
  for (let row = 0; row < 42; row+=8) {
    for (let col = 0; col < 21 + 24; col+=8) {
      rainTiles.push(
        <Rain
          x={col * 24}
          y={row * 24}
        />
      );
      snowTiles.push(
        <Snow
          x={col * 24}
          y={row * 24}
        />
      );
    }
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const {offsetX, offsetY, scale} = useContainerSize(containerRef, isLoaded);

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
          {playerSeason === 'autumn' && rainTiles }
          {playerSeason === 'winter' && snowTiles }

          {playerTexture && gameStatus !== 'lost' &&
            <Player
              x={playerPosition.x}
              y={playerPosition.y}
              texture={playerTexture}
              size={playerSize}
            />}

          {levelEnemies.filter(e => e.state !== 'dead').map((enemy) => (
            <Enemy
              key={enemy.id}
              x={enemy.position.x}
              y={enemy.position.y}
              texture={getTextureSafe('enemy')}
              size={enemy.size}
            />
          ))}
          {obstacles.filter(e => e.visible).map((obs, i) => (
            <Obstacle
              key={i}
              x={obs.x}
              y={obs.y}
              size={{width: obs.width, height: obs.height}}
              texture={getTextureSafe(obs.type)}
            />
          ))}

          {levelItems.filter(e => e.visible).map((item) => (
            <Item
              key={`${item.id}-${item.x}-${item.y}`}
              x={item.x}
              y={item.y}
              size={item.size}
              texture={getTextureSafe(`${item.type}`)}
            />
          ))}

          {levelSpirits.filter(e => e.visible).map((spirit) => (
            <Spirit
              key={spirit.id}
              x={spirit.x}
              y={spirit.y}
              size={spirit.size}
              texture={getTextureSafe(`${spirit.type}`)}
            />
          ))}
          {carriedItem === 8 && currentMiniGame === 'autumn' && deliveryZones.length > 0 && (
            <Item
              x={deliveryZones[activeDeliveryZoneIndex]?.x}
              y={deliveryZones[activeDeliveryZoneIndex]?.y}
              texture={getTextureSafe('box_zone')}
              size={{width: 24, height: 24}}
            />
          )}
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
