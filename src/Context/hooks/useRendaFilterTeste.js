import React, { useState } from "react";

import api from "../../services/api";
import renda from "../../controllers/renda_json";
import { isJSDocPrivateTag } from "typescript";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [PIB, setPIB] = useState([]);
  const [MaxPIB, setMaxPIB] = useState([]);
  const [MinPIB, setMinPIB] = useState([]);

  const [PIB_Percapta, setPIB_Percapta] = useState([]);
  const [MaxPIB_Percapta, setMaxPIB_Percapta] = useState([]);
  const [MinPIB_Percapta, setMinPIB_Percapta] = useState([]);

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
    const handlePIB = data.map((item) => {
      //filtre os dados
      const estado = item.media_PIB_percapta_ESTADO.map(
        // data de acordo os valores
        (pibest) => {
          const value = {
            PIB: pibest.media_PIB,
            municipio: "Estado de São Paulo",
          };

          return value;
        }
      );
      const municipios = item.media_PIB_percapta_MUNICIPIO.map(
        // data de acordo os valores
        (pibmun) => {
          const value = {
            PIB: pibmun.PIB,
            municipio: pibmun.municipio,
          };

          return value;
        }
      );
      let global = municipios.concat(estado);
      return {
        global,
      };
    });

    const handleMaxPIB = data.map((item) => {
      const municipios = item.max_PIB.map((pibMax) => {
        const value = {
          max_PIB: pibMax.max_PIB,
          municipio: pibMax.municipio,
        };
        console.log(municipios);
        return value;
      });
      return {
        municipios,
      };
    });

    const handleMinPIB = data.map((item) => {
      const municipios = item.min_PIB.map((pibMin) => {
        const value = {
          min_PIB: pibMin.min_PIB,
          municipio: pibMin.municipio,
        };

        return value;
      });

      return {
        municipios,
      };
    });

    const handlePIB_Percapta = data.map((item) => {
      //filtre os dados
      const estado = item.media_PIB_percapta_ESTADO.map(
        // data de acordo os valores
        (pibest) => {
          const value = {
            PIB_percapita: pibest.media_PIB_percapta,
            municipio: "Estado de São Paulo",
          };

          return value;
        }
      );
      const municipios = item.media_PIB_percapta_MUNICIPIO.map(
        // data de acordo os valores
        (pibmun) => {
          const value = {
            PIB_percapita: pibmun.PIB_percapita,
            municipio: pibmun.municipio,
          };

          return value;
        }
      );
      let global = municipios.concat(estado);

      return {
        global,
      };
    });

    const handleMaxPIB_Percapta = data.map((item) => {
      const municipios = item.max_PIB_Percapta.map((pib_percapitaMax) => {
        const value = {
          max_PIB_percapita: pib_percapitaMax.max_PIB_percapita,
          municipio: pib_percapitaMax.municipio,
        };
        return value;
      });
      return {
        municipios,
      };
    });

    const handleMinPIB_Percapta = data.map((item) => {
      const municipios = item.min_PIB_Percapta.map((pib_percapitaMin) => {
        const value = {
          min_PIB_percapita: pib_percapitaMin.min_PIB_percapita,
          municipio: pib_percapitaMin.municipio,
        };

        return value;
      });

      return {
        municipios,
      };
    });

    /* Chamando funções:
      Passe os dados "tratados" em funções diferentes para cada tema.
      Essas funções irão fazer os "moldes" para os gráficos. Adicione
      como parâmetro da função as constates criadas a cima para seu tema.
    */
    handleDataPIB(handlePIB);
    handleDataMaxPIB(handleMaxPIB);
    handleDataMinPIB(handleMinPIB);
    handleDataPIB_Percapta(handlePIB_Percapta);
    handleDataMaxPIB_Percapta(handleMaxPIB_Percapta);
    handleDataMinPIB_Percapta(handleMinPIB_Percapta);

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

  // Modelando dados de pib
  function handleDataPIB(PIB) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetPIB = PIB.map((item) => {
      var colors = randomColor({
        count: item.global.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.global.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.global.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.PIB],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      console.log(dataset);
      return dataset;
    });

    const datasetPIB = {
      labels: [""],
      datasets: setdatasetPIB[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setPIB(datasetPIB);
  }

  function handleDataMaxPIB(MaxPIB) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMaxPIB = MaxPIB.map((item) => {
      var colors = randomColor({
        count: item.municipios.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.municipios.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.municipios.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.max_PIB],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxPIB = {
      labels: [""],
      datasets: setdatasetMaxPIB[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMaxPIB(datasetMaxPIB);
  }

  function handleDataMinPIB(MinPIB) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMinPIB = MinPIB.map((item) => {
      var colors = randomColor({
        count: item.municipios.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.municipios.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.municipios.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.min_PIB],
          backgroundColor: [colors[index], 0.5],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinPIB = {
      labels: [""],
      datasets: setdatasetMinPIB[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMinPIB(datasetMinPIB);
  }

  function handleDataPIB_Percapta(PIB_Percapta) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetPIB_Percapta = PIB_Percapta.map((item) => {
      var colors = randomColor({
        count: item.global.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.global.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.global.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.PIB_percapita],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetPIB_Percapta = {
      labels: [""],
      datasets: setdatasetPIB_Percapta[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setPIB_Percapta(datasetPIB_Percapta);
  }
  function handleDataMaxPIB_Percapta(MaxPIB_Percapta) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMaxPIB_Percapta = MaxPIB_Percapta.map((item) => {
      var colors = randomColor({
        count: item.municipios.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.municipios.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.municipios.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.max_PIB_percapita],
          backgroundColor: [colors[index], 0.5],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxPIB_Percapta = {
      labels: [""],
      datasets: setdatasetMaxPIB_Percapta[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMaxPIB_Percapta(datasetMaxPIB_Percapta);
  }

  function handleDataMinPIB_Percapta(MinPIB_Percapta) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMinPIB_Percapta = MinPIB_Percapta.map((item) => {
      var colors = randomColor({
        count: item.municipios.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: item.municipios.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = item.municipios.map((value, index) => {
        return {
          label: value.municipio,
          data: [value.min_PIB_percapita],
          backgroundColor: [colors[index], 0.5],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinPIB_Percapta = {
      labels: [""],
      datasets: setdatasetMinPIB_Percapta[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMinPIB_Percapta(datasetMinPIB_Percapta);
  }

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    PIB,
    MaxPIB,
    MinPIB,
    PIB_Percapta,
    MaxPIB_Percapta,
    MinPIB_Percapta,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
