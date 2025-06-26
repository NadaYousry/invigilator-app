import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#0056a7",
    colorText: "#333333",
  },
  components: {
    Layout: {
      colorBgLayout: "#fafafa",
    },
    Button: {
      primaryShadow: "none",
    },
    Form: {
      itemMarginBottom: 0,
    },
  },
};
