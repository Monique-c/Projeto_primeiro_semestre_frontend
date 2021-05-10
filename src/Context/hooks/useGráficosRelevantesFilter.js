import React, { useState } from "react";

import api from "../../services/api";
import relevantes from "../../controllers/gráficosRelevantes_json";

var randomColor = require("randomcolor");

export default function useFilter() {
    const [loading, setLoading] = useState(false);
    const [filtroAplicado, setFiltroAplicado] = useState(false);

    async function filtrarDados() {
        setLoading(true);
        setFiltroAplicado(false);

        const form = {
            municipios: [],
            colunas: [],
        };

        // const { data } = await api.post("pesquisas-relevantes", form);

        return handleData(relevantes);
    }

    function handleData(data) {
        var colors = randomColor({
            count: data.length,
            luminosity: "bright",
            hue: "random",
        });



        //Lugar para criar as const//


        handleDataRelevantes();


        setFiltroAplicado(true);


        setTimeout(function () {
            setLoading(false);
        }, 3000);

        return true;

    }
    //Lugar para modelar os gráficos//

    function handleDataRelevantes() {
        /* ----------------------- INICIO <CATEGORIA> -----------------------  */
        // const pra modelar o gráfico

        // Passando o gráfico modelado à variável que irá mostrá-lo em tela
        // Por Exemplo:  setFaixaEtariaPorAbstencao(datasetAbstencaoPorFaixaEtaria);

        /* ----------------------- FIM <CATEGORIA> -----------------------  */

    }


    return {
        loading,
        filtroAplicado,
        filtrarDados,
        //passa as const e funções q foram usadas para espelhar em outras pags
    }

}