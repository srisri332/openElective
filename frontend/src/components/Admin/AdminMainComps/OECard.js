import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import SubjectModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";
import axios from "axios";

function OECard(props) {
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000",
    });

    api.get("/SUBS/" + props.elective.id).then((res) => {
      // console.log(res.data);
      setSubjects(res.data.datas);
    });
  }, []);

  return (
    <Box
      borderWidth='2px'
      borderRadius='lg'
      overflow='hidden'
      padding='30px'
      bg='white'>
      <Text fontSize='lg' fontWeight='500'>
        {props.elective.name}
      </Text>
      <SubjectCard subjects={subjects} />
      <SubjectModal />
    </Box>
  );
}

export default OECard;
