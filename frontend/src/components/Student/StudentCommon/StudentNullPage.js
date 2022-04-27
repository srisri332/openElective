import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

function StudentNullPage() {
  return (
    <div>
      <Center>
        <Box
          bg='yellow.300'
          w='50vw'
          p={4}
          border='4px'
          color='white'
          borderColor='black'
          borderWidth='1px'
          borderRadius='lg'
          h='50vh'
          mt='10%'>
          <Text fontSize='2xl' fontWeight='bold' color='black'>
            Allotment did not start. Check back once it starts.
          </Text>
        </Box>
      </Center>
    </div>
  );
}

export default StudentNullPage;
