import type {IInteraction} from "../../constants/interfaces.ts";
import {
  type ItemData,
  type ObstacleData,
  type SpiritData,
  useLevelStore
} from "../../store/LevelStore.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {items as globalItems} from '../../constants/items.tsx';
import {spirits as globalSpirits} from '../../constants/spirits.tsx';
import {
  obstaclesWithInteractivity as globalObstacles
} from "../../constants/obstacles.tsx";
import {useInventoryStore} from "../../store/InventoryStore.ts";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";
import {useToastStore} from "../../store/ToastStore.ts";
import {MINI_GAMES} from "../../constants/miniGames.tsx";
import {isNearEnough} from "../systems/CollisionSystem.ts";
import i18next from "i18next";
import {enemies} from "../entities/enemy/enemies.ts";

const notInteractive = (type: string) => {
  const types = ['trap'];
  for (const it of types) {
    if (type.startsWith(it)) return true;
  }

  return false;
}

type ObstacleKey = keyof typeof globalObstacles;

const isObstacleKey = (key: string): key is ObstacleKey => {
  return key in globalObstacles;
}


export function getNearbyInteractions(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  obstacles: ObstacleData[],
  levelItems: ItemData[],
  levelSpirits: SpiritData[],
): IInteraction[] {
  const interactions: IInteraction[] = [];

  const miniGame = useMiniGameStore.getState();
  const currentGame = miniGame.currentMiniGame
    ? MINI_GAMES[miniGame.currentMiniGame]
    : null;

  const isNearEnoughWrapper = (
    x: number, y: number, width: number, height: number, padding: number
  ) => isNearEnough(
    playerX, playerY, playerWidth, playerHeight,
    x, y, width, height, padding
  );

  if (currentGame?.id === 'autumn') {
    const zone = miniGame.deliveryZones[miniGame.activeDeliveryZoneIndex];
    if (isNearEnoughWrapper(zone.x, zone.y, 24, 24, 16) && miniGame.carriedItem) {
      interactions.push({
        id: `box_zone-${zone.x}-${zone.y}`,
        visible: true,
        x: zone.x,
        y: zone.y,
        key: "use",
        title: "useTheObstacle",
        action: miniGame.deliverItem,
        holdable: true,
        holdDuration: 750
      });
    }
  }

  for (const enemy of enemies) {
    if (enemy.state === 'dead' || notInteractive(enemy.type)) continue;

    const isNear = enemy.isAngry ? isNearEnoughWrapper(enemy.position.x, enemy.position.y, enemy.size.width, enemy.size.height, 52) :
      isNearEnoughWrapper(enemy.position.x, enemy.position.y, enemy.size.width, enemy.size.height, 24);
    if (!isNear) continue;

    interactions.push({
      id: `enemy-${enemy.id}`,
      visible: true,
      x: enemy.position.x,
      y: enemy.position.y,
      key: 'interact',
      title: enemy.isAngry ? 'enemy.kill' : 'enemy.pet',
      action: () => {
        if (enemy.isAngry) {
          enemy.kill();
        } else {
          enemy.pet();
        }
      },
      holdable: true,
      holdDuration: 1000,
    });
  }

  for (const obs of obstacles) {
    if (!obs.visible) continue;

    const isAllowedType =
      obs.type.startsWith('door') ||
      obs.type === 'fountain' ||
      obs.type === 'tablet' ||
      ((obs.type === 'bag' || obs.type === 'shelf') && miniGame.currentMiniGame);

    if (!isAllowedType) continue;

    const isNear = isNearEnoughWrapper(obs.x, obs.y, obs.width, obs.height, 32);
    if (!isNear) continue;

    const id = `${obs.type}-${obs.x}-${obs.y}`;

    if (obs.type.startsWith('door')) {
      const side: 'left' | 'right' = obs.x === 0 ? 'left' : 'right';
      interactions.push({
        id,
        visible: true,
        x: obs.x,
        y: obs.y,
        key: "use",
        title: "enterTheDoor",
        action: () => useGameSessionStore.getState().enterDoor(side),
      });
    } else if (isObstacleKey(obs.type)) {
      interactions.push({
        id,
        visible: true,
        x: obs.x,
        y: obs.y,
        key: "use",
        title: "useTheObstacle",
        action: globalObstacles[obs.type],
        holdable: obs.type === 'bag' || obs.type === 'shelf',
      });
    }
  }

  for (const item of levelItems) {
    if (!item.visible) continue;

    const isNear = isNearEnoughWrapper(item.x, item.y, item.size.width, item.size.height, 16);
    if (!isNear) continue;

    const globalItem = globalItems.find((i) => i.id === item.id);
    if (!globalItem) continue;

    const inventory = useInventoryStore.getState();
    const isSingleCarryItem = currentGame && item.id === currentGame.itemId;

    const autoFinish = currentGame?.butterflyId === item.id;

    interactions.push({
      id: `item-${item.x}-${item.y}-${item.type}`,
      visible: true,
      x: item.x,
      y: item.y,
      key: "use",
      title: "pickupItem",
      action: () => {
        if (isSingleCarryItem && inventory.getItem(item.id)) {
          const message = i18next.t('translations:overload');
          useToastStore.getState().show(message);
          return;
        }

        inventory.addItem(globalItem.id);

        if (autoFinish) {
          miniGame.finishMiniGame();
        } else if (currentGame) {
          useMiniGameStore.setState({carriedItem: globalItem.id});
        }

        useLevelStore.setState((state) => ({
          items: state.items.map((it) =>
            it.x === item.x && it.y === item.y && it.id === item.id
              ? {...it, visible: false}
              : it
          ),
        }));
      },
      holdable: item.type.startsWith('flower'),
    });
  }

  for (const spirit of levelSpirits) {
    if (!spirit.visible) continue;

    const isNear = isNearEnoughWrapper(
      spirit.x,
      spirit.y,
      spirit.size.width,
      spirit.size.height,
      16
    );

    if (!isNear) continue;

    const globalSpirit = globalSpirits.find((i) => i.id === spirit.id);
    if (!globalSpirit) continue;

    interactions.push({
      id: `spirit-${spirit.id}`,
      visible: true,
      x: spirit.x,
      y: spirit.y,
      key: "use",
      title: "talkToSpirit",
      action: globalSpirit.action,
    });
  }

  return interactions;
}