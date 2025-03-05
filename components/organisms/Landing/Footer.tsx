import { HREF_DISCORD, HREF_TWITTER } from "@/components/atoms/Nav/constants";
import { Text, VStack, Box, Image, Flex } from "@chakra-ui/react";
import Link from "next/link";
import styled from "@emotion/styled";

import { FaDiscord as IconDiscord } from "react-icons/fa";
import { FaXTwitter as IconTwitter } from "react-icons/fa6";
import { colors } from "@/styles/defaultTheme";
import {
  LINKS_FOOTER_POLICIES,
  LINKS_FOOTER_QUICKLINKS,
  LINKS_FOOTER_RESOURCES,
} from "./constants";

export const Footer = () => (
  <Container
    border="solid 0"
    borderTopWidth="0.75rem"
    borderBottomWidth="0.75rem"
    borderColor="brand.secondary"
  >
    <Flex p="1rem" justifyContent="space-between">
      <Image src="runepunk_logo_light.png" alt="logo" height="55px" />
      {/* <Flex gap="10rem"> */}
      {/*   <LinkRows title={"Quick Links"} links={LINKS_FOOTER_QUICKLINKS} /> */}
      {/*   <LinkRows title={"Resources"} links={LINKS_FOOTER_RESOURCES} /> */}
      {/*   <LinkRows title={"Policies"} links={LINKS_FOOTER_POLICIES} /> */}
      {/* </Flex> */}
    </Flex>
    <Divider />
    <Flex justifyContent="space-between">
      <Text>{new Date().getFullYear()} Rune Punk. All Rights Reserved.</Text>
      <Flex gap="1rem" fontSize="3rem">
        <Link href={HREF_DISCORD}>
          <IconDiscord />
        </Link>
        <Link href={HREF_TWITTER}>
          <IconTwitter />
        </Link>
      </Flex>
    </Flex>
  </Container>
);

const LinkRows = (props: {
  title: string;
  links?: { href: string; text: string }[];
}) => {
  return (
    <VStack alignItems="start">
      <Text textTransform="uppercase" fontWeight={700} letterSpacing="1px">
        {props.title}
      </Text>
      {props.links?.map((link) => (
        <Text
          as={Link}
          href={link.href}
          key={link.text + link.href}
          transition="all 0.25s ease"
          _hover={{ opacity: 0.5 }}
        >
          {link.text}
        </Text>
      ))}
    </VStack>
  );
};

const Container = styled(Box)`
  background-color: ${colors.brand.secondary};
  padding: 4rem 10rem;
`;

const Divider = styled.div`
  margin: 2rem 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;
