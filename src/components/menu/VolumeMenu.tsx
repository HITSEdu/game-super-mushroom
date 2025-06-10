import ButtonBack from "../buttons/ButtonBack.tsx";
import VolumeChanger from "../VolumeChanger.tsx";

const VolumeMenu = () => {
    return (
        <>
            <VolumeChanger/>
            <ButtonBack newState='settings'/>
        </>
    )
}

export default VolumeMenu;