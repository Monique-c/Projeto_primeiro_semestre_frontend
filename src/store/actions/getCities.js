import * as types from "../types";

export function getCidades(cidades) {
  return {
    type: types.GET_CIDADES,
    cidades
  };
}
