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
    const [background, setBackground] = useState('');

    const backgrounds = [
        '/backgrounds/1.png',
        '/backgrounds/2.png',
        '/backgrounds/3.png',
        '/backgrounds/4.png',
        '/backgrounds/5.png',
        '/backgrounds/6.png',
        '/backgrounds/7.png',
        '/backgrounds/8.png',
        '/backgrounds/9.png',
        '/backgrounds/10.png',
        '/backgrounds/11.png',
    ]

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        setBackground(backgrounds[randomIndex]);
    }, []);

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
            <div className="w-full h-full flex-center p-10 mt-[20vh] z-20">
                <p className="text-2xl font-bold text-center flex-center flex-col text-primary-500">
                    <RotateCwSquareIcon className='w-30 h-30'/> {t("changeOrientation")}
                </p>
            </div>
        );
    }

    if (!isInitialized) return (
        <div className="w-full h-full flex-center p-10 mt-[20vh] z-20">
            <p className="text-6xl font-bold text-center flex-center flex-row gap-4">
                <LoaderIcon className='w-52 h-52'/> {t("loading")}
            </p>
        </div>
    );

    return (
        <div className="relative min-h-screen w-full overflow-y-auto flex flex-col">
            <div
                className="absolute inset-0 bg-cover bg-center brightness-50"
                style={{
                    backgroundImage: `url(${background})`,
                }}
            />
            <div className="relative z-20">
                {screens[state]}
            </div>
        </div>
    );

}

export default App
