import {create} from 'zustand';

const backgrounds = [
    '/backgrounds/1.png',
    '/backgrounds/2.png',
    '/backgrounds/3.png',
    '/backgrounds/4.png',
    '/backgrounds/5.png',
    '/backgrounds/6.png',
    '/backgrounds/7.png',
    '/backgrounds/8.png',
    '/backgrounds/9.png',
    '/backgrounds/10.png',
    '/backgrounds/11.png',
];

type BackgroundState = {
    background: string;
    setBackground: (background: string) => void;
    randomBackground: () => void;
    resetBackground: () => void;
};

export const useBackgroundStore = create<BackgroundState>()((set, get) => ({
    background: '',
    setBackground: (background: string) => set({background}),
    randomBackground: () => {
        const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        set({background: random});
    },
    resetBackground: () => {
        get().randomBackground();
    }
}));
