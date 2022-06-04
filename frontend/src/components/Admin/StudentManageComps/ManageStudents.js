import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import axios from "axios";

function ManageStudents() {
  const [students, setStudents] = useState(null);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  useEffect(() => {
    api.get("/api/Student").then((res) => {
      setStudents(res.data);
      // console.log(res.data);
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
