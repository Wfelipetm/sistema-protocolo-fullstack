const express = require('express');
const router = express.Router();
const controller = require('../controllers/secretariaController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);
router.get('/:id/setores', controller.listarSetores);

module.exports = router;
