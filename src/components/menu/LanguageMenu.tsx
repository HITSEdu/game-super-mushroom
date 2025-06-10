import ButtonBack from "../buttons/ButtonBack.tsx";
import Button from "../buttons/Button.tsx";
import {useTranslation} from "react-i18next";

const LanguageMenu = () => {
    const {i18n} = useTranslation('translations')

    return (
        <>
            <Button title='Русский' onClick={() => i18n.changeLanguage('ru')}/>
            <Button title='English' onClick={() => i18n.changeLanguage('en')}/>
            <ButtonBack newState='settings'/>
        </>
    )
}

export default LanguageMenu;