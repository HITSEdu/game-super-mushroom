import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconKeyboard from "../icons/IconKeyboard.tsx";
import {ICON_STYLES} from "../../constants/values.ts";

const ButtonPlay = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('play')} onClick={() => changeMenu('play')}
                icon={
                    <IconKeyboard className={ICON_STYLES}/>}/>
    );
}

export default ButtonPlay;