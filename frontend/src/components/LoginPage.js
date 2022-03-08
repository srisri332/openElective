import {
  Box,
  Flex,
  Text,
  Spacer,
  VStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Image,
} from "@chakra-ui/react";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import logo from "./logos.png";

import React from "react";

function LoginPage() {
  return (
    <div>
      <Flex>
        <Box p='4'>
          <Image src={logo} alt='logo' width='70px' margin='15px' />
        </Box>
      </Flex>
      <Flex>
        <Spacer />
        <Box
          maxW='sm'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          width='50vw'
          height='60vh'
          padding='30px'
          color='white'
          bg='blue.400'>
          <Center>
            <Text fontSize='3xl' fontWeight='bold'>
              ADMIN
            </Text>
          </Center>
          <VStack spacing={10} align='stretch' marginTop='3em'>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='gray.600' boxSize={5} />}
                margin='5px'
              />
              <Input
                type='tel'
                placeholder='Email'
                size='lg'
                variant='Filled'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.600' boxSize={5} />}
                margin='5px'
              />
              <Input
                type='tel'
                placeholder='Password'
                size='lg'
                variant='Filled'
              />
            </InputGroup>
            <Button variant='solid' background='#FF5151'>
              LOGIN
            </Button>
          </VStack>
        </Box>
        <Spacer />

        <Box
          maxW='sm'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          width='50vw'
          height='60vh'
          padding='30px'
          color='white'
          bg='gray.700'>
          <Center>
            <Text fontSize='3xl' fontWeight='bold'>
              STUDENT
            </Text>
          </Center>
          <VStack spacing={10} align='stretch' marginTop='3em'>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='gray.600' boxSize={5} />}
                margin='5px'
              />
              <Input
                type='tel'
                placeholder='Email'
                size='lg'
                variant='Filled'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.600' boxSize={5} />}
                margin='5px'
              />
              <Input
                type='tel'
                placeholder='Password'
                size='lg'
                variant='Filled'
              />
            </InputGroup>
            <Button variant='solid' background='#FF5151'>
              LOGIN
            </Button>
          </VStack>
        </Box>

        <Spacer />
      </Flex>
    </div>
  );
}

export default LoginPage;
