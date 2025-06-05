import {create} from 'zustand'
import {persist} from "zustand/middleware";

interface VolumeState {
    volume: number
    volumeChange: (direction: "up" | "down") => void
}

export const useVolumeStore = create<VolumeState>()(
    persist(
        (set, get) => ({
            volume: 0,
            volumeChange: (direction: "up" | "down") => {
                const newVolume = direction === "up" ? Math.min(get().volume + 0.1, 1) : Math.max(get().volume - 0.1, 0);
                set({volume: parseFloat(newVolume.toFixed(1))});
            }
        }),
        {
            name: 'volume',
        }
    )
)