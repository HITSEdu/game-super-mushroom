import type {MiniGameConfig} from "./interfaces.ts";

export const MINI_GAMES: Record<string, MiniGameConfig> = {
  spring: {
    id: 'spring',
    level: '5',
    goal: 10,
    itemId: 2,
    butterflyId: 4,
    itemName: 'flower',
    deliverTo: 'basket',
    description: 'Collect and deliver 10 flowers.',
  },
  summer: {
    id: 'summer',
    level: '5',
    goal: 1,
    itemId: 13,
    butterflyId: 9,
    itemName: 'butterfly',
    description: 'Survive the maze and reach the butterfly.',
  },
  autumn: {
    id: 'autumn',
    level: '5',
    goal: 10,
    itemId: 8,
    butterflyId: 10,
    itemName: 'box',
    deliverTo: 'highlightZone',
    description: 'Deliver 10 boxes to the highlighted areas.',
  },
  winter: {
    id: 'winter',
    level: '5',
    goal: 1,
    itemId: 13,
    butterflyId: 3,
    itemName: 'butterfly',
    description: 'TBD',
  },
};