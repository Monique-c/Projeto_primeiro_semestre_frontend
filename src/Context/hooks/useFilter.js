import React, {useState, useEffect} from 'react';

import api from '../../services/api';

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  async function filtrarDados() {
    setLoading(true)
    setFiltroAplicado(false)
    const form = {
      "municipios": ["SÃO PAULO", "SÃO JOSÉ DOS CAMPOS", "CARAPICUIBA", "BARUERI"],
      "colunas": ["QT_ELEITORES_PERFIL", "QT_ELEITORES_INC_NM_SOCIAL", "QT_ELEITORES_DEFICIENCIA"]
    }

    // const { data } = await api.post("pesquisas-eleitorado", form)

    const data = [
      {
        "NM_MUNICIPIO": "CARAPICUÍBA",
        "QT_ELEITORES_PERFIL": 291604,
        "QT_ELEITORES_INC_NM_SOCIAL": 34,
        "QT_ELEITORES_DEFICIENCIA": 3262
      },
      {
        "NM_MUNICIPIO": "SÃO PAULO",
        "QT_ELEITORES_PERFIL": 8975761,
        "QT_ELEITORES_INC_NM_SOCIAL": 1195,
        "QT_ELEITORES_DEFICIENCIA": 152933
      },
      {
        "NM_MUNICIPIO": "BARUERI",
        "QT_ELEITORES_PERFIL": 261786,
        "QT_ELEITORES_INC_NM_SOCIAL": 15,
        "QT_ELEITORES_DEFICIENCIA": 2614
      },
      {
        "NM_MUNICIPIO": "SÃO JOSÉ DOS CAMPOS",
        "QT_ELEITORES_PERFIL": 475288,
        "QT_ELEITORES_INC_NM_SOCIAL": 50,
        "QT_ELEITORES_DEFICIENCIA": 4971
      }
    ]

    return handleData(data)
  }

  function handleData(data) {
    const newData = {
      labels: Object.keys(data[0]),
      datasets: [
        {
          "data": Object.values(data[0]),
          label: data[0]["NM_MUNICIPIO"],
          backgroundColor: "rgba(0,9,272,0.2)",
          borderColor: "rgba(0,9,272,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0,9,232,0.4)",
          hoverBorderColor: "rgba(0,9,232,1)",
        },
        {
          "data": Object.values(data[3]),
          label: data[3]["NM_MUNICIPIO"],
          backgroundColor: "rgba(45,245,79,0.2)",
          borderColor: "rgba(45,245,79,0.7)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(45,245,79,0.4)",
          hoverBorderColor: "rgba(45,245,79,0.2)",
        }
      ]
    };
    setDataResult(newData)
    setFiltroAplicado(true)
    setTimeout(function() {setLoading(false)}, 3000)

    return true
  }

  return {loading, dataResult, filtrarDados, filtroAplicado}
}
