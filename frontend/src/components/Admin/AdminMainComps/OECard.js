import React from "react";
import { Box, Text } from "@chakra-ui/react";
import SubjectModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";

function OECard() {
  return (
    <Box
      borderWidth='2px'
      borderRadius='lg'
      overflow='hidden'
      padding='30px'
      bg='white'>
      <Text fontSize='lg' fontWeight='500'>
        OE 1
      </Text>
      <SubjectCard />
      <SubjectModal />
    </Box>
  );
}

export default OECard;
