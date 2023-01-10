import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  blue: {
    50: "#EBF8FF",
    100: "#BBE4FC",
    200: "#8ACFFA",
    300: "#5AB5F7",
    400: "#319BF1",
    500: "#1683E9",
    600: "#146BC8",
    700: "#145099",
    800: "#123D79",
    900: "#0C3369",
  },
};

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const styles = {
  global: {
    "html, body, #root": {
      height: "100%",
      display: "flex",
      flex: "1",
    },
  },
};

export const theme = extendTheme({ colors, config, styles });
