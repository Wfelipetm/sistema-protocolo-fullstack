const express = require('express');
const router = express.Router();
const controller = require('../controllers/processoController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);
router.get('/:id/tramites', controller.listarTramites);
router.get('/:id/pagamentos', controller.listarPagamentos);
router.get('/:id/documentos', controller.listarDocumentos);

module.exports = router;
