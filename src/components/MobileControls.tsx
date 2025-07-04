import {press, release} from '../game/systems/ControlSystem.ts'
import IconKeyboardDown from './icons/IconKeyboardDown.tsx';
import IconKeyboardLeft from './icons/IconKeyboardLeft.tsx';
import IconKeyboardRight from './icons/IconKeyboardRight.tsx';
import IconKeyboardUp from './icons/IconKeyboardUp.tsx';
import {usePlayerStore} from "../store/PlayerStore.ts";
import {useLevelStore} from "../store/LevelStore.ts";
import {useTranslation} from "react-i18next";

const MobileControls = () => {
  const isMobile = window.innerWidth <= 1000 || window.innerHeight <= 600;
  const {t} = useTranslation('translations');

  if (!isMobile) return null;

  const iconClasses = 'w-18 h-18 text-sky-50';
  const btnWrapper = 'pointer-events-auto flex-center';

  const {onLadder, nearInteractive} = usePlayerStore.getState();
  const {isMiniGame} = useLevelStore.getState();

  const currentInteraction = nearInteractive.find(i => i.visible);
  const interactionKey = currentInteraction?.key;

  return (
    <div className="fixed bottom-4 left-2 right-2 flex justify-between items-end px-2 z-50 pointer-events-none">
      <div className="flex flex-col items-start gap-6">
        {interactionKey && (
          <button
            className={`${btnWrapper}`}
            onTouchStart={() => press(interactionKey)}
            onTouchEnd={() => release(interactionKey)}
            onTouchCancel={() => release(interactionKey)}
            type="button"
          >
            <span
              className={` 
                bg-sky-50 border border-[#666] text-sky-950
                text-2xl h-18 w-18 rounded-xl flex-center`}
            >{t(interactionKey)}</span>
          </button>
        )}
        <div className="flex">
          <button
            className={btnWrapper}
            onTouchStart={() => press('left')}
            onTouchEnd={() => release('left')}
            onTouchCancel={() => release('left')}
            type="button"
          >
            <IconKeyboardLeft className={iconClasses} />
          </button>
          <button
            className={btnWrapper}
            onTouchStart={() => press('right')}
            onTouchEnd={() => release('right')}
            onTouchCancel={() => release('right')}
            type="button"
          >
            <IconKeyboardRight className={iconClasses} />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className={btnWrapper}
          onTouchStart={() => {
            if (onLadder || isMiniGame) {
              press('up');
            } else {
              press('jump');
            }
          }}
          onTouchEnd={() => {
            release('up');
            release('jump');
          }}
          onTouchCancel={() => {
            release('up');
            release('jump');
          }}
          type="button"
        >
          <IconKeyboardUp className={iconClasses} />
        </button>
        <button
          className={btnWrapper}
          onTouchStart={() => press('down')}
          onTouchEnd={() => release('down')}
          onTouchCancel={() => release('down')}
          type="button"
        >
          <IconKeyboardDown className={iconClasses} />
        </button>
      </div>
    </div>
  )
    ;
};

export default MobileControls;