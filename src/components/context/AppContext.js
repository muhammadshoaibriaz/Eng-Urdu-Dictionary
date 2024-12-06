import {createContext, useState} from 'react';
const Context = createContext();
const ContextProvider = ({children}) => {
  const [item, setItem] = useState(null);
  const contextValue = {item, setItem};
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export {Context, ContextProvider};
