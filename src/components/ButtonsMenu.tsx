import {Children, type ReactNode} from "react";

interface IProps {
    children: ReactNode
}

const ButtonsMenu = ({children}: IProps) => {
    return (
        <div className='grid gap-4 grid-cols-1 mt-[12vh] max-w-lg w-[90vw] text-fg mx-5'>
            {Children.map(children, (child) => (child))}
        </div>
    )
}

export default ButtonsMenu;