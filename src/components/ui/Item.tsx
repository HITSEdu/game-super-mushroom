import type {IItem} from "../../constants/interfaces.ts";

const Item = ({id, source, amount, action, height = 1}: IItem) => {
    return (
        <div
            onClick={action}
            className={`w-12 h-mobile:w-8 ${height === 2 ? 'row-span-2 h-26 h-mobile:h-17' : 'h-12 h-mobile:h-8'}
            relative bg-black rounded-lg border-2 h-mobile:border-1 border-white flex-center`}
        >
            <img src={source} alt={`item-${id}`} className="w-full h-[70%] object-contain"/>
            {amount > 1 && (
                <span className="absolute bottom-0 right-0 text-xs h-mobile:text-[0.5rem] text-white px-1">
                    {amount}
                </span>
            )}
        </div>
    );
};

export default Item;
