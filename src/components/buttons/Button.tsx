import type {ReactNode} from "react";
import {motion} from "framer-motion";

interface Props {
    title?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    textColorClass?: string;
    textGradientClass?: string;
}

const Button = ({
                    title,
                    onClick,
                    disabled,
                    className = '',
                    icon,
                    iconPosition = 'right',
                    textColorClass,
                    textGradientClass,
                }: Props) => {
    return (
        <motion.button
            className={`group gap-2.5 flex-center rounded-2xl font-bold
                transition-all duration-300 shadow-lg border-4 relative
                
                h-xs:text-sm h-sm:text-base h-md:text-lg h-lg:text-2xl h-xl:text-4xl
                h-xs:p-2 h-sm:p-3 h-md:p-4 h-lg:p-5 h-xl:p-6
                
                ${disabled
                ? 'bg-gray-600 border-gray-500 text-gray-300 cursor-not-allowed'
                : `bg-primary-600 border-primary-400 ${textColorClass ?? "text-white hover:text-primary-50"} cursor-pointer`
            } ${className}`}
            onClick={onClick}
            disabled={disabled}
            whileHover={!disabled ? {scale: 1.05} : {}}
            whileTap={!disabled ? {scale: 0.95} : {}}
        >
            {!disabled && (
                <div className={`rounded-xl absolute inset-0 bg-gradient-to-r ${textGradientClass ?? "from-sky-500"}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}/>
            )}
            {!disabled && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-y-full -left-20 w-20 bg-gradient-to-r from-transparent
                        via-white/30 to-transparent transform rotate-12 group-hover:translate-x-70
                        transition-all duration-1000"/>
                </div>
            )}

            {iconPosition === "left" && icon}
            {title && <span className="relative z-10 drop-shadow-md">{title}</span>}
            {iconPosition === "right" && icon}
        </motion.button>
    );
};

export default Button;