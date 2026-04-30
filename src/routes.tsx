import Dashboard from "./pages/dashboard"
import Transfer from "./pages/transfer"
import Recipients from "./pages/recipients"
import RemitPool from "./pages/remitPool"
import Advisor from "./pages/advisor"
import History from "./pages/transferHistory"

export const MENU_ROUTES = [
    {
        path: "/",
        title: "dashboard",
        element: <Dashboard />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/transfer",
        title: "send",
        element: <Transfer />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/recipients",
        title: "recipients",
        element: <Recipients />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/remitpool",
        title: "remitPool",
        element: <RemitPool />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/advisor",
        title: "advisor",
        element: <Advisor />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/history",
        title: "history",
        element: <History />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/analytics",
        title: "analytics",
        element: <div>Analytics</div>,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/settings",
        title: "settings",
        element: <div>Settings</div>,
        requiredRoles: ['default-roles-myrealm'],
    },
]

const getRoutesWithAuth = (userRoles: any) => {
    return MENU_ROUTES?.map(({ path, title, element, requiredRoles }) => {
        const hasAccess = requiredRoles?.some(role => userRoles?.includes(role))
        if (hasAccess) {
            return { path, title, element, requiredRoles }
        } else {
            return null
        }
    })
}

export default getRoutesWithAuth