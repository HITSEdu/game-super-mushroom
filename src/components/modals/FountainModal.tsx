import {useTranslation} from "react-i18next";
import {useInventoryStore} from "../../store/InventoryStore";
import StoryModal from "./StoryModal";
import {useGlobalStore} from "../../store/GlobalStore.ts";

const FountainModal = () => {
  const {t} = useTranslation("translations");
  const {getItem, addItem, hasAllButterflies} = useInventoryStore();

  const {change} = useGlobalStore();

  const hasPortal = !!getItem(13);
  const allButterflies = hasAllButterflies();

  const normalPages = [
    {content: t("fountain.line1")},
    {content: t("fountain.line2")},
    {content: t("fountain.line3")},
  ];

  const alreadyHasPortalPages = [
    {content: t("fountain.repeat")},
  ];

  const finalPages = [
    {content: t("fountain.final1")},
    {content: t("fountain.final2")},
    {content: t("fountain.final3")},
  ];

  const handleComplete = () => {
    if (allButterflies) {
      change("titles");
    } else if (!hasPortal) {
      addItem(13);
    }
  };

  return (
    <StoryModal
      pages={allButterflies ? finalPages : (hasPortal ? alreadyHasPortalPages : normalPages)}
      onComplete={handleComplete}
    />
  );
};

export default FountainModal;