import type {ICharacter} from "../../constants/interfaces.ts";
import {useTranslation} from "react-i18next";

const CharacterCard = (character: ICharacter) => {

    const {t} = useTranslation('translations');

    return (
        <div
            className="p-10 m-4 flex-center flex-col rounded-2xl font-bold text-lg transition duration-200 shadow-md border-2 active:scale-95">
            <img src={character.src} alt={character.name} className="w-24 h-24 m-2"/>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p>{t("speed")}: {character.speed}</p>
            <p>{t("jump")}: {character.jumpPower}</p>
            <p>{t("size")}: {character.size.height}x{character.size.width}</p>
        </div>
    );
};


export default CharacterCard;