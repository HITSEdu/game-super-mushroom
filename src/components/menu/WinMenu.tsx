import Button from "../buttons/Button.tsx";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useTranslation} from "react-i18next";
import {useLevelsStore} from "../../store/LevelsStore.ts";
import ButtonExitTo from "../buttons/ButtonExitTo.tsx";

const WinMenu = () => {
    const {
        currentLevelID,
        startLevel,
    } = useGameSessionStore();
    const changeGlobalState = useGlobalStore((s) => s.change);

    const {levels} = useLevelsStore();

    const {t} = useTranslation('translations')

    return (
        <>
            <h2 className='font-bold text-3xl text-center'>{t('winTitle')}</h2>
            {currentLevelID && levels[`${parseInt(currentLevelID) + 1}`] &&
                <Button title={t("nextLevel")} onClick={() => {
                    startLevel(`${parseInt(currentLevelID) + 1}`);
                    changeGlobalState("playing");
                }}/>}
            <ButtonExitTo title='exitToLevels' newState='levelSelect'/>
            <ButtonExitTo title='exitToMenu' newState='menu'/>
        </>
    );
}

export default WinMenu;