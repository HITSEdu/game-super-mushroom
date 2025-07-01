import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import StoryModal from "./StoryModal";

const LoseModal = () => {
  const {t} = useTranslation("translations");
  const close = useModalStore((s) => s.close);

  const pages = [
    {
      title: t("lose.title"),
      content: t("lose.page1"),
    }
  ];

  return (
    <StoryModal
      pages={pages}
      onComplete={close}
      primaryLabel="understood"
    />
  );
};

export default LoseModal;