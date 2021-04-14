import * as types from "../types";

export function handleDataAbstencao(loading, filterApplied, data) {
  return {
    type: types.HANDLE_DATA_ABSTENCAO,
    loading,
    filterApplied,
    data
  };
}

export function handleFilterAbstencao(loading) {
  return {
    type: types.HANDLE_FILTER_ABSTENCAO,
    loading,
  };
}
