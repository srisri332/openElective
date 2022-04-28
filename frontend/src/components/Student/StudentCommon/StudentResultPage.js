import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";

function StudentResultPage() {
  const [electedStat, setElectedStat] = useState(false);
  const [allotedDeets, setAllotedDeets] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006",
    });

    api
      .get("/api/Student/" + localStorage.getItem("studentRoll"), config)
      .then((res) => {
        // console.log(res.data.elected);
        if (res.data.elected == true)
          api
            .get(
              "/api/Allotment/" + localStorage.getItem("studentRoll"),
              config
            )
            .then((res) => {
              //       console.log(res);
              setAllotedDeets(res.data);
            });
        setElectedStat(res.data.elected);
      });
  }, []);

  return (
    <>
      {electedStat ? (
        <Center>
          <VStack>
            <Text fontSize='2xl' margin='20px'>
              Your Alloted Subjects
            </Text>
            <Box>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Open Elective</Th>
                      <Th>Subject</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {allotedDeets &&
                      allotedDeets.map((oneOE) => {
                        return (
                          <Tr key={oneOE.id}>
                            <Td>{oneOE.oe}</Td>
                            <Td>{oneOE.subjectName}</Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </Center>
      ) : (
        <p>youre elected</p>
      )}
    </>
  );
}

export default StudentResultPage;
