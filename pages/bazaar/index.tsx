import { HeadMeta } from "@/components/atoms/Head";
import { Nav } from "@/components/atoms/Nav";
import { AuctionItem } from "@/components/organisms/Bazaar/AuctionItem";
import { OfferModal } from "@/components/organisms/Bazaar/OfferModal";
import { Text, Box, Grid, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BazaarMockAPI from "@/services/mock/bazaar/bazaar_mock_api";
import { useEffect, useState } from "react";
import {
  Bid,
  Offer,
  PlayerGrandBazaarView,
} from "@/services/mock/bazaar/bazaar_mock_api_types";
import { DashNav } from "@/components/organisms/Dash/Layout/Nav";

export default function BazaarPage() {
  const { query } = useRouter();
  const [state, setState] = useState<PlayerGrandBazaarView>();

  const isMakingOffer = !!query.offerType;

  const api = new BazaarMockAPI();
  const offers = [...(state?.bids ?? []), ...(state?.offers ?? [])];

  useEffect(() => {
    const state = api.getPlayerGrandBazaar();
    setState(state);
  }, []);

  function addBid(bid: Bid) {
    api.makeBid(bid);
    setState(api.getPlayerGrandBazaar());
  }

  function addOffer(offer: Offer) {
    api.makeOffer(offer);
    setState(api.getPlayerGrandBazaar());
  }

  function reset() {
    api.resetLocalStorage();
    setState(api.getPlayerGrandBazaar());
  }

  return (
    <>
      <HeadMeta />
      <main>
        {/* <Nav /> */}
        <DashNav />
        <Box maxW="900px" py="5rem" m="0 auto">
          <Text fontSize="6rem" fontFamily="header">
            Grand Bazaar
          </Text>
          <Text>Select an offer slot to setup or view an offer.</Text>
        </Box>
        <Grid
          gap="2rem"
          px="2rem"
          m="0 auto"
          maxW="1000px"
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {offers?.map((offer, key) => (
            <AuctionItem key={key + "offeritem"} {...offer} />
          ))}
          {Array.from({ length: 8 - offers?.length }).map((_, i) => (
            //@ts-expect-error: no props
            <AuctionItem key={i + "auctionitem"} />
          ))}
        </Grid>
        <Box pt="30rem">
          <Button variant="ghost" onClick={reset}>
            reset
          </Button>
        </Box>
      </main>
      <OfferModal isOpen={isMakingOffer} addBid={addBid} addOffer={addOffer} />
    </>
  );
}
