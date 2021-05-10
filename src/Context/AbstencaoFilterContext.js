import React, { createContext } from "react";

import useFilter from "./hooks/useAbstencaoFilter";

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimento,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimento,
    escolaridadeDeclaradaPorComparecimentoComparativo,
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
        estadoCivilPorAbstencao,
        estadoCivilPorComparecimento,
        estadoCivilPorComparecimentoComparativo,
        escolaridadeDeclaradaPorAbstencao,
        escolaridadeDeclaradaPorComparecimento,
        escolaridadeDeclaradaPorComparecimentoComparativo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, FilterProvider };
