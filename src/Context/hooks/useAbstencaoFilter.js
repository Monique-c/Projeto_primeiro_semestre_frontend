import React, { useState } from "react";

import api from "../../services/api";
import abstencao from "../../controllers/abstencao_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [faixaEtariaPorAbstencao, setFaixaEtariaPorAbstencao] = useState([]);

  const [
    faixaEtariaPorComparecimento,
    setFaixaEtariaPorComparecimento,
  ] = useState([]);
  const [
    faixaEtariaPorComparecimentoComparativo,
    setFaixaEtariaPorComparecimentoComparativo,
  ] = useState([]);

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    const form = {
      municipios: ["SÃO JOSÉ DOS CAMPOS", "SÃO PAULO"],
      colunas: [
        "QT_ABSTENCAO",
        "QT_COMPARECIMENTO",
        "QT_ABSTENCAO_DEFICIENTE",
        "QT_COMPARECIMENTO_DEFICIENTE",
      ],
    };

    // const { data } = await api.post("pesquisas-abstencao", form);
    // console.log(data);
    // Para teste estou usando  dados que estão em src/controllers/abstencao
    // Estes dados são os mesmos retornados do banco de dados
    return handleData(abstencao);
  }

  function handleData(data) {
    var colors = randomColor({
      count: data.length,
      luminosity: "bright",
      hue: "random",
    }); // gerando cores aleatóriamente

    // Crie constantes para lidar com cada categoria e tema,
    // ex: categoria faixa etaria tema abstenção
    const handleFaixaEtariaAbstencao = data.map((item) => {
      //filtre os dados aqui
      const valores = item.faixa_etaria.map(
        // data de acordo os valores
        (abs) => abs.qt_abstencao
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
    handleDataAbstencao(handleFaixaEtariaAbstencao, colors);
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
  function handleDataAbstencao(faixaEtaria, colors) {
    /* ----------------------- INICIO Faixa etária -----------------------  */
    const setDatasetAbstencaoPorFaixaEtaria = faixaEtaria.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetAbstencaoPorFaixaEtaria = {
      labels: faixaEtaria[0].categorias,
      datasets: setDatasetAbstencaoPorFaixaEtaria.map((item) => item.datasets),
    };

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setFaixaEtariaPorAbstencao(datasetAbstencaoPorFaixaEtaria);
    /* ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO <CATEGORIA> -----------------------  */

    /*    ----------------------- FIM <CATEGORIA> -----------------------  */
  }

  // Modelando dados de Comparecimento
  function handleDataComparecimento(faixaEtaria, colors) {
    /*    ----------------------- INICIO Faixa etária -----------------------  */
    const setDatasetComparecimentoPorFaixaEtariaMunicipios = faixaEtaria.map(
      (item, index) => {
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
      }
    );

    const setDatasetComparecimentoPorFaixaEtariaComparativo = faixaEtaria.map(
      (item, index) => {
        const newDataset = {
          data: item.valores,
          label: item.municipio,
          backgroundColor: colors[index],
        };
        return {
          datasets: newDataset,
        };
      }
    );

    const datasetComparecimentoPorFaixaEtariaComparativo = {
      labels: faixaEtaria[0].categorias,
      datasets: setDatasetComparecimentoPorFaixaEtariaComparativo.map(
        (item) => item.datasets
      ),
    };

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setFaixaEtariaPorComparecimento(
      setDatasetComparecimentoPorFaixaEtariaMunicipios
    );
    setFaixaEtariaPorComparecimentoComparativo (
      datasetComparecimentoPorFaixaEtariaComparativo
    );
    /*    ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO <CATEGORIA> -----------------------  */

    /*    ----------------------- FIM <CATEGORIA> -----------------------  */
  }

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
    faixaEtariaPorComparecimentoComparativo,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
