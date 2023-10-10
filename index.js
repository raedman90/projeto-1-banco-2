require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
// Configuração do middleware para interpretar JSON
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Integração das rotas relacionadas às ocorrências
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
app.use(ocorrenciaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
