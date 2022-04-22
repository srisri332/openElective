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

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006/",
    });

    api.get("http://localhost:8000/STDS").then((res) => {
      setStudents(res.data);
    });

    api.get("/api/Details").then((res) => {
      console.log(res);
      setStatus(res.data.isStarted);
      setStopped(res.data.isCompleted);
    });
  }, []);

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
              marginRight='10px'>
              Filled Details
            </Button>
            <Button leftIcon={<DownloadIcon />} colorScheme='red'>
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
