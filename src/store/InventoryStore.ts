import {create} from 'zustand'
import {persist} from "zustand/middleware";
import type {IItem} from "../constants/interfaces.ts";
import {initItems, items} from "../constants/items.ts";

interface InventoryState {
  items: IItem[];

  getItem: (id: number) => IItem | null;
  doAction: (id: number) => void;
  addItem: (id: number) => void;
  reset: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [...initItems],

      getItem: (id) => get().items.find(item => item.id === id) ?? null,

      doAction: (id) => {
        const item = get().getItem(id);
        if (item?.action) item.action();
      },

      addItem: (id) => {
        const newItem = items.find(item => item.id === id);
        if (newItem) {
          set((state) => {
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
              const updatedItems = state.items.map(item =>
                item.id === newItem.id
                  ? {...item, amount: item.amount + 1}
                  : item
              );
              return {items: updatedItems};
            } else {
              return {items: [...state.items, newItem]};
            }
          });
        }
      },

      reset: () => {
        set({items: [...initItems]});
      },
    }),
    {
      name: 'inventory-store',
    }
  )
);