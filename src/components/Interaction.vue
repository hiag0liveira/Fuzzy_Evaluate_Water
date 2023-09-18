<script setup>
import { ref } from 'vue'

import { Potabilidade } from '../entities/Potabilidade';
import GraficoPotabilidade from './graficos/GraficoPotabilidade.vue';

import CalculadorFuzzy from '../utils/CalculadorFuzzy';

const inputPH = ref()
const inputTurbidez = ref()
const inputCorAparente = ref()

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
  isResponseReceived.value = true
}
</script>

<template>
  <h4>Simulação</h4>
  <p>Insira as variaveis de entrada para fazer uma analise da qualidade da água:</p>
  <div class="inputs">
    <div class="inner-inputs">
      <div class="form-row formulario">
        <div class="form-group col-md-auto">
          <label for="PH">PH</label>
          <input min="-6" max="14.5" v-model="inputPH" type="number" class="form-control" id="PH"
            placeholder="Potencial Hidrogênico">
        </div>
        <div class="form-group col-md-auto">
          <label for="Turbidez">Unidade de Turbidez</label>
          <input min="-1.5" max="11" v-model="inputTurbidez" type="number" class="form-control" id="Turbidez"
            placeholder="Turbidez">
        </div>
        <div class="form-group col-md-auto">
          <label for="Unidade-Hazen">Unidade de Cor Aparente</label>
          <input min="-6" max="34" v-model="inputCorAparente" type="number" class="form-control" id="Unidade-Hazen"
            placeholder="Unidade Hazen">
        </div>
      </div>
      <div class="send-button">
        <button @click="obterIndiceDePotabilidade" type="button" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
  <div v-if="isResponseReceived" class="resposta">
    <div>Indice de potabilidade: {{ response.valorDePotabilidade }}</div>
    <div>Conjunto: {{ response.conjuntoPertencente }}</div>
  </div>
  <div class="grafico-box">
    <GraficoPotabilidade class="grafico-potabilidade"></GraficoPotabilidade>
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
</style>
