const express = require('express');
const router = express.Router();
const controller = require('../controllers/setorController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);
router.get('/:id/responsaveis', controller.listarResponsaveis);

module.exports = router;
