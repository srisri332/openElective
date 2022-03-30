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

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000/",
    });

    api.get("/OES").then((res) => {
      console.log(res.data);
      setOES(res.data);
    });
  }, []);

  return (
    <>
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
    </>
  );
}

export default StudentMainPage;
