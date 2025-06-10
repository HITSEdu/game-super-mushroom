import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useLevelsStore} from "../../store/LevelsStore.ts";
import {usePlayerStore} from "../../store/PlayerStore.ts";

const ButtonConfirm = () => {
    const {t} = useTranslation('translations')
    const {reset: resetMenu} = useMenuStore()

    const changeGlobalState = useGlobalStore((state) => state.change)
    const resetLevelsState = useLevelsStore((state) => state.resetProgress)
    const {change: playerChange} = usePlayerStore();

    return (
        <Button title={t('confirm')} onClick={() => {
            resetLevelsState();
            resetMenu();
            playerChange();
            changeGlobalState('levelSelect');
        }}/>
    );
}

export default ButtonConfirm;