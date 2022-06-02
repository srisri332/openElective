import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Image,
  IconButton,
  Center,
} from "@chakra-ui/react";

function Footer() {
  return (
    <>
      <Box p={3} color='black'>
        <Center>
          <Text fontSize='1xl' fontWeight='500'>
            Made By K. Vijith & K. SriSri Reddy Under Mr. T. Bharath Kumar
          </Text>
        </Center>
      </Box>
    </>
  );
}

export default Footer;
