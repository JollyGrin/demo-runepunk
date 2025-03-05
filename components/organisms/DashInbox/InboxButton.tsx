import { Grid, Flex, Box, Button, Text, HStack } from "@chakra-ui/react";
import { PlayerInboxMessageView } from "@/services/mock/player_inbox/player_inbox_mock_api_types";

import { TbMessageCircle as IconFilled } from "react-icons/tb";

export const InboxButton = ({
  msg,
  openMessage,
  isSelected,
}: {
  msg: PlayerInboxMessageView;
  openMessage: () => void;
  isSelected?: boolean;
}) => {
  return (
    <Flex alignItems="center">
      <Button
        variant="ghost"
        onClick={openMessage}
        overflow="hidden"
        bg="brand.shadow"
        justifyContent="start"
        alignItems="center"
        minH="10rem"
        pl="2rem"
        w="300px"
        borderRadius="2px"
      >
        <HStack alignItems="center" gap="1rem">
          <IconFilled
            fontSize="3rem"
            style={{
              marginBottom: "6px",
              opacity: msg.status === "unread" ? 1 : 0.3,
            }}
          />
          <Text textOverflow="ellipsis">
            {msg.subjectLine.slice(0, 12)}
            {msg.subjectLine.length > 10 ? "..." : ""}
          </Text>
        </HStack>
      </Button>
      <HStack gap={0} opacity={isSelected ? 1 : 0} transition="all 0.25s ease">
        <Box bg="white" borderRadius="100%" boxSize="2rem" />
        <Box h="3px" bg="white" w="10rem" />
        <Box bg="white" borderRadius="100%" boxSize="2rem" />
      </HStack>
    </Flex>
  );
};
