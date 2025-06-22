import {usePlayerStore} from '../../store/PlayerStore.ts';
import {useLevelStore} from '../../store/LevelStore';
import {Point} from "pixi.js";
import type {ObjectSize} from "../../constants/interfaces.ts";
import type {CollisionDirection} from '../../constants/types.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {getNearbyInteractions} from "../utils/getNearbyInteractions.ts";

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

export const handleObstacleCollision = (
  position: Point,
  size: ObjectSize,
  velocityX: number,
  velocityY: number,
  player?: boolean
) => {
  const {obstacles, gravity, items} = useLevelStore.getState();

  const playerWidth = size.width;
  const playerHeight = size.height;

  let newVelocityX = velocityX * 0.9;
  if (Math.abs(newVelocityX) < 0.1) {
    newVelocityX = 0;
  }
  let newVelocityY = velocityY;
  if (Math.abs(newVelocityY) < 0.1) {
    newVelocityY = 0;
  }

  let newX = position.x + newVelocityX;
  let newY = position.y + newVelocityY;

  let onGround = false;
  let stacked = false;

  const nearInteractive = getNearbyInteractions(
    newX, newY, playerWidth, playerHeight, obstacles, items
  );

  let isOnLadder = false;

  const boxX = {
    x: newX,
    y: position.y,
    width: playerWidth,
    height: playerHeight,
  };

  for (const obs of obstacles) {
    if (!obs.visible || (!player && (obs.type === 'finish' || obs.type === 'star' || obs.type.startsWith('door') || obs.type === 'ladder'))) continue;
    const obsBox = {x: obs.x, y: obs.y, width: obs.width, height: obs.height};

    const direction = getCollisionDirection(boxX, obsBox);
    if (!direction) continue;

    if (obs.type === 'star' && player) obs.visible = false;

    if (obs.type === 'ladder' && player) {
      isOnLadder = true;
      continue;
    }

    if (direction === 'left') {
      newX = obs.x - playerWidth;
      newVelocityX = 0;
      stacked = true;
    } else if (direction === 'right') {
      newX = obs.x + obs.width;
      newVelocityX = 0;
      stacked = true;
    }
  }

  const boxY = {
    x: newX,
    y: newY,
    width: playerWidth,
    height: playerHeight,
  };

  for (const obs of obstacles) {
    if (!obs.visible || (!player && (obs.type === 'finish' || obs.type === 'star' || obs.type.startsWith('door') || obs.type === 'ladder'))) continue;
    const obsBox = {x: obs.x, y: obs.y, width: obs.width, height: obs.height};

    if (obs.type === 'ladder' && player) {
      const intersects =
        boxY.x + boxY.width > obsBox.x &&
        boxY.x < obsBox.x + obsBox.width &&
        boxY.y + boxY.height > obsBox.y &&
        boxY.y < obsBox.y + obsBox.height;

      if (intersects) {
        isOnLadder = true;
        onGround = false;
        continue;
      }
    }

    const direction = getCollisionDirection(boxY, obsBox);
    if (!direction) continue;

    if (obs.type === 'star' && player) obs.visible = false;

    if (direction === 'top') {
      newY = obs.y - playerHeight;
      newVelocityY = 0;
      onGround = true;
    } else if (direction === 'bottom') {
      newY = obs.y + obs.height;
      newVelocityY = 0;
    }
  }

  if (!onGround) {
    const footBox = {
      x: newX + 1,
      y: newY + playerHeight,
      width: playerWidth - 2,
      height: 1,
    };

    for (const obs of obstacles) {
      if (!obs.visible || obs.type.startsWith('ladder')) continue;

      const obsBox = {
        x: obs.x,
        y: obs.y,
        width: obs.width,
        height: obs.height,
      };

      const direction = getCollisionDirection(footBox, obsBox);
      if (direction === 'top') {
        onGround = true;
        newVelocityY = 0;
        newY = obs.y - playerHeight;
        break;
      }
    }
  }

  if (!onGround) {
    newVelocityY += gravity;
  }

  return {
    position: new Point(newX, newY),
    velocityX: newVelocityX,
    velocityY: newVelocityY,
    onGround,
    stacked,
    nearInteractive,
    onLadder: isOnLadder,
  };
};