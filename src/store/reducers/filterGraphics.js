import * as types from "../types";

const INITIAL_STATE = {
  loading: false,
  filterApplied: false,
  data: {}
};

export default function handleDataAbstencao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.HANDLE_FILTER_ABSTENCAO:
      return {
        ...state,
        loading: action.loading
      };

    case types.HANDLE_DATA_ABSTENCAO:
      return {
        ...state,
        loading: action.loading,
        filterApplied: action.filterApplied,
        data: action.data
      };

    default:
      return state;
  }
}
