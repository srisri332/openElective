import { createContext, useState } from "react";

const OEContext = createContext();

export function OEProvider({ children }) {
  const [allOES, setOES] = useState(null);

  const setAllOES = (OE) => {
    setOES(OE);
  };

  return (
    <OEContext.Provider value={{ allOES, setAllOES }}>
      {children}
    </OEContext.Provider>
  );
}

export default OEContext;
