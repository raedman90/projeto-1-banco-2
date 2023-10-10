require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
// Configura��o do middleware para interpretar JSON
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Integra��o das rotas relacionadas �s ocorr�ncias
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
app.use(ocorrenciaRoutes);

// Inicializa��o do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
