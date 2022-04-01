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
import logo from "./images/logos.png";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  let navigate = useNavigate();

  const [adminMail, setAdminMail] = useState(null);
  const [adminPw, setAdminPw] = useState(null);

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/LOGIN",
        JSON.stringify({ email: adminMail, password: adminPw }),
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        navigate.push("/adminmainpage");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("no server response");
      }
    }
  };

  const [studentMail, setStudentMail] = useState(null);
  const [studentPw, setStudentPw] = useState(null);

  const studentLogin = async (e) => {
    e.preventDefault();
    console.log(studentMail + " " + studentPw);
    try {
      const res = await api.post(
        "/LOGIN",
        JSON.stringify({ email: studentMail, password: studentPw }),
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        navigate("/studentmainpage");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("no server response");
      }
    }
  };

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
          color='black'
          bg='blue.400'>
          <form onSubmit={adminLogin}>
            <Center>
              <Text fontSize='3xl' fontWeight='bold' color='white'>
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
                  type='email'
                  placeholder='Email'
                  size='lg'
                  variant='Filled'
                  required={true}
                  onChange={(e) => setAdminMail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.600' boxSize={5} />}
                  margin='5px'
                />
                <Input
                  type='password'
                  placeholder='Password'
                  size='lg'
                  variant='Filled'
                  onChange={(e) => setAdminPw(e.target.value)}
                />
              </InputGroup>
              <Button
                variant='solid'
                background='#FF5151'
                color='white'
                type='submit'>
                LOGIN
              </Button>
            </VStack>
          </form>
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
          color='black'
          bg='gray.700'>
          <form onSubmit={studentLogin}>
            <Center>
              <Text fontSize='3xl' fontWeight='bold' color='white'>
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
                  type='email'
                  placeholder='Email'
                  size='lg'
                  variant='Filled'
                  onChange={(e) => setStudentMail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.600' boxSize={5} />}
                  margin='5px'
                />
                <Input
                  type='password'
                  placeholder='Password'
                  size='lg'
                  variant='Filled'
                  onChange={(e) => setStudentPw(e.target.value)}
                />
              </InputGroup>
              <Button
                variant='solid'
                background='#FF5151'
                color='white'
                type='submit'>
                LOGIN
              </Button>
            </VStack>
          </form>
        </Box>

        <Spacer />
      </Flex>
    </div>
  );
}

export default LoginPage;
