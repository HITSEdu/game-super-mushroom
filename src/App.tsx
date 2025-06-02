import HomeScreen from "./components/screens/HomeScreen.tsx";
import GameScreen from "./components/screens/GameScreen.tsx";
import {useGlobalStore} from "./store/GlobalStore.ts";
import LevelsScreen from "./components/screens/LevelsScreen.tsx";
import {useEffect, useState} from "react";
import {useAssetsStore} from "./store/AssetsStore.ts";
import {useTranslation} from "react-i18next";
import {LoaderIcon, RotateCwSquareIcon} from "lucide-react";

const App = () => {
    const state = useGlobalStore(s => s.global)
    const {isInitialized, initialize} = useAssetsStore();

    const {t} = useTranslation('translations')

    const [orientation, setOrientation] = useState(true);

    useEffect(() => {
        initialize();
    }, [isInitialized, initialize]);

    useEffect(() => {
        const checkOrientation = () => {
            if (!screen.orientation) return true;
            return screen.orientation.type.startsWith('landscape');
        };

        setOrientation(checkOrientation());

        const onOrientationChange = () => {
            setOrientation(checkOrientation());
        };

        if (screen.orientation && screen.orientation.addEventListener) {
            screen.orientation.addEventListener('change', onOrientationChange);
        } else {
            window.addEventListener('resize', onOrientationChange);
        }

        return () => {
            if (screen.orientation && screen.orientation.removeEventListener) {
                screen.orientation.removeEventListener('change', onOrientationChange);
            } else {
                window.removeEventListener('resize', onOrientationChange);
            }
        };
    }, []);

    const screens = {
        menu: <HomeScreen/>,
        levelSelect: <LevelsScreen/>,
        playing: <GameScreen/>,
    };

    if (!orientation) {
        return (
            <div className="w-full h-full flex-center p-10">
                <p className="text-4xl font-bold text-center">
                    <RotateCwSquareIcon size='large'/> {t("changeOrientation")}
                </p>
            </div>
        );
    }

    if (!isInitialized) return (
        <div className="w-full h-full flex-center p-10 mt-[20vh]">
            <p className="text-6xl font-bold text-center flex-center flex-row gap-4">
                <LoaderIcon size='medium'/> {t("loading")}
            </p>
        </div>
    );

    return (
        <div className="w-full h-full flex-center relative">
            {screens[state]}
        </div>
    );
}

export default App
