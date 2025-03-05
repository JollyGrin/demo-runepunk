import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Grid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "@/styles/defaultTheme";
import { ContainerItem } from "./ContainerItem";
import { ContainerDesc } from "./ContainerDesc";
import { ContainerInput } from "./ContainerInput";
import { useEffect, useState } from "react";
import BazaarMockAPI from "@/services/mock/bazaar/bazaar_mock_api";
import {
  AvailableBidItems,
  AvailableOfferItems,
  Bid,
  Offer,
} from "@/services/mock/bazaar/bazaar_mock_api_types";
import { ContainerItems } from "./ContainerItems";
import { ProcGenItemsUniverse } from "@/services/mock/bazaar/bazaar_procgen";

type Fields = {
  itemId?: number;
  quantity: number;
  pricePerItem: number;
};

const initFields = {
  quantity: 1,
  pricePerItem: 1,
};

export const OfferModal = (props: {
  isOpen: boolean;
  addBid: (bid: Bid) => void;
  addOffer: (offer: Offer) => void;
}) => {
  const { query, push } = useRouter();
  const isBuy = query.offerType === "buy";

  const [items, setItems] = useState<AvailableBidItems | AvailableOfferItems>();

  useEffect(() => {
    const api = new BazaarMockAPI();
    if (isBuy) {
      setItems(api.listBidAvailableItems());
    } else {
      setItems(api.listOfferAvailableItems());
    }
  }, []);

  const [fields, setFields] = useState<Fields>(initFields);
  const match = ProcGenItemsUniverse.find((i) => i.itemID === fields.itemId);
  const matchInInv = items?.items?.find((i) => i.itemID === fields.itemId);

  function setField(field: keyof typeof fields) {
    return (value: number) =>
      setFields((prev) => ({
        ...(prev ?? {}),
        [field]: value,
      }));
  }

  function onClose() {
    setFields(initFields);
    delete query.offerType;
    push({ query });
  }
  function addBid() {
    props.addBid({
      pricePerItem: fields.pricePerItem,
      quantity: fields.quantity,
      itemID: fields.itemId as number,
      quantityFilled: 0,
      bidID: Date.now(),
    });

    onClose();
  }

  function addOffer() {
    props.addOffer({
      pricePerItem: fields.pricePerItem,
      quantity: fields.quantity,
      itemID: fields.itemId as number,
      quantityFilled: 0,
      offerID: Date.now(),
    });

    onClose();
  }

  return (
    <Modal {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent justifyContent="space-between">
        <ModalHeader fontSize="6rem" fontWeight={700}>
          {isBuy ? "Offer to Purchase" : "Offer to Sell"}
        </ModalHeader>
        <ModalBody alignItems="start" h="100%">
          <OfferGrid>
            <ContainerItem field={fields.itemId} />
            <ContainerDesc field={fields.itemId} />
            <ContainerInput
              className="quantity"
              field={fields.quantity}
              setField={(value: number) => setField("quantity")(value)}
              max={!isBuy ? (matchInInv as any)?.count : undefined}
            />
            <ContainerInput
              className="price"
              field={fields.pricePerItem}
              setField={(value: number) => setField("pricePerItem")(value)}
            />
            <HStack
              className="totalPrice"
              fontSize="5rem"
              justifyContent="center"
            >
              <Text>
                {fields.quantity} x ${fields.pricePerItem} =
              </Text>
              <Text fontWeight={700}>
                ${fields.quantity * fields.pricePerItem}
              </Text>
            </HStack>
            <ContainerItems
              setItem={(field: number) => setField("itemId")(field)}
            />
          </OfferGrid>
        </ModalBody>

        <ModalFooter>
          {isBuy ? (
            <Button colorScheme="blue" mr={3} onClick={addBid}>
              Add Bid
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={addOffer}>
              Add Sell
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const OfferGrid = styled(Grid)`
  display: grid;
  height: 100%;
  max-height: 900px;
  padding: 2rem 0;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 3fr repeat(2, 0.5fr) 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  /* * { */
  /*   border: 1px solid ${colors.brand.shadow}; */
  /* } */

  .item {
    grid-area: 1 / 1 / 2 / 3;
  }
  .desc {
    grid-area: 1 / 3 / 2 / 7;
  }
  .quantity {
    grid-area: 2 / 1 / 3 / 4;
  }
  .price {
    grid-area: 2 / 4 / 3 / 7;
  }
  .totalPrice {
    grid-area: 3 / 1 / 4 / 7;
  }
  .items {
    grid-area: 4 / 1 / 4/ 7;
  }
`;
