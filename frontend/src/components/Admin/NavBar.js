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
            <Clink marginRight='10px'>
              <Link to='/adminmainpage'>Main Page</Link>
            </Clink>
            <Clink marginRight='10px'>
              <Link to='/adminelecpage'>Elective Page</Link>
            </Clink>
          </div>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
