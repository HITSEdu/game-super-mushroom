import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";

const ButtonContinue = () => {
    const {t} = useTranslation('translations')
    const {reset: resetMenu} = useMenuStore()

    const changeGlobalState = useGlobalStore((state) => state.change)

    return (
        <Button title={t('continue')} onClick={() => {
            changeGlobalState('levelSelect');
            resetMenu();
        }}/>
    );
}

export default ButtonContinue;