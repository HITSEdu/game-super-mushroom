import FountainModal from "../components/modals/FountainModal.tsx";
import {useModalStore} from "../store/ModalStore.ts";

export const obstaclesWithInteractivity =
  {
    'fountain': () => useModalStore.getState().open(<FountainModal />),
  }
