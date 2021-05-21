import React, { useState } from "react";

import api from "../../services/api";
import eleitorado from "../../controllers/eleitorado_atualizado_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [opcoesVisiveis, setOpcoesVisiveis] = useState({});

  const [faixaEtariaEleitorado, setEleitoradoPorFaixa] = useState([]);
  const [estadoCivilEleitorado, setEleitoradoPorEstadoCivil] = useState([]);
  const [grauEscolarEleitorado, setEleitoradoPorGrauEscolar] = useState([]);
  const [NomeSocialEleitorado, setEleitoradoPorNomeSocial] = useState([]);

  const [MaxEleitJovens, setMaxEleitJovens] = useState([]);
  const [MinEleitJovens, setMinEleitJovens] = useState([]);

  async function filtrarDados(form, opcoes) {
    setLoading(true);
    setFiltroAplicado(false);
    setOpcoesVisiveis(opcoes);

    try {
      // const { data } = await api.post("pesquisas-eleitorado", form);

      return handleData(eleitorado);
    } catch (err) {
      console.log("err: " + err);
    }
  }

  function handleData(data) {
    var colors = randomColor({
      count: data.eleitorado.length,
      luminosity: "bright",
      hue: "random",
      format: "rgba",
      alpha: 0.4,
    });
    var borderColors = {
      count: data.length,
      luminosity: "bright",
      hue: colors.hue,
      format: "rgba",
      alpha: 1,
    };

    const handleFaixaEleitorado = data.eleitorado.map((item) => {
      const valores = item.faixa_etaria.map(
        (elt) => elt.soma_eleitores_perfil //para x valor
      );
      const index = item.faixa_etaria.map(
        (elt) => elt.desc_faixa_etaria.trim() //para y titulo
      );
      return {
        municipio: item.municipio,
        valores,
        index,
      };
    });

    const handleEstadoCivilEleitorado = data.eleitorado.map((item) => {
      const valores = item.estado_civil.map(
        (elt) => elt.soma_eleitores_perfil //para x valor
      );
      const index = item.estado_civil.map(
        (elt) => elt.desc_estado_civil //para y titulo
      );

      return {
        municipio: item.municipio,
        valores,
        index,
      };
    });

    const handleGrauEscolarEleitorado = data.eleitorado.map((item) => {
      const valores = item.grau_escolaridade.map(
        (elt) => elt.soma_eleitores_perfil //para x valor
      );
      const index = item.grau_escolaridade.map(
        (elt) => elt.desc_grau_escolaridade //para y titulo
      );

      return {
        municipio: item.municipio,
        valores,
        index,
      };
    });

    const handleNomeSocialEleitorado = data.eleitorado.map((item) => {
      const valores = {
        NomeSocial: item.QT_ELEITORES_INC_NM_SOCIAL,
        municipio: item.municipio,
      };
      return valores;
    });

    const handleMaxEleitoradoJovens = data.max_eleitorado_jovens.map(
      (eleMaxJov) => {
        const municipios = {
          max_eleitorado_jovens: eleMaxJov.porcentagem_eleitorado_jovens,
          municipio: eleMaxJov.municipio,
        };
        return municipios;
      }
    );
    const handleMinEleitoradoJovens = data.min_eleitorado_jovens.map(
      (eleMinJov) => {
        const municipios = {
          min_eleitorado_jovens: eleMinJov.porcentagem_eleitorado_jovens,
          municipio: eleMinJov.municipio,
        };
        console.log(municipios);
        return municipios;
      }
    );

    handleDataNomeSocial(handleNomeSocialEleitorado, colors, borderColors);
    handleDataGrauEscolar(handleGrauEscolarEleitorado, colors, borderColors);
    handleDataEstadoCivil(handleEstadoCivilEleitorado, colors, borderColors);
    handleDataEleitorado(handleFaixaEleitorado, colors, borderColors);
    handleDataMaxEleitoradoJovens(handleMaxEleitoradoJovens);
    handleDataMinEleitoradoJovens(handleMinEleitoradoJovens);

    setFiltroAplicado(true);
    setTimeout(function () {
      setLoading(false);
    }, 3000);

    return true;
  }

  //---------------------------------------------------------------------------------------------
  function handleDataEleitorado(faixaEtaria, colors, borderColors) {
    //função que lida com os dados
    const setDatasetEleitoradoFaixaEtaria = faixaEtaria.map((item, index) => {
      const newDatase = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2,
      };
      return {
        datasets: newDatase,
      };
    });

    const DatasetEleitoradoFaixa = {
      labels: faixaEtaria[0].index,
      datasets: setDatasetEleitoradoFaixaEtaria.map((item) => item.datasets),
    };

    setEleitoradoPorFaixa(DatasetEleitoradoFaixa);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataEstadoCivil(EstadoCivil, colors, borderColors) {
    //função que lida com os dados
    const setDatasetEleitoradoEstadoCivil = EstadoCivil.map((item, index) => {
      const newDatase = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2,
      };
      return {
        datasets: newDatase,
      };
    });

    const DatasetEleitoradoEstadoCivil = {
      labels: EstadoCivil[0].index,
      datasets: setDatasetEleitoradoEstadoCivil.map((item) => item.datasets),
    };

    setEleitoradoPorEstadoCivil(DatasetEleitoradoEstadoCivil);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataGrauEscolar(GrauEscolar, colors, borderColors) {
    //função que lida com os dados
    const setDatasetEleitoradoGrauEscolar = GrauEscolar.map((item, index) => {
      const newDatase = {
        data: item.valores,
        label: item.municipio,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2,
      };
      return {
        datasets: newDatase,
      };
    });

    const DatasetEleitoradoGrauEscolar = {
      labels: GrauEscolar[0].index,
      datasets: setDatasetEleitoradoGrauEscolar.map((item) => item.datasets),
    };

    setEleitoradoPorGrauEscolar(DatasetEleitoradoGrauEscolar);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataNomeSocial(NomeSocial, colors, borderColors) {
    //função que lida com os dados
    const setDatasetEleitoradoNomeSocial = NomeSocial.map((val, index) => {
      const newDatase = {
        data: [val.NomeSocial],
        label: val.municipio,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2,
      };
      return {
        datasets: newDatase,
      };
    });

    const DatasetEleitoradoNomeSocial = {
      labels: [""],
      datasets: setDatasetEleitoradoNomeSocial.map((item) => item.datasets),
    };

    setEleitoradoPorNomeSocial(DatasetEleitoradoNomeSocial);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoJovens(MaxEleitJovens) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMaxEleitJovens = MaxEleitJovens.map((item) => {
      console.log(MaxEleitJovens);
      var colors = randomColor({
        count: MaxEleitJovens.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitJovens.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitJovens.map((municipios, index) => {
        console.log(municipios);
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_jovens],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitJovens = {
      labels: [""],
      datasets: setdatasetMaxEleitJovens[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMaxEleitJovens(datasetMaxEleitJovens);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoJovens(MinEleitJovens) {
    /* ----------------------- INICIO -----------------------  */
    const setdatasetMinEleitJovens = MinEleitJovens.map((item) => {
      var colors = randomColor({
        count: MinEleitJovens.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitJovens.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitJovens.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_jovens],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitJovens = {
      labels: [""],
      datasets: setdatasetMinEleitJovens[0],
    };
    // Passando o gráfico modelado à variável que irá mostrá-lo em tela
    setMinEleitJovens(datasetMinEleitJovens);
  }
  //---------------------------------------------------------------------------------------------
  return {
    filtroAplicado,
    opcoesVisiveis,
    loading,
    filtrarDados,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
    MaxEleitJovens,
    MinEleitJovens,
  };
}
