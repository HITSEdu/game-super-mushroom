import {usePlayerStore} from "../../store/PlayerStore.ts";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {press, release} from "../../game/systems/ControlSystem.ts"

interface Props {
  offsetX: number;
  offsetY: number;
  scale: { x: number; y: number };
}

const InteractionHint = ({offsetX, offsetY, scale}: Props) => {
  const interactions = usePlayerStore((state) => state.nearInteractive);
  const {t} = useTranslation('translations');

  return (
    <AnimatePresence>
      {interactions
        .filter((i) => i.visible)
        .map((inter) => {
          const screenX = offsetX + (inter.x + 0.5) * scale.x;
          const screenY = offsetY + inter.y * scale.y - 10;

          const handleClick = () => {
            const key = inter.key?.toLowerCase?.();
            if (key) {
              press(key);
              setTimeout(() => release(key), 100);
            }
          };

          return (
            <motion.div
              key={inter.id}
              onClick={handleClick}
              initial={{opacity: 0, scale: 0.9, y: -10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.9, y: -10}}
              transition={{duration: 0.15, ease: "easeOut"}}
              style={{
                position: "absolute",
                left: screenX,
                top: screenY,
                cursor: "pointer",
              }}
              className="transform -translate-x-1/2 -translate-y-full
                         bg-[#1e1e1e] border border-[#666] text-white
                         text-[10px] px-2 py-[2px] rounded
                         pointer-events-auto whitespace-nowrap z-20
                         shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.5)]"
            >
              {t(inter.title)}
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
};

export default InteractionHint;