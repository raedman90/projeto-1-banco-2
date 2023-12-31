const express = require('express');
const { 
    CreateOcorrencia, 
    ListarOcorrencia, 
    AtualizarOcorrencia, 
    DeletarOcorrencia,
    GetOcorrenciaById
} = require('../controllers/OcorrenciaController');

const router = express.Router();

// Criar uma nova ocorrência
router.post('/ocorrencias', CreateOcorrencia);

// Listar todas as ocorrências
router.get('/ocorrencias', ListarOcorrencia);

// Listar uma ocorrencia
router.get('/ocorrencias/:id', GetOcorrenciaById);

// Atualizar uma ocorrência existente
router.put('/ocorrencias/:id', AtualizarOcorrencia);

// Deletar uma ocorrência
router.delete('/ocorrencias/:id', DeletarOcorrencia);

module.exports = router;
