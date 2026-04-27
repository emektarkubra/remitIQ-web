import { Icon } from '@iconify-icon/react';
import { MenuTypes } from "../types/menuTypes";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const createModifiedMenu = ({ userRoles }: any) => {
    const navigate = useNavigate();
    const collapsed = useSelector((state: any) => state.collapsed.collapsed);

    // filtered items
    const filteredMenuItems = MENU_ELEMENTS?.filter(item => {
        return item.roles?.some(role => userRoles?.includes(role));
    });


    return filteredMenuItems.map((element) => {
        // filtered item children
        const filteredChildren = element.children?.filter(child =>
            child.roles?.some(role => userRoles?.includes(role))
        );

        return {
            key: element.key,
            label: element.label,
            title: element.title,
            href: element.href,
            icon: collapsed ? element.icon : '',
            onClick: () => {
                if (!element.children && element.href) {
                    navigate(element.href);
                }
            },
            children: filteredChildren?.map((subElement) => {
                return {
                    key: subElement.key,
                    label: subElement.label,
                    title: subElement.title,
                    icon: subElement.icon,
                    onClick: (_item: { key: string, domEvent: Event }) => {
                        console.log(subElement.href)
                        if (subElement?.href) {
                            navigate(subElement.href);
                        }
                    }
                };
            }) || null,
        };
    });
};

export const MENU_ELEMENTS: MenuTypes[] = [
    {
        key: '/',
        label: 'Dashboard',
        title: 'Dashboard',
        href: '',
        icon: <Icon icon="mdi:shield-outline" width='16px' />,
        roles: ['default-roles-myrealm'],
    },
    {
        key: '/security',
        label: 'Security',
        title: 'Security',
        href: '',
        icon: <Icon icon="mdi:shield-outline" width='20px' />,
        roles: ['default-roles-myrealm'],
        children: [
            {
                key: '/settings',
                label: 'Settings',
                title: 'Settings',
                href: '/settings',
                icon: <Icon icon="mdi:shield-outline" width='16px' />,
                roles: ['default-roles-myrealm'],
            },
        ],
    },
];