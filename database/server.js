const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const { Ocorrencia } = require('./models');

app.post('/ocorrencias', async (req, res) => {
    try {
        const ocorr = await Ocorrencia.create(req.body);
        res.status(201).send(ocorr);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await Ocorrencia.findAll();
        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
});
