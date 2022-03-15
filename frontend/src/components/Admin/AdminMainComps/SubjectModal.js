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

function SubjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  return (
    <>
      <Button
        variant='outline'
        color='orange'
        borderColor='orange'
        onClick={onOpen}
        marginTop='10px'>
        + Subject
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Subject Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Name' />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Code</FormLabel>
              <Input placeholder='Code' />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Dept.</FormLabel>
              <Select placeholder='Select option'>
                <option value='CSE'>CSE</option>
                <option value='ECE'>ECE</option>
                <option value='EEE'>EEE</option>
                <option value='CIVIL'>CIVIL</option>
                <option value='MECH'>MECH</option>
                <option value='BME'>BME</option>
              </Select>
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Seats</FormLabel>
              <Input placeholder='Number of seats' />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Faculty</FormLabel>
              <Input placeholder='Faculty name' />
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

export default SubjectModal;
