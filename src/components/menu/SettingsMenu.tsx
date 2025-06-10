import ButtonBack from "../buttons/ButtonBack.tsx";
import ButtonVolume from "../buttons/ButtonVolume.tsx";
import ButtonLanguage from "../buttons/ButtonLanguage.tsx";

const SettingsMenu = () => {
    return (
        <>
            <ButtonVolume/>
            <ButtonLanguage/>
            <ButtonBack newState='main'/>
        </>
    );
}

export default SettingsMenu;