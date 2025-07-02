import {useLevelStore} from "../../../store/LevelStore.ts";
import {getTextureSafe} from "../../utils/getTextureSafe.ts";
import {Enemy} from "./Enemy.tsx";

const EnemiesList = () => {
  const enemies = useLevelStore(state => state.enemies);

  return (
    enemies.filter(e => e.state !== 'dead').map((enemy) => (
      <Enemy
        key={enemy.id}
        x={enemy.position.x}
        y={enemy.position.y}
        texture={getTextureSafe(enemy.type.split('#')[0])}
        size={enemy.size}
        type={enemy.type}
      />
    ))
  );
}

export default EnemiesList;