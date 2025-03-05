import Cookies from "js-cookie";
import { useMe } from "@/services/api/user";
import { useWalletState } from "@/services/wallet/useWalletState";
import {
  Text,
  Box,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const UserDropdown = () => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { state, publicKey, disconnect } = useWalletState();
  const queryClient = useQueryClient();

  const { data } = useMe();

  function logOut() {
    setIsDisconnecting(true);
    setTimeout(() => {
      disconnect();
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      queryClient.removeQueries({ queryKey: ["me"] });
      setIsDisconnecting(false);
    }, 1000);
  }
  return (
    <Box>
      {
        {
          out: <p>out</p>,
          loading: <p>loading</p>,
          in: (
            <>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} variant="ghost">
                  <UserPfp publicKey={publicKey ?? ""} />
                </MenuButton>
                <MenuList color="brand.secondary">
                  <MenuItem
                    as={Link}
                    target="_blank"
                    href="https://tiplink.io/"
                  >
                    <HStack>
                      <Image w="3.5rem" alt="tiplink" src={tipLinkIcon} />
                      <Text fontSize="1.5rem">
                        {publicKey?.substring(0, 4)}
                        {"..."}
                        {publicKey?.substring(
                          publicKey.length - 4,
                          publicKey.length,
                        )}
                      </Text>
                    </HStack>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logOut}>
                    <HStack>
                      <Text>Log out</Text>
                      {isDisconnecting && <Spinner />}
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ),
        }[state]
      }
    </Box>
  );
};

function UserPfp(props: { publicKey: string }) {
  const imageUrl =
    "https://api.dicebear.com/9.x/icons/svg?seed=" + props.publicKey;

  return (
    <Image
      src={imageUrl}
      alt="user-pfp"
      w="7rem"
      borderRadius="100%"
      cursor="pointer"
    />
  );
}

const tipLinkIcon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MCA4MEM2MCA2OC45NTQzIDY4Ljk1NDMgNjAgODAgNjBIMTAwQzExMS4wNDYgNjAgMTIwIDY4Ljk1NDMgMTIwIDgwVjEwMEMxMjAgMTExLjA0NiAxMTEuMDQ2IDEyMCAxMDAgMTIwSDgwQzY4Ljk1NDMgMTIwIDYwIDExMS4wNDYgNjAgMTAwVjgwWiIgZmlsbD0iI0Y1RjdGOCIvPgo8cGF0aCBkPSJNMjAgMEM4Ljk1NDMxIDAgMCA4Ljk1NDMgMCAyMFY4MEMwIDkxLjA0NTcgOC45NTQzIDEwMCAyMCAxMDBINTBWODBDNTAgNjMuNDMxNSA2My40MzE1IDUwIDgwIDUwSDEwMFYyMEMxMDAgOC45NTQzMSA5MS4wNDU3IDAgODAgMEgyMFoiIGZpbGw9IiMwMDdDQkYiLz4KPHBhdGggZD0iTTM1LjI1OCAzOC45ODg2QzMwLjkxNDIgMzQuNjQ0NyAzMC45MTQyIDI3LjYwMTggMzUuMjU4IDIzLjI1NzlDMzkuNjAxOSAxOC45MTQgNDYuNjQ0OCAxOC45MTQgNTAuOTg4NyAyMy4yNTc5TDY5Ljg2NTUgNDIuMTM0N0M3Mi4yNDA2IDQ0LjUwOTkgNzMuMzE3MSA0Ny42OTIgNzMuMDk0OSA1MC43OTg1QzcxLjQxNDUgNTEuMTk0NCA2OS43ODg3IDUxLjczMTUgNjguMjMwNyA1Mi4zOTY2QzY5LjE0NjkgNTAuMDEwNyA2OC42NDMxIDQ3LjIwNDYgNjYuNzE5MyA0NS4yODA4TDQ3Ljg0MjYgMjYuNDA0QzQ1LjIzNjIgMjMuNzk3NyA0MS4wMTA1IDIzLjc5NzcgMzguNDA0MiAyNi40MDRDMzUuNzk3OCAyOS4wMTA0IDM1Ljc5NzggMzMuMjM2MSAzOC40MDQyIDM1Ljg0MjRMNDcuNTIwNCA0NC45NTg3TDQ0LjM3NDMgNDguMTA0OEwzNS4yNTggMzguOTg4NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02MS4xOTM0IDU2LjYyNTNDNTkuNzYzMyA1Ni40NTIyIDU4LjM3ODUgNTUuODE2OCA1Ny4yODA5IDU0LjcxOTJMNTQuNDEzNiA1MS44NTE4TDUxLjI2NzQgNTQuOTk3OUw1NC4xMzQ4IDU3Ljg2NTNDNTUuMTMyIDU4Ljg2MjUgNTYuMjcxNCA1OS42MzA4IDU3LjQ4NzggNjAuMTcwMkM1OC42MTk2IDU4Ljg4NjIgNTkuODU5NiA1Ny42OTk4IDYxLjE5MzQgNTYuNjI1M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01MS44NTk0IDY5LjU3OTJMNDcuODQyNiA3My41OTZDNDUuMjM2MiA3Ni4yMDIzIDQxLjAxMDUgNzYuMjAyMyAzOC40MDQyIDczLjU5NkMzNS43OTc4IDcwLjk4OTYgMzUuNzk3OCA2Ni43NjM5IDM4LjQwNDIgNjQuMTU3Nkw1Ny4yODA5IDQ1LjI4MDhDNTguMjA2MyA0NC4zNTU1IDU5LjMzNTcgNDMuNzU4NyA2MC41MjQzIDQzLjQ5MDRMNTcuMDYzMSA0MC4wMjkxQzU2LjAwNjEgNDAuNTUyNiA1NS4wMTUgNDEuMjU0NSA1NC4xMzQ4IDQyLjEzNDdMNDkuNDE1NiA0Ni44NTM5TDQ5LjQwODEgNDYuODQ2NEw0Ni4yNjIgNDkuOTkyNUw0Ni4yNjk1IDUwTDM1LjI1OCA2MS4wMTE1QzMwLjkxNDEgNjUuMzU1NCAzMC45MTQxIDcyLjM5ODIgMzUuMjU4IDc2Ljc0MjFDMzkuMzE2NiA4MC44MDA3IDQ1LjczMTIgODEuMDY3MyA1MC4wOTkzIDc3LjU0MTlDNTAuMzI0NiA3NC43NjM0IDUwLjkyODUgNzIuMDkxOSA1MS44NTk0IDY5LjU3OTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTA5LjE1IDkwLjQ1QzEwOS4xNSA4OS4xMzMzIDEwOS4wMzMgODcuODgzMyAxMDguODMzIDg2LjY2NjdIOTBWOTQuMTgzM0gxMDAuNzgzQzEwMC4zIDk2LjY1IDk4Ljg4MzMgOTguNzMzMyA5Ni43ODMzIDEwMC4xNVYxMDUuMTVIMTAzLjIxN0MxMDYuOTgzIDEwMS42NjcgMTA5LjE1IDk2LjUzMzMgMTA5LjE1IDkwLjQ1WiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNOTAuMDAwMSAxMTBDOTUuNDAwMSAxMTAgOTkuOTE2NyAxMDguMiAxMDMuMjE3IDEwNS4xNUw5Ni43ODMzIDEwMC4xNUM5NC45ODMzIDEwMS4zNSA5Mi43MDAxIDEwMi4wODMgOTAuMDAwMSAxMDIuMDgzQzg0Ljc4MzQgMTAyLjA4MyA4MC4zNjY3IDk4LjU2NjcgNzguNzgzNCA5My44MTY3SDcyLjE1MDFWOTguOTY2N0M3NS40MzM0IDEwNS41IDgyLjE4MzQgMTEwIDkwLjAwMDEgMTEwWiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNzguNzgzNCA5My44MTY3Qzc4LjM2NjcgOTIuNjE2NyA3OC4xNSA5MS4zMzMzIDc4LjE1IDkwQzc4LjE1IDg4LjY2NjcgNzguMzgzMyA4Ny4zODMzIDc4Ljc4MzMgODYuMTgzM1Y4MS4wMzMzSDcyLjE1QzcwLjc4MzMgODMuNzMzMyA3MCA4Ni43NjY3IDcwIDkwQzcwIDkzLjIzMzMgNzAuNzgzNCA5Ni4yNjY3IDcyLjE1MDEgOTguOTY2N0w3OC43ODM0IDkzLjgxNjdaIiBmaWxsPSIjRkJCQzA1Ii8+CjxwYXRoIGQ9Ik05MC4wMDAxIDc3LjkxNjdDOTIuOTUwMSA3Ny45MTY3IDk1LjU4MzQgNzguOTMzMyA5Ny42NjY3IDgwLjkxNjdMMTAzLjM2NyA3NS4yMTY3Qzk5LjkxNjcgNzEuOTgzMyA5NS40MDAxIDcwIDkwLjAwMDEgNzBDODIuMTgzNCA3MCA3NS40MzMzIDc0LjUgNzIuMTUgODEuMDMzM0w3OC43ODMzIDg2LjE4MzNDODAuMzY2NyA4MS40MzMzIDg0Ljc4MzQgNzcuOTE2NyA5MC4wMDAxIDc3LjkxNjdaIiBmaWxsPSIjRUE0MzM1Ii8+Cjwvc3ZnPgo=";
