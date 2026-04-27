import { Typography } from "antd"
import { MENU_ROUTES } from "../routes";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const PageTitle = () => {
    const { pathname } = useLocation()

    return (
        <div className="title-container">
            <Title className="page-title" level={4}>
                {MENU_ROUTES?.filter(item => item.path === pathname)[0].title}
            </Title>
            <hr className="page-title-divider" />
        </div>
    )
}

export default PageTitle