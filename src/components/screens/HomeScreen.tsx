import ButtonsMenu from "../ButtonsMenu.tsx";
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
                    <h1 className="font-bold text-9xl text-fg mt-12 text-center">
                        {t("gameTitle")}
                    </h1>
                    <ButtonsMenu children={renderMenu()}/>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;