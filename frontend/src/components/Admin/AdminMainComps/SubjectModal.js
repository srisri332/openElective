import React, { useState } from "react";
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
import axios from "axios";

function SubjectModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  //variables to store form data
  const [subjectName, setSubjectName] = useState(null);
  const [subjectCode, setSubjectCode] = useState(null);
  const [subjectDept, setSubjectDept] = useState(null);
  const [subjectSeats, setSubjectSeats] = useState(null);
  const [subjectFaculty, setSubjectFaculty] = useState(null);

  const addSubject = async () => {
    console.log(subjectName);
    console.log(subjectCode);
    console.log(subjectDept);
    console.log(subjectSeats);
    console.log(subjectFaculty);
    // let res = await api.post("/SUBS/" + props.electiveID, { datas:  });
    onClose();
  };

  const onModalClose = () => {
    setSubjectName(null);
    setSubjectCode(null);
    setSubjectDept(null);
    setSubjectSeats(null);
    setSubjectFaculty(null);
    onClose();
  };

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
              <Input
                ref={initialRef}
                placeholder='Name'
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Code</FormLabel>
              <Input
                placeholder='Code'
                onChange={(e) => setSubjectCode(e.target.value)}
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Dept.</FormLabel>
              <Select
                placeholder='Select option'
                onChange={(e) => setSubjectDept(e.target.value)}>
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
              <Input
                placeholder='Number of seats'
                type='number'
                onChange={(e) => setSubjectSeats(e.target.value)}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Faculty</FormLabel>
              <Input
                placeholder='Faculty name'
                onChange={(e) => {
                  setSubjectFaculty(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={addSubject}>
              Submit
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SubjectModal;
