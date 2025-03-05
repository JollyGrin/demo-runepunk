import { Grid, Flex, Text } from "@chakra-ui/react";
import { DashLayout } from "@/components/organisms/Dash/Layout";
import { PlayerInboxMockAPI } from "@/services/mock/player_inbox/player_inbox_mock_api";
import { PlayerInboxMessageView } from "@/services/mock/player_inbox/player_inbox_mock_api_types";
import { useEffect, useState } from "react";
import { InboxButton } from "@/components/organisms/DashInbox/InboxButton";
import { MessagePane } from "@/components/organisms/DashInbox/MessagePane";

function InboxPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<number>();
  const [state, setState] = useState<PlayerInboxMessageView[]>();
  const api = new PlayerInboxMockAPI();

  useEffect(() => {
    const state = api.listInboxMessages();
    setState(state.messages);
  }, []);

  function deleteMsg(messageId: number) {
    api.markAsDeleted(messageId);
    setState(api.listInboxMessages().messages);
  }

  function markAsRead(messageId: number) {
    api.markAsRead(messageId);
    setState(api.listInboxMessages().messages);
  }

  function reset() {
    api.resetLocalStorage();
    setState(api.listInboxMessages().messages);
  }

  return (
    <DashLayout>
      <Grid templateColumns={{ base: "1fr", md: "4fr 7fr" }} h="100%">
        <Flex direction="column" gap="2rem" p="1rem" pr={0}>
          {state?.map((msg) => (
            <InboxButton
              key={msg.messageID}
              msg={msg}
              openMessage={() => {
                setSelectedMessageId(msg.messageID);
                markAsRead(msg.messageID);
              }}
              isSelected={msg.messageID === selectedMessageId}
            />
          ))}
          <Text mt="10rem" onClick={reset} cursor="pointer">
            Reset Screen
          </Text>
        </Flex>
        <MessagePane
          msg={state?.find((msg) => msg.messageID === selectedMessageId)}
          closeModal={() => setSelectedMessageId(undefined)}
          deleteMessage={() =>
            selectedMessageId && deleteMsg(selectedMessageId)
          }
        />
      </Grid>
    </DashLayout>
  );
}

export default InboxPage;
