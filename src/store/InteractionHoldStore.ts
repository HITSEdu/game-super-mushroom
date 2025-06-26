import {create} from 'zustand';

interface HoldState {
  interactionId: string | null;
  progress: number;
  startTime: number | null;
  targetId: string | null;

  startHold: (id: string) => void;
  updateProgress: (progress: number) => void;
  cancelHold: () => void;
}

export const useInteractionHoldStore = create<HoldState>((set) => ({
  interactionId: null,
  progress: 0,
  startTime: null,
  targetId: null,

  startHold: (id) => set({
    interactionId: id,
    progress: 0,
    startTime: performance.now()
  }),
  updateProgress: (progress) => set({progress}),
  cancelHold: () => set({interactionId: null, progress: 0, startTime: null}),
}));