import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import StoryModal from "./StoryModal";

const TutorialModal = () => {
  const {t} = useTranslation("translations");
  const close = useModalStore((s) => s.close);

  const pages = [
    {
      title: t("tutorial.title"),
      content: t("tutorial.page1"),
    },
    {
      content: t("tutorial.page2"),
    },
    {
      content: t("tutorial.page3"),
    },
    {
      content: t("tutorial.page4"),
    },
  ];

  return (
    <StoryModal
      pages={pages}
      onComplete={close}
      primaryLabel="understood"
    />
  );
};

export default TutorialModal;