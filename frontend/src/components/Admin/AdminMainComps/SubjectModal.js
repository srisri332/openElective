import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function SubjectModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  //base api url for all requests
  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  const [status, setStatus] = useState(null);
  useEffect(() => {
    api.get("/api/Details").then((res) => {
      // console.log(res.data);
      setStatus(res.data.isStarted);
      // console.log(status);
    });
  }, []);

  //this fucntion is used for showing toast messages
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: "Subject Added",
      description: `Successfully added ${subjectName}`,
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };

  //variables to store form data
  const [subjectName, setSubjectName] = useState(null);
  const [subjectCode, setSubjectCode] = useState(" ");
  const [subjectDept, setSubjectDept] = useState(null);
  const [subjectSeats, setSubjectSeats] = useState(null);
  const [subjectFaculty, setSubjectFaculty] = useState(" ");
  const [subjectCredits, setSubjectCredits] = useState(0);

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  //This function is used to add subject to any particular OE
  const addSubject = async (e) => {
    e.preventDefault();

    let subject = {
      name: subjectName,
      departmentId: "aaef2013-5524-4d18-a8c3-e375a158b297",
      credits: subjectCredits,
      seats: subjectSeats,
      code: subjectCode,
      instructor: subjectFaculty,
      details: "lols",
    };

    let res = await api.post(
      "/api/Subjects/" + props.electiveID,
      subject,
      config
    );

    console.log(res.status);

    props.updtSubject();

    toggleToast();
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
        disabled={status}
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
          <form onSubmit={addSubject}>
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

              <FormControl mt={3} isRequired>
                <FormLabel>Code</FormLabel>
                <Input
                  placeholder='Code'
                  onChange={(e) => setSubjectCode(e.target.value)}
                />
              </FormControl>

              <FormControl mt={3} isRequired>
                <FormLabel>Credits</FormLabel>
                <Input
                  type='number'
                  placeholder='Credits'
                  onChange={(e) => setSubjectCredits(e.target.value)}
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

              <FormControl mt={3} isRequired>
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
              <Button colorScheme='green' mr={3} type='submit'>
                Submit
              </Button>
              <Button onClick={onModalClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SubjectModal;
