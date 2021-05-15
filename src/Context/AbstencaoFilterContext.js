import React, { createContext } from "react";

import useFilter from "./hooks/useAbstencaoFilter";

const Context = createContext();

function AbstencaoProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    opcoesVisiveis,
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
        opcoesVisiveis,
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

export { Context, AbstencaoProvider };
