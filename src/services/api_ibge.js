import axios from "axios";

const ibge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/sp/municipios?orderBy=nome",
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

export default ibge;
