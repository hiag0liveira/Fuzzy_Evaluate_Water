<script setup>
import { Potabilidade } from '../../entities/Potabilidade.js';
import CalculadorFuzzy from '../../utils/CalculadorFuzzy.js'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const calculadorFuzzy = new CalculadorFuzzy()
const qualidadePotabilidade =  Potabilidade

var eixoX = Array.from({ length: 30}, (_, i) => ((i/10)-1).toFixed(1))

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

const data = {
  labels: eixoX
  , datasets: [
    {
      label: 'Boa',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'blue',
      data: datasetBoa
    },
    {
      label: 'Adequado',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'rgb(0, 135, 241)',
      data: datasetAdequada
    },
    {
      label: 'inadequada Baixo',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'rgb(3, 101, 93)',
      data: datasetInadequada
    },
  ]
}

const options = {
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
}     
</script>

<template>
  <Line :data="data" :options="options" />
</template>
  
