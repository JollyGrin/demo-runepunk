import { Box, Button, Grid, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { useWalletState } from "@/services/wallet/useWalletState";
import { useRouter } from "next/router";
import { FaMapLocationDot as IconMap } from "react-icons/fa6";
import { PiTreasureChestDuotone as IconChest } from "react-icons/pi";
import { useEffect } from "react";
import { useMe } from "@/services/api/user";
import { AuthorizeModal } from "./AuthorizeModal";

export function DashNav(props: { playerName?: string }) {
  const { asPath, push } = useRouter();
  const { state } = useWalletState();

  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (state !== "out") return;
    // push("/login");
  }, [state]);

  return (
    <>
      {/* {!me && !isLoading && <AuthorizeModal onClose={() => {}} isOpen={true} />} */}
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(3,1fr)" }}
        p="1rem 2rem"
        h="10rem"
      >
        <HStack gap="1rem" as={Link} href="/dash">
          <Image src="/demo-runepunk/runepunk_logo_light.png" alt="logo" boxSize="7rem" />
        </HStack>
        <HStack justifyContent="center">
          <Button
            isDisabled={asPath === "/map"}
            as={Link}
            href="/map"
            variant="ghost"
          >
            <IconMap color="brand.primary" fontSize="5rem" />
          </Button>

          <Button
            isDisabled={asPath === "/dash/lootbox"}
            as={Link}
            href="/dash/lootbox"
            variant="ghost"
          >
            <IconChest color="brand.primary" fontSize="5rem" />
          </Button>
        </HStack>

        <HStack gap="2rem" justifyContent="end">
          <UserDropdown />
        </HStack>
      </Grid>
    </>
  );
}
