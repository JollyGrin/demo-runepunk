import Head from "next/head";

export function HeadMeta({ title = "Runepunk Legends" }: { title?: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Duel, Collect, Wager on Solana!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
