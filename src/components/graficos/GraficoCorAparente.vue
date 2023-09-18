<script setup>
import CorAparente from '../../entities/CorAparente.js'
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
const corAparente = new CorAparente()

var eixoX = Array.from({ length: 50 }, (_, i) => i - 10)

// Valores dos datasets de acordo com o padrão
// boa
var datasetBoa = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, corAparente.boa)
  if (valor < corAparente.boa[0] || valor > corAparente.boa[3]) return undefined
  return valorDeRetorno
});

// adequada
var datasetAdequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, corAparente.adequada)
  if (valor < corAparente.adequada[0] || valor > corAparente.adequada[3]) return undefined
  return valorDeRetorno
});

// inadequada
var datasetInadequada = eixoX.map((valor) => {
  let valorDeRetorno = calculadorFuzzy.calcularPertinenciaTrapezoidal(valor, corAparente.inadequada)
  if (valor < corAparente.inadequada[0] || valor > corAparente.inadequada[3]) return undefined
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
      label: 'Adequada',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderColor: 'RGB(159, 119, 84)',
      data: datasetAdequada
    },
    {
      label: 'Inadequada',
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
        text: 'Cor Aparente',
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
        text: `${corAparente.unidade}`, // ótulo do eixo X aqui
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
  
