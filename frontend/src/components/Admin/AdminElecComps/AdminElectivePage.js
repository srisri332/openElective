import React, { useState, useEffect } from "react";
import ButtonCards from "./ButtonCards";
import SummaryCard from "./SummaryCard";
import { Button, Center } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";

function AdminElectivePage() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000/",
    });

    api.get("/STDS").then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      AdminElectivePage
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
    </div>
  );
}

export default AdminElectivePage;
