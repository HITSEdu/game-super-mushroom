import type {IInteraction} from "../../constants/interfaces.ts";
import type {ObstacleData} from "../../store/LevelStore.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";

export function getNearbyInteractions(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  obstacles: ObstacleData[],
): IInteraction[] {

  const rangeX = 32;
  const rangeY = 24;

  const centerX = playerX + playerWidth / 2;
  const centerY = playerY + playerHeight / 2;

  const interactions: IInteraction[] = [];

  for (const obs of obstacles) {
    if (!obs.visible) continue;
    if (!(obs.type.startsWith('door') || obs.type === 'item' || obs.type === 'npc')) continue;

    const obsCenterX = obs.x + obs.width / 2;
    const obsCenterY = obs.y + obs.height / 2;

    const dx = Math.abs(centerX - obsCenterX);
    const dy = Math.abs(centerY - obsCenterY);

    if (dx <= rangeX && dy <= rangeY) {
      if (obs.type.startsWith('door')) {
        const side: 'left' | 'right' = obs.x === 0 ? 'left' : 'right';
        interactions.push({
          id: `door-${obs.x}-${obs.y}`,
          visible: true,
          x: obs.x,
          y: obs.y,
          key: "use",
          title: "enterTheDoor",
          action: () => useGameSessionStore.getState().enterDoor(side),
        });
      }

      // TODO с предметами и нпс
    }
  }

  return interactions;
}
