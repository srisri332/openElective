import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function OEModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  return (
    <>
      <Button
        variant='outline'
        color='white'
        borderColor='red'
        bgColor='red.500'
        marginRight='10px'
        onClick={onOpen}
        leftIcon={<AddIcon />}>
        ADD Elective
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OE Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OEModal;
