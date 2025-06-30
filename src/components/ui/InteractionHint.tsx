import {usePlayerStore} from "../../store/PlayerStore.ts";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {press, release} from "../../game/systems/ControlSystem.ts";
import {useInteractionHoldStore} from "../../store/InteractionHoldStore.ts";
import HoldProgress from "./HoldProgress.tsx";

const SIZE = 40;

interface Props {
  offsetX: number;
  offsetY: number;
  scale: { x: number; y: number };
}

const InteractionHint = ({offsetX, offsetY, scale}: Props) => {
  const interactions = usePlayerStore(s => s.nearInteractive);
  const {interactionId} = useInteractionHoldStore();
  const {t} = useTranslation("translations");

  const stop = (key: string) => release(key as "use" | "interact");
  const start = (key: string) => {
    press(key as "use" | "interact");
  }

  return (
    <AnimatePresence>
      {interactions.filter(i => i.visible).map(inter => {
        const screenX = offsetX + (inter.x + 0.5) * scale.x;
        const screenY = offsetY + inter.y * scale.y - 10;

        return (
          <div key={inter.id}>
            <motion.div
              onMouseDown={() => start(inter.key)}
              onMouseUp={() => stop(inter.key)}
              onMouseLeave={() => stop(inter.key)}
              onTouchStart={() => start(inter.key)}
              onTouchEnd={() => stop(inter.key)}
              onTouchCancel={() => stop(inter.key)}
              initial={{opacity: 0, scale: 0.9, y: -10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.9, y: -10}}
              transition={{duration: 0.2, ease: "easeOut"}}
              style={{
                position: "absolute",
                left: screenX,
                top: screenY,
                cursor: "pointer",
              }}
              className={`
                transform -translate-x-1/2 -translate-y-full
                bg-[#1e1e1e] border border-[#666] text-white
                text-[10px] px-2 py-[2px] rounded-lg
                pointer-events-auto whitespace-nowrap z-20
                shadow-[0_0_0_1px_rgba(255,255,255,0.1),
                0_1px_2px_rgba(0,0,0,0.5)]
              `}
            >
              {t(inter.title)}
            </motion.div>

            {interactionId === inter.id && inter.holdable && (
              <HoldProgress
                x={screenX - SIZE / 2}
                y={screenY - SIZE / 2}
              ></HoldProgress>
            )}
          </div>
        );
      })}
    </AnimatePresence>
  );
};

export default InteractionHint;