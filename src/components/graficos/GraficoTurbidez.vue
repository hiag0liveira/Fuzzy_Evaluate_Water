<script setup>
import Turbidez from '../../entities/Turbidez';
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
const qualidadeTurbidez = new Turbidez()

var eixoX = Array.from({ length: 40}, (_, i) => (i/2)-5)

// Valores dos datasets de acordo com o padrão
// boa
var datasetBoa = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadeTurbidez.boa)
  if (valor < qualidadeTurbidez.boa[0] || valor > qualidadeTurbidez.boa[3]) return undefined
  return valorDeRetorno
});

// adequada
var datasetAdequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadeTurbidez.adequada)
  if (valor < qualidadeTurbidez.adequada[0] || valor > qualidadeTurbidez.adequada[3]) return undefined
  return valorDeRetorno
});

// inadequada
var datasetInadequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, qualidadeTurbidez.inadequada)
  if (valor < qualidadeTurbidez.inadequada[0] || valor > qualidadeTurbidez.inadequada[3]) return undefined
  return valorDeRetorno
});

const data = {
  labels: eixoX
  , datasets: [
    {
      label: 'Boa',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'RGB(230, 186, 149)',
      data: datasetBoa
    },
    {
      label: 'Adequado',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'RGB(159, 119, 84)',
      data: datasetAdequada
    },
    {
      label: 'inadequada Baixo',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'RGB(92, 0, 0)',
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
        text: 'Turbidez',
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
        text: `${qualidadeTurbidez.unidade}`, // ótulo do eixo X aqui
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
  
