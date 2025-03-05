import { HeadMeta } from "@/components/atoms/Head";
import { DashLayout } from "@/components/organisms/Dash/Layout";
import { LootCanvas } from "@/components/organisms/Lootbox/LootCanvas";
import { Box, Grid, Flex, Text, Fade, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function LootboxPage() {
  const [rewards, setRewards] = useState<number>();
  return (
    <>
      <HeadMeta />
      <main>
        <Box position="relative">
          <Box position="relative">
            <Fade in={!!rewards} unmountOnExit>
              <LootCanvas rewards={rewards} />
              <Button
                position="absolute"
                zIndex={100}
                bottom="20rem"
                right="calc(50% - 14rem)"
                onClick={() => setRewards(undefined)}
              >
                Back to Store
              </Button>
            </Fade>
          </Box>

          <Fade in={!rewards} unmountOnExit>
            <StoreFront setRewards={setRewards} />
          </Fade>
        </Box>
      </main>
    </>
  );
}

const StoreFront = (props: {
  setRewards: (value: number | undefined) => void;
}) => {
  return (
    <DashLayout>
      <Grid placeItems="center" h="100%">
        <Flex gap="1rem" flexWrap="wrap" justifyContent="center">
          {[100, 200, 300, 400, 500, 600]?.map((value, i) => (
            <Flex
              key={"lootboxstore" + value}
              direction="column"
              border="solid 1px white"
              borderRadius="0.25rem"
              cursor="pointer"
              onClick={() => props.setRewards(i + 1)}
              transition="all 0.25s ease"
              _hover={{
                opacity: 0.75,
                filter: "saturate(2)",
              }}
            >
              <Box h="20rem" bg="aquamarine" opacity={value / 600} />
              <Flex p="1rem">
                <Text fontSize="3rem" fontFamily="header">
                  <strong>{value}</strong> GEMS
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Grid>
    </DashLayout>
  );
};
