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
        <div className="w-screen h-screen flex-center flex-col bg-gray-900 relative overflow-hidden">
            <div
                className="
                    relative
                    h-[70vh]
                    w-[70vw]
                    rounded-xl border-4 border-white
                    flex-center
                "
            >
                <div className="fixed top-2 z-1001 flex-center flex-row">
                    <LevelInfo attempts={currentAttempts} stars={stars} time={curTime}/>
                </div>

                <GameScene/>

                <button
                    className="z-1001 fixed top-4 right-4 w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition flex-center"
                    onClick={pause}
                >
                    <SettingsIcon/>
                </button>

                <MobileControls/>
            </div>

            {status === "paused" && <ModalWindow>{renderMenu()}</ModalWindow>}
            {status === "won" && <ModalWindow><WinMenu/></ModalWindow>}
        </div>
    );
}

export default GameScreen;