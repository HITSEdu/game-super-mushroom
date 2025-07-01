import {useModalStore} from "../store/ModalStore.ts";
import LoseModal from "../components/modals/LoseModal.tsx";

export const MODALS = {
  "lose": () => useModalStore.getState().open(<LoseModal />),
}