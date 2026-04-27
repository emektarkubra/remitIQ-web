import { ThemeConfig } from "antd"

export const darkTheme: ThemeConfig = {
    token: {
        colorBgBase: "#161b27",
        colorTextBase: "#e8edf5",
        colorBorder: "#2a3147",
        colorBorderSecondary: "#1e2435",
        colorSplit: "#2a3147",

        colorPrimary: "#1b4fd8",
        colorPrimaryHover: "#1640b8",
        colorPrimaryActive: "#1235a0",
        colorPrimaryBg: "#1a2540",
        colorPrimaryBorder: "#1b4fd840",
        colorPrimaryText: "#6494f7",

        colorSuccess: "#0ea371",
        colorSuccessBg: "#0d2620",
        colorSuccessBorder: "#0ea37140",
        colorSuccessText: "#3ed49a",

        colorWarning: "#d97706",
        colorWarningBg: "#271e0a",
        colorWarningBorder: "#d9770640",
        colorWarningText: "#f5a623",

        colorError: "#e5484d",
        colorErrorBg: "#2a1418",
        colorErrorBorder: "#e5484d40",
        colorErrorText: "#f27679",

        colorBgContainer: "#161b27",
        colorBgElevated: "#1e2435",
        colorBgLayout: "#0f1117",
        colorBgSpotlight: "#252d40",
        colorBgMask: "rgba(0,0,0,0.6)",

        colorText: "#e8edf5",
        colorTextSecondary: "#8b95a8",
        colorTextTertiary: "#5a6278",
        colorTextQuaternary: "#3d4560",
        colorTextPlaceholder: "#5a6278",
        colorTextDisabled: "#3d4560",
        colorTextHeading: "#e8edf5",
        colorTextLabel: "#8b95a8",
        colorTextDescription: "#8b95a8",

        borderRadius: 8,
        borderRadiusLG: 12,
        borderRadiusSM: 6,

        fontSize: 14,
        fontSizeSM: 12,
        fontSizeLG: 16,
    },
    components: {
        Card: {
            colorBgContainer: "#161b27",
            colorBorderSecondary: "#2a3147",
            paddingLG: 20,
        },
        List: {
            colorSplit: "#2a3147",
        },
        Alert: {
            colorInfoBg: "#1a2540",
            colorInfoBorder: "#1b4fd840",
            colorTextHeading: "#e8edf5",
        },
        Table: {
            colorBgContainer: "#161b27",
            headerBg: "#1e2435",
            rowHoverBg: "#1e2435",
            borderColor: "#2a3147",
        },
        Input: {
            colorBgContainer: "#1e2435",
            colorBorder: "#2a3147",
            activeBorderColor: "#1b4fd8",
            hoverBorderColor: "#4d7ef5",
        },
        Select: {
            colorBgContainer: "#1e2435",
            colorBorder: "#2a3147",
            optionSelectedBg: "#1a2540",
            colorBgElevated: "#1e2435",
        },
        Button: {
            colorBgContainer: "#1e2435",
            colorBorder: "#2a3147",
        },
        Menu: {
            colorItemBg: "#161b27",
            colorItemText: "#8b95a8",
            colorItemTextSelected: "#6494f7",
            colorItemBgSelected: "#1a2540",
            colorItemTextHover: "#e8edf5",
            colorItemBgHover: "#1e2435",
        },
        Statistic: {
            colorTextDescription: "#8b95a8",
        },
        Badge: {
            colorBorderBg: "#161b27",
        },
        Tag: {
            colorBorder: "#2a3147",
        },
        Breadcrumb: {
            colorTextDescription: "#5a6278",
            linkColor: "#5a6278",
            linkHoverColor: "#e8edf5",
            lastItemColor: "#6494f7",
            separatorColor: "#3d4560",
        },
        Layout: {
            headerBg: "#161b27",
            bodyBg: "#0f1117",
            siderBg: "#161b27",
            triggerBg: "#1e2435",
            triggerColor: "#8b95a8",
            headerColor: "#e8edf5",
            footerBg: "#0f1117",
        },
    },
}

export const lightTheme: ThemeConfig = {
    token: {
        colorBgBase: "#ffffff",
        colorTextBase: "#1a1814",
        colorBorder: "#e4e1d8",
        colorBorderSecondary: "#f0eee9",
        colorSplit: "#e4e1d8",

        colorPrimary: "#1b4fd8",
        colorPrimaryHover: "#1640b8",
        colorPrimaryActive: "#1235a0",
        colorPrimaryBg: "#eef2ff",
        colorPrimaryBorder: "#c7d2fe",
        colorPrimaryText: "#1b4fd8",

        colorSuccess: "#0ea371",
        colorSuccessBg: "#edfaf4",
        colorSuccessBorder: "#6ee7b7",
        colorSuccessText: "#065f46",

        colorWarning: "#d97706",
        colorWarningBg: "#fef3c7",
        colorWarningBorder: "#fcd34d",
        colorWarningText: "#92400e",

        colorError: "#dc2626",
        colorErrorBg: "#fef2f2",
        colorErrorBorder: "#fecaca",
        colorErrorText: "#991b1b",

        colorBgContainer: "#ffffff",
        colorBgElevated: "#ffffff",
        colorBgLayout: "#f7f6f2",

        colorText: "#1a1814",
        colorTextSecondary: "#6b6760",
        colorTextTertiary: "#9e9a92",
        colorTextPlaceholder: "#9e9a92",
        colorTextDisabled: "#d4d0c4",
        colorTextHeading: "#1a1814",

        borderRadius: 8,
        borderRadiusLG: 12,
        borderRadiusSM: 6,

        fontSize: 14,
        fontSizeSM: 12,
        fontSizeLG: 16,
    },
    components: {
        Card: {
            colorBgContainer: "#ffffff",
            colorBorderSecondary: "#e4e1d8",
            paddingLG: 20,
        },
        List: {
            colorSplit: "#e4e1d8",
        },
        Alert: {
            colorInfoBg: "#eef2ff",
            colorInfoBorder: "#c7d2fe",
        },
        Input: {
            colorBgContainer: "#ffffff",
            colorBorder: "#e4e1d8",
            activeBorderColor: "#1b4fd8",
            hoverBorderColor: "#4d7ef5",
        },
        Select: {
            colorBgContainer: "#ffffff",
            colorBorder: "#e4e1d8",
            optionSelectedBg: "#eef2ff",
            colorBgElevated: "#ffffff",
        },
        Menu: {
            colorItemBg: "#ffffff",
            colorItemText: "#6b6760",
            colorItemTextSelected: "#1b4fd8",
            colorItemBgSelected: "#eef2ff",
            colorItemTextHover: "#1a1814",
            colorItemBgHover: "#f0eee9",
        },
        Layout: {
            headerBg: "#ffffff",
            bodyBg: "#f7f6f2",
            siderBg: "#ffffff",
            triggerBg: "#f0eee9",
            triggerColor: "#6b6760",
            headerColor: "#1a1814",
            footerBg: "#f7f6f2",
        },
    },
}