import type {MiniGameConfig} from "./interfaces.ts";
import {useModalStore} from "../store/ModalStore.ts";
import MiniGameModal from "../components/modals/MiniGameModal.tsx";

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
    action: () => useModalStore.getState().open(
      <MiniGameModal season={'spring'} />)
  },
  summer: {
    id: 'summer',
    level: '5',
    goal: 1,
    itemId: 13,
    butterflyId: 9,
    itemName: 'butterfly',
    description: 'Survive the maze and reach the butterfly.',
    action: () => useModalStore.getState().open(
      <MiniGameModal season={'summer'} />)
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
    action: () => useModalStore.getState().open(
      <MiniGameModal season={'autumn'} />)
  },
  winter: {
    id: 'winter',
    level: '5',
    goal: 1,
    itemId: 13,
    butterflyId: 3,
    itemName: 'butterfly',
    description: 'TBD',
    action: () => useModalStore.getState().open(
      <MiniGameModal season={'winter'} />)
  },
};