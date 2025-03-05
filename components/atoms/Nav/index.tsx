import { HStack, Button, Image, Text, Box } from "@chakra-ui/react";
import { HEIGHT_NAV, HREF_DISCORD, HREF_TWITTER } from "./constants";
import Link from "next/link";

import { FaDiscord as IconDiscord } from "react-icons/fa";
import { FaXTwitter as IconTwitter } from "react-icons/fa6";
import { ButtonHero } from "@/components/atoms/ButtonHero";

export const Nav = ({ showLogo = true }: { showLogo?: boolean }) => (
  <HStack
    flexDir={{ base: "column", md: "row" }}
    minH={`${HEIGHT_NAV}px`}
    justifyContent="space-between"
    px="2rem"
    mt={{ base: "1rem", md: "0" }}
    gap="2rem"
  >
    <Image src="runepunk_logo_light.png" alt="logo" h="8rem" />
    <HStack
      gap="3rem"
      textTransform="uppercase"
      fontWeight={700}
      fontSize="2rem"
      flexWrap="wrap"
      justifyContent="center"
    >
      {/* <Text>Home</Text> */}
      {/* <Text>The Team</Text> */}
      {/* <Text>About RunePunk</Text> */}
      {/* <Text>Litepaper</Text> */}
    </HStack>
    <HStack flexWrap="wrap" justifyContent="center">
      <Box as={Link} href='/dash' transform="scale(0.5)" mx="-8rem">
        <ButtonHero>Dashboard</ButtonHero>
      </Box>
      <Button as={Link} href={HREF_DISCORD} variant="ghost">
        <IconDiscord size="4rem" />
      </Button>
      <Button as={Link} href={HREF_TWITTER} variant="ghost">
        <IconTwitter size="4rem" />
      </Button>
    </HStack>
  </HStack>
);
