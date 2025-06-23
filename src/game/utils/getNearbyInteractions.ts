import type {IInteraction} from "../../constants/interfaces.ts";
import {
  type ItemData,
  type ObstacleData,
  useLevelStore
} from "../../store/LevelStore.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {items as globalItems} from '../../constants/items.tsx'
import {useInventoryStore} from "../../store/InventoryStore.ts";

export function getNearbyInteractions(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  obstacles: ObstacleData[],
  levelItems: ItemData[],
): IInteraction[] {

  const rangeX = 32;
  const rangeY = 24;

  const centerX = playerX + playerWidth / 2;
  const centerY = playerY + playerHeight / 2;

  const interactions: IInteraction[] = [];

  for (const obs of obstacles) {
    if (!obs.visible) continue;
    if (!(obs.type.startsWith('door') || obs.type === 'npc')) continue;

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

      if (obs.type === "npc") {
        interactions.push({
          id: `npc-${obs.x}-${obs.y}`,
          visible: true,
          x: obs.x,
          y: obs.y,
          key: "use",
          title: "talkToNpc",
          action: () => {
          },
        });
      }
    }
  }

  for (const item of levelItems) {
    if (!item.visible) continue;

    const itemCenterX = item.x + item.size.width / 2;
    const itemCenterY = item.y + item.size.height / 2;

    const dx = Math.abs(centerX - itemCenterX);
    const dy = Math.abs(centerY - itemCenterY);

    if (dx <= rangeX && dy <= rangeY) {
      const globalItem = globalItems.find((i) => i.id === item.id);
      if (!globalItem) continue;

      interactions.push({
        id: `item-${item.id}`,
        visible: true,
        x: item.x,
        y: item.y,
        key: "use",
        title: "pickupItem",
        action: () => {
          useInventoryStore.getState().addItem(globalItem.id);

          useLevelStore.setState((state) => ({
            items: state.items.map((it) =>
              it.id === item.id ? {...it, visible: false} : it
            ),
          }));
        },
      });
    }
  }

  return interactions;
}
