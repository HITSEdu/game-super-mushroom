import {AnimatePresence, motion} from "framer-motion";
import {useRef} from "react";
import {useMusicToast} from "../../hooks/useMusicToast.ts";

const MusicToast = () => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const {visible, message} = useMusicToast(timeoutRef);

    return (
        <AnimatePresence>
            {visible && message && (
                <motion.div
                    key={message}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 1}}
                    className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg text-lg z-1002"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MusicToast;
