import { CheckIcon } from "@chakra-ui/icons";
import { Button, Center, div, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import OECard from "./OECard";
import OEModal from "./OEModal";
import SubjectModal from "./SubjectModal";
import axios from "axios";
import OEContext from "../../../contexts/OEContext";
import AuthContext from "../../../contexts/AuthProvider";
import StartAllotModel from "./StartAllotModel";

function AdminMainPage() {
  const { setAllOES } = useContext(OEContext);
  const { allOES } = useContext(OEContext);

  const { auth } = useContext(AuthContext);

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  //this will intially get the data and update the global OES if there are any existing ones
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006",
    });

    api.get("/api/OpenElectives", config).then((res) => {
      // console.log(res.data);
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

            <StartAllotModel />
          </Flex>
        </VStack>
        {/* <div>{auth.accessToken}</div> */}
      </Center>
    </>
  );
}

export default AdminMainPage;
