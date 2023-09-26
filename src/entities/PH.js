export default class PH {
  constructor() {
    this.listaDeClassificacoes = [
      "inadequadaBaixo",
      "adequado",
      "bom",
      "inadequadoAlto",
    ];

    this.inadequadaBaixo = [-6, -5, 5, 6];
    this.adequado = [5, 6, 8.5, 9.5];
    this.bom = [5.5, 6.5, 8, 8.5];
    this.inadequadoAlto = [9, 9.5, 14, 14.5];
    this.unidade = "Potencial Hidrogênico";
  }
}
