import React, { createContext } from "react";

import useFilter from "./hooks/useRendaFilterTeste";

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtrarDados,
    filtroAplicado,
    PIB,
    PIB_percapita,
    Comparativo,
  } = useFilter();

  return (
    <Context.Provider
      value={{
        loading,
        filtrarDados,
        filtroAplicado,
        PIB,
        PIB_percapita,
        Comparativo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, FilterProvider };
