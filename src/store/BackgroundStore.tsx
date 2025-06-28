import {create} from 'zustand';

const BASE_URL = import.meta.env.BASE_URL;

const backgrounds = [
  BASE_URL + '/backgrounds/1.png',
  BASE_URL + '/backgrounds/2.png',
  BASE_URL + '/backgrounds/3.png',
  BASE_URL + '/backgrounds/4.png',
  BASE_URL + '/backgrounds/5.png',
  BASE_URL + '/backgrounds/6.png',
  BASE_URL + '/backgrounds/7.png',
  BASE_URL + '/backgrounds/8.png',
  BASE_URL + '/backgrounds/9.png',
  BASE_URL + '/backgrounds/10.png',
  BASE_URL + '/backgrounds/11.png',
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
