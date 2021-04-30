import React, { useState } from "react";

// import api from "../../services/api";
import abstencao from "../../controllers/abstencao";

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    // const { data } = await api.post("pesquisas-eleitorado", form)

    return handleData(abstencao);
  }

  function handleData(data) {
    const key = Object.keys(data[0]).splice(2);

    const newData = {
      labels: key,
      datasets: [
        {
          data: Object.values(data[0]).splice(2),
          label: data[0]["NM_MUNICIPIO"],
          backgroundColor: "rgba(0,9,272,0.2)",
          borderColor: "rgba(0,9,272,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0,9,232,0.4)",
          hoverBorderColor: "rgba(0,9,232,1)",
        },
        {
          data: Object.values(data[3]).splice(2),
          label: data[3]["NM_MUNICIPIO"],
          backgroundColor: "rgba(45,245,79,0.2)",
          borderColor: "rgba(45,245,79,0.7)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(45,245,79,0.4)",
          hoverBorderColor: "rgba(45,245,79,0.2)",
        },
      ],
    };
    setDataResult(newData);
    setFiltroAplicado(true);
    setTimeout(function () {
      setLoading(false);
    }, 3000);

    return true;
  }

  return { loading, dataResult, filtrarDados, filtroAplicado };
}
