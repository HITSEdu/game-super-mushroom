import ButtonConfirm from "../buttons/ButtonConfirm.tsx";
import {useTranslation} from "react-i18next";
import ButtonCancel from "../buttons/ButtonCancel.tsx";

const ConfirmMenu = () => {
    const {t} = useTranslation('translations')

    return (
        <>
            <h2 className='font-bold text-3xl text-center'>{t('confirmNewGame')}</h2>
            <ButtonConfirm/>
            <ButtonCancel/>
        </>
    )
}

export default ConfirmMenu;