import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

function StudentDonePage() {
  return (
    <div>
      <Center>
        <Box
          bg='green.300'
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
            You already submitted your details. Check for results after the
            allotment is completed.
          </Text>
        </Box>
      </Center>
    </div>
  );
}

export default StudentDonePage;
