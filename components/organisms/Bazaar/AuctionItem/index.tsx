import { Flex, Box, Text, Image, Progress } from "@chakra-ui/react";
import { GiSwapBag as IconBag } from "react-icons/gi";

import {
  FaArrowAltCircleUp as IconUp,
  FaArrowAltCircleDown as IconDown,
} from "react-icons/fa";

import { useHover } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import {
  BidView,
  OfferView,
} from "@/services/mock/bazaar/bazaar_mock_api_types";

export const AuctionItem = (offer?: BidView | OfferView) => {
  const isEmpty = offer?.item === undefined;
  const isBid = (offer as BidView)?.["bidID"] !== undefined;
  const isSell = (offer as OfferView)?.["offerID"] !== undefined;

  const id = (offer as BidView)?.["bidID"] ?? (offer as OfferView)?.["offerID"];

  return (
    <Flex
      direction="column"
      border="solid 1px"
      borderColor="brand.highlight"
      w="100%"
      minH="200px"
    >
      <Text
        borderBottom="solid 1px"
        borderColor="brand.highlight"
        p="1rem"
        fontFamily="header"
        fontSize="2rem"
      >
        {isEmpty && "Make offer"}
        {isBid && "Bid"}
        {isSell && "Sell"}
      </Text>
      {isEmpty && <OfferContainer />}
      {!isEmpty && (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          gap="2rem"
        >
          <Flex gap="2rem" alignItems="start" justifyContent="center">
            <Image
              boxSize="7rem"
              src={
                "https://api.dicebear.com/9.x/icons/svg?seed=" +
                offer?.item?.itemID
              }
              borderRadius="0.5rem"
            />
            <Flex direction="column" maxW="12rem" w="100%" maxH="8rem">
              <Text>{offer.item.name}</Text>
              {/* <Text fontSize="1.25rem">{offer.item.description}</Text> */}
            </Flex>
          </Flex>
          <Progress
            w="90%"
            h="2rem"
            value={(offer.quantityFilled / offer.quantity) * 100}
          />
          <Text fontSize="1.75rem" my="-1.5rem">
            ${offer.pricePerItem} x {offer.quantity} ={" "}
            <strong>${offer.pricePerItem * offer.quantity}</strong>
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const OfferContainer = () => (
  <Flex h="100%" gap="2rem" alignItems="center" justifyContent="center">
    <Offer />
    <Offer isPurchase />
  </Flex>
);

const Offer = (props: { isPurchase?: boolean }) => {
  const { push, query } = useRouter();
  const [ref, isHover] = useHover();

  function openModal() {
    push({ query: { ...query, offerType: props.isPurchase ? "buy" : "sell" } });
  }

  return (
    <Box
      ref={ref}
      border="solid 1px"
      borderColor="brand.highlight"
      p="1rem"
      position="relative"
      fontSize="2rem"
      fill="white"
      cursor="pointer"
      onClick={openModal}
    >
      {props.isPurchase ? (
        <IconDown
          style={{
            position: "absolute",
            right: "1rem",
            transition: "all 0.25s ease",
            transform: isHover ? "translateY(1rem)" : "inherit",
            background: isHover ? "red" : "black",
            borderRadius: "100%",
          }}
        />
      ) : (
        <IconUp
          style={{
            position: "absolute",
            left: "1rem",
            transition: "all 0.25s ease",
            transform: isHover ? "translateY(-1rem)" : "inherit",
            background: isHover ? "green" : "black",
            borderRadius: "100%",
          }}
        />
      )}
      <IconBag fontSize="5rem" />
    </Box>
  );
};
