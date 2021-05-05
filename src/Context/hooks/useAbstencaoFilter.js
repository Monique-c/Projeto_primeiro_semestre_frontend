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

  var color = randomColor({});

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

    const { data } = await api.post("pesquisas-abstencao", form);
    // console.log(data);
    // Para teste estou usando  dados que estão em src/controllers/abstencao
    // Estes dados são os mesmos retornados do banco de dados
    return handleData(abstencao);
  }

  function handleData(data) {
    var color = randomColor({
      count: data.length,
      luminosity: "bright",
      hue: "random",
    }); // gerando cores aleatóriamente

    const handleFaixaEtariaAbstencao = data.map((item) => {
      const newAbstencaoValues = item.faixa_etaria.map(
        // data de acordo os valores
        (abs) => abs.qt_abstencao
      );

      const newAbstencaoCategorias = item.faixa_etaria.map(
        // Labels do eixo das categorias ou eixo x
        (abs) => abs.desc_faixa_etaria
      );

      return {
        municipio: item.municipio,
        newAbstencaoCategorias,
        newAbstencaoValues,
      };
    });

    const setDatasetAbstencaoPorFaixaEtaria = handleFaixaEtariaAbstencao.map(
      (item, index) => {
        return {
          labels: item.newAbstencaoCategorias, // eixo x ou eixo das categorias
          datasets: [
            //datasets: responsável pelo eixo dos valores / eixo y e style do gráfico
            {
              data: item.newAbstencaoValues,
              label: item.municipio,
              // Abobrinha
              backgroundColor: color[index],
              borderWidth: 1,
              hoverBackgroundColor: color[index],
              hoverBorderColor: color[index],
            },
          ],
        };
      }
    );

    const handleFaixaEtariaComparecimento = data.map((item) => {
      const newComparecimentoValues = item.faixa_etaria.map(
        // data de acordo os valores
        (abs) => abs.qt_comparecimento
      );

      const newComparecimentoCategorias = item.faixa_etaria.map(
        // Labels do eixo das categorias ou eixo x
        (abs) => abs.desc_faixa_etaria
      );

      return {
        municipio: item.municipio,
        newComparecimentoCategorias,
        newComparecimentoValues,
      };
    });

    const setDatasetComparecimentoPorFaixaEtaria = handleFaixaEtariaComparecimento.map(
      (item, index) => {
        return {
          labels: item.newComparecimentoCategorias, // eixo x ou eixo das categorias
          datasets: [
            //datasets: responsável pelo eixo dos valores / eixo y e style do gráfico
            {
              data: item.newComparecimentoValues,
              label: item.municipio,
              backgroundColor: color[index],
              borderWidth: 1,
              hoverBackgroundColor: color[index],
              hoverBorderColor: color[index],
            },
          ],
        };
      }
    );

    const handleEstadoCivil = data.map((dado, index) => {
      return {
        municipio: dado.municipio,
        estado_civil: dado.estado_civil,
      };
    });

    const handleGrauEscolaridade = data.map((dado, index) => {
      return {
        municipio: dado.municipio,
        grau_escolaridade: dado.grau_escolaridade,
      };
    });

    // carrega os dados já pronto para o gráfico
    setFaixaEtariaPorAbstencao(setDatasetAbstencaoPorFaixaEtaria);
    setFaixaEtariaPorComparecimento(setDatasetComparecimentoPorFaixaEtaria);

    setFiltroAplicado(true); // apenas informa que o filtro foi aplicado

    setTimeout(function () {
      setLoading(false);
    }, 3000);
    // este timeout é utilizado para simular uma espera de 3 segundos ou 3000 mls
    return true;
  }

  return {
    loading,
    filtrarDados,
    filtroAplicado,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
