import {usePlayerStore} from "../../store/PlayerStore.ts";
import {useModalStore} from "../../store/ModalStore.ts";
import type {SeasonType} from "../../constants/types.ts";
import {useTranslation} from "react-i18next";
import {SEASONS} from "../../constants/values.ts";

const PortalModal = () => {
  const setSeason = usePlayerStore((s) => s.setSeason);
  const close = useModalStore((s) => s.close);
  const {t} = useTranslation('translations');

  const handleSelect = (season: SeasonType) => {
    setSeason(season);
    close();
  };

  return (
    <div className="flex flex-col gap-3 items-center text-sm">
      <h2 className="text-white text-lg font-bold">{t('selectLocation')}</h2>
      <div className="grid grid-cols-2 gap-2 w-full">
        {SEASONS.map(({key, label, className}) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`px-3 py-2 rounded text-white transition text-sm 
              ${className} ${key === 'underworld' ? 'col-span-2' : 'col-span-1'}`}
          >
            {t(label)}
          </button>
        ))}
        <button
          onClick={close}
          className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 col-span-2"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
};

export default PortalModal;
