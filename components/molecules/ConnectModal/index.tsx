import { HREF_DISCORD } from "@/components/atoms/Nav/constants";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaDiscord as IconDiscord } from "react-icons/fa";

export const ConnectModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent gap="1rem" w="600px" h="fit-content">
        <ModalHeader
          fontFamily="header"
          fontSize="4rem"
          borderBottom="solid 0.5rem"
          borderColor="brand.secondary"
        >
          Connecting coming soon!
        </ModalHeader>
        <ModalBody>
          <Text>
            We&apos;re currently hard at work building out the first launch for
            Runepunk Legends!
          </Text>

          <Text my="2rem">
            <strong>Soon</strong>, early fans will be able to connect and engage
            with the project to earn rare collectibles when it&apos;s finally
            launched.
          </Text>

          <Text display="inline" mr="2rem">
            In the meantime, join us on
          </Text>
          <Button as={Link} href={HREF_DISCORD}>
            <IconDiscord style={{ marginRight: "1rem" }} />
            <Text>Discord</Text>
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
