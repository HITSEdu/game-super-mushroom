import {useVolumeStore} from "../store/VolumeStore.ts";
import VolumeBar from "./ui/VolumeBar.tsx";
import Button from "./buttons/Button.tsx";
import {useEffect} from "react";
import IconMinus from "./icons/IconMinus.tsx";
import IconPlus from "./icons/IconPlus.tsx";

const VolumeChanger = () => {
    const {volume, volumeChange} = useVolumeStore();

    useEffect(() => {
        Howler.volume(volume);
    }, [volume]);

    return (
        <div className="flex-center m-4">
            <Button iconPosition='left' onClick={() => volumeChange('down')}
                    icon={<IconMinus className='w-8 h-8'/>}/>
            {Array.from({length: 10}, (_, i) => (i + 1)).map(item => {
                const type = item <= (volume * 10) ? "filled" : "empty";
                return <VolumeBar key={item} type={type}/>
            })}
            <Button iconPosition='left' icon={<IconPlus className='w-8 h-8'/>} onClick={() => volumeChange('up')}/>
        </div>
    );
}

export default VolumeChanger;