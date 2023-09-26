<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';

import { Potabilidade } from '../entities/Potabilidade.js';
import CalculadorFuzzy from '../utils/CalculadorFuzzy.js'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,

)

const props = defineProps({
  showBarExternally: Boolean, // Atributo externo para controlar a adição da barra
  barPosition: Number, // Atributo externo para definir a posição da barra
  corDaBarra: String
});

const calculadorFuzzy = new CalculadorFuzzy()
const qualidadePotabilidade = Potabilidade

var eixoX = Array.from({ length: 30 }, (_, i) => ((i / 10) - 1).toFixed(1))

// Valores dos datasets de acordo com o padrão
// boa
var datasetBoa = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadePotabilidade.boa)
  if (valor < qualidadePotabilidade.boa[0] || valor > qualidadePotabilidade.boa[3]) return undefined
  return valorDeRetorno
});

// adequada
var datasetAdequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadePotabilidade.adequada)
  if (valor < qualidadePotabilidade.adequada[0] || valor > qualidadePotabilidade.adequada[3]) return undefined
  return valorDeRetorno
});

// inadequada
var datasetInadequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadePotabilidade.inadequada)
  if (valor < qualidadePotabilidade.inadequada[0] || valor > qualidadePotabilidade.inadequada[3]) return undefined
  return valorDeRetorno
});

const data = ref({
  labels: eixoX,
  datasets: [
    {
      label: 'Boa',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'blue',
      data: datasetBoa,
      type: 'line'
    },
    {
      label: 'Adequado',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'rgb(0, 135, 241)',
      data: datasetAdequada,
      type: 'line'
    },
    {
      label: 'Inadequada',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'rgb(3, 101, 93)',
      data: datasetInadequada,
      type: 'line'
    },
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      position: 'top',
      color: 'rgb(0, 0, 0)',
      font: {
        size: 20
      },
      text: 'Potabilidade',
      padding: {
        top: 10,
        bottom: 10,
      },
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: `${qualidadePotabilidade.unidade}`, // ótulo do eixo X aqui
        color: 'rgb(0, 0, 0)',
        font: {
          size: 12,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: ' Grau de Pertinência ', // rótulo do eixo Y aqui
        color: 'rgb(0, 0, 0)',
        font: {
          size: 12,
        },
      },
    }
  }
})

const isNewDataSet = ref(false)
// Função para adicionar o dataset da barra ao gráfico na posição definida
const addBarToChart = () => {
  isNewDataSet.value = false
  if (data.value.datasets.length >= 4) data.value.datasets.pop()
  data.value.datasets.push({
    label: 'Valor de saída',
    backgroundColor: props.corDaBarra, // Cor da barra
    data: eixoX.map((valor) => {
      if (valor === props.barPosition.toFixed(1)) return 1
      else return undefined
    }),
    type: 'bar', // Inicialize com zeros
    barThickness: 6,
  });
  isNewDataSet.value = true
}

// Assista à mudança da propriedade showBar e adicione a barra quando ela mudar
watch(props, (newValue) => {
  if (newValue) {
    addBarToChart();
  }
});
</script>

<template>
  <Bar :key="JSON.stringify(props)" :data="data" :options="options"></Bar>
</template>
  
