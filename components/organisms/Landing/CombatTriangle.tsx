import { GridSplotch } from "@/components/atoms/decorations/GridSplotch";
import {
  Image,
  Box,
  HStack,
  Text,
  VStack,
  ChakraProps,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const LandingCombatTriangle = () => {
  return (
    <Wrapper>
      <Box p="12rem 5rem 3rem" maxW="750px" m="0 auto">
        <Text textAlign="center" fontSize="3rem" fontWeight={700}>
          The Combat Triangle: Dynamic Battle System
        </Text>
        <Text textAlign="center" fontSize="2rem" fontWeight={400}>
          The game features a dynamic combat triangle that adds layers of
          strategy to every encounter with each class having its own strengths
          and weaknesses creating a balance.
        </Text>
      </Box>
      <Flex
        m="0 auto"
        pb="10rem"
        alignItems={{ base: "revert", md: "end" }}
        justifyContent={{ base: "revert", md: "center" }}
        direction={{ base: "column", md: "row" }}
      >
        <Char
          src="chars/01.png"
          title="Gunmages (Wizards)"
          desc="Use mana-powered guns and get bonuses against Spellswords."
        />
        <Char
          isRaised
          style={{ mx: "-15rem" }}
          src="chars/02.png"
          title="WATCHWARDENS (RANGERS)"
          desc="Skilled in ranged attacks and have bonuses against Gunmages."
        />
        <Char
          src="chars/03.png"
          title="Spellsword (Melee)"
          desc="Excels in close combat and has bonuses against Witchwardens."
        />
      </Flex>
    </Wrapper>
  );
};

const Char = (props: {
  src: string;
  title: string;
  desc: string;
  isRaised?: boolean;
  style?: ChakraProps;
}) => (
  <Flex direction="column" textAlign="center" {...props.style}>
    <Image
      src={props.src}
      alt="gunmages"
      boxSize="25rem"
      alignSelf="center"
      transition="all 0.25s ease"
      zIndex="10"
      _hover={{
        transform: "scale(1.25)",
      }}
    />
    <Text textTransform="uppercase" fontWeight={700} fontSize="3rem">
      {props.title}
    </Text>
    <Text>{props.desc}</Text>
    <Box
      display={{ base: "none", md: props.isRaised ? "block" : "none" }}
      boxSize="15rem"
    />
  </Flex>
);

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Box
    minH="50vh"
    bg="brand.primary"
    color="brand.secondary"
    position="relative"
  >
    <Top />
    {children}
    <GridSplotch />
    <Bottom />
  </Box>
);

const Top = () => (
  <svg
    viewBox="0 0 552 166"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      right: 0,
      margin: "2rem 0",
      maxWidth: "500px",
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M552 165.44L552 0H0.09375L44.698 63.1364H484.457L552 165.44ZM518 68H542.612V94.3529H518V68Z"
      fill="#263294"
    />
  </svg>
);

const Bottom = () => (
  <svg
    viewBox="0 0 1440 536"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", bottom: 0, left: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 156.337V536H1440L1440 466H37.3487V197.733L0 156.337ZM36.5311 486H11.9188V512.353H36.5311V486ZM48.8375 486H73.4499V512.353H48.8375V486Z"
      fill="#263294"
    />
    <rect x="56.917" width="24.6124" height="26.3529" fill="#D60D0D" />
    <rect x="93.8364" width="24.6124" height="26.3529" fill="#D60D0D" />
    <rect
      x="38.458"
      y="46.1177"
      width="24.6124"
      height="26.3529"
      fill="#D60D0D"
    />
    <rect
      x="75.377"
      y="46.1177"
      width="24.6124"
      height="26.3529"
      fill="#D60D0D"
    />
    <rect
      x="56.917"
      y="85.647"
      width="24.6124"
      height="26.3529"
      fill="#D60D0D"
    />
    <rect x="20" y="85.647" width="24.6124" height="26.3529" fill="#D60D0D" />
    <rect
      x="112.296"
      y="46.1177"
      width="24.6124"
      height="26.3529"
      fill="#D60D0D"
    />
    <rect
      x="149.214"
      y="46.1177"
      width="24.6124"
      height="26.3529"
      fill="#D60D0D"
    />
    <rect x="1316" y="349" width="24.6124" height="26.3529" fill="#263294" />
    <rect x="1352.92" y="349" width="24.6124" height="26.3529" fill="#263294" />
    <rect x="1389.84" y="349" width="24.6124" height="26.3529" fill="#263294" />
  </svg>
);
