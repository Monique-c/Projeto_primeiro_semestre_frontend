import * as types from "../types";

const INITIAL_STATE = {
  cidades: []
};

export default function getCities(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CIDADES:
      return {
        ...state,
        cidades: [...state.cidades, action.cidades]
      };

    default:
      return state;
  }
}
