import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import StoryModal from "./StoryModal";
import type {SeasonType} from "../../constants/types.ts";

interface IProps {
  season: SeasonType;
}

const MiniGameModal = ({season}: IProps) => {
  const {t} = useTranslation("translations");
  const close = useModalStore((s) => s.close);

  const handleClick = () => {
    close();
  };

  const pages = [
    {
      title: t(`miniGame.title.${season}`),
      content: t(`miniGame.description.${season}`),
    },
  ];

  return (
    <StoryModal
      pages={pages}
      onComplete={handleClick}
    />
  );
};

export default MiniGameModal;