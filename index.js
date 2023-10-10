const express = require('express');
const bodyParser = require('body-parser');
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');

const app = express();

// Configuração do middleware para interpretar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Integração das rotas relacionadas às ocorrências
app.use(ocorrenciaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
