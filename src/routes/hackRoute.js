const express = require('express');
const router = express.Router();
const controller = require('../controllers/hackController')
//rota de teste caso queira ver o valor consultado do banco de dados
router.get('/v1/stanley/:valor', controller.get);
//rota para o endpoint de simulacao
router.post('/v1/stanley', controller.post);

module.exports = router;
