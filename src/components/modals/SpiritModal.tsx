import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore.ts";
import {spirits} from "../../constants/spirits.tsx";

interface SpiritModalProps {
  spiritId: number;
}

const SpiritModal = ({spiritId}: SpiritModalProps) => {
  const close = useModalStore((s) => s.close);
  const {t} = useTranslation('translations');

  const spirit = spirits.find(s => s.id === spiritId);

  if (!spirit) return null;

  return (
    <div className="flex flex-col gap-4 items-center text-sm text-white">
      <h2 className="text-lg font-bold">{t('spiritGreeting', {name: spirit.name})}</h2>
      <p>{t(`spiritDialogue.${spirit.name.toLowerCase()}`)}</p>

      <button
        onClick={close}
        className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 transition"
      >
        {t('back')}
      </button>
    </div>
  );
};

export default SpiritModal;
