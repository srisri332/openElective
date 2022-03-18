import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link as Clink,
  Text,
  Image,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import gear from "../images/gear.png";

function NavBar() {
  return (
    <div>
      <Box bg='#4299E1' w='100%' p={5} color='white'>
        <Flex>
          <Link to='/adminmainpage'>
            <Image src={gear} alt='logo' width='30px' marginRight='17px' />
          </Link>
          <div>
            <Link to='/adminmainpage'>
              <Text fontSize='lg' fontWeight='500'>
                Administrator
              </Text>
            </Link>
          </div>
          <Spacer />

          <div>
            <Link to='/adminmainpage' style={{ marginRight: "10px" }}>
              Main Page
            </Link>
            <Link to='/adminelecpage'>Elective Page</Link>
          </div>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
