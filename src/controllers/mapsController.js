var Mapas = require('../database/model/mapa');
//var Mapas = require('../database/model/geomapa');

exports.get = async (req, res, next) => {
    //console.log(req.params.nome);
    try{
        const dados = await Mapas.findOne({nome: req.params.nome});
        res.status(201).send({
            METHOD: 'Requisição GET recebida com sucesso!',
            body: dados});
    }catch(err){
        console.error(err)
        res.status(500).json({erro: "Erro no servidor"})
    }
};

exports.post = async (req, res, next) => {

    console.log(req.body);
    try{
        const dados = await Mapas.create(req.body);
        res.status(201).send({
            METHOD: 'Requisição post recebida com sucesso!',
            body: req.body});
    }catch(err){
        console.error(err)
        res.status(500).json({erro: "Erro no servidor"})

    }
    /*    var item = {
        nome: req.body.nome,
        cidade: req.body.cidade,
        local: req.body.local
      };
      var mapa = new Mapas(item);
      */
};


exports.put = (req, res, next) => {
    let mapa = JSON.stringify(req.body);
    let id = JSON.stringify(req.params.id);
    res.status(201).send(`Requisição put recebida com sucesso! ${id} ${mapa}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição delete recebida com sucesso! ${id}`);
};
