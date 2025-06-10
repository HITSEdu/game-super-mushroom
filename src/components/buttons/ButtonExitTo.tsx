import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import type {GlobalType} from "../../constants/types.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";

interface IProps {
    title: string;
    newState: GlobalType;
}

const ButtonExitTo = ({title, newState}: IProps) => {
    const {
        reset,
    } = useGameSessionStore();
    const changeGlobalState = useGlobalStore((s) => s.change);

    const {t} = useTranslation('translations')

    return (
        <Button title={t(title)} onClick={() => {
            changeGlobalState(newState);
            reset();
        }}/>
    );
}

export default ButtonExitTo;