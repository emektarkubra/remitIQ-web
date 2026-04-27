import { Typography } from "antd"
import { MENU_ROUTES } from "../routes"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

const { Title } = Typography

const PageTitle = () => {
    const { pathname } = useLocation()
    const { t } = useTranslation()

    const route = MENU_ROUTES?.find(item => item.path === pathname)

    return (
        <div className="title-container">
            <Title className="page-title" level={4}>
                {route ? t(`pageTitle.${route.title}`) : ""}
            </Title>
            <hr className="page-title-divider" />
        </div>
    )
}

export default PageTitle