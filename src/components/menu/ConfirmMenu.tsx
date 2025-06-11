import ButtonConfirm from "../buttons/ButtonConfirm.tsx";
import {useTranslation} from "react-i18next";
import ButtonCancel from "../buttons/ButtonCancel.tsx";

const ConfirmMenu = () => {
    const {t} = useTranslation('translations')

    return (
        <>
            <h2 className='font-bold text-center
                            h-xs:text-xl
                            h-sm:text-2xl
                            h-md:text-3xl
                            h-lg:text-4xl
                            h-xl:text-5xl
            '>{t('confirmNewGame')}</h2>
            <ButtonConfirm/>
            <ButtonCancel/>
        </>
    )
}

export default ConfirmMenu;