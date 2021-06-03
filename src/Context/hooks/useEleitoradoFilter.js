import React, { useState } from "react";

import api from "../../services/api";
import eleitorado from "../../controllers/eleitorado_json";

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
  const [MaxEleitAdultos, setMaxEleitAdultos] = useState([]);
  const [MinEleitAdultos, setMinEleitAdultos] = useState([]);
  const [MaxEleitIdosos, setMaxEleitIdosos] = useState([]);
  const [MinEleitIdosos, setMinEleitIdosos] = useState([]);

  const [MaxEleitSupComp, setMaxEleitSupComp] = useState([]);
  const [MinEleitSupComp, setMinEleitSupComp] = useState([]);
  const [MaxEleitMedComp, setMaxEleitMedComp] = useState([]);
  const [MinEleitMedComp, setMinEleitMedComp] = useState([]);
  const [MaxEleitAnalfabeto, setMaxEleitAnalfabeto] = useState([]);
  const [MinEleitAnalfabeto, setMinEleitAnalfabeto] = useState([]);

  const [MaxEleitCasados, setMaxEleitCasados] = useState([]);
  const [MinEleitCasados, setMinEleitCasados] = useState([]);
  const [MaxEleitSolteiros, setMaxEleitSolteiros] = useState([]);
  const [MinEleitSolteiros, setMinEleitSolteiros] = useState([]);

  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------

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

  //---------------------------------------------------------------------------------------------

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

    //---------------------------------------------------------------------------------------------

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

    //---------------------------------------------------------------------------------------------

    const handleMaxEleitoradoJovens = data.max_eleitorado_jovens.map(
      (eleMaxJov) => {
        const municipios = {
          max_eleitorado_jovens: eleMaxJov.porcentagem_eleitorado_jovens,
          valor_eleitorado_jovens: eleMaxJov.valor_eleitorado_jovens,
          municipio: eleMaxJov.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoJovens = data.min_eleitorado_jovens.map(
      (eleMinJov) => {
        const municipios = {
          min_eleitorado_jovens: eleMinJov.porcentagem_eleitorado_jovens,
          valor_eleitorado_jovens: eleMinJov.valor_eleitorado_jovens,
          municipio: eleMinJov.municipio,
        };
        return municipios;
      }
    );

    const handleMaxEleitoradoAdultos = data.max_eleitorado_adultos.map(
      (eleMaxAdu) => {
        const municipios = {
          max_eleitorado_adultos: eleMaxAdu.porcentagem_eleitorado_adultos,
          valor_eleitorado_adultos: eleMaxAdu.valor_eleitorado_adultos,
          municipio: eleMaxAdu.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoAdultos = data.min_eleitorado_adultos.map(
      (eleMinAdu) => {
        const municipios = {
          min_eleitorado_adultos: eleMinAdu.porcentagem_eleitorado_adultos,
          valor_eleitorado_adultos: eleMinAdu.valor_eleitorado_adultos,
          municipio: eleMinAdu.municipio,
        };
        return municipios;
      }
    );

    const handleMaxEleitoradoIdosos = data.max_eleitorado_idosos.map(
      (eleMaxIdo) => {
        const municipios = {
          max_eleitorado_idosos: eleMaxIdo.porcentagem_eleitorado_idosos,
          valor_eleitorado_idosos: eleMaxIdo.valor_eleitorado_idosos,
          municipio: eleMaxIdo.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoIdosos = data.min_eleitorado_idosos.map(
      (eleMinIdo) => {
        const municipios = {
          min_eleitorado_idosos: eleMinIdo.porcentagem_eleitorado_idosos,
          valor_eleitorado_idosos: eleMinIdo.valor_eleitorado_idosos,
          municipio: eleMinIdo.municipio,
        };
        return municipios;
      }
    );
    //---------------------------------------------------------------------------------------------
    const handleMaxEleitoradoSupComp =
      data.max_eleitorado_superior_completo.map((eleMaxSupComp) => {
        const municipios = {
          max_eleitorado_superior_completo:
            eleMaxSupComp.porcentagem_eleitorado_superior_completo,
          valor_eleitorado_superior_completo:
            eleMaxSupComp.valor_eleitorado_superior_completo,
          municipio: eleMaxSupComp.municipio,
        };
        return municipios;
      });

    const handleMinEleitoradoSupComp =
      data.min_eleitorado_superior_completo.map((eleMinSupComp) => {
        const municipios = {
          min_eleitorado_superior_completo:
            eleMinSupComp.porcentagem_eleitorado_superior_completo,
          valor_eleitorado_superior_completo:
            eleMinSupComp.valor_eleitorado_superior_completo,
          municipio: eleMinSupComp.municipio,
        };
        return municipios;
      });

    const handleMaxEleitoradoMedComp = data.max_eleitorado_medio_completo.map(
      (eleMaxMedComp) => {
        const municipios = {
          max_eleitorado_medio_completo:
            eleMaxMedComp.porcentagem_eleitorado_medio_completo,
          valor_eleitorado_medio_completo:
            eleMaxMedComp.valor_eleitorado_medio_completo,
          municipio: eleMaxMedComp.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoMedComp = data.min_eleitorado_medio_completo.map(
      (eleMinMedComp) => {
        const municipios = {
          min_eleitorado_medio_completo:
            eleMinMedComp.porcentagem_eleitorado_medio_completo,
          valor_eleitorado_medio_completo:
            eleMinMedComp.valor_eleitorado_medio_completo,
          municipio: eleMinMedComp.municipio,
        };
        return municipios;
      }
    );

    const handleMaxEleitoradoAnalfabeto = data.max_eleitorado_analfabeto.map(
      (eleMaxAnf) => {
        const municipios = {
          max_eleitorado_analfabeto:
            eleMaxAnf.porcentagem_eleitorado_analfabeto,
          valor_eleitorado_analfabeto: eleMaxAnf.valor_eleitorado_analfabeto,
          municipio: eleMaxAnf.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoAnalfabeto = data.min_eleitorado_analfabeto.map(
      (eleMinAnf) => {
        const municipios = {
          min_eleitorado_analfabeto:
            eleMinAnf.porcentagem_eleitorado_analfabeto,
          valor_eleitorado_analfabeto: eleMinAnf.valor_eleitorado_analfabeto,
          municipio: eleMinAnf.municipio,
        };
        return municipios;
      }
    );
    //---------------------------------------------------------------------------------------------
    const handleMaxEleitoradoCasados = data.max_eleitorado_casados.map(
      (eleMaxCasados) => {
        const municipios = {
          max_eleitorado_casados: eleMaxCasados.porcentagem_eleitorado_casados,
          valor_eleitorado_casados: eleMaxCasados.valor_eleitorado_casados,
          municipio: eleMaxCasados.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoCasados = data.min_eleitorado_casados.map(
      (eleMinCasados) => {
        const municipios = {
          min_eleitorado_casados: eleMinCasados.porcentagem_eleitorado_casados,
          valor_eleitorado_casados: eleMinCasados.valor_eleitorado_casados,
          municipio: eleMinCasados.municipio,
        };
        return municipios;
      }
    );

    const handleMaxEleitoradoSolteiros = data.max_eleitorado_solteiros.map(
      (eleMaxSolteiros) => {
        const municipios = {
          max_eleitorado_solteiros:
            eleMaxSolteiros.porcentagem_eleitorado_solteiros,
          valor_eleitorado_solteiros:
            eleMaxSolteiros.valor_eleitorado_solteiros,
          municipio: eleMaxSolteiros.municipio,
        };
        return municipios;
      }
    );

    const handleMinEleitoradoSolteiros = data.min_eleitorado_solteiros.map(
      (eleMinSolteiros) => {
        const municipios = {
          min_eleitorado_solteiros:
            eleMinSolteiros.porcentagem_eleitorado_solteiros,
          valor_eleitorado_solteiros:
            eleMinSolteiros.valor_eleitorado_solteiros,
          municipio: eleMinSolteiros.municipio,
        };
        return municipios;
      }
    );
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    handleDataNomeSocial(handleNomeSocialEleitorado, colors, borderColors);
    handleDataGrauEscolar(handleGrauEscolarEleitorado, colors, borderColors);
    handleDataEstadoCivil(handleEstadoCivilEleitorado, colors, borderColors);
    handleDataEleitorado(handleFaixaEleitorado, colors, borderColors);
    //---------------------------------------------------------------------------------------------
    handleDataMaxEleitoradoJovens(handleMaxEleitoradoJovens);
    handleDataMinEleitoradoJovens(handleMinEleitoradoJovens);
    handleDataMaxEleitoradoAdultos(handleMaxEleitoradoAdultos);
    handleDataMinEleitoradoAdultos(handleMinEleitoradoAdultos);
    handleDataMaxEleitoradoIdosos(handleMaxEleitoradoIdosos);
    handleDataMinEleitoradoIdosos(handleMinEleitoradoIdosos);
    //---------------------------------------------------------------------------------------------
    handleDataMaxEleitoradoSupComp(handleMaxEleitoradoSupComp);
    handleDataMinEleitoradoSupComp(handleMinEleitoradoSupComp);
    handleDataMaxEleitoradoMedComp(handleMaxEleitoradoMedComp);
    handleDataMinEleitoradoMedComp(handleMinEleitoradoMedComp);
    handleDataMaxEleitoradoAnalfabeto(handleMaxEleitoradoAnalfabeto);
    handleDataMinEleitoradoAnalfabeto(handleMinEleitoradoAnalfabeto);
    //---------------------------------------------------------------------------------------------
    handleDataMaxEleitoradoCasados(handleMaxEleitoradoCasados);
    handleDataMinEleitoradoCasados(handleMinEleitoradoCasados);
    handleDataMaxEleitoradoSolteiros(handleMaxEleitoradoSolteiros);
    handleDataMinEleitoradoSolteiros(handleMinEleitoradoSolteiros);
    //---------------------------------------------------------------------------------------------

    setFiltroAplicado(true);
    setTimeout(function () {
      setLoading(false);
    }, 3000);

    return true;
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  function handleDataEleitorado(faixaEtaria, colors, borderColors) {
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
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoJovens(MaxEleitJovens) {
    const setdatasetMaxEleitJovens = MaxEleitJovens.map((item) => {
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
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_jovens],
          banana: municipios.valor_eleitorado_jovens,
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
    setMaxEleitJovens(datasetMaxEleitJovens);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoJovens(MinEleitJovens) {
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
    setMinEleitJovens(datasetMinEleitJovens);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoAdultos(MaxEleitAdultos) {
    const setdatasetMaxEleitAdultos = MaxEleitAdultos.map((item) => {
      var colors = randomColor({
        count: MaxEleitAdultos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitAdultos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitAdultos.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_adultos],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitAdultos = {
      labels: [""],
      datasets: setdatasetMaxEleitAdultos[0],
    };
    setMaxEleitAdultos(datasetMaxEleitAdultos);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoAdultos(MinEleitAdultos) {
    const setdatasetMinEleitAdultos = MinEleitAdultos.map((item) => {
      var colors = randomColor({
        count: MinEleitAdultos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitAdultos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitAdultos.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_adultos],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitAdultos = {
      labels: [""],
      datasets: setdatasetMinEleitAdultos[0],
    };
    setMinEleitAdultos(datasetMinEleitAdultos);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoIdosos(MaxEleitIdosos) {
    const setdatasetMaxEleitIdosos = MaxEleitIdosos.map((item) => {
      var colors = randomColor({
        count: MaxEleitIdosos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitIdosos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitIdosos.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_idosos],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitIdosos = {
      labels: [""],
      datasets: setdatasetMaxEleitIdosos[0],
    };
    setMaxEleitIdosos(datasetMaxEleitIdosos);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoIdosos(MinEleitIdosos) {
    const setdatasetMinEleitIdosos = MinEleitIdosos.map((item) => {
      var colors = randomColor({
        count: MinEleitIdosos.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitIdosos.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitIdosos.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_idosos],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitIdosos = {
      labels: [""],
      datasets: setdatasetMinEleitIdosos[0],
    };
    setMinEleitIdosos(datasetMinEleitIdosos);
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoSupComp(MaxEleitSupComp) {
    const setdatasetMaxEleitSupComp = MaxEleitSupComp.map((item) => {
      var colors = randomColor({
        count: MaxEleitSupComp.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitSupComp.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitSupComp.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_superior_completo],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitSupComp = {
      labels: [""],
      datasets: setdatasetMaxEleitSupComp[0],
    };
    setMaxEleitSupComp(datasetMaxEleitSupComp);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoSupComp(MinEleitSupComp) {
    const setdatasetMinEleitSupComp = MinEleitSupComp.map((item) => {
      var colors = randomColor({
        count: MinEleitSupComp.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitSupComp.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitSupComp.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_superior_completo],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitSupComp = {
      labels: [""],
      datasets: setdatasetMinEleitSupComp[0],
    };
    setMinEleitSupComp(datasetMinEleitSupComp);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoMedComp(MaxEleitMedComp) {
    const setdatasetMaxEleitMedComp = MaxEleitMedComp.map((item) => {
      var colors = randomColor({
        count: MaxEleitMedComp.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitMedComp.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitMedComp.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_medio_completo],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitMedComp = {
      labels: [""],
      datasets: setdatasetMaxEleitMedComp[0],
    };
    setMaxEleitMedComp(datasetMaxEleitMedComp);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoMedComp(MinEleitMedComp) {
    const setdatasetMinEleitMedComp = MinEleitMedComp.map((item) => {
      var colors = randomColor({
        count: MinEleitMedComp.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitMedComp.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitMedComp.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_medio_completo],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitMedComp = {
      labels: [""],
      datasets: setdatasetMinEleitMedComp[0],
    };
    setMinEleitMedComp(datasetMinEleitMedComp);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoAnalfabeto(MaxEleitAnalfabeto) {
    const setdatasetMaxEleitAnalfabeto = MaxEleitAnalfabeto.map((item) => {
      var colors = randomColor({
        count: MaxEleitAnalfabeto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitAnalfabeto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitAnalfabeto.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_analfabeto],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitAnalfabeto = {
      labels: [""],
      datasets: setdatasetMaxEleitAnalfabeto[0],
    };
    setMaxEleitAnalfabeto(datasetMaxEleitAnalfabeto);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoAnalfabeto(MinEleitAnalfabeto) {
    const setdatasetMinEleitAnalfabeto = MinEleitAnalfabeto.map((item) => {
      var colors = randomColor({
        count: MinEleitAnalfabeto.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitAnalfabeto.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitAnalfabeto.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_analfabeto],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitAnalfabeto = {
      labels: [""],
      datasets: setdatasetMinEleitAnalfabeto[0],
    };
    setMinEleitAnalfabeto(datasetMinEleitAnalfabeto);
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoCasados(MaxEleitCasados) {
    const setdatasetMaxEleitCasados = MaxEleitCasados.map((item) => {
      var colors = randomColor({
        count: MaxEleitCasados.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitCasados.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitCasados.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_casados],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitCasados = {
      labels: [""],
      datasets: setdatasetMaxEleitCasados[0],
    };
    setMaxEleitCasados(datasetMaxEleitCasados);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoCasados(MinEleitCasados) {
    const setdatasetMinEleitCasados = MinEleitCasados.map((item) => {
      var colors = randomColor({
        count: MinEleitCasados.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitCasados.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitCasados.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_casados],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitCasados = {
      labels: [""],
      datasets: setdatasetMinEleitCasados[0],
    };
    setMinEleitCasados(datasetMinEleitCasados);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMaxEleitoradoSolteiros(MaxEleitSolteiros) {
    const setdatasetMaxEleitSolteiros = MaxEleitSolteiros.map((item) => {
      var colors = randomColor({
        count: MaxEleitSolteiros.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MaxEleitSolteiros.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };
      const dataset = MaxEleitSolteiros.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.max_eleitorado_solteiros],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMaxEleitSolteiros = {
      labels: [""],
      datasets: setdatasetMaxEleitSolteiros[0],
    };
    setMaxEleitSolteiros(datasetMaxEleitSolteiros);
  }
  //---------------------------------------------------------------------------------------------
  function handleDataMinEleitoradoSolteiros(MinEleitSolteiros) {
    const setdatasetMinEleitSolteiros = MinEleitSolteiros.map((item) => {
      var colors = randomColor({
        count: MinEleitSolteiros.length,
        luminosity: "bright",
        hue: "random",
        format: "rgba",
        alpha: 0.4,
      });
      var borderColors = {
        count: MinEleitSolteiros.length,
        luminosity: "bright",
        hue: colors.hue,
        format: "rgba",
        alpha: 1,
      };

      const dataset = MinEleitSolteiros.map((municipios, index) => {
        return {
          label: municipios.municipio,
          data: [municipios.min_eleitorado_solteiros],
          backgroundColor: [colors[index]],
          borderColor: [borderColors[index]],
          borderWidth: 2,
        };
      });
      return dataset;
    });

    const datasetMinEleitSolteiros = {
      labels: [""],
      datasets: setdatasetMinEleitSolteiros[0],
    };
    setMinEleitSolteiros(datasetMinEleitSolteiros);
  }
  //---------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  return {
    filtroAplicado,
    opcoesVisiveis,
    loading,
    filtrarDados,
    //---------------------------------
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
    //---------------------------------
    MaxEleitJovens,
    MinEleitJovens,
    MaxEleitAdultos,
    MinEleitAdultos,
    MaxEleitIdosos,
    MinEleitIdosos,
    //---------------------------------
    MaxEleitSupComp,
    MinEleitSupComp,
    MaxEleitMedComp,
    MinEleitMedComp,
    MaxEleitAnalfabeto,
    MinEleitAnalfabeto,
    //---------------------------------
    MaxEleitCasados,
    MinEleitCasados,
    MaxEleitSolteiros,
    MinEleitSolteiros,
  };
}
