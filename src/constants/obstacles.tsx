import FountainModal from "../components/modals/FountainModal.tsx";
import {useModalStore} from "../store/ModalStore.ts";
import {useMiniGameStore} from "../store/MiniGameStore.ts";
import TutorialModal from "../components/modals/TutorialModal.tsx";

export const obstaclesWithInteractivity =
  {
    'fountain': () => useModalStore.getState().open(<FountainModal />),
    'bag': () => {
      useMiniGameStore.getState().deliverItem();
    },
    'shelf': () => {
      useMiniGameStore.getState().takeBoxFromShelf();
    },
    'tablet': () => {
      useModalStore.getState().open(<TutorialModal />);
    }
  }
