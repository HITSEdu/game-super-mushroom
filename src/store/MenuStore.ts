import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {MenuType} from "../constants/types.ts";

interface MenuState {
    menu: MenuType
    change: (newMenu: MenuType) => void
    reset: () => void
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set) => ({
            menu: 'main',
            change: (newMenu) => set({menu: newMenu}),
            reset: () => set({menu: 'main'}),
        }),
        {
            name: 'menuStore'
        },
    ),
)
