import {useVolumeStore} from "../../store/VolumeStore.ts";
import VolumeBar from "./VolumeBar.tsx";
import Button from "./Button.tsx";
import {ArrowBigDown, ArrowBigUp} from 'lucide-react'
import {useEffect} from "react";

const VolumeChanger = () => {
    const {volume, volumeChange} = useVolumeStore();

    useEffect(() => {
        Howler.volume(volume);
    }, [volume]);

    return (
        <div className="flex-center m-4">
            <Button title={<ArrowBigDown/>} onClick={() => volumeChange('down')}/>
            {Array.from({length: 10}, (_, i) => (i + 1)).map(item => {
                const type = item <= (volume * 10) ? "filled" : "empty";
                return <VolumeBar key={item} type={type}/>
            })}
            <Button title={<ArrowBigUp/>} onClick={() => volumeChange('up')}/>
        </div>
    );
}

export default VolumeChanger;