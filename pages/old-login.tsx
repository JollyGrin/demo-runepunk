import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Head from "next/head";
import { GoogleViaTipLinkWalletName } from "@tiplink/wallet-adapter";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import { TipLinkWalletAutoConnect } from "@tiplink/wallet-adapter-react-ui";

const TIPLINK_ID = "d00caf72-ab17-4477-92e3-d45f06494b22";

export default function Login() {
  const wallets = useMemo(
    () => [
      /**
       * Use TipLinkWalletAdapter here
       * Include the name of the dApp in the constructor
       * Pass the client id that the TipLink team provides
       * Choose from "dark", "light", "system" for the theme
       */
      new TipLinkWalletAdapter({
        title: "Runepunk",
        clientId: TIPLINK_ID,
        theme: "dark", // pick between "dark"/"light"/"system"
      }),
    ],
    [],
  );

  const searchParams = useSearchParams();

  return (
    <>
      <Head>
        <title>Login: Runepunk</title>
        <meta name="description" content="Duel, Collect, Wager on Solana!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TipLinkWalletAutoConnect isReady query={searchParams}>
        <WalletProvider wallets={wallets} autoConnect>
          <main>
            <LoginButton />
            <SendTransactionButton />
          </main>
        </WalletProvider>
      </TipLinkWalletAutoConnect>
    </>
  );
}

const SendTransactionButton = () => {
  const [result, setResult] = useState("");
  const { sendTransaction, publicKey } = useWallet();

  async function sendTx() {
    if (!publicKey) return;

    const connection = new Connection(
      "https://api.mainnet-beta.solana.com/",
      "confirmed",
    );
    const transaction = new Transaction();

    const fromPublicKey = publicKey;
    const toPublicKey = new PublicKey(
      "58Sz6sPcnbvTm7ChF8Zo4Sa6EDU7tbtDnFapuz2RQ1WP",
    );
    const lamports = 1000000; // 0.001 SOL

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: fromPublicKey,
      toPubkey: toPublicKey,
      lamports,
    });

    transaction.add(transferInstruction);
    try {
      const result = await sendTransaction(transaction, connection);
      setResult(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    }
  }

  if (!publicKey) return null;
  return (
    <>
      <Button mt="20rem" onClick={sendTx}>
        Send Transaction
      </Button>
      <p>{result}</p>
    </>
  );
};

const LoginButton = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const { select, connect, wallet, publicKey, disconnect, signMessage } =
    useWallet();

  // call this function upon button click
  async function loginViaTipLink() {
    select(GoogleViaTipLinkWalletName);

    // if autoconnect is not set to true on the WalletProvider,
    // include this line below
    try {
      await connect();
    } catch (err) {
      console.error(err);
    }
  }

  async function sign() {
    try {
      const msg = new TextEncoder().encode(message);
      if (!msg || !signMessage) return;
      const result = await signMessage(msg);
      const decoded = JSON.stringify(result);
      setResult(decoded);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <p>Test</p>
      <Flex gap="1rem">
        {!publicKey && <Button onClick={loginViaTipLink}>Wallet Login</Button>}
        {wallet && <Button onClick={disconnect}>Disconnect</Button>}
      </Flex>
      <p>{publicKey?.toBase58()}</p>

      {wallet && publicKey && (
        <Box pt="20rem">
          <div>
            <Input
              w="500px"
              fontSize="5rem"
              h="6rem"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button onClick={sign}>Sign</Button>
          <p>{result}</p>
        </Box>
      )}
    </>
  );
};
