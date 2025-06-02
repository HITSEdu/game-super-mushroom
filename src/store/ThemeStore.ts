import {create} from 'zustand'
import {persist} from "zustand/middleware";

type ThemeStore = {
    dark: boolean,
    toggleTheme: () => void,
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            dark: localStorage.getItem("theme") === "dark",
            toggleTheme: () => {
                const isDark = !get().dark;

                document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                localStorage.setItem("theme", isDark ? "dark" : "light");

                set({dark: isDark});
            }
        }),
        {
            name: 'theme-store',
        }
    )
)