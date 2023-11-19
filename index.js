require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/server');

const app = express();

// Configura��o do middleware para interpretar JSON
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
connectDB();

// Integra��o das rotas relacionadas �s ocorr�ncias
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
app.use(ocorrenciaRoutes);

// Servir arquivos est�ticos
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Inicializa��o do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
