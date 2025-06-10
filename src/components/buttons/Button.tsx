import type {ReactNode} from "react";

interface Props {
    title: ReactNode
    onClick: () => void
    disabled?: boolean
    className?: string
    icon?: ReactNode
    iconPosition?: "left" | "right"
}

const Button = ({title, onClick, disabled, className = '', icon, iconPosition = 'right'}: Props) => {
    return (
        <button
            className={`gap-2.5 flex-center p-4 rounded-2xl font-bold text-4xl transition duration-200 shadow-md border-4 ${
                disabled
                    ? 'bg-gray-600 border-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-primary-600 border-primary-400 text-pr-400 hover:bg-primary-700 active:scale-95 cursor-pointer'
            } ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {iconPosition === "left" && icon}
            {title}
            {iconPosition === "right" && icon}
        </button>
    );
};


export default Button;