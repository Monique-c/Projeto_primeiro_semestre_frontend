import React, { useState } from "react";

import api from "../../services/api";
import renda from "../../controllers/renda_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [PIB, setPIB] = useState([]);

  const [PIB_percapita, setPIB_percapita] = useState([]);

  const [Comparativo, setComparativo] = useState([]);

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    const form = {
      municipios: ["São José dos Campos", "São Paulo"],
      colunas: ["PIB", "PIB_percapita"],
    };

    // const { data } = await api.post("pesquisas-abstencao", form);
    // console.log(data);
    // Para teste estou usando  dados que estão em src/controllers/abstencao
    // Estes dados são os mesmos retornados do banco de dados
    return handleData(renda);
  }

  function handleData(data) {
    var colors = randomColor({
      count: data.length,
      luminosity: "bright",
      hue: "random",
    }); // gerando cores aleatóriamente

    // Crie constantes para lidar com cada categoria e tema,
    // ex: categoria faixa etaria tema abstenção
    const handlePIB = data.map((item) => {
      //filtre os dados aqui
      const valores = item.PIB.map(
        // data de acordo os valores
        (abs) => abs.PIB
      );

      const categorias = item.pib.map(
        // Labels do eixo das categorias ou eixo x
        (abs) => abs.desc_faixa_etaria
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    const handleFaixaEtariaComparecimento = data.map((item) => {
      const valores = item.faixa_etaria.map(
        // data de acordo os valores
        (abs) => abs.qt_comparecimento
      );

      const categorias = item.faixa_etaria.map(
        // Labels do eixo das categorias ou eixo x
        (abs) => abs.desc_faixa_etaria
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    // crie outras const abaixo
    // const handleEstadoCivilAbstencao = data.map((item) => {

    // })

    /* Chamando funções:
      Passe os dados "tratados" em funções diferentes para cada tema.
      Essas funções irão fazer os "moldes" para os gráficos. Adicione
      como parâmetro da função as constates criadas a cima para seu tema,
      adicione também a variável colors para que as cores do gráficos, gere
      automaticamente.
    */
    handleDataPIB(handlePIB, colors);
    handleDataComparecimento(handleFaixaEtariaComparecimento, colors);

    /*
      Após a execução das funções acima atualizamos
      o estado de loading e mostramos os gráficos modelados
      em tela
    */
    setFiltroAplicado(true); // Apenas informa que o filtro foi aplicado
    // Esse timeout é utilizado para simular uma espera de 3 segundos ou 3000 mls
    setTimeout(function () {
      setLoading(false);
    }, 3000);

    return true;
  }

  // Modelando dados de abstenção
  function handleDataPIB(PIB, colors) {
    /* ----------------------- INICIO Faixa etária -----------------------  */
    const setdatasetPIB = PIB.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetPIB = {
      labels: PIB[0].categorias,
      datasets: setdatasetPIB.map((item) => item.datasets),
    };

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setPIB(datasetPIB);
    /* ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO <CATEGORIA> -----------------------  */

    /*    ----------------------- FIM <CATEGORIA> -----------------------  */
  }

  // Modelando dados de Comparecimento
  function handleDataComparecimento(PIB_percapita, colors) {
    /*    ----------------------- INICIO Faixa etária -----------------------  */
    const setDatasetPIB_percapita = PIB_percapita.map((item, index) => {
      return {
        labels: item.categorias, // eixo x ou eixo das categorias
        datasets: [
          //datasets: responsável pelo eixo dos valores / eixo y e style do gráfico
          {
            data: item.valores,
            label: item.municipio,
            // Abobrinha
            backgroundColor: colors[index],
            borderWidth: 1,
            hoverBackgroundColor: colors[index],
            hoverBorderColor: colors[index],
          },
        ],
      };
    });

    // const data = {
    //   labels: [cidades[0], cidades[1]],
    //   datasets: [
    //     {
    //       label: "PIB das Cidades",
    //       data: { PIB },
    //       backgroundColor: [
    //         "rgba(255, 80, 132, 0.2)",
    //         "rgba(54, 162, 235, 0.2)",
    //         "rgba(255, 206, 86, 0.2)",
    //         "rgba(75, 192, 192, 0.2)",
    //         "rgba(153, 102, 255, 0.2)",
    //         "rgba(255, 159, 64, 0.2)",
    //       ],
    //       borderColor: [
    //         "rgba(255, 80, 132, 1)",
    //         "rgba(54, 162, 235, 1)",
    //         "rgba(255, 206, 86, 1)",
    //         "rgba(75, 192, 192, 1)",
    //         "rgba(153, 102, 255, 1)",
    //         "rgba(255, 159, 64, 1)",
    //       ],
    //       borderWidth: 1,
    //     },
    //   ],
    // };

    const setDatasetComparativo = PIB.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetComparativo = {
      labels: PIB[0].categorias,
      datasets: setDatasetComparativo.map((item) => item.datasets),
    };

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setPIB_percapita(setDatasetPIB_percapita);
    setComparativo(datasetComparativo);
    /*    ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO <CATEGORIA> -----------------------  */

    /*    ----------------------- FIM <CATEGORIA> -----------------------  */
  }

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    PIB,
    PIB_percapita,
    Comparativo,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
