<script setup>
import { ref } from 'vue'

import GraficoPotabilidade from './GraficoPotabilidade.vue';
import CalculadorFuzzy from '../utils/CalculadorFuzzy';
import BotaoAnalise from './BotaoAnalise.vue';

const inputPH = ref()
const inputTurbidez = ref()
const inputCorAparente = ref()
const podeCalcular = ref(false)
const corDaBarra = ref('')

const restricoes = ref({
  minCorAparente: -6,
  maxCorAparente: 34,
  minPH: -6,
  maxPH: 14.5,
  minTurbidez: -1.5,
  maxTurbidez: 11
})

const isResponseReceived = ref(false)
const response = ref({
  valorDePotabilidade: Number,
  conjuntoPertencente: String
})

const calculadorFuzzy = new CalculadorFuzzy()

function obterIndiceDePotabilidade() {
  response.value = calculadorFuzzy.calcularPotabilidade({
    entradaCorAparente: inputCorAparente.value,
    entradaPh: inputPH.value,
    entradaTurbidez: inputTurbidez.value
  })
  corDaBarra.value = definirCorDaBarra(response.value.conjuntoPertencente)
  isResponseReceived.value = true
}

function verificaPodeCalcular() {
  if (inputPH.value >= restricoes.value.minPH && inputPH.value <= restricoes.value.maxPH) {
    if (inputTurbidez.value >= restricoes.value.minTurbidez && inputTurbidez.value <= restricoes.value.maxTurbidez) {
      if (inputCorAparente.value >= restricoes.value.minCorAparente && inputCorAparente.value <= restricoes.value.maxCorAparente) {
        podeCalcular.value = true
      }
    }
  }
  else podeCalcular.value = false
}

function definirCorDaBarra(conjunto) {
  const coresPorCategoria = {
    boa: 'blue',
    adequada: 'rgb(0, 135, 241)',
    inadequada: 'rgb(3, 101, 93)'
  }

  return coresPorCategoria[conjunto]
}
</script>

<template>
  <div class="texto">
  <p>
    Esta simulação tem o objetivo de emular um caso real onde a água foi coletada, analizada e extraido as informações da
    sua cor aparente, pH e turbidez.
  </p>
  <p>A unidade de Cor Aparente de variar entre <b>{{ restricoes.minCorAparente }}</b> e <b>{{ restricoes.maxCorAparente
  }}</b>.</p>
  <p>O pH deve variar entre <b>{{ restricoes.minPH }}</b> e <b>{{ restricoes.maxPH }}</b>.</p>
  <p>A unidade hazen (Turbidez) da água deve variar entre <b>{{ restricoes.minTurbidez }}</b> e <b>{{
    restricoes.maxTurbidez }}</b>.</p>
  <p>
    Insira as informações no campo a baixo para efetuar a analise da qualidade da água:
  </p>

  <div class="inputs">
    <div class="inner-inputs">
      <div class="form-row formulario">
        <div class="form-group col-md phzin" >
          <label for="PH">PH</label>
          <input @change="verificaPodeCalcular" :min="restricoes.minPH" :max="restricoes.maxPH" v-model="inputPH"
            type="number" class="form-control" id="PH" placeholder="Potencial Hidrogênico">
        </div>
        <div class="form-group col-md-auto">
          <label for="Turbidez">Unidade de Turbidez</label>
          <input @change="verificaPodeCalcular" :min="restricoes.minTurbidez" :max="restricoes.maxTurbidez"
            v-model="inputTurbidez" type="number" class="form-control" id="Turbidez" placeholder="Turbidez">
        </div>
        <div class="form-group col-md-auto">
          <label for="Unidade-Hazen">Unidade de Cor Aparente</label>
          <input @change="verificaPodeCalcular" :min="restricoes.minCorAparente" :max="restricoes.maxCorAparente"
            v-model="inputCorAparente" type="number" class="form-control" id="Unidade-Hazen" placeholder="Unidade Hazen">
        </div>
      </div>
      <div class="send-button">
        <BotaoAnalise v-if="podeCalcular" @click="obterIndiceDePotabilidade" type="button"
          class="btn"></BotaoAnalise>      
        <BotaoAnalise v-else  type="button" class="btn" ></BotaoAnalise>   
      </div>
    </div>
  </div>
  <div v-if="isResponseReceived" class="resposta">
    <div>Indice de potabilidade: {{ response.valorDePotabilidade }}</div>
    <div>Qualidade: {{ response.conjuntoPertencente }}</div>
  </div>
  <div class="grafico-box">
    <GraficoPotabilidade class="grafico-potabilidade" :cor-da-barra="corDaBarra"
      :bar-position="response.valorDePotabilidade" :show-bar-externally="isResponseReceived">
    </GraficoPotabilidade>
  </div>

</div>
</template>

<style scoped>
.inputs {
  width: 100%;
  display: flex;
  justify-content: center;
}

.formulario {
  display: flex;
  gap: 15px;
  padding: 10px;
}

.send-button {
  width: 100%;
  display: flex;
  justify-content: center;
}

.resposta {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.grafico-box {
  padding-top: 15px;
}

.grafico-potabilidade {
  height: 300px;
}

.texto{
  color: black;
  text-align: left;
}
.phzin{
  align-self: flex-end;
}
b{
  color:red;
}
</style>
