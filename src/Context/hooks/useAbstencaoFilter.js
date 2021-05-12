import React, { useState } from "react";

import api from "../../services/api";
import abstencao from "../../controllers/abstencao_json";
import { NewLineKind } from "typescript";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [faixaEtariaPorAbstencao, setFaixaEtariaPorAbstencao] = useState([]);
  const [estadoCivilPorAbstencao, setEstadoCivilPorAbstencao] = useState([]);
  const [escolaridadeDeclaradaPorAbstencao, setEscolaridadeDeclaradaPorAbstencao] = useState([]);

  const [faixaEtariaPorComparecimentoComparativo, setFaixaEtariaPorComparecimentoComparativo,] = useState([]);
  const [estadoCivilPorComparecimentoComparativo, setEstadoCivilPorComparecimentoComparativo,] = useState([]);
  const [escolaridadeDeclaradaPorComparecimentoComparativo, setEscolaridadeDeclaradaPorComparecimentoComparativo,] = useState([]);

  const [totalAbstencao, setTotalAbstencao] = useState([]);
  const [totalComparecimento, setTotalComparecimento] = useState([]);

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
    const handleEstadoCivilAbstencao = data.map((item) => {
      const valores = item.estado_civil.map(
        (abs) => abs.qt_abstencao
      );

      const categorias = item.estado_civil.map(
        (abs) => abs.desc_estado_civil
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    const handleEstadoCivilComparecimento = data.map((item) => {
      const valores = item.estado_civil.map(
        (abs) => abs.qt_comparecimento
      );

      const categorias = item.estado_civil.map(
        (abs) => abs.desc_estado_civil
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    const handleEscolaridadeDeclaradaAbstencao = data.map((item) => {
      const valores = item.grau_escolaridade.map(
        (abs) => abs.qt_abstencao
      );

      const categorias = item.grau_escolaridade.map(
        (abs) => abs.desc_grau_escolaridade
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    const handleEscolaridadeDeclaradaComparecimento = data.map((item) => {
      const valores = item.grau_escolaridade.map(
        (abs) => abs.qt_comparecimento
      );

      const categorias = item.grau_escolaridade.map(
        (abs) => abs.desc_grau_escolaridade
      );

      return {
        municipio: item.municipio,
        categorias,
        valores,
      };
    });

    const handleAbstencaoTotal = data.map((item) => {
      const valores = {
        AbstencaoTotal: item.QT_ABSTENCAO,
        municipio: item.municipio,
      };

      return valores;

    });

    const handleComparecimentoTotal = data.map((item) => {
      const valores = {
        ComparecimentoTotal: item.QT_COMPARECIMENTO,
        municipio: item.municipio,
      };

      return valores;

    });

    /* Chamando funções:
      Passe os dados "tratados" em funções diferentes para cada tema.
      Essas funções irão fazer os "moldes" para os gráficos. Adicione
      como parâmetro da função as constates criadas a cima para seu tema,
      adicione também a variável colors para que as cores do gráficos, gere
      automaticamente.
    */
    handleDataAbstencao(
      handleFaixaEtariaAbstencao,
      handleEstadoCivilAbstencao,
      handleEscolaridadeDeclaradaAbstencao,
      handleAbstencaoTotal,
      colors);
    handleDataComparecimento(
      handleFaixaEtariaComparecimento,
      handleEstadoCivilComparecimento,
      handleEscolaridadeDeclaradaComparecimento,
      handleComparecimentoTotal,
      colors);

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
  function handleDataAbstencao(faixaEtaria, estadoCivil, escolaridadeDeclarada, abstencaoTotal, colors) {
    /* ----------------------- INICIO Faixa etária -----------------------  */
    const setDatasetAbstencaoPorFaixaEtaria = faixaEtaria.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderWidth: 1,
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
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
    /*    ----------------------- iNICIO Estado civil -----------------------  */
    const setDatasetAbstencaoPorEstadoCivil = estadoCivil.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderWidth: 1,
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetAbstencaoPorEstadoCivil = {
      labels: estadoCivil[0].categorias,
      datasets: setDatasetAbstencaoPorEstadoCivil.map((item) => item.datasets),
    };

    setEstadoCivilPorAbstencao(datasetAbstencaoPorEstadoCivil);

    /*    ----------------------- FIM Estado civil -----------------------  */
    /*    ----------------- INICIO Escolaridade Declarada ----------------  */
    const setDatasetAbstencaoPorEscolaridadeDeclarada = escolaridadeDeclarada.map((item, index) => {
      const newDataset = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderWidth: 1,
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetAbstencaoPorEscolaridadeDeclarada = {
      labels: escolaridadeDeclarada[0].categorias,
      datasets: setDatasetAbstencaoPorEscolaridadeDeclarada.map((item) => item.datasets),
    };

    setEscolaridadeDeclaradaPorAbstencao(datasetAbstencaoPorEscolaridadeDeclarada);

    /*    ------------------- FIM Escolaridade Declarada ------------------  */

    /*    ------------------------- INICIO Total --------------------------  */
    const setDatasetAbstencaoTotal = abstencaoTotal.map((valores, index) => {
      const newDataset = {
        data: [valores.AbstencaoTotal],
        label: valores.municipio,
        backgroundColor: colors[index],
        borderWidth: 1,
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetAbstencaoTotal = {
      labels: [''],
      datasets: setDatasetAbstencaoTotal.map((item) => item.datasets),
    };

    setTotalAbstencao(datasetAbstencaoTotal);

    /*    --------------------------- FIM Total -----------------------------  */

  }
  // Modelando dados de Comparecimento
  function handleDataComparecimento(faixaEtaria, estadoCivil, escolaridadeDeclarada, comparecimentoTotal, colors) {
    /*    ----------------------- INICIO Faixa etária -----------------------  */

    const setDatasetComparecimentoPorFaixaEtariaComparativo = faixaEtaria.map(
      (item, index) => {
        const newDataset = {
          data: item.valores,
          label: item.municipio,
          backgroundColor: colors[index],
          borderWidth: 1,
          hoverBackgroundColor: colors[index],
          hoverBorderColor: colors[index],
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

    setFaixaEtariaPorComparecimentoComparativo(datasetComparecimentoPorFaixaEtariaComparativo);
    /*    ----------------------- FIM Faixa etária -----------------------  */

    // Adicione aqui a modelagem das outras categorias (estado civil por exemplo)
    /*    ----------------------- iNICIO Estado civil -----------------------  */

    const setDatasetComparecimentoPorEstadoCivilComparativo = estadoCivil.map(
      (item, index) => {
        const newDataset = {
          data: item.valores,
          label: item.municipio,
          backgroundColor: colors[index],
          borderWidth: 1,
          hoverBackgroundColor: colors[index],
          hoverBorderColor: colors[index],
        };
        return {
          datasets: newDataset,
        };
      }
    );

    const datasetComparecimentoPorEstadoCivilComparativo = {
      labels: estadoCivil[0].categorias,
      datasets: setDatasetComparecimentoPorEstadoCivilComparativo.map(
        (item) => item.datasets
      ),
    };

    setEstadoCivilPorComparecimentoComparativo(datasetComparecimentoPorEstadoCivilComparativo);

    /*    ----------------------- FIM Estado civil -----------------------  */

    /*    ------------------ INICIO Escolaridade Declarada ---------------  */

    const setDatasetComparecimentoPorEscolaridadeDeclaradaComparativo = escolaridadeDeclarada.map(
      (item, index) => {
        const newDataset = {
          data: item.valores,
          label: item.municipio,
          backgroundColor: colors[index],
          borderWidth: 1,
          hoverBackgroundColor: colors[index],
          hoverBorderColor: colors[index],
        };
        return {
          datasets: newDataset,
        };
      }
    );

    const datasetComparecimentoPorEscolaridadeDeclaradaComparativo = {
      labels: escolaridadeDeclarada[0].categorias,
      datasets: setDatasetComparecimentoPorEscolaridadeDeclaradaComparativo.map(
        (item) => item.datasets
      ),
    };

    setEscolaridadeDeclaradaPorComparecimentoComparativo(datasetComparecimentoPorEscolaridadeDeclaradaComparativo);

    /*    -------------------- FIM Escolaridade Declarada ----------------  */

    /*    ------------------------- INICIO Total --------------------------  */
    const setDatasetComparecimentoTotal = comparecimentoTotal.map((valores, index) => {
      const newDataset = {
        data: [valores.ComparecimentoTotal],
        label: valores.municipio,
        backgroundColor: colors[index],
        borderWidth: 1,
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };
      return {
        datasets: newDataset,
      };
    });

    const datasetComparecimentoTotal = {
      labels: [''],
      datasets: setDatasetComparecimentoTotal.map((item) => item.datasets),
    };

    setTotalComparecimento(datasetComparecimentoTotal);

    /*    --------------------------- FIM Total -----------------------------  */
  }

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimentoComparativo,
    totalAbstencao,
    totalComparecimento,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
