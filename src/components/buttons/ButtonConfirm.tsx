import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useLevelsStore} from "../../store/LevelsStore.ts";
import {usePlayerStore} from "../../store/PlayerStore.ts";
import {useInventoryStore} from "../../store/InventoryStore.ts";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";

const ButtonConfirm = () => {
  const {t} = useTranslation('translations')
  const {reset: resetMenu} = useMenuStore()

  const resetLevelsState = useLevelsStore((state) => state.resetProgress)
  const {change: playerChange} = usePlayerStore();
  const {reset: resetInventory} = useInventoryStore();
  const {resetMiniGames} = useMiniGameStore();
  const {setStoryShown, change: changeGlobalState} = useGlobalStore();

  return (
    <Button
      title={t('confirm')}
      onClick={() => {
        resetLevelsState();
        setStoryShown(false);
        resetMenu();
        resetInventory();
        playerChange();
        resetMiniGames();
        changeGlobalState('levelSelect');
      }}
    />
  );
}

export default ButtonConfirm;