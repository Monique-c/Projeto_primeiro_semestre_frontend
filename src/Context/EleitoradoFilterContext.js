import React, { createContext } from "react";

import useFilter from "./hooks/useEleitoradoFilter";

const Context2 = createContext();

function EleitoradoProvider({ children }) {
  const {
    filtroAplicado,
    opcoesVisiveis,
    loading,
    filtrarDados,
    //---------------------------------
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
    //---------------------------------
    MaxEleitJovens,
    MinEleitJovens,
    MaxEleitAdultos,
    MinEleitAdultos,
    MaxEleitIdosos,
    MinEleitIdosos,
    //---------------------------------
    MaxEleitSupComp,
    MinEleitSupComp,
    MaxEleitMedComp,
    MinEleitMedComp,
    MaxEleitAnalfabeto,
    MinEleitAnalfabeto,
    //---------------------------------
    MaxEleitCasados,
    MinEleitCasados,
    MaxEleitSolteiros,
    MinEleitSolteiros,
  } = useFilter();

  return (
    <Context2.Provider
      value={{
        filtroAplicado,
        opcoesVisiveis,
        loading,
        filtrarDados,
        //---------------------------------
        faixaEtariaEleitorado,
        estadoCivilEleitorado,
        grauEscolarEleitorado,
        NomeSocialEleitorado,
        //---------------------------------
        MaxEleitJovens,
        MinEleitJovens,
        MaxEleitAdultos,
        MinEleitAdultos,
        MaxEleitIdosos,
        MinEleitIdosos,
        //---------------------------------
        MaxEleitSupComp,
        MinEleitSupComp,
        MaxEleitMedComp,
        MinEleitMedComp,
        MaxEleitAnalfabeto,
        MinEleitAnalfabeto,
        //---------------------------------
        MaxEleitCasados,
        MinEleitCasados,
        MaxEleitSolteiros,
        MinEleitSolteiros,
      }}
    >
      {children}
    </Context2.Provider>
  );
}

export { Context2, EleitoradoProvider };
