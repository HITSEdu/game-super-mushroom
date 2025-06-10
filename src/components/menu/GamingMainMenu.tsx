import ButtonSettings from "../buttons/ButtonSettings.tsx";
import ButtonResume from "../buttons/ButtonResume.tsx";
import ButtonExitTo from "../buttons/ButtonExitTo.tsx";

const GamingMainMenu = () => {
    return (
        <>
            <ButtonResume/>
            <ButtonSettings/>
            <ButtonExitTo title='exitToLevels' newState='levelSelect'/>
            <ButtonExitTo title='exitToMenu' newState='menu'/>
        </>
    );
}

export default GamingMainMenu;