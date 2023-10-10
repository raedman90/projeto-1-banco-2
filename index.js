require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/server');
const Ocorrencia = require('./models/Ocorrencia');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para criar uma nova ocorrência
app.post('/ocorrencias', async (req, res) => {
    try {
        const ocorr = await Ocorrencia.create(req.body);
        res.status(201).send(ocorr);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint para buscar todas as ocorrências
app.get('/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await Ocorrencia.findAll();
        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
