import { createContext, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [currentStudent, setStudent] = useState(null);

  const setCurrentStudent = (student) => {
    setStudent(student);
  };

  return (
    <StudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export default StudentContext;
