import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [active, setActive] = useState(0);
  const [checkout, setCheckout] = useState(() => {
    const savedCheckout = localStorage.getItem("checkout");
    return savedCheckout ? JSON.parse(savedCheckout) : null;
  });

  const state = {
    theme,
    setTheme,
    active,
    setActive,
    checkout,
    setCheckout,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
