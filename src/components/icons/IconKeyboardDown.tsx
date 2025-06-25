import type {IIcon} from "../../constants/interfaces.ts";

const IconKeyboardDown = ({className}: IIcon) => (
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
            d="M28.4522 21V17.5077H32V3.49234H28.4522V0H3.54778V3.49234H0V17.5077H3.54778V21H28.4522ZM7.09555 6.98468H24.8811V10.5H21.3333V13.9923H17.7622V17.5077H14.2144V13.9923H10.6667V10.5H7.09555V6.98468Z" 
            fill="white"/>
    </svg>
);

export default IconKeyboardDown;