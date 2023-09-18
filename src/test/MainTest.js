import CalculadorFuzzy from "../utils/CalculadorFuzzy.js";

const calculadorFuzzy = new CalculadorFuzzy();
console.log(calculadorFuzzy.calcularPotabilidade({entradaCorAparente: 3, entradaPh: 6, entradaTurbidez: 0.7}));
