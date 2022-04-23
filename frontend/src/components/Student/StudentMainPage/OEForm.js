import React, { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import axios from "axios";

function OEForm(props) {
  const [subjects, setSubjects] = useState(null);
  const [choices, setChoices] = useState([]);
  const [sumitted, setSumitted] = useState(false);
  useEffect(() => {
    choices.forEach((choice1, index1) => {
      choices.forEach((choice2, index2) => {
        if (index1 !== index2 && choice1.subId === choice2.subId) {
          alert(
            "You have already selected this subject.Please select another one."
          );
          setChoices([]);
          //
        }
      });
    });
  }, [choices]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://localhost:7006",
    });

    api.get("/api/Subjects/" + props.singleOE.id).then((res) => {
      console.log(res.data);
      setSubjects(res.data);
    });
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };
  return (
    <>
      <FormControl>
        <FormLabel htmlFor={props.singleOE.Id}>{props.singleOE.name}</FormLabel>
        {subjects &&
          subjects.map((sub, index) => {
            return (
              <Select
                id={props.singleOE.Id}
                placeholder={`Select Priority ${index + 1}`}
                key={sub.id}
                disabled={sumitted}
                value={choices[index] ? choices[index].subId : ""}
                onChange={(e) => {
                  setChoices((prev) => {
                    return [
                      ...prev,
                      {
                        rollNumber: localStorage.getItem("studentRoll"),
                        subId: e.target.value,
                        priority: index + 1,
                      },
                    ];
                  });
                }}>
                {subjects &&
                  subjects.map((subject) => {
                    return (
                      <option
                        id={subject.id}
                        name={subject.id}
                        value={subject.id}>
                        {subject.name}
                      </option>
                    );
                  })}
              </Select>
            );
          })}
        <Button
          variantColor='teal'
          variant='outline'
          type='submit'
          disabled={sumitted}
          onClick={() => {
            // loop through choices and find if any of them have same subId as the current subId
            // if form is valid then log the choices
            // if form is invalid then alert the user
            var isValid = true;

            if (choices.length === 0) {
              alert("Please select atleast one subject or Select again");
              isValid = false;
            } else if (choices.length != subjects.length) {
              alert("Please select all subjects");
              isValid = false;
            }
            if (!isValid) {
              // empty choices and reset choices
              setChoices([]);
            }
            if (isValid === true && choices.length > 0) {
              // loop through choice and send them to the server
              choices.forEach((choice) => {
                console.log(choice);
                axios
                  .post(
                    "https://localhost:7006/api/StudentChoice",
                    choice,
                    config
                  )
                  .then((res) => {
                    if (res.status === 201) {
                      setSumitted(true);
                      alert("Successfully added");
                    }
                    if (res.status === 401) {
                      alert(
                        "You are not authorized to add choices.Log in and try again"
                      );
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          }}>
          Submit
        </Button>
      </FormControl>
    </>
  );
}

export default OEForm;
