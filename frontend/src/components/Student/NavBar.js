import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link as Clink,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

function NavBar() {
  const users = {
    name: "K. Vijith",
    roll: "18211A05A4",
    section: "CSE-B",
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
                {users.name} | {users.roll} | {users.section}
              </Text>
            </Link>
          </div>
          <Spacer />
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
