import { PlayerInboxMessageView } from "@/services/mock/player_inbox/player_inbox_mock_api_types";
import { Image, Box, Text, Flex, HStack, Button } from "@chakra-ui/react";

import { MdCancel as IconCancel } from "react-icons/md";
import { FaTrashAlt as IconTrash } from "react-icons/fa";

export const MessagePane = ({
  msg,
  closeModal,
  deleteMessage,
}: {
  msg?: PlayerInboxMessageView;
  closeModal: () => void;
  deleteMessage: () => void;
}) => {
  if (!msg) return null;
  return (
    <Box
      border="solid 1px"
      borderColor="brand.primary"
      p="5rem"
      fontSize="3rem"
      position="relative"
    >
      <Box
        position="absolute"
        right={0}
        top="-5rem"
        as={Button}
        variant="ghost"
        onClick={closeModal}
      >
        <IconCancel fontSize="4rem" />
      </Box>
      <Box
        position="absolute"
        right="2rem"
        bottom="2rem"
        as={Button}
        variant="ghost"
        onClick={deleteMessage}
      >
        <IconTrash fontSize="4rem" />
      </Box>
      <HStack alignItems="end" gap="1rem">
        <Image
          borderRadius="100%"
          boxSize="15rem"
          filter="drop-shadow(2px 2px 2px rgba(255,255,255,0.5))"
          alt="pfp"
          src={
            "https://api.dicebear.com/9.x/open-peeps/svg?seed=" + msg.npc.npcID
          }
        />
        <Text>From:</Text>
        <Text fontWeight={700}>{msg.npc.name}</Text>
      </HStack>
      <Text fontSize="4rem" fontWeight={700}>
        {msg.subjectLine}
      </Text>
      <Text fontSize="2rem">{msg.body}</Text>
    </Box>
  );
};
