import React, { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import axios from "axios";

function OEForm(props) {
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_ENDPOINT}`,
    });

    api.get("/api/Subjects/" + props.singleOE.id).then((res) => {
      console.log(res.data);
      setSubjects(res.data);
    });
  }, []);

  return (
    <>
      <FormControl>
        <FormLabel htmlFor='country'>{props.singleOE.name}</FormLabel>
        {subjects &&
          subjects.map(() => {
            return (
              <Select id='country' placeholder='Select country'>
                {subjects &&
                  subjects.map((subject) => {
                    return <option>{subject.name}</option>;
                  })}
              </Select>
            );
          })}
        <Button>Submit</Button>
      </FormControl>
    </>
  );
}

export default OEForm;
