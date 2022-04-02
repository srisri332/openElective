import React, { useState, useEffect } from "react";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import SubjectModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";
import axios from "axios";
import DelOEModal from "./DelOEModal";

function OECard(props) {
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006",
    });

    api.get("/api/Subjects/" + props.elective.id).then((res) => {
      // console.log(res.data);
      setSubjects(res.data);
    });
  }, []);

  return (
    <Box
      borderWidth='2px'
      borderRadius='lg'
      overflow='hidden'
      padding='30px'
      bg='white'>
      <Flex>
        <Text fontSize='lg' fontWeight='500'>
          {props.elective.name}
        </Text>
        <Spacer />
        <DelOEModal electiveID={props.elective.id} />
      </Flex>

      <SubjectCard subjects={subjects} electiveID={props.elective.id} />
      <SubjectModal electiveID={props.elective.id} />
    </Box>
  );
}

export default OECard;
