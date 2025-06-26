import HomeScreen from "./components/screens/HomeScreen.tsx";
import GameScreen from "./components/screens/GameScreen.tsx";
import {useGlobalStore} from "./store/GlobalStore.ts";
import LevelsScreen from "./components/screens/LevelsScreen.tsx";
import {useEffect, useState} from "react";
import {useAssetsStore} from "./store/AssetsStore.ts";
import {useTranslation} from "react-i18next";
import {LoaderIcon, RotateCwSquareIcon} from "lucide-react";
import BaseScreen from "./components/screens/BaseScreen.tsx";
import {useBackgroundStore} from "./store/BackgroundStore.tsx";
import TitlesScreen from "./components/screens/TitlesScreen.tsx";

const App = () => {
  const state = useGlobalStore(s => s.global)
  const {isInitialized, initialize} = useAssetsStore();

  const {t} = useTranslation('translations')

  const [orientation, setOrientation] = useState(true);

  const {background, randomBackground} = useBackgroundStore();

  useEffect(() => {
    randomBackground();
  }, [randomBackground]);

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
    menu: <HomeScreen />,
    levelSelect: <LevelsScreen />,
    playing: <GameScreen />,
    titles: <TitlesScreen />
  };

  if (!orientation)
    return (
      <BaseScreen backgroundUrl={background}>
        <p className="text-2xl font-bold text-center flex items-center flex-col text-white-500 p-10 mt-[-12vh] z-20">
          <RotateCwSquareIcon className='w-30 h-30 animate-bounce' /> {t("changeOrientation")}
        </p>
      </BaseScreen>
    );

  if (!isInitialized)
    return (
      <BaseScreen backgroundUrl={background}>
        <p className="text-5xl font-bold text-center text-white flex-center gap-4 z-20">
          <LoaderIcon className='w-32 h-32 animate-spin' /> {t("loading")}
        </p>
      </BaseScreen>
    );

  return (
    <BaseScreen
      backgroundUrl={background}
      darkenBackground
    >
      <div className="relative z-20 w-full h-full text-center flex flex-col overflow-y-auto">
        {screens[state]}
      </div>
    </BaseScreen>
  );
}

export default App
