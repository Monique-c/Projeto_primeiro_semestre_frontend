import React, { useState } from "react";

import api from "../../services/api";
import renda from "../../controllers/renda_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [PIB, setPIB] = useState([]);

  const [PIB_percapita, setPIB_percapita] = useState([]);

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    // const form = {
    //   municipios: ["São José dos Campos", "São Paulo"],
    //   colunas: ["PIB", "PIB_percapita"],
    // };

    // const { data } = await api.post("pesquisas-abstencao", form);
    // console.log(data);
    // Para teste estou usando  dados que estão em src/controllers/abstencao
    // Estes dados são os mesmos retornados do banco de dados
    return handleData(renda);
  }

  function handleData(data) {
    // Crie constantes para lidar com cada categoria e tema,
    // ex: categoria faixa etaria tema abstenção
    const handleMaxPIB = data.map((item) => {
      //filtre os dados aqui
      const municipios = item.max_PIB.map(
        // data de acordo os valores
        (pibMax) => {
          const value = {
            max_PIB: pibMax.max_PIB,
            municipio: pibMax.municipio,
          };

          return value;
        }
      );

      return {
        municipios,
      };
    });

    console.log(handleMaxPIB);
    /*
    Essa é a estrutura que retorna dessa função acima
    [{
      municipios:
        [
          {municipio: "São Paulo", max_PIB: 389317000.0},
          {municipio: "Guarulhos", max_PIB: 32473800.0},
          {municipio: "Campinas",  max_PIB: 31654700.0,}
        ]
      }]
    */

    // crie outras const abaixo
    // const handleEstadoCivilAbstencao = data.map((item) => {

    // })

    /* Chamando funções:
      Passe os dados "tratados" em funções diferentes para cada tema.
      Essas funções irão fazer os "moldes" para os gráficos. Adicione
      como parâmetro da função as constates criadas a cima para seu tema.
    */
    handleDataMaxPIB(handleMaxPIB);

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
  function handleDataMaxPIB(PIB) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetPIB = PIB.map((item) => {
      var colors = randomColor({
        count: item.municipios.length,
        luminosity: "bright",
        hue: "random",
      }); // gerando cores aleatóriamente de acordo com a quantidade de cidades

      const dataset = item.municipios.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.max_PIB],
          backgroundColor: colors[index],
        };
      });
      return dataset;
    });

    const datasetPIB = {
      labels: [""],
      datasets: setdatasetPIB[0],
    };

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setPIB(datasetPIB);

    /* ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO <CATEGORIA> -----------------------  */

    /*    ----------------------- FIM <CATEGORIA> -----------------------  */
  }

  // Modelando dados de <OUTRA FUNÇÃO>

  /*
    Seu código que não apaguei
    const data = {
      labels: [cidades[0], cidades[1]],
      datasets: [
        {
          label: "PIB das Cidades",
          data: { PIB },
          backgroundColor: [
            "rgba(255, 80, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 80, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  */

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    PIB,
    PIB_percapita,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
