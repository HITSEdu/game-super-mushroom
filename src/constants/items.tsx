import type {IItem} from "./interfaces.ts";
import {useModalStore} from "../store/ModalStore.ts";
import MemoryModal from "../components/modals/MemoryModal.tsx";
import MusicModal from "../components/modals/MusicModal.tsx";
import ButterflyModal from "../components/modals/ButterflyModal.tsx";
import PortalModal from "../components/modals/PortalModal.tsx";

export const items: IItem[] = [
  {
    id: 1,
    source: 'src/assets/items/memory.png',
    amount: 0,
    action: () => useModalStore.getState().open(<MemoryModal />),
    height: 2
  },
  {
    id: 7,
    source: 'src/assets/items/music.png',
    amount: 0,
    action: () => useModalStore.getState().open(<MusicModal />),
  },
  {
    id: 13,
    source: 'src/assets/items/portal.png',
    amount: 0,
    action: () => useModalStore.getState().open(<PortalModal />),
  },
  {
    id: 3,
    source: 'src/assets/items/item_winter.png',
    amount: 0,
    action: () => useModalStore.getState().open(
      <ButterflyModal title={'Зиму'} />),
  },
  {
    id: 4,
    source: 'src/assets/items/item_spring.png',
    amount: 0,
    action: () => useModalStore.getState().open(
      <ButterflyModal title={'Весну'} />),
  },
  {
    id: 9,
    source: 'src/assets/items/item_summer.png',
    amount: 0,
    action: () => useModalStore.getState().open(
      <ButterflyModal title={'Лето'} />),
  },
  {
    id: 10,
    source: 'src/assets/items/item_autumn.png',
    amount: 0,
    action: () => useModalStore.getState().open(
      <ButterflyModal title={'Осень'} />),
  },
];

export const initItems: IItem[] = [
  {...items[0], amount: 1},
  {...items[1], amount: 1},
  {...items[2], amount: 1},
];