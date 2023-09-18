// Conjuntos fuzzy para NP, FP e QP

let conjunto = {
  Ruim: [-2, -1, 5, 7],
  Médio: [0, 2, 8, 10],
  Bom: [2, 4, 10, 12],
};

const npConjuntos = conjunto;

const fpConjuntos = conjunto;

const qpConjuntos = conjunto;

const mfConjuntos = conjunto;

// Função de pertinência triangular
function calcularTrapezoidal(x, [a, b, c, d]) {
  console.log(`Triangulação: valor ${x}. conjunto ${[a, b, c, d]}`);
  if (x <= a || x >= d) {
    console.log("Retornou 0");
    return 0;
  }
  if (x >= b && x <= c) {
    console.log("Retornou 1");
    return 1;
  }
  if (a < x && x < b) {
    let valor = (x - a) / (b - a);
    console.log(`Retornou ${valor}`);
    return valor;
  }
  if (c < x && x < d) {
    let valor = (x - c) / (d - c);
    console.log(`Retornou ${valor}`);
    return valor;
  }
  return 0;
}

// Definir regras fuzzy
function fuzzyRules(np, fp, qp) {
  const rules = [];

  // Regras para calcular MF
  rules.push(
    obterValorFuzzy({
      pertinencia: Math.min(
        calcularTrapezoidal(np, npConjuntos.Bom),
        calcularTrapezoidal(fp, fpConjuntos.Bom),
        calcularTrapezoidal(qp, qpConjuntos.Bom)
      ),
      conjunto: mfConjuntos.Bom,
    })
  );
  rules.push(
    obterValorFuzzy({
      pertinencia: Math.min(
        calcularTrapezoidal(np, npConjuntos.Bom),
        calcularTrapezoidal(fp, fpConjuntos.Médio),
        calcularTrapezoidal(qp, qpConjuntos.Bom)
      ),
      conjunto: mfConjuntos.Bom,
    })
  );
  rules.push(
    obterValorFuzzy({
      pertinencia: Math.min(
        calcularTrapezoidal(np, npConjuntos.Médio),
        calcularTrapezoidal(fp, fpConjuntos.Bom),
        calcularTrapezoidal(qp, qpConjuntos.Bom)
      ),
      conjunto: mfConjuntos.Bom,
    })
  );
  rules.push(
    obterValorFuzzy({
      pertinencia: Math.min(
        calcularTrapezoidal(np, npConjuntos.Médio),
        calcularTrapezoidal(fp, fpConjuntos.Médio),
        calcularTrapezoidal(qp, qpConjuntos.Bom)
      ),
      conjunto: mfConjuntos.Médio,
    })
  );
  rules.push(
    obterValorFuzzy({
      pertinencia: Math.min(
        calcularTrapezoidal(np, npConjuntos.Ruim),
        calcularTrapezoidal(fp, fpConjuntos.Ruim),
        calcularTrapezoidal(qp, qpConjuntos.Ruim)
      ),
      conjunto: mfConjuntos.Ruim,
    })
  );

  return rules;
}

function obterValorFuzzy({ pertinencia, conjunto: [a, b, c, d] }) {
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
    let numerador = pertinencia * (d - c) + c + (pertinencia * (b - a) + a);
    let denominator = 2 * pertinencia;
    return { numerador, denominator };
  }
  return { numerador: 0, denominator: 0 };
}

// Calcular a Média Final (MF)
function calcularMediaFinal(np, fp, qp) {
  const rules = fuzzyRules(np, fp, qp);

  let numerador = 0;
  let denominator = 0;
  for (const indice in rules) {
    console.log(rules[indice]);
    numerador += rules[indice].numerador;
    denominator += rules[indice].denominator;
  }

  if (denominator === 0) {
    return 0; // Evitar divisão por zero
  }

  return numerador / denominator;
}

// Exemplo de uso:
const np = 9;
const fp = 5;
const qp = 5;
const mediaFinal = calcularMediaFinal(np, fp, qp);
console.log(`A Média Final (MF) é: ${mediaFinal}`);
