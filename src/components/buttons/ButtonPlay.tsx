import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconKeyboard from "../icons/IconKeyboard.tsx";

const ButtonPlay = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('play')} onClick={() => changeMenu('play')}
                icon={<IconKeyboard className='w-8 h-8'/>}/>
    );
}

export default ButtonPlay;