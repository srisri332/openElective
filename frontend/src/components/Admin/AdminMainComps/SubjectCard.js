import React from "react";
import {
  Table,
  TableCaption,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Center,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

function SubjectCard(props) {
  // console.log(props.subjects);

  //base api url for all requests
  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  //this fucntion is used for showing toast messages
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: "Subject Deleted",
      description: ``,
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  };

  const deleteSubject = async (subject) => {
    console.log(props.electiveID + " " + subject.id);

    let res = await api.delete(
      "/api/Subjects/" + props.electiveID + "/" + subject.id
    );
    if (res.status == 200) {
      toggleToast();
    }
  };

  return (
    <>
      <form>
        <Table variant='simple' margin='15px' size='sm'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Dept.</Th>
              <Th>Seats</Th>
              <Th>Faculty</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.subjects &&
              props.subjects.map((subject) => {
                return (
                  <Tr key={subject.id}>
                    <Td>{subject.name}</Td>
                    <Td>ABCDE</Td>
                    <Td>{subject.departmentId}</Td>
                    <Td>{subject.seats}</Td>
                    <Td>{subject.instructor}</Td>
                    <Center>
                      <Td>
                        <button type='submit'>
                          <CloseIcon
                            color='red.400'
                            cursor='pointer'
                            onClick={() => deleteSubject(subject)}
                          />
                        </button>
                      </Td>
                    </Center>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </form>
    </>
  );
}

export default SubjectCard;