import {motion} from 'framer-motion';
import {useInteractionHoldStore} from "../../store/InteractionHoldStore.ts";

const SIZE = 16;

const HoldCircle = ({x, y}: { x: number; y: number }) => {
  const {progress} = useInteractionHoldStore();

  return (
    <div
      className="pointer-events-none absolute z-50"
      style={{
        left: x,
        top: y - SIZE - 4,
        width: SIZE,
        height: SIZE,
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#555"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#00f0ff"
          strokeWidth="10"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={283 * (1 - progress)}
          strokeLinecap="round"
          initial={false}
          animate={{strokeDashoffset: 283 * (1 - progress)}}
        />
      </svg>
    </div>
  );
};

export default HoldCircle;