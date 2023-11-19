const express = require('express');
const { 
    CreateOcorrencia, 
    ListarOcorrencia, 
    AtualizarOcorrencia, 
    DeletarOcorrencia 
} = require('../controllers/OcorrenciaController');

const router = express.Router();

// Criar uma nova ocorr�ncia
router.post('/ocorrencias', CreateOcorrencia);

// Listar todas as ocorr�ncias
router.get('/ocorrencias', ListarOcorrencia);

// Atualizar uma ocorr�ncia existente
router.put('/ocorrencias/:id', AtualizarOcorrencia);

// Deletar uma ocorr�ncia
router.delete('/ocorrencias/:id', DeletarOcorrencia);

module.exports = router;
