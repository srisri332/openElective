import {
  Center,
  VStack,
  Box,
  Container,
  Select,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import StudentNullPage from "../StudentNullComp/StudentNullPage";
import axios from "axios";
import OEForm from "./OEForm";

function StudentMainPage() {
  const [OES, setOES] = useState(null);
  const [status, setStatus] = useState(null);

  //authorization configs to authenticate as admin
  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("studentToken"),
    },
  };

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006",
    });

    //this is how to get the studnet roll number and ID from local storage
    // console.log(
    //   localStorage.getItem("studentRoll") +
    //     "  " +
    //     localStorage.getItem("studentID") + " "  +
    //     localStorage.getItem("studentToken")
    // );

    api.get("/api/Details", config).then((res) => {
      // console.log(res);
      setStatus(res.data.isStarted);

      if (res.data.isStarted === true) {
        api.get("/api/OpenElectives", config).then((res) => {
          // console.log(res.data);
          setOES(res.data);
        });
      }
    });

    // if (status === true) {
    //   api.get("/api/OpenElectives").then((res) => {
    //     console.log(res.data);
    //     setOES(res.data);
    //   });
    // }
  }, []);

  return (
    <>
      {status ? (
        <Center>
          <VStack width='70%'>
            <Box w='100%' p={4} color='black'>
              {OES &&
                OES.map((OE) => {
                  return <OEForm singleOE={OE} />;
                })}
            </Box>
          </VStack>
        </Center>
      ) : (
        <StudentNullPage />
      )}
    </>
  );
}

export default StudentMainPage;
