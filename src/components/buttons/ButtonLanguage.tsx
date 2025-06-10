import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconLanguage from "../icons/IconLanguage.tsx";

const ButtonLanguage = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('language')} onClick={() => changeMenu('language')}
                icon={<IconLanguage className='w-8 h-8 mt-1'/>}/>
    );
}

export default ButtonLanguage;