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
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { FaRedoAlt } from "react-icons/fa";

import OEContext from "../../../contexts/OEContext";

function ResetAllotModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(null);
  const [stopped, setStopped] = useState(null);

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

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });
  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    api.get("/api/Details").then((res) => {
      // console.log(res.data);
      setStatus(res.data.isStarted);
      setStopped(res.data.isCompleted);
      // console.log(status);
    });
  }, []);

  //This function is used to reset the OE allotment process
  const resetAllotment = async () => {
    // request POST 'https://localhost:7006/api/Allotment/reset' \
    // --header 'Authorization: Bearer

    let res = await api.post("api/Allotment/reset", {}, config);
    let res2 = await api.post("/api/Details/reset");
    window.location.reload(false);
    console.log(res2.status);

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
      {/* <Button
        color='white'
        borderColor='red'
        bgColor='red.600'
        marginRight='10px'
        onClick={onOpen}
        disabled={!(status && stopped)}> */}
      <Tooltip label='Reset Elective' fontSize='md'>
        <IconButton
          disabled={!(status && stopped)}
          onClick={onOpen}
          colorScheme='red'
          fontSize='20px'
          icon={<FaRedoAlt />}
        />
      </Tooltip>
      {/* Reset Allotment
      </Button> */}
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
            <Text>Are you sure you want to reset the allotment?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={resetAllotment}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetAllotModal;
