import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconBack from "../icons/IconBack.tsx";
import type {MenuType} from "../../constants/types.ts";

interface IProps {
    newState: MenuType;
}

const ButtonBack = ({newState}: IProps) => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('back')} onClick={() => changeMenu(newState)}
                textColorClass="text-red-500 hover:text-red-400"
                textGradientClass="from-rose-700"
                icon={<IconBack className='w-8 h-8'/>}/>
    );
}

export default ButtonBack;