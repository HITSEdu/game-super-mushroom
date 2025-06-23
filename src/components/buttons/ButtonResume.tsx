import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";

const ButtonResume = () => {
  const {t} = useTranslation('translations')

  const {resume} = useGameSessionStore();

  return (
    <Button
      title={t('continue')}
      onClick={() => {
        resume()
      }}
    />
  );
}

export default ButtonResume;