import {useLevelsStore} from '../../store/LevelsStore.ts';
import {useGlobalStore} from "../../store/GlobalStore.ts";
import {useGameSessionStore} from "../../store/GameSessionStore.ts";
import {useTranslation} from "react-i18next";
import {usePlayerStore} from "../../store/PlayerStore.ts";
import SelectorCharacter from "../SelectorCharacter.tsx";
import ButtonBack from "../buttons/ButtonBack.tsx";
import Button from "../buttons/Button.tsx";
import {useEffect, useState} from "react";
import {motion, AnimatePresence} from 'framer-motion';
import {sounds} from "../../game/utils/sound.ts";

const LevelsScreen = () => {
  const {t} = useTranslation('translations');
  const {textureString: playerTexture, change: changePlayer} = usePlayerStore();
  const changeGlobalState = useGlobalStore((state) => state.change);
  const startLevel = useGameSessionStore((state) => state.startLevel);
  const levels = useLevelsStore((state) => state.levels);

  const [isJumping, setIsJumping] = useState(false);

  const startJump = () => {
    const firstLevel = Object.values(levels).find(l => l.unlocked);
    if (!firstLevel) return;

    setIsJumping(true);
    sounds['portal'].play();

    sounds['portal'].rate(1);
    let rate = 1.0;
    const slowdown = setInterval(() => {
      rate -= 0.05;
      if (rate <= 0.3) {
        clearInterval(slowdown);
      } else {
        sounds['portal'].rate(rate);
      }
    }, 100);

    setTimeout(() => {
      startLevel(firstLevel.id);
      changeGlobalState('playing');
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f' && !isJumping) {
        startJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [levels, isJumping]);

  if (!playerTexture) {
    return (
      <div className="w-full h-screen overflow-hidden flex flex-col pb-[4vh]">
        <SelectorCharacter />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex-center flex-col text-white">

      <motion.h1
        initial={{opacity: 0, y: -30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className="text-center font-bold text-fg text-6xl mb-4"
      >
        {t('jumpInto')}
      </motion.h1>

      <motion.img
        src="/icons/icon-192x192.png"
        alt="Portal"
        className="h-[60dvh] z-10 my-4 cursor-pointer transition-all"
        initial={{scale: 1, opacity: 0, x: -30}}
        animate={{scale: 1, opacity: 1, x: 0}}
        transition={{duration: 1, ease: "easeInOut"}}
        whileHover={{scale: 1.05, filter: 'brightness(1.2)'}}
        whileTap={{scale: 0.95}}
        onClick={() => {
          if (!isJumping) {
            startJump();
          }
        }}
      />

      <motion.div
        className="text-3xl z-10 mb-6"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.5}}
      >
        {t('timeJump')}
      </motion.div>

      <motion.div
        className="flex gap-4 z-10"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.7}}
      >
        <ButtonBack
          newState={'menu'}
          global
        />
        <Button
          title={t("changePlayer")}
          onClick={() => changePlayer()}
        />
      </motion.div>

      <AnimatePresence>
        {isJumping && (
          <>
            <motion.div
              className="absolute inset-0 z-20 bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-800"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1.5, ease: "easeInOut"}}
            />

            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{opacity: 1, scale: 1}}
                animate={{
                  y: [0, -100],
                  opacity: [1, 0],
                  scale: [1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: Math.random()
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelsScreen;