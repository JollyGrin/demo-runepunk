import { defineStyleConfig } from "@chakra-ui/react";

export const modalTheme = defineStyleConfig({
  baseStyle: {
    overlay: {
      bg: "blackAlpha.500", //change the background
    },
    dialog: {
      bg: "brand.secondary",
      color: "brand.primary",
      border: "solid 1px",
      borderColor: "brand.primary",
      p: "3rem 5rem",
      borderRadius: "md",
      fontSize: "2.5rem",
      w: "100%",
      h: "fit-content",
      maxW: "1200px",
      m: "2rem auto",
    },
  },
});
