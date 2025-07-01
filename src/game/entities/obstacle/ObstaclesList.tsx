import {useLevelStore} from "../../../store/LevelStore.ts";
import Obstacle from "./Obstacle.tsx";
import {getTextureSafe} from "../../utils/getTextureSafe.ts";
import {memo} from "react";

const ObstaclesList = memo(() => {
  const obstacles = useLevelStore(state => state.obstacles);

  return (
    obstacles.filter(e => e.visible).map((obs, i) => (
      <Obstacle
        key={`${i}-${obs.type}`}
        x={obs.x}
        y={obs.y}
        size={{width: obs.width, height: obs.height}}
        texture={getTextureSafe(obs.type)}
      />
    ))
  );
});

export default ObstaclesList;