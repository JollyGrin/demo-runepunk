import Cookie from "js-cookie";
import { useLogin } from "@/services/api/login";
import { Box, Button } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const SignLoginButton = () => {
  const [result, setResult] = useState("");
  const { wallet, publicKey, signMessage } = useWallet();
  const queryClient = useQueryClient();

  const { mutate: sendLoginSignature } = useLogin();

  async function sign() {
    if (!signMessage) return;

    const message = "Perfect message: " + Date.now().toString(10);
    const msg = new TextEncoder().encode(message);
    try {
      const result = await signMessage(msg);
      const signature = Buffer.from(result).toString("base64");
      setResult(signature);
      sendLoginSignature(
        {
          message, // send the original string over (we can just encode it into UTF8 again when we validate the signature)
          signature, // transmit the signature as b64
          publicKey: publicKey?.toBase58() ?? "",
        },
        {
          onSuccess: (authTokens) => {
            Cookie.set("token", authTokens.token);
            Cookie.set("refreshToken", authTokens.refreshToken);
            queryClient.invalidateQueries({ queryKey: ["me"] });
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {wallet && publicKey && (
        <Box>
          <Button onClick={sign}>Sign</Button>
          <p>{result.substring(0, 10)}</p>
        </Box>
      )}
    </>
  );
};
