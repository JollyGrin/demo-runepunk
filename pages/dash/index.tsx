import { HeadMeta } from "@/components/atoms/Head";
import { DashMenuButton } from "@/components/organisms/Dash/MenuButton";
import { Collapse, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import { ChatBox } from "@/components/organisms/Dash/ChatBox";
import { DashLayout } from "@/components/organisms/Dash/Layout";

export default function DashboardHome() {
  return (
    <>
      <HeadMeta />
      <DashLayout>
        <Body />
      </DashLayout>
    </>
  );
}

const subMenuTransition = "scale(0.9)";
const Body = () => {
  const profile = useDisclosure();
  const shopping = useDisclosure();
  const workstation = useDisclosure();

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      h="inherit"
      gap="3rem"
    >
      <Flex
        borderRadius="0.25rem"
        direction="column"
        maxH="800px"
        h="100%"
        alignItems="center"
        pt="4rem"
        gap="4rem"
        overflowY={{ base: "unset", md: "auto" }}
      >
        <Flex direction="column" gap="1rem">
          <DashMenuButton
            text="My Profile"
            onExpand={profile.onToggle}
            isExpanded={profile.isOpen}
          />
          <Collapse in={profile.isOpen}>
            <Flex direction="column" transform={subMenuTransition} gap="2rem">
              <DashMenuButton text="Inbox" link="/dash/inbox" />
              <DashMenuButton isDisabled text="Character" />
            </Flex>
          </Collapse>
        </Flex>

        <Flex direction="column" gap="1rem">
          <DashMenuButton
            text="Shopping"
            onExpand={shopping.onToggle}
            isExpanded={shopping.isOpen}
          />
          <Collapse in={shopping.isOpen}>
            <Flex direction="column" transform={subMenuTransition} gap="2rem">
              <DashMenuButton isDisabled text="Merchants" />
              <DashMenuButton text="Convert Gem into Rune" link="/dash/swap" />
              <DashMenuButton text="Loot Boxes" link="/dash/lootbox" />
              <DashMenuButton text="Bazaar" link="/bazaar" />
              <DashMenuButton isDisabled text="P2P Trading" />
            </Flex>
          </Collapse>
        </Flex>

        <DashMenuButton text="Map" link="/map" />

        <Flex direction="column" gap="1rem">
          <DashMenuButton
            text="Workstation"
            onExpand={workstation.onToggle}
            isExpanded={workstation.isOpen}
          />
          <Collapse in={workstation.isOpen}>
            <Flex direction="column" transform={subMenuTransition} gap="2rem">
              <DashMenuButton isDisabled text="Crafting" />
              <DashMenuButton isDisabled text="Corporations" />
            </Flex>
          </Collapse>
        </Flex>
      </Flex>
      <ChatBox />
    </Grid>
  );
};
