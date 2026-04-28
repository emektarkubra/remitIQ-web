import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";


export const MENU_ROUTES = [
    {
        path: "/",
        title: "dashboard",
        element: <Dashboard />,
        requiredRoles: ['default-roles-myrealm'],
    },
    {
        path: "/transfer",
        title: "transfer",
        element: <Transfer />,
        requiredRoles: ['default-roles-myrealm'],
    }
]

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