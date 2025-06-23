import {useMusicPlayerStore} from "../../store/MusicPlayerStore.ts";
import {useModalStore} from "../../store/ModalStore.ts";
import {SONG_NAMES} from "../../constants/values.ts";
import {useTranslation} from "react-i18next";

const MusicModal = () => {
  const setMusic = useMusicPlayerStore((s) => s.setMusic);
  const close = useModalStore((s) => s.close);

  const {t} = useTranslation('translations');

  const handleClick = (key: string) => {
    setMusic(key);
    close();
  };

  return (
    <div className="flex flex-col gap-3 items-center text-sm">
      <h2 className="text-white text-lg font-bold">{t('selectMusic')}</h2>
      <div className="grid grid-cols-2 gap-2 w-full">
        {SONG_NAMES.map((track) => (
          <button
            key={track.key}
            onClick={() => handleClick(track.key)}
            className={
              "px-3 py-2 rounded text-white transition text-sm " +
              (track.key === 'music0'
                ? 'col-span-2 bg-red-500 hover:bg-red-600'
                : 'col-span-1 bg-blue-600 hover:bg-blue-700')
            }
          >
            {t(track.label)}
          </button>
        ))}
        <button
          onClick={() => close()}
          className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 col-span-2 text-sm"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
};

export default MusicModal;