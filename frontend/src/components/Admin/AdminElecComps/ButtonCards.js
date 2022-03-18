import React from "react";
import { Box, Center, Flex, Image, Tooltip } from "@chakra-ui/react";
import calendar from "../../images/calendar.png";
import stop from "../../images/stop.png";
import stats from "../../images/stats.png";

function ButtonCards() {
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
                  <Image src={stop} alt='logo' width='50px' cursor='pointer' />
                </Tooltip>
              </Center>
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <Tooltip label='Get Results' fontSize='md'>
                  <Image src={stats} alt='logo' width='50px' cursor='pointer' />
                </Tooltip>
              </Center>{" "}
            </Box>

            <Box w='25%' borderRadius='5px'>
              <Center>
                <Tooltip label='Set Last Date' fontSize='md'>
                  <Image
                    src={calendar}
                    alt='logo'
                    width='50px'
                    cursor='pointer'
                  />
                </Tooltip>
              </Center>{" "}
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default ButtonCards;
