import {useGameSessionStore} from '../../store/GameSessionStore.ts'
import {useGlobalStore} from "../../store/GlobalStore.ts";
import GameScene from "../../game/GameScene.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import Button from "../UI/Button.tsx";
import ModalWindow from "../ModalWindow.tsx";
import {useLevelsStore} from "../../store/LevelsStore.ts";
import MobileControls from "../MobileControls.tsx";
import {SettingsIcon} from "lucide-react";
import LevelInfo from "../UI/LevelInfo.tsx";

const GameScreen = () => {
    const {
        status,
        stars,
        currentAttempts,
        pause,
        resume,
        reset,
        curTime,
        currentLevelID,
        startLevel,
    } = useGameSessionStore();
    const changeGlobalState = useGlobalStore((s) => s.change);

    const {levels} = useLevelsStore();

    const {t, i18n} = useTranslation('translations')
    const {menu: menu, change: changeMenu} = useMenuStore()

    const renderMenu = () => {
        switch (menu) {
            case 'main':
                return (
                    <>
                        <Button title={t('continue')} onClick={() => {
                            resume()
                        }}/>
                        <Button title={t('settings')} onClick={() => changeMenu('settings')}/>
                        <Button title={t('exitToLevels')} onClick={() => {
                            changeGlobalState('levelSelect');
                            reset();
                            // TODO дописать логику выхода с уровня
                        }}/>
                        <Button title={t('exitToMenu')} onClick={() => {
                            changeGlobalState('menu');
                            reset();
                            // TODO дописать логику выхода с уровня
                        }}/>
                    </>
                );
            case 'settings':
                return (
                    <>
                        <Button title={t('volume')} onClick={() => {
                        }}/>
                        <Button title={t('language')} onClick={() => changeMenu('language')}/>
                        <Button title={t('back')} onClick={() => changeMenu('main')}/>
                    </>
                );
            case 'language':
                return (
                    <>
                        <Button title='Русский' onClick={() => i18n.changeLanguage('ru')}/>
                        <Button title='English' onClick={() => i18n.changeLanguage('en')}/>
                        <Button title={t('back')} onClick={() => changeMenu('settings')}/>
                    </>
                )
        }
    }

    const winMenu = () => {
        return (
            <>
                <h2 className='font-bold text-3xl text-center'>{t('winTitle')}</h2>
                {currentLevelID && levels[`${parseInt(currentLevelID) + 1}`] &&
                    <Button title={t("nextLevel")} onClick={() => {
                        startLevel(`${parseInt(currentLevelID) + 1}`);
                        changeGlobalState("playing");
                    }}/>}
                <Button title={t('exitToLevels')} onClick={() => {
                    changeGlobalState('levelSelect');
                    reset();
                }}/>
                <Button title={t('exitToMenu')} onClick={() => {
                    changeGlobalState('menu');
                    reset();
                }}/>
            </>
        );
    }

    return (
        <div className="flex-center flex-col">
            <div
                className='absolute top-1 z-1001 flex-center flex-row'>
                <LevelInfo attempts={currentAttempts} stars={stars} time={curTime}/>
            </div>
            <GameScene/>
            <button
                className="z-1001 fixed top-4 right-4 w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition flex-center"
                onClick={() => {
                    pause();
                }
                }>
                <SettingsIcon/>
            </button>
            {status === "paused" && (<ModalWindow children={renderMenu()}/>)}
            {status === "won" && (<ModalWindow children={winMenu()}/>)}
            <MobileControls/>
        </div>
    )
}

export default GameScreen;