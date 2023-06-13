const db = require('../dbSqlConfig')
const { DataTypes } = require('sequelize');

//cria uma model. Será chamada de dbo.Produto
const Produto = db.define('PRODUTO', {
    CO_PRODUTO: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    NO_PRODUTO: { type: DataTypes.STRING(200), allowNull: false },
    PC_TAXA_JUROS: { type: DataTypes.DECIMAL(10,9), allowNull: false },
    NU_MINIMO_MESES: { type: DataTypes.INTEGER, allowNull: false },
    NU_MAXIMO_MESES: { type: DataTypes.INTEGER, allowNull: false },
    VR_MINIMO: { type: DataTypes.DECIMAL(18,2), allowNull: false },
    VR_MAXIMO: { type: DataTypes.DECIMAL(18,2), allowNull: false }
})

/*Funcao que recebe a simulacao que contem o prazo e valor desejado.
  Tembém recebe o produto consultado na base de dados
  Retorna o resultado da simulacao SAC
*/
function calcularSAC(simulacao, produto){
  var prazo=simulacao.prazo
  //esse é o valor principal que será amortizado cada vez que o prazo diminui
  var valorDesejado = simulacao.valorDesejado
  console.log("Calculando Tabela SAC...")
  var parcelasCalculadas = []
  for (var i = 1; i <= prazo; i++) {
    //valor de amortizacao eh sempre o mesmo
    var valorAmortizacao = simulacao.valorDesejado/prazo;
    //calculo do juros da parcela
    var valorJuros = valorDesejado*produto.PC_TAXA_JUROS;
    //Math.round utilizado para fixar valores em duas casas decimais
    var parcela = {numero: i, valorAmortizacao: Math.round( valorAmortizacao * 1e2 ) / 1e2,
                  valorJuros: Math.round( valorJuros * 1e2 ) / 1e2, valorPrestacao: Math.round( (valorAmortizacao+valorJuros) * 1e2 ) / 1e2}

    //valor principal diminui a cada parcela
    valorDesejado = valorDesejado - valorAmortizacao;
    parcelasCalculadas.push(parcela)
  }
  parcelas = {tipo:"SAC",parcelas: parcelasCalculadas}

  return parcelas
}

/*Funcao que recebe a simulacao que contem o prazo e valor desejado.
  Tembém recebe o produto consultado na base de dados
  Retorna o resultado da simulacao SAC
*/
function calcularPRICE(simulacao, produto){
  var prazo=simulacao.prazo
  //esse é o valor principal que será amortizado cada vez que o prazo diminui
  var valorDesejado = simulacao.valorDesejado
  //formula do denominador do calculo da parcelas
  var denominadorPrice = 1 - (1 + produto.PC_TAXA_JUROS)**(-prazo)
  //o valor do juros sera o mesmo utilizado no numerador do calculo das parcelas
  var valorJuros = (simulacao.valorDesejado * produto.PC_TAXA_JUROS)
  //valor da prestacao sera sempre o mesmo
  var valorPrestacao = (valorJuros/denominadorPrice)
  console.log("Calculando Tabela PRICE...")
  var parcelasCalculadas = []
  for (var i = 1; i <= prazo; i++) {
    //valor de amortizacao eh o valor da parcela menos os juros a serem pagos
    var valorAmortizacao = (valorPrestacao - valorJuros);
    //Math.round utilizado para fixar valores em duas casas decimais
    var parcela = {numero: i, valorAmortizacao: Math.round( valorAmortizacao * 1e2 ) / 1e2,
                  valorJuros: Math.round( valorJuros * 1e2 ) / 1e2, valorPrestacao: Math.round( valorPrestacao * 1e2 ) / 1e2}

    parcelasCalculadas.push(parcela)
    //valor principal diminui a cada parcela
    valorDesejado = valorDesejado - valorAmortizacao;
    //juros calculados sobre o valor restante
    valorJuros = (valorDesejado*produto.PC_TAXA_JUROS);
  }
  parcelas = {tipo:"PRICE",parcelas: parcelasCalculadas}

  return parcelas
}


module.exports = {Produto, calcularSAC, calcularPRICE};
