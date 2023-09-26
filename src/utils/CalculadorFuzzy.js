import CorAparente from "../entities/CorAparente.js";
import PH from "../entities/PH.js";
import { Potabilidade } from "../entities/Potabilidade.js";
import Turbidez from "../entities/Turbidez.js";

export default class CalculadorFuzzy {
  constructor() {
    this.potabilidade = Potabilidade;
    this.corAparente = new CorAparente();
    this.turbidez = new Turbidez();
    this.ph = new PH();
    let potabilidadeBoa = this.potabilidade.listaDeClassificacoes[0];
    let potabilidadeAdequada = this.potabilidade.listaDeClassificacoes[1];
    let potabilidadeInadequada = this.potabilidade.listaDeClassificacoes[2];
    this.listaDeSaida = [
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeBoa,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeBoa,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeBoa,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeAdequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeAdequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
      potabilidadeInadequada,
    ];
  }

  calcularPertinenciaTrapezoidal(valorRecebido, [a, b, c, d]) {
    // console.log(`Triangulação: valorRecebido ${valorRecebido}. conjunto ${[a, b, c, d]}`);
    if (valorRecebido <= a || valorRecebido >= d) {
      // console.log("Retornou 0");
      return 0;
    }
    if (valorRecebido >= b && valorRecebido <= c) {
      // console.log("Retornou 1");
      return 1;
    }
    if (a < valorRecebido && valorRecebido < b) {
      let valor = (valorRecebido - a) / (b - a);
      // console.log(`Retornou ${valor}`);
      return valor;
    }
    if (c < valorRecebido && valorRecebido < d) {
      let valor = 1 - (valorRecebido - c) / (d - c);
      // console.log(`Retornou ${valor}`);
      return valor;
    }
    return 0;
  }

  calcularFuzzy(entradaCorAparente, entradaPh, entradaTurbidez) {
    const vetorDeResultadosFuzzy = [];

    let contador = 0;
    for (const classficacaoCorAparenteIndex in this.corAparente.listaDeClassificacoes) {
      let classficacaoCorAparente = this.corAparente.listaDeClassificacoes[classficacaoCorAparenteIndex]
      for (const classificacaoTurbidezIndex in this.turbidez.listaDeClassificacoes) {
        let classificacaoTurbidez = this.turbidez.listaDeClassificacoes[classificacaoTurbidezIndex]
        for (const classificacaoPHIndex in this.ph.listaDeClassificacoes) {
          let classificacaoPH = this.ph.listaDeClassificacoes[classificacaoPHIndex]


          // console.log(`Iteração atual ${contador}`)
          // console.log(`Cor aparente em ${classficacaoCorAparente}, Turbidez em ${classificacaoTurbidez}, PH em ${classificacaoPH} `)
          let pertinenciaCorAparente = this.calcularPertinenciaTrapezoidal(
            entradaCorAparente,
            this.corAparente[classficacaoCorAparente]
          )
          let pertinenciaPh = this.calcularPertinenciaTrapezoidal(
            entradaPh,
            this.ph[classificacaoPH]
          )
          let pertinenciaTurbidez = this.calcularPertinenciaTrapezoidal(
            entradaTurbidez,
            this.turbidez[classificacaoTurbidez]
          )
          let pertinencia = Math.min(pertinenciaCorAparente, pertinenciaPh, pertinenciaTurbidez)
          // console.log(`Menor pertinencia ${pertinencia}`)
          // console.log(`Conjunto de potabilidade atual: ${this.potabilidade[this.listaDeSaida[contador]]}`)
          vetorDeResultadosFuzzy.push(
            this.obterValorFuzzy({
              pertinencia,
              conjunto: this.potabilidade[this.listaDeSaida[contador]],
            })
          );
          contador++;
        }
      }
    }

    return vetorDeResultadosFuzzy;
  }

  obterValorFuzzy({ pertinencia, conjunto: [a, b, c, d] }) {
    if (pertinencia === 1) {
      let somaNumerador = 0;
      let somaDenominador = 0;
      for (b; b <= c; b += 1) {
        somaNumerador += b;
        somaDenominador += 1;
      }
      return { numerador: somaNumerador, denominator: somaDenominador };
    }
    if (pertinencia > 0 && pertinencia < 1) {
      let denominator = 2 * pertinencia;
      let numerador = ((pertinencia * (b - a)) + a) * pertinencia
        + ((pertinencia * (d - c)) + c) * pertinencia
      return { numerador, denominator };
    }
    return { numerador: 0, denominator: 0 };
  }

  #obterConjuntoPertencente(entrada) {
    if (this.calcularPertinenciaTrapezoidal(entrada, this.potabilidade.boa) > 0) {
      return 'boa'
    }
    else if (this.calcularPertinenciaTrapezoidal(entrada, this.potabilidade.adequada) > 0) {
      return 'adequada'
    }
    else if (this.calcularPertinenciaTrapezoidal(entrada, this.potabilidade.inadequada) > 0) {
      return 'inadequada'
    }
    else if (entrada > 1.3) {
      return 'valor não esperado'
    }
    return 'erro ao calcular o conjunto pertencente'
  }

  calcularPotabilidade({ entradaCorAparente, entradaPh, entradaTurbidez }) {
    const rules = this.calcularFuzzy(
      entradaCorAparente,
      entradaPh,
      entradaTurbidez
    );
    let numerador = 0;
    let denominator = 0;

    for (const indice in rules) {
      // console.log(rules[indice]);
      numerador += rules[indice].numerador;
      denominator += rules[indice].denominator;
    }


    // Evitar divisão por zero
    let valorDePotabilidade = 0
    if (denominator === 0) {
      return {
        valorDePotabilidade,
        conjuntoPertencente: this.#obterConjuntoPertencente(valorDePotabilidade)
      }
    }

    valorDePotabilidade = numerador / denominator
    return {
      valorDePotabilidade,
      conjuntoPertencente: this.#obterConjuntoPertencente(valorDePotabilidade)
    };
  }
}
