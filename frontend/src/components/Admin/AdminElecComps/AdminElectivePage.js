import React, { useState, useEffect } from "react";
import ButtonCards from "./ButtonCards";
import SummaryCard from "./SummaryCard";
import { Button, Center, Text, Radio, RadioGroup } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AdminElectivePage() {
  const [students, setStudents] = useState(null);
  const [status, setStatus] = useState(null);
  const [stopped, setStopped] = useState(null);
  const [someID, setSomeID] = useState(uuidv4());
  const [value, setValue] = React.useState("3");

  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  //this are used for displaying total number of students filled
  const [filled, setFilled] = useState(null);
  const [total, setTotal] = useState(null);
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  useEffect(() => {
    api.get("/api/Student", config).then((res) => {
      setStudents(res.data);
      setTotal(res.data.length);
      // console.log(res.data);
    });

    api.get("/api/Details", config).then((res) => {
      // console.log(res);
      setStatus(res.data.isStarted);
      setStopped(res.data.isCompleted);
    });

    //this is just to set the state for total number of students
    api.get("/api/Student/Filled", config).then((res) => {
      setFilled(res.data.length);
      // console.log(res.data);
    });
  }, []);

  //get students that filled the OE form
  const getFilledDetails = async () => {
    const res = await api.get("/api/Student/Filled", config);
    await setStudents(res.data);
    await setSomeID(uuidv4());
    // console.log(students);
  };

  //get students that did not fill the OE form
  const getUnfilledDetails = async () => {
    const res = await api.get("/api/Student/Unfilled", config);
    await setStudents(res.data);
    await setSomeID(uuidv4());
    // console.log(students);
  };

  const getAllDetails = async () => {
    const res = await api.get("/api/Student", config);
    await setStudents(res.data);
    await setSomeID(uuidv4());
    // console.log(students);
  };

  return (
    <>
      {status || stopped ? (
        <>
          <ButtonCards filled={filled + " / " + total} />
          {students && <SummaryCard studentData={students} key={someID} />}
          <Center mt='10px' mb='10px'>
            <RadioGroup onChange={setValue} value={value}>
              <Button
                colorScheme='green'
                marginRight='10px'
                onClick={getFilledDetails}>
                <Radio size='md' colorScheme='white' value='1'>
                  Filled Details
                </Radio>
              </Button>
              <Button
                colorScheme='red'
                marginRight='10px'
                onClick={getUnfilledDetails}>
                <Radio size='md' colorScheme='white' value='2'>
                  Unfilled Details
                </Radio>
              </Button>
              <Button colorScheme='pink' onClick={getAllDetails}>
                <Radio size='md' colorScheme='white' value='3'>
                  All Details
                </Radio>
              </Button>
            </RadioGroup>
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
