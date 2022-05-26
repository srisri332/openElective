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
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import OEContext from "../../../contexts/OEContext";

function StartAllotModel(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(null);

  const initialRef = React.useRef();

  //this fucntion is used for showing toast messages
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: `Allotment started successfully`,
      description: ` `,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //function that updates the total number of OES
  const { setAllOES } = useContext(OEContext);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  useEffect(() => {
    api.get("/api/Details").then((res) => {
      // console.log(res.data);
      setStatus(res.data.isStarted);
      // console.log(status);
    });
  }, []);

  //This function is used to start the OE allotment process
  const startAllotment = async () => {
    let res = await api.post("/api/Details/start");
    console.log(res.status);
    //     if (res.status == 200) {
    //       updateAllOES();
    //     }

    toggleToast();
    window.location.reload(false);
    onClose();
  };

  return (
    <>
      {/* <DeleteIcon color='green.300' cursor='pointer' onClick={onOpen} /> */}
      <Button
        color='white'
        borderColor='red'
        bgColor='green.600'
        marginRight='10px'
        onClick={onOpen}
        disabled={status}>
        Start Allotment
      </Button>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Text>Are you sure you want start the allotment?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={startAllotment}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StartAllotModel;
