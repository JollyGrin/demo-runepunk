import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";
import { SignLoginButton } from "../../Login/SignMessage";

export const AuthorizeModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent gap="1rem" w="400px">
        <ModalHeader
          fontFamily="header"
          fontSize="4rem"
          borderBottom="solid 0.5rem"
          borderColor="brand.secondary"
        >
          Authorization
        </ModalHeader>
        <ModalBody>
          <Text>Welcome back!</Text>
          <Text my="3rem">Please sign to verify access to your dashboard</Text>
          <Flex justifyContent="center">
            <SignLoginButton />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
