import type {ReactNode} from "react";

type BaseScreenProps = {
    children: ReactNode;
    backgroundUrl?: string;
    darkenBackground?: boolean;
    center?: boolean;
};

const BaseScreen = ({
                        children,
                        backgroundUrl,
                        darkenBackground = true,
                        center = true,
                    }: BaseScreenProps) => {
    return (
        <div className="relative w-screen min-h-[100dvh] overflow-hidden">
            {backgroundUrl && (
                <div
                    className={`absolute inset-0 bg-cover bg-center ${darkenBackground ? 'brightness-50' : ''}`}
                    style={{backgroundImage: `url(${backgroundUrl})`}}
                />
            )}

            <div className={`absolute inset-0 z-0 ${center ? 'flex-center' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default BaseScreen;
