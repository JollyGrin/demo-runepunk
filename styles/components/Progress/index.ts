import { defineStyleConfig } from "@chakra-ui/react";

export const progressTheme = defineStyleConfig({
  baseStyle: {
    track: {
      bg: "brand.primary",
      borderRadius: "1rem",
    },
    filledTrack: {
      bg: "brand.shadow",
    },
  },
});
