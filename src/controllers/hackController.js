var model = require('../database/model/produto');
var sendHub = require('../send');
const { Op } = require('sequelize');

//Metodo get para teste e consulta da base de dados. Consulta feita pelo valor
exports.get = async (req, res, next) => {
  var valor = req.params.valor;
  try{
    const dados = await model.Produto.findAll({
      where: {
        VR_MINIMO: { [Op.lte]: valor},
        VR_MAXIMO: { [Op.gte]: valor},
      },
      raw: true,
    });
    res.status(201).send({
      METHOD: 'Requisição GET recebida com sucesso!',
      body: dados});
    }catch(err){
      console.error(err)
      res.status(500).json({erro: "Erro no servidor"})
    }
  };

/*Metodo que efetua a simulacao atraves do valor e prazo.
Efetua a validacao dos dados enviados.
Retorna a simulacao calculada na tabela SAC e PRICE
*/
exports.post = async (req, res, next) => {
  var valor = req.body.valorDesejado
  if( !validarEntrada(valor, req.body.prazo) ){
    res.status(201).json({mensagem :"Por favor, reveja os dados informados!"})
    return 0
  }

  try{
    const dados = await model.Produto.findAll({
      where: {
        VR_MINIMO: { [Op.lte]: valor},
        VR_MAXIMO: { [Op.gte]: valor},
      },
      raw: true,
      nest: true,
    });
    var simulacao = efetuarSimulacao(req.body, dados[0])
    //enviar a simulacao realizada
    sendHub.enviarEvento(simulacao)
    req.accepts('text/plain')
    res.status(201).send(simulacao)
    }catch(err){
      console.error(err)
      res.status(500).json({erro: "Erro no servidor"})

    }

};

//Funcao que efetua a validacao dos dados de entrada
function validarEntrada(valor, prazo){
  var validado = false
  //regra: valor maior ou igual a 200, prazo maior ou igual a 0,
  if( valor > 200 && prazo >= 0 ){
    //regra: se prazo menor que 24 o valor deve ser menor que 10000
    if( (prazo <= 24 && valor <= 10000) ||
        //regra: prazo deve estar entre 25 e 48 e valor entre 10001 e 100000
        ( (prazo >= 25 && prazo <= 48) && (valor >= 10001 && valor <= 100000) ) ||
        //regra: prazo deve estar entre 49 e 96 e valor entre 100000.01 e 1000000
        ( (prazo >= 49 && prazo <= 96) && (valor >= 100000.01 && valor <= 1000000) ) ||
        //regra: prazo deve ser maior que 96 e valor maior que 1000000
        ( (prazo > 96 && valor >= 1000000.01) )
      )
      validado = true
  }
  return validado
}

//Funcao auxiliar que chama a model para calcular as simulacoes PRICE e SAC
function efetuarSimulacao(simulacao, produto){
  let resultadoSac = model.calcularSAC(simulacao, produto)
  let resultadoPrice = model.calcularPRICE(simulacao, produto)
  var resultadoSimulacao = {"codigoProduto": produto.CO_PRODUTO, "descricaoProduto": produto.NO_PRODUTO,
  "taxaJuros": produto.PC_TAXA_JUROS, resultadoSimulacao: [resultadoSac,resultadoPrice]};

  return resultadoSimulacao
}
