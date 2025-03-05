import { ProcGenItemsUniverse } from "@/services/mock/bazaar/bazaar_procgen";
import { Flex, Text } from "@chakra-ui/react";

export const ContainerDesc = (props: { field?: number }) => {
  const match = ProcGenItemsUniverse.find((i) => i.itemID === props.field);
  return (
    <Flex className="desc" direction="column">
      <Text fontSize="5rem" fontWeight={700}>
        {match?.name}
      </Text>
      <Text>{match?.description}</Text>
    </Flex>
  );
};
