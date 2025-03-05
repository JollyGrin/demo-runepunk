import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { GoogleViaTipLinkWalletName } from "@tiplink/wallet-adapter";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { SignLoginButton } from "./SignMessage";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const { push } = useRouter();
  const { select, connect, wallet, publicKey, disconnect } = useWallet();

  async function loginViaTipLink() {
    select(GoogleViaTipLinkWalletName);
    try {
      await connect();
    } catch (err) {
      console.error(err);
    }
  }

  const noPublicKey = publicKey?.toBase58() === undefined;
  const isSignedOut = noPublicKey && !wallet;
  const isSigningIn = noPublicKey && !!wallet;
  const isSignedIn = !noPublicKey && !!wallet;

  const pageState = useMemo(() => {
    if (isSignedOut) return "out";
    if (isSigningIn) return "loading";
    if (isSignedIn) return "in";
    return "out";
  }, [isSignedOut, isSigningIn, isSignedIn]);

  useEffect(() => {
    if (!isSignedIn) return;
    push("/dash");
  }, [isSignedIn]);

  return (
    <>
      {
        {
          out: (
            <>
              <Text>Sign in with Tiplink</Text>
              <Wrap>
                <Button onClick={loginViaTipLink}>Connect Wallet</Button>
              </Wrap>
            </>
          ),
          loading: (
            <>
              <Text>Use the Tiplink interface to continue signing in</Text>
              <Wrap>
                <Spinner size="xl" />
              </Wrap>
            </>
          ),
          in: (
            <>
              <Text>Wallet is connected!</Text>
              <Wrap>
                <Button onClick={disconnect}>Disconnect</Button>
                <SignLoginButton />
                <Button as={Link} href="/dash">
                  To Dashboard
                </Button>
                <p>{publicKey?.toBase58().substring(0, 9)}</p>
              </Wrap>
            </>
          ),
        }[pageState]
      }
    </>
  );
};

const Wrap = styled(Flex)`
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;
