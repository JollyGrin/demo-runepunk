import { Box, HStack, Text } from "@chakra-ui/react";
import { ButtonHeroTop } from "./Top";
import { ButtonHeroBottom } from "./Bottom";
import { ButtonHeroContent } from "./Content";
import { useHover } from "@uidotdev/usehooks";
import { colors } from "@/styles/defaultTheme";

export type ButtonHeroProps = {
  fill?: string;
  color?: string;
  stroke?: string;
  children?: string;
};

export const ButtonHero = ({ children }: { children: string }) => {
  const [ref, isHover] = useHover();

  const props = isHover
    ? {
        fill: colors.brand.highlight,
        stroke: colors.brand.shadow,
      }
    : {};

  return (
    <>
      <Box minW="271px" w="fit-content" ref={ref} cursor="pointer">
        <ButtonHeroTop {...props} />
        <ButtonHeroContent {...props}>{children}</ButtonHeroContent>
        <ButtonHeroBottom {...props} />
      </Box>
    </>
  );
};
