import React, { useState } from "react";

import api from "../../services/api";
import abstencao from "../../controllers/abstencao_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [opcoesVisiveis, setOpcoesVisiveis] = useState({});

  const [faixaEtariaPorAbstencao, setFaixaEtariaPorAbstencao] = useState([]);
  const [estadoCivilPorAbstencao, setEstadoCivilPorAbstencao] = useState([]);
  const [
    escolaridadeDeclaradaPorAbstencao,
    setEscolaridadeDeclaradaPorAbstencao,
  ] = useState([]);

  const [
    faixaEtariaPorComparecimentoComparativo,
    setFaixaEtariaPorComparecimentoComparativo,
  ] = useState([]);
  const [faixaEtariaPorComparecimento, setFaixaEtariaPorComparecimento] =
    useState([]);
  const [
    estadoCivilPorComparecimentoComparativo,
    setEstadoCivilPorComparecimentoComparativo,
  ] = useState([]);
  const [
    escolaridadeDeclaradaPorComparecimentoComparativo,
    setEscolaridadeDeclaradaPorComparecimentoComparativo,
  ] = useState([]);

  const [totalAbstencao, setTotalAbstencao] = useState([]);
  const [totalComparecimento, setTotalComparecimento] = useState([]);

  const [MaxAbsten, setMaxAbstencao] = useState([]);
  const [MinAbsten, setMinAbstencao] = useState([]);

  const [Maxjovens, setMinJovensAbstencao] = useState([]);
  const [Minjovens, setMaxJovensAbstencao] = useState([]);
  const [MaxAdultos, setMaxAdultosAbstencao] = useState([]);
  const [MinAdultos, setMinAdultosAbstencao] = useState([]);
  const [MinIdosos, setMinIdososAbstencao] = useState([]);
  const [MaxIdosos, setMaxIdososAbstencao] = useState([]);
  const [MaxAnalfabeto, setMaxAnalfabetoAbstencao] = useState([]);
  const [MinAnalfabeto, setMinAnalfabetoAbstencao] = useState([]);
  const [MaxMedioCompleto, setMaxMedioCompletoAbstencao] = useState([]);
  const [MinMedioCompleto, setMinMedioCompletoAbstencao] = useState([]);
  const [MaxSuperiorCompleto, setMaxSuperiorCompletoAbstencao] = useState([]);
  const [MinSuperiorCompleto, setMinSuperiorCompletoAbstencao] = useState([]);
  const [MinCasados, setMinCasadosAbstencao] = useState([]);
  const [MaxCasados, setMaxCasadosAbstencao] = useState([]);
  const [MinSolteiros, setMinSolteirosAbstencao] = useState([]);
  const [MaxSolteiros, setMaxSolteirosAbstencao] = useState([]);

  async function filtrarDados(form, opcoes) {
    setLoading(true);
    setFiltroAplicado(false);
    setOpcoesVisiveis(opcoes);

    try {
      // const { data } = await api.post("pesquisas-abstencao", form);
      return handleData(abstencao);
    } catch (err) {
      console.log("err: " + err);
    }
  }

  function handleData(data) {
    var colors = randomColor({
      count: data.comparecimento_abstencao.length,
      luminosity: "bright",
      hue: "random",
      format: "rgba",
      alpha: 0.4,
    }); // gerando cores aleatóriamente
    var borderColors = {
      count: data.length,
      luminosity: "bright",
      hue: colors.hue,
      format: "rgba",
      alpha: 1,
    };

    // Crie constantes para lidar com cada categoria e tema,
    // ex: categoria faixa etaria tema abstenção
    const handleFaixaEtariaAbstencao = data.comparecimento_abstencao.map(
      (item) => {
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
      }
    );

    const handleFaixaEtariaComparecimento = data.comparecimento_abstencao.map(
      (item) => {
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
      }
    );

    // crie outras const abaixo
    const handleEstadoCivilAbstencao = data.comparecimento_abstencao.map(
      (item) => {
        const valores = item.estado_civil.map((abs) => abs.qt_abstencao);

        const categorias = item.estado_civil.map(
          (abs) => abs.desc_estado_civil
        );

        return {
          municipio: item.municipio,
          categorias,
          valores,
        };
      }
    );

    const handleEstadoCivilComparecimento = data.comparecimento_abstencao.map(
      (item) => {
        const valores = item.estado_civil.map((abs) => abs.qt_comparecimento);

        const categorias = item.estado_civil.map(
          (abs) => abs.desc_estado_civil
        );

        return {
          municipio: item.municipio,
          categorias,
          valores,
        };
      }
    );

    const handleEscolaridadeDeclaradaAbstencao =
      data.comparecimento_abstencao.map((item) => {
        const valores = item.grau_escolaridade.map((abs) => abs.qt_abstencao);

        const categorias = item.grau_escolaridade.map(
          (abs) => abs.desc_grau_escolaridade
        );

        return {
          municipio: item.municipio,
          categorias,
          valores,
        };
      });

    const handleEscolaridadeDeclaradaComparecimento =
      data.comparecimento_abstencao.map((item) => {
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

    const handleAbstencaoTotal = data.comparecimento_abstencao.map((item) => {
      const valores = {
        AbstencaoTotal: item.QT_ABSTENCAO,
        municipio: item.municipio,
      };

      return valores;
    });

    const handleComparecimentoTotal = data.comparecimento_abstencao.map(
      (item) => {
        const valores = {
          ComparecimentoTotal: item.QT_COMPARECIMENTO,
          municipio: item.municipio,
        };

        return valores;
      }
    );
    const handleAbstencaoMax = data.maiores_abstencoes.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.min_abstencao,
        qt_min_abstencao: item.qt_min_abstencao,
        municipio: item.municipio,
      };

      return valores;
    });
    const handleAbstencaoMin = data.menores_abstencoes.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.min_abstencao,
        qt_min_abstencao: item.qt_min_abstencao,
        municipio: item.municipio,
      };

      return valores;
    });
    //---------------------------------------------------------------------------------------\\
    const handleRelevantesMINJovens = data.min_abstencoes_jovens.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.abstencao_jovens,
        qt_abstencao_jovens: item.qt_abstencao_jovens,
        municipio: item.municipio,
      };

      return valores;
    });
    const handleRelevantesMAXJovens = data.max_abstencoes_jovens.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.abstencao_jovens,
        qt_abstencao_jovens: item.qt_abstencao_jovens,
        municipio: item.municipio,
      };

      return valores;
    });

    const handleRelevantesMINadultos = data.min_abstencoes_adultos.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_adultos,
          qt_abstencao_adultos: item.qt_abstencao_adultos,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMAXadultos = data.max_abstencoes_adultos.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_adultos,
          qt_abstencao_adultos: item.qt_abstencao_adultos,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMINidosos = data.min_abstencoes_idosos.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.abstencao_idosos,
        qt_abstencao_idosos: item.qt_abstencao_idosos,
        municipio: item.municipio,
      };

      return valores;
    });
    const handleRelevantesMAXidosos = data.max_abstencoes_idosos.map((item) => {
      const valores = {
        AbstencaoRelevantes: item.abstencao_idosos,
        qt_abstencao_idosos: item.qt_abstencao_idosos,
        municipio: item.municipio,
      };

      return valores;
    });
    //--------------------------------------------------------------------------------------\\
    const handleRelevantesMINanalfabeto = data.min_abstencoes_analfabeto.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_analfabetos,
          qt_abstencao_analfabetos: item.qt_abstencao_analfabetos,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMAXanalfabeto = data.max_abstencoes_analfabeto.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_analfabetos,
          qt_abstencao_analfabetos: item.qt_abstencao_analfabetos,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMINmedioCompleto =
      data.min_abstencoes_medio_completo.map((item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_medio_completo,
          qt_abstencao_medio_completo: item.qt_abstencao_medio_completo,
          municipio: item.municipio,
        };

        return valores;
      });

    const handleRelevantesMAXmedioCompleto =
      data.max_abstencoes_medio_completo.map((item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_medio_completo,
          qt_abstencao_medio_completo: item.qt_abstencao_medio_completo,
          municipio: item.municipio,
        };

        return valores;
      });

    const handleRelevantesMINsuperiorCompleto =
      data.min_abstencoes_superior_completo.map((item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_superior_completo,
          qt_abstencao_superior_completo: item.qt_abstencao_superior_completo,
          municipio: item.municipio,
        };

        return valores;
      });

    const handleRelevantesMAXsuperiorCompleto =
      data.max_abstencoes_superior_completo.map((item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_superior_completo,
          qt_abstencao_superior_completo: item.qt_abstencao_superior_completo,
          municipio: item.municipio,
        };

        return valores;
      });

    const handleRelevantesMINcasados = data.min_abstencoes_casados.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_casados,
          qt_abstencao_casados: item.qt_abstencao_casados,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMAXcasados = data.max_abstencoes_casados.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_casados,
          qt_abstencao_casados: item.qt_abstencao_casados,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMINsolteiros = data.min_abstencoes_solteiros.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_solteiros,
          qt_abstencao_solteiros: item.qt_abstencao_solteiros,
          municipio: item.municipio,
        };

        return valores;
      }
    );

    const handleRelevantesMAXsolteiros = data.max_abstencoes_solteiros.map(
      (item) => {
        const valores = {
          AbstencaoRelevantes: item.abstencao_solteiros,
          qt_abstencao_solteiros: item.qt_abstencao_solteiros,
          municipio: item.municipio,
        };

        return valores;
      }
    );

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
      handleAbstencaoMax,
      handleAbstencaoMin,
      //-------------RELEVANTES---------------\\
      handleRelevantesMINJovens,
      handleRelevantesMAXJovens,
      handleRelevantesMAXadultos,
      handleRelevantesMINadultos,
      handleRelevantesMAXidosos,
      handleRelevantesMINidosos,

      handleRelevantesMAXanalfabeto,
      handleRelevantesMINanalfabeto,
      handleRelevantesMAXmedioCompleto,
      handleRelevantesMINmedioCompleto,
      handleRelevantesMAXsuperiorCompleto,
      handleRelevantesMINsuperiorCompleto,

      handleRelevantesMINcasados,
      handleRelevantesMAXcasados,
      handleRelevantesMINsolteiros,
      handleRelevantesMAXsolteiros,
      colors,
      borderColors
    );
    handleDataComparecimento(
      handleFaixaEtariaComparecimento,
      handleEstadoCivilComparecimento,
      handleEscolaridadeDeclaradaComparecimento,
      handleComparecimentoTotal,
      colors
    );

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
  function handleDataAbstencao(
    faixaEtaria,
    estadoCivil,
    escolaridadeDeclarada,
    abstencaoTotal,
    maioresAbstencao,
    menoresAbstencao,

    maxjovens,
    minjovens,
    maxadultos,
    minadultos,
    maxidosos,
    minidosos,

    maxanalfabeto,
    minanalfabeto,
    maxEMcompleto,
    minEMcompleto,
    maxSPRcompleto,
    minSPRcompleto,

    mincasados,
    maxcasados,
    minsolteiros,
    maxsolteiros,

    colors
  ) {
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
    const setDatasetAbstencaoPorEscolaridadeDeclarada =
      escolaridadeDeclarada.map((item, index) => {
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
      datasets: setDatasetAbstencaoPorEscolaridadeDeclarada.map(
        (item) => item.datasets
      ),
    };

    setEscolaridadeDeclaradaPorAbstencao(
      datasetAbstencaoPorEscolaridadeDeclarada
    );

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
      labels: [""],
      datasets: setDatasetAbstencaoTotal.map((item) => item.datasets),
    };

    setTotalAbstencao(datasetAbstencaoTotal);

    /*    --------------------------- FIM Total -----------------------------  */

    /*    --------------------------- INICIO Max -----------------------------  */
    const setDatasetMaxAbstencao = maioresAbstencao.map((item) => {
      var colors = randomColor({
        count: maioresAbstencao.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maioresAbstencao.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maioresAbstencao.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_min_abstencao,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMaxAbstencao = {
      labels: [""],
      datasets: setDatasetMaxAbstencao[0],
    };

    setMaxAbstencao(datasetMaxAbstencao);
    /*    --------------------------- FIM Max -----------------------------  */

    /*    --------------------------- INICIO Min -----------------------------  */

    const setDatasetMinAbstencao = menoresAbstencao.map((item) => {
      var colors = randomColor({
        count: menoresAbstencao.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: menoresAbstencao.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = menoresAbstencao.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_min_abstencao,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMinAbstencao = {
      labels: [""],
      datasets: setDatasetMinAbstencao[0],
    };

    setMinAbstencao(datasetMinAbstencao);
    /*    --------------------------- FIM Min -----------------------------  */

    const setDatasetMaxjovensAbstencao = maxjovens.map((item) => {
      var colors = randomColor({
        count: maxjovens.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxjovens.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxjovens.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_jovens,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMaxjovensAbstencao = {
      labels: [""],
      datasets: setDatasetMaxjovensAbstencao[0],
    };

    setMaxJovensAbstencao(datasetMaxjovensAbstencao);

    const setDatasetMinjovensAbstencao = minjovens.map((item) => {
      var colors = randomColor({
        count: minjovens.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minjovens.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minjovens.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_jovens,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMinjovensAbstencao = {
      labels: [""],
      datasets: setDatasetMinjovensAbstencao[0],
    };

    setMinJovensAbstencao(datasetMinjovensAbstencao);

    const setDatasetMaxadultosAbstencao = maxadultos.map((item) => {
      var colors = randomColor({
        count: maxadultos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxadultos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxadultos.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_adultos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMaxadultosAbstencao = {
      labels: [""],
      datasets: setDatasetMaxadultosAbstencao[0],
    };

    setMaxAdultosAbstencao(datasetMaxadultosAbstencao);

    const setDatasetMinadultosAbstencao = minadultos.map((item) => {
      var colors = randomColor({
        count: minadultos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minadultos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minadultos.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_adultos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMinadultosAbstencao = {
      labels: [""],
      datasets: setDatasetMinadultosAbstencao[0],
    };

    setMinAdultosAbstencao(datasetMinadultosAbstencao);

    const setDatasetMaxidososAbstencao = maxidosos.map((item) => {
      var colors = randomColor({
        count: maxidosos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxidosos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxidosos.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_idosos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMAXidososbstencao = {
      labels: [""],
      datasets: setDatasetMaxidososAbstencao[0],
    };

    setMaxIdososAbstencao(datasetMAXidososbstencao);

    const setDatasetMinidososAbstencao = minidosos.map((item) => {
      var colors = randomColor({
        count: minidosos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minidosos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minidosos.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_idosos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMINidososbstencao = {
      labels: [""],
      datasets: setDatasetMinidososAbstencao[0],
    };

    setMinIdososAbstencao(datasetMINidososbstencao);

    const setDatasetMaxAnalfabetoAbstencao = maxanalfabeto.map((item) => {
      var colors = randomColor({
        count: maxanalfabeto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxanalfabeto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxanalfabeto.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_analfabetos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMAXanalfabetobstencao = {
      labels: [""],
      datasets: setDatasetMaxAnalfabetoAbstencao[0],
    };

    setMaxAnalfabetoAbstencao(datasetMAXanalfabetobstencao);

    const setDatasetMinAnalfabetoAbstencao = minanalfabeto.map((item) => {
      var colors = randomColor({
        count: minanalfabeto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minanalfabeto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minanalfabeto.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_analfabetos,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMINanalfabetobstencao = {
      labels: [""],
      datasets: setDatasetMinAnalfabetoAbstencao[0],
    };

    setMinAnalfabetoAbstencao(datasetMINanalfabetobstencao);

    const setDatasetMAXmedioCompletoAbstencao = maxEMcompleto.map((item) => {
      var colors = randomColor({
        count: maxEMcompleto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxEMcompleto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxEMcompleto.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_medio_completo,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMaxMedioCompletoAbstencao = {
      labels: [""],
      datasets: setDatasetMAXmedioCompletoAbstencao[0],
    };

    setMaxMedioCompletoAbstencao(datasetMaxMedioCompletoAbstencao);

    const setDatasetMINmedioCompletoAbstencao = minEMcompleto.map((item) => {
      var colors = randomColor({
        count: minEMcompleto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minEMcompleto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minEMcompleto.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_medio_completo,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMinMedioCompletoAbstencao = {
      labels: [""],
      datasets: setDatasetMINmedioCompletoAbstencao[0],
    };

    setMinMedioCompletoAbstencao(datasetMinMedioCompletoAbstencao);

    const setDatasetMAXsuperiorCompletoAbstencao = maxSPRcompleto.map(
      (item) => {
        var colors = randomColor({
          count: maxSPRcompleto.length,
          luminosity: "bright",
          hue: "random",
          format: "rgba",
          alpha: 0.4,
        });
        var borderColors = {
          count: maxSPRcompleto.length,
          luminosity: "bright",
          hue: colors.hue,
          format: "rgba",
          alpha: 1,
        };
        const newDataset = maxSPRcompleto.map((valores, index) => {
          return {
            data: [valores.AbstencaoRelevantes],
            valor_inteiro: valores.qt_abstencao_superior_completo,
            label: valores.municipio,
            backgroundColor: [colors[index]],
            borderColor: [borderColors[index]],
            borderWidth: 2,
          };
        });
        return newDataset;
      }
    );

    const datasetMaxSuperiorCompletoAbstencao = {
      labels: [""],
      datasets: setDatasetMAXsuperiorCompletoAbstencao[0],
    };

    setMaxSuperiorCompletoAbstencao(datasetMaxSuperiorCompletoAbstencao);

    const setDatasetMINsuperiorCompletoAbstencao = minSPRcompleto.map(
      (item) => {
        var colors = randomColor({
          count: minSPRcompleto.length,
          luminosity: "bright",
          hue: "random",
          format: "rgba",
          alpha: 0.4,
        });
        var borderColors = {
          count: minSPRcompleto.length,
          luminosity: "bright",
          hue: colors.hue,
          format: "rgba",
          alpha: 1,
        };
        const newDataset = minSPRcompleto.map((valores, index) => {
          return {
            data: [valores.AbstencaoRelevantes],
            valor_inteiro: valores.qt_abstencao_superior_completo,
            label: valores.municipio,
            backgroundColor: [colors[index]],
            borderColor: [borderColors[index]],
            borderWidth: 2,
          };
        });
        return newDataset;
      }
    );

    const datasetMinSuperiorCompletoAbstencao = {
      labels: [""],
      datasets: setDatasetMINsuperiorCompletoAbstencao[0],
    };

    setMinSuperiorCompletoAbstencao(datasetMinSuperiorCompletoAbstencao);

    const setDatasetMincasadosAbstencao = mincasados.map((item) => {
      var colors = randomColor({
        count: mincasados.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: mincasados.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = mincasados.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_casados,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMINcasadosbstencao = {
      labels: [""],
      datasets: setDatasetMincasadosAbstencao[0],
    };

    setMinCasadosAbstencao(datasetMINcasadosbstencao);

    const setDatasetMaxcasadosAbstencao = maxcasados.map((item) => {
      var colors = randomColor({
        count: maxcasados.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxcasados.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxcasados.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_casados,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMAXcasadosbstencao = {
      labels: [""],
      datasets: setDatasetMaxcasadosAbstencao[0],
    };

    setMaxCasadosAbstencao(datasetMAXcasadosbstencao);

    const setDatasetMinsolteirosAbstencao = minsolteiros.map((item) => {
      var colors = randomColor({
        count: minsolteiros.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: minsolteiros.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = minsolteiros.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_solteiros,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMINsolteirosbstencao = {
      labels: [""],
      datasets: setDatasetMinsolteirosAbstencao[0],
    };

    setMinSolteirosAbstencao(datasetMINsolteirosbstencao);

    const setDatasetMaxsolteirosAbstencao = maxsolteiros.map((item) => {
      var colors = randomColor({
        count: maxsolteiros.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: maxsolteiros.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const newDataset = maxsolteiros.map((valores, index) => {
        return {
          data: [valores.AbstencaoRelevantes],
          valor_inteiro: valores.qt_abstencao_solteiros,
          label: valores.municipio,
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return newDataset;
    });

    const datasetMAXsolteirosbstencao = {
      labels: [""],
      datasets: setDatasetMaxsolteirosAbstencao[0],
    };

    setMaxSolteirosAbstencao(datasetMAXsolteirosbstencao);
  }

  // Modelando dados de Comparecimento
  function handleDataComparecimento(
    faixaEtaria,
    estadoCivil,
    escolaridadeDeclarada,
    comparecimentoTotal,
    colors
  ) {
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

    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setFaixaEtariaPorComparecimentoComparativo(
      datasetComparecimentoPorFaixaEtariaComparativo
    );
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

    setEstadoCivilPorComparecimentoComparativo(
      datasetComparecimentoPorEstadoCivilComparativo
    );

    /*    ----------------------- FIM Estado civil -----------------------  */

    /*    ------------------ INICIO Escolaridade Declarada ---------------  */

    const setDatasetComparecimentoPorEscolaridadeDeclaradaComparativo =
      escolaridadeDeclarada.map((item, index) => {
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

    const datasetComparecimentoPorEscolaridadeDeclaradaComparativo = {
      labels: escolaridadeDeclarada[0].categorias,
      datasets: setDatasetComparecimentoPorEscolaridadeDeclaradaComparativo.map(
        (item) => item.datasets
      ),
    };

    setEscolaridadeDeclaradaPorComparecimentoComparativo(
      datasetComparecimentoPorEscolaridadeDeclaradaComparativo
    );

    /*    -------------------- FIM Escolaridade Declarada ----------------  */

    /*    ------------------------- INICIO Total --------------------------  */
    const setDatasetComparecimentoTotal = comparecimentoTotal.map(
      (valores, index) => {
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
      }
    );

    const datasetComparecimentoTotal = {
      labels: [""],
      datasets: setDatasetComparecimentoTotal.map((item) => item.datasets),
    };

    setTotalComparecimento(datasetComparecimentoTotal);

    /*    --------------------------- FIM Total -----------------------------  */
  }

  return {
    filtrarDados,
    loading,
    filtroAplicado,
    opcoesVisiveis,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimentoComparativo,
    totalAbstencao,
    totalComparecimento,
    MaxAbsten,
    MinAbsten,

    Maxjovens,
    Minjovens,
    MaxAdultos,
    MinAdultos,
    MinIdosos,
    MaxIdosos,
    MaxAnalfabeto,
    MinAnalfabeto,
    MaxMedioCompleto,
    MinMedioCompleto,
    MaxSuperiorCompleto,
    MinSuperiorCompleto,
    MinCasados,
    MaxCasados,
    MinSolteiros,
    MaxSolteiros,
  };
  // dados e funções que são utilizados em
  // outros componentes e paginas por exemplo
  // a pagina de abstenção
}
