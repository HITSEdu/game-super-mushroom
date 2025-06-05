import {useLevelsStore} from '../../store/LevelsStore.ts'
import {useGlobalStore} from "../../store/GlobalStore.ts";
import Button from "../ui/Button.tsx";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {ArrowLeft} from "lucide-react";
import LevelInfo from "../ui/LevelInfo.tsx";
import {useTranslation} from "react-i18next";

const LevelsScreen = () => {

    const {t} = useTranslation('translations');

    const levels = useLevelsStore((state) => state.levels)
    const changeGlobalState = useGlobalStore((state) => state.change)
    const startLevel = useGameSessionStore((state) => state.startLevel)

    return (
        <div className="relative">
            <h1 className="text-center text-3xl font-bold text-fg my-6">{t('selectLevel')}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-10">
                {Object.values(levels)
                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                    .map((level) => (
                        <Button
                            key={level.id}
                            disabled={!level.unlocked}
                            title={
                                <div className="flex-center flex-col text-center p-4">
                                    <span className="text-lg font-semibold">{t('level')} {level.id}</span>
                                    {level.completed && (
                                        <div className="flex-center mt-1 text-sm">
                                            <LevelInfo attempts={level.attempts} stars={level.stars ?? 0}
                                                       time={level.bestTime ?? 0}/>
                                        </div>
                                    )}
                                </div>
                            }
                            onClick={() => {
                                startLevel(level.id);
                                changeGlobalState('playing');
                            }}
                        />
                    ))}
                <button
                    className="flex-center right-4 w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-600 fixed top-4 transition-colors shadow-lg"
                    onClick={() => changeGlobalState('menu')}
                >
                    <ArrowLeft className="text-white w-5 h-5"/>
                </button>
            </div>
        </div>
    )
}

export default LevelsScreen;