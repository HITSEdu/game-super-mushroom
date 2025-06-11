import type {IIcon} from "../../constants/interfaces.ts";

const IconPlus = ({className}: IIcon) => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
    >
        <path
            d="M16 29.333H13.333V26.667H10.667V24H13.333V8H10.667V5.33301H13.333V2.66699H16V29.333ZM10.667 24H8V21.333H10.667V24ZM8 13.333H5.33301V18.667H8V21.333H2.66699V10.667H8V13.333ZM25.333 14.667H29.333V17.333H25.333V21.333H22.667V17.333H18.667V14.667H22.667V10.667H25.333V14.667ZM10.667 10.667H8V8H10.667V10.667Z"
            fill="white"/>
    </svg>
);

export default IconPlus;