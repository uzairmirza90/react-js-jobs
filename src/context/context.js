import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [refetchName, setRefetchName] = useState(false);
  return (
    <AppContext.Provider value={{ refetchName, setRefetchName }}>
      {children}
    </AppContext.Provider>
  );
};
