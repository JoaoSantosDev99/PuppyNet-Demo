import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const contractAddress = "0x20Beff814049C11bdA7C3d4343EA9ff9b8e2427F";
  const contractABI = "";

  return (
    <AppContext.Provider
      value={{
        contractAddress,
        contractABI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
