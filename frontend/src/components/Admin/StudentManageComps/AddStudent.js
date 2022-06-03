import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function AddStudent() {
  const initialRef = React.useRef();

  const [studentName, setStudentname] = useState(null);
  const [studentRoll, setStudentRoll] = useState(" ");
  const [studentCGPA, setStudentCGPA] = useState(null);
  const [studentBacklogs, setStudentBacklogs] = useState(" ");

  const addStudent = () => {
    let subject = {
      name: studentName,
      seats: studentCGPA,
      code: studentRoll,
      instructor: studentBacklogs,
      details: "lols",
    };
    console.log(subject);
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
            type='number'
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
