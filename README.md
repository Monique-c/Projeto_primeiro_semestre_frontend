# Frontend

Neste guia iremos configurar o ambiente de desenvolvimento com a instalação do nodeJS, clonar o projeto do gitHub, instalação das dependências do projeto, e explicação da estrutura das pastas.

---

<br/>
<br/>

# Guias

[Instalação das ferramentas](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535)

[Atualização (versões diferentes)](https://www.notion.so/Atualiza-o-vers-es-diferentes-09abff4d88d44c459a7c7a925ad15bfa)

[Tive problemas, e agora?](https://www.notion.so/Tive-problemas-e-agora-c67378e1319d4723a3211aad8eb987c6)

<br/>

# Clonando projeto

Em qualquer lugar de sua preferência:

```bash
git clone https://github.com/fa-API-Group-02/web
```

**Abra o projeto no vsCode**

```bash
cd web
code .
```

# Instalação das dependências do projeto

As dependências que serão instaladas estão listadas no package.json

```bash
npm install
```

Emular o projeto

```bash
npm start
```

<br/>
<br/>

# Explicação da estrutura das pastas

| Pasta             | Definição                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public            | Pasta pública do projeto acessível ao público geral por meio de um servidor web                                                                                                    |
| src/assets        | Pasta de arquivos visuais como imagens, estilização (css), componentes, fonts, lottieJSONs, scss etc.                                                                              |
| src/assets/styles | Estilização das páginas do projeto                                                                                                                                                 |
| src/components    | Código fonte dos componentes do projeto como o Card de filtro das páginas, Navbars, Footers, etc.                                                                                  |
| src/pages         | Código fonte das páginas do projeto                                                                                                                                                |
| src/services      | Arquivo de serviços externos utilizados no projeto como a API do IBGE e a nossa API                                                                                                |
| src/store         | Pasta contendo toda a configuração dos React-Redux utilizados para a sintonização entre os componentes filhos para pais (Card de filtro para página)                               |
| src/index.js      | Principal arquivo do projeto onde está configurado o sistema de rotas, é neste arquivo que você deve importar uma página nova para que ela possa ser visualizada em seu navegador. |
| package.json      | Contém metadados relevantes para o projeto e é usado para gerenciar as dependências do projeto, scripts, versão e muito mais                                                       |
| node_modules      | Armazena as bibliotecas (dependências) do projeto                                                                                                                                  |

<br/>

**Documentações**

[ReactJS](https://pt-br.reactjs.org/)

[Chart.js](https://www.chartjs.org/)

[React Chart.js Component Examples](https://reactchartjs.github.io/react-chartjs-2/#/)

<br/>
<br/>

_Bora codar 🚀_
