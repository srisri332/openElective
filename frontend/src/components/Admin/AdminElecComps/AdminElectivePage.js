import React, { useState, useEffect } from "react";
import ButtonCards from "./ButtonCards";
import SummaryCard from "./SummaryCard";
import { Button, Center, Text } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";

function AdminElectivePage() {
  const [students, setStudents] = useState(null);
  const [status, setStatus] = useState(null);
  const [stopped, setStopped] = useState(null);

  const api = axios.create({
    baseURL: "https://localhost:7006/",
  });

  useEffect(() => {
    api.get("/api/Student").then((res) => {
      setStudents(res.data);
    });

    api.get("/api/Details").then((res) => {
      console.log(res);
      setStatus(res.data.isStarted);
      setStopped(res.data.isCompleted);
    });
  }, []);

  //get students that filled the OE form
  const getFilledDetails = async () => {
    const res = await api.get("/api/Student/Filled");
    await setStatus(res.data);
    console.log(res.data);
  };

  //get students that did not fill the OE form
  const getUnfilledDetails = async () => {
    api.get("/api/Student/Unfilled").then((res) => {
      console.log(res.data);
      setStudents(res.data);
    });
  };

  return (
    <>
      {status || stopped ? (
        <>
          <ButtonCards />
          {students && <SummaryCard studentData={students} />}
          <Center mt='10px' mb='10px'>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme='green'
              marginRight='10px'
              onClick={getFilledDetails}>
              Filled Details
            </Button>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme='red'
              onClick={getUnfilledDetails}>
              Unfilled Details
            </Button>
          </Center>
        </>
      ) : (
        <Center>
          <Text fontSize='4xl'>
            Please start the allotment to view this page
          </Text>
        </Center>
      )}
    </>
  );
}

export default AdminElectivePage;
