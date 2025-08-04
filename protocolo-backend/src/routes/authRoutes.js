const express = require('express');
const { cadastrarUsuario, loginUsuario, atualizarUsuario, buscarUsuarios, deletarUsuario, verificarSenhaUsuario } = require('../controllers/authController');





const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);



router.get('/usuarios', buscarUsuarios);
router.put('/atualizar/:id', atualizarUsuario);
router.delete('/deletar/:id', deletarUsuario);
router.post('/verificar-senha', verificarSenhaUsuario);


module.exports = router;
