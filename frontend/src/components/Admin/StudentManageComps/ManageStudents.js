import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import axios from "axios";

function ManageStudents() {
  const [students, setStudents] = useState(null);

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  const removeAdmin = (student) => {
    return student.rollNumber != "admin";
  };

  useEffect(() => {
    api
      .get("/api/Student", config)
      .then((res) => {
        let data = res.data.filter(removeAdmin);
        return data;
      })
      .then((res) => {
        setStudents(res);
        // console.log(res);
      });
  }, []);

  return (
    <>
      <Tabs colorScheme='green'>
        <TabList>
          <Tab>Student Add</Tab>
          <Tab>Student List</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AddStudent />
          </TabPanel>
          <TabPanel>
            {students && <StudentList studentData={students} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ManageStudents;
