import { Route, Routes } from "react-router-dom"
import getRoutesWithAuth from "./routes"
import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import Page404 from "./pages/page404"
import { ConfigProvider } from "antd"
import { darkTheme, lightTheme } from "./theme/antdTheme"
import ThemeProvider, { useTheme } from "./context/themeContext"
import './assets/style/global.scss'

const AppContent = () => {
  const { userRoles } = useContext(AuthContext)
  const { isDark } = useTheme()
  const MENU_ROUTES = getRoutesWithAuth(userRoles)

  return (
    <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
      <Routes>
        {MENU_ROUTES?.map((menuElement, index) => (
          <Route key={index} path={menuElement?.path} element={menuElement?.element} />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ConfigProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App