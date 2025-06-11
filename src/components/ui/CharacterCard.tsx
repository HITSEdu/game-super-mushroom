import type {ICharacter} from "../../constants/interfaces.ts";
import {useTranslation} from "react-i18next";

const CharacterCard = (character: ICharacter) => {

    const {t} = useTranslation('translations');

    return (
        <div
            className="
            h-xs:text-sm h-sm:text-base h-md:text-lg h-lg:text-xl h-xl:text-2xl
            h-xs:p-4 h-sm:p-6 h-md:p-8 h-lg:p-10 h-xl:p-12
            flex-center flex-col rounded-2xl font-bold text-fg transition duration-200 shadow-md border-2 active:scale-95">
            <img src={character.src} alt={character.name}
                 className="w-28 h-28 h-sm:w-24 h-sm:h-24 h-xs:w-20 h-xs:h-20 m-2 object-contain"/>
            <h2 className="h-xs:text-md h-sm:text-lg h-md:text-xl h-lg:text-2xl h-xl:text-3xl font-bold">{character.name}</h2>
            <p>{t("speed")}: {character.speed}</p>
            <p>{t("jump")}: {character.jumpPower}</p>
        </div>
    );
};


export default CharacterCard;