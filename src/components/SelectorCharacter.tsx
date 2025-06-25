import {useEffect, useState} from "react";
import {PLAYER_COUNT} from "../constants/values.ts";
import {loadPlayers} from "../game/utils/loader.ts";
import CharacterCard from "./ui/CharacterCard.tsx";
import type {ICharacterWithTexture} from "../constants/interfaces.ts";
import {usePlayerStore} from "../store/PlayerStore.ts";
import {Assets} from "pixi.js";
import Button from "./buttons/Button.tsx";
import {useTranslation} from "react-i18next";
import {ChevronsRight, ChevronsLeft, LoaderIcon} from "lucide-react";
import {motion} from "framer-motion";
import type {SeasonType} from "../constants/types.ts";

const SelectorCharacter = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [players, setPlayers] = useState<ICharacterWithTexture[]>([]);

    const {t} = useTranslation('translations');

    const {init} = usePlayerStore();

    useEffect(() => {
        const loadAll = async () => {
            const rawPlayers = await Promise.all(
                Array.from({length: PLAYER_COUNT}, (_, i) => loadPlayers(i + 1))
            );

            const loadedPlayers = await Promise.all(
                rawPlayers.map(async (item, index) => {
                    return {
                        id: index + 1,
                        season: "underworld" as SeasonType,
                        size: item.size,
                        name: item.name,
                        texture: await Assets.load(item.spriteUnderworld),
                        textureString: item.spriteUnderworld,
                        src: item.source,
                        speed: item.speed,
                        jumpPower: item.jumpPower,
                    };
                })
            );

            setPlayers(loadedPlayers);
        };

        loadAll();
    }, []);

    const prev = () => {
        setSelectedIndex((prev) => (prev - 1 + players.length) % players.length);
    };

    const next = () => {
        setSelectedIndex((prev) => (prev + 1) % players.length);
    };

    const handleChoose = () => {
        const curPlayer = players[selectedIndex];
        init(curPlayer.name, curPlayer.texture, curPlayer.textureString, curPlayer.speed, curPlayer.jumpPower, curPlayer.size, curPlayer.season, curPlayer.id);
    }

    const handleDragEnd = (event: MouseEvent, info: { offset: { x: number } }) => {
        event.preventDefault();

        if (info.offset.x > 100) {
            prev();
        } else if (info.offset.x < -100) {
            next();
        }
    };

    if (players.length === 0) return (
        <div className="w-full h-full flex-center p-10 mt-[20vh]">
            <p className="text-5xl font-bold text-center text-white flex-center gap-4 z-20">
                <LoaderIcon className='w-32 h-32 animate-spin'/> {t("loading")}
            </p>
        </div>
    );

    const getWrappedIndex = (index: number) => {
        const total = players.length;
        return (index + total) % total;
    };

    const center = players[selectedIndex];
    const left = players[getWrappedIndex(selectedIndex - 1)];
    const right = players[getWrappedIndex(selectedIndex + 1)];

    return (
        <div className="relative w-full h-screen flex-center flex-col overflow-hidden px-4 py-2">
            <h1 className="text-center font-bold text-fg
                            h-xs:text-4xl h-xs:mt-3
                            h-sm:text-5xl h-sm:mt-4
                            h-md:text-6xl h-md:mt-6
                            h-lg:text-7xl h-lg:mt-8
                            h-xl:text-8xl h-xl:mt-10
            ">
                {t('selectPlayer')}
            </h1>

            <div className="relative w-full max-w-[80vw] flex-center flex-grow">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                    <Button onClick={prev} title={<ChevronsLeft size={32}/>}/>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                    <Button onClick={next} title={<ChevronsRight size={32}/>}/>
                </div>

                <motion.div
                    className="absolute left-[5%] w-[40%] scale-[0.6] opacity-30"
                    animate={{rotateY: -25, zIndex: 1}}
                    transition={{duration: 0.4}}
                >
                    <CharacterCard {...left}/>
                </motion.div>

                <motion.div
                    className="z-10 w-[60%]"
                    key={center.name}
                    drag={"x"}
                    onDragEnd={handleDragEnd}
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={0.2}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4}}
                >
                    <CharacterCard {...center}/>
                </motion.div>

                <motion.div
                    className="absolute right-[5%] w-[40%] scale-[0.6] opacity-30"
                    animate={{rotateY: 25, zIndex: 1}}
                    transition={{duration: 0.4}}
                >
                    <CharacterCard {...right}/>
                </motion.div>
            </div>

            <div className="mb-4">
                <Button onClick={handleChoose} title={t("select")} className="w-fit mx-auto"/>
            </div>
        </div>
    );
};

export default SelectorCharacter;