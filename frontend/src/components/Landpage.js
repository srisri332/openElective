import React from "react";
import {
  Center,
  Text,
  VStack,
  Box,
  Flex,
  Image,
  Spacer,
  Button,
} from "@chakra-ui/react";
import LastDate from "./LastDate";
import learn from "./images/learn.png";
import logo from "./images/logos.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Landpage() {
  return (
    <>
      {/* <Center>
        <LastDate />
      </Center> */}
      <Flex>
        <Box p='4'>
          <Image src={logo} alt='logo' width='60px' margin='5px' />
        </Box>
        <Spacer />
        <LastDate />
        <Spacer />
      </Flex>
      <Flex>
        <Spacer />
        <Box w='40%' padding='4rem'>
          <Text fontSize='5xl' margin='15px'>
            Online Open Elective
          </Text>
          <Text fontSize='lg' margin='15px' color='blackAlpha.800'>
            Choose your subjects from different branches
          </Text>
          <Button margin='15px' bg='tomato' color='white'>
            <Link
              to='/login'
              style={{ marginRight: "20px" }}
              width='100%'
              height='100%'>
              LOGIN
            </Link>
          </Button>
        </Box>
        <Spacer />
        <Box w='30%'>
          <Image src={learn} alt='logo' margin='5px' />
        </Box>
        <Spacer />
      </Flex>
      <Footer />
    </>
  );
}

export default Landpage;
