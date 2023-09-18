<script setup>
import { onMounted } from 'vue'
import Tables from './Tables.vue';
import BotaoAbrirPdfVue from './BotaoAbrirPdf.vue';
import Interaction from './Interaction.vue'

import GraficoCorAparente from './graficos/GraficoCorAparente.vue';
import GraficoPH from './graficos/GraficoPH.vue'
import GraficoTurbidez from './graficos/GraficoTurbidez.vue'
import GraficoPotabilidade from './graficos/GraficoPotabilidade.vue'
onMounted(() => {
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
  })
})
</script>

<template>
  <body>
    <div class="container-personalizado">
      <div class="row conteudo">
        <div class="col-3">
          <nav id="navbar-example3"
            class="navbar navbar-light bg-light flex-column align-items-start justify-content-start p-3">
            <a class="navbar-brand" href="#titulo">Inicio</a>
            <nav class="nav nav-pills flex-column">
              <a class="nav-link" href="#item-1">Introdução</a>
              <nav class="nav nav-pills flex-column">
                <a class="nav-link ms-3 my-1" href="#item-1-1">Objetivo</a>
              </nav>
              <a class="nav-link" href="#item-2">Aplicação do SBRF na Qualidade da Água</a>
              <nav class="nav nav-pills flex-column">
                <a class="nav-link ms-3 my-1" href="#item-2-1">Variáveis de Entrada</a>
                <a class="nav-link ms-3 my-1" href="#item-2-2">Variável de Saída</a>
              </nav>
              <a class="nav-link" href="#item-3">Graficos</a>
              <nav class="nav nav-pills flex-column">
                <a class="nav-link ms-3 my-1" href="#item-3-1">Cor Aparente</a>
                <a class="nav-link ms-3 my-1" href="#item-3-2">PH</a>
                <a class="nav-link ms-3 my-1" href="#item-3-3">Turbidez</a>
              </nav>
              <a class="nav-link" href="#item-4">A Base de regras</a>
              <nav class="nav nav-pills flex-column">
                <a class="nav-link ms-3 my-1" href="#item-4-1">Tabelas de Regras</a>
              </nav>
              <a class="nav-link" href="#item-5">Simulação</a>
            </nav>
          </nav>
        </div>
        <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0" class="col scrollSpy">
          <h1 id="titulo" class="py-5 text-center">Sistema baseado em regras fuzzy para avaliação da qualidade da água
          </h1>
          <h4 id="item-1">Introdução</h4>
          <p>Segundo a <b>ANA (Agencia Nacional de Aguas)</b>, um dos maiores problemas deste século e das futuras
            gerações será
            manter a qualidade da água potável, elemento essencial para a vida humana.
            Um relatório da ANA apresentado em 2017 mostra um quadro preocupante da disponibilidade e do uso dos recursos
            hídricos em todo território brasileiro. De acordo com este relatório, se nada for feito nestes próximos anos,
            cerca de 55% dos municípios poderão sofrer com a escassez dos recursos ainda neste século. O informativo da
            ANA destaca que a qualidade da água é muito pior nas regiões de grande concentração populacional. Além disso,
            para a ANA os desafios da gestão pública dos recursos hídricos são grandes e tem que estar focados
            essencialmente em dois quesitos: tratamento adequado do esgoto urbano e investimentos em sistemas de captação,
            tratamento, projetos educacionais sobre o uso racional e distribuição de água.
          </p>
          <div class="img-box">
            <img class="ana-logo" src="../../public/Logotipo_ANA_-_Agência_Nacional_de_Águas_e_Saneamento_Básico.png"
              alt="ANA - Agência Nacional de Águas e Saneamento Básico">
          </div>
          <br>
          <h5 id="item-1-1">Objetivo</h5>
          <p>Com o objetivo de aferir a qualidade da água, a Agência Nacional de Águas (ANA) propõe o uso do Índice de
            Qualidade das Águas (IQA), que atualmente é o principal indicador qualitativo utilizado no país. O IQA foi
            desenvolvido para avaliar a qualidade da água para o consumo humano após o tratamento convencional. A
            avaliação do IQA é realizada com base nos seguintes parâmetros: temperatura da água, pH, oxigênio dissolvido,
            resíduo total, demanda bioquímica de oxigênio, coliformes termotolerantes, nitrogênio total, fósforo total e
            turbidez.</p>
          <p>Atendendo ao Decreto Federal nº 2.914/2011, a empresa Águas Guariroba, responsável pelo abastecimento de água
            e tratamento do esgoto, disponibiliza informações sobre a qualidade da água consumida na cidade de Campo
            Grande, no Estado de Mato Grosso do Sul, para todos os seus clientes. Essas informações são divulgadas
            semestralmente e estão disponíveis em uma página da empresa na internet e em todos os postos de atendimento ao
            cliente. A empresa Águas Guariroba, seguindo a política de qualidade da água, é responsável por aplicar as
            normas reguladoras que qualificam a água para o consumo humano no município.
          </p>
          <p>O objetivo deste trabalho é desenvolver um modelo <b>SBRF (Sistema Baseado em Regras Fuzzy)</b> para avaliar
            a
            qualidade da água utilizada para consumo humano em Campo Grande, MS. Serão abordados três aspectos físicos e
            químicos importantes que justificam a potabilidade da água: <b>Cor Aparente, pH e Turbidez</b>.</p>
          <br>
          <br>
          <h4 id="item-2">Aplicação do SBRF na Qualidade da Água</h4>
          <p>Para a aplicação de um SBRF na análise da qualidade da água, foram escolhidas as variáveis seguindo a
            política de qualidade da água determinada pela empresa Águas Guariroba, as quais garantem a potabilidade da
            água. Os dados são encontrados em <a href="http://www.aguasguariroba.com.br" target="_blank"
              rel="noopener noreferrer">http://www.aguasguariroba.com.br</a>.
          </p>
          <br>
          <h5 id="item-2-1">Variáveis de Entrada</h5>
          <p>Assim, as variáveis de entrada escolhidas para o SBRF foram:</p>
          <p>1. <b>Cor Aparente</b> (medida em UH - Unidade Hazen). A escala Hazen, também conhecida como escala APHA, é
            utilizada
            para avaliar derivados de óleos, derivados de petróleo, além de solventes, plásticos e fármacos.
          </p>
          <div class="img-box">
            <img src="../../public/Scala-Apha-Hazen-600x159.jpg" alt="">
          </div>
          <p>2. <b>pH</b> (potencial Hidrogeniônico), ou seja, concentração de íons de Hidrogênio</p>
          <div class="img-box">
            <img src="../../public/escala_de_ph.png" alt="">
          </div>
          <p>
            3. <b>Turbidez</b> (causada pela presença de substâncias suspensas e coloidais, determinada pela quantidade de
            luz
            dispersada quando ela passa através de uma amostra e é medida em UT - Unidade de Turbidez, ou seja, unidades
            de cor).</p>
          <div class="img-box">
            <img src="../../public/PARAMETRO_TURBIDEZ.png" alt="">
          </div>
          <p>Além dessas três variáveis abordadas, outras poderiam ser utilizadas, tais como: cloro ativo, Escherichia
            coli, nível de flúor, quantidade de coliformes fecais e totais.</p>
          <h5 id="item-2-2">Variável de saída</h5>
          <p>A variável de saída é a <b>Potabilidade da água</b>, com os termos linguísticos: <b></b> <b>boa</b>,
            <b>adequada</b> e
            <b>inadequada</b> para o consumo.
          </p>
          <h5 id="item-3">Gráficos</h5>
          <p>Para cada atributo foi feito um grafico, onde o eixo y indica a pertinencia do valor e o eixo x indica a
            unidade de medida daquele atributo.</p>
          <h6 id="item-3-1">
            <div>
              <GraficoCorAparente class="grafico"></GraficoCorAparente>
            </div>
          </h6>
          <h6 id="item-3-2">
            <div>
              <GraficoPH class="grafico"></GraficoPH>
            </div>
          </h6>
          <h6 id="item-3-3">
            <div>
              <GraficoTurbidez class="grafico"></GraficoTurbidez>
            </div>
          </h6>
          <h6 id="item-3-4">
            <div>
              <GraficoPotabilidade class="grafico"></GraficoPotabilidade>
            </div>
          </h6>


          <h4 id="item-4">A Base de regras</h4>
          <p>A base de regras de um sistema fuzzy estabelece uma relação entre as variáveis independentes. Para uma melhor
            descrição dessas regras, foram organizadas três tabelas de dupla entrada, fixando o pH nas linhas e a Turbidez
            nas colunas e variando a Cor Aparente em cada tabela. Como resultado, temos as 36 combinações que determinam
            as condições da variável dependente Qualidade da Água.</p>
          <p>Foi feito um PDF com cada uma das 36 regras que pode ser consultado a qualquer momento:</p>
          <BotaoAbrirPdfVue></BotaoAbrirPdfVue>
          <div id="item-4-1" class="tables">
            <Tables></Tables>
          </div>
          <Interaction></Interaction>
        </div>
      </div>
    </div>
  </body>
</template>
<style scoped>
body {
  background-color: #fff;
  padding: 0px;
  margin: 0px;

}

.container {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: 0px;
}

.conteudo {
  width: 100%;
}

.img-box {
  display: flex;
  justify-content: center;
}

.ana-logo {
  width: 450px;
  height: 225px;
}

.scrollSpy {
  width: 100%;
  padding-right: -5%;
  overflow-y: auto;
  height: 650px;
  position: relative;
}

.grafico {
  height: 300px;
}

.tables {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

h4 {
  font-size: 35px;
}

h5 {
  font-size: 25px;
}

#navbar-example3 {
  height: 100%;

}
</style>