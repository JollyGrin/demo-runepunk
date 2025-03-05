import Head from "next/head";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { LoginButton } from "@/components/organisms/Login/LoginButton";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login: Runepunk</title>
        <meta name="description" content="Duel, Collect, Wager on Solana!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid placeItems="center" minH="99vh">
          <Flex
            direction="column"
            alignItems="center"
            bg="brand.primary"
            color="brand.secondary"
            minH="200px"
            minW={{ base: "95%", sm: "400px" }}
            p="2rem"
            borderRadius="0.5rem"
          >
            <Text fontSize="5rem" fontFamily="body" fontWeight={700}>
              Login
            </Text>
            <LoginButton />
          </Flex>
        </Grid>
      </main>
    </>
  );
}
