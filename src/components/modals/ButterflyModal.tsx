import {useModalStore} from "../../store/ModalStore.ts";
import {useTranslation} from "react-i18next";

interface ModalProps {
  title: string;
}

const ButterflyModal = ({title}: ModalProps) => {
  const {close} = useModalStore();
  const {t} = useTranslation('translations');

  return (
    <div className="flex flex-col gap-3 items-center text-sm">
      <p>
        Это одна из 4 сезонных бабочек, символизирующая {title}.
      </p>
      <button
        onClick={() => close()}
        className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 col-span-2 text-sm"
      >
        {t('back')}
      </button>
    </div>
  );
}

export default ButterflyModal;