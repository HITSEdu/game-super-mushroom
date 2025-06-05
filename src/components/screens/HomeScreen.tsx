import ButtonsMenu from "../ButtonsMenu.tsx";
import {useTranslation} from "react-i18next";
import Button from "../ui/Button.tsx";
import {useMenuStore} from "../../store/MenuStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useLevelsStore} from "../../store/LevelsStore.ts";
import VolumeChanger from "../ui/VolumeChanger.tsx";

const HomeScreen = () => {
    const {t, i18n} = useTranslation('translations')
    const {menu: menu, change: changeMenu, reset: resetMenu} = useMenuStore()

    const changeGlobalState = useGlobalStore((state) => state.change)
    const resetLevelsState = useLevelsStore((state) => state.resetProgress)

    const renderMenu = () => {
        switch (menu) {
            case 'main':
                return (
                    <>
                        <Button title={t('newGame')} onClick={() => changeMenu('confirm')}/>
                        <Button title={t('continue')} onClick={() => {
                            changeGlobalState('levelSelect');
                            resetMenu();
                        }}/>
                        <Button title={t('settings')} onClick={() => changeMenu('settings')}/>
                    </>
                );
            case 'settings':
                return (
                    <>
                        <Button title={t('volume')} onClick={() => changeMenu('volume')}/>
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
            case 'confirm':
                return (
                    <>
                        <h2 className='font-bold text-3xl text-center'>{t('confirmNewGame')}</h2>
                        <Button title={t('confirm')} onClick={() => {
                            resetLevelsState();
                            resetMenu();
                            changeGlobalState('levelSelect');
                        }}/>
                        <Button title={t('cancel')} onClick={() => changeMenu('main')}/>
                    </>
                )
            case 'volume':
                return (
                    <>
                        <VolumeChanger/>
                        <Button title={t('back')} onClick={() => changeMenu('settings')}/>
                    </>
                )
        }
    }

    return (
        <div className="flex-center flex-col">
            <h1 className="font-bold text-4xl text-fg mt-6 text-center">
                {t("gameTitle")}
            </h1>
            <ButtonsMenu children={renderMenu()}/>
        </div>
    )
}

export default HomeScreen;