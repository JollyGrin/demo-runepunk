import { HeadMeta } from "@/components/atoms/Head";
import { DashLayout } from "@/components/organisms/Dash/Layout";
import { colors } from "@/styles/defaultTheme";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { IoDiamond as IconDiamond } from "react-icons/io5";
import { AiOutlineSwap as IconSwap } from "react-icons/ai";
import { DashMenuButton } from "@/components/organisms/Dash/MenuButton";
import { useState } from "react";

const totalGems = 100;
const exchangeRate = 100; // per 1 Runes coin
export default function DashboardSwap() {
  const [fields, setFields] = useState<{
    rune: number;
    gem: number;
  }>({ rune: 1, gem: 100 });

  function setField(ticker: "rune" | "gem") {
    return (value: number) => {
      const payload =
        ticker === "rune"
          ? {
              rune: value,
              gem: value * exchangeRate,
            }
          : {
              rune: value / exchangeRate,
              gem: value,
            };

      setFields(payload);
    };
  }

  return (
    <>
      <HeadMeta />
      <DashLayout>
        <Flex direction="column" w="555px" m="0 auto" gap="1rem">
          <Box bg="#C6CAE9" color="brand.secondary" p="2rem" borderRadius="1px">
            <Flex direction="column" gap="2rem">
              <HStack justifyContent="space-between">
                <Text>You pay</Text>
                <HStack gap="1rem">
                  <Text>Available: {totalGems} Gems</Text>
                  <PercentageButton
                    text="25%"
                    setValue={() => setField("gem")(totalGems * 0.25)}
                  />
                  <PercentageButton
                    text="50%"
                    setValue={() => setField("gem")(totalGems * 0.5)}
                  />
                  <PercentageButton
                    text="100%"
                    setValue={() => setField("gem")(totalGems)}
                  />
                </HStack>
              </HStack>
              <Flex direction={"column-reverse"} gap="2rem">
                <CoinInput
                  ticker="RUNE"
                  value={fields.rune}
                  setValue={setField("rune")}
                />
                <HStack gap="1rem">
                  <Box h="2px" w="100%" bg="brand.secondary" />
                  <Box
                    border="solid 3px"
                    borderColor="brand.secondary"
                    borderRadius="100%"
                  >
                    <IconSwap
                      fontSize="4rem"
                      style={{
                        transform: "rotate(90deg)",
                        color: colors.brand.secondary,
                      }}
                    />
                  </Box>
                  <Box h="2px" w="100%" bg="brand.secondary" />
                </HStack>
                <CoinInput
                  ticker="GEM"
                  value={fields.gem}
                  setValue={setField("gem")}
                />
              </Flex>
            </Flex>
          </Box>
          <DashMenuButton
            text="Swap"
            style={{
              bg: "#7B7D93",
              justifyContent: "center",
              _hover: { bg: "brand.shadow" },
            }}
          />
        </Flex>
      </DashLayout>
    </>
  );
}

const PercentageButton = (props: { text: string; setValue: () => void }) => (
  <Button
    variant="ghost"
    fontSize="1.5rem"
    color="brand.secondary"
    border="solid 1px black"
    borderRadius="10rem"
    mb="0.75rem"
    onClick={props.setValue}
    _hover={{
      bg: "brand.shadow",
      color: "brand.primary",
    }}
  >
    <Text mb="3px">{props.text}</Text>
  </Button>
);

const CoinInput = (props: {
  ticker: string;
  value: number;
  setValue: (value: number) => void;
}) => (
  <HStack p="1rem" justifyContent="space-between" bg="brand.primary">
    <HStack
      fontSize="3rem"
      bg="brand.shadow"
      color="brand.primary"
      p="0.5rem 2rem"
    >
      <IconDiamond />
      <Text>{props.ticker}</Text>
    </HStack>
    <Input
      border="solid 0"
      type="number"
      lang="en-US"
      textAlign="end"
      fontSize="3rem"
      color="black"
      placeholder="1.0"
      h="5rem"
      value={props.value}
      onChange={(e) => props.setValue(+e.target.value)}
    />
  </HStack>
);
