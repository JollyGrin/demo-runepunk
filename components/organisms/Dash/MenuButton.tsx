import { useHover } from "@uidotdev/usehooks";
import { FaArrowAltCircleUp as IconUp } from "react-icons/fa";
import { Flex, Button, HStack, Text, Box, ChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import Link from "next/link";

export const DashMenuButton = (props: {
  text: string;
  onExpand?: () => void;
  isExpanded?: boolean;
  Icon?: ReactNode;
  link?: string;
  style?: ChakraProps;
  isDisabled?: boolean;
}) => {
  const [ref, isHover] = useHover();

  const asLink = {
    as: Link,
    href: props.link,
  };
  const onClick = {
    onClick: props.onExpand,
  };

  const buttonActions = !!props.link ? asLink : onClick;

  const backgroundColor = props.style?.bg ?? "brand.shadow";
  const hoverBgColor =
    (props.style?._hover?.bg as string | undefined) ?? "aquamarine";

  return (
    <Flex gap="1rem" ref={ref} transition="all 0.25s ease">
      <Flex transition="inherit">
        <Box
          bg={isHover ? hoverBgColor : backgroundColor}
          w="1rem"
          h="100%"
          transform={isHover ? "translateX(-0.5rem)" : "translateX(1px)"}
          transition="inherit"
        />
        <Box
          bg={isHover ? hoverBgColor : backgroundColor}
          w="1rem"
          h="100%"
          transition="inherit"
        />
      </Flex>
      <Button
        isDisabled={props.isDisabled}
        variant="ghost"
        borderRadius="2px"
        bg={isHover ? hoverBgColor : backgroundColor}
        minW={{ base: "265px", md: "400px" }}
        w="100%"
        justifyContent="start"
        py="1.5rem"
        px="2.75rem"
        _hover={{
          bg: hoverBgColor,
          color: "brand.secondary",
        }}
        _disabled={{
          opacity: 0.5,
          bg: backgroundColor,
          color: "brand.primary",
          cursor: "not-allowed",
        }}
        {...{ ...buttonActions }}
      >
        <HStack
          justifyContent={props.style?.justifyContent ?? "space-between"}
          w="100%"
        >
          <HStack gap="1rem">
            {props.Icon && <IconUp />}
            <Text>{props.text}</Text>
          </HStack>
          {!!props.onExpand && (
            <IconUp
              fontSize="3rem"
              style={{
                transition: "all 0.25s ease",
                transform: props.isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )}
        </HStack>
      </Button>

      <Flex transition="inherit">
        <Box
          bg={isHover ? hoverBgColor : backgroundColor}
          w="1rem"
          h="100%"
          transition="inherit"
        />
        <Box
          bg={isHover ? hoverBgColor : backgroundColor}
          w="1rem"
          h="100%"
          transform={isHover ? "translateX(0.5rem)" : "translateX(-1px)"}
          transition="inherit"
        />
      </Flex>
    </Flex>
  );
};
