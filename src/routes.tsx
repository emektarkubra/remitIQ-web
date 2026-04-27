import Dashboard from "./pages/dashboard";


export const MENU_ROUTES = [

    // Dashboard
    {
        path: "/",
        title: 'Main title',
        element: <Dashboard />,
        requiredRoles: ['default-roles-myrealm'],
    }
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