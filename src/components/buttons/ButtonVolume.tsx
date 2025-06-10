import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconVolume from "../icons/IconVolume.tsx";

const ButtonVolume = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('volume')} onClick={() => changeMenu('volume')}
                icon={<IconVolume className='w-8 h-8 mt-1'/>}
        />
    );
}

export default ButtonVolume;