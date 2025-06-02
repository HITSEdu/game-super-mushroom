import {create} from 'zustand'
import type {GlobalType} from "../constants/types.ts";

interface GlobalState {
    global: GlobalType
    change: (newState: GlobalType) => void
}

export const useGlobalStore = create<GlobalState>()(
    (set) => ({
        global: 'menu',
        change: (newState) => set({global: newState}),
    }),
)
