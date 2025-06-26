import type {IIcon} from "../../constants/interfaces.ts";

const IconKeyboardUp = ({className}: IIcon) => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
    >
        <path 
            d="M32 3.49234H28.4522V0H3.54778V3.49234H0V17.5077H3.54778V21H28.4522V17.5077H32V3.49234ZM24.8811 13.9923H7.09555V10.5H10.6667V7.00766H14.2144V3.49234H17.7622V7.00766H21.3333V10.5H24.8811V13.9923Z" 
            fill="currentColor"/>
    </svg>
);

export default IconKeyboardUp;