import ButtonsMenu from "../menu/ButtonsMenu.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import MainMenu from "../menu/MainMenu.tsx";
import PlayMenu from "../menu/PlayMenu.tsx";
import SettingsMenu from "../menu/SettingsMenu.tsx";
import LanguageMenu from "../menu/LanguageMenu.tsx";
import VolumeMenu from "../menu/VolumeMenu.tsx";
import ConfirmMenu from "../menu/ConfirmMenu.tsx";

const HomeScreen = () => {
    const {t} = useTranslation('translations')
    const {menu: menu} = useMenuStore()


    const renderMenu = () => {
        switch (menu) {
            case 'main':
                return <MainMenu/>;
            case 'play':
                return <PlayMenu/>;
            case 'settings':
                return <SettingsMenu/>;
            case 'language':
                return <LanguageMenu/>;
            case 'confirm':
                return <ConfirmMenu/>;
            case 'volume':
                return <VolumeMenu/>;
        }
    }

    return (
        <div className="flex flex-col pb-[4vh]">
            <div className="gap-y-4 overscroll-auto">
                <div className="flex-center flex-col">
                    <h1 className="font-bold text-fg text-center
                            h-xs:text-8xl h-xs:mt-4
                            h-sm:text-9xl h-sm:mt-6
                            h-md:text-[10rem] h-md:mt-8
                            h-lg:text-[11rem] h-lg:mt-10
                            h-xl:text-[12rem] h-xl:mt-12
                            ">
                        {t("gameTitle")}
                    </h1>
                    <ButtonsMenu children={renderMenu()}/>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;