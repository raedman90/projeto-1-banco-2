const express = require('express');
const bodyParser = require('body-parser');
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');

const app = express();

// Configura��o do middleware para interpretar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Integra��o das rotas relacionadas �s ocorr�ncias
app.use(ocorrenciaRoutes);

// Inicializa��o do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
