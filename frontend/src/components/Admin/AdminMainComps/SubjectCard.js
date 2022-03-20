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

function SubjectCard() {
  return (
    <div>
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
          <Tr>
            <Td>OS</Td>
            <Td>ABCDE</Td>
            <Td>CSE</Td>
            <Td>100</Td>
            <Td>IOP</Td>
            <Center>
              <Td>
                <CloseIcon color='red.400' cursor='pointer' />
              </Td>
            </Center>
          </Tr>

          <Tr>
            <Td>OS</Td>
            <Td>ABCDE</Td>
            <Td>CSE</Td>
            <Td>100</Td>
            <Td>IOP</Td>
            <Center>
              <Td>
                <CloseIcon color='red.400' cursor='pointer' />
              </Td>
            </Center>
          </Tr>

          <Tr>
            <Td>OS</Td>
            <Td>ABCDE</Td>
            <Td>CSE</Td>
            <Td>100</Td>
            <Td>IOuuuuuuuuuuuP</Td>
            <Center>
              <Td>
                <CloseIcon color='red.400' cursor='pointer' />
              </Td>
            </Center>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}

export default SubjectCard;
