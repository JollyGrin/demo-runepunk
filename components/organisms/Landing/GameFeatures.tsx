import { VideoBg } from "@/components/atoms/VideoBg";
import { DividerDiamondTipped } from "@/components/atoms/decorations/Diamond";
import { colors } from "@/styles/defaultTheme";
import { Box, ChakraProps, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const LandingGameFeatures = () => {
  return (
    <Container>
      <Title />
      <VStack m="8rem auto 0" maxW="900px" fontSize="3rem" textAlign="center">
        <Text fontWeight={700}>World of Manipuri</Text>
        <Text>
          Explore Manipuri; a gritty metropolis where traditional fantasy meets
          a hyper capitalistic future. Here, magic and technology are
          intertwined in a way you’ve never seen before.
        </Text>
      </VStack>

      <Flex
        py="5rem"
        m="0 auto"
        w="fit-content"
        gap="1rem"
        flexDirection={{ base: "column", md: "row" }}
      >
        <ClippedVideo />
        <Flex
          direction="column"
          gap="5rem"
          fontSize="2.5rem"
          maxW="700px"
          justifyContent="center"
        >
          <Flex gap="1rem" direction={{ base: "column", md: "row" }}>
            <DividerDots w={{ base: "100%", md: "15rem" }} />
            <Text w="100%">
              <strong>Mana fuels everything:</strong> Your body’s mana powers
              your weapons and captured and captured demonic souls power your
              hot new ride
            </Text>
          </Flex>

          <Flex gap="1rem" direction={{ base: "column", md: "row" }}>
            <DividerDots w={{ base: "100%", md: "15rem" }} />
            <Text>
              <strong>Magic replaces electricity:</strong> The city is rife with
              innovations like mana-powered firearms and rune-infused swords.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

const Title = () => (
  <Flex direction={{ base: "column", md: "row" }} alignItems="center">
    <DividerDiamondTipped />
    <Text fontFamily="header" fontSize="4.5rem" textAlign="center" minW="40rem">
      Game Features
    </Text>
    <DividerDiamondTipped />
  </Flex>
);

const Container = styled(Box)`
  min-height: 35vh;
  padding-top: 2rem;
  background-color: ${colors.brand.primary};
  color: ${colors.brand.secondary};
  position: relative;
`;

const ClippedVideo = () => (
  <Box
    isolation="isolate"
    zIndex={10}
    w={{ base: "100%", md: "500px" }}
    clipPath="polygon(100% 0, 100% 80%, 80% 100%, 0 100%, 0 0)"
  >
    <VideoBg
      videos={videoSources}
      videoStyleProps={{
        borderRadius: "0.25rem",
      }}
    >
      <Box h="360px" />
    </VideoBg>
  </Box>
);

const DividerDots = (props: { w: ChakraProps["w"] }) => (
  <HStack gap="0">
    <Box boxSize="2rem" bg="brand.shadow" borderRadius="100%" />
    <Box h="2px" w={props.w} bg="brand.shadow" />
    <Box boxSize="2rem" bg="brand.shadow" borderRadius="100%" />
  </HStack>
);

const videoSources: VideoBg[] = [
  {
    source: "banners/lots.mp4",
    type: "video/mp4",
  },
  {
    source: "banners/lots.webm",
    type: "video/webm",
  },
];
