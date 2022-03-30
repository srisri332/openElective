import { createContext, useState } from "react";

const OEContext = createContext();

export function OEProvider({ children }) {
  const [allOES, setOES] = useState(null);
  const [electiveStatus, setElectiveStatus] = useState(false);

  const setAllOES = (OE) => {
    setOES(OE);
  };

  const setAllElectiveStatus = () => {
    setElectiveStatus(true);
  };

  return (
    <OEContext.Provider
      value={{ allOES, electiveStatus, setAllOES, setAllElectiveStatus }}>
      {children}
    </OEContext.Provider>
  );
}

export default OEContext;
