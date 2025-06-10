import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";

const ButtonNewGame = () => {
    const {t} = useTranslation('translations')
    const {change: changeMenu} = useMenuStore()

    return (
        <Button title={t('newGame')} onClick={() => changeMenu('confirm')}/>
    );
}

export default ButtonNewGame;