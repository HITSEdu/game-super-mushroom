import {press, release} from '../game/systems/ControlSystem.ts'
import {ArrowBigRightIcon, ArrowBigLeftIcon, ArrowBigUpIcon} from "lucide-react";

const MobileControls = () => {
    const isMobile = window.innerWidth <= 1000;
    if (!isMobile) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-between items-end px-4 z-1001 pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
                <button
                    className="w-20 h-20 rounded-3xl bg-gray-800 text-white flex-center active:bg-gray-600"
                    onTouchStart={() => press('left')}
                    onTouchEnd={() => release('left')}
                    onTouchCancel={() => release('left')}
                ><ArrowBigLeftIcon/>
                </button>

                <button
                    className="w-20 h-20 rounded-3xl  bg-gray-800 text-white flex-center active:bg-gray-600"
                    onTouchStart={() => press('right')}
                    onTouchEnd={() => release('right')}
                    onTouchCancel={() => release('right')}
                ><ArrowBigRightIcon/>
                </button>
            </div>
            <div className="pointer-events-auto">
                <button
                    className="w-20 h-20 rounded-3xl  bg-blue-700 text-white flex-center active:bg-blue-500"
                    onTouchStart={() => press('jump')}
                    onTouchEnd={() => release('jump')}
                    onTouchCancel={() => release('jump')}
                ><ArrowBigUpIcon/>
                </button>
            </div>
        </div>
    );
};

export default MobileControls;