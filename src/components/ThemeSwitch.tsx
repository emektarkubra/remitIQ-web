import { Switch } from 'antd'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../context/themeContext'

const ThemeSwitch = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <Switch
            size="small"
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren={<MdDarkMode size={12} />}
            unCheckedChildren={<MdLightMode size={12} />}
        />
    )
}

export default ThemeSwitch