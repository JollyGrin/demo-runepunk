import {
  DashTop,
  DashBody,
  containerStyle,
} from "@/components/organisms/Dash/ContainerSvg";
import { DashBottom } from "@/components/organisms/Dash/ContainerSvg/ContainerBottom";
import { Text, Box, Flex, Button, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { DashNav } from "./Nav";
import { ReactNode } from "react";
import Link from "next/link";
import { useHover } from "@uidotdev/usehooks";
import { useRouter } from "next/router";

export const DashLayout = (props: { children: ReactNode }) => {
  const { asPath, push } = useRouter();
  const isDash = asPath === "/dash";

  return (
    <main style={{ height: "100%" }}>
      <DashNav />
      <Box zIndex={1} w="100%">
        <ShowOnBreakpoint color="brand.primary" py="3rem" textAlign="center">
          {props.children}
          {!isDash && (
            <Button mt="10rem" as={Link} href="/dash">
              Back to dashboard
            </Button>
          )}
        </ShowOnBreakpoint>
      </Box>
      <HideOnBreakpoint bg="brand.shadow" zIndex={-100}>
        <Flex
          m="0 auto"
          direction="column"
          h="calc(100vh - 10rem)"
          w="100%"
          minW="940px"
          maxW="1200px"
          px="2rem"
          pt="2rem"
          position="relative"
        >
          {!isDash && <BackToDash />}

          <DashTop>
            <Button variant="dashMenu">Achievements</Button>
            <Button variant="dashMenu">Settings</Button>
          </DashTop>
          <DashBody>{props.children}</DashBody>
          <Box {...containerStyle}>
            <DashBottom />
          </Box>
        </Flex>
      </HideOnBreakpoint>
    </main>
  );
};

const transition = "all 0.25s ease";
const BackToDash = () => {
  const [ref, isHover] = useHover();
  return (
    <HStack
      ref={ref}
      as={Link}
      href="/dash"
      position="absolute"
      zIndex={1}
      top="9rem"
      left="6.5rem"
      gap={0}
      cursor="pointer"
    >
      <Text
        transform={isHover ? "translateX(-3px)" : ""}
        transition={transition}
      >
        {"<"}
      </Text>
      <Text
        transform={isHover ? "translateX(-1px)" : ""}
        mr="0.5rem"
        transition={transition}
      >
        {"<"}
      </Text>
      <Text fontWeight={700} letterSpacing="1px">
        Back to Dashboard
      </Text>
    </HStack>
  );
};

const HideOnBreakpoint = styled(Box)`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`;

const ShowOnBreakpoint = styled(Box)`
  display: block;
  @media (min-width: 1200px) {
    display: none;
  }
`;
