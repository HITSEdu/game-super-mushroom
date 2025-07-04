import {useTranslation} from "react-i18next";
import ButtonExitTo from "../buttons/ButtonExitTo.tsx";

const TitlesScreen = () => {
  const {t} = useTranslation("translations");

  return (
    <div className="w-full h-full flex-center flex-col text-white px-4 text-center gap-6">
      <h1 className="text-4xl font-bold">{t("titles.thanks")}</h1>
      <p className="text-lg">{t("titles.message")}</p>
      <ButtonExitTo
        title={t("titles.backToMenu")}
        newState="menu"
      />
    </div>
  );
};

export default TitlesScreen;
