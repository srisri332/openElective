import React from "react";
import { Box, Flex, Spacer, Text, Image, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import gear from "../images/gear.png";
import { UnlockIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

function NavBar() {
  let navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const logout = async () => {
    const res = await clearLocalStorage();
    navigate("/login");
  };

  return (
    <div>
      <Box bg='#4299E1' w='100%' p={5} color='white'>
        <Flex>
          <Link to='/admin/adminmainpage'>
            <Image src={gear} alt='logo' width='30px' marginRight='17px' />
          </Link>
          <div>
            <Link to='/admin/adminmainpage'>
              <Text fontSize='lg' fontWeight='500'>
                Administrator
              </Text>
            </Link>
          </div>
          <Spacer />

          <div>
            <Link to='/admin/adminmainpage' style={{ marginRight: "10px" }}>
              Main Page
            </Link>
            <Link to='/admin/adminelecpage' style={{ marginRight: "20px" }}>
              Elective Page
            </Link>
            <IconButton
              variant='outline'
              colorScheme='white'
              fontSize='20px'
              onClick={logout}
              isRound={true}
              icon={<FaPowerOff />}
            />
          </div>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
