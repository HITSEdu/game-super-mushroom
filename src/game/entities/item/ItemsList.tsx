import {useLevelStore} from "../../../store/LevelStore.ts";
import {getTextureSafe} from "../../utils/getTextureSafe.ts";
import {memo} from "react";
import Item from "./Item.tsx";

const ItemsList = memo(() => {
  const items = useLevelStore(state => state.items);

  return (
    items.filter(e => e.visible).map((item) => (
      <Item
        key={`${item.id}-${item.x}-${item.y}`}
        x={item.x}
        y={item.y}
        size={item.size}
        texture={getTextureSafe(`${item.type}`)}
      />
    ))
  );
});

export default ItemsList;