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
import {H1_STYLES} from "../../constants/values.ts";
import StoryIntro from "../ui/StoryIntro.tsx";

const BASE_URL = import.meta.env.BASE_URL;

const LevelsScreen = () => {
  const {t} = useTranslation('translations');
  const {textureString: playerTexture, change: changePlayer} = usePlayerStore();
  const {
    storyShown,
    setStoryShown,
    change: changeGlobalState,
  } = useGlobalStore();

  const startLevel = useGameSessionStore((state) => state.startLevel);
  const levels = useLevelsStore((state) => state.levels);

  const [isJumping, setIsJumping] = useState(false);
  const [showStory, setShowStory] = useState(false);

  const startJump = () => {
    const firstLevel = Object.values(levels).find(l => l.unlocked);
    if (!firstLevel) return;

    setIsJumping(true);

    setTimeout(() => {
      if (storyShown) {
        startLevel(firstLevel.id);
        changeGlobalState('playing');
      } else {
        setShowStory(true);
      }
    }, 2000);
  };

  useEffect(() => {
    if (!playerTexture) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === 'а' || e.key.toLowerCase() === 'f') && !isJumping && !showStory) {
        startJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, showStory, levels, playerTexture]);


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
        className={`${H1_STYLES}text-center font-bold text-fg mask-b-from-0 mb-3`}
      >
        {t('jumpInto')}
      </motion.h1>

      <motion.img
        src={`${BASE_URL}/assets/portal.png`}
        alt="Portal"
        className="h-[60dvh] h-mobile:h-[50dvh] z-10 my-4 h-mobile:my-2 cursor-pointer transition-all"
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
        className="h-xs:text-lg
                            h-sm:text-lg
                            h-md:text-xl
                            h-lg:text-2xl
                            h-xl:text-2xl
        text-3xl z-10 mb-6 h-mobile:mb-2"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.5}}
      >
        {t('timeJump')}
      </motion.div>

      <motion.div
        className="relative flex-center gap-4 z-10 mb-2 w-full"
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
        {storyShown &&
          <div className='absolute right-4'>
            <Button
              title={t('synopsis.name')}
              onClick={() => {
                setStoryShown(false);
                setShowStory(prev => !prev);
              }}
            />
          </div>
        }
      </motion.div>

      <AnimatePresence>
        {isJumping && (
          <>
            <motion.div
              className="absolute inset-0 z-20 bg-black"
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
      {showStory && (
        <StoryIntro
          onClose={() => {
            const firstLevel = Object.values(levels).find(l => l.unlocked);
            if (firstLevel) {
              setStoryShown(true);
              startLevel(firstLevel.id);
              changeGlobalState('playing');
            }
          }}
        />
      )}
    </div>
  );
};

export default LevelsScreen;