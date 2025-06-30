import {useInteractionHoldStore} from "../../store/InteractionHoldStore.ts";

const HoldProgress = ({x, y}: { x: number; y: number }) => {
  const {progress} = useInteractionHoldStore();
  const clamped = Math.min(1, Math.max(0, progress));
  const percent = Math.round(clamped * 100);

  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: x - 50,
        top: y - 30,
        width: 100,
      }}
    >
      <div className="w-full h-2 bg-neutral-700 rounded overflow-hidden shadow">
        <div
          className="h-full bg-cyan-400 transition-all duration-75"
          style={{width: `${percent}%`}}
        />
      </div>
      <div className="text-xs text-center text-white mt-1 font-mono">
        {percent}%
      </div>
    </div>
  );
};

export default HoldProgress;