import {usePlayerStore} from '../../store/PlayerStore.ts';
import {useLevelStore} from '../../store/LevelStore';
import {type PointData} from "pixi.js";
import type {ObjectSize} from "../../constants/interfaces.ts";
import type {CollisionDirection} from '../../constants/types.ts';
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {getNearbyInteractions} from "../utils/getNearbyInteractions.ts";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";

export const isNearEnough = (
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
  margin: number
) => {
  return (
    ax < bx + bw + margin &&
    ax + aw > bx - margin &&
    ay < by + bh + margin &&
    ay + ah > by - margin
  );
}

const intersects = (
  a: { x: number, y: number, width: number, height: number },
  b: { x: number, y: number, width: number, height: number }
) =>
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y;

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
    if (enemy.state === 'dead' || !enemy.isAngry) continue;
    const enemyBox = {
      x: enemy.position.x,
      y: enemy.position.y,
      width: enemy.size.width,
      height: enemy.size.height,
    };

    const direction = getCollisionDirection(playerBox, enemyBox);
    if (direction !== null) {
      useGameSessionStore.getState().lose();
    }
  }
}

const hasntCollisions = (type: string) => {
  const types = ['fountain', 'tree', 'grass', 'flower', 'snowman', 'tablet'];
  for (const it of types) {
    if (type.startsWith(it)) return true;
  }

  return false;
}

const deathCollisions = (type: string) => {
  const types = ['trap', 'water', 'fire', 'rock1'];
  for (const it of types) {
    if (type.startsWith(it)) return true;
  }

  return false;
}

export const handleObstacleCollision = (
  position: PointData,
  size: ObjectSize,
  velocityX: number,
  velocityY: number,
  dt: number,
  player?: boolean,
  hollow?: boolean,
) => {
  const {
    obstacles,
    gravity,
    items,
    spirits,
    isMiniGame
  } = useLevelStore.getState();

  const playerWidth = size.width;
  const playerHeight = size.height;

  let newVelocityX = velocityX;
  let newVelocityY = velocityY;

  if (Math.abs(newVelocityY) < 0.1) {
    newVelocityY = 0;
  }

  const seconds = dt / 1000 * (isMiniGame ? 1.3 : 1);

  let newX = position.x + newVelocityX * seconds;
  let newY = position.y + newVelocityY * seconds;

  let onGround = false;
  const stacked = {x: false, y: false};

  const nearInteractive = player ? getNearbyInteractions(
    newX, newY, playerWidth, playerHeight, obstacles, items, spirits
  ) : null;

  let isOnLadder = false;

  if (hollow) {
    return {
      position: {x: newX, y: newY},
      velocityX: newVelocityX,
      velocityY: newVelocityY,
      onGround,
      stacked,
      nearInteractive,
      onLadder: isOnLadder,
    };
  }

  const boxX = {
    x: position.x,
    y: newY,
    width: playerWidth,
    height: playerHeight,
  };

  for (const obs of obstacles) {
    if (!obs.visible || hasntCollisions(obs.type)) continue;
    const obsBox = {x: obs.x, y: obs.y, width: obs.width, height: obs.height};

    const direction = getCollisionDirection(boxX, obsBox);
    if (!direction) continue;

    if (deathCollisions(obs.type) && player) {
      if (intersects(boxX, obsBox)) {
        useGameSessionStore.getState().lose();
      }
    }

    if (obs.type === 'portal' && player) useMiniGameStore.getState().finishMiniGame();

    if (obs.type.startsWith('ladder') && player) {
      if (player) isOnLadder = true;
      continue;
    }

    if (direction === 'left') {
      newX = obs.x - playerWidth;
      newVelocityX = 0;
      stacked.x = true;
    } else if (direction === 'right') {
      newX = obs.x + obs.width;
      newVelocityX = 0;
      stacked.x = true;
    }
  }

  const boxY = {
    x: newX,
    y: newY,
    width: playerWidth,
    height: playerHeight,
  };

  for (const obs of obstacles) {
    if (!obs.visible || hasntCollisions(obs.type)) continue;
    const obsBox = {x: obs.x, y: obs.y, width: obs.width, height: obs.height};

    if (obs.type.startsWith('ladder') && player) {
      if (!player) continue;

      if (intersects(boxY, obsBox)) {
        isOnLadder = true;
        onGround = false;
        continue;
      }
    }

    const direction = getCollisionDirection(boxY, obsBox);
    if (!direction) continue;

    if (deathCollisions(obs.type) && player) {
      if (intersects(boxX, obsBox)) {
        useGameSessionStore.getState().lose();
      }
    }

    if (obs.type === 'portal' && player) useMiniGameStore.getState().finishMiniGame();

    if (direction === 'top') {
      newY = obs.y - playerHeight;
      newVelocityY = 0;
      onGround = true;
      stacked.y = true;
    } else if (direction === 'bottom') {
      newY = obs.y + obs.height;
      newVelocityY = 0;
      stacked.y = true;
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
      if (!obs.visible || obs.type.startsWith('ladder') || hasntCollisions(obs.type)) continue;

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
        stacked.y = true;
        break;
      }
    }
  }

  if (!onGround) {
    newVelocityY += gravity * seconds;
  }

  return {
    position: {x: newX, y: newY},
    velocityX: newVelocityX,
    velocityY: newVelocityY,
    onGround,
    stacked,
    nearInteractive,
    onLadder: isOnLadder,
  };
};