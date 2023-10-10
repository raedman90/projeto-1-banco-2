const express = require('express');
const { CreateOcorrencia, ListarOcorrencia } = require('../controllers/OcorrenciaController');

const router = express.Router();

router.post('/ocorrencias', CreateOcorrencia);
router.get('/ocorrencias', ListarOcorrencia);

module.exports = router;
