import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export function useWalletState() {
  const { wallet, publicKey, ...rest } = useWallet();

  const noPublicKey = publicKey?.toBase58() === undefined;
  const pageState = useMemo(() => {
    const isSignedOut = noPublicKey && !wallet;
    const isSigningIn = noPublicKey && !!wallet;
    const isSignedIn = !noPublicKey && !!wallet;
    if (isSignedOut) return "out" as const;
    if (isSigningIn) return "loading" as const;
    if (isSignedIn) return "in" as const;
    return "out" as const;
  }, [noPublicKey, !!wallet]);

  return {
    state: pageState,
    wallet,
    publicKey: publicKey?.toBase58(),
    ...rest,
  };
}
