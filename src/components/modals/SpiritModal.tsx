import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";
import {spirits} from "../../constants/spirits.tsx";
import StoryModal from "./StoryModal";

interface SpiritModalProps {
  spiritId: number;
}

const SpiritModal = ({spiritId}: SpiritModalProps) => {
  const {t} = useTranslation("translations");
  const close = useModalStore((s) => s.close);
  const {startMiniGame, isCompleted} = useMiniGameStore();

  const spirit = spirits.find(s => s.id === spiritId);
  if (!spirit) return null;

  const spiritKey = spirit.name.toLowerCase();
  const hasCompleted = isCompleted(spirit.season);

  const handleHelp = () => {
    startMiniGame(spirit.season);
    close();
  };

  const handleLeave = () => {
    close();
  };

  const pages = hasCompleted
    ? [
      {
        title: t("spiritGreeting", {name: spirit.name}),
        content: t("alreadyHelped"),
      }
    ]
    : [
      {
        title: t("spiritGreeting", {name: spirit.name}),
        content: t(`spiritDialogue.${spiritKey}.0`),
      },
      {
        content: t(`spiritDialogue.${spiritKey}.1`),
      },
      {
        content: t(`spiritDialogue.${spiritKey}.2`),
      }
    ];

  return (
    <StoryModal
      pages={pages}
      onComplete={!hasCompleted ? handleHelp : undefined}
      onSecondary={!hasCompleted ? handleLeave : handleLeave}
      primaryLabel={!hasCompleted ? "help" : undefined}
      secondaryLabel="leave"
    />
  );
};

export default SpiritModal;