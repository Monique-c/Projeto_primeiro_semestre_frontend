import React, { createContext } from "react";

import useFilter from "./hooks/useRendaFilter";

const Context = createContext();

function RendaProvider({ children }) {
  const {
    loading,
    filtrarDados,
    filtroAplicado,
    PIB,
    MaxPIB,
    MinPIB,
    PIB_Percapta,
    MaxPIB_Percapta,
    MinPIB_Percapta,
  } = useFilter();

  return (
    <Context.Provider
      value={{
        loading,
        filtrarDados,
        filtroAplicado,
        PIB,
        MaxPIB,
        MinPIB,
        PIB_Percapta,
        MaxPIB_Percapta,
        MinPIB_Percapta,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, RendaProvider };
