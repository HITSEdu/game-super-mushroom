import {usePlayerStore} from "../../store/PlayerStore.ts";
import {useModalStore} from "../../store/ModalStore.ts";
import type {SeasonType} from "../../constants/types.ts";
import {useTranslation} from "react-i18next";
import {SEASONS} from "../../constants/values.ts";

const PortalModal = () => {
  const setSeason = usePlayerStore((s) => s.setSeason);
  const close = useModalStore((s) => s.close);
  const { t } = useTranslation('translations');

  const handleSelect = (season: SeasonType) => {
    setSeason(season);
    close();
  };

  return (
    <div className="relative flex flex-col gap-3 items-center text-sm p-4">
      <h2 className="text-white text-lg font-bold">{t('selectLocation')}</h2>
      <div className="grid grid-cols-2 gap-2 w-full">
        {SEASONS.map(({ key, label, background }) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`px-3 py-2 rounded text-white transition-all text-sm ${key === 'underworld' ? 'col-span-2' : 'col-span-1'} hover:opacity-50`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {t(label)}
          </button>
        ))}
        <button
          onClick={close}
          className="px-3 py-2 rounded text-white bg-gray-700 transition-all text-sm hover:opacity-50 col-span-2"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
};

export default PortalModal;
