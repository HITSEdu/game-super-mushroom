import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import type {GlobalType} from "../../constants/types.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useBackgroundStore} from "../../store/BackgroundStore.tsx";
import {useInventoryStore} from "../../store/InventoryStore.ts";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";

interface IProps {
  title: string;
  newState: GlobalType;
}

const ButtonExitTo = ({title, newState}: IProps) => {
  const {
    reset,
  } = useGameSessionStore();

  const {resetBackground} = useBackgroundStore();

  const changeGlobalState = useGlobalStore((s) => s.change);

  const {t} = useTranslation('translations')

  return (
    <Button
      title={t(title)}
      onClick={() => {
        changeGlobalState(newState);
        reset();
        resetBackground();
        useInventoryStore.getState().removeMiniGameItems();
        useMiniGameStore.getState().clearCurrentMiniGame();
      }}
    />
  );
}

export default ButtonExitTo;