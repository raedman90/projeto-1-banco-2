require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/server');

const app = express();

// Configuração do middleware para interpretar JSON
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
connectDB();

// Integração das rotas relacionadas às ocorrências
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
app.use(ocorrenciaRoutes);

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
