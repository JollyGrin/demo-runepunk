import { defineStyleConfig } from "@chakra-ui/react";

const COLOR_DECAL_HOVER = "brand.primary";
const transition = "all 0.25s ease";

const poly = {
  topLeftY: "0 1rem",
  topLeftX: "1rem 0",
  bottomLeftL: "5rem 100%",
  bottomLeftR: "7rem 100%",

  topRightX: "calc(100% - 1rem) 0",
  topRightY: "100% 1rem",
  bottomRightL: "calc(100% - 7rem) 100%",
  bottomRightR: "calc(100% - 5rem) 100%",
};
export const buttonTheme = defineStyleConfig({
  baseStyle: {
    bg: "#999999",
    color: "brand.primary",
    fontFamily: "body",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    fontSize: "3rem",
    outline: "solid rgba(255,255,255,0.1) 2px",

    minW: "100px",

    paddingTop: "5px",
    paddingX: "1rem",
    borderRadius: "1px",

    borderBottom: "solid",
    borderBottomWidth: "0.75rem",
    borderBottomColor: "brand.shadow",

    "&:before": {
      position: "absolute",
      bg: "transparent",
      content: "''",
      display: "block",
      width: "50px",
      height: "1rem",
      top: 0,
      borderTop: "5px solid",
      borderTopColor: "brand.shadow",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",

      transition,
    },

    "&:hover:before": {
      borderTopColor: COLOR_DECAL_HOVER,
      width: "75px",
    },

    "&:after": {
      position: "absolute",
      bg: "rgba(255,255,255,0.25)",
      content: "''",
      clipPath: `polygon(${poly.bottomLeftR},${poly.bottomRightL}, ${poly.topRightX}, 100% 0, ${poly.topRightY}, ${poly.bottomRightR}, ${poly.bottomLeftL}, ${poly.topLeftY}, 0 0, ${poly.topLeftX})`,
      display: "block",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    },

    transition,
    _hover: {
      borderColor: COLOR_DECAL_HOVER,
      bg: "brand.secondary",
    },
    _active: {},
    _disabled: { opacity: 0.5, cursor: "unset" },
  },
  variants: {
    ghost: {
      bg: "transparent",
      border: "0 solid transparent",
      outline: "solid 0",
      minW: 0,
      "&:before": null,
      "&:hover:before": null,
      "&:after": null,
      "&:hover:after": null,
      _hover: {
        opacity: 0.75,
      },
    },
    outline: {
      bg: "transparent",
      color: "brand.primary",
      border: "1px solid",
      borderColor: "brand.primary",
      borderWidth: "1px 1px 2px 1px",
      borderRadius: "0.75rem",
      padding: "1rem",
      transition: "all 0.25s ease-in-out",
      _hover: {
        bg: "brand.secondary",
        borderColor: "brand.shadow",
      },
      "&:before": null,
      "&:hover:before": null,
      "&:after": null,
      "&:hover:after": null,
    },
    dashMenu: {
      textTransform: "unset",
      fontWeight: 500,
      borderColor: "rgba(255,255,255,0.25)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      borderBottomWidth: "0",
      borderTopRadius: "2px",
      outline: "solid 0",
      bg: "transparent",

      "&:hover": {
        borderColor: "brand.shadow",
      },
      "&:before": null,
      "&:hover:before": null,
      "&:after": null,
      "&:hover:after": null,
    },
  },
});
