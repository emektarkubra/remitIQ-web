import Analytics from "./pages/dashboard/analytics";
import Home from "./pages/dashboard/home";
import Detail from "./pages/dashboard/home/detail";
import Inside from "./pages/dashboard/home/detail/inside";
import Profile from "./pages/dashboard/profile";
import Trends from "./pages/dashboard/trends";
import Alerts from "./pages/management/alerts";
import Notifications from "./pages/management/notifications";
import Search from "./pages/management/search";
import Tasks from "./pages/management/tasks";
import Reports from "./pages/reports";
import Access from "./pages/security/access";
import Antivirus from "./pages/security/antivirus";
import GlobalSettings from "./pages/security/globalSettings";
import Settings from "./pages/security/settings";

export const MENU_ROUTES = [

    // Dashboard
    {
        path: "/",
        title: 'Main title',
        element: <Home />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/detail-page",
        title: 'Detail title',
        element: <Detail />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/detail-page/inside",
        title: 'Inside title',
        element: <Inside />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/analytics",
        title: 'Analytics title',
        element: <Analytics />,
        // requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/trends",
        title: 'Trends title',
        element: <Trends />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/profile",
        title: 'Profile title',
        element: <Profile />,
        requiredRoles: ['default-roles-myrealm']
    },
    // Security
    {
        path: "/settings",
        title: 'Settings title',
        element: <Settings />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/access",
        title: 'Access title',
        element: <Access />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/global-settings",
        title: 'Global settings title',
        element: <GlobalSettings />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/antivirus",
        title: 'Antivirus title',
        element: <Antivirus />,
        requiredRoles: ['default-roles-myrealm']
    },
    // Management
    {
        path: "/tasks",
        title: 'Tasks title',
        element: <Tasks />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/alerts",
        title: 'Alerts title',
        element: <Alerts />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/search",
        title: 'Search title',
        element: <Search />,
        requiredRoles: ['default-roles-myrealm']
    },
    {
        path: "/notifications",
        title: 'Notifications title',
        element: <Notifications />,
        requiredRoles: ['default-roles-myrealm']
    },
    // Reports
    {
        path: "/reports",
        title: 'Reports title',
        element: <Reports />,
        requiredRoles: ['default-roles-myrealm']
    },
]

// roles e gore route lara condition ekle
const getRoutesWithAuth = (userRoles: any) => {
    return MENU_ROUTES?.map(({ path, title, element, requiredRoles }) => {
        const hasAccess = requiredRoles?.some(role => userRoles?.includes(role))
        console.log(requiredRoles)
        console.log(hasAccess)
        if (hasAccess) {
            return {
                path,
                title,
                element,
                requiredRoles
            }
        } else {
            return null
        }

    })
}

export default getRoutesWithAuth;