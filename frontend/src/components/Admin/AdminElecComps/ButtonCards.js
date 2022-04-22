import React, { useState, useEffect } from "react";
import { Box, Button, Center, Flex, Image, Tooltip } from "@chakra-ui/react";
import stop from "../../images/stop.png";
import stats from "../../images/stats.png";
import DateModal from "./DateModal";
import axios from "axios";

function ButtonCards() {
  const [status, setStatus] = useState(null);
  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  useEffect(() => {
    api.get("/api/Details").then((res) => {
      console.log(res);
      setStatus(res.data.isStarted);
    });
  }, []);

  const stopAllotment = async () => {
    let res = await api.post("/api/Details/end");
    console.log(res);
  };

  return (
    <>
      <Center>
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
                  {/* <Image
                      src={stop}
                      alt='logo'
                      width='50px'
                      cursor='pointer'
                    /> */}

                  <Button
                    disabled={!status}
                    color='white'
                    bgColor='red.500'
                    marginRight='10px'
                    borderRadius='50px'
                    onClick={stopAllotment}>
                    Stop
                  </Button>
                </Tooltip>
              </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <Tooltip label='Get Results' fontSize='md'>
                  <Button
                    disabled={!status}
                    color='white'
                    bgColor='cyan.400'
                    marginRight='10px'
                    borderRadius='50px'
                    // onClick={onOpen}
                  >
                    Get Results
                  </Button>
                  {/* <Image src={stats} alt='logo' width='50px' cursor='pointer' /> */}
                </Tooltip>
              </Center>{" "}
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <DateModal />
              </Center>{" "}
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default ButtonCards;
