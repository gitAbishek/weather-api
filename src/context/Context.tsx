import React, { createContext, useState, ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextValue {
  isAdded: boolean;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextCreator = createContext<ContextValue>({
  isAdded: false,
  setIsAdded: ()=> {}
});

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  return (
    <ContextCreator.Provider value={{isAdded, setIsAdded}}>
      {children}
    </ContextCreator.Provider>
  );
};

export default ContextProvider;
