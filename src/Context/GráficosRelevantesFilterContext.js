import React, { createContext } from "react";

import useFilter from "./hooks/useGráficosRelevantesFilter";

const Context = createContext();

function FilterProviderRelevante({ children }) {
    const {
        loading,
        filtroAplicado,
        filtrarDados,
    } = useFilter();

    return (
        <Context.Provider
            value={{
                loading,
                filtroAplicado,
                filtrarDados,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, FilterProviderRelevante };