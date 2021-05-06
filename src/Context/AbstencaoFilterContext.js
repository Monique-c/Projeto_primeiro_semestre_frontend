import React, { createContext } from "react";

import useFilter from "./hooks/useAbstencaoFilter";

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    dataResult,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
  } = useFilter();

  return (
    <Context.Provider
      value={{
        filtrarDados,
        filtroAplicado,
        loading,
        faixaEtariaPorAbstencao,
        faixaEtariaPorComparecimento,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, FilterProvider };
