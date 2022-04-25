import React, { useEffect, useState } from "react";
import axios from "axios";
import { Center, Text } from "@chakra-ui/react";

function LastDate() {
  const [lastDate, setLastDate] = useState(null);

  const api = axios.create({
    baseURL: "https://localhost:7006",
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
      <Text fontSize='2xl' as='b'>
        Last Date To Select
        <Text color='tomato'>{lastDate}</Text>
      </Text>
    </Center>
  );
}

export default LastDate;
