import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import {spirits} from "../../constants/spirits.tsx";
import {useMiniGameStore} from "../../store/MiniGameStore.ts";

interface SpiritModalProps {
  spiritId: number;
}

const SpiritModal = ({spiritId}: SpiritModalProps) => {
    const close = useModalStore((s) => s.close);
    const {t} = useTranslation('translations');

    const spirit = spirits.find(s => s.id === spiritId);
    const {startMiniGame, isCompleted} = useMiniGameStore();

    if (!spirit) return null;

    const spiritKey = spirit.name.toLowerCase();

    const handleHelpClick = () => {
      startMiniGame(spiritKey);
      close();
    };

    return (
      <div className="flex flex-col gap-4 items-center text-lg text-white">
        <h2 className="text-lg font-bold">{t('spiritGreeting', {name: spirit.name})}</h2>
        <p>{t(`spiritDialogue.${spiritKey}`)}</p>
        <div className="flex items-center justify-between w-full gap-3">
          {!isCompleted(spiritKey) ? <button
              onClick={handleHelpClick}
              className={`w-full px-5 py-3 rounded bg-gray-600 hover:bg-gray-800 transition`}
            >
              {t('help')}
            </button> :
            <div
              className={`w-full px-5 py-3 rounded bg-gray-500 transition`}
            >{t('alreadyHelped')}</div>}

          <button
            onClick={close}
            className="px-3 py-3 rounded bg-gray-700 text-white hover:bg-gray-800 transition"
          >
            {t('back')}
          </button>
        </div>
      </div>
    );
  }
;

export default SpiritModal;