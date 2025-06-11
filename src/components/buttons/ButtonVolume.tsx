import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconVolume from "../icons/IconVolume.tsx";
import {ICON_STYLES} from "../../constants/values.ts";

const ButtonVolume = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('volume')} onClick={() => changeMenu('volume')}
                icon={<IconVolume className={`mt-1 ${ICON_STYLES}`}/>}
        />
    );
}

export default ButtonVolume;