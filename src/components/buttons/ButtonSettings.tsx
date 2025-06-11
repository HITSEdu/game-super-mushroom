import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconSettings from "../icons/IconSettings.tsx";
import {ICON_STYLES} from "../../constants/values.ts";

const ButtonSettings = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('settings')} onClick={() => changeMenu('settings')}
                icon={<IconSettings className={ICON_STYLES}/>}
        />
    );
}

export default ButtonSettings;