import styled from "@emotion/styled";
import {
  Box,
  Flex,
  HStack,
  Text,
  Grid,
  ChakraProps,
  TextProps,
} from "@chakra-ui/react";
import {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInterval } from "usehooks-ts";
import { chatLog } from "./chatLog";

export const ChatBox = () => {
  const scrollableRef = useRef(null);
  const [index, setIndex] = useState(0);
  const threshold = chatLog.length - 1;
  const isOverThreshold = index > threshold;

  useInterval(
    () => {
      setIndex((prev) => prev + 1);
    },
    isOverThreshold ? null : (index % 6) * 700,
  );
  //
  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollableRef.current) {
      //@ts-expect-error: wrong type
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  // useEffect to scroll whenever index changes
  useEffect(() => {
    scrollToBottom();
  }, [index]);

  return (
    <ChatContainer ref={scrollableRef} display={{ base: "none", md: "grid" }}>
      <Flex direction="column" alignSelf="end">
        {Array.from({ length: index }).map((_, i) => (
          <Chat key={i + "chat"} index={i} />
        ))}
      </Flex>
    </ChatContainer>
  );
};

const playerTextStyle: CSSProperties = {
  color: "red",
  fontWeight: 700,
  textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
};
const Chat = (props: { index: number }) => {
  const msg = chatLog?.[props.index]?.msg;

  return (
    <Flex h="fit-content" display="inline">
      <Text
        as="span"
        fontWeight={700}
        letterSpacing="1px"
        color="#C6CAE9"
        mr="1rem"
      >
        {"> "}
        {chatLog?.[props.index]?.name}
        {":"}
      </Text>
      <Text as="span">
        {msg.split(" ")?.map((t, i) => (
          <span key={t + i} style={t.includes("@") ? playerTextStyle : {}}>
            {t}{" "}
          </span>
        ))}
      </Text>
    </Flex>
  );
};

const ChatContainer = styled(Grid)`
  font-size: 2rem;
  align-items: start;
  padding: 1rem;
  overflow-y: auto;
  flex-direction: column;

  border-left: solid 1px white;
  border-right: solid 1px white;

  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */

  &:after {
    /* Position the pseudo-element at the bottom right corner */
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;

    /* Styling for the small black box */
    width: 10px;
    height: 10px;
    background-color: black;
  }
`;
