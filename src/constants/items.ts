import type {IItem} from "./interfaces.ts";

export const items: IItem[] = [
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
        action: () => alert("Clicked 1"),
    },
    {
        id: 13,
        source: 'src/assets/items/portal.png',
        amount: 2,
        action: () => alert("Clicked 2"),
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
        action: () => alert("Clicked 1"),
    },
    {
        id: 13,
        source: 'src/assets/items/portal.png',
        amount: 2,
        action: () => alert("Clicked 2"),
    },
];