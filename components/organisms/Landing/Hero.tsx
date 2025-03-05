import { ButtonHero } from "@/components/atoms/ButtonHero";
import { ConnectModal } from "@/components/molecules/ConnectModal";
import {
  Image,
  Grid,
  Text,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

export const Hero = (props: { offsetHeight?: number }) => {
  const connectDisclosure = useDisclosure();
  return (
    <>
      <ConnectModal {...connectDisclosure} />
      <Grid
        minH={`calc(70svh - ${props.offsetHeight ?? 75}px)`}
        placeItems="center"
      >
        <VStack mb="3rem" mx="1rem">
          <Image
            alt="runepunk logo"
            src="runepunk_logo_light.png"
            h={{ base: "150px", md: "300px" }}
          />

          <Text
            mt={{ base: "2rem", md: 0 }}
            fontSize={{ base: "3rem", md: "5rem" }}
            fontFamily="header"
            fontWeight={700}
            textAlign="center"
            color="pure.white"
            textTransform="uppercase"
            textShadow="1px 1px 2px rgba(0,0,0,0.35)"
          >
            Collect, Duel, Wager
          </Text>
          <Text
            color="pure.white"
            fontSize="3rem"
            textAlign="center"
            textShadow="1px 1px 1px rgba(0,0,0,0.25)"
          >
            a 3D Dueler built on Solana
          </Text>

          {/* <HStack> */}
          {/*   <Link href="/dash"> */}
          {/*     <ButtonHero>Try Demo</ButtonHero> */}
          {/*   </Link> */}
          {/* </HStack> */}
        </VStack>
      </Grid>
    </>
  );
};
