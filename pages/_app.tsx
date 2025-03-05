import { WalletWrapperProvider } from "@/services/contexts/wallet";
import { defaultTheme } from "@/styles/defaultTheme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Reggae_One, Oxanium, Archivo_Narrow } from "next/font/google";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryClientContext,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const fontHeader = Reggae_One({
  weight: "400",
  subsets: ["latin"],
});
const fontBody = Oxanium({
  weight: ["400"],
  subsets: ["latin"],
});

const fontNarrow = Archivo_Narrow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Style />
      <ChakraProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <WalletWrapperProvider>
            <Component {...pageProps} />
          </WalletWrapperProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

const Style = () => (
  <style jsx global>
    {`
      html {
        --header: ${fontHeader.style.fontFamily};
        --body: ${fontBody.style.fontFamily};
        --narrow: ${fontNarrow.style.fontFamily};
      }
    `}
  </style>
);
