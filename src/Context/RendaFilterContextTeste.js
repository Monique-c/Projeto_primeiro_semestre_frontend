import React, { createContext } from "react";

import useFilter from "./hooks/useRendaFilterTeste";

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
    faixaEtariaPorComparecimentoComparativo,
  } = useFilter();

  return (
    <Context.Provider
      value={{
        filtrarDados,
        filtroAplicado,
        loading,
        faixaEtariaPorAbstencao,
        faixaEtariaPorComparecimento,
        faixaEtariaPorComparecimentoComparativo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, FilterProvider };
