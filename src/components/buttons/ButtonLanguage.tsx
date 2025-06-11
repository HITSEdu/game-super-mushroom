import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconLanguage from "../icons/IconLanguage.tsx";
import {ICON_STYLES} from "../../constants/values.ts";

const ButtonLanguage = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('language')} onClick={() => changeMenu('language')}
                icon={<IconLanguage className={`mt-1 ${ICON_STYLES}`}/>}/>
    );
}

export default ButtonLanguage;