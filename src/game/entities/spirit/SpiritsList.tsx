import {useLevelStore} from "../../../store/LevelStore.ts";
import {getTextureSafe} from "../../utils/getTextureSafe.ts";
import {Spirit} from "./Spirit.tsx";

const SpiritsList = () => {
  const spirits = useLevelStore(state => state.spirits);

  return (
    spirits.filter(e => e.visible).map((spirit) => (
      <Spirit
        key={spirit.id}
        x={spirit.x}
        y={spirit.y}
        size={spirit.size}
        texture={getTextureSafe(`${spirit.type}`)}
      />
    ))
  );
};

export default SpiritsList;