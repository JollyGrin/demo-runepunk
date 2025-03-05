import { extendBaseTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";
import { modalTheme } from "./components/Modal";
import { progressTheme } from "./components/Progress";

export const fonts = {
  header: "var(--header)",
  // sub: "var(--sub)",
  body: "var(--body)",
  narrow: "var(--narrow)",
};

export const colors = {
  brand: {
    primary: "#E0E0E0",
    highlight: "#FFF",
    secondary: "#0C0C0C",
    shadow: "#263294",
  },
  pure: {
    white: "#FFF",
    black: "#0C0C0C",
  },
};

export const defaultTheme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: "brand.secondary",
        color: "brand.primary",
        fontFamily: "body",
      },
      h1: {
        fontFamily: "header",
        fontWeight: 700,
        fontSize: { base: "3rem", md: "5rem", lg: "7rem" },
      },
      h3: {
        fontSize: { base: "1.5rem", md: "2.5rem", lg: "3rem" },
        fontWeight: 600,
      },
    },
  },
  colors,
  fonts,
  components: {
    ...theme.components,
    Button: buttonTheme,
    Modal: modalTheme,
    Progress: progressTheme,
  },
});
