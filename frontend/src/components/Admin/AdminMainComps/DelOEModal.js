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
import { DeleteIcon } from "@chakra-ui/icons";

function DelOEModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

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
      title: `OE Deleted Successfully`,
      description: ` `,
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  };

  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
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

  //This function is used to send the post request to add OE card
  const deleteOE = async () => {
    let res = await api.delete(
      "/api/OpenElectives/" + props.electiveID,
      config
    );

    console.log(res.status);
    if (res.status == 200) {
      updateAllOES();
    }
    toggleToast();
    onClose();
  };

  return (
    <>
      {/* <DeleteIcon
        color='red.300'
        cursor='pointer'
        onClick={onOpen}
        disabled={status}
      /> */}

      <Button
        leftIcon={<DeleteIcon />}
        colorScheme='white'
        variant='solid'
        color='red.300'
        cursor='pointer'
        onClick={onOpen}
        disabled={status}></Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Text>Are you sure you want to delete the Open Elective?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={deleteOE}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DelOEModal;
