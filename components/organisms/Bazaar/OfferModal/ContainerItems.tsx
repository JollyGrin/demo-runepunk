import BazaarMockAPI from "@/services/mock/bazaar/bazaar_mock_api";
import {
  AvailableBidItems,
  AvailableOfferItems,
} from "@/services/mock/bazaar/bazaar_mock_api_types";
import { ProcGenItemsUniverse } from "@/services/mock/bazaar/bazaar_procgen";
import { Box, Text, Flex, Image, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const ContainerItems = (props: { setItem: (field: number) => void }) => {
  const { query } = useRouter();
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
  return (
    <Flex
      direction="column"
      className="items"
      bg="brand.secondary"
      borderRadius="1rem"
      p="1rem"
      overflowY="auto"
    >
      <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap="1rem">
        {items?.items?.map((item) => {
          const match = ProcGenItemsUniverse.find(
            (i) => i.itemID === item.itemID,
          );
          return (
            <Box
              key={item.itemID + "available"}
              position="relative"
              onClick={() => props.setItem(item.itemID)}
            >
              <Text
                position="absolute"
                w="fit-content"
                left="1rem"
                top={0}
                fontWeight={700}
              >
                {(item as any)?.count && ` x${(item as any).count}`}
              </Text>
              <Image
                src={
                  "https://api.dicebear.com/9.x/icons/svg?seed=" + item.itemID
                }
                border="solid 0.5rem"
                borderColor="brand.shadow"
                borderRadius="1rem"
              />
              <Text fontSize="1.5rem" textAlign="center">
                {match?.name}{" "}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};
