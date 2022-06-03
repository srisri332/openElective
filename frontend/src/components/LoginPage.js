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
  FormControl,
  useToast,
} from "@chakra-ui/react";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import logo from "./images/logos.png";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LastDate from "./LastDate";
import Footer from "./Footer";
// require("dotenv").config();

function LoginPage() {
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: `Login Error`,
      description: `Entered Username Or Password Is Incorrect`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const toggleWarnToast = () => {
    return toast({
      title: `Server Error`,
      description: `No Server Response`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const { setAuth } = useAuth();

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  let navigate = useNavigate();

  const [adminMail, setAdminMail] = useState(null);
  const [adminPw, setAdminPw] = useState(null);

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      let user = "Admin";

      const res = await api.post(
        "/api/Student/auth",
        JSON.stringify({ rollNumber: adminMail, password: adminPw }),
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = res.data;
      const resStatus = res.status;

      if (resStatus === 200) {
        setAuth({ accessToken, resStatus, user });
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", user);
      }

      // console.log(res);
      if (resStatus == 200) {
        navigate("/admin/adminmainpage");
        console.log("admin logged in");
      }
    } catch (err) {
      if (!err?.response) {
        toggleWarnToast();
        console.log("no server response");
      }
      if (err.response.status == 401) {
        toggleToast();
      }
    }
  };

  //these are all the studednt storage hooks and functions
  const [studentMail, setStudentMail] = useState(null);
  const [studentPw, setStudentPw] = useState(null);

  const studentLogin = async (e) => {
    e.preventDefault();
    // console.log(studentMail + " " + studentPw);
    try {
      let user = "Student";

      const res = await api.post(
        "/api/Student/auth",
        JSON.stringify({ rollNumber: studentMail, password: studentPw }),
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      const accessToken = res.data;
      const resStatus = res.status;

      if (resStatus === 200) {
        const studentData = await api.get("/api/Student/" + studentMail);
        console.log(studentData);

        localStorage.setItem("studentName", studentData.data.name);
        localStorage.setItem("studentID", studentData.data.id);
        localStorage.setItem("studentRoll", studentData.data.rollNumber);
        localStorage.setItem("user", user);

        //setting the data for future use in other components
        setAuth({ accessToken, resStatus, user });
        localStorage.setItem("token", accessToken);
      }

      //navigating to student home page
      if (res.status === 200) {
        navigate("/studentmainpage");
        console.log("student logged in");
      }
    } catch (err) {
      if (!err?.response) {
        toggleWarnToast();
        console.log("no server response");
      }
      if (err.response.status == 401) {
        toggleToast();
      }
    }
  };

  return (
    <div>
      <Flex>
        <Box p='4'>
          <Image src={logo} alt='logo' width='70px' margin='15px' />
        </Box>
        <Spacer />
        <LastDate />
        <Spacer />
      </Flex>
      <Flex direction={{ base: "column-reverse", md: "row" }}>
        <Spacer />

        <Box
          // maxW='sm'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          // width='50vw'
          // height='60vh'
          m={3}
          padding='30px'
          color='black'
          bg='blue.400'>
          <FormControl isRequired>
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
                    type='text'
                    placeholder='Username'
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
          </FormControl>
        </Box>

        <Spacer />

        <Box
          // maxW='sm'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          // width='50vw'
          // height='60vh'
          m={3}
          padding='30px'
          color='black'
          bg='gray.700'>
          <FormControl isRequired>
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
                    type='text'
                    placeholder='Roll Number'
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
          </FormControl>
        </Box>

        <Spacer />
      </Flex>
      <Footer />
    </div>
  );
}

export default LoginPage;
