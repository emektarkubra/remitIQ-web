import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => { },
})

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("theme")
        return stored ? JSON.parse(stored) === "dark" : false
    })

    useEffect(() => {
        document.querySelector("html")?.classList.toggle("dark", isDark)
        localStorage.setItem("theme", JSON.stringify(isDark ? "dark" : "light"))
    }, [isDark])

    const toggleTheme = () => setIsDark(prev => !prev)

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider