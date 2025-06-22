import type {IItem} from "./interfaces.ts";
import {useMusicPlayerStore} from "../store/MusicPlayerStore.ts";

export const items: IItem[] = [
  {
    id: 1,
    source: 'src/assets/items/memory.png',
    amount: 0,
    action: () => alert("Clicked memory"),
    height: 2
  },
  {
    id: 7,
    source: 'src/assets/items/music.png',
    amount: 0,
    action: () => useMusicPlayerStore.getState().changeMusic(),
  },
  {
    id: 13,
    source: 'src/assets/items/portal.png',
    amount: 0,
    action: () => alert("Clicked 2"),
  },
  {
    id: 4,
    source: 'src/assets/items/item_4.png',
    amount: 0,
    action: () => alert("check description"),
  },
];

export const initItems: IItem[] = [
  {
    id: 1,
    source: 'src/assets/items/memory.png',
    amount: 1,
    action: () => alert("Clicked memory"),
    height: 2
  },
  {
    id: 7,
    source: 'src/assets/items/music.png',
    amount: 1,
    action: () => useMusicPlayerStore.getState().changeMusic(),
  },
  {
    id: 13,
    source: 'src/assets/items/portal.png',
    amount: 2,
    action: () => alert("Clicked 2"),
  },
];