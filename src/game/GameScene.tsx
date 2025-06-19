import {Application, extend} from '@pixi/react';
import {Container, Sprite, Graphics, Texture, Assets} from 'pixi.js';
import {useEffect, useRef} from "react";
import {usePlayerStore} from "../store/PlayerStore.ts";
import Obstacle from "./entities/Obstacle.tsx";
import {Enemy} from "./entities/Enemy.tsx";
import {useLevelStore} from "../store/LevelStore.ts";
import {initControlSystem, cleanupControlSystem} from "./systems/ControlSystem.ts";
import {useGameSessionStore} from "../store/GameSessionStore.ts";
import {Player} from "./player/Player.tsx";
import {useContainerSize} from "../hooks/useContainerSize.ts";

extend({
    Container,
    Sprite,
    Graphics,
});

const GameScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const containerSize = useContainerSize(containerRef);

    const {obstacles, enemies: levelEnemies, isLoaded, load, reset: resetLevel} = useLevelStore();

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
        const numberID = Number(currentLevelID);
        load(numberID).then(() => {
            if (playerTextureString)
                Assets.load(playerTextureString)
                    .then(playerTex => {
                        setTexture(playerTex as Texture);
                    });

            initControlSystem();
        });

        return () => {
            cleanupControlSystem();
            resetLevel();
        };
    }, [currentLevelID, load, playerSeason, playerTextureString, resetLevel, setTexture]);

    const getTextureSafe = (alias: string): Texture => {
        return Assets.cache.has(alias) ? Assets.get(alias) : Texture.EMPTY;
    }

    const scale = Math.min(1, containerSize.width / 1024);

    const offsetX = containerSize.width / 2 - playerPosition.x * scale - playerSize.width * scale / 2;
    const offsetY = containerSize.height / 2 - playerPosition.y * scale - playerSize.height * scale / 2;

    if (!isLoaded) return null;

    return (
        <div ref={containerRef} className="w-full h-full relative z-10">
            <Application resizeTo={containerRef} backgroundColor={'black'}>
                <pixiContainer x={offsetX} y={offsetY} scale={scale}>
                    {playerTexture && gameStatus !== 'lost' &&
                        <Player x={playerPosition.x} y={playerPosition.y} texture={playerTexture} size={playerSize}/>}

                    {Texture.from('enemy') && levelEnemies.filter(e => e.state !== 'dead').map((enemy) => (
                        <Enemy key={enemy.id} x={enemy.position.x} y={enemy.position.y} texture={Assets.get('enemy')}
                               size={enemy.size}/>
                    ))}

                    {obstacles.filter(e => e.visible).map((obs, i) => (
                        <Obstacle key={i} x={obs.x} y={obs.y} size={{width: obs.width, height: obs.height}}
                                  texture={getTextureSafe(obs.type)}/>
                    ))}
                </pixiContainer>
            </Application>
        </div>
    );
}

export default GameScene;
