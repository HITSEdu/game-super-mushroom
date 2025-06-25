import type {IIcon} from "../../constants/interfaces.ts";

const IconKeyboardRight = ({className}: IIcon) => (
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
            d="M17.5077 0H3.49234V3.56851H0V28.4315H3.49234V32H17.5077V28.4315H21V3.56851H17.5077V0ZM17.5077 17.7726H13.9923V21.3178H10.5V24.8863H7.00766V7.1137H10.5V10.6589H13.9923V14.2274H17.5077V17.7726Z" 
            fill="white"/>
    </svg>
);

export default IconKeyboardRight;