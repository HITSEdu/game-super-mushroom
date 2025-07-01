import {useLevelStore} from "../../../store/LevelStore.ts";
import {getTextureSafe} from "../../utils/getTextureSafe.ts";
import {memo} from "react";
import {Fire} from "../../effects/items/Fire.tsx";
import Tree from "./Tree.tsx";

const DecorationsList = memo(() => {
  const decorations = useLevelStore(state => state.decorations);

  return (
    decorations.filter(e => e.visible).map((d) => {
      if (d.type.startsWith("fire")) return (
        <Fire
          key={`${d.x}-${d.y}-${d.type}`}
          x={d.x}
          y={d.y}
        />
      )
      if (d.type.startsWith("tree")) return (
        <Tree
          key={`${d.x}-${d.y}-${d.type}`}
          x={d.x}
          y={d.y}
          texture={getTextureSafe(d.type)}
        />
      )
    })
  );
});

export default DecorationsList;