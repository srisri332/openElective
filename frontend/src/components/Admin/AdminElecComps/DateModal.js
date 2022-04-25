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
  Image,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import calendar from "../../images/calendar.png";
// import { DatePicker } from "@orange_digital/chakra-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

function DateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const func = async () => {
    let text = selectedDate + " ";
    const myArray = text.split(" ");
    let word = myArray[2] + months[`${myArray[1]}`] + myArray[3];
    // console.log(word);
    let res = await api.put("/api/Details/" + word);
    console.log(res);
  };

  return (
    <>
      <Tooltip label='Set Last Date' fontSize='md'>
        {/* <Button
          color='white'
          bgColor='purple.500'
          marginRight='10px'
          // borderRadius='50px'
          onClick={onOpen}> */}
        <IconButton
          onClick={onOpen}
          colorScheme='purple'
          fontSize='20px'
          icon={<FaCalendarAlt />}
        />
        {/* Set Date
        </Button> */}
      </Tooltip>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Final Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <DatePicker
              value={selectedDate}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={func}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DateModal;
