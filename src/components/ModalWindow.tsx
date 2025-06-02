import {Children, type ReactNode} from "react";

interface IProps {
    children: ReactNode
}

const ModalWindow = ({children}: IProps) => {
    return (
        <div className='fixed backdrop-blur-sm z-1000 w-full h-full flex-center'>
            <div className='grid gap-4 grid-cols-1 h-[36vh] max-w-lg w-full text-fg mt-[-10rem] mx-5'>
                {Children.map(children, (child) => (child))}
            </div>
        </div>
    )
}

export default ModalWindow;