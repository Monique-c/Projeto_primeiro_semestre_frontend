import React, { useState } from "react";

import api from "../../services/api";
import eleitorado from "../../controllers/eleitorado_json";

var randomColor = require("randomcolor");

export default function useFilter() {
  const [loading, setLoading] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [faixaEtariaEleitorado, setEleitoradoPorFaixa] = useState([]);
  const [estadoCivilEleitorado, setEleitoradoPorEstadoCivil] = useState([]);
  const [grauEscolarEleitorado, setEleitoradoPorGrauEscolar] = useState([]);


  //const [
    //faixaEtariaEleitoradoComparativo,
    //setFaixaEtariaEleitoradoComparativo,
  //] = useState([]);

  async function filtrarDados() {
    setLoading(true);
    setFiltroAplicado(false);

    const form = {
      cidade: ["SÃO PAULO"],
    };


    return handleData(eleitorado);
  }

  function handleData(data) {
    var colors = randomColor({
      count: data.length,
      luminosity: "bright",
      hue: "random",
    });




    const handleFaixaEleitorado = data.map((item) =>{
      const valores = item.faixa_etaria.map(
        (elt) =>  elt.soma_eleitores_perfil //para x valor
      );
      const index = item.faixa_etaria.map(
        (elt) => elt.desc_faixa_etaria//para y titulo
      );

      return {
        municipio: item.municipio,
        valores,
        index,

      };
    });

    const handleEstadoCivilEleitorado = data.map((item) =>{
      const valores = item.estado_civil.map(
        (elt) =>  elt.soma_eleitores_perfil //para x valor
      );
      const index = item.estado_civil.map(
        (elt) => elt.desc_estado_civil//para y titulo
      );

      return {
        municipio: item.municipio,
        valores,
        index,

      };
    });

    const handleGrauEscolarEleitorado = data.map((item) =>{
      const valores = item.grau_escolaridade.map(
        (elt) =>  elt.soma_eleitores_perfil //para x valor
      );
      const index = item.grau_escolaridade.map(
        (elt) => elt.desc_grau_escolaridade//para y titulo
      );

      return {
        municipio: item.municipio,
        valores,
        index,

      };
    });


    handleDataGrauEscolar(handleGrauEscolarEleitorado, colors )
    handleDataEstadoCivil(handleEstadoCivilEleitorado, colors)
    handleDataEleitorado(handleFaixaEleitorado, colors);


    setFiltroAplicado(true);
    setTimeout(function () {
      setLoading(false);
    }, 3000);

    return true;
  }
//---------------------------------------------------------------------------------------------
  function handleDataEleitorado(faixaEtaria, colors){//função que lida com os dados
   const setDatasetEleitoradoFaixaEtaria= faixaEtaria.map((item,index) => {
     const newDatase = {
      data: item.valores,
      label: item.municipio,
      backgroundColor: colors[index],
     }
     return{
       datasets : newDatase,
     };
   });

   const DatasetEleitoradoFaixa = {
    labels: faixaEtaria[0].index,
    datasets: setDatasetEleitoradoFaixaEtaria.map((item) => item.datasets)
   };


   setEleitoradoPorFaixa(DatasetEleitoradoFaixa);
  }
//---------------------------------------------------------------------------------------------
  function handleDataEstadoCivil(EstadoCivil, colors){//função que lida com os dados
    const setDatasetEleitoradoEstadoCivil= EstadoCivil.map((item,index) => {
      const newDatase = {
       data: item.valores,
       label: item.municipio,
       backgroundColor: colors[index],
      }
      return{
        datasets : newDatase,
      };
    });

    const DatasetEleitoradoEstadoCivil = {
     labels: EstadoCivil[0].index,
     datasets: setDatasetEleitoradoEstadoCivil.map((item) => item.datasets)
    };


    setEleitoradoPorEstadoCivil(DatasetEleitoradoEstadoCivil);
   }
//---------------------------------------------------------------------------------------------
   function handleDataGrauEscolar(GrauEscolar, colors){//função que lida com os dados
    const setDatasetEleitoradoGrauEscolar= GrauEscolar.map((item,index) => {
      const newDatase = {
       data: item.valores,
       label: item.municipio,
       backgroundColor: colors[index],
      }
      return{
        datasets : newDatase,
      };
    });

    const DatasetEleitoradoGrauEscolar = {
     labels: GrauEscolar[0].index,
     datasets: setDatasetEleitoradoGrauEscolar.map((item) => item.datasets)
    };


    setEleitoradoPorGrauEscolar(DatasetEleitoradoGrauEscolar);
   }
//---------------------------------------------------------------------------------------------
  return {
    filtroAplicado,
    loading,
    filtrarDados,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,

  };

}





