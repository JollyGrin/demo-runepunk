import styled from "@emotion/styled";
import { VideoBg } from "@/components/atoms/VideoBg";
import { Text, Box, VStack, HStack, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import { DividerDiamond } from "@/components/atoms/decorations/Diamond";

export const LandingBody = () => {
  return (
    <Box
      minH="35vh"
      bg="brand.primary"
      color="brand.secondary"
      isolation="isolate"
      py="5rem"
    >
      <VStack maxW="1000px" m="0 auto" gap="5rem">
        <Row
          isReversed
          title="The Arena"
          desc={`Jump into the ring with your character, gear, and supplies to give
          yourself the best chance at winning your match. Use movement to your
          advantage.`}
          banner={
            <GradientBorder>
              <Image
                alt="arena"
                src="banners/arena.png"
                boxSize="350px"
                objectFit="cover"
              />
            </GradientBorder>
          }
          buttons={<Box my="2rem"></Box>}
        />

        <Row
          title="High Stakes"
          desc={`Put your money where your mouth is! Soloists and Teams can test their mettle live in the Arena in 1V1, 3V3 and 5s and wager on their skill.`}
          banner={
            <GradientBorder>
              <VideoBg
                videos={[
                  {
                    source: "banners/runepunk_crop_mini.mp4",
                    type: "video/mp4",
                  },
                ]}
                videoStyleProps={{
                  borderRadius: "0.25rem",
                  objectPosition: "50%",
                }}
              >
                <Box w="350px" h="300px" />
              </VideoBg>
            </GradientBorder>
          }
          buttons={<Box my="2rem"></Box>}
        />

        <Row
          isReversed
          title="Collectibles"
          desc={`Players can earn a variety of digital collectibles like unique skins, item packs, consumables and more.`}
          banner={
            <GradientBorder>
              <Image
                alt="collectibles"
                src="banners/collectibles.jpg"
                boxSize="350px"
                objectFit="cover"
              />
            </GradientBorder>
          }
          buttons={<Box my="2rem"></Box>}
        />
      </VStack>
    </Box>
  );
};

const Row = (props: {
  title: string;
  desc: string;
  isReversed?: boolean;
  banner: ReactNode;
  buttons?: ReactNode;
}) => {
  return (
    <Box position="relative">
      <HStack
        w="100%"
        justifyContent="space-between"
        gap="2rem"
        flexDir={{
          base: "column",
          md: props.isReversed ? "row-reverse" : "row",
        }}
      >
        <Box maxW={{ base: "85%", md: "50%" }}>
          <Text
            fontFamily="header"
            fontSize="4rem"
            textAlign="center"
            textTransform="uppercase"
          >
            {props.title}
          </Text>
          <DividerDiamond />
          <Text fontSize="2rem">{props.desc}</Text>
          {props.buttons}
        </Box>
        {props.banner}
      </HStack>
    </Box>
  );
};

const GradientBorder = styled.div`
  padding: 2rem;
  background-image: url(frames/gradient-border.svg);
  background-repeat: no-repeat;
  background-position: 100% 100%;
`;
