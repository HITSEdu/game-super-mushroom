import {create} from "zustand";
import type {ReactNode} from "react";
import {useGameSessionStore} from "./GameSessionStore.ts";

interface ModalState {
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  content: null,
  open: (content) => {
    useGameSessionStore.getState().setStatus("modalOpen");
    set({content})
  },
  close: () => {
    useGameSessionStore.getState().setStatus('playing');
    set({content: null})
  },
}));
