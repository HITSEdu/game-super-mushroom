import {usePlayerStore} from '../../store/PlayerStore.ts';
import {useLevelStore} from '../../store/LevelStore';
import {Point} from "pixi.js";
import type {ObjectSize} from "../../constants/interfaces.ts";
import type {CollisionDirection} from '../../constants/types.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";

export const getCollisionDirection = (
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number }
): CollisionDirection => {
    const axCenter = a.x + a.width / 2;
    const ayCenter = a.y + a.height / 2;
    const bxCenter = b.x + b.width / 2;
    const byCenter = b.y + b.height / 2;

    const dx = bxCenter - axCenter;
    const dy = byCenter - ayCenter;

    const combinedHalfWidths = (a.width + b.width) / 2;
    const combinedHalfHeights = (a.height + b.height) / 2;

    if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
        const overlapX = combinedHalfWidths - Math.abs(dx);
        const overlapY = combinedHalfHeights - Math.abs(dy);

        if (overlapX < overlapY) {
            return dx > 0 ? 'left' : 'right';
        } else {
            return dy > 0 ? 'top' : 'bottom';
        }
    }

    return null;
}

export const handlePlayerEnemyCollision = () => {
    const {position, size} = usePlayerStore.getState();
    const {enemies} = useLevelStore.getState();
    const playerBox = {
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
    };

    for (const enemy of enemies) {
        if (enemy.state === 'dead') continue;
        const enemyBox = {
            x: enemy.position.x,
            y: enemy.position.y,
            width: enemy.size.width,
            height: enemy.size.height,
        };

        const direction = getCollisionDirection(playerBox, enemyBox);
        if (direction === 'top') {
            enemy.state = 'dead';
            usePlayerStore.getState().setOnGround(true);
            usePlayerStore.getState().jump();
        } else if (direction !== null) {
            useGameSessionStore.getState().lose();
        }
    }
}

export const handleObstacleCollision = (position: Point, size: ObjectSize, velocityX: number, velocityY: number, player?: boolean) => {
    const {obstacles, gravity} = useLevelStore.getState();
    const playerHeight = size.height;
    const playerWidth = size.width;

    let newVelocityY = velocityY + gravity;
    let newVelocityX = velocityX * 0.9;

    let newX = position.x + newVelocityX;
    let newY = position.y + velocityY;
    let onGround = false;

    let stacked = false;
    let obsType = null;

    const entityBox = {
        x: newX,
        y: newY,
        width: playerWidth,
        height: playerHeight,
    };

    for (const obs of obstacles) {
        if (!obs.visible || (!player && (obs.type === 'finish' || obs.type === 'star'))) continue;
        const obsBox = {
            x: obs.x,
            y: obs.y,
            width: obs.width,
            height: obs.height,
        };

        const direction = getCollisionDirection(entityBox, obsBox);

        if (direction) {
            obsType = obs.type;
            if (obsType === 'star' && player) obs.visible = false;
        }

        if (direction === 'top') {
            newY = obs.y - playerHeight;
            newVelocityY = 0;
            onGround = true;
            break;
        } else if (direction === 'bottom') {
            newY = obs.y + obs.height;
            newVelocityY = 0;
            break;
        } else if (direction === 'right') {
            newVelocityX = -velocityX * 0.5;
            newX = obs.x + obs.width;
            newY = position.y;
            stacked = true;
            break
        } else if (direction === 'left') {
            newVelocityX = -velocityX * 0.5;
            newX = obs.x - playerWidth;
            newY = position.y;
            stacked = true;
            break
        }
    }

    return {
        position: new Point(newX, newY),
        velocityX: newVelocityX,
        velocityY: newVelocityY,
        onGround: onGround,
        stacked: stacked,
        obsType: obsType,
    };
}