import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function AddStudent() {
  const initialRef = React.useRef();

  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: `Student Added`,
      description: `${studentName} added successfully`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const toggleWarnToast = () => {
    return toast({
      title: `Server Error`,
      description: `No Server Response`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  const [studentName, setStudentname] = useState(null);
  const [studentRoll, setStudentRoll] = useState(" ");
  const [studentCGPA, setStudentCGPA] = useState(null);
  const [studentBacklogs, setStudentBacklogs] = useState(" ");

  const addStudent = async (e) => {
    let subject = {
      name: studentName,
      rollNumber: studentRoll,
      cgpa: studentCGPA,
      backlogs: studentBacklogs,
    };

    let res = await api.post("/api/Student", subject, config);

    console.log(res.status);

    toggleToast();
    //     console.log(subject);
  };

  return (
    <Box
      p={4}
      width='50%'
      border='2px'
      borderColor='gray.300'
      borderRadius={10}>
      <form onSubmit={addStudent}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            variant='filled'
            ref={initialRef}
            placeholder='Name'
            onChange={(e) => setStudentname(e.target.value)}
          />
        </FormControl>

        <FormControl mt={3} isRequired>
          <FormLabel>Roll</FormLabel>
          <Input
            variant='filled'
            placeholder='Roll Number'
            onChange={(e) => setStudentRoll(e.target.value)}
          />
        </FormControl>

        <FormControl mt={3} isRequired>
          <FormLabel>CGPA</FormLabel>
          <Input
            variant='filled'
            placeholder='CGPA'
            type='float'
            onChange={(e) => setStudentCGPA(e.target.value)}
          />
        </FormControl>

        <FormControl mt={3} isRequired>
          <FormLabel>Backlogs</FormLabel>
          <Input
            variant='filled'
            placeholder='Backlogs'
            onChange={(e) => {
              setStudentBacklogs(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <Button colorScheme='green' mr={3} type='submit' mt={3}>
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default AddStudent;
