import {create} from 'zustand';

interface ToastState {
  visible: boolean;
  message: string | null;
  show: (msg: string, duration?: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: null,
  show: (msg, duration = 2000) => {
    set({message: msg, visible: true});
    setTimeout(() => {
      set({visible: false, message: null});
    }, duration);
  },
}));