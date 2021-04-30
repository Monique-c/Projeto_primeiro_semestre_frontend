import React, { useState } from "react";

// import api from "../../services/api";
import abstencao from "../../controllers/abstencao";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  var color = randomColor({});

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    // const { data } = await api.post("pesquisas-eleitorado", form)

    return handleData(abstencao);
  }

  function handleData(data) {
    const key = Object.keys(data[0]).splice(1);
    // a key é utilizada para as legendas do eixo X,
    // a função slice remove o primeiro elemento do array
    // no caso o nome da cidade que não é necessário para o eixo X

    var color = randomColor({
      count: data.length,
      luminosity: "bright",
      hue: "random",
    }); // gerando cores aleatóriamente

    const datasets = data.map((dado, index) => {
      const novoDataset = {
        data: Object.values(dado).slice(1),
        label: dado.NM_MUNICIPIO,
        backgroundColor: color[index],
        borderWidth: 1,
        hoverBackgroundColor: color[index],
        hoverBorderColor: color[index],
      };
      return novoDataset;
    });
    /* Este data.map é semelhante ao for do python
      ele irá passar por cada elemento do array (data)
      e em cada iteração eu estou criando um novo
      elemento com as configurações necessárias para gerar
      o gráfico dinamicamente.
    */

    const newData = {
      labels: key, //eixo X
      datasets, // dados e configuração do gráfico
    };

    setDataResult(newData); // carrega os dados já pronto para o gráfico
    setFiltroAplicado(true); // apenas informa que o filtro foi aplicado

    setTimeout(function () {
      setLoading(false);
    }, 3000);
    // este timeout é utilizado para simular uma espera de 3 segundos ou 3000 mls
    return true;
  }

  return { loading, dataResult, filtrarDados, filtroAplicado };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
