interface IProps {
    type: 'filled' | 'empty'
    height?: number
}

const VolumeBar = ({type, height = 40}: IProps) => {
    const baseStyle = `p-4 m-1 rounded-lg transition-all duration-300`;
    const filled = `bg-sky-500`;
    const empty = `bg-gray-300 dark:bg-gray-600`;

    return (
        <div
            className={`${baseStyle} ${type === 'filled' ? filled : empty}`}
            style={{height}}
        />
    );
};

export default VolumeBar;
