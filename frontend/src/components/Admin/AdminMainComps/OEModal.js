import React, { useState, useEffect, useContext } from "react";
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
  Input,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import OEContext from "../../../contexts/OEContext";

function OEModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const [inputOE, setInputOE] = useState(null);

  //this fucntion is used for showing toast messages
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: "OE created.",
      description: `Successfully added ${inputOE}`,
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };

  //function that updates the total number of OES
  const { setAllOES } = useContext(OEContext);

  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  //this function will update the global context Open Elctives (OES), i.e the total number of OES
  const updateAllOES = () => {
    api.get("/api/OpenElectives", config).then((res) => {
      console.log(res.data);
      setAllOES(res.data);
    });
  };

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  //This function is used to send the post request to add OE card
  const addOE = async () => {
    let res = await api.post("/api/OpenElectives", { name: inputOE }, config);
    // console.log(res.status);
    if (res.status == 201) {
      updateAllOES();
    }
    toggleToast();
    onClose();
  };

  //this is used to get the status of the allotment and then enable or diable adding of allotments
  const [status, setStatus] = useState(null);
  useEffect(() => {
    api.get("/api/Details").then((res) => {
      // console.log(res.data);
      setStatus(res.data.isStarted);
      console.log(localStorage.getItem("token"));
    });
  }, []);

  const cancelAddOE = () => {
    setInputOE(null);
    onClose();
  };

  const changeOE = (e) => {
    setInputOE(e.target.value);
  };

  return (
    <>
      <Button
        variant='outline'
        color='white'
        borderColor='red'
        bgColor='red.500'
        marginRight='10px'
        onClick={onOpen}
        disabled={status}
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
              <Input
                ref={initialRef}
                placeholder='Name'
                name='OEName'
                onChange={changeOE}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={addOE}>
              Submit
            </Button>
            <Button onClick={cancelAddOE}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OEModal;
