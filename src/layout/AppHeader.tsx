import { Button, Flex, Layout } from "antd"
import { Icon } from '@iconify-icon/react';
import AppBreadcrumb from "./AppBreadcrumb";
import ThemeSwitch from "../components/ThemeSwitch";
import LanguageSelect from "../components/LanguageSelect";
import "../assets/style/layout/AppHeader.scss"
import { useDispatch, useSelector } from "react-redux";
import { handleCollapsedMenu, setCollapsed } from "../redux/Sidebar/sidebarSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const { Header } = Layout;

const COLLAPSE_BREAKPOINT = 865;

const AppHeader = () => {
  const dispatch = useDispatch()
  const collapsed = useSelector((state: any) => state.collapsed.collapsed)

  const authContext = useContext(AuthContext)
  const keycloak = authContext?.keycloak

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < COLLAPSE_BREAKPOINT) {
        dispatch(setCollapsed(true))
      } else {
        dispatch(setCollapsed(false))
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch])

  return (
    <div className="header-container">
      <Header className='dark:bg-darkColor dark:text-lightColor'>
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <Flex className="p-2" justify="space-between" align="center">
            <Button
              type="text"
              icon={
                collapsed
                  ? <Icon className="collapse-icon" icon="ant-design:menu-fold-outline" width='15px' height='18px' />
                  : <Icon className="collapse-icon" icon="ant-design:menu-unfold-outlined" width='15px' height='18px' />
              }
              onClick={() => dispatch(handleCollapsedMenu())}
            />
            <AppBreadcrumb />
          </Flex>
          <Flex className="p-2" justify="space-between" align="center">
            <ThemeSwitch />
            <LanguageSelect />
            <Button
              onClick={() => {
                keycloak.logout()
                localStorage.removeItem('af-token')
              }}
              type="text"
              icon={<Icon className="exit-icon" icon="ci:exit" width='25px' />}
            />
          </Flex>
        </Flex>
      </Header>
    </div>
  )
}

export default AppHeader