import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

function SubjectCard(props) {
  // console.log(props.subjects);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get("/api/Details", config).then((res) => {
      // console.log(res.data);
      setStatus(res.data.isStarted);
      // console.log(status);
    });
  }, []);

  //base api url for all requests
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
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

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  const deleteSubject = async (subject) => {
    console.log(props.electiveID + " " + subject.id);

    let res = await api.delete(
      "/api/Subjects/" + props.electiveID + "/" + subject.id,
      config
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
                          <IconButton
                            variant='outline'
                            colorScheme='red'
                            isRound={true}
                            size='xs'
                            isDisabled={status}
                            onClick={() => deleteSubject(subject)}
                            icon={<CloseIcon />}
                          />
                          {/* <CloseIcon
                            color='red.400'
                            cursor='pointer'
                            onClick={() => deleteSubject(subject)}
                          /> */}
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
