import { CheckIcon } from "@chakra-ui/icons";
import { Button, Center, div, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import OECard from "./OECard";
import OEModal from "./OEModal";
import SubjectModal from "./SubjectModal";
import axios from "axios";
import OEContext from "../../../contexts/OEContext";

function AdminMainPage() {
  const { setAllOES } = useContext(OEContext);
  const { allOES } = useContext(OEContext);

  //this will intially get the data and update the global OES if there are any existing ones
  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000/",
    });

    api.get("/OES").then((res) => {
      console.log(res.data);
      setAllOES(res.data);
    });
  }, []);

  return (
    <>
      <Center>
        <VStack marginBottom='15px' marginTop='15px'>
          {allOES &&
            allOES.map((singleOE) => {
              return <OECard elective={singleOE} key={singleOE.id} />;
            })}

          <Flex>
            <OEModal />
            <Button leftIcon={<CheckIcon />} colorScheme='green'>
              Start Allotment
            </Button>
          </Flex>
        </VStack>
      </Center>
    </>
  );
}

export default AdminMainPage;
