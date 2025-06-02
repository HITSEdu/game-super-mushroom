import {useThemeStore} from '../store/ThemeStore.ts';

const ThemeToggle = () => {
    const {dark, toggleTheme} = useThemeStore()

    return (
        <button onClick={toggleTheme} className="m-10 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            {dark ? 'Dark' : 'Light'}
        </button>
    )
};

export default ThemeToggle;
