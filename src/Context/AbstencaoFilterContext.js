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
    MaxAbsten,
    MinAbsten,

    Maxjovens,
    Minjovens,
    MaxAdultos,
    MinAdultos,
    MinIdosos,
    MaxIdosos,
    MaxAnalfabeto,
    MinAnalfabeto,
    MaxMedioCompleto,
    MinMedioCompleto,
    MaxSuperiorCompleto,
    MinSuperiorCompleto,
    MinCasados,
    MaxCasados,
    MinSolteiros,
    MaxSolteiros,
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
        MaxAbsten,
        MinAbsten,

        Maxjovens,
        Minjovens,
        MaxAdultos,
        MinAdultos,
        MinIdosos,
        MaxIdosos,
        MaxAnalfabeto,
        MinAnalfabeto,
        MaxMedioCompleto,
        MinMedioCompleto,
        MaxSuperiorCompleto,
        MinSuperiorCompleto,
        MinCasados,
        MaxCasados,
        MinSolteiros,
        MaxSolteiros,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AbstencaoProvider };
