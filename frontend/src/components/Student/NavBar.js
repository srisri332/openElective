import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link as Clink,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { UnlockIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

function NavBar() {
  let navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("studentRoll");
    localStorage.removeItem("studentName");
  };

  const logout = async () => {
    const res = await clearLocalStorage();
    navigate("/login");
  };

  const users = {
    name: "K. Vijith",
    roll: localStorage.getItem("studentRoll"),
  };

  return (
    <div>
      <Box bg='#2D3748' w='100%' p={5} color='white'>
        <Flex>
          <Link to='/adminmainpage'>
            <Image src={user} alt='logo' width='30px' marginRight='17px' />
          </Link>
          <div>
            <Link to='/studentmainpage'>
              <Text fontSize='lg' fontWeight='500'>
                {localStorage.getItem("studentName")} |{" "}
                {localStorage.getItem("studentRoll")}
              </Text>
            </Link>
          </div>
          <Spacer />
          <IconButton
            variant='outline'
            colorScheme='white'
            fontSize='20px'
            onClick={logout}
            icon={<FaPowerOff />}
          />
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
