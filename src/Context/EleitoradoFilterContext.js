import React, { createContext } from "react";

import useFilter from "./hooks/useEleitoradoFilter";

const Context2 = createContext();

function EleitoradoProvider({children}) {
   const{
    filtroAplicado,
    loading,
    filtrarDados,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
   }= useFilter();


  return (
    <Context2.Provider
      value={{
        filtrarDados,
        filtroAplicado,
        loading,
        faixaEtariaEleitorado,
        estadoCivilEleitorado,
        grauEscolarEleitorado,

      }}
    >
      {children}
    </Context2.Provider>
  );


}

export { Context2, EleitoradoProvider };
