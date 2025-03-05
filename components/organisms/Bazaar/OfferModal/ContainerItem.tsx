import { Image, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import {
  FaArrowAltCircleUp as IconUp,
  FaArrowAltCircleDown as IconDown,
} from "react-icons/fa";

export const ContainerItem = (props: { field?: number }) => {
  const { query, push } = useRouter();
  const isBuy = query.offerType === "buy";

  return (
    <Flex direction="column" className="item">
      <HStack>
        {isBuy ? <IconDown /> : <IconUp />}
        <Text>{isBuy ? "Buy" : "Sell"} offer</Text>
      </HStack>
      <VStack h="100%" justifyContent="center">
        {props.field ? (
          <Image
            src={"https://api.dicebear.com/9.x/icons/svg?seed=" + props.field}
            boxSize="20rem"
            borderRadius="1rem"
          />
        ) : (
          <Box bg="brand.shadow" boxSize="20rem" borderRadius="1rem"></Box>
        )}
      </VStack>
    </Flex>
  );
};
