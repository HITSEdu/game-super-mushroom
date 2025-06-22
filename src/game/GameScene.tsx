import {Application, extend} from '@pixi/react';
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
        backgroundColor={'black'}
      >
        <pixiContainer
          x={offsetX}
          y={offsetY}
          scale={scale}
          sortableChildren={true}
        >
          {playerTexture && gameStatus !== 'lost' &&
            <Player
              x={playerPosition.x}
              y={playerPosition.y}
              texture={playerTexture}
              size={playerSize}
            />}

          {Texture.from('enemy') && levelEnemies.filter(e => e.state !== 'dead').map((enemy) => (
            <Enemy
              key={enemy.id}
              x={enemy.position.x}
              y={enemy.position.y}
              texture={Assets.get('enemy')}
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
              key={item.id}
              x={item.x}
              y={item.y}
              size={item.size}
              texture={getTextureSafe(`item_${item.id}`)}
            />
          ))}

          <Spirit
            x={100}
            y={20}
            size={playerSize}
          />
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
