import {useGameSessionStore} from '../../store/GameSessionStore.ts';
import GameScene from "../../game/GameScene.tsx";
import {useMenuStore} from "../../store/MenuStore.ts";
import ModalWindow from "../ModalWindow.tsx";
import MobileControls from "../MobileControls.tsx";
import {SettingsIcon} from "lucide-react";
import LevelInfo from "../ui/LevelInfo.tsx";
import GamingMainMenu from "../menu/GamingMainMenu.tsx";
import SettingsMenu from "../menu/SettingsMenu.tsx";
import LanguageMenu from "../menu/LanguageMenu.tsx";
import VolumeMenu from "../menu/VolumeMenu.tsx";
import WinMenu from "../menu/WinMenu.tsx";

const GameScreen = () => {
    const {
        status,
        stars,
        currentAttempts,
        pause,
        curTime,
    } = useGameSessionStore();

    const {menu: menu} = useMenuStore()

    const renderMenu = () => {
        switch (menu) {
            case 'main':
                return <GamingMainMenu/>;
            case 'settings':
                return <SettingsMenu/>
            case 'language':
                return <LanguageMenu/>;
            case 'volume':
                return <VolumeMenu/>;
        }
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
            {status === "won" && (<ModalWindow children={<WinMenu/>}/>)}
            <MobileControls/>
        </div>
    )
}

export default GameScreen;