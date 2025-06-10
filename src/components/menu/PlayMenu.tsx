import ButtonBack from "../buttons/ButtonBack.tsx";
import ButtonNewGame from "../buttons/ButtonNewGame.tsx";
import ButtonContinue from "../buttons/ButtonContinue.tsx";

const PlayMenu = () => {
    return (
        <>
            <ButtonNewGame/>
            <ButtonContinue/>
            <ButtonBack newState='main'/>
        </>
    );
}

export default PlayMenu;