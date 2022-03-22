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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function SubjectCard(props) {
  console.log(props.subjects);

  return (
    <>
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
                      <CloseIcon color='red.400' cursor='pointer' />
                    </Td>
                  </Center>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

export default SubjectCard;
