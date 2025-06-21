import {type RefObject, useEffect, useState} from "react";
import {useMusicPlayerStore} from "../store/MusicPlayerStore.ts";
import {useTranslation} from "react-i18next";

export function useMusicToast(ref: RefObject<ReturnType<typeof setTimeout> | null>) {

  const songNames: Record<string, string> = {
    'music1': 'winter',
    'music2': 'spring',
    'music3': 'summer',
    'music4': 'autumn',
  }

  const {t} = useTranslation('translations');

  const {music} = useMusicPlayerStore();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!music || music === 'music0') {
      setMessage(`${t('musicIsDisabled')}!`);
    } else {
      setMessage(`${t('currentlyPlaying')}: ${songNames[music] ?? '???'}`);
    }

    setVisible(true);

    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    };
  }, [music]);

  return {visible, message};
}