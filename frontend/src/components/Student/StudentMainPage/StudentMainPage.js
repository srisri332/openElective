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
import StudentNullPage from "../StudentCommon/StudentNullPage";
import axios from "axios";
import OEForm from "./OEForm";
import LastDate from "../../LastDate";
import StudentResultPage from "../StudentCommon/StudentResultPage";
import StudentDonePage from "../StudentCommon/StudentDonePage";

function StudentMainPage() {
  const [OES, setOES] = useState(null);
  const [status, setStatus] = useState(null);
  const [stopped, setStopped] = useState(null);
  const [elected, setElected] = useState(false);

  //authorization configs to authenticate as admin
  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_ENDPOINT}`,
    });

    //this is how to get the studnet roll number and ID from local storage
    // console.log(
    //   localStorage.getItem("studentRoll") +
    //     "  " +
    //     localStorage.getItem("studentID") + " "  +
    //     localStorage.getItem("studentToken")
    // );

    api.get("/api/Details", config).then((res) => {
      console.log(res);
      setStatus(res.data.isStarted);

      setStopped(res.data.isCompleted);

      if (res.data.isStarted === true) {
        api.get("/api/OpenElectives", config).then((res) => {
          // console.log(res.data);
          setOES(res.data);
        });
      }
    });

    api
      .get("/api/Student/" + localStorage.getItem("studentRoll"))
      .then((res) => {
        setElected(res.data.elected);
        console.log(res.data.elected);
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
      {elected && stopped == false ? (
        <StudentDonePage />
      ) : (
        <>
          {status ? (
            <>
              {stopped ? (
                <StudentResultPage />
              ) : (
                <Center>
                  <VStack width='70%'>
                    <LastDate />
                    <Box w='100%' p={4} color='black'>
                      {OES &&
                        OES.map((OE) => {
                          return <OEForm singleOE={OE} key={OE.id} />;
                        })}
                    </Box>
                  </VStack>
                </Center>
              )}
            </>
          ) : (
            <StudentNullPage />
          )}
        </>
      )}
    </>
  );
}

export default StudentMainPage;
