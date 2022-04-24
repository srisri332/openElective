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

function DateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState(new Date());

  function func(date) {
    console.log(date.date);
  }

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
