import { CheckIcon } from "@chakra-ui/icons";
import { Button, Center, div, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OECard from "./OECard";
import OEModal from "./OEModal";
import SubjectModal from "./SubjectModal";
import axios from "axios";

function AdminMainPage() {
  const [oes, setOes] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000/",
    });

    api.get("/OES").then((res) => {
      console.log(res.data);
      setOes(res.data);
    });
  }, []);

  // const OneSub = (props) => {
  //   console.log(props.s);
  //   return <></>;
  // };

  // const OneOe = (props) => {
  //   const data = props.subs;
  //   //     console.log(data);

  //   let arr = [];

  //   Object.entries(data).map(([key, value]) => {
  //     data[key].map((d) => {
  //       arr = [...arr, d];
  //     });
  //   });

  //   console.log(arr);
  //   return (
  //     <>
  //       {arr.map((d) => {
  //         return <h1>{d.Name}</h1>;
  //       })}
  //     </>
  //   );
  // };

  // const DeArray = (props) => {
  //   const oess = props.data;
  //   return (
  //     <>
  //       <h1>Superman</h1>
  //       {oess.map((d) => {
  //         return (
  //           <>
  //             <OneOe subs={d} />
  //           </>
  //         );
  //       })}
  //     </>
  //   );
  // };

  return (
    <div>
      <Center>
        <VStack marginBottom='15px' marginTop='15px'>
          {oes &&
            oes.map((singleOE) => {
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
    </div>
  );
}

export default AdminMainPage;
