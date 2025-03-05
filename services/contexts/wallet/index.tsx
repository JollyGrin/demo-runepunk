import { ReactNode, createContext } from "react";

import Head from "next/head";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { TipLinkWalletAutoConnect } from "@tiplink/wallet-adapter-react-ui";
import { useMemo } from "react";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import { useSearchParams } from "next/navigation";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { LoginButton } from "@/components/organisms/Login/LoginButton";

const TIPLINK_ID = "d00caf72-ab17-4477-92e3-d45f06494b22";

export function WalletWrapperProvider(props: { children: ReactNode }) {
  const searchParams = useSearchParams();
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

  return (
    <TipLinkWalletAutoConnect isReady query={searchParams}>
      <WalletProvider wallets={wallets} autoConnect>
        {props.children}
      </WalletProvider>
    </TipLinkWalletAutoConnect>
  );
}
