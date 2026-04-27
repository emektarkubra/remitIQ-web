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
        try {
            const stored = localStorage.getItem("theme")
            if (!stored) return false
            const parsed = stored.startsWith('"') ? JSON.parse(stored) : stored
            return parsed === "dark"
        } catch {
            return false
        }
    })

    useEffect(() => {
        document.querySelector("html")?.classList.toggle("dark", isDark)
        localStorage.setItem("theme", isDark ? "dark" : "light")
    }, [isDark])

    const toggleTheme = () => setIsDark(prev => !prev)

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider