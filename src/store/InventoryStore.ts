import {create} from 'zustand'
import {persist} from "zustand/middleware";
import type {IItem} from "../constants/interfaces.ts";
import {initItems, items} from "../constants/items.tsx";
import {useToastStore} from "./ToastStore.ts";
import i18next from "i18next";

interface InventoryState {
  items: IItem[];

  getItem: (id: number) => IItem | null;
  doAction: (id: number) => void;
  addItem: (id: number) => void;
  reduceItem: (id: number) => void;
  removeItem: (id: number) => void;
  removeMiniGameItems: () => void;
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

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      removeMiniGameItems: () => {
        get().removeItem(2);
        get().removeItem(8);
      },

      addItem: (id) => {
        const itemName = i18next.t(`translations:items.names.${id}`);
        const message = i18next.t('translations:items.pickedUp', {itemName});

        useToastStore.getState().show(message);
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
              return {items: [...state.items, {...newItem, amount: 1}]};
            }
          });
        }
      },

      reduceItem: (id) => {
        const item = get().getItem(id);
        if (!item) return;

        set((state) => {
          const updatedItems = state.items
            .map((it) =>
              it.id === id ? {...it, amount: Math.max(0, it.amount - 1)} : it
            )
            .filter(it => it.amount > 0);

          return {items: updatedItems};
        });
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