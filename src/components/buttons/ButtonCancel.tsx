import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";

const ButtonCancel = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()


    return (
        <Button title={t('cancel')} onClick={() => changeMenu('main')}
                className='text-red-500'/>
    );
}

export default ButtonCancel;