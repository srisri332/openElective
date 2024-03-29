import React, { useEffect, useState } from "react";
import axios from "axios";
import { Center, Text, Flex } from "@chakra-ui/react";

function LastDate() {
  const [lastDate, setLastDate] = useState(null);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  useEffect(() => {
    api.get("/api/Details").then((res) => {
      //       console.log(res);
      let date = res.data.date;
      setLastDate(
        date.substring(0, 2) +
          "/" +
          date.substring(2, 4) +
          "/" +
          date.substring(4, 8)
      );
    });
  }, []);

  return (
    <Center>
      <Flex>
        <Text fontSize='2xl' as='b' mr='10px' color='tomato '>
          Department Of CSE |{" "}
        </Text>
        <Text fontSize='2xl' as='b' mr='10px'>
          Last Date To Select{" "}
        </Text>
        <Text color='purple.400' fontSize='2xl' as='b'>
          {lastDate}
        </Text>
      </Flex>
    </Center>
  );
}

export default LastDate;
