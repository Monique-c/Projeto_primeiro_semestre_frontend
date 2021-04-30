import React, {createContext} from 'react';

import useFilter from './hooks/useFilter';

const Context = createContext();

function FilterProvider({ children }) {
  const {
    loading,
    filtroAplicado,
    filtrarDados,
    dataResult
  } = useFilter();

  return (
    <Context.Provider value={{filtrarDados, filtroAplicado, loading, dataResult}}>
      {children}
    </Context.Provider>
  )
}

export {Context, FilterProvider};
