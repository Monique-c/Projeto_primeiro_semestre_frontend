import React, { createContext } from "react";

import useFilter from "./hooks/useAbstencaoFilter";

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimentoComparativo,
    totalAbstencao,
    totalComparecimento,
  } = useFilter();

  return (
    <Context.Provider
      value={{
        filtrarDados,
        filtroAplicado,
        loading,
        faixaEtariaPorAbstencao,
        faixaEtariaPorComparecimentoComparativo,
        estadoCivilPorAbstencao,
        estadoCivilPorComparecimentoComparativo,
        escolaridadeDeclaradaPorAbstencao,
        escolaridadeDeclaradaPorComparecimentoComparativo,
        totalAbstencao,
        totalComparecimento,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, FilterProvider };
