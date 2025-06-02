import type {ReactNode} from "react";

interface Props {
    title: ReactNode
    onClick: () => void
    disabled?: boolean
}

const Button = ({title, onClick, disabled}: Props) => {
    return (
        <button
            className={`flex-center flex-col p-4 w-full rounded-2xl font-bold text-lg transition duration-200 shadow-md border-2 ${
                disabled
                    ? 'bg-gray-600 border-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-primary-600 border-primary-400 text-pr-400 hover:bg-primary-700 active:scale-95'
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
};


export default Button;