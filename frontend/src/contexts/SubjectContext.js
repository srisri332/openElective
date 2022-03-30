import { createContext, useState } from "react";

const SubjectContext = createContext();

export function SubjectProvider({ children }) {
  const [allSubs, setSubs] = useState(null);

  const setAllSubs = (Subs) => {
    setSubs(Subs);
  };

  return (
    <SubjectContext.Provider value={{ allSubs, setAllSubs }}>
      {children}
    </SubjectContext.Provider>
  );
}

export default SubjectContext;
