import {useTranslation} from "react-i18next";
import {useInventoryStore} from "../../store/InventoryStore";
import StoryModal from "./StoryModal";

const FountainModal = () => {
  const {t} = useTranslation("translations");
  const {getItem, addItem} = useInventoryStore();

  const hasPortal = !!getItem(13);

  const normalPages = [
    {content: t("fountain.line1")},
    {content: t("fountain.line2")},
    {content: t("fountain.line3")},
    {content: t("fountain.line4")},
    {content: t("fountain.line5")},
  ];

  const alreadyHasPortalPages = [
    {content: t("fountain.repeat")},
  ];

  const handleComplete = () => {
    if (!hasPortal) addItem(13);
  };

  return (
    <StoryModal
      pages={hasPortal ? alreadyHasPortalPages : normalPages}
      onComplete={handleComplete}
    />
  );
};

export default FountainModal;