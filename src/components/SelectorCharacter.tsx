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
import PLAYER_SPRITE from "../constants/playerSprite.ts";

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
                rawPlayers.map(async (item) => {
                    return {
                        id: selectedIndex,
                        season: item.season,
                        sprite: item.sprite,
                        size: item.size,
                        name: item.name,
                        texture: await Assets.load(PLAYER_SPRITE["player_underworld"]),
                        textureString: item.texture,
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
        console.log(PLAYER_SPRITE["player_underworld"]);
        init(curPlayer.name, curPlayer.texture, curPlayer.textureString, curPlayer.speed, curPlayer.jumpPower, curPlayer.size, curPlayer.season, PLAYER_SPRITE["player_underworld"], curPlayer.id);
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
            <p className="text-6xl font-bold text-center flex-center flex-row gap-4">
                <LoaderIcon className='w-52 h-52'/> {t("loading")}
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
        <div className="relative w-full flex-center flex-col gap-4 overflow-hidden px-4">
            <h1 className="text-center text-2xl md:text-3xl font-bold text-fg mt-6">
                {t('selectPlayer')}
            </h1>

            <div className="relative w-full max-w-[80vw] flex-center">
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

            <Button onClick={handleChoose} title={t("select")} className="w-fit mx-auto mt-2"/>
        </div>
    );
};

export default SelectorCharacter;