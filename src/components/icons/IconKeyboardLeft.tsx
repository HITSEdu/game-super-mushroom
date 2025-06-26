import type {IIcon} from "../../constants/interfaces.ts";

const IconKeyboardLeft = ({className}: IIcon) => (
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
            d="M17.4885 32V28.4315H21V3.56851H17.4885V0H3.51148V3.56851H0V28.4315H3.51148V32H17.4885ZM3.51148 14.2274H7V10.6589H10.4885V7.1137H14V24.8863H10.4885V21.3178H7V17.7726H3.51148V14.2274Z" 
            fill="currentColor"/>
    </svg>
);

export default IconKeyboardLeft;