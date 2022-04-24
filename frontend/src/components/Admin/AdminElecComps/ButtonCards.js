import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import stop from "../../images/stop.png";
import stats from "../../images/stats.png";
import DateModal from "./DateModal";
import axios from "axios";
import ResetAllotModal from "./ResetAllotModal";
import { FaRegStopCircle, FaRegListAlt, FaClipboardList } from "react-icons/fa";

function ButtonCards() {
  const [status, setStatus] = useState(null);
  const [stopped, setStopped] = useState(null);

  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  useEffect(() => {
    api.get("/api/Details").then((res) => {
      console.log(res);
      setStatus(res.data.isStarted);
      setStopped(res.data.isCompleted);
    });
  }, []);

  const stopAllotment = async () => {
    let temp = window.confirm(" Are you sure you want to stop allotment?");

    if (temp == true) {
      let res = await api.post("/api/Details/end");
      window.location.reload(false);
      console.log(res);
    }
  };

  return (
    <>
      <Center marginTop='10px'>
        <Box
          borderWidth='2px'
          borderRadius='lg'
          overflow='hidden'
          padding='30px'
          width='60vw'
          maxW='60vw'
          boxShadow='sm'
          bg='white'>
          <Flex>
            <Box bg='#553C9A' w='25%' p={4} color='white' borderRadius='5px'>
              <Center> 75 / 300 </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                {" "}
                <Tooltip label='Stop Elective' fontSize='md'>
                  {/* <Button
                    disabled={status && stopped}
                    color='white'
                    bgColor='red.500'
                    marginRight='10px'
                    // borderRadius='50px'
                    > */}
                  <IconButton
                    disabled={status && stopped}
                    colorScheme='orange'
                    fontSize='20px'
                    onClick={stopAllotment}
                    icon={<FaRegStopCircle />}
                  />
                  {/* </Button> */}
                </Tooltip>
              </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <Tooltip label='Get Results' fontSize='md'>
                  {/* <Button
                    disabled={!(status && stopped)}
                    color='white'
                    bgColor='cyan.400'
                    marginRight='10px'
                    // borderRadius='50px'
                    // onClick={onOpen}
                  > */}
                  <IconButton
                    disabled={!(status && stopped)}
                    colorScheme='cyan'
                    fontSize='20px'
                    icon={<FaClipboardList />}
                  />
                  {/* Get Results
                  </Button> */}
                </Tooltip>
              </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <DateModal />
              </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <ResetAllotModal />
              </Center>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default ButtonCards;
