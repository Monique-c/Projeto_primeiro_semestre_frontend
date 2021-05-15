import React, { createContext } from "react";

import useFilter from "./hooks/useEleitoradoFilter";

const Context2 = createContext();

function EleitoradoProvider({ children }) {
  const {
    filtroAplicado,
    loading,
    opcoesVisiveis,
    filtrarDados,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
  } = useFilter();

  return (
    <Context2.Provider
      value={{
        filtrarDados,
        filtroAplicado,
        opcoesVisiveis,
        loading,
        faixaEtariaEleitorado,
        estadoCivilEleitorado,
        grauEscolarEleitorado,
        NomeSocialEleitorado,
      }}
    >
      {children}
    </Context2.Provider>
  );
}

export { Context2, EleitoradoProvider };
