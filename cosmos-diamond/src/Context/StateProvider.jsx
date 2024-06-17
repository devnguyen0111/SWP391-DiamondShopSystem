import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [active, setActive] = useState(0);

  const state = {
    theme,
    setTheme,
    active,
    setActive,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
