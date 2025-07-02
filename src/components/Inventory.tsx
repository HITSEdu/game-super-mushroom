import Item from "./ui/Item.tsx";
import {useInventoryStore} from "../store/InventoryStore.ts";
import {TOTAL_SLOTS} from "../constants/values.ts";

const Inventory = () => {
  const items = useInventoryStore(state => state.items);
  const doAction = useInventoryStore(state => state.doAction);

  const slots = Array(TOTAL_SLOTS).fill(null);
  items.forEach(item => {
    if (item.id <= TOTAL_SLOTS) {
      slots[item.id - 1] = item;
    }
  });

  return (
    <div className="grid grid-cols-7 gap-2 h-mobile:gap-1 p-2 mb-auto mt-2 h-mobile:mt-1 rounded-lg w-fit border-2">
      {slots.map((item, index) =>
        item ? (
          <Item
            key={`item-${index}`}
            id={item.id}
            source={item.source}
            amount={item.amount}
            action={() => doAction(item.id)}
            height={item.height}
          />
        ) : (
          <div
            key={`empty-${index}`}
            className="w-12 h-12 h-mobile:w-8 h-mobile:h-8 rounded-lg border bg-black border-white flex-center opacity-30"
          />
        )
      )}
    </div>
  );
};

export default Inventory;
