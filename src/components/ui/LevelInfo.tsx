import {RotateCwIcon, TimerIcon} from "lucide-react";
import {formatTime} from "../../game/utils/formatTime.ts";

interface IProps {
  attempts: number;
  time: number;
}

const LevelInfo = ({attempts, time}: IProps) => {
  return (
    <>
            <span
              className='flex-center mx-1 px-1 gap-1'
            ><RotateCwIcon />{attempts}</span>
      <span
        className='flex-center mx-1 px-1 gap-1'
      ><TimerIcon />{formatTime(time)}</span>
    </>
  );
}

export default LevelInfo;