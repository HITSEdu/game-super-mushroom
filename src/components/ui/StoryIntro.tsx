import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Button from "../buttons/Button.tsx";
import {useTranslation} from "react-i18next";

const StoryIntro = ({onClose}: { onClose: () => void }) => {
  const {t} = useTranslation('translations');
  const fullText = t('synopsis.text') as string;

  const [text, setText] = useState('');
  const [finished, setFinished] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: number;

    const typeText = () => {
      interval = setInterval(() => {
        if (skip) {
          setText(fullText);
          setFinished(true);
          clearInterval(interval);
          return;
        }

        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setFinished(true);
        }
      }, 65);
    };

    typeText();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !finished) {
        setSkip(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullText, skip]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-50 flex-center flex-col text-white"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
        <div
          className="max-w-[60vw] text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-left whitespace-pre-wrap"
        >
          {text}
        </div>

        {finished && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <Button
              title={t('synopsis.understood')}
              onClick={onClose}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryIntro;